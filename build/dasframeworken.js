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
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};exports.returnPromise = returnPromise;exports.









instantiateType = instantiateType;function returnPromise(obj) {if (typeof obj === 'boolean') {return obj ? Promise.resolve() : Promise.reject();} else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && typeof obj.then === 'function') {return obj;} else {return Promise.resolve();}}function instantiateType(type, params) {
    params = params || [];
    return new (type.bind.apply(type, [type].concat(params)))();
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.Frameworken = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _module = __webpack_require__(22);
var _di = __webpack_require__(16);function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Frameworken = exports.Frameworken = function () {
    function Frameworken() {_classCallCheck(this, Frameworken);
        this._modules = {};
        this._di = new _di.DIContainer();
    }_createClass(Frameworken, [{ key: 'module', value: function module(

        name, options) {
            var module = this._modules[name];
            if (!module) {
                module = new _module.Module(this._di, name, options);
                this._modules[name] = module;
            }
            return module;
        } }]);return Frameworken;}();

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.ComponentContainer = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _template = __webpack_require__(24);
var _pubsub = __webpack_require__(20);
var _component = __webpack_require__(15);var utils = _interopRequireWildcard(_component);
var _registry = __webpack_require__(18);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

ComponentContainer = exports.ComponentContainer = function () {_createClass(ComponentContainer, [{ key: 'controller', get: function get()
        {
            return this._controller;
        } }]);

    function ComponentContainer(module, component) {_classCallCheck(this, ComponentContainer);
        this._bindings = new _pubsub.Pubsub();
        this._eventListeners = [];
        this._module = module;
        utils.setupController(component.controller);
        this._component = component;
        this._chilren = [];
    }_createClass(ComponentContainer, [{ key: '_registerEvent', value: function _registerEvent(

        element, event, callback) {
            var listener = this._eventListeners.find(function (e) {return e.element === element && e.event === event;});
            if (!listener) {
                listener = {
                    element: element,
                    event: event,
                    callback: callback };


                element.addEventListener(event, callback, true);
                this._eventListeners.push(listener);
            }
        } }, { key: 'initialize', value: function initialize(

        element) {
            this._controller = this._module.container.resolve(this._component.controller);
            this._templateBuilder = new _template.TemplateBuilder(this, element);
            this._component.render(this._templateBuilder);
        } }, { key: 'setBinding', value: function setBinding(

        element, elementProperty, controllerProperty) {var _this = this;
            this._bindings.subscribe(controllerProperty, function (key) {
                if (element[elementProperty] !== _this._controller[key]) {
                    element[elementProperty] = _this._controller[key];
                }
            });
            if (typeof this._controller.onPropertyChanged !== 'function') {
                this._controller.onPropertyChanged = function (name) {return _this._bindings.emit(name, name);};
            }
            element[elementProperty] = this._controller[controllerProperty];
        } }, { key: 'setInwardBinding', value: function setInwardBinding(

        element, controllerProperty) {var _this2 = this;
            this._registerEvent(element, 'input', function (change) {
                var start = element.selectionStart;
                var end = element.selectionEnd;
                setTimeout(function () {
                    _this2._controller[controllerProperty] = change.target.value;
                    setTimeout(function () {return element.setSelectionRange(start, end);});
                });
            });
        } }, { key: 'setEvent', value: function setEvent(

        element, event, callback) {var _this3 = this;
            var key = callback.replace('()', '');
            this._registerEvent(element, event.replace('trigger:', ''), function (arg) {
                _this3._controller[key](arg);
            });
        } }, { key: 'instantiateChildComponent', value: function instantiateChildComponent(

        name, parent) {
            var component = this._module.getComponent(name);
            if (!component) return false;

            var child = new ComponentContainer(this._module, component);
            this._chilren.push(child);
            child.initialize(parent);

            return true;
        } }, { key: 'instantiateDirective', value: function instantiateDirective(

        name, value, parent) {
            var directive = _registry.directivesRegistry.find(name);
            if (!directive) return false;
            _registry.directivesRegistry.instantiateDirective(directive, this._controller, this._bindings, value, parent);
            return true;
        } }, { key: 'teardown', value: function teardown()

        {
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
        } }]);return ComponentContainer;}();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.componentFactory = componentFactory;function componentFactory(components) {
    var subscriptions = {};
    function send(subs, val) {
        subs.forEach(function (f) {return f.element[f.elProp] = val;});
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
        obj.addEventListener('input', function (change) {var _this = this;
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

        var call = function call(key) {return function (arg) {return controller[key](arg);};};

        if (element.attributes && element.attributes.length) {
            for (var i in element.attributes) {
                var attr = element.attributes[i];

                if (attr.name === 'on:click') {//localName
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
        processElement: processElement };

}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.setupController = setupController;function setupController(controllerType) {
    controllerType.prototype._notifyChange = function (propertyName) {var _this = this;
        if (typeof this.onPropertyChanged === 'function') {
            setTimeout(function () {
                _this.onPropertyChanged(propertyName);
            }, 1);
        }

        return this;
    };
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var DIContainer = exports.DIContainer = function () {
    function DIContainer() {_classCallCheck(this, DIContainer);
        this._typeRegistry = {};
    }_createClass(DIContainer, [{ key: "_getName", value: function _getName(

        type) {
            return type.name;
        } }, { key: "resolve", value: function resolve(

        type) {var _this = this;
            var dependencies = type.metadata && type.metadata.dependencies || type.dependencies;

            if (!dependencies) {
                return new (type.bind.apply(type, [type]))();
            }

            var instances = dependencies.map(function (d) {return _this.getInstance(d);});
            return new (type.bind.apply(type, [type].concat(instances)))();
        } }, { key: "getInstance", value: function getInstance(

        type) {
            var name = this._getName(type);
            var registered = this._typeRegistry[name];
            if (!registered.instance) {
                registered.instance = this.resolve(registered.type);
            }
            return registered.instance;
        } }, { key: "registerType", value: function registerType(

        type) {
            var name = this._getName(type);
            var registered = this._typeRegistry[name];
            if (!registered) {
                this._typeRegistry[name] = { type: type, instance: null };
            }
        } }]);return DIContainer;}();

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.IfDirective = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _goatjs = __webpack_require__(25);function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

IfDirective = exports.IfDirective = function () {_createClass(IfDirective, null, [{ key: 'metadata', get: function get()
        {
            return {
                selector: 'if' };

        } }]);

    function IfDirective(element, controller, evtAggregator) {_classCallCheck(this, IfDirective);
        this._element = element;
        this._controller = controller;
        this._evtAggregator = evtAggregator;
        this._placeholder = null;
    }_createClass(IfDirective, [{ key: '_processEvaluation', value: function _processEvaluation(

        result) {
            var parent = this._element.parentElement || this._placeholder.parentElement;
            if (!this._placeholder) {
                this._placeholder = document.createComment('iffable: wut');
            }
            if (result === true) {
                parent.replaceChild(this._element, this._placeholder);
            } else {
                parent.replaceChild(this._placeholder, this._element);
            }
        } }, { key: '_onFieldChanged', value: function _onFieldChanged(

        key) {
            var result = this._expression.evaluate();
            this._processEvaluation(result);
        } }, { key: 'setup', value: function setup(

        value) {var _this = this;
            debugger;
            if (!this._expression) {
                this._expression = new _goatjs.Goat(value, this._controller);
            }

            var result = this._expression.evaluate();

            this._expression.fields.forEach(function (field) {return (
                    _this._evtAggregator.subscribe(field, function (key) {return (
                            _this._onFieldChanged(key));}));});

            this._processEvaluation(result);
        } }, { key: 'teardown', value: function teardown()

        {

        } }]);return IfDirective;}();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.directivesRegistry = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _if = __webpack_require__(17);
var _repeat = __webpack_require__(19);
var _utils = __webpack_require__(1);var utils = _interopRequireWildcard(_utils);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

var directivesRegistry = exports.directivesRegistry = function directivesRegistry() {
    var PREFIX = '@';
    var registry = null;

    function getName(name) {
        return PREFIX + name;
    }var

    DirectiveRegistry = function () {
        function DirectiveRegistry() {_classCallCheck(this, DirectiveRegistry);
            registry = [_if.IfDirective, _repeat.RepeatDirective];



        }_createClass(DirectiveRegistry, [{ key: 'find', value: function find(

            name) {
                return registry.find(function (d) {return getName(d.metadata.selector) === name;});
            } }, { key: 'instantiateDirective', value: function instantiateDirective(

            directive, controller, evtAggregator, value, element) {
                var instance = utils.instantiateType(directive, [element, controller, evtAggregator]);
                return instance.setup(value);
            } }]);return DirectiveRegistry;}();


    return new DirectiveRegistry();
}();

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var RepeatDirective = exports.RepeatDirective = function () {_createClass(RepeatDirective, null, [{ key: 'metadata', get: function get()
        {
            return {
                selector: 'repeat' };

        } }]);

    function RepeatDirective(element, controller) {_classCallCheck(this, RepeatDirective);

    }_createClass(RepeatDirective, [{ key: 'setup', value: function setup(

        value) {

        } }, { key: 'teardown', value: function teardown()

        {

        } }]);return RepeatDirective;}();

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.Pubsub = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _subscriber = __webpack_require__(21);function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Pubsub = exports.Pubsub = function () {
    function Pubsub() {_classCallCheck(this, Pubsub);
        this._subscriptions = {};
    }_createClass(Pubsub, [{ key: 'subscribe', value: function subscribe(

        name, callback) {
            var subscription = this._subscriptions[name];
            if (!subscription) {
                this._subscriptions[name] = subscription = new _subscriber.Subscriber();
            }
            subscription.subscribe(callback);
        } }, { key: 'emit', value: function emit(

        name, data) {
            var subscription = this._subscriptions[name];
            if (subscription) {
                subscription.emit(data);
            }
        } }, { key: 'get', value: function get(

        name) {
            return this._subscriptions[name];
        } }, { key: 'unsubscribe', value: function unsubscribe(

        name) {
            var subscription = this._subscriptions[name];
            if (subscription) {
                subscription.teardown();
            }
            delete this._subscriptions[name];
        } }, { key: 'teardown', value: function teardown()

        {var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
                for (var _iterator = Object.keys(this._subscriptions)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var key = _step.value;
                    this.unsubscribe(key);
                }} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}
            delete this._subscriptions;
        } }]);return Pubsub;}();

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var Subscriber = exports.Subscriber = function () {
    function Subscriber() {_classCallCheck(this, Subscriber);
        this._subscriptions = [];
    }_createClass(Subscriber, [{ key: "subscribe", value: function subscribe(

        fn) {
            if (this._subscriptions) {
                this._subscriptions.push(fn);
            }
        } }, { key: "emit", value: function emit(

        data) {
            this._subscriptions.forEach(function (sub) {
                setTimeout(function () {return sub(data);}, 1);
            });
        } }, { key: "remove", value: function remove(

        fn) {
            var index = this._subscriptions.indexOf(fn);
            this._subscriptions.splice(index, 1);
        } }, { key: "teardown", value: function teardown()

        {
            for (var i = this._subscriptions.length - 1; i--;) {
                this._subscriptions.splice(i, 1);
            }
            delete this._subscriptions;
        } }]);return Subscriber;}();

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.Module = undefined;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _component = __webpack_require__(14);
var _component2 = __webpack_require__(13);
var _router = __webpack_require__(23);
var _utils = __webpack_require__(1);var utils = _interopRequireWildcard(_utils);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Module = exports.Module = function () {_createClass(Module, [{ key: 'rootComponent', get: function get()
        {
            return this._rootComponent;
        } }, { key: 'container', get: function get()

        {
            return this._container;
        } }]);

    function Module(container, name, options) {_classCallCheck(this, Module);
        this._container = container;
        options = options || {};
        this._name = name;
        this._rootComponent = options.rootComponent;
        this._preLoad = options.preLoad;

        if (options.types) this._registerTypes(options.types);
        if (options.components) this._registerComponents(options.components);
        if (options.routes) this._registerRoutes(options.routes);
    }_createClass(Module, [{ key: '_registerRoutes', value: function _registerRoutes(

        routes) {var _this = this;
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
        } }, { key: '_registerTypes', value: function _registerTypes(

        types) {var _this2 = this;
            types.forEach(function (type) {
                _this2._container.registerType(type);
            });
        } }, { key: '_registerComponents', value: function _registerComponents(

        components) {var _this3 = this;
            this._components = {};
            components.forEach(function (c) {
                if (typeof c === 'function' && _typeof(c.metadata.template)) {
                    _this3._components[c.metadata.selector] = c;
                } else if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object' && typeof c.render === 'function') {
                    _this3._components[c.selector] = c;
                }
            });
        } }, { key: '_buildComponent', value: function _buildComponent(

        type, element) {
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
        } }, { key: 'getComponent', value: function getComponent(

        name) {
            return this._components[name];
        } }, { key: 'deploy', value: function deploy(

        element) {var _this4 = this;
            var preLoad = this._preLoad && this._preLoad();
            utils.returnPromise(preLoad).then(function () {
                if (_this4._rootComponent) {
                    _this4._rootComponentContainer = _this4._buildComponent(_this4._rootComponent, element);
                } else if (_this4._routes) {
                    _this4._initializeRouting(element);
                }
            });
        } }]);return Module;}();

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.Router = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _utils = __webpack_require__(1);var utils = _interopRequireWildcard(_utils);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Router = exports.Router = function () {
    function Router(routes) {var _this = this;_classCallCheck(this, Router);
        this._routes = routes;
        this._currentRoute = null;
        this._onChange = function (eventArgs) {
            var oldUrl = eventArgs.oldURL;
            var newUrl = eventArgs.newURL;
            var url = _this._getHash(newUrl) || location.hash.slice(1) || '/';
            var route = _this._routes.find(function (r) {return r.path === url;});
            if (!route) return;

            var resolve = route.resolve && route.resolve();

            utils.returnPromise(resolve).
            then(function () {
                if (typeof _this.onRouteChanging === 'function') {
                    _this.onRouteChanging(_this._currentRoute, route);
                }
                _this._currentRoute = route;
                if (typeof _this.onRouteChanged === 'function') {
                    _this.onRouteChanged(_this._currentRoute);
                }
            }).
            catch(function () {
                history.replaceState({}, route.path, '#' + _this._getHash(oldUrl));
            });
        };
        window.addEventListener('hashchange', this._onChange);
        window.addEventListener('load', this._onChange);
    }_createClass(Router, [{ key: '_getHash', value: function _getHash(

        url) {
            if (!url) return url;
            var indexHash = url.indexOf('#') + 1;
            return url.substring(indexHash, url.length);
        } }, { key: 'destroy', value: function destroy()

        {
            window.removeEventListener('hashchange', this._onChange);
            window.removeEventListener('load', this._onChange);
        } }]);return Router;}();

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var TemplateBuilder = exports.TemplateBuilder = function () {
    function TemplateBuilder(componentContainer, baseElement, controller, component) {_classCallCheck(this, TemplateBuilder);
        this._subscriptions = [];
        this._componentContainer = componentContainer;
        this._baseElement = baseElement;
        this._controller = controller;
    }_createClass(TemplateBuilder, [{ key: 'createRoot', value: function createRoot(

        name, controller) {
            parent = this._baseElement;
            var element = document.createElement(name);
            parent.appendChild(element);
            return element;
        } }, { key: 'createElement', value: function createElement(

        name, parent) {
            if (!this._componentContainer.instantiateChildComponent(name, parent)) {
                parent = parent || this._baseElement;
                var element = document.createElement(name);
                parent.appendChild(element);
                return element;
            }
        } }, { key: 'setAttribute', value: function setAttribute(

        name, value, parent) {
            if (this._componentContainer.instantiateDirective(name, value, parent)) return;

            if (name.startsWith('trigger:')) {//localName
                this._componentContainer.setEvent(parent, name, value);
            } else if (name === 'binding') {
                this._componentContainer.setBinding(parent, 'value', value);
                this._componentContainer.setInwardBinding(parent, value);
            } else {
                parent.setAttribute(name, value);
            }
        } }, { key: 'setText', value: function setText(

        text, parent) {
            var node = document.createTextNode(text);
            parent.appendChild(node);
        } }, { key: 'boundText', value: function boundText(

        key, parent) {
            var node = document.createTextNode('');
            parent.appendChild(node);
            this._componentContainer.setBinding(node, 'textContent', key);
        } }]);return TemplateBuilder;}();

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};(function webpackUniversalModuleDefinition(root, factory) {
    if (( false ? 'undefined' : _typeof(exports)) === 'object' && ( false ? 'undefined' : _typeof(module)) === 'object')
    module.exports = factory();else
    if (true)
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else
    if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object')
    exports["goat"] = factory();else

    root["goat"] = factory();
})(undefined, function () {
    return (/******/function (modules) {// webpackBootstrap
            /******/ // The module cache
            /******/var installedModules = {};
            /******/
            /******/ // The require function
            /******/function __webpack_require__(moduleId) {
                /******/
                /******/ // Check if module is in cache
                /******/if (installedModules[moduleId])
                    /******/return installedModules[moduleId].exports;
                /******/
                /******/ // Create a new module (and put it into the cache)
                /******/var module = installedModules[moduleId] = {
                    /******/i: moduleId,
                    /******/l: false,
                    /******/exports: {}
                    /******/ };
                /******/
                /******/ // Execute the module function
                /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                /******/
                /******/ // Flag the module as loaded
                /******/module.l = true;
                /******/
                /******/ // Return the exports of the module
                /******/return module.exports;
                /******/}
            /******/
            /******/
            /******/ // expose the modules object (__webpack_modules__)
            /******/__webpack_require__.m = modules;
            /******/
            /******/ // expose the module cache
            /******/__webpack_require__.c = installedModules;
            /******/
            /******/ // identity function for calling harmony imports with the correct context
            /******/__webpack_require__.i = function (value) {return value;};
            /******/
            /******/ // define getter function for harmony exports
            /******/__webpack_require__.d = function (exports, name, getter) {
                /******/if (!__webpack_require__.o(exports, name)) {
                    /******/Object.defineProperty(exports, name, {
                        /******/configurable: false,
                        /******/enumerable: true,
                        /******/get: getter
                        /******/ });
                    /******/}
                /******/};
            /******/
            /******/ // getDefaultExport function for compatibility with non-harmony modules
            /******/__webpack_require__.n = function (module) {
                /******/var getter = module && module.__esModule ?
                /******/function getDefault() {return module['default'];} :
                /******/function getModuleExports() {return module;};
                /******/__webpack_require__.d(getter, 'a', getter);
                /******/return getter;
                /******/};
            /******/
            /******/ // Object.prototype.hasOwnProperty.call
            /******/__webpack_require__.o = function (object, property) {return Object.prototype.hasOwnProperty.call(object, property);};
            /******/
            /******/ // __webpack_public_path__
            /******/__webpack_require__.p = "";
            /******/
            /******/ // Load entry module and return exports
            /******/return __webpack_require__(__webpack_require__.s = 1);
            /******/}(
        /************************************************************************/
        /******/[
        /* 0 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}} // OLD = /([&|]{2})|([\(\)])|([!]+)?([\w\.]+)\s*([^\w\s|&]{1,3})?\s*([^\sˆ&|\)]+)?/g;

            var EQUALITY_REGEX = /^\s*([!\w\.]+)\s*([^\w\s|&]{1,3})?\s*([^\sˆ&|\\=)]+)?\s*$/;
            var EXPRESSION_REGEX = /([&|]{2})|([\(\)])|([!\w\.]+)\s*([^\w\s|&]{1,3})?\s*([^\sˆ&|\)]+)?/g;
            var STRING_REGEX = /^['"](.*)['"]$/;
            var NOT_REGEX = /^\s*([!]+)\s*(\w+)\s*$/;
            var LOGICAL_OPERATORS = ['&&', '||'];
            var RELATIONAL_OPERATORS = ['==', '!=', '===', '!==', '!', '>=', '<=', '>', '<'];
            var BOOLEANS = ['true', 'false'];var

            Goat = exports.Goat = function () {_createClass(Goat, [{ key: 'fields', get: function get()

                    {
                        return this._fields;
                    } }]);

                function Goat(expression, controller) {_classCallCheck(this, Goat);
                    this._expression = expression;
                    this._controller = controller;
                }_createClass(Goat, [{ key: '_getRegexMatchArray', value: function _getRegexMatchArray(

                    regex, input) {
                        var match = regex.exec(input);
                        if (!match) return;
                        match = match.filter(function (m) {return m !== undefined;});
                        match.shift();
                        return match;
                    } }, { key: '_evaluateNot', value: function _evaluateNot(

                    nots, value) {
                        var evaluate = void 0;
                        nots.shift();
                        if (nots.length) {
                            evaluate = this._evaluateNot(nots, value);
                        }

                        return this._getOperation('!', evaluate || this._getValue(value));
                    } }, { key: '_setField', value: function _setField(

                    field) {
                        if (!this._fields) {
                            this._fields = [];
                        }
                        if (typeof field === 'string') {
                            this.fields.push(field);
                        }
                    } }, { key: '_getValue', value: function _getValue(

                    m) {
                        var match = void 0;
                        if (match = this._getRegexMatchArray(NOT_REGEX, m)) {
                            var nots = match[0].split('');
                            return this._evaluateNot(nots, match[1]);
                        } else if (BOOLEANS.indexOf(m) > -1) {
                            return m === 'true';
                        } else if (m in this._controller) {
                            this._setField(m);
                            return this._getPropertyEval(this._controller, m);
                        } else if (!isNaN(m)) {
                            return parseInt(m);
                        } else if (match = STRING_REGEX.exec(m)) {
                            return match[1];
                        } else {
                            return m;
                        }
                    } }, { key: '_getPropertyEval', value: function _getPropertyEval(

                    obj, prop) {
                        return function () {return obj[prop];};
                    } }, { key: '_asFunction', value: function _asFunction(

                    val) {
                        if (typeof val === 'function') {
                            return val();
                        } else {
                            return val;
                        }
                    } }, { key: '_getOperation', value: function _getOperation(

                    operation, left, right) {var _this = this;
                        switch (operation) {
                            case '==':
                                return function () {return _this._asFunction(left) == _this._asFunction(right);};
                            case '!=':
                                return function () {return _this._asFunction(left) != _this._asFunction(right);};
                            case '===':
                                return function () {return _this._asFunction(left) === _this._asFunction(right);};
                            case '!==':
                                return function () {return _this._asFunction(left) !== _this._asFunction(right);};
                            case '<=':
                            case '=<':
                                return function () {return _this._asFunction(left) <= _this._asFunction(right);};
                            case '>=':
                            case '=<':
                                return function () {return _this._asFunction(left) >= _this._asFunction(right);};
                            case '<':
                                return function () {return _this._asFunction(left) < _this._asFunction(right);};
                            case '>':
                                return function () {return _this._asFunction(left) > _this._asFunction(right);};
                            case '!':
                                return function () {return !_this._asFunction(left);};
                            case '&&':
                                return function () {return _this._asFunction(left) && _this._asFunction(right);};
                            case '||':
                                return function () {return _this._asFunction(left) || _this._asFunction(right);};}

                    } }, { key: '_processExpression', value: function _processExpression(

                    expression) {
                        var match = void 0;
                        if (!(expression instanceof Array)) {
                            expression = [expression];
                        }
                        if (expression.length === 1 && (match = this._getRegexMatchArray(EQUALITY_REGEX, expression[0]))) {
                            var left = this._getValue(match[0]);
                            var right = this._getValue(match[2]);
                            var operation = match[1];
                            if (typeof left === 'function' && !right && !operation) {
                                expression[0] = left;
                            } else {
                                expression[0] = this._getOperation(match[1], left, right);
                            }
                        }

                        while (expression.length > 1 || typeof expression[0] !== 'function') {
                            var index = -1;
                            var leftIndex = 0;
                            var rightIndex = 0;
                            var _left = void 0;
                            var _right = void 0;

                            var subExpression = expression;
                            var indexLeftParenthesis = expression.lastIndexOf('(');
                            if (indexLeftParenthesis > -1) {
                                subExpression = subExpression.slice(indexLeftParenthesis + 1, subExpression.length);
                                var indexRightParenthesis = subExpression.indexOf(')');
                                subExpression = subExpression.slice(0, indexRightParenthesis);
                                var expressionLength = subExpression.length;
                                expression[indexLeftParenthesis] = this._processExpression(subExpression);
                                expression.splice(indexLeftParenthesis + 1, expressionLength + 1);

                                continue;
                            }


                            if ((index = expression.indexOf('&&')) > -1 &&
                            expression[leftIndex = index - 1] !== ')' &&
                            expression[rightIndex = index + 1] !== '(') {
                                // leftIndex = index - 1;
                                // rightIndex = index + 1;
                                _left = this._processExpression(expression[leftIndex]);
                                _right = this._processExpression(expression[rightIndex]);
                                expression[leftIndex] = this._getOperation('&&', _left, _right);
                                expression.splice(index, 2);

                                continue;
                            } else if ((index = expression.indexOf('||')) > -1 &&
                            expression[leftIndex = index - 1] !== ')' &&
                            expression[rightIndex = index + 1] !== '(') {
                                // leftIndex = index - 1;
                                // rightIndex = index + 1;
                                _left = this._processExpression(expression[leftIndex]);
                                _right = this._processExpression(expression[rightIndex]);
                                expression[leftIndex] = this._getOperation('||', _left, _right);
                                expression.splice(index, 2);

                                continue;
                            }

                            break;
                        }

                        if (expression.length === 1) {
                            return expression[0];
                        }
                    } }, { key: '_buildEvaluator', value: function _buildEvaluator()

                    {
                        var expression = this._expression.match(EXPRESSION_REGEX);
                        EXPRESSION_REGEX.lastIndex = 0;
                        return this._processExpression(expression);
                    } }, { key: 'evaluate', value: function evaluate()

                    {
                        if (!this._evaluator) {
                            this._evaluator = this._buildEvaluator();
                        }

                        return this._evaluator();
                    } }]);return Goat;}();

            /***/},
        /* 1 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            Object.defineProperty(exports, "__esModule", { value: true });var _goat = __webpack_require__(0);Object.defineProperty(exports, 'Goat', { enumerable: true, get: function get() {return _goat.Goat;} });

            /***/}]));

});
//# sourceMappingURL=goat.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26)(module)))

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 27 */,
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _frameworken = __webpack_require__(2);

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

/***/ })
/******/ ]);
});
//# sourceMappingURL=dasframeworken.js.map