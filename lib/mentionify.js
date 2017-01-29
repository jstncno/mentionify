'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _findandreplacedomtext = require('findandreplacedomtext');

var _findandreplacedomtext2 = _interopRequireDefault(_findandreplacedomtext);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getAccountUri(account) {
    return _utils.accounts[account] ? _utils.accounts[account] : account + ".com/";
}

function getRegex(account) {
    return _utils.regexes[account] ? _utils.regexes[account] : _utils.regexes["default"];
}

var Mentionify = function () {
    function Mentionify() {
        _classCallCheck(this, Mentionify);
    }

    _createClass(Mentionify, [{
        key: 'run',
        value: function run(options) {
            var userOptions = typeof options !== "undefined" ? options : _utils.defaultOptions;
            for (var option in _utils.defaultOptions) {
                userOptions[option] = userOptions[option] || _utils.defaultOptions[option];
            }

            (0, _findandreplacedomtext2.default)(document.getElementById(userOptions.elementId), {
                find: getRegex(userOptions.account),
                replace: function replace(portion, match) {
                    var whole = match[0],
                        mention = match[1],
                        username = match[2],
                        account = match[3] || userOptions.account,
                        a = document.createElement("a"),
                        href = "//" + getAccountUri(account) + username,
                        text = document.createTextNode(whole);

                    a.setAttribute("href", href);
                    a.setAttribute("class", userOptions.className);
                    a.appendChild(text);

                    return a;
                }
            });
        }
    }]);

    return Mentionify;
}();

exports.default = Mentionify;


module.exports.regexes = _utils.regexes;