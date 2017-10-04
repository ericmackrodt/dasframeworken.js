import { Factory } from './../templates/factory';
export interface IKeyValue<T> {
    [key: string]: T;
}
export interface IController extends Object {
    [key: string]: any;
    onPropertyChanged?: (name: string) => void;
}
export interface ITypeMetadata {
    selector?: string;
    dependencies?: Function[];
}
export interface Type<TType> extends Function {
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
    type: Type<any>;
    instance: any;
}
export interface ITypeRegistry {
    [key: string]: IRegisteredType;
}
export interface IComponentMetadata {
    controller: Type<IController>;
    view: (factory: Factory, controller: IController) => Element;
}
export interface IComponentInstance {
    initialize(element: Element): void;
    registerEvent(element: Element, event: string, callback: (arg: any) => void): void;
    registerBinding(property: string, binding: (property: string) => void): void;
    teardown(): void;
}
export interface IRoute {
    path: string;
    root: Type<IComponentInstance>;
    resolve?: <T>(route: IRoute) => Promise<T> | boolean | void;
}
export interface IModuleOptions {
    preLoad: <T>() => Promise<T> | boolean | void;
    routes: IRoute[];
    root: Type<IComponentInstance>;
}
