export declare class Pubsub {
    private _subscriptions;
    constructor();
    subscribe(name: string, callback: Function): void;
    emit(name: string, data: any): void;
    get(name: string): any;
    unsubscribe(name: string): void;
    teardown(): void;
}
