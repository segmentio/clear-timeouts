'use strict';

/**
 * Previous
 */

var prev = 0;

/**
 * Noop
 */

var noop = Function.prototype;

/**
 * Clear all timeouts
 *
 * @api public
 */

function clearTimeouts() {
  var tmp;
  var i;

  tmp = i = setTimeout(noop);
  while (prev < i) {
    clearTimeout(i--);
  }
  prev = tmp;
}


/*
 * Exports.
 */

module.exports = clearTimeouts;
