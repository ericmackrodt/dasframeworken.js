import { call } from './utils';
import { Type } from './types/interfaces';

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
                    setTimeout(() => call(this.onPropertyChanged, this, propertyKey), 1);
                }
            },
            enumerable: true
        };
    };
}

export function inject(type: Type<any>) {
    return function (target: any, propertyKey: string): any {
        if (!target.propertyDependencies) {
            target.propertyDependencies = {};
        }

        target.propertyDependencies[propertyKey] = type;
        return null;
    };
}