"use strict";
import * as templateFactory from 'base/templates/template.factory';
import { TestComponent } from './test.component.ts';

export default {
    selector: 'test',
    controller: TestComponent,
    render: (controller, container) => {
const root = templateFactory.createRoot('test', TestComponent, root);
const input0 = templateFactory.createElement(container, 'input', root);
templateFactory.setBinding(container, 'something', () => {
    if (input0.value !== controller.something) {
        input0.value = controller.something;
    }
});
        return root;
    }
};