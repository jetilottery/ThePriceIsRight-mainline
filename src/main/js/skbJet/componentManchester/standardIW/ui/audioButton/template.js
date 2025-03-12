define(function(require) {
  var layoutEngine = require('skbJet/componentManchester/standardIW/layout/engine');
  var orientation = require('skbJet/componentManchester/standardIW/orientation');
  var audioButtonLayout = require('skbJet/componentManchester/standardIW/ui/audioButton/layout');
  var audioButtonComponent = require('skbJet/componentManchester/standardIW/ui/audioButton/component');
  var gameLayout = require('game/display/layout');
  var audio = require('skbJet/componentManchester/standardIW/audio');


  return function audioButtonTemplate() {
    var displayList = layoutEngine.createFromTree(
      audioButtonLayout._BASE_AUDIO_BUTTON,
      null,
      [window.gameLayout, gameLayout, audioButtonLayout],
      orientation.get()
    );


    function updateLayout() {
      layoutEngine.update(
        audioButtonLayout._BASE_AUDIO_BUTTON,
        [window.gameLayout, gameLayout, audioButtonLayout],
        orientation.get()
      );
    }

    window.addEventListener('resize', updateLayout);


    displayList.audioButton = audioButtonComponent({
      audioOn: displayList.audio_on_btn,
      audioOff: displayList.audio_off_btn,
    });

    function playClickSound() {
      audio.play('click');
    }
    
    if (audio.exists('click')) {
      displayList.audio_off_btn.on('buttonpress', playClickSound);
    }

    return displayList.audioButton;
  };
});
