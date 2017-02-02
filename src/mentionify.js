import findAndReplaceDOMText from 'findandreplacedomtext';
import { defaultOptions, regexes , getSiteUri } from './utils';

function getRegex(site) {
    return regexes[site] ? regexes[site] : regexes["default"];
}

module.exports = {
    run: function(options) {
        var userOptions = typeof options !== "undefined" ?  options : defaultOptions;
        for (var option in defaultOptions) {
            userOptions[option] = userOptions[option] || defaultOptions[option];
        }

        findAndReplaceDOMText(document.getElementById(userOptions.elementId), {
          find: getRegex(userOptions.site),
          replace: function(portion, match) {
                var whole = match[0], mention = match[1], username = match[2],
                    site = match[3] || userOptions.site,
                    a = document.createElement("a"),
                    href = "//" + getSiteUri(site) + username,
                    text = document.createTextNode(whole);

                a.setAttribute("href", href);
                a.setAttribute("class", userOptions.className);
                a.appendChild(text);

                return a;
            }
        });
    },

    regexes: regexes,

    getSiteUri: getSiteUri
}
