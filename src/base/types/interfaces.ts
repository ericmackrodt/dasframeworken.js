export interface IController extends Object {
    [key: string]: any;
    onPropertyChanged?: (name: string) => void;
}

export interface ITypeMetadata {
    selector?: string;
    dependencies?: Function[];
}

export interface Type<TType> extends Function {
    name: string;
    metadata?: ITypeMetadata;
    dependencies?: Type<Object>[];

    new (...args: any[]): TType;
}

export interface IEventListener {
    element: Element; 
    event: string; 
    callback: (arg: Event) => void;
}

export interface IDirective {
    setup: (value: string) => void;
    teardown: () => void;
}