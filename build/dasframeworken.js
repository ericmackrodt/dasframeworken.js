(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("dasframeworken", [], factory);
	else if(typeof exports === 'object')
		exports["dasframeworken"] = factory();
	else
		root["dasframeworken"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Frameworken = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _module = __webpack_require__(3);

var _di = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Frameworken = exports.Frameworken = function () {
    function Frameworken() {
        _classCallCheck(this, Frameworken);

        this._modules = {};
        this._di = new _di.DIContainer();
    }

    _createClass(Frameworken, [{
        key: 'module',
        value: function module(name, options) {
            var module = this._modules[name];
            if (!module) {
                module = new _module.Module(this._di, name, options);
                this._modules[name] = module;
            }
            return module;
        }
    }]);

    return Frameworken;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.componentFactory = componentFactory;
function componentFactory(components) {
    var subscriptions = {};
    function send(subs, val) {
        subs.forEach(function (f) {
            return f.element[f.elProp] = val;
        });
    }
    function bound(obj, oprop, ctrl, cprop) {
        var subs = subscriptions[cprop];
        if (!subs) {
            subs = subscriptions[cprop] = [];
        }

        subs.push({ element: obj, elProp: oprop });

        ctrl.onPropetyChanged = function (name) {
            setTimeout(function () {
                send(subscriptions[name], ctrl[name]);
            });
        };
    }

    function inwardBinding(obj, ctrl, prop) {
        obj.addEventListener('input', function (change) {
            var _this = this;

            setTimeout(function () {
                var start = _this.selectionStart;
                var end = _this.selectionEnd;
                ctrl[prop] = change.target.value;
                _this.setSelectionRange(start, end);
            });
        }, true);
    }

    function processElement(element, controller, resolve) {
        var component = components[element.localName];
        if (component && !element.innerHTML) {
            element.innerHTML = component.metadata.template;
            processElement(element, resolve(component), resolve);
            return;
        }

        if (/^{{\w*}}$/g.test(element.innerText)) {
            bound(element, 'innerText', controller, element.innerText.replace('{{', '').replace('}}', ''));
            element.innerText = '';
        }

        var call = function call(key) {
            return function (arg) {
                return controller[key](arg);
            };
        };

        if (element.attributes && element.attributes.length) {
            for (var i in element.attributes) {
                var attr = element.attributes[i];

                if (attr.name === 'on:click') {
                    //localName
                    var key = attr.value.replace('()', '');
                    element.onclick = call(key);
                }

                if (attr.name === 'binding') {
                    bound(element, 'value', controller, attr.value);
                    inwardBinding(element, controller, attr.value);
                }
            }
        }

        if (element.childNodes && element.childNodes.length) {
            for (var i in element.childNodes) {
                processElement(element.childNodes[i], controller, resolve);
            }
        }
    }

    return {
        processElement: processElement
    };
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DIContainer = exports.DIContainer = function () {
    function DIContainer() {
        _classCallCheck(this, DIContainer);

        this._typeRegistry = {};
    }

    _createClass(DIContainer, [{
        key: '_getName',
        value: function _getName(module, type) {
            return module + ':' + type.name;
        }
    }, {
        key: 'resolve',
        value: function resolve(module, type) {
            var _this = this;

            var dependencies = type.metadata && type.metadata.dependencies || type.dependencies;

            if (!dependencies) {
                return new (type.bind.apply(type, [type]))();
            }

            var instances = dependencies.map(function (d) {
                return _this.getInstance(module, d);
            });
            return new (type.bind.apply(type, [type].concat(instances)))();
        }
    }, {
        key: 'getInstance',
        value: function getInstance(module, type) {
            var name = this._getName(module, type);
            var registered = this._typeRegistry[name];
            if (!registered.instance) {
                registered.instance = this.resolve(module, registered.type);
            }
            return registered.instance;
        }
    }, {
        key: 'registerType',
        value: function registerType(module, type) {
            var name = this._getName(module, type);
            var registered = this._typeRegistry[name];
            if (!registered) {
                this._typeRegistry[name] = { type: type, instance: null };
            }
        }
    }]);

    return DIContainer;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Module = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(1);

var _template = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Module = exports.Module = function () {
    _createClass(Module, [{
        key: 'types',
        get: function get() {
            return this._types;
        }
    }, {
        key: 'components',
        get: function get() {
            return this._components;
        }
    }, {
        key: 'rootComponent',
        get: function get() {
            return this._rootComponent;
        }
    }]);

    function Module(container, name, options) {
        _classCallCheck(this, Module);

        this._container = container;
        options = options || {};
        this._name = name;
        this._types = options.types;
        this._components = options.components;
        this._rootComponent = options.rootComponent;
        this._routes = options.routes;

        this._registerTypes(name, this._types);
        this._registerComponents(name, this._components);
    }

    _createClass(Module, [{
        key: '_registerTypes',
        value: function _registerTypes(module, types) {
            var _this = this;

            types.forEach(function (type) {
                _this._container.registerType(module, type);
            });
        }
    }, {
        key: '_registerComponents',
        value: function _registerComponents(module, components) {
            var _this2 = this;

            this._components = {};
            components.forEach(function (c) {
                return _this2._components[c.metadata.selector] = c;
            });
        }
    }, {
        key: '_buildComponent',
        value: function _buildComponent(type, element) {
            var _this3 = this;

            var controller = this._container.resolve(this._name, type);
            if (typeof type.metadata.template === 'function') {
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
                var builder = new _template.TemplateBuilder(element, controller);
                type.metadata.template(builder);
            } else {
                element.innerHTML = type.metadata.template;
                (0, _component.componentFactory)(this._components).processElement(element, controller, function (component) {
                    return _this3._container.resolve(_this3._name, component);
                });
            }

            return element;
        }
    }, {
        key: '_router',
        value: function _router(element) {
            var url = location.hash.slice(1) || '/';
            var route = this._routes.find(function (r) {
                return r.path === url;
            });
            if (element && route.root) {
                this._buildComponent(route.root, element);
            }
        }
    }, {
        key: '_initializeRouting',
        value: function _initializeRouting(element) {
            var _this4 = this;

            window.addEventListener('hashchange', function () {
                return _this4._router(element);
            });
            window.addEventListener('load', function () {
                return _this4._router(element);
            });
        }
    }, {
        key: 'deploy',
        value: function deploy(element) {
            if (this._rootComponent) {
                this._buildComponent(this._rootComponent, element);
                var outlet = document.getElementsByTagName('router-outlet');
                if (outlet.length > 0) {
                    this._initializeRouting(outlet[0]);
                }
            } else if (this._routes) {
                this._initializeRouting(element);
            }
        }
    }]);

    return Module;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _frameworken = __webpack_require__(0);

debugger;

(function (window) {
    window.frameworken = new _frameworken.Frameworken();
})(window);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TemplateBuilder = exports.TemplateBuilder = function () {
    function TemplateBuilder(baseElement, controller) {
        _classCallCheck(this, TemplateBuilder);

        this._subscriptions = [];
        this._baseElement = baseElement;
        this._controller = controller;
    }

    _createClass(TemplateBuilder, [{
        key: '_send',
        value: function _send(subs, val) {
            subs.forEach(function (f) {
                return f.element[f.elProp] = val;
            });
        }
    }, {
        key: '_bound',
        value: function _bound(element, elementProp, ctrl, controlProp) {
            var _this = this;

            var subs = this._subscriptions[controlProp];
            if (!subs) {
                subs = this._subscriptions[controlProp] = [];
            }

            subs.push({ element: element, elProp: elementProp });

            ctrl.onPropetyChanged = function (name) {
                setTimeout(function () {
                    _this._send(_this._subscriptions[name], ctrl[name]);
                });
            };
        }
    }, {
        key: '_inwardBinding',
        value: function _inwardBinding(element, ctrl, prop) {
            element.addEventListener('input', function (change) {
                var _this2 = this;

                setTimeout(function () {
                    var start = _this2.selectionStart;
                    var end = _this2.selectionEnd;
                    ctrl[prop] = change.target.value;
                    _this2.setSelectionRange(start, end);
                });
            }, true);
        }
    }, {
        key: 'createElement',
        value: function createElement(name, parent) {
            parent = parent || this._baseElement;
            var element = document.createElement(name);
            parent.appendChild(element);
            return element;
        }
    }, {
        key: 'setAttribute',
        value: function setAttribute(name, value, parent) {
            var _this3 = this;

            if (name.startsWith('trigger:')) {
                //localName
                var key = value.replace('()', '');
                parent.addEventListener(name.replace('trigger:', ''), function (arg) {
                    _this3._controller[key](arg);
                }, false);
            } else if (name === 'binding') {
                this._bound(parent, 'value', this._controller, value);
                this._inwardBinding(parent, this._controller, value);
            } else {
                parent.setAttribute(name, value);
            }
        }
    }, {
        key: 'setText',
        value: function setText(text, parent) {
            var node = document.createTextNode(text);
            parent.appendChild(node);
        }
    }, {
        key: 'boundText',
        value: function boundText(key, parent) {
            var node = document.createTextNode('');
            parent.appendChild(node);
            this._bound(node, 'textContent', this._controller, key);
        }
    }]);

    return TemplateBuilder;
}();

/***/ })
/******/ ]);
});
//# sourceMappingURL=dasframeworken.js.map