exports.ids = [2];
exports.modules = {

/***/ 1005:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ADD_HOME_COUNT = exports.ADD_HOME_COUNT = 'ADD_HOME_COUNT';
var REDUCE_HOME_COUNT = exports.REDUCE_HOME_COUNT = 'REDUCE_HOME_COUNT';

/***/ }),

/***/ 1008:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(102);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(387);

var _propTypes = __webpack_require__(1002);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = __webpack_require__(243);

var _action = __webpack_require__(1009);

var action = _interopRequireWildcard(_action);

__webpack_require__(1010);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home(props) {
    _classCallCheck(this, Home);

    var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

    _this.add = function () {
      _this.props.add();
    };

    _this.decrease = function () {
      _this.props.decrease();
    };

    _this.state = {
      count: 0
    };
    return _this;
  }

  _createClass(Home, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        count: nextProps.count
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        'home',
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'h1',
          null,
          this.state.count
        ),
        _react2.default.createElement(
          'button',
          { onClick: this.add },
          '+'
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'button',
          { onClick: this.decrease },
          '-'
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null)
      );
    }
  }]);

  return Home;
}(_react2.default.Component);

Home.propTypes = {
  add: _propTypes2.default.func,
  decrease: _propTypes2.default.func,
  count: _propTypes2.default.number
};
Home.defaultProps = {
  add: function add() {},
  count: 0,
  decrease: function decrease() {}
};
exports.default = (0, _reactRedux.connect)(function (_ref) {
  var demo = _ref.demo;
  return {
    count: demo.count
  };
}, function (dispatch) {
  return {
    add: (0, _redux.bindActionCreators)(action.add, dispatch),
    decrease: (0, _redux.bindActionCreators)(action.decrease, dispatch)
  };
})(Home);

/***/ }),

/***/ 1009:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decrease = exports.add = undefined;

var _constants = __webpack_require__(1005);

var add = exports.add = function add() {
    return {
        type: _constants.ADD_HOME_COUNT
    };
};
var decrease = exports.decrease = function decrease() {
    return {
        type: _constants.REDUCE_HOME_COUNT
    };
};

/***/ }),

/***/ 1010:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.computed = computed;

var _reducers = __webpack_require__(388);

var _constants = __webpack_require__(1005);

var initState = {
    count: 0
};
function computed() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
    var action = arguments[1];

    switch (action.type) {
        case _constants.ADD_HOME_COUNT:
            return _extends({}, state, {
                count: state.count + 1
            });
        case _constants.REDUCE_HOME_COUNT:
            return _extends({}, state, {
                count: state.count - 1
            });
        default:
            return _extends({}, state);
    }
}
(0, _reducers.injectReducer)(computed, 'demo');

/***/ })

};;