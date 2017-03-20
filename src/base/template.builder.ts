import { ComponentContainer } from './component.container';
import { IController } from './types/interfaces';

export class TemplateBuilder {
    constructor(
        private _componentContainer: ComponentContainer, 
        private _baseElement: Element
    ) {
    }

    createRoot(name: string, controller: IController) {
        const parent = this._baseElement;
        const element = document.createElement(name);
        parent.appendChild(element);
        return element;
    }

    createElement(name: string, parent?: Element) {
        if (!this._componentContainer.instantiateChildComponent(name, parent)) {
            parent = parent || this._baseElement;
            const element = document.createElement(name);
            parent.appendChild(element);
            return element;
        }
    }

    setAttribute(name: string, value: any, parent: Element) {
        if (this._componentContainer.instantiateDirective(name, value, parent)) return;

        if (name.indexOf('trigger:') === 0) { //localName
            this._componentContainer.setEvent(parent, name, value);
        } else if (name === 'binding') {
            this._componentContainer.setBinding(parent, 'value', value);
            this._componentContainer.setInwardBinding(parent as HTMLInputElement, value);
        } else {
            parent.setAttribute(name, value);
        }
    }

    setText(text: string, parent: Element) {
        const node = document.createTextNode(text);
        parent.appendChild(node);
    }

    boundText(key: string, parent: Element) {
        const node = document.createTextNode('');
        parent.appendChild(node);
        this._componentContainer.setBinding(node, 'textContent', key);
    }
}