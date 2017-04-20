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
var FakeService = (function () {
    function FakeService() {
    }
    FakeService.prototype.doSomething = function () {
        console.log('it works!');
    };
    return FakeService;
}());
exports.FakeService = FakeService;


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _anotherComponent = __webpack_require__(19);exports.default =

{
        selector: 'another-comp',
        controller: _anotherComponent.AnotherComponent,
        render: function render(builder) {
                var component0 = builder.createRoot('another-comp', _anotherComponent.AnotherComponent);
                var h10 = builder.createElement('h1', component0);
                builder.setText('Another comp', h10);
                var title_comp0 = builder.createElement('title-comp', component0);
        } };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _homeComponent = __webpack_require__(7);exports.default =

{
								selector: 'a-component',
								controller: _homeComponent.HomeComponent,
								render: function render(builder) {
																var component2 = builder.createRoot('a-component', _homeComponent.HomeComponent);
																var p0 = builder.createElement('p', component2);
																builder.boundText('prop', p0);
																builder.setText(' is cool ey oh', p0);
																var input0 = builder.createElement('input', component2);
																builder.setBinding('prop', input0);
																var button1 = builder.createElement('button', component2);
																builder.setEvent('click', function (controller, $event) {return controller.clicked();}, button1);
																builder.setText('click here dude!', button1);
																builder.setText('This is just a text', component2);
																var br0 = builder.createElement('br', component2);
																var span0 = builder.createElement('span', component2);
																builder.setDirective('@if', 'iffable === true', span0);
																builder.setText('This is iffable', span0);
																var button2 = builder.createElement('button', component2);
																builder.setEvent('click', function (controller, $event) {return controller.showHide();}, button2);
																builder.setText('Show/hide', button2);
								} };

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _rootComponent = __webpack_require__(20);exports.default =

{
        selector: 'root-comp',
        controller: _rootComponent.RootComponent,
        render: function render(builder) {
                var component3 = builder.createRoot('root-comp', _rootComponent.RootComponent);
                var h12 = builder.createElement('h1', component3);
                builder.setText('Application Root', h12);
                var router_outlet0 = builder.createElement('router-outlet', component3);
        } };

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _titleComponent = __webpack_require__(21);exports.default =

{
								selector: 'title-comp',
								controller: _titleComponent.TitleComponent,
								render: function render(builder) {
																var component1 = builder.createRoot('title-comp', _titleComponent.TitleComponent);
																var h11 = builder.createElement('h1', component1);
																builder.setText('This is a title component', h11);
																var div0 = builder.createElement('div', component1);
																builder.boundText('potato', div0);
																var button0 = builder.createElement('button', component1);
																builder.setEvent('click', function (controller, $event) {return controller.clicked();}, button0);
																builder.setText('POtato button', button0);
								} };

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var fake_service_1 = __webpack_require__(1);
var ts_1 = __webpack_require__(18);
var HomeComponent = (function () {
    function HomeComponent(fakeService) {
        fakeService.doSomething();
        this.prop = 'predefined';
    }
    Object.defineProperty(HomeComponent, "metadata", {
        get: function () {
            return {
                dependencies: [fake_service_1.FakeService]
            };
        },
        enumerable: true,
        configurable: true
    });
    HomeComponent.prototype.clicked = function () {
        this.prop = this.prop + ' Clicked!';
    };
    HomeComponent.prototype.showHide = function () {
        this.iffable = !this.iffable;
    };
    return HomeComponent;
}());
__decorate([
    ts_1.observable(),
    __metadata("design:type", String)
], HomeComponent.prototype, "prop", void 0);
__decorate([
    ts_1.observable(),
    __metadata("design:type", Boolean)
], HomeComponent.prototype, "iffable", void 0);
HomeComponent = __decorate([
    ts_1.inject,
    __metadata("design:paramtypes", [fake_service_1.FakeService])
], HomeComponent);
exports.HomeComponent = HomeComponent;


/***/ }),
/* 8 */,
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
            get: function () {
                return _private;
            },
            set: function (val) {
                if (_private !== val) {
                    _private = val;
                    utils_1.call(this._notifyChange, this, propertyKey);
                }
            },
            enumerable: true
        };
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
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(17));


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.AnotherComponent = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _fake = __webpack_require__(1);function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

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
var another_component_html_1 = __webpack_require__(3);
var home_component_html_1 = __webpack_require__(4);
var root_component_html_1 = __webpack_require__(5);
var title_component_html_1 = __webpack_require__(6);
var fake_service_1 = __webpack_require__(1);
var app = frameworken.module('app', {
    routes: [
        { path: '/', root: home_component_html_1.default, resolve: function () { return true; } },
        { path: '/another', root: another_component_html_1.default }
    ],
    types: [
        fake_service_1.FakeService
    ],
    components: [
        home_component_html_1.default,
        another_component_html_1.default,
        root_component_html_1.default,
        title_component_html_1.default
    ],
    rootComponent: root_component_html_1.default,
    preLoad: function () {
        return true;
    }
});
app.deploy(document.getElementById('main'));


/***/ })
/******/ ]);
});
//# sourceMappingURL=example.js.map