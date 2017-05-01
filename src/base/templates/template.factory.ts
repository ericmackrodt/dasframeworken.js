import { ComponentContainer } from './../component.container';
import { IController } from './../types/interfaces';
export const createRoot = (name: string) => {
    return document.createElement(name);
};

export const createElement = (container: ComponentContainer, name: string, parent: Element) => {
    let element = container.instantiateChildComponent(name, parent);
    if (!element) {
        element = document.createElement(name);
        parent.appendChild(element);
    }

    return element;
};

export const setAttribute = (name: string, value: any, parent: Element) => {
    parent.setAttribute(name, value);
};

export const setBinding = (container: ComponentContainer, property: string, fn: () => any) => {
    container.registerBinding(property, fn);
};

export const setEvent = (container: ComponentContainer, event: string, fn: ($event: Event) => any, parent: Element) => {
    container.registerEvent(parent, event, fn);
};

export const setText = (text: string, parent: Element) => {
    const node = document.createTextNode(text);
    parent.appendChild(node);
};

export const boundText = (container: ComponentContainer, property: string, parent: Element, fn: () => string) => {
    const node = document.createTextNode('');
    parent.appendChild(node);
    setBinding(container, property, () => {
        node.textContent = fn();
    });
};

export const setDirective = (container: ComponentContainer, controller: IController, directive: string, value: string, parent: Element, contextFn: (context: any) => Element) => {
    container.instantiateDirective(directive, value, parent, contextFn);
    // componentContainer.instantiateDirective(directive, value, parent)
}