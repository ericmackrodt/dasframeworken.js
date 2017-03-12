export class DIContainer {
    constructor() {
        this._typeRegistry = {};
    }

    _getName(type) {
        return type.name;
    }

    resolve(type) {
        const dependencies = type.metadata && type.metadata.dependencies || type.dependencies;

        if (!dependencies) {
            return new (type.bind.apply(type, [type]))();
        }

        const instances = dependencies.map((d) => this.getInstance(d));
        return new (type.bind.apply(type, [type].concat(instances)))();
    }

    getInstance(type) {
        const name = this._getName(type);
        const registered = this._typeRegistry[name];
        if (!registered.instance) {
            registered.instance = this.resolve(registered.type);
        }
        return registered.instance;
    }

    registerType(type) {
        const name = this._getName( type);
        let registered = this._typeRegistry[name];
        if (!registered) {
            this._typeRegistry[name] = { type: type, instance: null };
        }
    }
}