define(function(require) {
  var machine = require('skbJet/componentManchester/standardIW/stateMachine/machine');
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

  function enterRevealTurn() {
    msgBus.publish('UI.updateButtons', {
      help: { enabled: false },
    });
  }
  machine.handle(enterRevealTurn, 'REVEAL_TURN', machine.SUBSTATES.ENTER);
});
