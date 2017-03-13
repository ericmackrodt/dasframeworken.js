export class Subscriber {
    constructor() {
        this._subscriptions = [];
    }

    subscribe(fn) {
        if (this._subscriptions) {
            this._subscriptions.push(fn);
        } 
    }

    emit(data) {
        this._subscriptions.forEach(sub => { 
            setTimeout(() => sub(data), 1);
        });
    }

    remove(fn) {
        const index = this._subscriptions.indexOf(fn);
        this._subscriptions.splice(index, 1);
    }

    teardown() {
        for(let i = this._subscriptions.length - 1; i--;){
            this._subscriptions.splice(i, 1);
        }
        delete this._subscriptions;
    }
}