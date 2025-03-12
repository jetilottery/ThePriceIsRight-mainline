define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var layoutEngine = require('skbJet/componentManchester/standardIW/layout/engine');
  var orientation = require('skbJet/componentManchester/standardIW/orientation');
  var autoPlayButtonLayout = require('skbJet/componentManchester/standardIW/ui/autoPlayButton/layout');
  var autoPlayButtonComponent = require('skbJet/componentManchester/standardIW/ui/autoPlayButton/component');
  var audio = require('skbJet/componentManchester/standardIW/audio');
  var gameLayout = require('game/display/layout');


  return function autoPlayButtonTemplate() {
    var displayList = layoutEngine.createFromTree(
      autoPlayButtonLayout._BASE_AUTOPLAY_BUTTON,
      null,
      [window.gameLayout, gameLayout, autoPlayButtonLayout],
      orientation.get()
    );

    function updateLayout() {
      layoutEngine.update(
        autoPlayButtonLayout._BASE_AUTOPLAY_BUTTON,
        [window.gameLayout, gameLayout, autoPlayButtonLayout],
        orientation.get()
      );
    }

    window.addEventListener('resize', updateLayout);


    displayList.autoPlayButton = autoPlayButtonComponent({
      container: displayList.autoPlayButton,
      autoPlayStart: displayList.autoPlayStartButton,
      autoPlayStop: displayList.autoPlayStopButton,
    });

    function playClickSound() {
      audio.play('click');
    }
    
    if (audio.exists('click')) {
      displayList.autoPlayStartButton.on('buttonpress', playClickSound);
      displayList.autoPlayStopButton.on('buttonpress', playClickSound);
    }

    if (audio.exists('revealAll')) {
      msgBus.subscribe('Game.AutoPlayStart', function playRevealAllSound() {
        audio.play('revealAll');
      });
    }

    return displayList.autoPlayButton;
  };
});
