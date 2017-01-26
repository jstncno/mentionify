import findAndReplaceDOMText from 'findandreplacedomtext';
import { defaultOptions, accounts, regexes } from './utils';

function getAccountUri(account) {
    return accounts[account] ? accounts[account] : account + ".com/";
}

function getRegex(account) {
    return regexes[account] ? regexes[account] : regexes["default"];
}

export default class Mentionify {

    run(options) {
        var userOptions = typeof options !== "undefined" ?  options : defaultOptions;
        for (var option in defaultOptions) {
            userOptions[option] = userOptions[option] || defaultOptions[option];
        }

        findAndReplaceDOMText(document.getElementById(userOptions.elementId), {
          find: getRegex(userOptions.account),
          replace: function(portion, match) {
                var whole = match[0], mention = match[1], username = match[2],
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
    };

}

module.exports.regexes = regexes;

var mentionify = new Mentionify();
mentionify.run({elementId: 'twitter'});
mentionify.run({elementId: 'github', account:'github'});
mentionify.run({elementId: 'facebook', account:'facebook'});
mentionify.run({elementId: 'portfolium', account:'portfolium'});
mentionify.run({elementId: 'soundcloud', account:'soundcloud'});
mentionify.run({elementId: 'linkedin', account:'linkedin'});
mentionify.run({elementId: 'reddit', account:'reddit'});
mentionify.run({elementId: 'auto', account:'auto'});
mentionify.run({elementId: 'specified-class-name', account:'facebook', className:'some-class-name'})
mentionify.run({elementId: 'email'});
