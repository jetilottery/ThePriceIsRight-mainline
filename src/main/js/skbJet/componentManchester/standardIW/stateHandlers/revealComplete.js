define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var machine = require('skbJet/componentManchester/standardIW/stateMachine/machine');
  var autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
  var meterData = require('skbJet/componentManchester/standardIW/meterData');

  function revealComplete() {
    // disable autoplay
    autoPlay._enabled = false;

    // hide autoplay button, disable help button
    msgBus.publish('UI.updateButtons', {
      autoPlay: false,
      help: { enabled: false },
    });

    // 29000 check
    if (meterData.win !== meterData.totalWin) {
      machine.next('ERROR');
      return;
    }

    // start network activity timer
    msgBus.publish('UI.startNetworkActivity');

    // notify server the ticket is complete
    msgBus.publish('jLotteryGame.ticketResultHasBeenSeen');
  }
  machine.handle(revealComplete, 'REVEAL_COMPLETE', machine.SUBSTATES.MAIN);
});
