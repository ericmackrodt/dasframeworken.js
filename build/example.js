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
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};
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
    } else
    if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === 'object' && typeof obj.then === 'function') {
        return obj;
    } else
    {
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
exports.isFunction = function (fn) {return typeof fn === 'function';};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoot = function (name) {
    return document.createElement(name);
};
exports.createElement = function (container, name, parent) {
    var element = container.instantiateChildComponent(name, parent);
    if (!element) {
        element = document.createElement(name);
        parent.appendChild(element);
    }
    return element;
};
exports.setAttribute = function (name, value, parent) {
    parent.setAttribute(name, value);
};
exports.setBinding = function (container, property, fn) {
    container.registerBinding(property, fn);
};
exports.setEvent = function (container, event, fn, parent) {
    container.registerEvent(parent, event, fn);
};
exports.setText = function (text, parent) {
    var node = document.createTextNode(text);
    parent.appendChild(node);
};
exports.boundText = function (container, property, parent, fn) {
    var node = document.createTextNode('');
    parent.appendChild(node);
    exports.setBinding(container, property, function () {
        node.textContent = fn();
    });
};
exports.setDirective = function (container, controller, directive, value, parent, contextFn) {
    container.instantiateDirective(directive, value, parent, contextFn);
    // componentContainer.instantiateDirective(directive, value, parent)
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FakeService = function () {
    function FakeService() {
    }
    FakeService.prototype.doSomething = function () {
        console.log('it works!');
    };
    return FakeService;
}();
exports.FakeService = FakeService;

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _template = __webpack_require__(1);var templateFactory = _interopRequireWildcard(_template);
var _anotherComponent = __webpack_require__(19);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}exports.default =

{
    selector: 'another-comp',
    controller: _anotherComponent.AnotherComponent,
    render: function render(controller, container) {
        var root = templateFactory.createRoot('another-comp', _anotherComponent.AnotherComponent, root);

        var h10 = templateFactory.createElement(container, 'h1', root);
        templateFactory.setText('Another comp', h10);

        var title_comp0 = templateFactory.createElement(container, 'title-comp', root);
        return root;
    } };

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _template = __webpack_require__(1);var templateFactory = _interopRequireWildcard(_template);
var _homeComponent = __webpack_require__(8);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}exports.default =

{
    selector: 'a-component',
    controller: _homeComponent.HomeComponent,
    render: function render(controller, container) {
        var root = templateFactory.createRoot('a-component', _homeComponent.HomeComponent, root);

        var p0 = templateFactory.createElement(container, 'p', root);
        templateFactory.boundText(container, 'prop', p0, function () {return controller.prop;});
        templateFactory.setText(' is cool ey oh', p0);

        var input0 = templateFactory.createElement(container, 'input', root);
        templateFactory.setBinding(container, 'prop', function () {
            if (input0.value !== controller.prop) {
                input0.value = controller.prop;
            }
        });
        templateFactory.setEvent(container, 'input', function ($event) {return controller.inputUpdated($event);}, input0);

        var button0 = templateFactory.createElement(container, 'button', root);
        templateFactory.setEvent(container, 'click', function ($event) {return controller.clicked();}, button0);
        templateFactory.setText('click here dude!', button0);
        templateFactory.setText('This is just a text', root);
        var br0 = templateFactory.createElement(container, 'br', root);

        var span0DirectiveContext = function span0DirectiveContext(context) {
            var span0 = templateFactory.createElement(container, 'span', root);
            templateFactory.setAttribute('style', 'background: yellow', span0);
            templateFactory.setText('This is iffable', span0);
            return span0;
        };
        templateFactory.setDirective(container, controller, '@if', 'iffable === true', root, span0DirectiveContext);

        var button1 = templateFactory.createElement(container, 'button', root);
        templateFactory.setEvent(container, 'click', function ($event) {return controller.showHide();}, button1);
        templateFactory.setText('Show/hide', button1);
        return root;
    } };

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _template = __webpack_require__(1);var templateFactory = _interopRequireWildcard(_template);
var _rootComponent = __webpack_require__(20);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}exports.default =

{
    selector: 'root-comp',
    controller: _rootComponent.RootComponent,
    render: function render(controller, container) {
        var root = templateFactory.createRoot('root-comp', _rootComponent.RootComponent, root);

        var h11 = templateFactory.createElement(container, 'h1', root);
        templateFactory.setText('Application Root', h11);

        var router_outlet0 = templateFactory.createElement(container, 'router-outlet', root);
        return root;
    } };

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _template = __webpack_require__(1);var templateFactory = _interopRequireWildcard(_template);
var _titleComponent = __webpack_require__(21);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}exports.default =

{
    selector: 'title-comp',
    controller: _titleComponent.TitleComponent,
    render: function render(controller, container) {
        var root = templateFactory.createRoot('title-comp', _titleComponent.TitleComponent, root);

        var h12 = templateFactory.createElement(container, 'h1', root);
        templateFactory.setText('This is a title component', h12);

        var div0 = templateFactory.createElement(container, 'div', root);
        templateFactory.boundText(container, 'potato', div0, function () {return controller.potato;});

        var button2 = templateFactory.createElement(container, 'button', root);
        templateFactory.setEvent(container, 'click', function ($event) {return controller.clicked();}, button2);
        templateFactory.setText('POtato button', button2);
        return root;
    } };

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else
    for (var i = decorators.length - 1; i >= 0; i--) {if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;}
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var fake_service_1 = __webpack_require__(2);
var ts_1 = __webpack_require__(18);
var HomeComponent = function () {
    function HomeComponent(fakeService) {
        fakeService.doSomething();
        this.prop = 'predefined';
    }
    Object.defineProperty(HomeComponent, "metadata", {
        get: function get() {
            return {
                dependencies: [fake_service_1.FakeService] };

        },
        enumerable: true,
        configurable: true });

    HomeComponent.prototype.inputUpdated = function (event) {
        var _this = this;
        var element = event.target;
        var start = element.selectionStart;
        var end = element.selectionEnd;
        setTimeout(function () {
            _this.prop = element.value;
            element.setSelectionRange(start, end);
        });
    };
    HomeComponent.prototype.clicked = function () {
        this.prop = this.prop + ' Clicked!';
    };
    HomeComponent.prototype.showHide = function () {
        this.iffable = !this.iffable;
    };
    return HomeComponent;
}();
__decorate([
ts_1.observable(),
__metadata("design:type", String)],
HomeComponent.prototype, "prop", void 0);
__decorate([
ts_1.observable(),
__metadata("design:type", Boolean)],
HomeComponent.prototype, "iffable", void 0);
HomeComponent = __decorate([
ts_1.inject,
__metadata("design:paramtypes", [typeof (_a = typeof fake_service_1.FakeService !== "undefined" && fake_service_1.FakeService) === "function" && _a || Object])],
HomeComponent);
exports.HomeComponent = HomeComponent;
var _a;

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(0);
function observable() {
    return function (target, propertyKey) {
        var _private;
        return {
            get: function get() {
                return _private;
            },
            set: function set(val) {
                if (_private !== val) {
                    _private = val;
                    utils_1.call(this._notifyChange, this, propertyKey);
                }
            },
            enumerable: true };

    };
}
exports.observable = observable;
function inject(target) {
}
exports.inject = inject;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) {if (!exports.hasOwnProperty(p)) exports[p] = m[p];}
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(17));

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.AnotherComponent = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _fake = __webpack_require__(2);function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

AnotherComponent = exports.AnotherComponent = function () {_createClass(AnotherComponent, null, [{ key: 'metadata', get: function get()
        {
            return {
                dependencies: [_fake.FakeService] };

        } }]);

    function AnotherComponent(fake) {_classCallCheck(this, AnotherComponent);
        console.log(fake.kept);
    }return AnotherComponent;}();

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var RootComponent = exports.RootComponent = function () {_createClass(RootComponent, null, [{ key: "metadata", get: function get()
        {
            return {
                dependencies: [] };

        } }]);

    function RootComponent() {_classCallCheck(this, RootComponent);
    }return RootComponent;}();

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var TitleComponent = exports.TitleComponent = function () {_createClass(TitleComponent, [{ key: 'potato', get: function get()






        {
            return this._potato;
        }, set: function set(
        val) {
            if (val !== this._potato) {
                this._potato = val;
                this._notifyChange('potato');
            }

        } }], [{ key: 'metadata', get: function get() {return { dependencies: [] };} }]);

    function TitleComponent() {_classCallCheck(this, TitleComponent);
    }_createClass(TitleComponent, [{ key: 'clicked', value: function clicked()

        {
            this.potato = this.potato + ' Another click!';
        } }]);return TitleComponent;}();

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var another_component_html_1 = __webpack_require__(4);
var home_component_html_1 = __webpack_require__(5);
var root_component_html_1 = __webpack_require__(6);
var title_component_html_1 = __webpack_require__(7);
var fake_service_1 = __webpack_require__(2);
var app = frameworken.module('app', {
    routes: [
    { path: '/', root: home_component_html_1.default, resolve: function resolve() {return true;} },
    { path: '/another', root: another_component_html_1.default }],

    types: [
    fake_service_1.FakeService],

    components: [
    home_component_html_1.default,
    another_component_html_1.default,
    root_component_html_1.default,
    title_component_html_1.default],

    rootComponent: root_component_html_1.default,
    preLoad: function preLoad() {
        return true;
    } });

app.deploy(document.getElementById('main'));

/***/ })
/******/ ]);
});
//# sourceMappingURL=example.js.map