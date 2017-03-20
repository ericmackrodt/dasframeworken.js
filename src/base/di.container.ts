import { Type } from './types/interfaces';

const typesRegistry: { [key: string]: { type: Type<any>, instance: any } } = {};

const getName = <T>(type: Type<T>) => type.name;

export const getInstance = <T>(type: Type<T>) => {
    const name = getName(type);
    const registered = typesRegistry[name];
    if (!registered.instance) {
        registered.instance = this.resolve(registered.type);
    }
    return registered.instance;
}

export const resolve = <T>(type: Type<T>) => {
    const dependencies = type.metadata && type.metadata.dependencies || type.dependencies;

    if (!dependencies) {
        return new (type.bind.apply(type, [type].concat([type])));
    }

    const instances = dependencies.map((d) => getInstance(d as Type<T>));
    return new (type.bind.apply(type, [type].concat(instances)));
}

export const registerType = <T>(type: Type<T>) => {
    const name = getName(type);
    const registered = typesRegistry[name];
    if (!registered) {
        typesRegistry[name] = { type: type, instance: undefined };
    }
}