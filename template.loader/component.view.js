"use strict";
        import * as templateFactory from 'base/templates/template.factory';
import { ElementTypeEnum } from '../_types/index';
import { ElementTypeEnum } from '_types/index';
        import { AnotherComponent } from './another.component.js';

        export default {
            selector: 'a-component',
            controller: AnotherComponent,
            render: (controller, container) => {
	const root = templateFactory.createRoot('a-component', AnotherComponent, root);
	const p0 = templateFactory.createElement(container, 'p', root);
	templateFactory.setAttribute('class', 'whatever', p0);
	templateFactory.boundText(container, 'prop', p0, () => controller.prop);
	templateFactory.setText(' is cool', p0);
	const input0 = templateFactory.createElement(container, 'input', root);
	templateFactory.setBinding(container, 'prop', () => {
	    if (input0.value !== controller.prop) {
	        input0.value = controller.prop;
	    }
	});
	const button0DirectiveContext = (context) => {
	const button0 = templateFactory.createElement(container, 'button', root);
	templateFactory.setEvent(container, 'click', ($event) => controller.clicked(), button0);
	templateFactory.setText('click here', button0);
	return button0;
	            };
	templateFactory.setDirective(container, controller, '@if', 'true !== false', root, button0DirectiveContext);
return root;
    }

        };