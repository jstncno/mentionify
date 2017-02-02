import jsdom from 'jsdom';
import fs from 'fs';
import assert from 'assert';
import { getSiteUri } from '../lib/utils';

var html = fs.readFileSync(__dirname + '/index.test.html');
var mentionify = __dirname + '/../bin/test/test.mentionify.bundle.js';

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
    jsdom.env({
        html: html,
        scripts: [mentionify],
        done: function (err, window) {
            sites.map( site =>
                describe(site, function() {
                    it('should render @\'s to links', function() {
                        var links = window.document.getElementById(site).getElementsByClassName('mentionified');
                        console.log(links.length);
                        assert.notEqual(links.length, 0);
                        for (var i = 0; i < links.length; i++) {
                            var href = links[i].href.slice(links[i].href.indexOf('//'));
                            var url = '//' + getSiteUri(site) + links[i].innerHTML.slice(getMentionIndex(links[i].innerHTML));
                            console.log(href, url);
                            assert.equal(href, url);
                        }
                    });
                })
            );

            describe('email', function() {
                it('should not render email link', function() {
                    var links = window.document.getElementById('email').getElementsByClassName('mentionified');
                    assert.equal(links.length, 0);
                });
            });

            describe('auto', function() {
                it('should automatically parse and render site link', function() {
                    var links = window.document.getElementById('auto').getElementsByClassName('mentionified');
                    assert.notEqual(links.length, 0);

                    var sites = [
                        { type: 'twitter', username: 'jcvno' },
                        { type: 'reddit', username: 'canoj' }
                    ];

                    for (var i = 0; i < links.length; i++) {
                        var href = links[i].href.slice(links[i].href.indexOf('//'));
                        var url = '//' + getSiteUri(sites[i].type) + sites[i].username;
                        assert.equal(href, url);
                    }
                });
            });

            describe('specifiedClassName', function() {
                it('should created the specified class name', function() {
                    var links = window.document.getElementById('specified-class-name').getElementsByClassName('some-class-name');
                    assert.notEqual(links.length, 0);
                    for (var i = 0; i < links.length; i++) {
                        var href = links[i].href.slice(links[i].href.indexOf('//'));
                        var url = '//' + getSiteUri('facebook') + links[i].innerHTML.slice(getMentionIndex(links[i].innerHTML));
                        assert.equal(href, url);
                    }
                });
            });
        }
    });
});
