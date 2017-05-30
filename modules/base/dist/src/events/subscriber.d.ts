export declare class Subscriber {
    private _subscriptions;
    constructor();
    subscribe(fn: Function): void;
    emit(data: any): void;
    remove(fn: Function): void;
    teardown(): void;
}
