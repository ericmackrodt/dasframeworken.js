"use strict";
import * as templateFactory from 'base/templates/template.factory';
import { HomeComponent } from './home.component.ts';

export default {
    selector: 'a-component',
    controller: HomeComponent,
    render: (controller, container) => {
const root = templateFactory.createRoot('a-component', HomeComponent, root);

const p0 = templateFactory.createElement(container, 'p', root);
templateFactory.boundText(container, 'prop', p0, () => controller.prop);
templateFactory.setText(' is cool ey oh', p0);

const input0 = templateFactory.createElement(container, 'input', root);
templateFactory.setBinding(container, 'prop', () => {
    if (input0.value !== controller.prop) {
        input0.value = controller.prop;
    }
});
templateFactory.setEvent(container, 'input', ($event) => controller.inputUpdated($event), input0);

const button0 = templateFactory.createElement(container, 'button', root);
templateFactory.setAttribute('das:name', 'button1', button0);
templateFactory.setEvent(container, 'click', ($event) => controller.clicked(), button0);
templateFactory.setText('click here dude!', button0);
templateFactory.setText('This is just a text', root);
const br0 = templateFactory.createElement(container, 'br', root);

const span0DirectiveContext = (context) => {
const span0 = templateFactory.createElement(container, 'span', root);
templateFactory.setAttribute('style', 'background: yellow', span0);
templateFactory.setText('This is iffable', span0);
return span0;
};
templateFactory.setDirective(container, controller, '@if', 'iffable === true', root, span0DirectiveContext);

const button1 = templateFactory.createElement(container, 'button', root);
templateFactory.setEvent(container, 'click', ($event) => controller.showHide(), button1);
templateFactory.setText('Show/hide', button1);
return root;
    }

};