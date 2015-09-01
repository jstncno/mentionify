accounts = {
    "linkedin": "linkedin.com/in/",
    "reddit": "reddit.com/r/"
};

function buildURL(account) {
    if (!(account in accounts))
        return "://" + account + ".com/";
    return accounts[account];
}

function testMentionify(account) {
    QUnit.test("mentionify." + account, function( assert ) {
        var links = document.getElementById(account).getElementsByClassName("mentionified");
        for (var i = 0; i < links.length; i++) {
            href = links[i].href.slice(links[i].href.indexOf("://"));
            url = buildURL(account) + links[i].innerHTML.slice(1);
            assert.equal(href, url);
        }
    });
}

testMentionify("twitter");
testMentionify("github");
testMentionify("facebook");
testMentionify("portfolium");
testMentionify("soundcloud");
