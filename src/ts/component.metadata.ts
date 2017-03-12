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
                    this._notifyChange(propertyKey);
                }
            },
            enumerable: true
        };
    };
}