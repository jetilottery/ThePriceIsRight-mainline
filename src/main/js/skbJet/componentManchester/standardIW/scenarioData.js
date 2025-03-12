define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

  var scenarioString;
  var transform;
  var turnCount = -1;
  var turnData;
  var data;

  function nextTurn(input) {
    turnCount += 1;

    // Scenario data is a simple array (eg bingo)
    if (Array.isArray(data)) {
      turnData = data[turnCount];
    }
    // Complex scenario data with a custom `next` function
    if (typeof data.next === 'function') {
      turnData = data.next(turnCount, input);
    }
    // Complex scenario data without a next function, but exposes a `turns` array
    if (Array.isArray(data.turns)) {
      turnData = data.turns[turnCount];
    }
  }

  function registerTransform(transformFunction) {
    transform = transformFunction;

    if (scenarioString) {
      data = transform(scenarioString);
      nextTurn();
    }
  }

  function startUserInteraction(ticketData) {
    scenarioString = ticketData.scenario;
    turnCount = -1;

    if (transform) {
      data = transform(scenarioString);
      nextTurn();
    }
  }
  msgBus.subscribe('jLottery.startUserInteraction', startUserInteraction);
  msgBus.subscribe('jLottery.reStartUserInteraction', startUserInteraction);

  return {
    get scenario() {
      return data;
    },
    get turn() {
      return turnData;
    },
    registerTransform: registerTransform,
    nextTurn: nextTurn,
  };
});
