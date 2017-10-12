import { Type, ITypeRegistry, IKeyValue, IRegisteredType } from './types/interfaces';
import * as utils from './utils';

const getName = <T>(type: Type<T> | string) => isString(type) ? type : type.name;
const isString = <T>(obj: Type<T> | string): obj is string => typeof obj === 'string';
const throwException = (text: string) => { throw new Error(text) };

/**
 * Represents the container
 */
export class Container {
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
    public getInstance<T>(type: Type<T> | string, autoRegister?: boolean) {
        const name = getName(type);
        let registered = this._typeRegistry[name];

        if (!registered && !autoRegister) throwException(`Type (${name}) not registered`);

        if (autoRegister === true && !registered) {
            if (typeof type === 'string') {
                throwException(`Type registering type ${name} has to be a class`);
            }

            registered = this.registerType(type as Type<T>);
        }

        if (!registered.instance) {
            registered.instance = this.resolve(registered.type);
        }
        return registered.instance;
    }

    /**
     * Instantiates any type and tries to resolve dependencies that are registered in the container.
     * @param type The type to be resolved
     */
    public resolve<T>(type: Type<T>, autoRegister?: boolean) {
        const constructorDependencies = type.prototype._constructorDependencies;
        const propertyDependencies = type.prototype.propertyDependencies;

        if (!constructorDependencies && !propertyDependencies) {
            return utils.instantiateType(type);
        }

        const serviceInstances = 
            constructorDependencies && constructorDependencies.map((d: Function) => this.getInstance(d as Type<T>, autoRegister));

        if (propertyDependencies) {
            Object.keys(propertyDependencies).forEach((key) => {
                const dependency = propertyDependencies[key];
                type.prototype[key] = this.getInstance(dependency, autoRegister);
            });
        }

        return utils.instantiateType(type, ...serviceInstances);
    }

    /**
     * Registers a type in the container.
     * @param type Type to be registered
     */
    public registerType <T>(type: Type<T>): IRegisteredType {
        const name = getName(type);
        let registered = this._typeRegistry[name];
        if (!registered) {
            registered = this._typeRegistry[name] = { type: type, instance: undefined };
        }

        return registered;
    }
};