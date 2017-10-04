import { Type } from './types/interfaces';
/**
 * Returns a promise based on the object passed as parameter.
 * It returns a failed or successful promise if it's a boolean.
 * If it's a promise, it returns itself.
 * If it's some other object, it returns a succesfull promise with that obj.
 * @param obj Object to promise
 */
export declare const returnPromise: (obj: any) => any;
/**
 * Instantiates a Type.
 * @param type Type to be instantiated.
 * @param params Parameters to be passed to the constructor.
 */
export declare const instantiateType: <T>(type: Type<T>, ...params: any[]) => T;
/**
 * Calls a function given the context if it's valid.
 * @param fn Function to be called.
 * @param ctx "This" context in which the function will be called.
 * @param args The arguments for the function.
 */
export declare const call: (fn: Function, ctx: Function, ...args: any[]) => any;
/**
 * Checks object is a function.
 * @param fn Function to verify
 */
export declare const isFunction: (fn: any) => boolean;
export declare const randomName: () => string;
