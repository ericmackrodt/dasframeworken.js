/* global frameworken */
import * as AnotherComponent from './components/another.component.html';
import * as HomeComponent from './components/home.component.html';
import * as RootComponent from './components/root.component.html';
import * as TitleComponent from './components/title.component.html';
import { FakeService } from './services/fake.service';

const app = frameworken.module('app', {
    routes: [
        { path: '/', root: HomeComponent },
        { path: '/another', root: AnotherComponent }
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