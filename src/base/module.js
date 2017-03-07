import { componentFactory } from './component.factory';

export class Module {
    get types() {
        return this._types;
    }

    get components() {
        return this._components;
    }

    get rootComponent() {
        return this._rootComponent;
    }

    constructor(container, name, options) {
        this._container = container;
        options = options || {};
        this._name = name;
        this._types = options.types;
        this._components = options.components;
        this._rootComponent = options.rootComponent;
        this._routes = options.routes;

        this._registerTypes(name, this._types);
        this._registerComponents(name, this._components);
    }

    _registerTypes(module, types) {
        types.forEach((type) => {
            this._container.registerType(module, type);
        });
    }

    _registerComponents(module, components) {
        this._components = {};
        components.forEach((c) => this._components[c.metadata.selector] = c);
    }

    _buildComponent(type, element) {
        const controller = this._container.resolve(this._name, type);
        element.innerHTML = type.metadata.template;
        componentFactory(this._components).processElement(element, controller, (component) => {
            return this._container.resolve(this._name, component);
        });
        return element;
    }

    _router(element) {
        const url = location.hash.slice(1) || '/';
        const route = this._routes.find(r => r.path === url);
        if (element && route.root) {
            this._buildComponent(route.root, element);
        }
    }

    _initializeRouting(element) {
        window.addEventListener('hashchange', () => this._router(element));
        window.addEventListener('load', () => this._router(element));
    }

    deploy(element) {
        if (this._rootComponent) {
            this._buildComponent(this._rootComponent, element);
            const outlet = document.getElementsByTagName('router-outlet');
            if (outlet.length > 0) {
                this._initializeRouting(outlet[0]);
            }
        } else if (this._routes) {
            this._initializeRouting(element);
        }
    } 
}