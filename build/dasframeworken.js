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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var module_1 = __webpack_require__(14);
var di_container_1 = __webpack_require__(2);
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
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var template_builder_1 = __webpack_require__(16);
var pubsub_1 = __webpack_require__(22);
var utils = __webpack_require__(10);
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
        var key = callback.replace('()', '');
        this._registerEvent(element, event.replace('trigger:', ''), function (arg) { return _this._controller[key](arg); });
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
/* 10 */
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
            this._expression = new goatjs_1.Goat(value, this._controller);
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
var component_container_1 = __webpack_require__(9);
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
// export class TemplateBuilder {
//     constructor(
//         private _componentContainer: ComponentContainer, 
//         private _baseElement: Element
//     ) {
//     }
//     createRoot(name: string, controller: IController) {
//         const parent = this._baseElement;
//         const element = document.createElement(name);
//         parent.appendChild(element);
//         return element;
//     }
//     createElement(name: string, parent?: Element) {
//         if (!this._componentContainer.instantiateChildComponent(name, parent)) {
//             parent = parent || this._baseElement;
//             const element = document.createElement(name);
//             parent.appendChild(element);
//             return element;
//         }
//     }
//     setAttribute(name: string, value: any, parent: Element) {
//         if (this._componentContainer.instantiateDirective(name, value, parent)) return;
//         if (name.indexOf('trigger:') === 0) { //localName
//             this._componentContainer.setEvent(parent, name, value);
//         } else if (name === 'binding') {
//             this._componentContainer.setBinding(parent, 'value', value);
//             this._componentContainer.setInwardBinding(parent as HTMLInputElement, value);
//         } else {
//             parent.setAttribute(name, value);
//         }
//     }
//     setText(text: string, parent: Element) {
//         const node = document.createTextNode(text);
//         parent.appendChild(node);
//     }
//     boundText(key: string, parent: Element) {
//         const node = document.createTextNode('');
//         parent.appendChild(node);
//         this._componentContainer.setBinding(node, 'textContent', key);
//     }
// }
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
        if (componentContainer.instantiateDirective(name, value, parent))
            return;
        if (name.indexOf('trigger:') === 0) {
            componentContainer.setEvent(parent, name, value);
        }
        else if (name === 'binding') {
            componentContainer.setBinding(parent, 'value', value);
            componentContainer.setInwardBinding(parent, value);
        }
        else {
            parent.setAttribute(name, value);
        }
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
    return {
        createRoot: createRoot,
        createElement: createElement,
        setAttribute: setAttribute,
        setText: setText,
        boundText: boundText
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
var frameworken = __webpack_require__(3);
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