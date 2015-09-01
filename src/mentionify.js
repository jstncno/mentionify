var defaultOptions = {
        elementId: 'container',
        account: 'twitter'
    },
    userOptions = null;

var REGEX = /\B(\@)(.+)\b/g;

function Mentionify() {

    this.run = function(options) {
        userOptions = typeof options !== 'undefined' ?  options : defaultOptions;
        for (var option in defaultOptions) {
            userOptions[option] = userOptions[option] || defaultOptions[option];
        }

        findAndReplaceDOMText(document.getElementById(userOptions.elementId), {
          find: REGEX,
          replace: function(portion, match) {
                var whole = match[0], mention = match[1], username = match[2],
                    a = document.createElement('a'),
                    href = '//' + userOptions.account + '.com/' + username,
                    text = document.createTextNode(whole);

                a.setAttribute('href', href);
                a.setAttribute('class', 'mentionified');
                a.appendChild(text);

                return a;
            }
        });
    };

}

