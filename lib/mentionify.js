'use strict';

var _findandreplacedomtext = require('findandreplacedomtext');

var _findandreplacedomtext2 = _interopRequireDefault(_findandreplacedomtext);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRegex(site) {
    return _utils.regexes[site] ? _utils.regexes[site] : _utils.regexes['default'];
}

module.exports = {
    run: function run(options) {
        var userOptions = typeof options !== 'undefined' ? options : _utils.defaultOptions;
        for (var option in _utils.defaultOptions) {
            userOptions[option] = userOptions[option] || _utils.defaultOptions[option];
        }

        (0, _findandreplacedomtext2.default)(document.getElementById(userOptions.elementId), {
            find: getRegex(userOptions.site),
            replace: function replace(portion, match) {
                var whole = match[0],
                    mention = match[1],
                    username = match[2],
                    site = match[3] || userOptions.site,
                    a = document.createElement('a'),
                    href = '//' + (0, _utils.getSiteUri)(site) + username,
                    text = document.createTextNode(whole);

                console.log(site);
                console.log(match[3]);

                a.setAttribute('href', href);
                a.setAttribute('class', userOptions.className);
                a.appendChild(text);

                return a;
            }
        });
    },

    regexes: _utils.regexes,

    getSiteUri: _utils.getSiteUri
};