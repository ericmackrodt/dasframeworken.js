import * as anotherComponent from './components/another.component.html';
import * as homeComponent from './components/home.component.html';
import * as rootComponent from './components/root.component.html';
import * as titleComponent from './components/title.component.html';
import { FakeService } from './services/fake.service';

const app = frameworken.module('app', {
    routes: [
        { path: '/', root: homeComponent },
        { path: '/another', root: anotherComponent }
    ],
    types: [
        FakeService
    ],
    components: [
        homeComponent,
        anotherComponent,
        rootComponent,
        titleComponent
    ],
    rootComponent: rootComponent,
    preLoad: () => {
        return true;
    }
});

app.deploy(document.getElementById('main'));