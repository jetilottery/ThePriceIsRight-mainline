define(function(require) {
  var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');

  return function autoPlayButtonComponent(parts) {
    parts.autoPlayStop.visible = false;
    parts.autoPlayStart.visible = false;

    var override = SKBeInstant.config.autoRevealEnabled;

    function updateButton(conf) {
      // Bomb out if autoPlay is not being updated
      if (conf.autoPlay === undefined) {
        return;
      }

      var bConf = conf.autoPlay;

      // Update button visibility
      if (bConf === true || bConf.visible === true) {
        // Button will be shown if it isn't blocked in the configured param
        parts.autoPlayStart.visible = override !== false && !autoPlay._enabled;
        parts.autoPlayStop.visible = override !== false && autoPlay._enabled;
      } else if (bConf === false || bConf.visible === false) {
        // Button will be hidden
        parts.autoPlayStart.visible = false;
        parts.autoPlayStop.visible = false;
      }

      // Enable/disable if specified
      if (bConf.enabled !== undefined) {
        parts.autoPlayStart.enabled = bConf.enabled;
        parts.autoPlayStop.enabled = bConf.enabled;
      }
    }
    msgBus.subscribe('UI.updateButtons', updateButton);

    function toggleStart() {
      if (!autoPlay._suspended) {
        parts.autoPlayStart.visible = false;
        parts.autoPlayStop.visible = true;
      }
    }
    msgBus.subscribe('Game.AutoPlayStart', toggleStart);
    
    function toggleStop() {
      if (!autoPlay._suspended) {
        parts.autoPlayStop.visible = false;
        parts.autoPlayStart.visible = true;
      }
    }
    msgBus.subscribe('Game.AutoPlayStop', toggleStop);


    parts.autoPlayStart.on('buttonpress', function onStartButton() {
      autoPlay._enabled = true;
    });
    parts.autoPlayStop.on('buttonpress', function onStopButton() {
      autoPlay._enabled = false;
    });

    return parts.container;
  };
});
