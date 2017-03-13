import { Subscriber } from './subscriber';

export class Pubsub {
    constructor () {
        this._subscriptions = {};
    }

    subscribe(name, callback) {
        let subscription = this._subscriptions[name];
        if (!subscription) {
            this._subscriptions[name] = subscription = new Subscriber();
        }
        subscription.subscribe(callback);
    }

    emit(name, data) {
        let subscription = this._subscriptions[name];
        if (subscription) {
            subscription.emit(data);
        }
    }

    get(name) {
        return this._subscriptions[name];
    }

    unsubscribe(name) {
        let subscription = this._subscriptions[name];
        if (subscription) {
            subscription.teardown();
        }
        delete this._subscriptions[name];
    }

    teardown() {
        for (let key of this._subscriptions){
            this.unsubscribe(name);
        }
        delete this._subscriptions;
    }
}