export class TemplateBuilder {
    constructor(componentContainer, baseElement, controller, component) {
        this._subscriptions = [];
        this._componentContainer = componentContainer;
        this._baseElement = baseElement;
        this._controller = controller;
    }

    createRoot(name, controller) {
        parent = this._baseElement;
        const element = document.createElement(name);
        parent.appendChild(element);
        return element;
    }

    createElement(name, parent) {
        if (!this._componentContainer.instantiateChildComponent(name, parent)) {
            parent = parent || this._baseElement;
            const element = document.createElement(name);
            parent.appendChild(element);
            return element;
        }
    }

    setAttribute(name, value, parent) {
        if (this._componentContainer.instantiateDirective(name, value, parent)) return;

        if (name.startsWith('trigger:')) { //localName
            this._componentContainer.setEvent(parent, name, value);
        } else if (name === 'binding') {
            this._componentContainer.setBinding(parent, 'value', value);
            this._componentContainer.setInwardBinding(parent, value);
        } else {
            parent.setAttribute(name, value);
        }
    }

    setText(text, parent) {
        const node = document.createTextNode(text);
        parent.appendChild(node);
    }

    boundText(key, parent) {
        const node = document.createTextNode('');
        parent.appendChild(node);
        this._componentContainer.setBinding(node, 'textContent', key);
    }
}