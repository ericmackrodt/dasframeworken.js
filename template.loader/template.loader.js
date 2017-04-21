require('ts-node/register');

var templateBuilder = require('./../src/template.transpiler');

module.exports = function (content) {
    return templateBuilder.default(content);
};