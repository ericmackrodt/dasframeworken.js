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

    @observable()
    public iffable: boolean;

    constructor(fakeService: FakeService) {
        fakeService.doSomething();
        this.prop = 'predefined';
    }

    clicked() {
        this.prop = this.prop + ' Clicked!';
    }

    showHide() {
        this.iffable = !this.iffable;
    }
}