import findAndReplaceDOMText from 'findandreplacedomtext';
import { defaultOptions, sites, regexes } from './utils';

function getSiteUri(site) {
    return sites[site] ? sites[site] : site + ".com/";
}

function getRegex(site) {
    return regexes[site] ? regexes[site] : regexes["default"];
}

export default class Mentionify {

    run(options) {
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
    };

}

module.exports.regexes = regexes;
