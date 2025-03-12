define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  var machine = require('skbJet/componentManchester/standardIW/stateMachine/machine');
  var gameData = require('skbJet/componentManchester/standardIW/gameData');
  var audio = require('skbJet/componentManchester/standardIW/audio');

  return function buttonBarComponent(parts) {
    var buttons = {
      buy: parts.buyButton,
      try: parts.tryButton,
      moveToMoney: parts.moveToMoneyButton,
      playAgain: parts.playAgainButton,
      tryAgain: parts.tryAgainButton,
      home: parts.homeButton,
      exit: parts.exitButton,
      help: parts.helpButton,
    };

    // Button overrides. Some buttons should *never* show based on env or config
    var overrides = {
      home: !SKBeInstant.isSKB(),
      exit: !SKBeInstant.isSKB(),
    };

    // Keep track of scheduled button updates so we can cancel if needed
    var timeouts = {};

    // Hide everything initially
    buttons.buy.visible = false;
    buttons.try.visible = false;
    buttons.moveToMoney.visible = false;
    buttons.playAgain.visible = false;
    buttons.tryAgain.visible = false;
    buttons.home.visible = false;
    buttons.exit.visible = false;

    function updateButtons(buttonConf) {
      Object.keys(buttonConf).forEach(function updateButton(buttonName) {
        // Skip if not a named button
        if (buttons[buttonName] === undefined) {
          return;
        }

        var bConf = buttonConf[buttonName];

        // If we're altering visibility cancel any scheduled updates to this button
        if (
          timeouts[buttonName] !== undefined &&
          (bConf.visible !== undefined || typeof bConf === 'number' || typeof bConf === 'boolean')
        ) {
          clearTimeout(timeouts[buttonName]);
          timeouts[buttonName] = undefined;
        }

        // Update button visibility
        if (bConf === true || bConf.visible === true) {
          // Button will be shown if it isn't blocked in this environment
          buttons[buttonName].visible = overrides[buttonName] !== false;
        } else if (bConf === false || bConf.visible === false) {
          // Button will be hidden
          buttons[buttonName].visible = false;
        } else if (typeof bConf === 'number') {
          // Button will be shown after the specified delay
          timeouts[buttonName] = setTimeout(function showButtonAfterDelay() {
            buttons[buttonName].visible = true;
            timeouts[buttonName] = undefined;
          }, bConf * 1000);
        }

        // Enable/disable if specified
        if (bConf.enabled !== undefined) {
          buttons[buttonName].enabled = bConf.enabled;
        }
      });
    }
    msgBus.subscribe('UI.updateButtons', updateButtons);

    // Attach event listeners

    buttons.help.on('buttonpress', function onHelpOpen() {
      msgBus.publish('UI.toggleHelp');
      if (audio.exists('click')) {
        audio.playSequential('click');
      }
    });

    buttons.home.on('buttonpress', function onHomePress() {
      if (audio.exists('click')) {
          audio.playSequential('click');
      }
      msgBus.publish('jLotteryGame.playerWantsToExit');
    });

    buttons.exit.on('buttonpress', function onExitPress() {
      if (audio.exists('click')) {
          audio.playSequential('click');
      }
      msgBus.publish('jLotteryGame.playerWantsToExit');
    });

    function onBuyPress() {
      buttons.buy.visible = false;
      buttons.try.visible = false;
      buttons.home.visible = false;
      buttons.moveToMoney.visible = false;

      if (audio.exists('buy')) {
        audio.play('buy');
      } else if (audio.exists('click')) {
        audio.play('click');
      }

      machine.next(gameData.timeoutTriggered ? 'TIMEOUT' : 'TICKET_REQUEST');
    }

    buttons.buy.on('buttonpress', onBuyPress);
    buttons.try.on('buttonpress', onBuyPress);

    function onPlayAgainPress() {
      if (audio.exists('click')) {
          audio.playSequential('click');
      }
      machine.next();
    }
    buttons.playAgain.on('buttonpress', onPlayAgainPress);
    buttons.tryAgain.on('buttonpress', onPlayAgainPress);

    function onMoveToMoneyPress() {
      if (audio.exists('click')) {
          audio.playSequential('click');
      }
      machine.next('MOVE_TO_MONEY');
    }
    buttons.moveToMoney.on('buttonpress', onMoveToMoneyPress);
  };
});
