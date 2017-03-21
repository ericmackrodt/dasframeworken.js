import { Type, ITypeRegistry } from './types/interfaces';
import * as utils from './utils';

const getName = <T>(type: Type<T> | string) => isString(type) ? type : type.name;
const isString = <T>(obj: Type<T> | string): obj is string => typeof obj === 'string';
const throwException = (text: string) => { throw new Error(text) };

/**
 * Represents the container
 */
export default class {
    private _typeRegistry: ITypeRegistry;

    public get typeRegistry() {
        return this._typeRegistry;
    }

    constructor() {
        this._typeRegistry = {};
    }
    
    /**
     * Instantiates a type that is registered in the container with its dependencies.
     * @param type Type that will be instantiated, it can be the type itself or the name.
     */
    public getInstance<T>(type: Type<T> | string) {
        const name = getName(type);
        const registered = this._typeRegistry[name];

        if (!registered) throwException(`Type (${name}) not registered`);

        if (!registered.instance) {
            registered.instance = this.resolve(registered.type);
        }
        return registered.instance;
    }

    /**
     * Instantiates any type and tries to resolve dependencies that are registered in the container.
     * @param type The type to be resolved
     */
    public resolve<T>(type: Type<T>) {
        const dependencies = type.metadata && type.metadata.dependencies || type.dependencies;

        if (!dependencies) {
            return utils.instantiateType(type);
        }

        const instances = dependencies.map((d) => this.getInstance(d as Type<T>));
        return utils.instantiateType(type, ...instances);
    }

    /**
     * Registers a type in the container.
     * @param type Type to be registered
     */
    public registerType <T>(type: Type<T>) {
        const name = getName(type);
        const registered = this._typeRegistry[name];
        if (!registered) {
            this._typeRegistry[name] = { type: type, instance: undefined };
        }
    }
};