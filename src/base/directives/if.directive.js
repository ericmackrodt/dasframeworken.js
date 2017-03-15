export class IfDirective {
    static get metadata() {
        return {
            selector: 'if'
        };
    }

    constructor(element, controller) {
        this._element = element;
        this._controller = controller;
    }

    setup(value) {
        debugger;
    }

    teardown() {

    }
}