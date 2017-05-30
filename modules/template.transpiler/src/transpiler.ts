import { CodeTransform } from './code.transform';
import { ROOT_ELEMENT } from './constants';

import htmlObjectBuilder from './html.object.builder';
import { IHtmlElement, ElementTypeEnum, IHtmlAttribute, IBaseHtml } from '../_types';
import { IKeyValue, ICounts } from '../_types';
import { createRootLine, createElementLine, setTextLine, boundTextLine, FUNCTION_TAIL, BASE_CODE_END, baseCodeStart, importLine } from './code.funcs';
import attributeBuilder from './attribute.builder';
import * as utils from './utils';
import { isInternalDirective, internalDirectives } from './internal.directives';

export default (html: string, fileName?: string) => {
    const usageCounts: ICounts = {};
    const codeBuilder = new CodeTransform(html, fileName || '');
    const imports: IKeyValue<string>[] = [];
    let selector = '';

    const buildVarName = (node: IHtmlElement) => {
        let el = usageCounts[node.name];
        if (!el) {
            el = usageCounts[node.name] = { count: 0 };
        }
        const result = node.name.replace('-', '_') +  el.count;
        el.count++;
        return result;
    };

    const processChildren = (children: any[], parentVarName: string, contextVariables?: string[]) => 
        children && children.forEach((child) => processNode(child, parentVarName, contextVariables));

    const processRoot = (node: IHtmlElement, parent: string) => {
        let json = node.attributes['controller'].value;
        while (json.indexOf('\'') > -1) {
            json = json.replace('\'', '"');
        }

        const controller = JSON.parse(json);
        imports.push(controller);
        const key = Object.keys(controller)[0];

        selector = node.attributes['selector'].value;

        const rootLine = createRootLine(selector, key, parent);

        // Remove attributes
        codeBuilder.clearAttributes(node.attributes);

        if (node.closingTag) {
            codeBuilder.removeHtml(node.closingTag);
        }

        codeBuilder.writeLine(node, ROOT_ELEMENT, 'const ', ' = ' + rootLine);

        processChildren(node.children, ROOT_ELEMENT);
    };

    const processAttribute = (parentVarName: string, key: string, attribute: IHtmlAttribute) => {
        const attr = attributeBuilder(parentVarName, key, attribute.value);
        codeBuilder.writeLine(attribute, attr);
    };

    const processInternalDirective = (key: string, attribute: IHtmlAttribute, node: IHtmlElement, nodeVarName: string, parent: string, contextVariables?: string[]) => {
        const directive = internalDirectives(key)(node.attributes[key], nodeVarName, parent || ROOT_ELEMENT, contextVariables);
        codeBuilder.writeDirectiveLine(attribute, node, directive);
    };

    const processTag = (node: IHtmlElement, parent: string, contextVariables?: string[]) => {
        const attributeKeys = Object.keys(node.attributes);

        const directives = attributeKeys.filter((key) => isInternalDirective(key));
        const normalAttributes = attributeKeys.filter((key) => !isInternalDirective(key));

        const nodeVarName = buildVarName(node);
        parent = parent || ROOT_ELEMENT;

        contextVariables = contextVariables || [];

        if (node.closingTag) {
            codeBuilder.removeHtml(node.closingTag);
        }

        if (node.tail) {
            codeBuilder.removeCharacter(node.tail)
        }

        const elementLine = ' = ' + createElementLine(node.name, parent);

        directives.forEach((key) => processInternalDirective(key, node.attributes[key], node, nodeVarName, parent, contextVariables));

        if (normalAttributes && normalAttributes.length) {
            normalAttributes.forEach((key) => processAttribute(nodeVarName, key, node.attributes[key]));
        }

        processChildren(node.children, nodeVarName, contextVariables);        

        codeBuilder.writeLine(node, nodeVarName, 'const ', elementLine);
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

    const processPlainText = (node: IHtmlElement, currentIndex: number, textEndIndex: number, parent: string) => {
        const previous = node.value.substring(currentIndex, textEndIndex);

        const cleaned = utils.textCleanup(previous);
        const start = currentIndex + node.startIndex;
        const textRange: IBaseHtml = {
            startIndex: start,
            endIndex: start + previous.length
        };

        if (cleaned && cleaned.trim()) {
            codeBuilder.writeLine(textRange, setTextLine(cleaned, parent));
        } else if (previous) {
            codeBuilder.removeHtml(textRange);
        }

        return previous;
    }

    const processText = (node: IHtmlElement, parent: string, contextVariables?: string[]) => {
        const text = node.value;
        if (!text) return;

        const boundTextRegex = /@{\s*([^\s}}]+)\s*}/g;
        let result;
        let currentIndex = 0;

        parent = parent || ROOT_ELEMENT;

        while ((result = boundTextRegex.exec(text))) {
            // If there's text before the binding, clean it and replace it for a text line.
            const previous = processPlainText(node, currentIndex, result.index, parent);
            currentIndex += previous.length;
            
            const match = result[0];
            const textLine = boundTextLine(result[1], parent);

            const variable = utils.getVariableContext(result[1], contextVariables);

            const textRange: IBaseHtml = {
                startIndex: node.startIndex + result.index,
                endIndex: node.startIndex + result.index + match.length
            };

            codeBuilder.writeLine(textRange, variable, textLine, FUNCTION_TAIL);

            currentIndex += match.length;
        }

        if (currentIndex < node.endIndex) {
            processPlainText(node, currentIndex, text.length, parent);
        }
    };

    const nodeType = (type: ElementTypeEnum) => (<IKeyValue<Function>>{
            [ElementTypeEnum.Element]: processElement, 
            [ElementTypeEnum.Text]: processText
        }) [type];

    const processNode = (node: IHtmlElement, parent?: string, contextVariables?: string[]) => 
                            nodeType(node.type)(node, parent, contextVariables);

    const document = htmlObjectBuilder(html);

    document.forEach(node => processNode(node));

    const imps = imports.map((imported) => {
        const key = Object.keys(imported)[0];
        return importLine(key, imported[key]);
    });

    const key = Object.keys(imports[0] || {})[0];
    const prepend = baseCodeStart(selector, key, imps);

    codeBuilder
        .prepend(prepend)
        .append(BASE_CODE_END);

    return codeBuilder.generate();
};