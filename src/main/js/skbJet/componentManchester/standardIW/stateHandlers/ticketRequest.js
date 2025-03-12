define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var machine = require('skbJet/componentManchester/standardIW/stateMachine/machine');
  var meterData = require('skbJet/componentManchester/standardIW/meterData');
  var gameData = require('skbJet/componentManchester/standardIW/gameData');

  function ticketRequest() {
    msgBus.publish('UI.startNetworkActivity', 0);

    // Disable help button, hide ticket select
    msgBus.publish('UI.updateButtons', {
      help: { enabled: false },
      ticketSelect: false,
    });


    msgBus.publish('toPlatform', {
      channel: 'Game',
      topic: 'Game.Control',
      data: { name: 'price', event: 'enable', params: [0] },
    });

    msgBus.publish('toPlatform', {
      channel: 'Game',
      topic: 'Game.Control',
      data: { name: 'howToPlay', event: 'enable', params: [0] },
    });
    msgBus.publish('toPlatform', {
      channel: 'Game',
      topic: 'Game.Control',
      data: { name: 'paytable', event: 'enable', params: [0] },
    });

    // Presumably we should be doing this, but it causes balance to display as NaN
    // msgBus.publish('toPlatform', {
    //   channel: 'Game',
    //   topic: 'Game.DeductStake',
    //   data: meterData.ticketCost * SKBeInstant.getDenomamount(),
    // });

    if (gameData.gamesCompleted === 0) {
      msgBus.publish('jLotteryGame.playerWantsToPlay', { price: meterData.ticketCost });
    } else {
      msgBus.publish('jLotteryGame.playerWantsToRePlay', { price: meterData.ticketCost });
    }
  }
  machine.handle(ticketRequest, 'TICKET_REQUEST', machine.SUBSTATES.MAIN);
});
