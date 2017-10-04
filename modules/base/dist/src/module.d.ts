import { Container } from './di.container';
import { Type, IComponentInstance, IModuleOptions, IRoute } from './types/interfaces';
export declare class Module {
    private _container;
    private _name;
    private options;
    private _rootComponent;
    private _routeComponent;
    private _preLoad;
    private _router;
    readonly rootComponent: IComponentInstance;
    constructor(_container: Container, _name: string, options: Partial<IModuleOptions>);
    _registerRoutes(routes: IRoute[]): void;
    _buildComponent(type: Type<IComponentInstance>, element: Element): IComponentInstance;
    deploy(element: HTMLElement): void;
}
