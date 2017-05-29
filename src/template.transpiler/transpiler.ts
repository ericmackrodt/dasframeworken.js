import { ROOT_ELEMENT, FOR_DIRECTIVE_EXPRESSION_REGEX, CONTROLLER_VARIABLE, TEMPLATE_FACTORY_VARIABLE, BASE_FRAMEWORK_URI, COMPONENT_CONTAINER_VARIABLE } from './constants';
import MagicString = require('magic-string');
var path = require('path');

import htmlObjectBuilder from './html.object.builder';
import { IHtmlElement, ElementTypeEnum, IHtmlAttribute, IBaseHtml, DirectiveFunction } from '../_types';
import { IKeyValue, ICounts } from '_types';
import { createRootLine, createBindingLine, createEventLine, createAttributeLine, ifDirectiveLine, forDirectiveline, createElementLine, setTextLine, boundTextLine, FUNCTION_TAIL, importLine, importAsLine } from './code.funcs';

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

    const processChildren = (children: any[], parentVarName: string, contextVariables?: string[]) => children && children.forEach((child) => processNode(child, parentVarName, contextVariables));

    const setLine = (replace: string, start: number, end: number, prepend?: string, append?: string) => {
        magicString.overwrite(start, end, replace, true);
        if (prepend) {
            magicString.appendLeft(start, prepend);
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

    const partialAttribute = (name: string, value: string, parentVarName: string) => {
        const definition = name.split(':');
        const attribute = frameworkAttributes(definition[0]);
        if (attribute) {
            return attribute(definition[1], value, parentVarName);
        }
    };

    const reservedAttribute = (name: string, value: string, parentVarName: string) => {
        const attribute = frameworkAttributes(name);
        if (attribute) {
            return attribute(value, parentVarName);
        }
    };

    const processAttribute = (parentVarName: string, key: string, attribute: IHtmlAttribute) => {
        const attr = 
            reservedAttribute(key, attribute.value, parentVarName) ||
            partialAttribute(key, attribute.value, parentVarName) ||
            createAttributeLine(key, attribute.value, parentVarName);

        magicString.overwrite(attribute.startIndex, attribute.endIndex, attr);
    };

    const processIfDirective = (directive: IHtmlAttribute, node: IHtmlElement, nodeVarName: string, parentVarName: string) => {
        const directiveLine = ifDirectiveLine(directive.value, parentVarName, nodeVarName);
        magicString.overwrite(directive.startIndex, directive.endIndex, directiveLine);
        magicString.move(directive.startIndex, directive.endIndex, node.closingTag.endIndex);

        magicString.prependLeft(node.startIndex, `const ${nodeVarName}IfDirectiveContext = (context) => {\n`);
        magicString.appendLeft(node.closingTag.endIndex, `return ${nodeVarName};\n};\n`);
    }

    const processForDirective = (directive: IHtmlAttribute, node: IHtmlElement, nodeVarName: string, parentVarName: string, contextVariables?: string[]) => {
        const expressionMatch = directive.value.match(FOR_DIRECTIVE_EXPRESSION_REGEX);
        const itemVariable = expressionMatch[1];
        contextVariables.push(itemVariable);
        const listVariable = expressionMatch[2];
        const directiveLine = forDirectiveline(listVariable, parentVarName, nodeVarName);
        magicString.overwrite(directive.startIndex, directive.endIndex, directiveLine);
        magicString.move(directive.startIndex, directive.endIndex, node.closingTag.endIndex);
        
        magicString.prependLeft(node.startIndex, `const ${nodeVarName}ForDirectiveContext = (${itemVariable}) => {\n`);
        magicString.appendLeft(node.closingTag.endIndex, `return ${nodeVarName};\n};\n`);
    }

    const internalDirectives = (name: string): DirectiveFunction => (<IKeyValue<DirectiveFunction>>{
        '@if': processIfDirective,
        '@for': processForDirective
    })[name];

    const processTag = (node: IHtmlElement, parent: string, contextVariables?: string[]) => {
        const attributeKeys = Object.keys(node.attributes);

        const directives = attributeKeys.filter((key) => typeof internalDirectives(key) === 'function');
        const normalAttributes = attributeKeys.filter((key) => !internalDirectives(key));

        const parentVarName = buildVarName(node);

        contextVariables = contextVariables || [];

        if (node.closingTag) {
            magicString.remove(node.closingTag.startIndex, node.closingTag.endIndex);
        }
        debugger;

        if (node.tail) {
            magicString.remove(node.tail, node.tail + 1);
        }

        const elementLine = ' = ' + createElementLine(node.name, parent);
        debugger;

        directives.forEach((key) => internalDirectives(key)(node.attributes[key], node, parentVarName, parent || ROOT_ELEMENT, contextVariables));

        if (normalAttributes && normalAttributes.length) {
            normalAttributes.forEach((key) => processAttribute(parentVarName, key, node.attributes[key]));
        }

        processChildren(node.children, parentVarName, contextVariables);        

        setLine(parentVarName, node.startIndex, node.endIndex, 'const ', elementLine);
    };

    const reservedTags = (name: string) => (<IKeyValue<Function>>{
        'component': processRoot
    })[name];

    const processElement = (node: IHtmlElement, parent: string, contextVariables?: string[]) => {
        const reserved = reservedTags(node.name);

        parent = parent || ROOT_ELEMENT;

        if (reserved) {
            reserved(node, parent);
        } else {
            processTag(node, parent, contextVariables);
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

    const processVariableContext = (variable: string, contextVariables: string[]) => {
        const arr = variable.split('.');
        return (contextVariables || []).indexOf(arr[0]) >= 0 ? variable : `${CONTROLLER_VARIABLE}.${variable}`;
    }

    const processText = (node: IHtmlElement, parent: string, contextVariables?: string[]) => {
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

            const variable = processVariableContext(result[1], contextVariables);

            magicString.overwrite(start, end, variable, true);
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

    const processNode = (node: IHtmlElement, parent?: string, contextVariables?: string[]) => nodeType(node.type)(node, parent, contextVariables);

    const document = htmlObjectBuilder(html);

    document.forEach(node => processNode(node));

    const imps = imports.map((imported) => {
        const key = Object.keys(imported)[0];
        return importLine(key, imported[key]);
    });

    const key = Object.keys(imports[0] || {})[0];
    const prepend = 
`"use strict";
${importAsLine(TEMPLATE_FACTORY_VARIABLE, BASE_FRAMEWORK_URI + '/templates/template.factory')}
${imps.join('\n')}\n
export default {
    selector: '${selector}',
    controller: ${key},
    render: (${CONTROLLER_VARIABLE}, ${COMPONENT_CONTAINER_VARIABLE}) => {\n`;

magicString
    .prepend(prepend)
    .append(`        return ${ROOT_ELEMENT};
    }\n};`);

    const map = magicString.generateMap({
        file: fileName + '.map',
        source: fileName,
        includeContent: true,
        hires: true
    });

    return { source: magicString.toString(), map: map };
};