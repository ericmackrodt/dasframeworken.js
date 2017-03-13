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
    }

    initialize(element) {
        this._controller = this._container.resolve(this._component.controller);
        this._templateBuilder = new TemplateBuilder(this, element);
        this._component.render(this._templateBuilder);
    }

    setBinding(element, elementProperty, controllerProperty) {
        this._bindings.subscribe(controllerProperty, (key) =>  { 
            debugger;
            element[elementProperty] = this._controller[key] });
        this._controller.onPropertyChanged = (name) => this._bindings.emit(name);
        element[elementProperty] = this._controller[controllerProperty];
    }

    // TODO: fixme
    setInwardBinding(element, controllerProperty) {
        element.addEventListener('input', (change) => {
            setTimeout(() => {
                const start = element.selectionStart;
                const end = element.selectionEnd;
                this._controller[controllerProperty] = change.target.value;
                element.setSelectionRange(start, end);
            });
        }, true);
    }
    
    setEvent(element, event, callback) {
        const key = callback.replace('()', '');
        element.addEventListener(event.replace('trigger:', ''), (arg) => { 
            this._controller[key](arg); 
        }, false);
    }

    teardown() {
        this._bindings.teardown();

        if (this._instance && typeof this._instance.onTeardown === 'function') {
            this._instance.teardown();
        }
    }
}