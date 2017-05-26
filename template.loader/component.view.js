"use strict";
import * as templateFactory from 'base/templates/template.factory';
import { TestComponent } from './test.component.ts';

export default {
    selector: 'test',
    controller: TestComponent,
    render: (controller, container) => {
const root = templateFactory.createRoot('test', TestComponent, root);
templateFactory.boundText(container, 'bound', root, () => controller.bound);
        return root;
    }
};