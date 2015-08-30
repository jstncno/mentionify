findAndReplaceDOMText(document.getElementById('example'), {
  find: /(\@)(\w+)/,
  replace: function(portion, match) {
    var whole = match[0], mention = match[1], username = match[2],
        a = document.createElement('a'),
        href = '//twitter.com/' + username,
        text = document.createTextNode(whole);

    a.setAttribute('href', href);
    a.appendChild(text);

    return a;
  },
  forceContext: function(el) {
    // Using https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
    return el.matches('p');
  }
});
