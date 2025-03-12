define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  var gameData = require('skbJet/componentManchester/standardIW/gameData');
  var machine = require('skbJet/componentManchester/standardIW/stateMachine/machine');
  var dynamicText = require('skbJet/componentManchester/standardIW/layout/dynamicText');

  /**
   * @function moveToMoneyTry
   * @description State handler for MOVE_TO_MONEY wagerType TRY
   */
  function moveToMoneyTry() {
    // At this point we're changing to BUY. The gamesCompleted count is per wagerType, the first
    // game after moving counts as a buy not a reBuy, so reset the counter to 0
    SKBeInstant.config.wagerType = 'BUY';
    gameData.gamesCompleted = 0;

    // Update all dynamic text in case we've switched wager types
    dynamicText.updateManagedText();

    // jLottery will call reInitialize next
    msgBus.publish('jLotteryGame.playerWantsToMoveToMoneyGame');
  }

  // MOVE_TO_MONEY only applies to phase2 TRY
  machine.handle(moveToMoneyTry, 'MOVE_TO_MONEY', machine.SUBSTATES.MAIN, 2, 'TRY');
});
