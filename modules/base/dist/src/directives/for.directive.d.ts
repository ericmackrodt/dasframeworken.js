import { Pubsub } from "../events/pubsub";
export declare class ForDirective {
    private _parent;
    private _evtAggregator;
    private _context;
    private _collectionFn;
    static readonly metadata: {
        selector: string;
    };
    constructor(_parent: Element, _evtAggregator: Pubsub, _context: (item: any) => Element, _collectionFn: () => any);
    private _updateList();
    private _onFieldChanged();
    setup(field: string): void;
    teardown(): void;
}
