import { ComponentContainer } from './component.container';
import { IController, IDirective, Type } from './types/interfaces';

export default (componentContainer: ComponentContainer, baseElement: Element) => {
    
    const createRoot = (name: string, controller: IController) => {
        const parent = baseElement;
        const element = document.createElement(name);
        parent.appendChild(element);
        return element;
    };

    const createElement = (name: string, parent?: Element) => {
        if (!componentContainer.instantiateChildComponent(name, parent)) {
            parent = parent || baseElement;
            const element = document.createElement(name);
            parent.appendChild(element);
            return element;
        }
    };

    const setAttribute = (name: string, value: any, parent: Element) => {
        parent.setAttribute(name, value);
    };

    const setBinding = (value: any, parent: Element) => {
        componentContainer.setBinding(parent, 'value', value);
        componentContainer.setInwardBinding(parent as HTMLInputElement, value);
    };

    const setEvent = (event: string, fn: (controller: IController, $event: Event) => any, parent: Element) => {
        componentContainer.setEvent(parent, event, fn);
    };

    const setText = (text: string, parent: Element) => {
        const node = document.createTextNode(text);
        parent.appendChild(node);
    };

    const boundText = (key: string, parent: Element) => {
        const node = document.createTextNode('');
        parent.appendChild(node);
        componentContainer.setBinding(node, 'textContent', key);
    };

    const setDirective = (directive: string, value: any, parent: Element) => {
        componentContainer.instantiateDirective(directive, value, parent)
    }

    return {
        createRoot,
        createElement,
        setBinding,
        setEvent,
        setAttribute,
        setText,
        boundText,
        setDirective
    }
};