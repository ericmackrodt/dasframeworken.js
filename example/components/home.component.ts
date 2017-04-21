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

    inputUpdated(event: Event) {
        const element = (event.target as HTMLInputElement);
        const start = element.selectionStart;
        const end = element.selectionEnd;
        setTimeout(() => {
            this.prop = element.value;
            element.setSelectionRange(start, end);
        });
    }

    clicked() {
        this.prop = this.prop + ' Clicked!';
    }

    showHide() {
        this.iffable = !this.iffable;
    }
}