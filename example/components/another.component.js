import { FakeService } from './../services/fake.service';

export class AnotherComponent {
    static get metadata() {
        return {
            selector: 'another-comp',
            template: '<h1>Another comp</h1><title-comp></title-comp>',
            dependencies: [FakeService]
        };
    }

    constructor(fake) {
        console.log(fake.kept);
    }
}