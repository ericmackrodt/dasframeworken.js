// import { componentFactory } from './component.factory';
import { ComponentContainer } from './component.container';
import { Router } from './router';
import * as utils from './utils';
import Container from './di.container';
import { Type } from './types/interfaces';

const registerTypes = (container: Container, types: Type<any>[]) => types.forEach((type) => container.registerType(type));

export class Module {
    private _rootComponent: Frameworken.IComponent;
    private _preLoad: <T>() => Promise<T> | boolean | void;
    private _router: Router;
    private _routeComponentContainer: ComponentContainer;
    private _components: { [key:string]: Frameworken.IComponent };
    private _rootComponentContainer: ComponentContainer;

    get rootComponent() {
        return this._rootComponent;
    }

    constructor(
        private _container: Container,
        private _name: string, 
        options: Partial<Frameworken.IModuleOptions>
    ) {
        options = options || {};
        this._name = name;
        this._rootComponent = options.rootComponent;
        this._preLoad = options.preLoad;

        if (options.types) registerTypes(this._container, options.types);
        if (options.components) this._registerComponents(options.components);
        if (options.routes) this._registerRoutes(options.routes);
    }

    _registerRoutes(routes: Frameworken.IRoute[]) {
        this._router = new Router(routes);
        this._router.onRouteChanging = (oldRoute, newRoute) => {
            if (this._routeComponentContainer) {
                this._routeComponentContainer.teardown();
            }
        };
        this._router.onRouteChanged = (route) => {
            const outlet: Element = document.getElementsByTagName('router-outlet')[0];
            if (route.root && outlet) {
                this._routeComponentContainer = this._buildComponent(route.root, outlet);
            }
        };
    }

    _registerComponents(components: any[]) {
        this._components = {};
        components.forEach((c) => { 
            if (typeof c === 'function' && typeof c.metadata.template) {    
                this._components[c.metadata.selector] = c;
            } else if (typeof c === 'object' && typeof c.render === 'function') {
                this._components[c.selector] = c;
            }
        });
    }

    _buildComponent(type: Frameworken.IComponent, element: Element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

        const container = new ComponentContainer(this._container, this, type);
        container.initialize(element);
        return container;
    }

    getComponent(name: string) {
        return this._components[name];
    }

    deploy(element: HTMLElement) {
        const preLoad = this._preLoad && this._preLoad();
        utils.returnPromise(preLoad).then(() => {
            if (this._rootComponent) {
                this._rootComponentContainer = this._buildComponent(this._rootComponent, element);
            }// else if (this._routes) {
            //     this._initializeRouting(element);
            // }
        });
    } 
}