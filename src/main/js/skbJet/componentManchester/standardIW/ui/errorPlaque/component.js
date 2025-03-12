define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var Plaque = require('skbJet/componentManchester/standardIW/components/plaque');
  var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  var gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');

  return function errorComponent(opts) {
    var errorPlaque = new Plaque([opts.background, opts.messageText, opts.exitButton, opts.timeoutExitButton, opts.timeoutContinueButton], {
      overlay: opts.overlay,
    });

    errorPlaque.name = 'errorPlaque';

    function exitGame() {
      msgBus.publish('jLotteryGame.playerWantsToExit');
    }
   
    // For WLA we need an exit button, for SKB we should hide it
    if (SKBeInstant.isSKB()) {
      opts.exitButton.parent.removeChild(opts.exitButton);
    } else {
      opts.exitButton.on('buttonpress', exitGame);

      // WLA also needs the timeout plaque functionality adding
      opts.timeoutExitButton.on('buttonpress', exitGame);
      opts.timeoutContinueButton.on('buttonpress', function() {
        errorPlaque.hide(0);
        gameFlow.next();
      });
    }

    function setTimeoutStrings(strings) {
      opts.messageText.text = strings.warningMessage;
      opts.timeoutExitButton.label.text = strings.exitButtonText;
      opts.timeoutContinueButton.label.text = strings.continueButtonText;
    }
    msgBus.subscribe('jLottery.playingSessionTimeoutWarning', setTimeoutStrings);
  
    // Attach show method to showTimeout message
    msgBus.subscribe('UI.showTimeout', function showTimeout() {
      opts.exitButton.visible = false;
      opts.timeoutExitButton.visible = true;
      opts.timeoutContinueButton.visible = true;
      errorPlaque.show();
    });
    

    // Attach show method to showHelp message
    msgBus.subscribe('UI.showError', function showError(error) {
      var errorCode = (error && error.errorCode) || 'Error: 29000';
      var errorDescriptionSpecific = error && error.errorDescriptionSpecific;
      var errorDescriptionGeneric = error && error.errorDescriptionGeneric;

      opts.messageText.text =
        errorCode +
        (errorDescriptionSpecific ? '\n\n' + errorDescriptionSpecific : '') +
        (errorDescriptionGeneric ? '\n\n' + errorDescriptionGeneric : '');

      opts.exitButton.visible = true;
      opts.timeoutExitButton.visible = false;
      opts.timeoutContinueButton.visible = false;
  
      errorPlaque.show();
    });

    return errorPlaque;
  };
});
