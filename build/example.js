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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _anotherComponent = __webpack_require__(9);

module.exports = {
				selector: 'another-comp',
				controller: _anotherComponent.AnotherComponent,
				render: function render(builder) {
								var component0 = builder.createRoot('another-comp', _anotherComponent.AnotherComponent);
								var h10 = builder.createElement('h1', component0);
								builder.setText('Another comp', h10);
								var title_comp0 = builder.createElement('title-comp', component0);
				}

};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _homeComponent = __webpack_require__(6);

module.exports = {
				selector: 'a-component',
				controller: _homeComponent.HomeComponent,
				render: function render(builder) {
								var component0 = builder.createRoot('a-component', _homeComponent.HomeComponent);
								var p0 = builder.createElement('p', component0);
								builder.boundText('prop', p0);
								builder.setText(' is cool ey oh', p0);
								var input0 = builder.createElement('input', component0);
								builder.setAttribute('binding', 'prop', input0);
								var button0 = builder.createElement('button', component0);
								builder.setAttribute('trigger:click', 'clicked()', button0);
								builder.setText('click here dude!', button0);
								builder.setText('This is just a text', component0);
				}

};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _rootComponent = __webpack_require__(10);

module.exports = {
				selector: 'root-comp',
				controller: _rootComponent.RootComponent,
				render: function render(builder) {
								var component0 = builder.createRoot('root-comp', _rootComponent.RootComponent);
								var h10 = builder.createElement('h1', component0);
								builder.setText('Application Root', h10);
								var router_outlet0 = builder.createElement('router-outlet', component0);
				}

};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _titleComponent = __webpack_require__(11);

module.exports = {
				selector: 'title-comp',
				controller: _titleComponent.TitleComponent,
				render: function render(builder) {
								var component0 = builder.createRoot('title-comp', _titleComponent.TitleComponent);
								var h10 = builder.createElement('h1', component0);
								builder.setText('This is a title component', h10);
								var div0 = builder.createElement('div', component0);
								builder.boundText('potato', div0);
								var button0 = builder.createElement('button', component0);
								builder.setAttribute('trigger:click', 'clicked()', button0);
								builder.setText('POtato button', button0);
				}

};

/***/ }),
/* 6 */
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
var fake_service_1 = __webpack_require__(0);
var ts_1 = __webpack_require__(8);
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
    __decorate([
        ts_1.observable(), 
        __metadata('design:type', String)
    ], HomeComponent.prototype, "prop", void 0);
    HomeComponent = __decorate([
        ts_1.inject, 
        __metadata('design:paramtypes', [fake_service_1.FakeService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
                    this._notifyChange(propertyKey);
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(7));


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AnotherComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fake = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnotherComponent = exports.AnotherComponent = function () {
    _createClass(AnotherComponent, null, [{
        key: 'metadata',
        get: function get() {
            return {
                dependencies: [_fake.FakeService]
            };
        }
    }]);

    function AnotherComponent(fake) {
        _classCallCheck(this, AnotherComponent);

        console.log(fake.kept);
    }

    return AnotherComponent;
}();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RootComponent = exports.RootComponent = function () {
    _createClass(RootComponent, null, [{
        key: "metadata",
        get: function get() {
            return {
                dependencies: []
            };
        }
    }]);

    function RootComponent() {
        _classCallCheck(this, RootComponent);
    }

    return RootComponent;
}();

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TitleComponent = exports.TitleComponent = function () {
    _createClass(TitleComponent, [{
        key: 'potato',
        get: function get() {
            return this._potato;
        },
        set: function set(val) {
            if (val !== this._potato) {
                this._potato = val;
                this._notifyChange('potato');
            }
        }
    }], [{
        key: 'metadata',
        get: function get() {
            return {
                dependencies: []
            };
        }
    }]);

    function TitleComponent() {
        _classCallCheck(this, TitleComponent);
    }

    _createClass(TitleComponent, [{
        key: 'clicked',
        value: function clicked() {
            this.potato = this.potato + ' Another click!';
        }
    }]);

    return TitleComponent;
}();

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anotherComponent = __webpack_require__(2);
var homeComponent = __webpack_require__(3);
var rootComponent = __webpack_require__(4);
var titleComponent = __webpack_require__(5);
var fake_service_1 = __webpack_require__(0);
var app = frameworken.module('app', {
    routes: [
        { path: '/', root: homeComponent },
        { path: '/another', root: anotherComponent }
    ],
    types: [
        fake_service_1.FakeService
    ],
    components: [
        homeComponent,
        anotherComponent,
        rootComponent,
        titleComponent
    ],
    rootComponent: rootComponent
});
app.deploy(document.getElementById('main'));


/***/ })
/******/ ]);
});
//# sourceMappingURL=example.js.map