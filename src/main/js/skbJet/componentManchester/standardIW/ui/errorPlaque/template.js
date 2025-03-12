define(function(require) {
  var layoutEngine = require('skbJet/componentManchester/standardIW/layout/engine');
  var orientation = require('skbJet/componentManchester/standardIW/orientation');
  var errorLayout = require('skbJet/componentManchester/standardIW/ui/errorPlaque/layout');
  var errorComponent = require('skbJet/componentManchester/standardIW/ui/errorPlaque/component');
  var gameLayout = require('game/display/layout');


  return function errorTemplate() {
    var displayList = layoutEngine.createFromTree(
      errorLayout._BASE_ERROR_PLAQUE,
      null,
      [window.gameLayout, gameLayout, errorLayout],
      orientation.get()
    );

    function updateLayout() {
      layoutEngine.update(
        errorLayout._BASE_ERROR_PLAQUE,
        [window.gameLayout, gameLayout, errorLayout],
        orientation.get()
      );
    }

    window.addEventListener('resize', updateLayout);


    var errorPlaque = errorComponent({
      background: displayList.errorBackground,
      messageText: displayList.errorMessage,
      exitButton: displayList.errorExit,
      timeoutExitButton: displayList.timeoutExit,
      timeoutContinueButton: displayList.timeoutContinue,
      overlay: displayList.errorOverlay
    });
    

    displayList.errorContainer.addChild(errorPlaque);

    return displayList.errorContainer;
  };
});
