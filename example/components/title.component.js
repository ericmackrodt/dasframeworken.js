export class TitleComponent {
    static get metadata() {
        return {
            selector: 'title-comp',
            template: '<h1>This is a title component</h1><div>{{potato}}</div><button on:click="clicked()">POtato button</button>',
            dependencies: []
        };
    }

    get potato() {
        return this._something;
    }
    set potato(val) {
        if (val !== this._something) {
            this._something = val;
            this.notifyChange('prop');
        }

    }

    constructor() {
    }

    clicked() {
        this.potato = this.potato + ' Clicked!';
    }

    notifyChange(propertyName) {
        if (typeof this.onPropetyChanged === 'function') {
            setTimeout(() => {
                this.onPropetyChanged(propertyName);
            }, 1);
        }

        return this;
    }
}