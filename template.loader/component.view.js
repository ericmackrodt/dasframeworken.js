"use strict";
        import { AnotherComponent } from './another.component.js';

        export default {
            selector: 'a-component',
            controller: AnotherComponent,
            render: (builder) => {
	const component0 = builder.createRoot('a-component', AnotherComponent);
	const p0 = builder.createElement('p', component0);
	builder.setAttribute('class', 'whatever', p0);
	builder.boundText('prop', p0);
	builder.setText(' is cool', p0);
	const input0 = builder.createElement('input', component0);
	builder.setBinding('prop', input0);
	const button0 = builder.createElement('button', component0);
	builder.setDirective('@if', 'true !== false', button0);
	builder.setEvent('click', (controller, $event) => controller.clicked(), button0);
	builder.setText('click here', button0);
}

        };