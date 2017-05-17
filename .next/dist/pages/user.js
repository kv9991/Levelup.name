'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _store = require('../store');

var _nextReduxWrapper = require('next-redux-wrapper');

var _nextReduxWrapper2 = _interopRequireDefault(_nextReduxWrapper);

var _body = require('../components/body');

var _body2 = _interopRequireDefault(_body);

var _user = require('../components/user/');

var _user2 = _interopRequireDefault(_user);

var _initscripts = require('../utils/initscripts');

var _initscripts2 = _interopRequireDefault(_initscripts);

var _appConfig = require('../app.config.js');

var _appConfig2 = _interopRequireDefault(_appConfig);

var _createPage = require('../utils/createPage.js');

var _createPage2 = _interopRequireDefault(_createPage);

var _page = require('../components/HOC/page');

var _page2 = _interopRequireDefault(_page);

var _sidebar = require('../components/sidebar.js');

var _sidebar2 = _interopRequireDefault(_sidebar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page = function (_React$Component) {
  (0, _inherits3.default)(Page, _React$Component);

  function Page(props) {
    (0, _classCallCheck3.default)(this, Page);

    return (0, _possibleConstructorReturn3.default)(this, (Page.__proto__ || (0, _getPrototypeOf2.default)(Page)).call(this, props));
  }

  (0, _createClass3.default)(Page, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var page = (0, _createPage2.default)(this.props.page, _react2.default.createElement(_user2.default, { data: this.props.data }), null, null);
      this.state = { page: page };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      (0, _initscripts2.default)();
    }
  }, {
    key: 'render',
    value: function render() {
      var page = this.state.page;
      return _react2.default.createElement('div', null, _react2.default.createElement(_sidebar2.default, null), _react2.default.createElement(_body2.default, { page: page }, page.child));
    }
  }]);

  return Page;
}(_react2.default.Component);

var query = {
  user: {
    type: 'user',
    single: true
  }
};

var Container = (0, _page2.default)(Page, 'user', query);
exports.default = (0, _nextReduxWrapper2.default)(_store.initStore, function (state) {
  return state;
})(Container);