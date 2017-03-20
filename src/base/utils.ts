import { Type } from './types/interfaces';

export const returnPromise = (obj: any) => {
    if (typeof obj === 'boolean') {
        return obj ? Promise.resolve() : Promise.reject({});
    } else if (typeof obj === 'object' && typeof obj.then === 'function') {
        return obj;
    } else {
        return Promise.resolve();
    }
};

export const instantiateType = <T>(type: Type<T>, ...params: any[]): T => {
    params = params || [];
    return new (type.bind.apply(type, [type].concat(params)))();
};