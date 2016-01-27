QUnit.test("regex", function( assert ) {
    /* Default regex */
    assert.ok("@jcvno".match(regexes["default"]));
    assert.ok("@github and @githubstatus".match(regexes["default"]));
    assert.ok("I am mentioning @jcvno: hello!".match(regexes["default"]));
    assert.ok("@_underscore_".match(regexes["default"]));
    
    /* LinkedIn regex */
    assert.ok("/in/justincano".match(regexes.linkedin));
    assert.ok("Click on /in/justincano to view my LinkedIn profile".match(regexes.linkedin));

    /* reddit regex */
    assert.ok("Click on /u/canoj to view my reddit profile".match(regexes.reddit));
});

var delimiters = ["@", "/"];

function getMentionIndex(string) {
    var index;
    for (var delimiter in delimiters) {
        index = string.lastIndexOf(delimiters[delimiter]) + 1;
        if (index > 0) {
            return index;
        }
    }
}

function testMentionify(account) {
    QUnit.test("mentionify." + account, function( assert ) {
        var links = document.getElementById(account).getElementsByClassName("mentionified");
        for (var i = 0; i < links.length; i++) {
            href = links[i].href.slice(links[i].href.indexOf("//"));
            url = "//" + getAccountUri(account) + links[i].innerHTML.slice(getMentionIndex(links[i].innerHTML));
            assert.equal(href, url);
        }
    });
}

function testEmail() {
    QUnit.test("mentionify.email", function( assert ) {
        var links = document.getElementById("email").getElementsByClassName("mentionified");
        assert.equal(links.length, 0);
    });
}

function testAutoMentionify() {
    QUnit.test("mentionify.auto", function( assert ) {
        var links = document.getElementById("auto").getElementsByClassName("mentionified");
        var accounts = [
            { type: 'twitter', username: 'jcvno' },
            { type: 'reddit', username: 'canoj' }
        ];

        for (var i = 0; i < links.length; i++) {
            href = links[i].href.slice(links[i].href.indexOf("//"));
            url = "//" + getAccountUri(accounts[i].type) + accounts[i].username;
            assert.equal(href, url);
        }
    });
}

function testSpecifiedClassName() {
    QUnit.test("mentionify.specifiedClassName", function( assert ) {
        var links = document.getElementById("specified-class-name").getElementsByClassName("some-class-name");
        for (var i = 0; i < links.length; i++) {
            href = links[i].href.slice(links[i].href.indexOf("//"));
            url = "//" + getAccountUri("facebook") + links[i].innerHTML.slice(getMentionIndex(links[i].innerHTML));
            assert.equal(href, url);
        }
    });
}

testMentionify("twitter");
testMentionify("github");
testMentionify("facebook");
testMentionify("portfolium");
testMentionify("soundcloud");
testMentionify("linkedin");
testMentionify("reddit");

testEmail();
testAutoMentionify();
testSpecifiedClassName();
