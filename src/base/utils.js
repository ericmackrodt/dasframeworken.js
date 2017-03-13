export function returnPromise(obj) {
    if (typeof obj === 'boolean') {
        return obj ? Promise.resolve() : Promise.reject();
    } else if (typeof obj === 'object' && typeof obj.then === 'function') {
        return obj;
    } else {
        return Promise.resolve();
    }
}