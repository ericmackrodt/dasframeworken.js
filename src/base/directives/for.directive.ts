import { IController } from './../types/interfaces';
import { Pubsub } from "../events/pubsub";

export class ForDirective {
    static get metadata() {
        return {
            selector: 'repeat'
        };
    }

    constructor(
        private _parent: Element, 
        private _controller: IController, 
        private _evtAggregator: Pubsub,
        private _context: (item: any) => Element,
        private _collectionFn: () => any
    ) {

    }

    private _updateList() {
        this._parent.innerHTML = '';
        this._collectionFn().forEach((item: any) => {
            const child = this._context(item);
            // this._parent.appendChild(child);   
        });
    }

    private _onFieldChanged() {
        this._updateList();
    }

    setup(field: string) {
        debugger;
        this._evtAggregator.subscribe(field, (key: string) => 
            this._onFieldChanged());
        
        this._updateList();
    }

    teardown() {
        //TODO: IMPLEMENT TEARDOWN
    }
}