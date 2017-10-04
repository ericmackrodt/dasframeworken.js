import { 
    CONTROLLER_VARIABLE, 
    TEMPLATE_FACTORY_VARIABLE, 
    COMPONENT_CONTAINER_VARIABLE,
    COMPONENT_FUNCTION_VARIABLE,
    BASE_FRAMEWORK_URI,
    ROOT_ELEMENT
} from './constants';

export const parentParameter = (parent: string) => parent ? ', ' + parent : '';
export const createRootLine = (selector: string, key: string, parent?: string) => `const ${ROOT_ELEMENT} = ${TEMPLATE_FACTORY_VARIABLE}.root('${selector}', ${key}`;
export const createElementLine = (nodeName: string) => `${TEMPLATE_FACTORY_VARIABLE}.element(${COMPONENT_CONTAINER_VARIABLE}, '${nodeName}`;


export const createEventLine = (event: string, fn: string, parentVarName: string) => `${TEMPLATE_FACTORY_VARIABLE}.setEvent(${COMPONENT_CONTAINER_VARIABLE}, '${event}', ($event) => ${CONTROLLER_VARIABLE}.${fn}, ${parentVarName});\n`;

export const createBindingLine = (elementProperty: string, property: string, element: string) => `${TEMPLATE_FACTORY_VARIABLE}.setBinding(${COMPONENT_CONTAINER_VARIABLE}, '${property}', () => {
    if (${element}.${elementProperty} !== ${CONTROLLER_VARIABLE}.${property}) {
        ${element}.${elementProperty} = ${CONTROLLER_VARIABLE}.${property};
    }
});\n`;

export const ifDirectiveLine = (condition: string, parentVarName: string, contextVarName: string) => `${TEMPLATE_FACTORY_VARIABLE}.ifDirective(${COMPONENT_CONTAINER_VARIABLE}, '${condition}', ${parentVarName}, ${contextVarName});\n`;
export const forDirectiveLine = (listProperty: string, parentVarName: string, contextVarName: string) => `${TEMPLATE_FACTORY_VARIABLE}.forDirective(${COMPONENT_CONTAINER_VARIABLE}, '${listProperty}', () => ${CONTROLLER_VARIABLE}.${listProperty}, ${parentVarName}, ${contextVarName});\n`;
export const setTextLine = (property: string, parentVarName: string) => `${TEMPLATE_FACTORY_VARIABLE}.setText('${property}', ${parentVarName});\n`;
export const boundTextLine = (property: string, parentVarName: string) => `${TEMPLATE_FACTORY_VARIABLE}.boundText(${COMPONENT_CONTAINER_VARIABLE}, '${property}', ${parentVarName}, () => `;
export const importLine = (file: string, ...symbol: string[]) => `import { ${symbol.join(', ')} } from '${file}';`;
export const importAsLine = (symbol: string, file: string) => `import * as ${symbol} from '${file}';`;
export const defaultImportLine = (symbol: string, file: string) => `import ${symbol} from '${file}';`;

export const directiveContextLine = (contextVarName: string, ...contextArguments: string[]) => `const ${contextVarName} = (${contextArguments.join(', ')}) => {\n`;

export const FUNCTION_TAIL = ');\n';

export const baseCodeStart = (controller: string, imports: string[]) => `"use strict";
${importLine(BASE_FRAMEWORK_URI, TEMPLATE_FACTORY_VARIABLE, COMPONENT_FUNCTION_VARIABLE)}
${imports.join('\n')}\n
export default ${COMPONENT_FUNCTION_VARIABLE}({
    controller: ${controller},
    view: (factory, ${CONTROLLER_VARIABLE}) => {\n`;

export const BASE_CODE_END = `        return ${ROOT_ELEMENT};\n    }\n});`;
