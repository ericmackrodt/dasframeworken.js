import { Module } from './module';
import { DIContainer } from './di.container';

export class Frameworken {
    constructor() {
        this._modules = {};
        this._di = new DIContainer();
    }

    module(name, options) {
        let module = this._modules[name];
        if (!module) {
            module = new Module(this._di, name, options);
            this._modules[name] = module;
        }
        return module;
    }
}