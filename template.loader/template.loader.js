require('ts-node/register');

var path = require('path');

var templateBuilder = require('./../src/template.transpiler');

module.exports = function (content) {
    const u = this;
    console.log(u);
    const result = templateBuilder.default(content, path.basename(this.resourcePath));
    this.callback(null, result.source, result.map);
};