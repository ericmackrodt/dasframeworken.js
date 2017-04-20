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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a promise based on the object passed as parameter.
 * It returns a failed or successful promise if it's a boolean.
 * If it's a promise, it returns itself.
 * If it's some other object, it returns a succesfull promise with that obj.
 * @param obj Object to promise
 */
exports.returnPromise = function (obj) {
    if (typeof obj === 'boolean') {
        return obj ? Promise.resolve() : Promise.reject({});
    }
    else if (typeof obj === 'object' && typeof obj.then === 'function') {
        return obj;
    }
    else {
        return Promise.resolve(obj);
    }
};
/**
 * Instantiates a Type.
 * @param type Type to be instantiated.
 * @param params Parameters to be passed to the constructor.
 */
exports.instantiateType = function (type) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    params = params || [];
    return new (type.bind.apply(type, [type].concat(params)))();
};
/**
 * Calls a function given the context if it's valid.
 * @param fn Function to be called.
 * @param ctx "This" context in which the function will be called.
 * @param args The arguments for the function.
 */
exports.call = function (fn, ctx) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return exports.isFunction(fn) && fn.call.apply(fn, [ctx].concat(args));
};
/**
 * Checks object is a function.
 * @param fn Function to verify
 */
exports.isFunction = function (fn) { return typeof fn === 'function'; };


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var module_1 = __webpack_require__(14);
var di_container_1 = __webpack_require__(10);
var modules = {};
var container = new di_container_1.default();
exports.module = function (name, options) {
    var module = modules[name];
    if (!module) {
        module = new module_1.Module(container, name, options);
        modules[name] = module;
    }
    return module;
};


/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var template_builder_1 = __webpack_require__(16);
var pubsub_1 = __webpack_require__(22);
var utils = __webpack_require__(9);
var directivesRegistry = __webpack_require__(12);
var ComponentContainer = (function () {
    function ComponentContainer(_container, _module, _component) {
        this._container = _container;
        this._module = _module;
        this._component = _component;
        this._bindings = new pubsub_1.Pubsub();
        this._eventListeners = [];
        utils.setupController(_component.controller);
        this._children = [];
        this._directives = [];
    }
    Object.defineProperty(ComponentContainer.prototype, "controller", {
        get: function () {
            return this._controller;
        },
        enumerable: true,
        configurable: true
    });
    ComponentContainer.prototype._registerEvent = function (element, event, callback) {
        var listener = this._eventListeners.find(function (e) { return e.element === element && e.event === event; });
        if (!listener) {
            listener = {
                element: element,
                event: event,
                callback: callback
            };
            element.addEventListener(event, callback, true);
            this._eventListeners.push(listener);
        }
    };
    ComponentContainer.prototype.initialize = function (element) {
        this._controller = this._container.resolve(this._component.controller);
        var builder = template_builder_1.default(this, element);
        this._component.render(builder);
    };
    ComponentContainer.prototype.setBinding = function (element, elementProperty, controllerProperty) {
        var _this = this;
        this._bindings.subscribe(controllerProperty, function (key) {
            if (element[elementProperty] !== _this._controller[key]) {
                element[elementProperty] = _this._controller[key];
            }
        });
        if (typeof this._controller.onPropertyChanged !== 'function') {
            this._controller.onPropertyChanged = function (name) { return _this._bindings.emit(name, name); };
        }
        element[elementProperty] = this._controller[controllerProperty];
    };
    ComponentContainer.prototype.setInwardBinding = function (element, controllerProperty) {
        var _this = this;
        this._registerEvent(element, 'input', function (change) {
            var start = element.selectionStart;
            var end = element.selectionEnd;
            setTimeout(function () {
                _this._controller[controllerProperty] = change.target.value;
                setTimeout(function () { return element.setSelectionRange(start, end); });
            });
        });
    };
    ComponentContainer.prototype.setEvent = function (element, event, callback) {
        var _this = this;
        this._registerEvent(element, event, function (arg) { return callback(_this._controller, arg); });
    };
    ComponentContainer.prototype.instantiateChildComponent = function (name, parent) {
        var component = this._module.getComponent(name);
        if (!component)
            return false;
        var child = new ComponentContainer(this._container, this._module, component);
        this._children.push(child);
        child.initialize(parent);
        return true;
    };
    ComponentContainer.prototype.instantiateDirective = function (name, value, parent) {
        var directive = directivesRegistry.find(name);
        if (!directive)
            return false;
        var instance = directivesRegistry.instantiate(directive, this._controller, this._bindings, value, parent);
        this._directives.push(instance);
        return true;
    };
    ComponentContainer.prototype.teardown = function () {
        while (this._children.length) {
            var child = this._children[0];
            child.teardown();
            this._children.splice(0, 1);
        }
        delete this._children;
        this._bindings.teardown();
        while (this._eventListeners.length) {
            var listener = this._eventListeners[0];
            listener.element.removeEventListener(listener.event, listener.callback);
            this._eventListeners.splice(0, 1);
        }
        delete this._eventListeners;
    };
    return ComponentContainer;
}());
exports.ComponentContainer = ComponentContainer;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.setupController = function (controllerType) {
    controllerType.prototype._notifyChange = function (propertyName) {
        var _this = this;
        if (typeof this.onPropertyChanged === 'function') {
            setTimeout(function () {
                _this.onPropertyChanged(propertyName);
            }, 1);
        }
        return this;
    };
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils = __webpack_require__(0);
var getName = function (type) { return isString(type) ? type : type.name; };
var isString = function (obj) { return typeof obj === 'string'; };
var throwException = function (text) { throw new Error(text); };
/**
 * Represents the container
 */
var default_1 = (function () {
    function default_1() {
        this._typeRegistry = {};
    }
    Object.defineProperty(default_1.prototype, "typeRegistry", {
        get: function () {
            return this._typeRegistry;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Instantiates a type that is registered in the container with its dependencies.
     * @param type Type that will be instantiated, it can be the type itself or the name.
     */
    default_1.prototype.getInstance = function (type) {
        var name = getName(type);
        var registered = this._typeRegistry[name];
        if (!registered)
            throwException("Type (" + name + ") not registered");
        if (!registered.instance) {
            registered.instance = this.resolve(registered.type);
        }
        return registered.instance;
    };
    /**
     * Instantiates any type and tries to resolve dependencies that are registered in the container.
     * @param type The type to be resolved
     */
    default_1.prototype.resolve = function (type) {
        var _this = this;
        var dependencies = type.metadata && type.metadata.dependencies || type.dependencies;
        if (!dependencies) {
            return utils.instantiateType(type);
        }
        var instances = dependencies.map(function (d) { return _this.getInstance(d); });
        return utils.instantiateType.apply(utils, [type].concat(instances));
    };
    /**
     * Registers a type in the container.
     * @param type Type to be registered
     */
    default_1.prototype.registerType = function (type) {
        var name = getName(type);
        var registered = this._typeRegistry[name];
        if (!registered) {
            this._typeRegistry[name] = { type: type, instance: undefined };
        }
    };
    return default_1;
}());
exports.default = default_1;
;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var goatjs_1 = __webpack_require__(24);
var replaceElement = function (oldEl, newEl) { return oldEl.parentNode.replaceChild(newEl, oldEl); };
var IfDirective = (function () {
    function IfDirective(_element, _controller, _evtAggregator) {
        this._element = _element;
        this._controller = _controller;
        this._evtAggregator = _evtAggregator;
    }
    IfDirective.prototype._processEvaluation = function (result) {
        if (!this._placeholder) {
            this._placeholder = document.createComment('@if');
        }
        if (result === true) {
            replaceElement(this._placeholder, this._element);
        }
        else {
            replaceElement(this._element, this._placeholder);
        }
    };
    IfDirective.prototype._onFieldChanged = function (key) {
        var result = this._expression.evaluate();
        this._processEvaluation(result);
    };
    IfDirective.prototype.setup = function (value) {
        var _this = this;
        if (!this._expression) {
            this._expression = new goatjs_1.default(value, this._controller);
        }
        var result = this._expression.evaluate();
        this._expression.fields.forEach(function (field) {
            return _this._evtAggregator.subscribe(field, function (key) {
                return _this._onFieldChanged(key);
            });
        });
        this._processEvaluation(result);
    };
    IfDirective.prototype.teardown = function () {
    };
    return IfDirective;
}());
IfDirective.metadata = {
    selector: 'if'
};
exports.IfDirective = IfDirective;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var if_directive_1 = __webpack_require__(11);
var repeat_directive_1 = __webpack_require__(13);
var utils = __webpack_require__(0);
var registry = [
    if_directive_1.IfDirective,
    repeat_directive_1.RepeatDirective
];
var PREFIX = '@';
var getName = function (name) { return PREFIX + name; };
exports.find = function (name) { return registry.find(function (d) { return getName(d.metadata.selector) === name; }); };
exports.instantiate = function (directive, controller, pubsub, value, element) {
    var instance = utils.instantiateType.apply(utils, [directive].concat([element, controller, pubsub]));
    instance.setup(value);
    return instance;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RepeatDirective = (function () {
    function RepeatDirective(element, controller) {
    }
    Object.defineProperty(RepeatDirective, "metadata", {
        get: function () {
            return {
                selector: 'repeat'
            };
        },
        enumerable: true,
        configurable: true
    });
    RepeatDirective.prototype.setup = function (value) {
    };
    RepeatDirective.prototype.teardown = function () {
    };
    return RepeatDirective;
}());
exports.RepeatDirective = RepeatDirective;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// import { componentFactory } from './component.factory';
var component_container_1 = __webpack_require__(8);
var router_1 = __webpack_require__(15);
var utils = __webpack_require__(0);
var registerTypes = function (container, types) { return types.forEach(function (type) { return container.registerType(type); }); };
var Module = (function () {
    function Module(_container, _name, options) {
        this._container = _container;
        this._name = _name;
        options = options || {};
        this._name = name;
        this._rootComponent = options.rootComponent;
        this._preLoad = options.preLoad;
        if (options.types)
            registerTypes(this._container, options.types);
        if (options.components)
            this._registerComponents(options.components);
        if (options.routes)
            this._registerRoutes(options.routes);
    }
    Object.defineProperty(Module.prototype, "rootComponent", {
        get: function () {
            return this._rootComponent;
        },
        enumerable: true,
        configurable: true
    });
    Module.prototype._registerRoutes = function (routes) {
        var _this = this;
        this._router = new router_1.Router(routes);
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
    };
    Module.prototype._registerComponents = function (components) {
        var _this = this;
        this._components = {};
        components.forEach(function (c) {
            if (typeof c === 'function' && typeof c.metadata.template) {
                _this._components[c.metadata.selector] = c;
            }
            else if (typeof c === 'object' && typeof c.render === 'function') {
                _this._components[c.selector] = c;
            }
        });
    };
    Module.prototype._buildComponent = function (type, element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        var container = new component_container_1.ComponentContainer(this._container, this, type);
        container.initialize(element);
        return container;
    };
    Module.prototype.getComponent = function (name) {
        return this._components[name];
    };
    Module.prototype.deploy = function (element) {
        var _this = this;
        var preLoad = this._preLoad && this._preLoad();
        utils.returnPromise(preLoad).then(function () {
            if (_this._rootComponent) {
                _this._rootComponentContainer = _this._buildComponent(_this._rootComponent, element);
            } // else if (this._routes) {
            //     this._initializeRouting(element);
            // }
        });
    };
    return Module;
}());
exports.Module = Module;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils = __webpack_require__(0);
var Router = (function () {
    function Router(routes) {
        var _this = this;
        this._routes = routes;
        this._currentRoute = null;
        this._onChange = function (eventArgs) {
            var oldUrl = eventArgs.oldURL;
            var newUrl = eventArgs.newURL;
            var url = _this._getHash(newUrl) || location.hash.slice(1) || '/';
            var route = _this._routes.find(function (r) { return r.path === url; });
            if (!route)
                return;
            var resolve = route.resolve && route.resolve(route);
            utils.returnPromise(resolve)
                .then(function () {
                if (typeof _this.onRouteChanging === 'function') {
                    _this.onRouteChanging(_this._currentRoute, route);
                }
                _this._currentRoute = route;
                if (typeof _this.onRouteChanged === 'function') {
                    _this.onRouteChanged(_this._currentRoute);
                }
            })
                .catch(function (ex) {
                debugger;
                console.error(ex);
                history.replaceState({}, route.path, '#' + _this._getHash(oldUrl));
            });
        };
        window.addEventListener('hashchange', this._onChange);
        window.addEventListener('load', this._onChange);
    }
    Router.prototype._getHash = function (url) {
        if (!url)
            return url;
        var indexHash = url.indexOf('#') + 1;
        return url.substring(indexHash, url.length);
    };
    Router.prototype.destroy = function () {
        window.removeEventListener('hashchange', this._onChange);
        window.removeEventListener('load', this._onChange);
    };
    return Router;
}());
exports.Router = Router;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (componentContainer, baseElement) {
    var createRoot = function (name, controller) {
        var parent = baseElement;
        var element = document.createElement(name);
        parent.appendChild(element);
        return element;
    };
    var createElement = function (name, parent) {
        if (!componentContainer.instantiateChildComponent(name, parent)) {
            parent = parent || baseElement;
            var element = document.createElement(name);
            parent.appendChild(element);
            return element;
        }
    };
    var setAttribute = function (name, value, parent) {
        parent.setAttribute(name, value);
    };
    var setBinding = function (value, parent) {
        componentContainer.setBinding(parent, 'value', value);
        componentContainer.setInwardBinding(parent, value);
    };
    var setEvent = function (event, fn, parent) {
        componentContainer.setEvent(parent, event, fn);
    };
    var setText = function (text, parent) {
        var node = document.createTextNode(text);
        parent.appendChild(node);
    };
    var boundText = function (key, parent) {
        var node = document.createTextNode('');
        parent.appendChild(node);
        componentContainer.setBinding(node, 'textContent', key);
    };
    var setDirective = function (directive, value, parent) {
        componentContainer.instantiateDirective(directive, value, parent);
    };
    return {
        createRoot: createRoot,
        createElement: createElement,
        setBinding: setBinding,
        setEvent: setEvent,
        setAttribute: setAttribute,
        setText: setText,
        boundText: boundText,
        setDirective: setDirective
    };
};


/***/ }),
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.Pubsub = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _subscriber = __webpack_require__(23);function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

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
/* 23 */
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
/* 24 */
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
            /* Constants
                          ----------------------------------------------------------------*/

            Object.defineProperty(exports, "__esModule", { value: true });
            var EQUALITY_REGEX = /^\s*([^\sˆ&|\'"\(\)]+|["'][^'"]+["'])\s*$|^\s*([^\sˆ&|\'"\(\)]+|["'][^'"]*["'])\s*([^'"\w\s|&]{1,3})\s*([^\sˆ&|\'"\(\)]+|["'][^'"]*["'])\s*$/;
            var STRING_REGEX = /^['"](.*)['"]$/;
            var NOT_REGEX = /^\s*([!]+)\s*(\w+)\s*$/;
            var LOGICAL_OPERATORS = ['&&', '||'];
            var RELATIONAL_OPERATORS = ['==', '!=', '===', '!==', '!', '>=', '<=', '>', '<'];
            /* Cache Variables
                                                                                              ----------------------------------------------------------------*/
            var expressionCache = {};
            /* Support Functions
                                      ----------------------------------------------------------------*/
            var isBoolean = function isBoolean(value) {return ['true', 'false'].indexOf(value) > -1;};
            var isFunction = function isFunction(o) {return typeof o === 'function';};
            var includes = function includes(o, value) {return o.indexOf(value) > -1;};
            var getMiddleItem = function getMiddleItem(expression) {return expression[Math.round((expression.length - 1) / 2)];};
            var matchExpression = function matchExpression(expression) {
                return expression.match(/([&|]{2})|([\(\)])|([^\sˆ&|\'"\(\)]+|["'].+["'])\s*([^\w\s|&\(\)]{1,3})?\s*([^\sˆ&|\(\)]+)?/g);
            };
            var isProperty = function isProperty(expression) {return (/^\s*([a-z]\w+)(\.[a-z]\w+)*\s*$/g.test(expression));};
            var asFunction = function asFunction(val) {return isFunction(val) ? val() : val;};
            var setFirstInExpression = function setFirstInExpression(expression, value) {return expression[0] = value;};
            var getFirstInExpression = function getFirstInExpression(expression) {return expression[0];};
            var getRegexMatchArray = function getRegexMatchArray(regex, input) {
                var match = regex.exec(input) || [];
                if (match.length === 0)
                return;
                match = match.filter(function (m) {return m !== undefined;});
                match.shift();
                return match;
            };
            var getExpression = function getExpression(token) {return expressionCache[token].expression;};
            var throwError = function throwError() {
                var msg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    msg[_i] = arguments[_i];
                }
                throw new Error(msg.join(''));
            };
            var throwInvalidOperationError = function throwInvalidOperationError(operator, token) {return throwError("Operator [" + operator + "] is not valid in expression [" + getExpression(token) + "]");};
            var throwInvalidExpressionError = function throwInvalidExpressionError(token) {return throwError("Invalid expression [" + getExpression(token) + "]");};
            var getOperation = function getOperation(operation, left, right) {return {
                    '==': function _() {return asFunction(left) == asFunction(right);},
                    '!=': function _() {return asFunction(left) != asFunction(right);},
                    '===': function _() {return asFunction(left) === asFunction(right);},
                    '!==': function _() {return asFunction(left) !== asFunction(right);},
                    '<=': function _() {return asFunction(left) <= asFunction(right);},
                    '>=': function _() {return asFunction(left) >= asFunction(right);},
                    '<': function _() {return asFunction(left) < asFunction(right);},
                    '>': function _() {return asFunction(left) > asFunction(right);},
                    '&&': function _() {return asFunction(left) && asFunction(right);},
                    '||': function _() {return asFunction(left) || asFunction(right);} }[
                operation];};
            var evaluateNot = function evaluateNot(nots, value, controller, parserToken) {
                var evaluate;
                nots.shift();
                if (nots.length) {
                    evaluate = evaluateNot(nots, value, controller, parserToken);
                }
                var operand = processOperand(value, controller, parserToken);
                return function () {return !asFunction(evaluate || operand);};
            };
            var buildPropertyCaller = function buildPropertyCaller(fields, lastFunction) {
                var last = fields[fields.length - 1];
                fields.pop();
                // function that evaluates current property
                var fn;
                if (!lastFunction) {
                    fn = function fn(obj) {return obj[last];};
                } else
                {
                    fn = function fn(obj) {return lastFunction(obj[last]);};
                }
                if (fields.length) {
                    return buildPropertyCaller(fields, fn);
                }
                return fn;
            };
            var setField = function setField(field, parserToken) {
                var cache = expressionCache[parserToken].fields;
                if (!cache) {
                    cache = expressionCache[parserToken].fields = [];
                }
                cache.push(field);
            };
            /**
                * Executes functions in series until one of them returns a truthy value.
                * If it does, the function returns true.
                * @param fns Functions to be executed
                */
            var untilTruthy = function untilTruthy() {
                var fns = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    fns[_i] = arguments[_i];
                }
                return !fns.every(function (fn) {return !fn();});
            };
            /* Processing Functions
               ----------------------------------------------------------------*/
            var processOperand = function processOperand(m, controller, parserToken) {
                var match;
                if (match = getRegexMatchArray(NOT_REGEX, m)) {
                    var nots = match[0].split('');
                    return evaluateNot(nots, match[1], controller, parserToken);
                } else
                if (isBoolean(m)) {
                    return m === 'true';
                } else
                if (isProperty(m)) {
                    var caller_1 = buildPropertyCaller(m.split('.'));
                    setField(m, parserToken);
                    return function () {return caller_1(controller);};
                } else
                if (!isNaN(m)) {
                    return parseInt(m);
                } else
                if (match = STRING_REGEX.exec(m)) {
                    return getMiddleItem(match);
                }
                throwInvalidExpressionError(parserToken);
            };
            var processLogicalOperation = function processLogicalOperation(operation, expression, controller, parserToken) {
                var index = -1;
                var leftIndex = 0;
                var rightIndex = 0;
                if ((index = expression.indexOf(operation)) > -1 &&
                expression[leftIndex = index - 1] !== ')' &&
                expression[rightIndex = index + 1] !== '(') {
                    var left = processExpression(expression[leftIndex], controller, parserToken);
                    var right = processExpression(expression[rightIndex], controller, parserToken);
                    var result = getOperation(operation, getFirstInExpression(left), getFirstInExpression(right));
                    expression[leftIndex] = result;
                    expression.splice(index, 2);
                    return result;
                }
            };
            var processExplicitPrecedence = function processExplicitPrecedence(expression, controller, parserToken) {
                var subExpression = expression;
                var indexLeftParenthesis = expression.lastIndexOf('(');
                if (indexLeftParenthesis > -1) {
                    subExpression = subExpression.slice(indexLeftParenthesis + 1, subExpression.length);
                    var indexRightParenthesis = subExpression.indexOf(')');
                    subExpression = subExpression.slice(0, indexRightParenthesis);
                    var expressionLength = subExpression.length;
                    var result = processExpression(subExpression, controller, parserToken);
                    expression[indexLeftParenthesis] = result;
                    expression.splice(indexLeftParenthesis + 1, expressionLength + 1);
                    return result;
                }
            };
            var processEquality = function processEquality(expression, controller, parserToken) {
                var match;
                var operatorFunc;
                if (expression.length === 1 && (match = getRegexMatchArray(EQUALITY_REGEX, getFirstInExpression(expression)))) {
                    var left = processOperand(match[0], controller, parserToken);
                    var right = match[2];
                    if (right) {
                        right = processOperand(match[2], controller, parserToken);
                    }
                    var operation = match[1];
                    if (isFunction(left) && !right && !operation) {
                        operatorFunc = left;
                    } else
                    {
                        operatorFunc = getOperation(match[1], left, right);
                    }
                    if (!operatorFunc)
                    throwInvalidOperationError(match[1], parserToken);
                    setFirstInExpression(expression, operatorFunc);
                    return operatorFunc;
                }
            };
            var processExpression = function processExpression(expression, controller, parserToken) {
                if (!(expression instanceof Array)) {
                    expression = [expression];
                }
                if (expression.length === 3 && !includes(LOGICAL_OPERATORS, getMiddleItem(expression))) {
                    throwError("Invalid logical operator [" + getMiddleItem(expression) + "] in expression [" + getExpression(parserToken) + "]");
                }
                if (!untilTruthy(function () {return processEquality(expression, controller, parserToken);}, function () {return processExplicitPrecedence(expression, controller, parserToken);}, function () {return processLogicalOperation('&&', expression, controller, parserToken);}, function () {return processLogicalOperation('||', expression, controller, parserToken);}) && expression.length % 2 === 1 && !isFunction(getFirstInExpression(expression))) {
                    throwInvalidExpressionError(parserToken);
                }
                if (expression.length > 1 || !isFunction(getFirstInExpression(expression))) {
                    return processExpression(expression, controller, parserToken);
                } else
                {
                    return expression;
                }
            };
            /* Exported Functions
               ----------------------------------------------------------------*/
            exports.getFields = function (token) {return expressionCache[token].fields;};
            exports.deleteFromCache = function (token) {return delete expressionCache[token];};
            exports.generateRandomKey = function () {return Math.floor((1 + Math.random()) * 0x100000000000000).toString(16).substring(1);};
            exports.buildEvaluator = function (expression, controller, parserToken) {
                var match = matchExpression(expression) || [];
                expressionCache[parserToken] = { expression: expression };
                if (match.length % 2 === 0) {
                    throwInvalidExpressionError(parserToken);
                }
                var result = processExpression(match, controller, parserToken);
                return getFirstInExpression(result);
            };


            /***/},
        /* 1 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", { value: true });
            var evaluation_builder_1 = __webpack_require__(0);
            /**
                                                                * Expression parser class
                                                                */
            var default_1 = function () {
                /**
                                          * Creates new instance of the ExpressionParser.
                                          * @param _expression Expression to be parsed
                                          * @param _controller Object with fields that will be evaluated
                                          */
                function default_1(_expression, _controller) {
                    this._expression = _expression;
                    this._controller = _controller;
                    this._parserToken = evaluation_builder_1.generateRandomKey();
                }
                Object.defineProperty(default_1.prototype, "fields", {
                    /**
                                                                        * Object fields that were used in the expression.
                                                                        */
                    get: function get() {
                        return this._fields;
                    },
                    enumerable: true,
                    configurable: true });

                Object.defineProperty(default_1.prototype, "currentEvaluator", {
                    /**
                                                                                  * Returns the current evaluator function without triggering it like the evaluate() function does.
                                                                                  */
                    get: function get() {
                        return this._evaluator;
                    },
                    enumerable: true,
                    configurable: true });

                /**
                                            * Evaluates current instance of the Expression Parser and returns
                                            * a boolean value based on the expression that was passed in the constructor.
                                            */
                default_1.prototype.evaluate = function () {
                    if (!this._evaluator) {
                        this._evaluator = evaluation_builder_1.buildEvaluator(this._expression, this._controller, this._parserToken);
                        this._fields = evaluation_builder_1.getFields(this._parserToken);
                        evaluation_builder_1.deleteFromCache(this._parserToken);
                    }
                    return this._evaluator();
                };
                return default_1;
            }();
            exports.default = default_1;


            /***/}]));

});
//# sourceMappingURL=goat.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(25)(module)))

/***/ }),
/* 25 */
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
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var frameworken = __webpack_require__(2);
module.exports = frameworken;
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