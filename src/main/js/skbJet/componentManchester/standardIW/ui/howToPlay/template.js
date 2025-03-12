define(function(require) {
  var layoutEngine = require('skbJet/componentManchester/standardIW/layout/engine');
  var orientation = require('skbJet/componentManchester/standardIW/orientation');
  var howToPlayLayout = require('skbJet/componentManchester/standardIW/ui/howToPlay/layout');
  var audioButton = require('skbJet/componentManchester/standardIW/ui/audioButton/template');
  var howToPlayComponent = require('skbJet/componentManchester/standardIW/ui/howToPlay/component');
  var audio = require('skbJet/componentManchester/standardIW/audio');
  var gameLayout = require('game/display/layout');

  return function howToPlayTemplate() {
    var displayList = layoutEngine.createFromTree(
      howToPlayLayout._BASE_HOW_TO_PLAY,
      null,
      [window.gameLayout, gameLayout, howToPlayLayout],
      orientation.get()
    );

    function updateLayout() {
      layoutEngine.update(
        howToPlayLayout._BASE_HOW_TO_PLAY,
        [window.gameLayout, gameLayout, howToPlayLayout],
        orientation.get()
      );
    }

    window.addEventListener('resize', updateLayout);


    audioButton = audioButton();
    displayList.audioButtonContainer.addChild(audioButton);

    var howToPlayPlaque = howToPlayComponent({
      background: displayList.howToPlayBackground,
      pageContainer: displayList.howToPlayPages,
      versionText: displayList.versionText,
      title: displayList.howToPlayTitle,
      nextButton: displayList.howToPlayNext,
      previousButton: displayList.howToPlayPrevious,
      audioButton: displayList.audioButtonContainer,
      closeButton: displayList.howToPlayClose,
      overlay: displayList.howToPlayOverlay,
      indicatorContainer: displayList.howToPlayIndicators,
      indicatorActive: displayList.howToPlayIndicatorActive,
      indicatorInactive: displayList.howToPlayIndicatorInactive,
    });

    function playClickSound() {
      audio.play('click');
    }

    if (audio.exists('click')) {
      displayList.howToPlayClose.on('buttonpress', playClickSound);
      if (displayList.howToPlayNext) {
        displayList.howToPlayNext.on('buttonpress', playClickSound);
      }
      if (displayList.howToPlayPrevious) {
        displayList.howToPlayPrevious.on('buttonpress', playClickSound);
      }
    }

    displayList.howToPlayContainer.addChild(howToPlayPlaque);

    return displayList.howToPlayContainer;
  };
});
