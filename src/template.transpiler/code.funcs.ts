import { 
    CONTROLLER_VARIABLE, 
    TEMPLATE_FACTORY_VARIABLE, 
    COMPONENT_CONTAINER_VARIABLE 
} from './constants';
import { IKeyValue } from "_types";

export const parentParameter = (parent: string) => parent ? ', ' + parent : '';
export const createRootLine = (selector: string, key: string, parent: string) => `${TEMPLATE_FACTORY_VARIABLE}.createRoot('${selector}', ${key}${parentParameter(parent)});\n`;
export const createElementLine = (nodeName: string, parent: string) => `${TEMPLATE_FACTORY_VARIABLE}.createElement(${COMPONENT_CONTAINER_VARIABLE}, '${nodeName}'${parentParameter(parent)});\n`;
export const createAttributeLine = (key: string, value: string, parentVarName: string) => `${TEMPLATE_FACTORY_VARIABLE}.setAttribute('${key}', '${value}', ${parentVarName});\n`;
export const createEventLine = (event: string, fn: string, parentVarName: string) => `${TEMPLATE_FACTORY_VARIABLE}.setEvent(${COMPONENT_CONTAINER_VARIABLE}, '${event}', ($event) => ${CONTROLLER_VARIABLE}.${fn}, ${parentVarName});\n`;

export const createBindingLine = (elementProperty: string, property: string, element: string) => `${TEMPLATE_FACTORY_VARIABLE}.setBinding(${COMPONENT_CONTAINER_VARIABLE}, '${property}', () => {
    if (${element}.${elementProperty} !== ${CONTROLLER_VARIABLE}.${property}) {
        ${element}.${elementProperty} = ${CONTROLLER_VARIABLE}.${property};
    }
});\n`;

export const ifDirectiveLine = (condition: string, parentVarName: string, nodeVarName: string) => `${TEMPLATE_FACTORY_VARIABLE}.ifDirective(${COMPONENT_CONTAINER_VARIABLE}, ${CONTROLLER_VARIABLE}, '${condition}', ${parentVarName}, ${nodeVarName}IfDirectiveContext);\n`;
export const forDirectiveline = (listProperty: string, parentVarName: string, nodeVarName: string) => `${TEMPLATE_FACTORY_VARIABLE}.forDirective(${COMPONENT_CONTAINER_VARIABLE}, ${CONTROLLER_VARIABLE}, '${listProperty}', () => ${CONTROLLER_VARIABLE}.${listProperty}, ${parentVarName}, ${nodeVarName}ForDirectiveContext);\n`;
export const setTextLine = (property: string, parentVarName: string) => `${TEMPLATE_FACTORY_VARIABLE}.setText('${property}', ${parentVarName});\n`;
export const boundTextLine = (property: string, parentVarName: string) => `${TEMPLATE_FACTORY_VARIABLE}.boundText(${COMPONENT_CONTAINER_VARIABLE}, '${property}', ${parentVarName}, () => `;
export const importLine = (symbol: string, file: string) => `import { ${symbol} } from '${file}';`;
export const importAsLine = (symbol: string, file: string) => `import * as ${symbol} from '${file}';`;
export const FUNCTION_TAIL = ');\n';