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
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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
exports.randomName = function () { return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); };


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// import { componentFactory } from './component.factory';
var router_1 = __webpack_require__(10);
var utils = __webpack_require__(0);
var Module = (function () {
    function Module(_container, _name, options) {
        this._container = _container;
        this._name = _name;
        this.options = options;
        options = options || {};
        this._name = name;
        this._preLoad = options.preLoad;
        if (options.routes)
            this._registerRoutes(options.routes);
    }
    Object.defineProperty(Module.prototype, "rootComponent", {
        // private _routerComponent: ComponentContainer;;
        // private _rootComponentContainer: ComponentContainer;
        get: function () {
            return this._rootComponent;
        },
        enumerable: true,
        configurable: true
    });
    Module.prototype._registerRoutes = function (routes) {
        var _this = this;
        this._router = new router_1.Router(routes);
        this._router.onRouteChanging = function () {
            if (_this._routeComponent) {
                _this._routeComponent.teardown();
            }
        };
        this._router.onRouteChanged = function (route) {
            var outlet = document.getElementsByTagName('router-outlet')[0];
            if (route.root && outlet) {
                _this._routeComponent = _this._buildComponent(route.root, outlet);
            }
        };
    };
    Module.prototype._buildComponent = function (type, element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        var component = utils.instantiateType(type, this._container, this);
        component.initialize(element);
        return component;
    };
    Module.prototype.deploy = function (element) {
        var _this = this;
        var preLoad = this._preLoad && this._preLoad();
        utils.returnPromise(preLoad).then(function () {
            if (_this.options.root) {
                _this._rootComponent = _this._buildComponent(_this.options.root, element);
            }
            // else if (this.options.routes) {
            //     this._initializeRouting(element);
            // }
        });
    };
    return Module;
}());
exports.Module = Module;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(0);
var Factory = (function () {
    function Factory(_elementRegistry, _componentRegistry, _component, _container) {
        this._elementRegistry = _elementRegistry;
        this._componentRegistry = _componentRegistry;
        this._component = _component;
        this._container = _container;
    }
    Factory.prototype.root = function (name) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        var root = document.createElement(name);
        this._elementRegistry[utils_1.randomName()] = root;
        children.forEach(function (child) { return root.appendChild(child); });
        return root;
    };
    Factory.prototype.element = function (name, attributes) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        var element = document.createElement(name);
        this._elementRegistry[utils_1.randomName()] = element;
        if (attributes) {
            Object.keys(attributes).forEach(function (key) { return element.setAttribute(key, attributes[key]); });
        }
        if (children) {
            children.forEach(function (child) { return element.appendChild(child); });
        }
        return element;
    };
    Factory.prototype.text = function (content) {
        var text = document.createTextNode(content);
        this._elementRegistry[utils_1.randomName()] = text;
        return text;
    };
    Factory.prototype.boundText = function (property, fn) {
        var text = document.createTextNode('');
        this._elementRegistry[utils_1.randomName()] = text;
        this._component.registerBinding(property, function () {
            text.textContent = fn();
        });
        return text;
    };
    Factory.prototype.setEvent = function (element, event, fn) {
        this._component.registerEvent(element, event, fn);
    };
    Factory.prototype.bind = function (property, fn) {
        this._component.registerBinding(property, fn);
    };
    Factory.prototype.component = function (component) {
        var c = new component(this._container);
        this._componentRegistry.push(c);
        return c.initialize();
    };
    return Factory;
}());
exports.Factory = Factory;


/***/ }),
/* 3 */
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
var Container = (function () {
    function Container() {
        this._typeRegistry = {};
    }
    Object.defineProperty(Container.prototype, "typeRegistry", {
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
    Container.prototype.getInstance = function (type, autoRegister) {
        var name = getName(type);
        var registered = this._typeRegistry[name];
        if (!registered && !autoRegister)
            throwException("Type (" + name + ") not registered");
        if (autoRegister === true && !registered) {
            if (typeof type === 'string') {
                throwException("Type registering type " + name + " has to be a class");
            }
            registered = this.registerType(type);
        }
        if (!registered.instance) {
            registered.instance = this.resolve(registered.type);
        }
        return registered.instance;
    };
    /**
     * Instantiates any type and tries to resolve dependencies that are registered in the container.
     * @param type The type to be resolved
     */
    Container.prototype.resolve = function (type, autoRegister) {
        var _this = this;
        var constructorDependencies = type.prototype._constructorDependencies;
        var propertyDependencies = type.prototype.propertyDependencies;
        if (!constructorDependencies && !propertyDependencies) {
            return utils.instantiateType(type);
        }
        var serviceInstances = constructorDependencies && constructorDependencies.map(function (d) { return _this.getInstance(d, autoRegister); });
        if (propertyDependencies) {
            Object.keys(propertyDependencies).forEach(function (key) {
                var dependency = propertyDependencies[key];
                type.prototype[key] = _this.getInstance(dependency, autoRegister);
            });
        }
        return utils.instantiateType.apply(utils, [type].concat(serviceInstances));
    };
    /**
     * Registers a type in the container.
     * @param type Type to be registered
     */
    Container.prototype.registerType = function (type) {
        var name = getName(type);
        var registered = this._typeRegistry[name];
        if (!registered) {
            registered = this._typeRegistry[name] = { type: type, instance: undefined };
        }
        return registered;
    };
    return Container;
}());
exports.Container = Container;
;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var module_1 = __webpack_require__(1);
var di_container_1 = __webpack_require__(3);
// import Component from "./component";
// import { IComponentInstance } from "types/interfaces";
var modules = {};
var container = new di_container_1.Container();
exports.module = function (name, options) {
    var module = modules[name];
    if (!module) {
        module = new module_1.Module(container, name, options);
        modules[name] = module;
    }
    return module;
};
// export const deploy = (component: any, host: HTMLElement) => {
//     // const container = new Container();
//     // const instance = container.resolve(component);
// } 


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(0);
function observable() {
    return function (target, propertyKey) {
        var _private;
        return {
            get: function () {
                return _private;
            },
            set: function (val) {
                var _this = this;
                if (_private !== val) {
                    _private = val;
                    setTimeout(function () { return utils_1.call(_this.onPropertyChanged, _this, propertyKey); }, 1);
                }
            },
            enumerable: true
        };
    };
}
exports.observable = observable;
function inject(type) {
    return function (target, propertyKey) {
        if (!target.propertyDependencies) {
            target.propertyDependencies = {};
        }
        target.propertyDependencies[propertyKey] = type;
        return null;
    };
}
exports.inject = inject;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var di_container_1 = __webpack_require__(3);
var factory_1 = __webpack_require__(2);
var pubsub_1 = __webpack_require__(8);
exports.Component = function (_a) {
    var view = _a.view, controller = _a.controller;
    // const bindings = new Pubsub();
    // const eventListeners = [];
    // const children = [];
    // const directives = [];
    var _bindings = new pubsub_1.Pubsub();
    var _eventListeners = [];
    return (function () {
        function ComponentInstance(_container, _module) {
            this._container = _container;
            this._module = _module;
            if (!_container) {
                this._container = new di_container_1.Container();
            }
        }
        ComponentInstance.prototype.registerEvent = function (element, event, callback) {
            var listener = _eventListeners.find(function (e) { return e.element === element && e.event === event; });
            if (!listener) {
                listener = {
                    element: element,
                    event: event,
                    callback: callback
                };
                element.addEventListener(event, callback, true);
                _eventListeners.push(listener);
            }
        };
        ComponentInstance.prototype.registerBinding = function (property, binding) {
            _bindings.subscribe(property, binding);
            binding(property);
        };
        // TODO: Order initializatio and creat hooks
        ComponentInstance.prototype.initialize = function (element) {
            this._controller = this._container.resolve(controller, true);
            var factory = new factory_1.Factory({}, [], this, this._container);
            var rendered = view(factory, this._controller);
            if (element)
                element.appendChild(rendered);
            if (typeof this._controller.onPropertyChanged !== 'function') {
                this._controller.onPropertyChanged = function (name) { return _bindings.emit(name, name); };
            }
            return rendered;
        };
        ComponentInstance.prototype.teardown = function () {
        };
        return ComponentInstance;
    }());
};
exports.default = exports.Component;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(4);
exports.module = base_1.module;
var component_1 = __webpack_require__(6);
exports.Component = component_1.Component;
__export(__webpack_require__(1));
__export(__webpack_require__(5));
__export(__webpack_require__(2));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var subscriber_1 = __webpack_require__(9);
var Pubsub = (function () {
    function Pubsub() {
        this._subscriptions = {};
    }
    Pubsub.prototype.subscribe = function (name, callback) {
        var subscription = this._subscriptions[name];
        if (!subscription) {
            this._subscriptions[name] = subscription = new subscriber_1.Subscriber();
        }
        subscription.subscribe(callback);
    };
    Pubsub.prototype.emit = function (name, data) {
        var subscription = this._subscriptions[name];
        if (subscription) {
            subscription.emit(data);
        }
    };
    Pubsub.prototype.get = function (name) {
        return this._subscriptions[name];
    };
    Pubsub.prototype.unsubscribe = function (name) {
        var subscription = this._subscriptions[name];
        if (subscription) {
            subscription.teardown();
        }
        delete this._subscriptions[name];
    };
    Pubsub.prototype.teardown = function () {
        for (var _i = 0, _a = Object.keys(this._subscriptions); _i < _a.length; _i++) {
            var key = _a[_i];
            this.unsubscribe(key);
        }
        delete this._subscriptions;
    };
    return Pubsub;
}());
exports.Pubsub = Pubsub;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber = (function () {
    function Subscriber() {
        this._subscriptions = [];
    }
    Subscriber.prototype.subscribe = function (fn) {
        if (this._subscriptions) {
            this._subscriptions.push(fn);
        }
    };
    Subscriber.prototype.emit = function (data) {
        this._subscriptions.forEach(function (sub) {
            setTimeout(function () { return sub(data); }, 1);
        });
    };
    Subscriber.prototype.remove = function (fn) {
        var index = this._subscriptions.indexOf(fn);
        this._subscriptions.splice(index, 1);
    };
    Subscriber.prototype.teardown = function () {
        for (var i = this._subscriptions.length - 1; i--;) {
            this._subscriptions.splice(i, 1);
        }
        delete this._subscriptions;
    };
    return Subscriber;
}());
exports.Subscriber = Subscriber;


/***/ }),
/* 10 */
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


/***/ })
/******/ ]);
});
//# sourceMappingURL=dasframeworken.js.map