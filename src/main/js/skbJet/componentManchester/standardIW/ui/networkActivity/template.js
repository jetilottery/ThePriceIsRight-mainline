define(function(require) {
  var layoutEngine = require('skbJet/componentManchester/standardIW/layout/engine');
  var orientation = require('skbJet/componentManchester/standardIW/orientation');
  var networkActivityLayout = require('skbJet/componentManchester/standardIW/ui/networkActivity/layout');
  var networkActivityComponent = require('skbJet/componentManchester/standardIW/ui/networkActivity/component');
  var gameLayout = require('game/display/layout');


  return function networkActivityTemplate() {
    var displayList = layoutEngine.createFromTree(
      networkActivityLayout._BASE_HOW_TO_PLAY,
      null,
      [window.gameLayout, gameLayout, networkActivityLayout],
      orientation.get()
    );
  
    function updateLayout() {
      layoutEngine.update(
        networkActivityLayout._BASE_HOW_TO_PLAY,
        [window.gameLayout, gameLayout, networkActivityLayout],
        orientation.get()
      );
    }

    window.addEventListener('resize', updateLayout);


    var networkActivityAnim = networkActivityComponent({
      spinner: displayList.networkActivity,
    });

    return networkActivityAnim;
  };
});
