import { IKeyValue } from './_types';
import { createAttributeLine, createBindingLine, createEventLine } from './code.funcs';

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

export default (parentVarName: string, key: string, value: string) => 
    reservedAttribute(key, value, parentVarName) ||
    partialAttribute(key, value, parentVarName) ||
    createAttributeLine(key, value, parentVarName);