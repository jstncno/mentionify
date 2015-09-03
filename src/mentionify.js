var defaultOptions = {
        "elementId": "container",
        "account": "twitter"
    },
    userOptions = null;

var accounts = {
    "linkedin": "linkedin.com/in/",
    "reddit": "reddit.com/u/"
};

var regexes = {
    "default": /\B(\@)([a-zA-Z0-9-_]+)\b/g,
    "linkedin": /\B(\/in\/)([a-zA-Z0-9-_]+)\b/g,
    "reddit": /\B(\/u\/)([a-zA-Z0-9-_]+)\b/g
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
                    a = document.createElement("a"),
                    href = "//" + getAccountUri(userOptions.account) + username,
                    text = document.createTextNode(whole);

                a.setAttribute("href", href);
                a.setAttribute("class", "mentionified");
                a.appendChild(text);

                return a;
            }
        });
    };

}

