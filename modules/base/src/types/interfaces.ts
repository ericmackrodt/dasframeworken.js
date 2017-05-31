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

export interface IRegisteredType {
    type: Type<any>, 
    instance: any
}

export interface ITypeRegistry {
    [key: string]: IRegisteredType
}

export interface IComponent {
    controller: any;
    render: (controller: any, container: any) => Element;
    selector: string;
}

export interface IRoute {
    path: string;
    root: IComponent;
    resolve?: <T>(route: IRoute) => Promise<T> | boolean | void;
}

export interface IModuleOptions {
    preLoad?: <T>() => Promise<T> | boolean | void;
    types?: any[];
    routes?: IRoute[];
    components: Object[];
    rootComponent: IComponent;
}