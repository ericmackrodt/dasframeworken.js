export const setupController = (controllerType: Function) => {
    controllerType.prototype._notifyChange = function (propertyName: string) {
        if (typeof this.onPropertyChanged === 'function') {
            setTimeout(() => {
                this.onPropertyChanged(propertyName);
            }, 1);
        }

        return this;
    };
}