import { FakeService } from './../services/fake.service';
import { observable } from './../../src/ts';

export class HomeComponent {
    static get metadata() {
        return {
            dependencies: [FakeService]
        };
    }

    @observable()
    public prop: string;

    constructor(fakeService: any) {
        fakeService.doSomething();
        fakeService.kept = 'kept instance';
        this.prop = 'predefined';
    }

    clicked() {
        this.prop = this.prop + ' Clicked!';
    }
}