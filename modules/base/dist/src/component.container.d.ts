import { Container } from './di.container';
import { IController, IComponentMetadata } from './types/interfaces';
import { Module } from './module';
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
    constructor(_container: Container, _module: Module, _component: IComponentMetadata);
    registerEvent(element: Element, event: string, callback: (arg: any) => void): void;
    initialize(element: Element): Element;
    registerBinding(property: string, binding: (property: string) => void): void;
    setInwardBinding(element: HTMLInputElement, controllerProperty: string): void;
    setEvent(element: Element, event: string, callback: (controller: IController, $event: Event) => any): void;
    instantiateChildComponent(name: string, parent: Element): void;
    instantiateIfDirective(condition: string, parent: Element, contextFn: () => Element): boolean;
    instantiateForDirective(propertyFn: () => any, propertyName: string, parent: Element, contextFn: (item: any) => Element): void;
    teardown(): void;
}
