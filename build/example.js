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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FakeService = exports.FakeService = function () {
    function FakeService() {
        _classCallCheck(this, FakeService);
    }

    _createClass(FakeService, [{
        key: 'doSomething',
        value: function doSomething() {
            console.log('it works!');
        }
    }]);

    return FakeService;
}();

/***/ }),
/* 1 */
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
/* 2 */
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
                selector: 'another-comp',
                template: '<h1>Another comp</h1><title-comp></title-comp>',
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RootComponent = exports.RootComponent = function () {
    _createClass(RootComponent, null, [{
        key: 'metadata',
        get: function get() {
            return {
                selector: 'root-comp',
                template: '<h1>Application Root</h1><router-outlet></router-outlet>',
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
/* 4 */
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
            return this._something;
        },
        set: function set(val) {
            if (val !== this._something) {
                this._something = val;
                this.notifyChange('prop');
            }
        }
    }], [{
        key: 'metadata',
        get: function get() {
            return {
                selector: 'title-comp',
                template: '<h1>This is a title component</h1><div>{{potato}}</div><button on:click="clicked()">POtato button</button>',
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
            this.potato = this.potato + ' Clicked!';
        }
    }, {
        key: 'notifyChange',
        value: function notifyChange(propertyName) {
            var _this = this;

            if (typeof this.onPropetyChanged === 'function') {
                setTimeout(function () {
                    _this.onPropetyChanged(propertyName);
                }, 1);
            }

            return this;
        }
    }]);

    return TitleComponent;
}();

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HomeComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fake = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HomeComponent = exports.HomeComponent = function () {
    _createClass(HomeComponent, [{
        key: 'prop',
        get: function get() {
            return this._something;
        },
        set: function set(val) {
            if (val !== this._something) {
                this._something = val;
                this.notifyChange('prop');
            }
        }
    }], [{
        key: 'metadata',
        get: function get() {
            return {
                dependencies: [_fake.FakeService]
            };
        }
    }]);

    function HomeComponent(fakeService) {
        _classCallCheck(this, HomeComponent);

        fakeService.doSomething();
        fakeService.kept = 'kept instance';
        this._something = 'predefined!';
    }

    _createClass(HomeComponent, [{
        key: 'clicked',
        value: function clicked() {
            this.prop = this.prop + ' Clicked!';
        }
    }, {
        key: 'notifyChange',
        value: function notifyChange(propertyName) {
            var _this = this;

            if (typeof this.onPropetyChanged === 'function') {
                setTimeout(function () {
                    _this.onPropetyChanged(propertyName);
                }, 1);
            }

            return this;
        }
    }]);

    return HomeComponent;
}();

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _another = __webpack_require__(2);

var _homeComponent = __webpack_require__(1);

var HomeComponent = _interopRequireWildcard(_homeComponent);

var _root = __webpack_require__(3);

var _title = __webpack_require__(4);

var _fake = __webpack_require__(0);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var app = frameworken.module('app', {
    routes: [{ path: '/', root: HomeComponent }, { path: '/another', root: _another.AnotherComponent }],
    types: [_fake.FakeService],
    components: [HomeComponent, _another.AnotherComponent, _root.RootComponent, _title.TitleComponent],
    rootComponent: _root.RootComponent
}); /* global frameworken */


app.deploy(document.getElementById('main'));

/***/ })
/******/ ]);
});
//# sourceMappingURL=example.js.map