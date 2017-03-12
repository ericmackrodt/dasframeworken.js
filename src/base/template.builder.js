

export class TemplateBuilder {
    constructor(baseElement, controller, component) {
        this._subscriptions = [];
        this._baseElement = baseElement;
        this._controller = controller;
    }

    _send(subs, val) {
        subs.forEach((f) => f.element[f.elProp] = val);
    }

    _bound(element, elementProp, ctrl, controlProp) {
        let subs = this._subscriptions[controlProp];
        if (!subs) {
            subs = this._subscriptions[controlProp] = [];
        }

        subs.push({ element: element, elProp: elementProp });
        debugger;

        ctrl.onPropertyChanged = (name) => {
            setTimeout(() => {
                this._send(this._subscriptions[name], ctrl[name]);
            });
        };

        element[elementProp] = ctrl[controlProp];
    }

    _inwardBinding(element, ctrl, prop) {
        element.addEventListener('input', function (change) {
            setTimeout(() => {
                const start = this.selectionStart;
                const end = this.selectionEnd;
                ctrl[prop] = change.target.value;
                this.setSelectionRange(start, end);
            });
        }, true);
    }

    createRoot(name, controller) {
        parent = this._baseElement;
        const element = document.createElement(name);
        parent.appendChild(element);
        return element;
    }

    createElement(name, parent) {
        parent = parent || this._baseElement;
        const element = document.createElement(name);
        parent.appendChild(element);
        return element;
    }

    setAttribute(name, value, parent) {
        if (name.startsWith('trigger:')) { //localName
            var key = value.replace('()', '');
            parent.addEventListener(name.replace('trigger:', ''), (arg) => { 
                this._controller[key](arg); 
            }, false);
        } else if (name === 'binding') {
            this._bound(parent, 'value', this._controller, value);
            this._inwardBinding(parent, this._controller, value);
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
        this._bound(node, 'textContent', this._controller, key);
    }
}