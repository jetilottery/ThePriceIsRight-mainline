define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

  var _data = {
    _enabled: false,
    _suspended: false,
  };

  var data = {
    get _enabled() {
      return _data._enabled;
    },
    set _enabled(val) {
      if (val && !_data._enabled) {
        _data._enabled = true;
        if (!_data._suspended) {
          msgBus.publish('Game.AutoPlayStart');
        }
      } else if (!val && _data._enabled) {
        _data._enabled = false;
        if (!_data._suspended) {
          msgBus.publish('Game.AutoPlayStop');
        }
      }
    },
    get _suspended() {
      return _data._suspended;
    },
    set _suspended(val) {
      if (val && !_data._suspended) {
        _data._suspended = true;
        if (_data._enabled) {
          msgBus.publish('Game.AutoPlayStop');
        }
      } else if (!val && _data._suspended) {
        _data._suspended = false;
        if (_data._enabled) {
          msgBus.publish('Game.AutoPlayStart');
        }
      }
    },
    get enabled() {
      return _data._enabled && !_data._suspended;
    },
  };

  return data;
});
