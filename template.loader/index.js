require('ts-node/register');

var fs = require('fs');
var sys = require('sys');
var builder = require('./../src/template.transpiler');

var html = fs.readFileSync('./template.loader/component.html', 'utf-8');

var result = builder.default(html);
// sys.puts(sys.inspect(handler.dom, false, null));

fs.writeFile('./template.loader/component.view.js', result);
console.log(result);



