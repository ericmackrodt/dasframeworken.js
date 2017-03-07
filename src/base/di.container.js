export class DIContainer {
    constructor() {
        this._typeRegistry = {};
    }

    _getName(module, type) {
        return module + ':' + type.name;
    }

    resolve(module, type) {
        const dependencies = type.metadata && type.metadata.dependencies || type.dependencies;

        if (!dependencies) {
            return new (type.bind.apply(type, [type]))();
        }

        const instances = dependencies.map((d) => this.getInstance(module, d));
        return new (type.bind.apply(type, [type].concat(instances)))();
    }

    getInstance(module, type) {
        const name = this._getName(module, type);
        const registered = this._typeRegistry[name];
        if (!registered.instance) {
            registered.instance = this.resolve(module, registered.type);
        }
        return registered.instance;
    }

    registerType(module, type) {
        const name = this._getName(module, type);
        let registered = this._typeRegistry[name];
        if (!registered) {
            this._typeRegistry[name] = { type: type, instance: null };
        }
    }
}