import { 
    CONTROLLER_VARIABLE, 
    TEMPLATE_FACTORY_VARIABLE, 
    COMPONENT_CONTAINER_VARIABLE,
    BASE_FRAMEWORK_URI,
    ROOT_ELEMENT
} from './constants';

export const parentParameter = (parent: string) => parent ? ', ' + parent : '';
export const createRootLine = (selector: string, key: string, parent?: string) => `${TEMPLATE_FACTORY_VARIABLE}.createRoot('${selector}', ${key}${parentParameter(parent)});\n`;
export const createElementLine = (nodeName: string, parent: string) => `${TEMPLATE_FACTORY_VARIABLE}.createElement(${COMPONENT_CONTAINER_VARIABLE}, '${nodeName}'${parentParameter(parent)});\n`;
export const createAttributeLine = (key: string, value: string, parentVarName: string) => `${TEMPLATE_FACTORY_VARIABLE}.setAttribute('${key}', '${value}', ${parentVarName});\n`;
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
export const importLine = (symbol: string, file: string) => `import { ${symbol} } from '${file}';`;
export const importAsLine = (symbol: string, file: string) => `import * as ${symbol} from '${file}';`;

export const directiveContextLine = (contextVarName: string, ...contextArguments: string[]) => `const ${contextVarName} = (${contextArguments.join(', ')}) => {\n`;

export const FUNCTION_TAIL = ');\n';

export const baseCodeStart = (selector: string, controller: string, imports: string[]) => `"use strict";
${importLine(TEMPLATE_FACTORY_VARIABLE, BASE_FRAMEWORK_URI)}
${imports.join('\n')}\n
export default {
    selector: '${selector}',
    controller: ${controller},
    render: (${CONTROLLER_VARIABLE}, ${COMPONENT_CONTAINER_VARIABLE}) => {\n`;

export const BASE_CODE_END = `        return ${ROOT_ELEMENT};\n    }\n};`;
