module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		4: 0
/******/ 	};
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("./" + chunkId + ".index.js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.resolve();
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
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
/******/ 	__webpack_require__.p = "/Users/shawn-mac/02-个人/react/react-redux-webpack-router/dist/assets";
/******/
/******/ 	// uncatched error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using System.import().catch()
/******/ 		});
/******/ 	};
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
module.exports = __webpack_require__(5);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

// require('babel-register')();

// export app just for testing purpose


var serverRender = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var location, context, response, InitialView, html, preloadedState;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            location = req.url;
            context = {};
            _context.next = 4;
            return fakeFetch();

          case 4:
            response = _context.sent;
            InitialView = _react2.default.createElement(
              _reactRedux.Provider,
              { store: _store2.default },
              _react2.default.createElement(
                _reactRouterDom.StaticRouter,
                {
                  url: req.url,
                  context: context
                },
                _react2.default.createElement(_routers2.default, null)
              )
            );

            console.log('InitialView', InitialView);
            html = '';

            try {
              html = (0, _server.renderToString)(InitialView);
            } catch (error) {
              console.error('error: renderToString failed: ', error);
            }

            if (!context.url) {
              _context.next = 11;
              break;
            }

            return _context.abrupt('return', res.status.end({ location: context.url }));

          case 11:
            preloadedState = JSON.stringify(_store2.default.getState()); // serialize is better than 

            console.log(_store2.default.getState());
            return _context.abrupt('return', res.status(200).set('content-type', 'text/html').send(renderFullPage(html, preloadedState)));

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function serverRender(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(6);

var _moment = __webpack_require__(7);

var _moment2 = _interopRequireDefault(_moment);

var _reactRedux = __webpack_require__(8);

var _store = __webpack_require__(9);

var _store2 = _interopRequireDefault(_store);

var _reactRouterDom = __webpack_require__(1);

var _routers = __webpack_require__(14);

var _routers2 = _interopRequireDefault(_routers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var express = __webpack_require__(16);
var path = __webpack_require__(17);
// const fs = require('fs');

var chalk = __webpack_require__(18);
// chalk是一个颜色的插件。可以通过chalk.blue(‘hello world’)来改变颜色，但是我并没有式样成功，有待验证。
var bodyParser = __webpack_require__(19);
// const helmet = require('helmet');
var compression = __webpack_require__(20);
var PrettyError = __webpack_require__(21);
var Promise = __webpack_require__(22);
var serialize = __webpack_require__(23);
var morgan = __webpack_require__(24);
// isomorphic:

// import jsdom from 'jsdom'
var jsdom = __webpack_require__(25).rsJsdom;
global.document = jsdom('<!doctype html><html><body></body></html>', { url: 'http://localhost' });
global.window = document.defaultView;
global.navigator = window.navigator;
global.location = window.location;
global.history = window.history;
global.sessionStorage = window.sessionStorage;
var DOCS_PATH = '../../../dist';
var PORT = 8090;
var IP_ADRESS = 'localhost';

var app = express();
// let templateHtml = fs.readFileSync(path.join(__dirname, '../../../_index.html'))
app.set('port', PORT);
app.set('ipAdress', IP_ADRESS);

// not mandatory but better looking console errors
var pe = new PrettyError();
pe.start();

// app.use(helmet());          // ensure app security
app.use(compression()); // gzip compress if bowser supports it
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// if you need logs (note: uncomment line 11 too):
app.use(morgan('combined'));

app.use('/assets', express.static(path.resolve(__dirname, DOCS_PATH, 'assets/')));
// IMPORTANT: '/*' and not '/'
// since you want browser refresh (= first render) to work from any route of the application
app.get('/*', serverRender);
// global.document = window.document
/** ========================================================
*    error management
======================================================== */
// catch error 404:
app.use(function (req, res, next) {
  console.log('req.url: ', req.url);
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

/* eslint-disable no-unused-vars */
app.use(function (err, req, res, next) {
  if (err.status === 404) {
    res.status(404).send('Sorry nothing here for now...');
  }
  console.error(err);
  res.status(500).send('internal server error');
});

/* eslint-enable no-unused-vars */
/* ======================================================= */
// $FlowIgnore
// launch server:
app.listen(PORT, IP_ADRESS, function () {
  return console.log('\n    =====================================================\n    -> Server (' + chalk.bgBlue('SSR') + ') \uD83C\uDFC3 (running) on ' + chalk.green(IP_ADRESS) + ':' + chalk.green(PORT) + '\n    =====================================================\n  ');
});

module.exports = app;

function fakeFetch() {
  return new Promise(function (resolve) {
    return setTimeout(function () {
      return resolve({ info: 'whats up?' });
    }, 200);
  });
}

function renderFullPage(html) {
  var preloadedState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var indexHtml = {
    template: '<!DOCTYPE html>\n    <html lang="en">\n    \n    <head>\n        <meta charset="UTF-8">\n        <meta name="viewport" content="width=device-width, initial-scale=1.0">\n        <meta http-equiv="X-UA-Compatible" content="ie=edge">\n        <title>react</title>\n    <link href="/styles.css" rel="stylesheet"></head>\n    \n    <body>\n        <div id="root">' + html + '</div>\n    <script type="text/javascript" src="/../assets/vendor.js"></script><script type="text/javascript" src="/../assets/main.js"></script></body>\n    \n    </html>  \n  '
  };
  return indexHtml.template;
}
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(2);

var _reduxThunk = __webpack_require__(10);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = __webpack_require__(11);

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var finalCreateStore = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default))(_redux.createStore); /*eslint-disable*/

var store = void 0;
// window.devToolsExtension ? window.devToolsExtension() : f => f,
store = finalCreateStore(_reducers2.default);
store.subscribe(function () {
    console.log('[LOG--]', store.getState());
});
// if (module.hot) {
//     module.hot.accept('../reducers', () => {
//         const nextRootReducer = require('reduxes/reducers/index').default
//         store.replaceReducer(nextRootReducer)
//     })
// }
// 注入到reducer中
(0, _reducers.injectStore)(store);
exports.default = store;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.injectStore = exports.injectReducer = undefined;

var _redux = __webpack_require__(2);

var _api = __webpack_require__(12);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var obj = { api: _api2.default },
    _store = null;

var rootReducer = (0, _redux.combineReducers)(obj);

var createReducers = function createReducers(reducers, key) {
    var newReducer = {};
    newReducer[key] = reducers;
    (0, _redux.combineReducers)(obj);
    obj = Object.assign(obj, newReducer);
    return (0, _redux.combineReducers)(obj);
};

var injectReducer = exports.injectReducer = function injectReducer(reducers, key) {
    _store.replaceReducer(createReducers(reducers, key));
};

var injectStore = exports.injectStore = function injectStore(store) {
    return _store = store;
};

exports.default = rootReducer;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = __webpack_require__(13);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initState = {};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
  var action = arguments[1];

  switch (action.type) {
    case _constants.APISUCCESS:

      return _extends({}, state, _defineProperty({}, action.saveAs, action.data.body));
    case _constants.APIFAIL:
      return _constants.APIFAIL;
    case _constants.APICLEAR:
      return _constants.APICLEAR;
    default:
      return state;
  }
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var APISUCCESS = exports.APISUCCESS = Symbol('APISUCCESS');
var APIFAIL = exports.APIFAIL = Symbol('APIFAIL');
var APIPENDING = exports.APIPENDING = Symbol('APIPENDING');
var APICLEAR = exports.APICLEAR = Symbol('APICLEAR');
var SETTOKEN = exports.SETTOKEN = Symbol('SETTOKEN');
var CLEARTOEKN = exports.CLEARTOEKN = Symbol('CLEARTOEKN');

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _AsyncComponent = __webpack_require__(15);

var _AsyncComponent2 = _interopRequireDefault(_AsyncComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = (0, _AsyncComponent2.default)(function () {
  return __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 26));
});
var RouterPage = (0, _AsyncComponent2.default)(function () {
  return __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 27));
});

var Routers = function (_Component) {
  _inherits(Routers, _Component);

  function Routers() {
    _classCallCheck(this, Routers);

    return _possibleConstructorReturn(this, (Routers.__proto__ || Object.getPrototypeOf(Routers)).apply(this, arguments));
  }

  _createClass(Routers, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactRouterDom.Switch,
        null,
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/login', component: Login }),
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/:modules/:page', component: RouterPage }),
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: Login })
      );
    }
  }]);

  return Routers;
}(_react.Component);

exports.default = Routers;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = asyncComponent;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*eslint-disable*/


function asyncComponent(importComponent) {
    var AsyncComponent = function (_Component) {
        _inherits(AsyncComponent, _Component);

        function AsyncComponent(props) {
            _classCallCheck(this, AsyncComponent);

            var _this = _possibleConstructorReturn(this, (AsyncComponent.__proto__ || Object.getPrototypeOf(AsyncComponent)).call(this, props));

            _this.state = {
                component: null
            };
            return _this;
        }

        _createClass(AsyncComponent, [{
            key: 'componentDidMount',
            value: function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var _ref2, component;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return importComponent();

                                case 2:
                                    _ref2 = _context.sent;
                                    component = _ref2.default;

                                    this.setState({
                                        component: component
                                    });

                                case 5:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                function componentDidMount() {
                    return _ref.apply(this, arguments);
                }

                return componentDidMount;
            }()
        }, {
            key: 'render',
            value: function render() {
                var C = this.state.component;
                return C ? _react2.default.createElement(C, this.props) : null;
            }
        }]);

        return AsyncComponent;
    }(_react.Component);

    return AsyncComponent;
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("pretty-error");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("rs-jsdom");

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ })
/******/ ]);