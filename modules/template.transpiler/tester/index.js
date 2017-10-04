require('ts-node/register');
const path = require('path');

var fs = require('fs');
var builder = require('./../src/transpiler');

var html = fs.readFileSync(path.join(__dirname + '/component.html'), 'utf-8');
var result = builder.default(html, __dirname + '/component.html');

fs.writeFileSync(path.join(__dirname + '/component.view.js'), result);
console.log(result);