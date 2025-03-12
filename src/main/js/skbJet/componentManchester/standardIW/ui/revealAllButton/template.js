define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var layoutEngine = require('skbJet/componentManchester/standardIW/layout/engine');
  var orientation = require('skbJet/componentManchester/standardIW/orientation');
  var revealAllButtonLayout = require('skbJet/componentManchester/standardIW/ui/revealAllButton/layout');
  var revealAllButtonComponent = require('skbJet/componentManchester/standardIW/ui/revealAllButton/component');
  var audio = require('skbJet/componentManchester/standardIW/audio');
  var gameLayout = require('game/display/layout');

  return function revealAllButtonTemplate() {
    var displayList = layoutEngine.createFromTree(
      revealAllButtonLayout._BASE_REVEAL_ALL_BUTTON,
      null,
      [window.gameLayout, gameLayout, revealAllButtonLayout],
      orientation.get()
    );

    function updateLayout() {
      layoutEngine.update(
        revealAllButtonLayout._BASE_REVEAL_ALL_BUTTON,
        [window.gameLayout, gameLayout, revealAllButtonLayout],
        orientation.get()
      );
    }

    window.addEventListener('resize', updateLayout);


    displayList.revealAllButton = revealAllButtonComponent(displayList.revealAllButton);

    if (audio.exists('click')) {
      displayList.revealAllButton.on('buttonpress', function playClickSound() {
        audio.play('click');
      });
    }

    if (audio.exists('revealAll')) {
      msgBus.subscribe('Game.AutoPlayStart', function playRevealAllSound() {
        audio.play('revealAll');
      });
    }

    return displayList.revealAllButton;
  };
});
