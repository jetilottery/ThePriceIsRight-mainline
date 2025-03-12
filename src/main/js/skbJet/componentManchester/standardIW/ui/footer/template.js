define(function(require) {
  var layoutEngine = require('skbJet/componentManchester/standardIW/layout/engine');
  var orientation = require('skbJet/componentManchester/standardIW/orientation');
  var footerLayout = require('skbJet/componentManchester/standardIW/ui/footer/layout');
  var footerComponent = require('skbJet/componentManchester/standardIW/ui/footer/component');
  var gameLayout = require('game/display/layout');

  return function howToPlayTemplate() {
    var displayList = layoutEngine.createFromTree(
      footerLayout._BASE_FOOTER,
      null,
      [window.gameLayout, gameLayout, footerLayout],
      orientation.get()
    );

    function updateLayout() {
      layoutEngine.update(
        footerLayout._BASE_FOOTER,
        [window.gameLayout, gameLayout, footerLayout],
        orientation.get()
      );
    }

    window.addEventListener('resize', updateLayout);

    footerComponent({
      balance: [displayList.balanceMeter, displayList.balanceLabel, displayList.balanceValue],
      ticketCost: [displayList.ticketCostMeter, displayList.ticketCostLabel, displayList.ticketCostValue],
      win: [displayList.winMeter, displayList.winLabel, displayList.winValue]
    }, {
      three: [displayList.meter_2_3, displayList.meter_3_3],
      two: [displayList.meter_1_2, displayList.meter_2_2],
    }, {
      three: [displayList.divider_1_3, displayList.divider_2_3],
      two: [displayList.divider_1_2],
    });

    displayList.footerContainer;

    return displayList.footerContainer;
  };
});
