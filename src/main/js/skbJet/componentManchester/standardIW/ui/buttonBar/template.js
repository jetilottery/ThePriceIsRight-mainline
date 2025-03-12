define(function(require) {
  var layoutEngine = require('skbJet/componentManchester/standardIW/layout/engine');
  var orientation = require('skbJet/componentManchester/standardIW/orientation');
  var buttonBarLayout = require('skbJet/componentManchester/standardIW/ui/buttonBar/layout');
  var buttonBarComponent = require('skbJet/componentManchester/standardIW/ui/buttonBar/component');
  var gameLayout = require('game/display/layout');

  return function buttonBarTemplate() {
    var displayList = layoutEngine.createFromTree(
      buttonBarLayout._BASE_PANEL,
      null,
      [window.gameLayout, gameLayout, buttonBarLayout],
      orientation.get()
    );


    function updateLayout() {
      layoutEngine.update(
        buttonBarLayout._BASE_PANEL,
        [window.gameLayout, gameLayout, buttonBarLayout],
        orientation.get()
      );
    }

    window.addEventListener('resize', updateLayout);


    buttonBarComponent({
      background: displayList.buttonBar,
      helpButton: displayList.helpButton,
      buyButton: displayList.buyButton,
      tryButton: displayList.tryButton,
      playAgainButton: displayList.playAgainButton,
      tryAgainButton: displayList.tryAgainButton,
      moveToMoneyButton: displayList.moveToMoneyButton,
      homeButton: displayList.homeButton,
      exitButton: displayList.exitButton,
    });

    return displayList.buttonBar;
  };
});
