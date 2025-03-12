define(function(require) {
  var PIXI = require('com/pixijs/pixi');
  var layoutEngine = require('skbJet/componentManchester/standardIW/layout/engine');
  var orientation = require('skbJet/componentManchester/standardIW/orientation');
  var gameLayoutFile = require('game/display/layout');

  var gameContainer = new PIXI.Container();
  gameContainer.name = 'GameContainer';

  function init() {
    if (gameLayoutFile._BASE_APP) {
      // if _BASE_APP is in the display list that's the root node (stage) and we can recurse through
      // the child nodes to create a display tree
      layoutEngine.createFromTree(
        gameLayoutFile._BASE_APP,
        gameContainer,
        [window.gameLayout, gameLayoutFile],
        orientation.get()
      );
    } else {
      // otherwise no explicit root node so we have a flat list to iterate over, adding each node to
      // it's parent
      layoutEngine.createFromList(
        '_BASE_APP',
        gameContainer,
        [window.gameLayout, gameLayoutFile],
        orientation.get()
      );
    }
  }

  return {
    container: gameContainer,
    init: init,
  };
});
