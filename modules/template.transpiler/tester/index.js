// require('ts-node/register');

var fs = require('fs');
var sys = require('sys');
var builder = require('./../dist/template.transpiler');

var html = fs.readFileSync('./modules/template.transpiler/tester/component.html', 'utf-8');
debugger;
var result = builder.default(html);
// sys.puts(sys.inspect(handler.dom, false, null));

fs.writeFile('./modules/template.transpiler/tester/component.view.js', result.source);
console.log(result);



