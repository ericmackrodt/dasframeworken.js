import { Type } from './types/interfaces';

/**
 * Returns a promise based on the object passed as parameter.
 * It returns a failed or successful promise if it's a boolean.
 * If it's a promise, it returns itself.
 * If it's some other object, it returns a succesfull promise with that obj.
 * @param obj Object to promise
 */
export const returnPromise = (obj: any) => {
    if (typeof obj === 'boolean') {
        return obj ? Promise.resolve() : Promise.reject({});
    } else if (typeof obj === 'object' && typeof obj.then === 'function') {
        return obj;
    } else {
        return Promise.resolve(obj);
    }
};

/**
 * Instantiates a Type.
 * @param type Type to be instantiated.
 * @param params Parameters to be passed to the constructor.
 */
export const instantiateType = <T>(type: Type<T>, ...params: any[]): T => {
    params = params || [];
    return new (type.bind.apply(type, [type].concat(params)))();
};

/**
 * Calls a function given the context if it's valid.
 * @param fn Function to be called.
 * @param ctx "This" context in which the function will be called.
 * @param args The arguments for the function.
 */
export const call = (fn: Function, ctx: Function, ...args: any[]) => isFunction(fn) && fn.call(ctx, ...args);

/**
 * Checks object is a function.
 * @param fn Function to verify
 */
export const isFunction = (fn: any) => typeof fn === 'function';

export const randomName = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
