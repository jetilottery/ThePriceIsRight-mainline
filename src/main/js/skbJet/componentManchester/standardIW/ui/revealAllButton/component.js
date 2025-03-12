define(function(require) {
  var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');

  return function revealAllButtonComponent(button) {
    button.visible = false;

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
        button.visible = override !== false;
      } else if (bConf === false || bConf.visible === false) {
        // Button will be hidden
        button.visible = false;
      }

      // Enable/disable if specified
      if (bConf.enabled !== undefined) {
        button.enabled = bConf.enabled;
      }
    }
    msgBus.subscribe('UI.updateButtons', updateButton);

    function toggleStart() {
      if (!autoPlay._suspended) {
        button.enabled = false;
      }
    }
    msgBus.subscribe('Game.AutoPlayStart', toggleStart);


    button.on('buttonpress', function onStartButton() {
      autoPlay._enabled = true;
      msgBus.publish('UI.updateButtons', {
        help: { enabled: false },
      });
    });

    return button;
  };
});
