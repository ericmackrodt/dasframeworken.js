import { IKeyValue, IComponentInstance } from './../types/interfaces';
import { randomName } from './../utils';
import { Container } from './../di.container';

export class Factory {
    constructor(
        private _elementRegistry: IKeyValue<Element | Text>,
        private _componentRegistry: any[],
        private _component: IComponentInstance,
        private _container: Container
    ) {

    }

    public root(name: string, ...children: Element[]) {
        const root = document.createElement(name);
        this._elementRegistry[randomName()] = root;
        children.forEach(child => root.appendChild(child));
        return root;
    }

    public element(name: string, attributes: IKeyValue<string>, ...children: (Element | Text)[]) {
        const element = document.createElement(name);
        this._elementRegistry[randomName()] = element;
        if (attributes) {
            Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));
        }
        if (children) {
            children.forEach(child => element.appendChild(child));
        }
        return element;
    }

    public text(content: string) {
        const text = document.createTextNode(content);
        this._elementRegistry[randomName()] = text;
        return text;
    }

    public boundText(property: string, fn: () => string) {
        const text = document.createTextNode('');
        this._elementRegistry[randomName()] = text;
        this._component.registerBinding(property, () => {
            text.textContent = fn();
        });
        return text;
    }

    public setEvent(element: Element, event: string, fn: ($event: Event) => any) {
        this._component.registerEvent(element, event, fn);
    }

    public component(component: any) {
        const c = new component(this._container);
        this._componentRegistry.push(c);
        return c.initialize();
    }
}