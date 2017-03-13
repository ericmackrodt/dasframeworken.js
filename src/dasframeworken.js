import { Frameworken } from './base/frameworken';

(function () {
    window.frameworken = new Frameworken();
}) ();

// (function (root, factory) {
//     if (typeof exports === 'object' && exports) {
//         module.exports = factory();
//     } else if (typeof define === 'function' && define.amd) {
//         define('dasframeworken', [], factory);
//     } else {
//         root['frameworken'] = factory();   
//     }
// } (this, function () {
//     return new Frameworken();
// }));