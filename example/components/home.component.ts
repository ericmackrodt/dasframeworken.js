import { FakeService } from './../services/fake.service';
import { observable, inject } from './../../src/ts';

@inject
export class HomeComponent {
    static get metadata() {
        return {
            dependencies: [FakeService]
        };
    }

    @observable()
    public prop: string;

    constructor(fakeService: FakeService) {
        fakeService.doSomething();
        this.prop = 'predefined';
    }

    clicked() {
        this.prop = this.prop + ' Clicked!';
    }
}