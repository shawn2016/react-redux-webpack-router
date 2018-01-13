exports.ids = [0];
exports.modules = {

/***/ 1004:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(102);

var _react2 = _interopRequireDefault(_react);

var _router = __webpack_require__(1006);

var _router2 = _interopRequireDefault(_router);

var _propTypes = __webpack_require__(1002);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = __webpack_require__(244);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*eslint-disable */


var RouterPage = function (_Component) {
    _inherits(RouterPage, _Component);

    function RouterPage(props) {
        _classCallCheck(this, RouterPage);

        var _this = _possibleConstructorReturn(this, (RouterPage.__proto__ || Object.getPrototypeOf(RouterPage)).call(this, props));

        _initialiseProps.call(_this);

        _this.state = {};
        return _this;
    }

    _createClass(RouterPage, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.loadComponent(nextProps);
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.loadComponent(this.props);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/home/home' },
                        'home'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/home/dashboard' },
                        'dashboard'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/login' },
                        'login'
                    ),
                    _react2.default.createElement('br', null)
                ),
                this.state.component
            );
        }
    }]);

    return RouterPage;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.loadComponent = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(props) {
            var match, history, location, params, tempModule, routePage, routeModule, route, i, j, component;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            match = props.match, history = props.history, location = props.location;
                            params = match.params;
                            tempModule = params.modules.split('');
                            routePage = params.page.toLowerCase();
                            routeModule = tempModule.shift().toUpperCase() + tempModule.join('');
                            _context.prev = 5;
                            route = void 0;
                            i = 0;

                        case 8:
                            if (!_router2.default[routeModule + 'Route'].actions.length) {
                                _context.next = 28;
                                break;
                            }

                            if (!(_router2.default[routeModule + 'Route'].actions[i] && _router2.default[routeModule + 'Route'].actions[i].action && _router2.default[routeModule + 'Route'].actions[i].action.toLowerCase() === routePage)) {
                                _context.next = 15;
                                break;
                            }

                            route = _router2.default[routeModule + 'Route'].actions[i];
                            if (_router2.default[routeModule + 'Route'].actions[i].menuId) {
                                _this2.setState({
                                    selectMenuId: _router2.default[routeModule + 'Route'].actions[i].menuId
                                });
                            }
                            return _context.abrupt('break', 28);

                        case 15:
                            if (!_router2.default[routeModule + 'Route'].actions[i].childrenList) {
                                _context.next = 25;
                                break;
                            }

                            j = 0;

                        case 17:
                            if (!(j < _router2.default[routeModule + 'Route'].actions[i].childrenList.length)) {
                                _context.next = 25;
                                break;
                            }

                            if (!(_router2.default[routeModule + 'Route'].actions[i].childrenList[j].action.toLowerCase() === routePage)) {
                                _context.next = 22;
                                break;
                            }

                            route = _router2.default[routeModule + 'Route'].actions[i].childrenList[j];
                            if (_router2.default[routeModule + 'Route'].actions[i].menuId) {
                                _this2.setState({
                                    selectMenuId: _router2.default[routeModule + 'Route'].actions[i].menuId
                                });
                            }
                            return _context.abrupt('break', 28);

                        case 22:
                            j++;
                            _context.next = 17;
                            break;

                        case 25:
                            i++;
                            _context.next = 8;
                            break;

                        case 28:
                            _context.next = 30;
                            return route.ensure();

                        case 30:
                            component = _context.sent;

                            _this2.setState({
                                component: _react2.default.createElement(component.default, { match: match, history: history, params: location.state })
                            });
                            _context.next = 40;
                            break;

                        case 34:
                            _context.prev = 34;
                            _context.t0 = _context['catch'](5);

                            console.log('Global Router', _router2.default);
                            console.log('moudle: ', routeModule + 'Route');
                            console.log('page: ', routePage);
                            console.error('没有找到对应的页面', _context.t0);

                        case 40:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2, [[5, 34]]);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }();
};

RouterPage.propTypes = {
    loadComponent: _propTypes2.default.func
};
RouterPage.defaultProps = {
    loadComponent: function loadComponent() {}
};
exports.default = RouterPage;

/***/ }),

/***/ 1006:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _router = __webpack_require__(1007);

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 首页
exports.default = {
    HomeRoute: _router2.default
};

/***/ }),

/***/ 1007:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var HomeRoute = {
  name: 'home',
  actions: [{
    action: 'home',
    name: 'home',
    ensure: function ensure() {
      return __webpack_require__.e/* import() */(2).then(__webpack_require__.bind(null, 1008));
    }
  }, {
    action: 'dashboard',
    name: 'dashboard',
    ensure: function ensure() {
      return __webpack_require__.e/* import() */(3).then(__webpack_require__.bind(null, 1011));
    }
  }]
};
exports.default = HomeRoute;

/***/ })

};;