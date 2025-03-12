define(function(require) {
  var machine = require('skbJet/componentManchester/standardIW/stateMachine/machine');
  var scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
  var autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');

  function endTurn() {
    scenarioData.nextTurn();

    if (scenarioData.turn !== undefined) {
      if (autoPlay.enabled) {
        machine.next('REVEAL_TURN');
      } else {
        machine.next('START_TURN');
      }
    } else {
      machine.next('END_REVEAL');
    }
  }
  machine.handle(endTurn, 'END_TURN', machine.SUBSTATES.MAIN);
});
