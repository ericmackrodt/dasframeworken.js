import CodeBuilder from './code.builder';
import { ROOT_ELEMENT } from './constants';

import htmlObjectBuilder from './html.object.builder';
import { IHtmlElement, ElementTypeEnum, IHtmlAttribute, IKeyValue, ICounts, IBaseHtml } from './_types';
import { BASE_CODE_END, baseCodeStart, importLine, defaultImportLine } from './code.funcs';
// import attributeBuilder from './attribute.builder';
import * as utils from './utils';
import { isInternalDirective } from './internal.directives';
import * as path from 'path';

export default (html: string, fileName?: string) => {
    const usageCounts: ICounts = {};
    const codeBuilder = new CodeBuilder(html, fileName || '');
    const imports: { key: string[] | string, path: string }[] = [];
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

    const processChildren = (children: any[], contextVariables?: string[]) => {
        codeBuilder.indent();
        const cleaned = cleanChildren(children);
        children && utils.eachInbetween(cleaned, (child) => processNode(child, contextVariables), () => codeBuilder.append(', '));
        codeBuilder.deindent();
    };

    const processAttribute = (parentVarName: string, key: string, attribute: IHtmlAttribute) => {
        // const attr = attributeBuilder(parentVarName, key, attribute.value);
        // codeBuilder.appendLine(attribute, attr);
    };

    const processInternalDirective = (key: string, attribute: IHtmlAttribute, node: IHtmlElement, nodeVarName: string, parent: string, contextVariables?: string[]) => {
        // const directive = internalDirectives(key)(node.attributes[key], nodeVarName, parent || ROOT_ELEMENT, contextVariables);
        // codeBuilder.writeDirectiveLine(attribute, node, directive);
    };

    const processTag = (node: IHtmlElement, contextVariables?: string[]) => {
        codeBuilder.appendLine(`factory.element('${node.name}'`);

        if (node.attributes && Object.keys(node.attributes).length) {
            codeBuilder.append(', ');
            const attrs = Object.keys(node.attributes).map(key => `'${key}': '${node.attributes[key].value}'`);
            codeBuilder.append(`{ ${attrs.join(', ')} }`);
        } else {
            codeBuilder.append(', null');
        }
        debugger;
        if (node.children && cleanChildren(node.children).length) {
            codeBuilder.append(', ');
            processChildren(node.children, contextVariables);
            codeBuilder.appendLine(')');
        } else {
            codeBuilder.append(')');
        }

        // const attributeKeys = Object.keys(node.attributes);

        // const directives = attributeKeys.filter((key) => isInternalDirective(key));
        // const normalAttributes = attributeKeys.filter((key) => !isInternalDirective(key));

        // const nodeVarName = buildVarName(node);
        // parent = parent || ROOT_ELEMENT;

        // contextVariables = contextVariables || [];

        // if (node.closingTag) {
        //     // codeBuilder.removeHtml(node.closingTag);
        // }

        // if (node.tail) {
        //     // codeBuilder.removeCharacter(node.tail)
        // }

        // // const elementLine = ' = ' + createElementLine(node.name, parent);

        // directives.forEach((key) => processInternalDirective(key, node.attributes[key], node, nodeVarName, parent, contextVariables));

        // if (normalAttributes && normalAttributes.length) {
        //     normalAttributes.forEach((key) => processAttribute(nodeVarName, key, node.attributes[key]));
        // }

        // processChildren(node.children, nodeVarName, contextVariables);        

        // codeBuilder.writeLine(node, nodeVarName, 'const ', elementLine);
    };

    // const reservedTags = (name: string) => (<IKeyValue<Function>>{
    //     'template': processRoot
    // })[name];

    const isComponent = (name: string) => imports.findIndex(o => o.key === name) > -1;

    const processComponent = (node: IHtmlElement, contextVariables?: string[]) => {
        codeBuilder.appendLine(`factory.component(${node.name}`);
        
        if (node.attributes && Object.keys(node.attributes).length) {
            codeBuilder.append(', ');
            const attrs = Object.keys(node.attributes).map(key => `'${key}': '${node.attributes[key].value}'`);
            codeBuilder.append(`{ ${attrs.join(', ')} }`);
        }

        if (node.children && cleanChildren(node.children).length) {
            codeBuilder.append(', ');
            processChildren(node.children, contextVariables);
            codeBuilder.appendLine(')');
        } else {
            codeBuilder.append(')');
        }
    }

    const processElement = (node: IHtmlElement, contextVariables?: string[]) => {
        // const reserved = reservedTags(node.name);
        // if (reserved) {
        //     reserved(node);
        // } else 
        if (isComponent(node.name)) {
            processComponent(node, contextVariables);
        } else {
            processTag(node, contextVariables);
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
            codeBuilder.appendLine(`factory.text('${cleaned}')`);
            // codeBuilder.writeLine(textRange, setTextLine(cleaned, parent));
        } else if (previous) {
            // codeBuilder.removeHtml(textRange);
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
            debugger;
            if (previous.length > 0) codeBuilder.append(', ');

            currentIndex += previous.length;
            
            const match = result[0];
            const textLine = `factory.boundText('${result[1]}', () => controller.${result[1]})`;

            const variable = utils.getVariableContext(result[1], contextVariables);

            const textRange: IBaseHtml = {
                startIndex: node.startIndex + result.index,
                endIndex: node.startIndex + result.index + match.length
            };

            codeBuilder.appendLine(textLine);
            // codeBuilder.writeLine(textRange, variable, textLine, FUNCTION_TAIL);

            currentIndex += match.length;
        }

        if (currentIndex < node.endIndex) {
            if (currentIndex > 0) codeBuilder.append(', ');

            processPlainText(node, currentIndex, text.length, parent);
        }
    };

    const nodeType = (type: ElementTypeEnum) => (<IKeyValue<Function>>{
            [ElementTypeEnum.Element]: processElement, 
            [ElementTypeEnum.Text]: processText
        }) [type];

    const processNode = (node: IHtmlElement, contextVariables?: string[]) => 
                            nodeType(node.type)(node, contextVariables);

    const cleanChildren = (nodes: IHtmlElement[]) => nodes.filter(o => !(o.name === '#text' && /^(\s|\n|\r)*?$/.test(utils.textCleanup(o.value))));

    const processTemplate = (node: IHtmlElement, parent?: string) => {
        debugger;
        const controllerPath = node.attributes['controller'].value;
        imports.push({ key: 'Controller', path: controllerPath });
        //Component Imports
        Object.keys(node.attributes)
            .filter(key => key.startsWith('x:'))
            .forEach(key => {
                const symbol = key.split(':')[1];
                const path = node.attributes[key];
                imports.push({ key: symbol, path: path.value });
            });

        let tag = path.basename(fileName);
        
        // fix this please
        tag = tag.replace('.', '-');

        const rootLine = `factory.root('${tag}'`
        codeBuilder.append(rootLine);

        if (node.children && cleanChildren(node.children).length) {
            codeBuilder.append(', ');
            processChildren(node.children);
            codeBuilder.appendLine(');');
        } else {
            codeBuilder.append(');');
        }

        

        // codeBuilder.append(');');
        // codeBuilder.appendLine('');

        // const key = 'Controller' // Object.keys(controller)[0];

        // selector = 'root';// node.attributes['selector'].value;

        // const rootLine = createRootLine(selector, key, parent);

        // // Remove attributes
        // codeBuilder.clearAttributes(node.attributes);

        // if (node.closingTag) {
        //     codeBuilder.removeHtml(node.closingTag);
        // }

        // codeBuilder.writeLine(node, ROOT_ELEMENT, 'const ', ' = ' + rootLine);

        // processChildren(node.children, ROOT_ELEMENT);
    };

    const document = htmlObjectBuilder(html);

    const template = document.find(o => o.name === 'template');

    processTemplate(template);

    const imps = imports.map((imported) => {
        if (imported.key instanceof Array) {
            return importLine(imported.path, ...imported.key);
        } else {
            return defaultImportLine(imported.key, imported.path);
        }
    });

    const key = imports[0].key as string;
    const prepend = baseCodeStart(key, imps);
    codeBuilder
        .prepend('const root = ')
        .indentAll()
        .indentAll()
        .prepend(prepend)
        .appendLine(BASE_CODE_END);

    return codeBuilder.generate();
};