function render(builder) {
	const component0 = builder.createRoot('a-component', 'controller');
	const p0 = builder.createElement('p', component0);
	builder.boundText('prop', p0);
	builder.setText(' is cool', p0);
	const input0 = builder.createElement('input', component0);
	builder.setAttribute('binding', 'prop', input0);
	const button0 = builder.createElement('button', component0);
	builder.setAttribute('trigger:click', 'clicked()', button0);
	builder.setText('click here', button0);
}