import jsdom from 'jsdom';
import fs from 'fs';
import assert from 'assert';

var dom = fs.readFileSync(__dirname + '/index.test.html');
var document = jsdom.jsdom(dom);
var window = document.defaultView;

var sites = ['twitter', 'github', 'facebook', 'portfolium', 'soundcloud', 'linkedin', 'reddit'];
var delimiters = ['@', '/'];

function getMentionIndex(string) {
    var index;
    for (var delimiter in delimiters) {
        index = string.lastIndexOf(delimiters[delimiter]) + 1;
        if (index > 0) {
            return index;
        }
    }
}

describe('mentionify', function() {
    sites.map( site =>
        describe(site, function() {
            it('should render @\'s to links', function() {
                var links = document.getElementById(site).getElementsByClassName('mentionified');
                for (var i = 0; i < links.length; i++) {
                    href = links[i].href.slice(links[i].href.indexOf('//'));
                    url = '//' + getSiteUri(site) + links[i].innerHTML.slice(getMentionIndex(links[i].innerHTML));
                    assert.equal(href, url);
                }
            });
        })
    );

    describe('email', function() {
        it('should not render email link', function() {
            var links = document.getElementById('email').getElementsByClassName('mentionified');
            assert.equal(links.length, 0);
        });
    });

    describe('auto', function( assert ) {
        it('should automatically parse and render site link', function() {
            var links = document.getElementById('auto').getElementsByClassName('mentionified');
            var sites = [
                { type: 'twitter', username: 'jcvno' },
                { type: 'reddit', username: 'canoj' }
            ];

            for (var i = 0; i < links.length; i++) {
                href = links[i].href.slice(links[i].href.indexOf('//'));
                url = '//' + getSiteUri(sites[i].type) + sites[i].username;
                assert.equal(href, url);
            }
        });
    });

    describe('specifiedClassName', function( assert ) {
        it('should created the specified class name', function() {
            var links = document.getElementById('specified-class-name').getElementsByClassName('some-class-name');
            for (var i = 0; i < links.length; i++) {
                href = links[i].href.slice(links[i].href.indexOf('//'));
                url = '//' + getAccountUri('facebook') + links[i].innerHTML.slice(getMentionIndex(links[i].innerHTML));
                assert.equal(href, url);
            }
        });
    });
});
