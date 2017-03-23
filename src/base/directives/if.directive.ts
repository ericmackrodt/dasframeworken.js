import { IController, IDirective } from './../types/interfaces';
import { Goat } from 'goatjs';
import { Pubsub } from "../events/pubsub";

const replaceElement = (oldEl: Element | Comment, newEl: Element | Comment) => oldEl.parentNode.replaceChild(newEl, oldEl);

export class IfDirective implements IDirective {

    static readonly metadata = {
        selector: 'if'
    }

    private _placeholder: Comment;
    private _expression: Goat;

    constructor(
        private _element: Element, 
        private _controller: IController, 
        private _evtAggregator: Pubsub
    ) {
    }

    private _processEvaluation(result: boolean) {
        if (!this._placeholder) {
            this._placeholder = document.createComment('@if');
        }
        if (result === true) {
            replaceElement(this._placeholder, this._element);
        } else {
            replaceElement(this._element, this._placeholder);
        }
    }

    private _onFieldChanged(key: string) {
        const result = this._expression.evaluate();
        this._processEvaluation(result);          
    }

    public setup(value: string) {
        if (!this._expression) {
            this._expression = new Goat(value, this._controller);            
        }

        const result = this._expression.evaluate();

        this._expression.fields.forEach((field: string) => 
            this._evtAggregator.subscribe(field, (key: string) => 
                this._onFieldChanged(key)));
        
        this._processEvaluation(result);          
    }

    public teardown() {

    }
}