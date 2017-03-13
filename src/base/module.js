import { componentFactory } from './component.factory';
import { ComponentContainer } from './component.container';
import { Router } from './router';
import * as utils from './utils';

export class Module {
    get rootComponent() {
        return this._rootComponent;
    }

    get container() {
        return this._container;
    }

    constructor(container, name, options) {
        this._container = container;
        options = options || {};
        this._name = name;
        this._rootComponent = options.rootComponent;
        this._preLoad = options.preLoad;

        if (options.types) this._registerTypes(options.types);
        if (options.components) this._registerComponents(options.components);
        if (options.routes) this._registerRoutes(options.routes);
    }

    _registerRoutes(routes) {
        this._router = new Router(routes);
        this._router.onRouteChanging = (oldRoute, newRoute) => {
            if (this._routeComponentContainer) {
                this._routeComponentContainer.teardown();
            }
        };
        this._router.onRouteChanged = (route) => {
            const outlet = document.getElementsByTagName('router-outlet')[0];
            if (route.root && outlet) {
                this._routeComponentContainer = this._buildComponent(route.root, outlet);
            }
        };
    }

    _registerTypes(types) {
        types.forEach((type) => {
            this._container.registerType(type);
        });
    }

    _registerComponents(components) {
        this._components = {};
        components.forEach((c) => { 
            if (typeof c === 'function' && typeof c.metadata.template) {    
                this._components[c.metadata.selector] = c;
            } else if (typeof c === 'object' && typeof c.render === 'function') {
                this._components[c.selector] = c;
            }
        });
    }

    _buildComponent(type, element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

        const container = new ComponentContainer(this, type);
        container.initialize(element);

        // if (typeof type === 'object' && typeof type.render === 'function') {
            
        // } else {
        //     element.innerHTML = type.metadata.template;
        //     const controller = this._container.resolve(type);
        //     componentFactory(this._components).processElement(element, controller, (component) => {
        //         return this._container.resolve(component);
        //     });
        // }

        return container;
    }

    getComponent(name) {
        return this._components[name];
    }

    deploy(element) {
        const preLoad = this._preLoad && this._preLoad();
        utils.returnPromise(preLoad).then(() => {
            if (this._rootComponent) {
                this._rootComponentContainer = this._buildComponent(this._rootComponent, element);
            } else if (this._routes) {
                this._initializeRouting(element);
            }
        });
    } 
}