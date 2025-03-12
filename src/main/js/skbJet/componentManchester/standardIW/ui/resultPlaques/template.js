define(function(require) {
  var layoutEngine = require('skbJet/componentManchester/standardIW/layout/engine');
  var orientation = require('skbJet/componentManchester/standardIW/orientation');
  var resultPlaquesLayout = require('skbJet/componentManchester/standardIW/ui/resultPlaques/layout');
  var resultPlaquesComponent = require('skbJet/componentManchester/standardIW/ui/resultPlaques/component');
  var gameLayout = require('game/display/layout');
  var audio = require('skbJet/componentManchester/standardIW/audio');

  return function resultPlaquesTemplate() {
    var displayList = layoutEngine.createFromTree(
      resultPlaquesLayout._BASE_RESULT_PLAQUES,
      null,
      [window.gameLayout, gameLayout, resultPlaquesLayout],
      orientation.get()
    );

    function updateLayout() {
      layoutEngine.update(
        resultPlaquesLayout._BASE_RESULT_PLAQUES,
        [window.gameLayout, gameLayout, resultPlaquesLayout],
        orientation.get()
      );
    }

    window.addEventListener('resize', updateLayout);


    var resultPlaques = resultPlaquesComponent({
      win: {
        background: displayList.winPlaqueBG,
        message: displayList.winPlaqueMessage,
        value: displayList.winPlaqueValue,
        closeButton: displayList.winPlaqueCloseButton,
      },
      lose: {
        background: displayList.losePlaqueBG,
        message: displayList.losePlaqueMessage,
        closeButton: displayList.losePlaqueCloseButton,
      },
      overlay: displayList.resultPlaqueOverlay,
    });

    function playClickSound() {
      audio.play('click');
    }

    if (audio.exists('click')) {
      displayList.winPlaqueCloseButton.on('buttonpress', playClickSound);
      displayList.losePlaqueCloseButton.on('buttonpress', playClickSound);
    }

    displayList.resultPlaquesContainer.addChild.apply(displayList.resultPlaquesContainer, resultPlaques);

    return displayList.resultPlaquesContainer;
  };
});
