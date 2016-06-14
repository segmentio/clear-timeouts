'use strict';

// XXX(ndhoule): Handle on Function#apply to get around IE7/8 ghettry
var apply = Function.prototype.apply;

// Keep a handle on original timer globals
var nativeSetTimeout = global.setTimeout;
var nativeClearTimeout = global.clearTimeout;

// Track a list of timeout IDs
var timeoutIds = [];

/**
 * Clear a list of setTimeout timer IDs.
 */
function clearTimeouts() {
  for (var i = 0; i < timeoutIds.length; i += 1) {
    nativeClearTimeout(timeoutIds[i]);
  }

  // Reset the list of tracked timeout IDs
  timeoutIds.length = 0;
}

/**
 * Override `global.setTimeout` with a function that tracks all setTimeout timer
 * IDs and then delegates to `global.setTimeout`.
 *
 * Note that any timeouts that were in effect prior to installing the tracker will *not* be cleared.
 *
 * @param {Object} [context=global] The context to override `setTimeout` in.
 */
function installMockSetTimeout(context) {
  context = context || global;
  // Reset the list of tracked timeout IDs
  timeoutIds.length = 0;

  // IE7/8: Move setTimeout off proto and onto instance
  global.setTimeout = global.setTimeout;
  global.setTimeout = function setTimeout() {
    // XXX(ndhoule): IE7/8 are ghetto so setTimeout.proto !== Function.proto
    var id = apply.call(nativeSetTimeout, global, arguments);
    timeoutIds.push(id);
    return id;
  };
}

// Automatically override `global.setTimeout` and start tracking timeout IDs
installMockSetTimeout();

/*
 * Exports.
 */

module.exports = clearTimeouts;
module.exports.install = installMockSetTimeout;
