import { IController, IDirective } from './../types/interfaces';
import ExpressionParser from 'goatjs';
import { Pubsub } from "../events/pubsub";

const replaceElement = (oldEl: Element | Comment, newEl: Element | Comment) => oldEl.parentNode.replaceChild(newEl, oldEl);

export class IfDirective implements IDirective {

    static readonly metadata = {
        selector: 'if'
    }

    private _placeholder: Comment;
    private _expression: ExpressionParser;

    private _lastElement: Element;

    constructor(
        private _parent: Element, 
        private _controller: IController, 
        private _evtAggregator: Pubsub,
        private _context: () => Element
    ) {
    }

    private _processEvaluation(result: boolean) {
        if (!this._placeholder) {
            this._placeholder = document.createComment('@if');
        }
        if (result === true) {
            this._lastElement = this._context();
            replaceElement(this._placeholder, this._lastElement);
        } else {
            if (this._lastElement) {
                replaceElement(this._lastElement, this._placeholder);
            } else {
                this._parent.appendChild(this._placeholder);
            }
        }
    }

    private _onFieldChanged(key: string) {
        const result = this._expression.evaluate();
        this._processEvaluation(result);          
    }

    public setup(value: string) {
        if (!this._expression) {
            this._expression = new ExpressionParser(value, this._controller);            
        }

        const result = this._expression.evaluate();

        this._expression.fields.forEach((field: string) => 
            this._evtAggregator.subscribe(field, (key: string) => 
                this._onFieldChanged(key)));
        
        this._processEvaluation(result);   
    }

    public teardown() {
        //TODO: IMPLEMENT TEARDOWN
    }
}