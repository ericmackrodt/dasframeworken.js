var htmlparser = require("htmlparser2");
var MagicString = require('magic-string');
var path = require('path');

const BASE_FRAMEWORK_URI = 'base';
const TEMPLATE_FACTORY_VARIABLE = 'templateFactory';
const CONTROLLER_VARIABLE = 'controller';
const COMPONENT_CONTAINER_VARIABLE = 'container';
const ROOT_ELEMENT = 'root';

var directiveRegistry = require('./../base/directives/registry.ts');

const parentParameter = (parent: string) => parent ? ', ' + parent : '';
const createRootLine = (varName: string, selector: string, key: string, parent: string) => `const ${varName} = ${TEMPLATE_FACTORY_VARIABLE}.createRoot('${selector}', ${key}${parentParameter(parent)});\r\n`;
const createElementLine = (varName: string, nodeName: string, parent: string) => `const ${varName} = ${TEMPLATE_FACTORY_VARIABLE}.createElement(${COMPONENT_CONTAINER_VARIABLE}, '${nodeName}'${parentParameter(parent)});\r\n`;
const createAttributeLine = (key: string, value: string, parentVarName: string) => `${TEMPLATE_FACTORY_VARIABLE}.setAttribute('${key}', '${value}', ${parentVarName});\r\n`;
const createEventLine = (event: string, fn: string, parentVarName: string) => `${TEMPLATE_FACTORY_VARIABLE}.setEvent(${COMPONENT_CONTAINER_VARIABLE}, '${event}', ($event) => ${CONTROLLER_VARIABLE}.${fn}, ${parentVarName});\r\n`;

const createBindingLine = (elementProperty: string, property: string, element: string) => `${TEMPLATE_FACTORY_VARIABLE}.setBinding(${COMPONENT_CONTAINER_VARIABLE}, '${property}', () => {
    if (${element}.${elementProperty} !== ${CONTROLLER_VARIABLE}.${property}) {
        ${element}.${elementProperty} = ${CONTROLLER_VARIABLE}.${property};
    }
});\r\n`;

const createDirectiveLine = (directive: string, value: string, parent: string) => `${TEMPLATE_FACTORY_VARIABLE}.setDirective(${COMPONENT_CONTAINER_VARIABLE}, ${CONTROLLER_VARIABLE}, '${directive}', '${value}', ${ROOT_ELEMENT}, ${parent}DirectiveContext);\r\n`;

const setTextLine = (property: string, parentVarName: string) => `${TEMPLATE_FACTORY_VARIABLE}.setText('${property}', ${parentVarName});\r\n`;
const boundTextLine = (property: string, parentVarName: string) => `${TEMPLATE_FACTORY_VARIABLE}.boundText(${COMPONENT_CONTAINER_VARIABLE}, '${property}', ${parentVarName}, () => ${CONTROLLER_VARIABLE}.${property});\r\n`;
const importLine = (key: string, imported: IKeyValue<string>) => `import { ${key} } from '${imported[key]}';\r\n`;

interface ICounts {
    [key: string]: { count: number };
}

interface IKeyValue<T> {
    [key: string]: T
}

const usageCounts: ICounts = {
    'div': { count: 0 }
};

const buildVarName = (node: any) => {
    let el = usageCounts[node.name];
    if (!el) {
        el = usageCounts[node.name] = { count: 0 };
    }
    const result = node.name.replace('-', '_') +  el.count;
    el.count++;
    return result;
};

export default (html: string) => {
    if (this.cacheable) this.cacheable();

    const magicString = new MagicString('', { filename: 'component.view.js' });
    const imports: IKeyValue<string>[] = [];
    let selector = '';

    const processChildren = (children: any[], varName: string) => children && children.forEach((child) => processNode(child, varName));

    const processRoot = (node: any, parent: string) => {
        const parentName = parent ? ', ' + parent : '';
        let json = node.attribs.controller;
        while (json.indexOf('\'') > -1) {
            json = json.replace('\'', '"');
        }

        const controller = JSON.parse(json);
        imports.push(controller);
        const key = Object.keys(controller)[0];

        selector = node.attribs.selector;
        magicString.append(createRootLine(ROOT_ELEMENT, selector, key, parent));
        processChildren(node.children, ROOT_ELEMENT);
    };

    const frameworkAttributes = (name: string): Function => (<IKeyValue<Function>>{
        'bind': createBindingLine,
        'trigger': createEventLine
    })[name];

    const partialAttribute = (name: string, value: string, varName: string) => {
        const definition = name.split(':');
        const attribute = frameworkAttributes(definition[0]);
        if (attribute) {
            return attribute(definition[1], value, varName);
        }
    };

    const reservedAttribute = (name: string, value: string, varName: string) => {
        const attribute = frameworkAttributes(name);
        if (attribute) {
            return attribute(value, varName);
        }
    };

    const processAttribute = (varName: string, key: string, value: string) => {
        const directive = directiveRegistry.find(key);
        let attr;
        if (directive) {
            attr = createDirectiveLine(key, value, varName);
        }

        if (!attr) {
            attr = 
                reservedAttribute(key, value, varName) ||
                partialAttribute(key, value, varName) ||
                createAttributeLine(key, value, varName);
        }

        magicString.append(attr);
    };

    const processTag = (node: any, parent: string) => {
        const varName = buildVarName(node);

        const attributeKeys = Object.keys(node.attribs);

        const internalDirectives = [
            '@if', '@for'
        ];

        const directives = attributeKeys.filter((key) => internalDirectives.indexOf(key) > -1);
        const normalAttributes = attributeKeys.filter((key) => internalDirectives.indexOf(key) < 0);
        if (directives && directives.length) {
            magicString.append(`const ${varName}DirectiveContext = (context) => {\r\n`);
        }        

        magicString.append(createElementLine(varName, node.name, parent));

        if (normalAttributes && normalAttributes.length) {
            normalAttributes.forEach((key) => processAttribute(varName, key, node.attribs[key]));
        }

        processChildren(node.children, varName);

        if (directives && directives.length) {
            magicString.append(`return ${varName};
            };\r\n`);
        }

        directives.forEach((key) => magicString.append(createDirectiveLine(key, node.attribs[key], varName)));
    };

    const reservedTags = (name: string) => (<IKeyValue<Function>>{
        'component': processRoot
    })[name];

    const processElement = (node: any, parent: string) => {
        const reserved = reservedTags(node.name);

        if (reserved) {
            reserved(node, parent);
        } else {
            processTag(node, parent);
        }
    };

    const processText = (node: any, parent: string) => {
        const text = node.data.replace('\r', '').replace('\n', '').trim();

        if (!text) return;

        const regex = /@{\s*([^\s}}]+)\s*}/g;
        let result;
        let currentIndex = 0;
        while ((result = regex.exec(text))) {
            const previous = text.substring(currentIndex, result.index);
            if (previous) {
                magicString.append(setTextLine(previous, parent));
            }
            currentIndex += previous.length;
            const match = result[0];
            magicString.append(boundTextLine(result[1], parent));
            currentIndex += match.length;
        }

        if (currentIndex < text.length) {
            const previous = text.substring(currentIndex, text.length);
            magicString.append(setTextLine(previous, parent));
        }
    };

    const nodeType = (type: string) => (<IKeyValue<Function>>{
        tag: processElement, 
        text: processText
    }) [type];

    const processNode = (node: any, parent?: string) => nodeType(node.type)(node, parent);

    const handler = new htmlparser.DefaultHandler(function (error: any, dom: any) {
        if (error)
            console.log(error);
        else
            console.log('done');
    });
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(html);

    for (let node of handler.dom) {
        processNode(node);
    }

    const imps = imports.map((imported) => {
        const key = Object.keys(imported)[0];
        return importLine(key, imported);
    });

    magicString.indent()
        .prepend(`(${CONTROLLER_VARIABLE}, ${COMPONENT_CONTAINER_VARIABLE}) => {\r\n`)
        .append(`return ${ROOT_ELEMENT};
    }\r\n`);

    const key = Object.keys(imports[0])[0];
    console.log(key);
    var wrap = 
        `"use strict";
        import * as ${TEMPLATE_FACTORY_VARIABLE} from '${BASE_FRAMEWORK_URI}/templates/template.factory';
        ${imps.join('\r\n')}
        export default {
            selector: '${selector}',
            controller: ${key},
            render: ${magicString.toString()}
        };`;

    return wrap;
};