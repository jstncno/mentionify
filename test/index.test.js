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

testMentionify("twitter");
testMentionify("github");
testMentionify("facebook");
testMentionify("portfolium");
testMentionify("soundcloud");
testMentionify("linkedin");
testMentionify("reddit");

testEmail();