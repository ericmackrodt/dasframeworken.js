import anotherComponent from './components/another.component.html';
import homeComponent from './components/home.component.html';
import rootComponent from './components/root.component.html';
import titleComponent from './components/title.component.html';
import { FakeService } from './services/fake.service';

const app = frameworken.module('app', {
    routes: [
        { path: '/', root: homeComponent, resolve: () => { return true; } },
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