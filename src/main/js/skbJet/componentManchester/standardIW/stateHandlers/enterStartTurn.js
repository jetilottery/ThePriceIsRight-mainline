define(function(require) {
  var machine = require('skbJet/componentManchester/standardIW/stateMachine/machine');
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

  function startRevealTurn() {
    msgBus.publish('UI.updateButtons', {
      help: { enabled: true },
    });
  }
  machine.handle(startRevealTurn, 'START_TURN', machine.SUBSTATES.ENTER);
});
