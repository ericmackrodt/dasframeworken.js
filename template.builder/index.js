'use strict';
var htmlparser = require("htmlparser2");
var fs = require('fs');
var sys = require('sys');
var MagicString = require('magic-string');

var html = fs.readFileSync('./template.builder/component.html', 'utf-8');
var rawHtml = "Xyz <script language= javascript>var foo = '<<bar>>';< /  script><!--<!-- Waah! -- -->";
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
    const text = node.data.replace('\r', '').replace('\n', '');

    if (!text) return;

    const regex = /{{(.(?!{{))*}}/gi;
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
        const line = ['builder.boundText(\'', match.replace('{{', '').replace('}}', ''), '\', ', parent, ');\r\n'].join('');    
        magicString.append(line);
        currentIndex += match.length;
    }

    if (currentIndex < text.length) {
        const previous = text.substring(currentIndex, text.length);
        const line = ['builder.setText(\'', previous, '\', ', parent, ');\r\n'].join('');    
        magicString.append(line);
    }
}

function processNode(node, parent) {
    if (node.type === 'tag') {
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

        magicString.append('\r\n');
    } else if (node.type === 'text') {
        processText(node, parent);
    }  
}

for (let i in handler.dom) {
    processNode(handler.dom[i]);
}

magicString.indent()
    .prepend('function render(builder) {\r\n')
    .append('}');

fs.writeFile('./template.builder/component.view.js', magicString.toString());


