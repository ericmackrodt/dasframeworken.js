import { FakeService } from './../services/fake.service';

export class HomeComponent {

    static get metadata() {
        return {
            dependencies: [FakeService]
        };
    }

    get prop() {
        return this._something;
    }
    set prop(val) {
        if (val !== this._something) {
            this._something = val;
            this.notifyChange('prop');
        }

    }

    constructor(fakeService) {
        fakeService.doSomething();
        fakeService.kept = 'kept instance';
        this._something = 'predefined!';
    }

    clicked() {
        this.prop = this.prop + ' Clicked!';
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