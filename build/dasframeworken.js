(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("", [], factory);
	else if(typeof exports === 'object')
		exports[""] = factory();
	else
		root[""] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Frameworken = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _module = __webpack_require__(13);

var _di = __webpack_require__(12);

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
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ComponentContainer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _template = __webpack_require__(14);

var _component = __webpack_require__(11);

var utils = _interopRequireWildcard(_component);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ComponentContainer = exports.ComponentContainer = function () {
    function ComponentContainer(diContainer, component) {
        _classCallCheck(this, ComponentContainer);

        this._container = diContainer;
        utils.setupController(component.controller);
        this._component = component;
    }

    _createClass(ComponentContainer, [{
        key: 'initialize',
        value: function initialize(element) {
            this._controller = this._container.resolve(this._component.controller);
            this._templateBuilder = new _template.TemplateBuilder(element, this._controller);
            this._component.render(this._templateBuilder);
        }
    }, {
        key: 'teardown',
        value: function teardown() {
            if (this._instance && typeof this._instance.onTeardown === 'function') {
                this._instance.teardown();
            }
        }
    }]);

    return ComponentContainer;
}();

/***/ }),
/* 10 */
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
        debugger;
        ctrl.onPropertyChanged = function (name) {
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setupController = setupController;
function setupController(controllerType) {
    debugger;
    controllerType.prototype._notifyChange = function (propertyName) {
        var _this = this;

        if (typeof this.onPropertyChanged === 'function') {
            setTimeout(function () {
                _this.onPropertyChanged(propertyName);
            }, 1);
        }

        return this;
    };
}

/***/ }),
/* 12 */
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
        key: "_getName",
        value: function _getName(type) {
            return type.name;
        }
    }, {
        key: "resolve",
        value: function resolve(type) {
            var _this = this;

            var dependencies = type.metadata && type.metadata.dependencies || type.dependencies;

            if (!dependencies) {
                return new (type.bind.apply(type, [type]))();
            }

            var instances = dependencies.map(function (d) {
                return _this.getInstance(d);
            });
            return new (type.bind.apply(type, [type].concat(instances)))();
        }
    }, {
        key: "getInstance",
        value: function getInstance(type) {
            var name = this._getName(type);
            var registered = this._typeRegistry[name];
            if (!registered.instance) {
                registered.instance = this.resolve(registered.type);
            }
            return registered.instance;
        }
    }, {
        key: "registerType",
        value: function registerType(type) {
            var name = this._getName(type);
            var registered = this._typeRegistry[name];
            if (!registered) {
                this._typeRegistry[name] = { type: type, instance: null };
            }
        }
    }]);

    return DIContainer;
}();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Module = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(10);

var _component2 = __webpack_require__(9);

var _router = __webpack_require__(21);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Module = exports.Module = function () {
    _createClass(Module, [{
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
        this._rootComponent = options.rootComponent;

        if (options.types) this._registerTypes(options.types);
        if (options.components) this._registerComponents(options.components);
        if (options.routes) this._registerRoutes(options.routes);
    }

    _createClass(Module, [{
        key: '_registerRoutes',
        value: function _registerRoutes(routes) {
            var _this = this;

            this._router = new _router.Router(routes);
            this._router.onRouteChanged = function (route) {
                var outlet = document.getElementsByTagName('router-outlet')[0];
                if (route.root && outlet) {
                    _this._buildComponent(route.root, outlet);
                }
            };
        }
    }, {
        key: '_registerTypes',
        value: function _registerTypes(types) {
            var _this2 = this;

            types.forEach(function (type) {
                _this2._container.registerType(type);
            });
        }
    }, {
        key: '_registerComponents',
        value: function _registerComponents(components) {
            var _this3 = this;

            this._components = {};
            components.forEach(function (c) {
                if (typeof c === 'function' && _typeof(c.metadata.template)) {
                    _this3._components[c.metadata.selector] = c;
                } else if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object' && typeof c.render === 'function') {
                    _this3._components[c.selector] = c;
                }
            });
        }
    }, {
        key: '_buildComponent',
        value: function _buildComponent(type, element) {
            var _this4 = this;

            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && typeof type.render === 'function') {
                var container = new _component2.ComponentContainer(this._container, type);
                container.initialize(element);
            } else {
                element.innerHTML = type.metadata.template;
                var controller = this._container.resolve(type);
                (0, _component.componentFactory)(this._components).processElement(element, controller, function (component) {
                    return _this4._container.resolve(component);
                });
            }

            return element;
        }
    }, {
        key: '_initializeRouting',
        value: function _initializeRouting(element) {
            var _this5 = this;

            window.addEventListener('hashchange', function () {
                return _this5._router(element);
            });
            window.addEventListener('load', function () {
                return _this5._router(element);
            });
        }
    }, {
        key: 'deploy',
        value: function deploy(element) {
            if (this._rootComponent) {
                this._buildComponent(this._rootComponent, element);
            } else if (this._routes) {
                this._initializeRouting(element);
            }
        }
    }]);

    return Module;
}();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TemplateBuilder = exports.TemplateBuilder = function () {
    function TemplateBuilder(baseElement, controller, component) {
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
            debugger;

            ctrl.onPropertyChanged = function (name) {
                setTimeout(function () {
                    _this._send(_this._subscriptions[name], ctrl[name]);
                });
            };

            element[elementProp] = ctrl[controlProp];
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
        key: 'createRoot',
        value: function createRoot(name, controller) {
            parent = this._baseElement;
            var element = document.createElement(name);
            parent.appendChild(element);
            return element;
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

/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _frameworken = __webpack_require__(1);

(function (window) {
    window.frameworken = new _frameworken.Frameworken();
})(window);

/***/ }),
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = exports.Router = function () {
    function Router(routes) {
        var _this = this;

        _classCallCheck(this, Router);

        this._routes = routes;
        this._onChange = function () {
            var url = location.hash.slice(1) || '/';
            var route = _this._routes.find(function (r) {
                return r.path === url;
            });
            if (route && typeof _this.onRouteChanged === 'function') {
                _this.onRouteChanged(route);
            }
        };
        window.addEventListener('hashchange', this._onChange);
        window.addEventListener('load', this._onChange);
    }

    _createClass(Router, [{
        key: 'destroy',
        value: function destroy() {
            window.removeEventListener('hashchange', this._onChange);
            window.removeEventListener('load', this._onChange);
        }
    }]);

    return Router;
}();

/***/ })
/******/ ]);
});
//# sourceMappingURL=dasframeworken.js.map