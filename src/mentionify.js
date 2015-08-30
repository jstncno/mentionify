var default_options = {
        account: 'twitter'
    },
    user_options = null;

function Mentionify() {

    this.run = function(options) {
        user_options = typeof options !== 'undefined' ?  options : default_options;
        for (var option in default_options) {
            user_options[option] = user_options[option] || default_options[option];
        }

        findAndReplaceDOMText(document.getElementById('example'), {
          account: 'test',
          find: /(\@)(\w+)/,
          replace: function(portion, match) {
                var whole = match[0], mention = match[1], username = match[2],
                    a = document.createElement('a'),
                    href = '//' + user_options.account + '.com/' + username,
                    text = document.createTextNode(whole);

                    console.log(href);
                a.setAttribute('href', href);
                a.appendChild(text);

                return a;
            },
            forceContext: function(el) {
                // Using https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
                return el.matches('p');
            }
        });
    };

}

var mentionify = new Mentionify();
mentionify.run({account:'github'});
