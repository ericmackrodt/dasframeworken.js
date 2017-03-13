export class TitleComponent {
    static get metadata() {
        return {
            dependencies: []
        };
    }

    get potato() {
        return this._potato;
    }
    set potato(val) {
        if (val !== this._potato) {
            this._potato = val;
            this._notifyChange('potato');
        }

    }

    constructor() {
    }

    clicked() {
        this.potato = this.potato + ' Another click!';
    }
}