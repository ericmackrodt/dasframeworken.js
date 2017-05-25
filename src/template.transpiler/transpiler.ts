var MagicString = require('magic-string');
var path = require('path');

import htmlObjectBuilder from './html.object.builder';
import { IHtmlElement, ElementTypeEnum, IHtmlAttribute } from '../_types';

const BASE_FRAMEWORK_URI = 'base';
const TEMPLATE_FACTORY_VARIABLE = 'templateFactory';
const CONTROLLER_VARIABLE = 'controller';
const COMPONENT_CONTAINER_VARIABLE = 'container';
const ROOT_ELEMENT = 'root';
const VAR_TYPE = 'const';

var directiveRegistry = require('./../base/directives/registry.ts');

const parentParameter = (parent: string) => parent ? ', ' + parent : '';
const createRootLine = (selector: string, key: string, parent: string) => `${TEMPLATE_FACTORY_VARIABLE}.createRoot('${selector}', ${key}${parentParameter(parent)});\n`;
const createElementLine = (nodeName: string, parent: string) => `${TEMPLATE_FACTORY_VARIABLE}.createElement(${COMPONENT_CONTAINER_VARIABLE}, '${nodeName}'${parentParameter(parent)});\n`;
const createAttributeLine = (key: string, value: string, parentVarName: string) => `${TEMPLATE_FACTORY_VARIABLE}.setAttribute('${key}', '${value}', ${parentVarName});\n`;
const createEventLine = (event: string, fn: string, parentVarName: string) => `${TEMPLATE_FACTORY_VARIABLE}.setEvent(${COMPONENT_CONTAINER_VARIABLE}, '${event}', ($event) => ${CONTROLLER_VARIABLE}.${fn}, ${parentVarName});\n`;

const createBindingLine = (elementProperty: string, property: string, element: string) => `${TEMPLATE_FACTORY_VARIABLE}.setBinding(${COMPONENT_CONTAINER_VARIABLE}, '${property}', () => {
    if (${element}.${elementProperty} !== ${CONTROLLER_VARIABLE}.${property}) {
        ${element}.${elementProperty} = ${CONTROLLER_VARIABLE}.${property};
    }
});\n`;

const createDirectiveLine = (directive: string, value: string, parent: string) => `${TEMPLATE_FACTORY_VARIABLE}.setDirective(${COMPONENT_CONTAINER_VARIABLE}, ${CONTROLLER_VARIABLE}, '${directive}', '${value}', ${ROOT_ELEMENT}, ${parent}DirectiveContext);\n`;

const setTextLine = (property: string, parentVarName: string) => `${TEMPLATE_FACTORY_VARIABLE}.setText('${property}', ${parentVarName});\n`;
const boundTextLine = (property: string, parentVarName: string) => `${TEMPLATE_FACTORY_VARIABLE}.boundText(${COMPONENT_CONTAINER_VARIABLE}, '${property}', ${parentVarName}, () => `;
const importLine = (key: string, imported: IKeyValue<string>) => `import { ${key} } from '${imported[key]}';\n`;
const FUNCTION_TAIL = ');\n';

interface ICounts {
    [key: string]: { count: number };
}

interface IKeyValue<T> {
    [key: string]: T
}

let usageCounts: ICounts = {
    'div': { count: 0 }
};

const buildVarName = (node: IHtmlElement) => {
    let el = usageCounts[node.name];
    if (!el) {
        el = usageCounts[node.name] = { count: 0 };
    }
    const result = node.name.replace('-', '_') +  el.count;
    el.count++;
    return result;
};

export default (html: string, fileName?: string) => {
    if (this.cacheable) this.cacheable();

    usageCounts = {
        'div': { count: 0 }
    };

    const magicString = new MagicString(html, { filename: fileName });
    const imports: IKeyValue<string>[] = [];
    let selector = '';

    const processChildren = (children: any[], varName: string) => children && children.forEach((child) => processNode(child, varName));

    const setLine = (replace: string, start: number, end: number, prepend?: string, append?: string) => {
        magicString.overwrite(start, end, replace, true);
        if (prepend) {
            magicString.prependLeft(start, prepend);
        }

        if (append) {
            magicString.prependLeft(end, append);
        }
    }

    const processRoot = (node: IHtmlElement, parent: string) => {
        const parentName = parent ? ', ' + parent : '';
        let json = node.attributes['controller'].value;
        while (json.indexOf('\'') > -1) {
            json = json.replace('\'', '"');
        }
        debugger;
        const controller = JSON.parse(json);
        imports.push(controller);
        const key = Object.keys(controller)[0];

        selector = node.attributes['selector'].value;

        const rootLine = createRootLine(selector, key, parent);

        // Remove attributes
        Object.keys(node.attributes).forEach((key) => {
            const attr = node.attributes[key];
            magicString.remove(attr.startIndex, attr.endIndex);
        });

        if (node.closingTag) {
            magicString.remove(node.closingTag.startIndex, node.closingTag.endIndex);
        }

        setLine(ROOT_ELEMENT, node.startIndex, node.endIndex, 'const ', ' = ' + rootLine);

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

    const processAttribute = (varName: string, key: string, attribute: IHtmlAttribute) => {
        const directive = directiveRegistry.find(key);
        let attr;
        if (directive) {
            attr = createDirectiveLine(key, attribute.value, varName);
        }

        if (!attr) {
            attr = 
                reservedAttribute(key, attribute.value, varName) ||
                partialAttribute(key, attribute.value, varName) ||
                createAttributeLine(key, attribute.value, varName);
        }

        magicString.overwrite(attribute.startIndex, attribute.endIndex, attr);
    };

    const processTag = (node: IHtmlElement, parent: string) => {
        const attributeKeys = Object.keys(node.attributes);

        const internalDirectives = [
            '@if', '@for'
        ];

        const directives = attributeKeys.filter((key) => internalDirectives.indexOf(key) > -1);
        const normalAttributes = attributeKeys.filter((key) => internalDirectives.indexOf(key) < 0);

        const varName = buildVarName(node);

        if (node.closingTag) {
            magicString.remove(node.closingTag.startIndex, node.closingTag.endIndex);
        }
        debugger;
        // magicString.overwrite(node.startIndex, node.endIndex, element);

        if (node.tail) {
            magicString.remove(node.tail, node.tail + 1);
        }

        const elementLine = ' = ' + createElementLine(node.name, parent);
        debugger;

        if (normalAttributes && normalAttributes.length) {
            normalAttributes.forEach((key) => processAttribute(varName, key, node.attributes[key]));
        }

        processChildren(node.children, varName);
        directives.forEach((key) => { 
            const directive = node.attributes[key];
            const directiveLine = createDirectiveLine(key, directive.value, varName);
            magicString.overwrite(directive.startIndex, directive.endIndex, directiveLine);
            magicString.move(directive.startIndex, directive.endIndex, node.closingTag.endIndex);
        });

        setLine(varName, node.startIndex, node.endIndex, 'const ', elementLine);

        if (directives && directives.length) {
            magicString.prependLeft(node.startIndex, `const ${varName}DirectiveContext = (context) => {\n`);
            magicString.appendLeft(node.closingTag.endIndex, `return ${varName};\n};\n`);
        }
    };

    const reservedTags = (name: string) => (<IKeyValue<Function>>{
        'component': processRoot
    })[name];

    const processElement = (node: IHtmlElement, parent: string) => {
        const reserved = reservedTags(node.name);

        parent = parent || ROOT_ELEMENT;

        if (reserved) {
            reserved(node, parent);
        } else {
            processTag(node, parent);
        }
    };

    const textCleanup = (text: string) => {
        const spacingRegex = /(\s\s+)/;
        const lineBreaksRegex = /([\n\r]+)|(\\[rn])/;
        let result = text;
        while (spacingRegex.test(result)) {
            result = result.replace(spacingRegex, ' ');
        }
        while (lineBreaksRegex.test(result)) {
            result = result.replace(lineBreaksRegex, '');
        }
        return result;
    };

    const processText = (node: IHtmlElement, parent: string) => {
        debugger;
        const text = node.value;//.replace('\r', '').replace('\n', '').trim();

        if (!text) return;
        debugger;
        const regex = /@{\s*([^\s}}]+)\s*}/g;
        let result;
        let currentIndex = 0;

        parent = parent || ROOT_ELEMENT;

        while ((result = regex.exec(text))) {
            const previous = text.substring(currentIndex, result.index);

            // If there's text before the binding, clean it and replace it for a text line.
            const cleaned = textCleanup(previous);
            const cleanStart = node.startIndex + currentIndex;
            const cleanEnd = cleanStart + previous.length;
            if (cleaned && cleaned.trim()) {
                magicString.overwrite(cleanStart, cleanEnd, setTextLine(cleaned, parent));
            } else if (previous) {
                magicString.remove(cleanStart, cleanEnd);
            }
            currentIndex += previous.length;
            const match = result[0];
            const textLine = boundTextLine(result[1], parent);

            const start = node.startIndex + result.index;
            const end = start + match.length;

            magicString.overwrite(start, end, `${CONTROLLER_VARIABLE}.${result[1]}`, true);
            magicString.prependRight(start, textLine);
            magicString.appendLeft(end, FUNCTION_TAIL);

            // magicString.overwrite(start, end, textLine);

            currentIndex += match.length;
        }

        const start = node.startIndex + currentIndex;
        if (start < node.endIndex) {
            const previous = text.substring(currentIndex, text.length);
            const cleaned = textCleanup(previous);
            const end = node.endIndex;
            if (cleaned && cleaned.trim()) {
                const textLine = setTextLine(cleaned, parent);
                magicString.overwrite(start, end, textLine);
            } else if (previous) {
                magicString.remove(start, end);
            }
        }
    };

    const nodeType = (type: ElementTypeEnum) => (<IKeyValue<Function>>{
        [ElementTypeEnum.Element]: processElement, 
        [ElementTypeEnum.Text]: processText
    }) [type];

    const processNode = (node: IHtmlElement, parent?: string) => nodeType(node.type)(node, parent);

    const document = htmlObjectBuilder(html);

    document.forEach(node => processNode(node));

    const imps = imports.map((imported) => {
        const key = Object.keys(imported)[0];
        return importLine(key, imported);
    });

    magicString
        .prepend(`(${CONTROLLER_VARIABLE}, ${COMPONENT_CONTAINER_VARIABLE}) => {\n`)
        .append(`        return ${ROOT_ELEMENT};
    }\n`);

    const key = Object.keys(imports[0] || {})[0];
    var wrap = 
`"use strict";
import * as ${TEMPLATE_FACTORY_VARIABLE} from '${BASE_FRAMEWORK_URI}/templates/template.factory';
${imps.join('\n')}
export default {
    selector: '${selector}',
    controller: ${key},
    render: ${magicString.toString()}
};`;

    const map = magicString.generateMap({
        file: fileName + '.map',
        source: fileName,
        includeContent: true,
        hires: true
    });

    return { source: wrap, map: map };
};