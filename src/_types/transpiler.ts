import { IHtmlAttribute, IHtmlElement } from './index';

export type DirectiveFunction = (directive: IHtmlAttribute, node: IHtmlElement, nodeVarName: string, parentVarName: string, contextVariables?: string[]) => void;

export interface ICounts {
    [key: string]: { count: number };
}