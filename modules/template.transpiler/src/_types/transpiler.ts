import { IHtmlAttribute } from './index';

export interface IDirectiveCode {
    content: string;
    contextStart: string;
    contextEnd: string;
}

export type DirectiveFunction = (directive: IHtmlAttribute, nodeVarName: string, parentVarName: string, contextVariables?: string[]) => IDirectiveCode;

export interface ICounts {
    [key: string]: { count: number };
}