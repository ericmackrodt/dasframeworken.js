export function setupController(controllerType) {
    controllerType.prototype._notifyChange = function (propertyName) {
        if (typeof this.onPropertyChanged === 'function') {
            setTimeout(() => {
                this.onPropertyChanged(propertyName);
            }, 1);
        }

        return this;
    };
}