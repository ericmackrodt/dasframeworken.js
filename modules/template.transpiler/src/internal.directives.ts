import { IHtmlAttribute, DirectiveFunction, IKeyValue } from './_types';
import { ifDirectiveLine, forDirectiveLine, directiveContextLine } from './code.funcs';
import { FOR_DIRECTIVE_EXPRESSION_REGEX } from './constants';

const processIfDirective = (directive: IHtmlAttribute, nodeVarName: string, parentVarName: string) => {
    const contextVarName = `${nodeVarName}IfDirectiveContext`;
    const directiveLine = ifDirectiveLine(directive.value, parentVarName, contextVarName);

    return {
        content: directiveLine,
        contextStart: directiveContextLine(contextVarName),
        contextEnd: `return ${nodeVarName};\n};\n`
    };
}

const processForDirective = (directive: IHtmlAttribute, nodeVarName: string, parentVarName: string, contextVariables?: string[]) => {
    const expressionMatch = directive.value.match(FOR_DIRECTIVE_EXPRESSION_REGEX);
    const itemVariable = expressionMatch[1];
    contextVariables.push(itemVariable);
    const listVariable = expressionMatch[2];
    const contextVarName = `${nodeVarName}ForDirectiveContext`;       
    const directiveLine = forDirectiveLine(listVariable, parentVarName, contextVarName);

    return {
        content: directiveLine,
        contextStart: directiveContextLine(contextVarName, itemVariable),
        contextEnd: `return ${nodeVarName};\n};\n`
    };
}

export const internalDirectives = (name: string): DirectiveFunction => (<IKeyValue<DirectiveFunction>>{
    '@if': processIfDirective,
    '@for': processForDirective
})[name];

export const isInternalDirective = (name: string) => typeof internalDirectives(name) === 'function';