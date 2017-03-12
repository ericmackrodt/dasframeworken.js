import { FakeService } from './../services/fake.service';

export class AnotherComponent {
    static get metadata() {
        return {
            dependencies: [FakeService]
        };
    }

    constructor(fake) {
        console.log(fake.kept);
    }
}