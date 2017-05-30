import { IController, IDirective } from './../types/interfaces';
import { Pubsub } from "../events/pubsub";
export declare class IfDirective implements IDirective {
    private _parent;
    private _controller;
    private _evtAggregator;
    private _context;
    static readonly metadata: {
        selector: string;
    };
    private _placeholder;
    private _expression;
    private _lastElement;
    constructor(_parent: Element, _controller: IController, _evtAggregator: Pubsub, _context: () => Element);
    private _processEvaluation(result);
    private _onFieldChanged();
    setup(value: string): void;
    teardown(): void;
}
