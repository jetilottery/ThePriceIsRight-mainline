define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  require('com/gsap/TweenLite');

  var Tween = window.TweenLite;

  return function networkActivityComponent(parts, opts) {
    var delay = (opts && opts.delay !== undefined) ? opts.delay : 3000;
    var timeout;

    // hide initially;
    parts.spinner.visible = false;
    parts.spinner.alpha = 0;

    var tween = Tween.to(parts.spinner, 0.25, {
      alpha: 1,
      paused: true,
      onReverseComplete: function hide() {
        parts.spinner.visible = false;
        parts.spinner.stop();
      }
    });

    function showSpinner () {
      parts.spinner.visible = true;
      parts.spinner.play();
      tween.play();
    }

    function startTimer(d) {
      // Show spinner after a delay. Use timeout because Tween delay is only used on the 1st play
      timeout = setTimeout(showSpinner, d !== undefined ? d : delay);
    }

    function stopTimer() {
      clearTimeout(timeout);
      tween.reverse();
    }

    // Attach start call to startNetworkActivity message
    msgBus.subscribe('UI.startNetworkActivity', startTimer);
    // Attach stop call to endNetworkActivity message
    msgBus.subscribe('UI.endNetworkActivity', stopTimer);

    return parts.spinner;
  };
});
