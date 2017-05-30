import { ComponentContainer } from './component.container';
import { Container } from './di.container';
export declare class Module {
    private _container;
    private _name;
    private _rootComponent;
    private _preLoad;
    private _router;
    private _routeComponentContainer;
    private _components;
    private _rootComponentContainer;
    readonly rootComponent: Frameworken.IComponent;
    constructor(_container: Container, _name: string, options: Partial<Frameworken.IModuleOptions>);
    _registerRoutes(routes: Frameworken.IRoute[]): void;
    _registerComponents(components: any[]): void;
    _buildComponent(type: Frameworken.IComponent, element: Element): ComponentContainer;
    getComponent(name: string): Frameworken.IComponent;
    deploy(element: HTMLElement): void;
}
