import jsdom from 'jsdom';
import fs from 'fs';
import assert from 'assert';

var dom = fs.readFileSync(__dirname + '/index.test.html');
var document = jsdom.jsdom(dom);
var window = document.defaultView;

var sites = ['twitter', 'github', 'facebook', 'portfolium', 'soundcloud', 'linkedin', 'reddit'];
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

function testMentionify(site) {
    describe('mentionify.' + site, function( assert ) {
        it('should match with @\'s in strings', function() {
            var links = document.getElementById(site).getElementsByClassName("mentionified");
            for (var i = 0; i < links.length; i++) {
                href = links[i].href.slice(links[i].href.indexOf("//"));
                url = "//" + getSiteUri(site) + links[i].innerHTML.slice(getMentionIndex(links[i].innerHTML));
                assert.equal(href, url);
            }
        });
    });
}

sites.map(testMentionify);
