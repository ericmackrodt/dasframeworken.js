function render(builder) {
	const component0 = builder.createElement('component');
	builder.setAttribute('selector', 'a-component', component0);
	builder.setAttribute('controller', 'controller', component0);

	const p0 = builder.createElement('p');
	builder.boundText('prop', p0);

	const input0 = builder.createElement('input');
	builder.setAttribute('binding', 'prop', input0);

	const button0 = builder.createElement('button');
	builder.setAttribute('on:click', 'clicked()', button0);
	builder.setText('click here', button0);

}