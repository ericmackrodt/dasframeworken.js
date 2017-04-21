import { Pubsub } from './events/pubsub';
import * as utils from './component.utils';
import * as directivesRegistry from './directives/registry';
import Container from './di.container';
import { IController, IEventListener, IDirective } from './types/interfaces';

export class ComponentContainer {
    private _controller: IController;
    private _bindings: Pubsub;
    private _eventListeners: IEventListener[];
    private _children: ComponentContainer[];
    private _directives: IDirective[];

    get controller() {
        return this._controller;
    }

    constructor(
        private _container: Container,
        private _module: Frameworken.IModule, 
        private _component: Frameworken.IComponent
    ) {
        this._bindings = new Pubsub();
        this._eventListeners = [];
        utils.setupController(_component.controller);
        this._children = [];
        this._directives = [];
    }

    registerEvent(element: Element, event: string, callback: (arg: any) => void) {
        let listener = this._eventListeners.find((e: IEventListener) => e.element === element && e.event === event);
        if (!listener) {
            listener = {
                element: element,
                event: event,
                callback: callback
            };

            element.addEventListener(event, callback, true);
            this._eventListeners.push(listener);
        }
    }

    initialize(element: Element) {
        this._controller = this._container.resolve(this._component.controller);
        // const builder = templateBuilder(this, element);
        const rendered = this._component.render(this._controller, this);
        element.appendChild(rendered);

        if (typeof this._controller.onPropertyChanged !== 'function') {
            this._controller.onPropertyChanged = (name: string) => this._bindings.emit(name, name);
        }
        return rendered;
    }

    registerBinding(property: string, binding: (property: string) => void) {
        this._bindings.subscribe(property, binding);
        binding(property);
    }

    setInwardBinding(element: HTMLInputElement, controllerProperty: string) {
        this.registerEvent(element, 'input', (change) => {
            const start = element.selectionStart;
            const end = element.selectionEnd;
            setTimeout(() => {
                this._controller[controllerProperty] = change.target.value;
                setTimeout(() => element.setSelectionRange(start, end));
            });
        });
    }
    
    setEvent(element: Element, event: string, callback: (controller: IController, $event: Event) => any) {
        this.registerEvent(element, event, (arg) => callback(this._controller, arg));
    }

    instantiateChildComponent(name: string, parent: Element) {
        const component = this._module.getComponent(name);
        if (!component) return;

        const child = new ComponentContainer(this._container, this._module, component);
        this._children.push(child);
        return child.initialize(parent);
    }

    instantiateDirective(name: string, value: any, parent: Element) {
        const directive = directivesRegistry.find(name);
        if (!directive) return false;
        const instance = directivesRegistry.instantiate(directive, this._controller, this._bindings, value, parent);
        this._directives.push(instance);
        return true;
    }

    teardown() {
        while (this._children.length) {
            const child = this._children[0];
            child.teardown();
            this._children.splice(0, 1);
        }

        delete this._children;

        this._bindings.teardown();
        
        while (this._eventListeners.length) {
            const listener = this._eventListeners[0];
            listener.element.removeEventListener(listener.event, listener.callback);
            this._eventListeners.splice(0, 1);
        }
        delete this._eventListeners;
    }
}