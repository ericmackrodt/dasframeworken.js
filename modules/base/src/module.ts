// import { componentFactory } from './component.factory';
import { Router } from './router';
import * as utils from './utils';
import { Container } from './di.container';
import { Type, IComponentInstance, IModuleOptions, IRoute } from './types/interfaces';

export class Module {
    private _rootComponent: IComponentInstance;
    private _routeComponent: IComponentInstance;
    private _preLoad: <T>() => Promise<T> | boolean | void;
    private _router: Router;
    // private _routerComponent: ComponentContainer;;
    // private _rootComponentContainer: ComponentContainer;

    get rootComponent() {
        return this._rootComponent;
    }

    constructor(
        private _container: Container,
        private _name: string, 
        private options: Partial<IModuleOptions>
    ) {
        options = options || {};
        this._name = name;
        this._preLoad = options.preLoad;
        
        if (options.routes) this._registerRoutes(options.routes);
    }

    _registerRoutes(routes: IRoute[]) {
        this._router = new Router(routes);
        this._router.onRouteChanging = () => {
            if (this._routeComponent) {
                this._routeComponent.teardown();
            }
        };
        this._router.onRouteChanged = (route) => {
            const outlet: Element = document.getElementsByTagName('router-outlet')[0];
            if (route.root && outlet) {
                this._routeComponent = this._buildComponent(route.root, outlet);
            }
        };
    }

    _buildComponent(type: Type<IComponentInstance>, element: Element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

        const component = utils.instantiateType(type, this._container, this);
        component.initialize(element);
        return component;
    }

    deploy(element: HTMLElement) {
        const preLoad = this._preLoad && this._preLoad();
        utils.returnPromise(preLoad).then(() => {
            if (this.options.root) {
                this._rootComponent = this._buildComponent(this.options.root, element);
            } 
            // else if (this.options.routes) {
            //     this._initializeRouting(element);
            // }
        });
    } 
}