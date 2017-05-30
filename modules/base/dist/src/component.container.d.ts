import { Container } from './di.container';
import { IController } from './types/interfaces';
export declare class ComponentContainer {
    private _container;
    private _module;
    private _component;
    private _controller;
    private _bindings;
    private _eventListeners;
    private _children;
    private _directives;
    readonly controller: IController;
    constructor(_container: Container, _module: Frameworken.IModule, _component: Frameworken.IComponent);
    registerEvent(element: Element, event: string, callback: (arg: any) => void): void;
    initialize(element: Element): Element;
    registerBinding(property: string, binding: (property: string) => void): void;
    setInwardBinding(element: HTMLInputElement, controllerProperty: string): void;
    setEvent(element: Element, event: string, callback: (controller: IController, $event: Event) => any): void;
    instantiateChildComponent(name: string, parent: Element): Element;
    instantiateIfDirective(condition: string, parent: Element, contextFn: () => Element): boolean;
    instantiateForDirective(propertyFn: () => any, propertyName: string, parent: Element, contextFn: (item: any) => Element): void;
    teardown(): void;
}
