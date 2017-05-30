export class Subscriber {
    private _subscriptions: any[];

    constructor() {
        this._subscriptions = [];
    }

    subscribe(fn: Function) {
        if (this._subscriptions) {
            this._subscriptions.push(fn);
        } 
    }

    emit(data: any) {
        this._subscriptions.forEach(sub => { 
            setTimeout(() => sub(data), 1);
        });
    }

    remove(fn: Function) {
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