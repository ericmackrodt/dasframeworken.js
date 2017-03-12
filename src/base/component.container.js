import { TemplateBuilder } from './template.builder';
import * as utils from './component.utils';

export class ComponentContainer {    
    constructor(diContainer, component) {
        this._container = diContainer;
        utils.setupController(component.controller);
        this._component = component;
    }

    initialize(element) {
        this._controller = this._container.resolve(this._component.controller);
        this._templateBuilder = new TemplateBuilder(element, this._controller);
        this._component.render(this._templateBuilder);
    }

    teardown() {
        if (this._instance && typeof this._instance.onTeardown === 'function') {
            this._instance.teardown();
        }
    }
}