define(function(require) {
  var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  var LANDSCAPE = 'landscape';
  var PORTRAIT = 'portrait';

  function currentOrientation() {
    return SKBeInstant.getGameOrientation() === LANDSCAPE ? LANDSCAPE : PORTRAIT;
  }

  return {
    LANDSCAPE: LANDSCAPE,
    PORTRAIT: PORTRAIT,
    get: currentOrientation
  };
});
