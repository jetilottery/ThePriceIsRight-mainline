define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var audioController = require('skbJet/componentManchester/standardIW/audio');
  var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  var PIXI = require('com/pixijs/pixi');

  return function panelComponent(parts) {
    var container = new PIXI.Container();
    container.name = 'audioButton';

    container.addChild(parts.audioOn, parts.audioOff);

    
    function toggleOn() {
      parts.audioOn.visible = true;
      parts.audioOff.visible = false;
    }
    msgBus.subscribe('Game.AudioOn', toggleOn);
    
    function toggleOff() {
      parts.audioOff.visible = true;
      parts.audioOn.visible = false;
    }
    msgBus.subscribe('Game.AudioOff', toggleOff);

    if (SKBeInstant.config.soundStartDisabled) {
      toggleOff();
    } else {
      toggleOn();
    }

    parts.audioOn.on('buttonpress', function onHelpOpen() {
      audioController.disable();
    });
    parts.audioOff.on('buttonpress', function onHelpOpen() {
      audioController.enable();
    });

    return container;
  };
});
