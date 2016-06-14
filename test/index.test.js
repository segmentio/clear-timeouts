'use strict';

var assert = require('proclaim');
var clear = require('../lib');

describe('clear-timeouts', function() {
  var j = 0;
  function incr() { ++j; }
  setTimeout(incr);
  setTimeout(incr, 50);
  setTimeout(incr, 90);
  setTimeout(incr, 100);

  it('should clear timeouts', function(done) {
    setTimeout(function() {
      clear();
      assert.strictEqual(j, 2);
      done();
    }, 51);
  });

  it('should clear', function(done) {
    setTimeout(incr, 50);
    setTimeout(function() {
      clear();
      assert.strictEqual(j, 3);
      done();
    }, 101);
  });
});
