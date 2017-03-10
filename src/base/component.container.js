import { TemplateBuilder } from './template.builder';

export class ComponentContainer {    
    constructor(template, controller) {
        this._template = template;
        this._controller = controller;
        // this._events = [];
    }

    initialize(element) {
        this._templateBuilder = new TemplateBuilder(element, this._controller);
        this._template(this._templateBuilder);
    }

    teardown() {
        if (this._instance && typeof this._instance.onTeardown === 'function') {
            this._instance.teardown();
        }
    }
}