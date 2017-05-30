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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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
/* 1 */
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
    Container.prototype.getInstance = function (type) {
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
    Container.prototype.resolve = function (type) {
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
    Container.prototype.registerType = function (type) {
        var name = getName(type);
        var registered = this._typeRegistry[name];
        if (!registered) {
            this._typeRegistry[name] = { type: type, instance: undefined };
        }
    };
    return Container;
}());
exports.Container = Container;
;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// import { componentFactory } from './component.factory';
var component_container_1 = __webpack_require__(4);
var router_1 = __webpack_require__(11);
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
        this._router.onRouteChanging = function () {
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("goat", [], factory);
	else if(typeof exports === 'object')
		exports["goat"] = factory();
	else
		root["goat"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

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
var isBoolean = function (value) { return ['true', 'false'].indexOf(value) > -1; };
var isFunction = function (o) { return typeof o === 'function'; };
var includes = function (o, value) { return o.indexOf(value) > -1; };
var getMiddleItem = function (expression) { return expression[Math.round((expression.length - 1) / 2)]; };
var matchExpression = function (expression) {
    return expression.match(/([&|]{2})|([\(\)])|([^\sˆ&|\'"\(\)]+|["'].+["'])\s*([^\w\s|&\(\)]{1,3})?\s*([^\sˆ&|\(\)]+)?/g);
};
var isProperty = function (expression) { return /^\s*([a-z]\w+)(\.[a-z]\w+)*\s*$/g.test(expression); };
var asFunction = function (val) { return isFunction(val) ? val() : val; };
var setFirstInExpression = function (expression, value) { return expression[0] = value; };
var getFirstInExpression = function (expression) { return expression[0]; };
var getRegexMatchArray = function (regex, input) {
    var match = regex.exec(input) || [];
    if (match.length === 0)
        return;
    match = match.filter(function (m) { return m !== undefined; });
    match.shift();
    return match;
};
var getExpression = function (token) { return expressionCache[token].expression; };
var throwError = function () {
    var msg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msg[_i] = arguments[_i];
    }
    throw new Error(msg.join(''));
};
var throwInvalidOperationError = function (operator, token) { return throwError("Operator [" + operator + "] is not valid in expression [" + getExpression(token) + "]"); };
var throwInvalidExpressionError = function (token) { return throwError("Invalid expression [" + getExpression(token) + "]"); };
var getOperation = function (operation, left, right) { return {
    '==': function () { return asFunction(left) == asFunction(right); },
    '!=': function () { return asFunction(left) != asFunction(right); },
    '===': function () { return asFunction(left) === asFunction(right); },
    '!==': function () { return asFunction(left) !== asFunction(right); },
    '<=': function () { return asFunction(left) <= asFunction(right); },
    '>=': function () { return asFunction(left) >= asFunction(right); },
    '<': function () { return asFunction(left) < asFunction(right); },
    '>': function () { return asFunction(left) > asFunction(right); },
    '&&': function () { return asFunction(left) && asFunction(right); },
    '||': function () { return asFunction(left) || asFunction(right); }
}[operation]; };
var evaluateNot = function (nots, value, controller, parserToken) {
    var evaluate;
    nots.shift();
    if (nots.length) {
        evaluate = evaluateNot(nots, value, controller, parserToken);
    }
    var operand = processOperand(value, controller, parserToken);
    return function () { return !asFunction(evaluate || operand); };
};
var buildPropertyCaller = function (fields, lastFunction) {
    var last = fields[fields.length - 1];
    fields.pop();
    // function that evaluates current property
    var fn;
    if (!lastFunction) {
        fn = function (obj) { return obj[last]; };
    }
    else {
        fn = function (obj) { return lastFunction(obj[last]); };
    }
    if (fields.length) {
        return buildPropertyCaller(fields, fn);
    }
    return fn;
};
var setField = function (field, parserToken) {
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
var untilTruthy = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return !fns.every(function (fn) { return !fn(); });
};
/* Processing Functions
----------------------------------------------------------------*/
var processOperand = function (m, controller, parserToken) {
    var match;
    if ((match = getRegexMatchArray(NOT_REGEX, m))) {
        var nots = match[0].split('');
        return evaluateNot(nots, match[1], controller, parserToken);
    }
    else if (isBoolean(m)) {
        return m === 'true';
    }
    else if (isProperty(m)) {
        var caller_1 = buildPropertyCaller(m.split('.'));
        setField(m, parserToken);
        return function () { return caller_1(controller); };
    }
    else if (!isNaN(m)) {
        return parseInt(m);
    }
    else if ((match = STRING_REGEX.exec(m))) {
        return getMiddleItem(match);
    }
    throwInvalidExpressionError(parserToken);
};
var processLogicalOperation = function (operation, expression, controller, parserToken) {
    var index = -1;
    var leftIndex = 0;
    var rightIndex = 0;
    if ((index = expression.indexOf(operation)) > -1 &&
        (expression[leftIndex = index - 1] !== ')') &&
        (expression[rightIndex = index + 1] !== '(')) {
        var left = processExpression(expression[leftIndex], controller, parserToken);
        var right = processExpression(expression[rightIndex], controller, parserToken);
        var result = getOperation(operation, getFirstInExpression(left), getFirstInExpression(right));
        expression[leftIndex] = result;
        expression.splice(index, 2);
        return result;
    }
};
var processExplicitPrecedence = function (expression, controller, parserToken) {
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
var processEquality = function (expression, controller, parserToken) {
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
        }
        else {
            operatorFunc = getOperation(match[1], left, right);
        }
        if (!operatorFunc)
            throwInvalidOperationError(match[1], parserToken);
        setFirstInExpression(expression, operatorFunc);
        return operatorFunc;
    }
};
var processExpression = function (expression, controller, parserToken) {
    if (!(expression instanceof Array)) {
        expression = [expression];
    }
    if (expression.length === 3 && !includes(LOGICAL_OPERATORS, getMiddleItem(expression))) {
        throwError("Invalid logical operator [" + getMiddleItem(expression) + "] in expression [" + getExpression(parserToken) + "]");
    }
    if (!untilTruthy(function () { return processEquality(expression, controller, parserToken); }, function () { return processExplicitPrecedence(expression, controller, parserToken); }, function () { return processLogicalOperation('&&', expression, controller, parserToken); }, function () { return processLogicalOperation('||', expression, controller, parserToken); }) && (expression.length % 2) === 1 && !isFunction(getFirstInExpression(expression))) {
        throwInvalidExpressionError(parserToken);
    }
    if (expression.length > 1 || !isFunction(getFirstInExpression(expression))) {
        return processExpression(expression, controller, parserToken);
    }
    else {
        return expression;
    }
};
/* Exported Functions
----------------------------------------------------------------*/
exports.getFields = function (token) { return expressionCache[token].fields; };
exports.deleteFromCache = function (token) { return delete expressionCache[token]; };
exports.generateRandomKey = function () { return Math.floor((1 + Math.random()) * 0x100000000000000).toString(16).substring(1); };
exports.buildEvaluator = function (expression, controller, parserToken) {
    var match = matchExpression(expression) || [];
    expressionCache[parserToken] = { expression: expression };
    if (match.length % 2 === 0) {
        throwInvalidExpressionError(parserToken);
    }
    var result = processExpression(match, controller, parserToken);
    return getFirstInExpression(result);
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var evaluation_builder_1 = __webpack_require__(0);
/**
 * Expression parser class
 */
var default_1 = (function () {
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
        get: function () {
            return this._fields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(default_1.prototype, "currentEvaluator", {
        /**
         * Returns the current evaluator function without triggering it like the evaluate() function does.
         */
        get: function () {
            return this._evaluator;
        },
        enumerable: true,
        configurable: true
    });
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
}());
exports.default = default_1;


/***/ })
/******/ ]);
});
//# sourceMappingURL=goat.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var if_directive_1 = __webpack_require__(8);
var pubsub_1 = __webpack_require__(9);
var utils = __webpack_require__(5);
var for_directive_1 = __webpack_require__(7);
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
    ComponentContainer.prototype.registerEvent = function (element, event, callback) {
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
        var _this = this;
        this._controller = this._container.resolve(this._component.controller);
        var rendered = this._component.render(this._controller, this);
        element.appendChild(rendered);
        if (typeof this._controller.onPropertyChanged !== 'function') {
            this._controller.onPropertyChanged = function (name) { return _this._bindings.emit(name, name); };
        }
        return rendered;
    };
    ComponentContainer.prototype.registerBinding = function (property, binding) {
        this._bindings.subscribe(property, binding);
        binding(property);
    };
    ComponentContainer.prototype.setInwardBinding = function (element, controllerProperty) {
        var _this = this;
        this.registerEvent(element, 'input', function (change) {
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
        this.registerEvent(element, event, function (arg) { return callback(_this._controller, arg); });
    };
    ComponentContainer.prototype.instantiateChildComponent = function (name, parent) {
        var component = this._module.getComponent(name);
        if (!component)
            return;
        var child = new ComponentContainer(this._container, this._module, component);
        this._children.push(child);
        return child.initialize(parent);
    };
    ComponentContainer.prototype.instantiateIfDirective = function (condition, parent, contextFn) {
        var directive = new if_directive_1.IfDirective(parent, this._controller, this._bindings, contextFn);
        directive.setup(condition);
        this._directives.push(directive);
        return true;
    };
    ComponentContainer.prototype.instantiateForDirective = function (propertyFn, propertyName, parent, contextFn) {
        var directive = new for_directive_1.ForDirective(parent, this._bindings, contextFn, propertyFn);
        directive.setup(propertyName);
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
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var module_1 = __webpack_require__(2);
var di_container_1 = __webpack_require__(1);
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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ForDirective = (function () {
    function ForDirective(_parent, _evtAggregator, _context, _collectionFn) {
        this._parent = _parent;
        this._evtAggregator = _evtAggregator;
        this._context = _context;
        this._collectionFn = _collectionFn;
    }
    Object.defineProperty(ForDirective, "metadata", {
        get: function () {
            return {
                selector: 'repeat'
            };
        },
        enumerable: true,
        configurable: true
    });
    ForDirective.prototype._updateList = function () {
        var _this = this;
        this._parent.innerHTML = '';
        this._collectionFn().forEach(function (item) { return _this._context(item); });
    };
    ForDirective.prototype._onFieldChanged = function () {
        this._updateList();
    };
    ForDirective.prototype.setup = function (field) {
        var _this = this;
        debugger;
        this._evtAggregator.subscribe(field, function () {
            return _this._onFieldChanged();
        });
        this._updateList();
    };
    ForDirective.prototype.teardown = function () {
        //TODO: IMPLEMENT TEARDOWN
    };
    return ForDirective;
}());
exports.ForDirective = ForDirective;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var goatjs_1 = __webpack_require__(3);
var replaceElement = function (oldEl, newEl) { return oldEl.parentNode.replaceChild(newEl, oldEl); };
var IfDirective = (function () {
    function IfDirective(_parent, _controller, _evtAggregator, _context) {
        this._parent = _parent;
        this._controller = _controller;
        this._evtAggregator = _evtAggregator;
        this._context = _context;
    }
    IfDirective.prototype._processEvaluation = function (result) {
        if (!this._placeholder) {
            this._placeholder = document.createComment('@if');
        }
        if (result === true) {
            this._lastElement = this._context();
            replaceElement(this._placeholder, this._lastElement);
        }
        else {
            if (this._lastElement) {
                replaceElement(this._lastElement, this._placeholder);
            }
            else {
                this._parent.appendChild(this._placeholder);
            }
        }
    };
    IfDirective.prototype._onFieldChanged = function () {
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
            return _this._evtAggregator.subscribe(field, function () {
                return _this._onFieldChanged();
            });
        });
        this._processEvaluation(result);
    };
    IfDirective.prototype.teardown = function () {
        //TODO: IMPLEMENT TEARDOWN
    };
    return IfDirective;
}());
IfDirective.metadata = {
    selector: 'if'
};
exports.IfDirective = IfDirective;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var subscriber_1 = __webpack_require__(10);
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
/* 10 */
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
/* 11 */
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


/***/ })
/******/ ]);
});
//# sourceMappingURL=dasframeworken.js.map