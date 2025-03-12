define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

  var _data = {
    _gamesCompleted: 0,
    _timeoutTriggered: false,
  };

  function setTimeoutTriggered() {
    _data._timeoutTriggered = true;
  }
  msgBus.subscribe('jLottery.playingSessionTimeoutWarning', setTimeoutTriggered);

  function resetTimeoutTriggered() {
    _data._timeoutTriggered = false;
  }
  msgBus.subscribe('UI.showTimeout', resetTimeoutTriggered);

  return {
    get gamesCompleted() {
      return _data._gamesCompleted;
    },
    set gamesCompleted(val) {
      _data._gamesCompleted = val;
    },
    get timeoutTriggered() {
      return _data._gamesCompleted > 0 && _data._timeoutTriggered;
    },
  };
});
