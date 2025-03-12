define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var machine = require('skbJet/componentManchester/standardIW/stateMachine/machine');
 
  function timeout() {
    msgBus.publish('UI.hideTicketSelect');

    // Disable help button, hide ticket select
    msgBus.publish('UI.updateButtons', {
      help: { enabled: false },
      ticketSelect: false,
    });

    // Trigger error screen
    msgBus.publish('UI.showTimeout');
  }

  machine.handle(timeout, 'TIMEOUT', machine.SUBSTATES.MAIN);
});
