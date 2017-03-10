var fs = require('fs');
var sys = require('sys');
var builder = require('./template.builder');

var html = fs.readFileSync('./template.builder/component.html', 'utf-8');
var result = builder(html);
// sys.puts(sys.inspect(handler.dom, false, null));

fs.writeFile('./template.builder/component.view.js', result);
console.log(result);


