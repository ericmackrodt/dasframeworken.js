var path = require('path');

var templateBuilder = require('@dasframeworken/template.transpiler');

module.exports = function (content) {
    if (this.cacheable) this.cacheable();
    var result = templateBuilder.default(content, path.basename(this.resourcePath));
    this.callback(null, result);
};