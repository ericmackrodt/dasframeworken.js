import { Type, ITypeRegistry, IRegisteredType } from './types/interfaces';
/**
 * Represents the container
 */
export declare class Container {
    private _typeRegistry;
    readonly typeRegistry: ITypeRegistry;
    constructor();
    /**
     * Instantiates a type that is registered in the container with its dependencies.
     * @param type Type that will be instantiated, it can be the type itself or the name.
     */
    getInstance<T>(type: Type<T> | string, autoRegister?: boolean): any;
    /**
     * Instantiates any type and tries to resolve dependencies that are registered in the container.
     * @param type The type to be resolved
     */
    resolve<T>(type: Type<T>, autoRegister?: boolean): T;
    /**
     * Registers a type in the container.
     * @param type Type to be registered
     */
    registerType<T>(type: Type<T>): IRegisteredType;
}
