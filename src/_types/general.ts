export interface IKeyValue<T> {
    [key: string]: T;
}

export enum ElementTypeEnum {
    Element,
    Text,
    Comment
}

export interface IBaseHtml {
    startIndex: number;
    endIndex: number;
}

export interface IHtmlAttribute extends IBaseHtml {
    value: string;
}

export interface IHtmlElement extends IBaseHtml {
    name: string;
    attributes?: IKeyValue<IHtmlAttribute>;
    children?: IHtmlElement[];
    value?: string;
    type: ElementTypeEnum,
    closingTag?: IBaseHtml,
    tail?: number;
}