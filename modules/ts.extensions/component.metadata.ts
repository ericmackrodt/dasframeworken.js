import { call } from './../base/utils';

export function observable() {
    return function (target: any, propertyKey: string): any {
        let _private: any;
        
        return {
            get: function() {
                return _private;
            },
            set: function(val: any) {
                if (_private !== val) {
                    _private = val;
                    call(this._notifyChange, this, propertyKey);
                }
            },
            enumerable: true
        };
    };
}

export function inject(target: any) {
}