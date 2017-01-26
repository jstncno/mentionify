import findAndReplaceDOMText from 'findandreplacedomtext';

var defaultOptions = {
        "elementId": "container",
        "account": "twitter",
        "className": "mentionified"
    },
    userOptions = null;

var accounts = {
    "linkedin": "linkedin.com/in/",
    "reddit": "reddit.com/u/"
};

var regexes = {
    "default": /\B(\@)([a-zA-Z0-9-_]+)\b/g,
    "linkedin": /\B(\/in\/)([a-zA-Z0-9-_]+)\b/g,
    "reddit": /\B(\/u\/)([a-zA-Z0-9-_]+)\b/g,
    "auto": /\B(\@)([a-zA-Z0-9-_]+)\(([a-zA-Z0-9-_]+)\)/g
};

function getAccountUri(account) {
    return accounts[account] ? accounts[account] : account + ".com/";
}

function getRegex(account) {
    return regexes[account] ? regexes[account] : regexes["default"];
}

function Mentionify() {

    this.run = function(options) {
        userOptions = typeof options !== "undefined" ?  options : defaultOptions;
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
