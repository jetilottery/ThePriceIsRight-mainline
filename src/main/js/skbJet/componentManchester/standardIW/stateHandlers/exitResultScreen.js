define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var machine = require('skbJet/componentManchester/standardIW/stateMachine/machine');

  /**
   * @function exitResultScreen
   * @description State handler for ENTER_RESULT_SCREEN
   */
  function enterResultScreen() {
    msgBus.publish('UI.hideResult');
  }
  machine.handle(enterResultScreen, 'RESULT_SCREEN', machine.SUBSTATES.EXIT);
});
