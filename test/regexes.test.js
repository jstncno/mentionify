import { regexes, buildSiteUrl } from '../src/utils';
import assert from 'assert';

describe('regex', function() {
  describe('default regexes', function() {
    it('should match with @\'s in strings', function() {
      assert.ok('@jcvno'.match(regexes['default']));
      assert.ok('@github and @githubstatus'.match(regexes['default']));
      assert.ok('I am mentioning @jcvno: hello!'.match(regexes['default']));
      assert.ok('@_underscore_'.match(regexes['default']));

      assert.equal(buildSiteUrl(), '//twitter.com/jcvno');
    });
  });
});
