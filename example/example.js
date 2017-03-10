/* global frameworken */
import { AnotherComponent } from './components/another.component';
import * as HomeComponent from './components/home.component.html';
import { RootComponent } from './components/root.component';
import { TitleComponent } from './components/title.component';
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