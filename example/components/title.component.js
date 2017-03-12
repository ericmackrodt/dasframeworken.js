export class TitleComponent {
    static get metadata() {
        return {
            dependencies: []
        };
    }

    get potato() {
        return this._something;
    }
    set potato(val) {
        if (val !== this._something) {
            this._something = val;
            this._notifyChange('potato');
        }

    }

    constructor() {
    }

    clicked() {
        this.potato = this.potato + ' Clicked!';
    }
}