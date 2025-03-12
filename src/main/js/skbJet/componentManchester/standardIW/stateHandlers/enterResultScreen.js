define(function(require) {
  var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var machine = require('skbJet/componentManchester/standardIW/stateMachine/machine');
  var gameData = require('skbJet/componentManchester/standardIW/gameData');

  function enableHelpPaytable() {
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
  }

  /**
   * @function enterResultScreen1
   * @description State handler for ENTER_RESULT_SCREEN PHASE1
   */
  function enterResultScreen1() {
    msgBus.publish('UI.updateButtons', {
      home: true,
      help: { enabled: true },
      exit: true,
    });
    msgBus.publish('UI.showResult');
    enableHelpPaytable();
  }
  machine.handle(enterResultScreen1, 'RESULT_SCREEN', machine.SUBSTATES.ENTER, 1);

  /**
   * @function enterResultScreen2
   * @description Generic handler for ENTER-RESULT_SCREEN phase 2
   */
  function enterResultScreen2() {
    // Enable help/paytable buttons in the console
    enableHelpPaytable();
    msgBus.publish('UI.showResult');
  }

  /**
   * @function enterResultScreen2Buy
   * @description State handler for ENTER-RESULT_SCREEN phase 2 wagerType BUY
   */
  function enterResultScreen2Buy() {
    // Entering the result screen counts as completing the game, so increment the count
    gameData.gamesCompleted += 1;

    // Show end game UI buttons, playAgain is subject to a delay
    msgBus.publish('UI.updateButtons', {
      home: true,
      help: { enabled: true },
      playAgain: SKBeInstant.config.compulsionDelayInSeconds,
    });
    
    enterResultScreen2();
  }
  machine.handle(enterResultScreen2Buy, 'RESULT_SCREEN', machine.SUBSTATES.ENTER, 2, 'BUY');

  /**
   * @function enterResultScreen2Try
   * @description State handler for ENTER-RESULT_SCREEN phase 2 wagerType TRY
   */
  function enterResultScreen2Try() {
    // Entering the result screen counts as completing the game, so increment the count
    gameData.gamesCompleted += 1;

    // MoveToMoney UI can be shown if the minimum number of demo games have now been played. If min
    // demos is configured as -1 the MoveToMoney UI is never shown.
    var showM2M =
      gameData.gamesCompleted >= SKBeInstant.config.demosB4Move2MoneyButton &&
      SKBeInstant.config.demosB4Move2MoneyButton > -1;

    // Show end game UI buttons, playAgain and moveToMoney are subject to compulsion delay.
    // Use tryAgain if moveToMoney is active, otherwise use playAgain (with BUY/TRY text variation)
    msgBus.publish('UI.updateButtons', {
      home: true,
      help: { enabled: true },
      moveToMoney: showM2M && SKBeInstant.config.compulsionDelayInSeconds,
      tryAgain: showM2M && SKBeInstant.config.compulsionDelayInSeconds,
      playAgain: !showM2M && SKBeInstant.config.compulsionDelayInSeconds,
    });
    // Continue to generic handler for common ENTER-RESULT_SCREEN phase 2 functionality
    enterResultScreen2();
  }
  machine.handle(enterResultScreen2Try, 'RESULT_SCREEN', machine.SUBSTATES.ENTER, 2, 'TRY');
});
