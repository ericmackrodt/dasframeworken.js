"use strict";
        import * as templateFactory from 'base/templates/template.factory';
        import { AnotherComponent } from './another.component.js';

        export default {
            selector: 'a-component',
            controller: AnotherComponent,
            render: (controller, container) => {
	const component0 = templateFactory.createRoot('a-component', AnotherComponent);
	const p0 = templateFactory.createElement('p', component0);
	templateFactory.setAttribute('class', 'whatever', p0);
	templateFactory.boundText('prop', p0);
	templateFactory.setText(' is cool', p0);
	const input0 = templateFactory.createElement('input', component0);
	templateFactory.setBinding(container, 'prop', () => {
	    if (input0.value !== controller.prop) {
	        input0.value = controller.prop;
	    }
	});
	const button0 = templateFactory.createElement('button', component0);
	templateFactory.setDirective('@if', 'true !== false', button0);
	templateFactory.setEvent(container, 'click', ($event) => controller.clicked(), button0);
	templateFactory.setText('click here', button0);
}

        };