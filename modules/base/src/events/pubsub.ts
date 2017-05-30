import { Subscriber } from './subscriber';

export class Pubsub {
    private _subscriptions: any

    constructor () {
        this._subscriptions = {};
    }

    subscribe(name: string, callback: Function) {
        let subscription = this._subscriptions[name];
        if (!subscription) {
            this._subscriptions[name] = subscription = new Subscriber();
        }
        subscription.subscribe(callback);
    }

    emit(name: string, data: any) {
        let subscription = this._subscriptions[name];
        if (subscription) {
            subscription.emit(data);
        }
    }

    get(name: string) {
        return this._subscriptions[name];
    }

    unsubscribe(name: string) {
        let subscription = this._subscriptions[name];
        if (subscription) {
            subscription.teardown();
        }
        delete this._subscriptions[name];
    }

    teardown() {
        for (let key of Object.keys(this._subscriptions)) {
            this.unsubscribe(key);
        }
        delete this._subscriptions;
    }
}