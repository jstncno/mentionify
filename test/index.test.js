import { regexes } from '../src/utils';
import assert from 'assert';

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

describe('regex', function() {
  describe('default regexes', function() {
    it('should match with @\'s in strings', function() {
      assert.ok("@jcvno".match(regexes["default"]));
      assert.ok("@github and @githubstatus".match(regexes["default"]));
      assert.ok("I am mentioning @jcvno: hello!".match(regexes["default"]));
      assert.ok("@_underscore_".match(regexes["default"]));
    });
  });
});
