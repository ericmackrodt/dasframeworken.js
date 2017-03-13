var htmlparser = require("htmlparser2");
var MagicString = require('magic-string');
var path = require('path');

module.exports = function (html) {
    if (this.cacheable) this.cacheable();

    const imports = [];
    let selector = '';

    var handler = new htmlparser.DefaultHandler(function (error, dom) {
        if (error)
            console.log(error);
        else
            console.log('done');
    });
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(html);
    // sys.puts(sys.inspect(handler.dom, false, null));

    const magicString = new MagicString('', { filename: 'component.view.js' });

    const usageCounts = {
        'div': { count: 0 }
    };

    function buildVarName(node) {
        let el = usageCounts[node.name];
        if (!el) {
            el = usageCounts[node.name] = { count: 0 };
        }
        const result = node.name.replace('-', '_') +  el.count;
        el.count++;
        return result;
    }

    function processAttribute(varName, key, value) {
        const line = ['builder.setAttribute(\'', key, '\', \'', value, '\', ', varName, ');\r\n'].join('');
        magicString.append(line);
    }

    function processText(node, parent) {       
        const text = node.data.replace('\r', '').replace('\n', '').trim();

        if (!text) return;

        const regex = /@{\s*([^\s}}]+)\s*}/g;
        const brokenString = [];
        let result;
        let currentIndex = 0;
        while ((result = regex.exec(text))) {
            const previous = text.substring(currentIndex, result.index);
            if (previous) {
                const line = ['builder.setText(\'', previous, '\', ', parent, ');\r\n'].join('');    
                magicString.append(line);
            }
            currentIndex += previous.length;
            const match = result[0];
            const line = ['builder.boundText(\'', result[1], '\', ', parent, ');\r\n'].join('');    
            magicString.append(line);
            currentIndex += match.length;
        }

        if (currentIndex < text.length) {
            const previous = text.substring(currentIndex, text.length);
            const line = ['builder.setText(\'', previous, '\', ', parent, ');\r\n'].join('');    
            magicString.append(line);
        }
    }

    function processTag(node, parent) {
        const varName = buildVarName(node);
        const parentName = parent ? ', ' + parent : '';
        const line = ['const ', varName, ' = builder.createElement(\'', node.name, '\'', parentName, ');\r\n'].join('');
        magicString.append(line);

        if (node.attribs) {
            Object.keys(node.attribs).forEach((key) => processAttribute(varName, key, node.attribs[key]));
        }

        if (node.children) {
            node.children.forEach((child) => processNode(child, varName));
        }
    }

    function processRoot(node, parent) {
        const varName = buildVarName(node);
        const parentName = parent ? ', ' + parent : '';

        let json = node.attribs.controller;

        while (json.indexOf('\'') > -1) {
            json = json.replace('\'', '"');
        }

        const controller = JSON.parse(json);
        imports.push(controller);
        const key = Object.keys(controller)[0];

        selector = node.attribs.selector;

        const line = ['const ', varName, ' = builder.createRoot(\'', node.attribs.selector, '\', ', key, parentName, ');\r\n'].join('');
        magicString.append(line);
        if (node.children) {
            node.children.forEach((child) => processNode(child, varName));
        }
    }

    function processNode(node, parent) {
        if (node.type === 'tag') {
            if (node.name === 'component') {
                processRoot(node, parent);
            } else {
                processTag(node, parent);
            }
        } else if (node.type === 'text') {
            processText(node, parent);
        }  
    }

    for (let i in handler.dom) {
        processNode(handler.dom[i]);
    }

    const imps = imports.map((imported) => {
        const key = Object.keys(imported)[0];
        return ['import { ', key, ' } from \'', imported[key], '\';\r\n'].join('');
        // const req = 'var controller = require(\'' + controller[key] + '\');\r\n'; 
    });

    magicString.indent()
        .prepend('function render(builder) {\r\n')
        .append('}\r\n');

    const key = Object.keys(imports[0])[0];
    console.log(key);
    var wrap = [ 
        '"use strict";',
        imps.join('\r\n'),
        'module.exports = {\r\n',
        '    selector: \'', selector, '\',\r\n',
        '    controller: ', key, ',\r\n',
        '    render: ', magicString.toString(), '\r\n',
        '};'
    ].join('');

    return wrap;
};