(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("frameworken", [], factory);
	else if(typeof exports === 'object')
		exports["frameworken"] = factory();
	else
		root["frameworken"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
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

var _module = __webpack_require__(18);

var _di = __webpack_require__(15);

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
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ComponentContainer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _template = __webpack_require__(20);

var _pubsub = __webpack_require__(16);

var _component = __webpack_require__(14);

var utils = _interopRequireWildcard(_component);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ComponentContainer = exports.ComponentContainer = function () {
    function ComponentContainer(module, component) {
        _classCallCheck(this, ComponentContainer);

        this._bindings = new _pubsub.Pubsub();
        this._eventListeners = [];
        this._module = module;
        utils.setupController(component.controller);
        this._component = component;
        this._chilren = [];
    }

    _createClass(ComponentContainer, [{
        key: '_registerEvent',
        value: function _registerEvent(element, event, callback) {
            var listener = this._eventListeners.find(function (e) {
                return e.element === element && e.event === event;
            });
            if (!listener) {
                listener = {
                    element: element,
                    event: event,
                    callback: callback
                };

                element.addEventListener(event, callback, true);
                this._eventListeners.push(listener);
            }
        }
    }, {
        key: 'initialize',
        value: function initialize(element) {
            this._controller = this._module.container.resolve(this._component.controller);
            this._templateBuilder = new _template.TemplateBuilder(this, element);
            this._component.render(this._templateBuilder);
        }
    }, {
        key: 'setBinding',
        value: function setBinding(element, elementProperty, controllerProperty) {
            var _this = this;

            this._bindings.subscribe(controllerProperty, function (key) {
                if (element[elementProperty] !== _this._controller[key]) {
                    element[elementProperty] = _this._controller[key];
                }
            });
            if (typeof this._controller.onPropertyChanged !== 'function') {
                this._controller.onPropertyChanged = function (name) {
                    return _this._bindings.emit(name, name);
                };
            }
            element[elementProperty] = this._controller[controllerProperty];
        }
    }, {
        key: 'setInwardBinding',
        value: function setInwardBinding(element, controllerProperty) {
            var _this2 = this;

            this._registerEvent(element, 'input', function (change) {
                var start = element.selectionStart;
                var end = element.selectionEnd;
                setTimeout(function () {
                    _this2._controller[controllerProperty] = change.target.value;
                    setTimeout(function () {
                        return element.setSelectionRange(start, end);
                    });
                });
            });
        }
    }, {
        key: 'setEvent',
        value: function setEvent(element, event, callback) {
            var _this3 = this;

            var key = callback.replace('()', '');
            this._registerEvent(element, event.replace('trigger:', ''), function (arg) {
                _this3._controller[key](arg);
            });
        }
    }, {
        key: 'instantiateChildComponent',
        value: function instantiateChildComponent(name, parent) {
            var component = this._module.getComponent(name);
            if (!component) return false;

            var child = new ComponentContainer(this._module, component);
            this._chilren.push(child);
            child.initialize(parent);

            return true;
        }
    }, {
        key: 'teardown',
        value: function teardown() {
            while (this._chilren.length) {
                var child = this._chilren[0];
                child.teardown();
                this._chilren.splice(0, 1);
            }

            delete this._chilren;

            this._bindings.teardown();

            while (this._eventListeners.length) {
                var listener = this._eventListeners[0];
                listener.element.removeEventListener(listener.event, listener.callback);
                this._eventListeners.splice(0, 1);
            }
            delete this._eventListeners;

            if (this._instance && typeof this._instance.onTeardown === 'function') {
                this._instance.teardown();
            }
        }
    }]);

    return ComponentContainer;
}();

/***/ }),
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setupController = setupController;
function setupController(controllerType) {
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
/* 15 */
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Pubsub = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _subscriber = __webpack_require__(17);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pubsub = exports.Pubsub = function () {
    function Pubsub() {
        _classCallCheck(this, Pubsub);

        this._subscriptions = {};
    }

    _createClass(Pubsub, [{
        key: 'subscribe',
        value: function subscribe(name, callback) {
            var subscription = this._subscriptions[name];
            if (!subscription) {
                this._subscriptions[name] = subscription = new _subscriber.Subscriber();
            }
            subscription.subscribe(callback);
        }
    }, {
        key: 'emit',
        value: function emit(name, data) {
            var subscription = this._subscriptions[name];
            if (subscription) {
                subscription.emit(data);
            }
        }
    }, {
        key: 'get',
        value: function get(name) {
            return this._subscriptions[name];
        }
    }, {
        key: 'unsubscribe',
        value: function unsubscribe(name) {
            var subscription = this._subscriptions[name];
            if (subscription) {
                subscription.teardown();
            }
            delete this._subscriptions[name];
        }
    }, {
        key: 'teardown',
        value: function teardown() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(this._subscriptions)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    this.unsubscribe(key);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            delete this._subscriptions;
        }
    }]);

    return Pubsub;
}();

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Subscriber = exports.Subscriber = function () {
    function Subscriber() {
        _classCallCheck(this, Subscriber);

        this._subscriptions = [];
    }

    _createClass(Subscriber, [{
        key: "subscribe",
        value: function subscribe(fn) {
            if (this._subscriptions) {
                this._subscriptions.push(fn);
            }
        }
    }, {
        key: "emit",
        value: function emit(data) {
            this._subscriptions.forEach(function (sub) {
                setTimeout(function () {
                    return sub(data);
                }, 1);
            });
        }
    }, {
        key: "remove",
        value: function remove(fn) {
            var index = this._subscriptions.indexOf(fn);
            this._subscriptions.splice(index, 1);
        }
    }, {
        key: "teardown",
        value: function teardown() {
            for (var i = this._subscriptions.length - 1; i--;) {
                this._subscriptions.splice(i, 1);
            }
            delete this._subscriptions;
        }
    }]);

    return Subscriber;
}();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Module = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(13);

var _component2 = __webpack_require__(12);

var _router = __webpack_require__(19);

var _utils = __webpack_require__(23);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Module = exports.Module = function () {
    _createClass(Module, [{
        key: 'rootComponent',
        get: function get() {
            return this._rootComponent;
        }
    }, {
        key: 'container',
        get: function get() {
            return this._container;
        }
    }]);

    function Module(container, name, options) {
        _classCallCheck(this, Module);

        this._container = container;
        options = options || {};
        this._name = name;
        this._rootComponent = options.rootComponent;
        this._preLoad = options.preLoad;

        if (options.types) this._registerTypes(options.types);
        if (options.components) this._registerComponents(options.components);
        if (options.routes) this._registerRoutes(options.routes);
    }

    _createClass(Module, [{
        key: '_registerRoutes',
        value: function _registerRoutes(routes) {
            var _this = this;

            this._router = new _router.Router(routes);
            this._router.onRouteChanging = function (oldRoute, newRoute) {
                if (_this._routeComponentContainer) {
                    _this._routeComponentContainer.teardown();
                }
            };
            this._router.onRouteChanged = function (route) {
                var outlet = document.getElementsByTagName('router-outlet')[0];
                if (route.root && outlet) {
                    _this._routeComponentContainer = _this._buildComponent(route.root, outlet);
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
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }

            var container = new _component2.ComponentContainer(this, type);
            container.initialize(element);

            // if (typeof type === 'object' && typeof type.render === 'function') {

            // } else {
            //     element.innerHTML = type.metadata.template;
            //     const controller = this._container.resolve(type);
            //     componentFactory(this._components).processElement(element, controller, (component) => {
            //         return this._container.resolve(component);
            //     });
            // }

            return container;
        }
    }, {
        key: 'getComponent',
        value: function getComponent(name) {
            return this._components[name];
        }
    }, {
        key: 'deploy',
        value: function deploy(element) {
            var _this4 = this;

            var preLoad = this._preLoad && this._preLoad();
            utils.returnPromise(preLoad).then(function () {
                if (_this4._rootComponent) {
                    _this4._rootComponentContainer = _this4._buildComponent(_this4._rootComponent, element);
                } else if (_this4._routes) {
                    _this4._initializeRouting(element);
                }
            });
        }
    }]);

    return Module;
}();

/***/ }),
/* 19 */
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
        this._currentRoute = null;
        this._onChange = function () {
            var url = location.hash.slice(1) || '/';
            var route = _this._routes.find(function (r) {
                return r.path === url;
            });
            if (!route) return;

            if (typeof _this.onRouteChanging === 'function') {
                _this.onRouteChanging(_this._currentRoute, route);
            }
            _this._currentRoute = route;
            if (typeof _this.onRouteChanged === 'function') {
                _this.onRouteChanged(_this._currentRoute);
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

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TemplateBuilder = exports.TemplateBuilder = function () {
    function TemplateBuilder(componentContainer, baseElement, controller, component) {
        _classCallCheck(this, TemplateBuilder);

        this._subscriptions = [];
        this._componentContainer = componentContainer;
        this._baseElement = baseElement;
        this._controller = controller;
    }

    _createClass(TemplateBuilder, [{
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
            if (!this._componentContainer.instantiateChildComponent(name, parent)) {
                parent = parent || this._baseElement;
                var element = document.createElement(name);
                parent.appendChild(element);
                return element;
            }
        }
    }, {
        key: 'setAttribute',
        value: function setAttribute(name, value, parent) {
            if (name.startsWith('trigger:')) {
                //localName
                this._componentContainer.setEvent(parent, name, value);
            } else if (name === 'binding') {
                this._componentContainer.setBinding(parent, 'value', value);
                this._componentContainer.setInwardBinding(parent, value);
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
            this._componentContainer.setBinding(node, 'textContent', key);
        }
    }]);

    return TemplateBuilder;
}();

/***/ }),
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _frameworken = __webpack_require__(1);

module.exports = new _frameworken.Frameworken();

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

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.returnPromise = returnPromise;
function returnPromise(obj) {
    if (typeof obj === 'boolean') {
        return obj ? Promise.resolve() : Promise.reject();
    } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && typeof obj.then === 'function') {
        return obj;
    } else {
        return Promise.resolve();
    }
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=dasframeworken.js.map