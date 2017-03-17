import { Goat } from 'goatjs';

export class IfDirective {
    static get metadata() {
        return {
            selector: 'if'
        };
    }

    constructor(element, controller, evtAggregator) {
        this._element = element;
        this._controller = controller;
        this._evtAggregator = evtAggregator;
        this._placeholder = null;
    }

    _processEvaluation(result) {
        const parent = this._element.parentElement || this._placeholder.parentElement;
        if (!this._placeholder) {
            this._placeholder = document.createComment('iffable: wut');
        }
        if (result === true) {
            parent.replaceChild(this._element, this._placeholder);
        } else {
            parent.replaceChild(this._placeholder, this._element);
        }
    }

    _onFieldChanged(key) {
        const result = this._expression.evaluate();
        this._processEvaluation(result);          
    }

    setup(value) {
        debugger;
        if (!this._expression) {
            this._expression = new Goat(value, this._controller);            
        }

        const result = this._expression.evaluate();

        this._expression.fields.forEach((field) => 
            this._evtAggregator.subscribe(field, (key) => 
                this._onFieldChanged(key)));
        
        this._processEvaluation(result);          
    }

    teardown() {

    }
}