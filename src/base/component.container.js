import { TemplateBuilder } from './template.builder';
import { Pubsub } from './events/pubsub';
import * as utils from './component.utils';

export class ComponentContainer {    
    constructor(diContainer, component) {
        this._bindings = new Pubsub();
        this._eventListeners = [];
        this._container = diContainer;
        utils.setupController(component.controller);
        this._component = component;
        this._chilren = [];
    }

    _registerEvent(element, event, callback) {
        let listener = this._eventListeners.find(e => e.element === element && e.event === event);
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

    initialize(element) {
        this._controller = this._container.resolve(this._component.controller);
        this._templateBuilder = new TemplateBuilder(this, element);
        this._component.render(this._templateBuilder);
    }

    setBinding(element, elementProperty, controllerProperty) {
        this._bindings.subscribe(controllerProperty, (key) => element[elementProperty] = this._controller[key]);
        if (typeof this._controller.onPropertyChanged !== 'function') {
            this._controller.onPropertyChanged = (name) => this._bindings.emit(name, name);
        }
        element[elementProperty] = this._controller[controllerProperty];
    }

    // TODO: fixme
    setInwardBinding(element, controllerProperty) {
        this._registerEvent(element, 'input', (change) => {
            setTimeout(() => {
                const start = element.selectionStart;
                const end = element.selectionEnd;
                this._controller[controllerProperty] = change.target.value;
                element.setSelectionRange(start, end);
            });
        });
    }
    
    setEvent(element, event, callback) {
        const key = callback.replace('()', '');
        this._registerEvent(element, event.replace('trigger:', ''), (arg) => { 
            this._controller[key](arg); 
        });
    }

    teardown() {
        this._bindings.teardown();
        
        while (this._eventListeners.length) {
            const listener = this._eventListeners[0];
            listener.event.removeEventListener(listener.event, listener.callback);
            this._eventListeners.splice(0, 1);
        }
        delete this._eventListeners;

        if (this._instance && typeof this._instance.onTeardown === 'function') {
            this._instance.teardown();
        }
    }
}