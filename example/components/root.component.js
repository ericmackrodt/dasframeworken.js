export class RootComponent {
    static get metadata() {
        return {
            selector: 'root-comp',
            template: '<h1>Application Root</h1><router-outlet></router-outlet>',
            dependencies: []
        };
    }

    constructor() {
    }
}