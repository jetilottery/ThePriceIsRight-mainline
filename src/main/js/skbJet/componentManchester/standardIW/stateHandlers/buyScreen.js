define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  var machine = require('skbJet/componentManchester/standardIW/stateMachine/machine');
  var gameData = require('skbJet/componentManchester/standardIW/gameData');
  var meterData = require('skbJet/componentManchester/standardIW/meterData');

  /**
   * @function buyScreen
   * @description Generic handler for common BUY_SCREEN functionality
   */
  function buyScreen() {
    msgBus.publish('UI.endNetworkActivity');

    msgBus.publish('UI.updateButtons', {
      ticketSelect: true,
      help: { enabled: true },
    });

    // Enable console price control and help/paytable buttons
    msgBus.publish('toPlatform', {
      channel: 'Game',
      topic: 'Game.Control',
      data: { name: 'price', event: 'enable', params: [1] },
    });
    msgBus.publish('toPlatform', {
      channel: 'Game',
      topic: 'Game.Control',
      data: { name: 'howToPlay', event: 'enable', params: [1] },
    });
    msgBus.publish('toPlatform', {
      channel: 'Game',
      topic: 'Game.Control',
      data: { name: 'paytable', event: 'enable', params: [1] },
    });


    // Reset win amount to 0 and set the meter to the default
    meterData.win = 0;
    // Game type must be normal now we're back at BUY_SCREEN
    SKBeInstant.config.gameType = 'normal';
    // Set win meter to default value
    msgBus.publish('MeterData.Win', SKBeInstant.config.defaultWinsValue);
  }

  /**
   * @function buyScreenBuy
   * @description State handler for BUY_SCREEN wagerType BUY
   */
  function buyScreenBuy() {
    // Enable game ticket purchase UI
    msgBus.publish('UI.updateButtons', {
      buy: true,
      try: false,
      playAgain: false,
      tryAgain: false,
      moveToMoney: false,
      home: true,
    });

    // Continue to generic handler for common BUY_SCREEN functionality
    buyScreen();
  }
  machine.handle(buyScreenBuy, 'BUY_SCREEN', machine.SUBSTATES.MAIN, null, 'BUY');

  /**
   * @function buyScreenTry
   * @description State handler for BUY_SCREEN wagerType TRY
   */
  function buyScreenTry() {
    // MoveToMoney UI can be shown if the minimum number of demo games have been played. If min
    // demos is configured as -1 the MoveToMoney UI is never shown.
    var showM2M =
      gameData.gamesCompleted >= SKBeInstant.config.demosB4Move2MoneyButton &&
      SKBeInstant.config.demosB4Move2MoneyButton > -1;

    // Enable game ticket purchase UI.
    // Use TRY if moveToMoney is active, otherwise use BUY (with BUY/TRY text variation)
    msgBus.publish('UI.updateButtons', {
      buy: !showM2M,
      try: showM2M,
      moveToMoney: showM2M,
      playAgain: false,
      tryAgain: false,
      home: true,
    });

    // Continue to generic handler for common BUY_SCREEN functionality
    buyScreen();
  }
  machine.handle(buyScreenTry, 'BUY_SCREEN', machine.SUBSTATES.MAIN, null, 'TRY');
});
