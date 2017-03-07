class FakeService {
    doSomething() {
        console.log('it works!');
    }
}

class TitleComponent {
    static get metadata() {
        return {
            selector: 'title-comp',
            template: '<h1>This is a title component</h1><div>{{potato}}</div><button on:click="clicked()">POtato button</button>',
            dependencies: []
        };
    }

    get potato() {
        return this._something;
    }
    set potato(val) {
        if (val !== this._something) {
            this._something = val;
            this.notifyChange('prop');
        }

    }

    constructor() {
    }

    clicked() {
        this.potato = this.potato + ' Clicked!';
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

class AnotherComponent {
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

class HomeComponent {

    static get metadata() {
        return {
            selector: 'home-comp',
            template: '<p>{{prop}}</p><input binding="prop"></input><button on:click="clicked()">click here</button>',
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

class RootComponent {
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

var app = frameworken.module('app', {
    routes: [
        { path: '/', root: HomeComponent },
        { path: '/another', root: AnotherComponent },
    ],
    types: [
        FakeService
    ],
    components: [
        HomeComponent,
        AnotherComponent,
        RootComponent,
        TitleComponent
    ],
    rootComponent: RootComponent
});

app.deploy(document.getElementById('main'));