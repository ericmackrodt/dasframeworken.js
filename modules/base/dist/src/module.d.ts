import { ComponentContainer } from './component.container';
import { Container } from './di.container';
import { IComponent, IModuleOptions, IRoute } from './types/interfaces';
export declare class Module {
    private _container;
    private _name;
    private _rootComponent;
    private _preLoad;
    private _router;
    private _routeComponentContainer;
    private _components;
    private _rootComponentContainer;
    readonly rootComponent: IComponent;
    constructor(_container: Container, _name: string, options: Partial<IModuleOptions>);
    _registerRoutes(routes: IRoute[]): void;
    _registerComponents(components: any[]): void;
    _buildComponent(type: IComponent, element: Element): ComponentContainer;
    getComponent(name: string): IComponent;
    deploy(element: HTMLElement): void;
}
