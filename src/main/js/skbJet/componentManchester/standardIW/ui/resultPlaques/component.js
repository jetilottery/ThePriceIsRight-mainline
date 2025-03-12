define(function(require) {
  var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var Plaque = require('skbJet/componentManchester/standardIW/components/plaque');
  var meterData = require('skbJet/componentManchester/standardIW/meterData');

  return function resultPlaquesComponent(opts) {
    var winPlaque = new Plaque(
      [opts.win.background, opts.win.message, opts.win.value, opts.win.closeButton],
      {
        name: 'winPlaque',
        overlay: opts.overlay,
      }
    );

    var losePlaque = new Plaque([opts.lose.background, opts.lose.message, opts.lose.closeButton], {
      name: 'losePlaque',
      overlay: opts.overlay,
    });


    // Attach show method to showResult message
    msgBus.subscribe('UI.showResult', function showResult() {
      if (meterData.totalWin > 0) {
        opts.win.value.text = SKBeInstant.formatCurrency(meterData.totalWin).formattedAmount;
        winPlaque.show();
      } else {
        losePlaque.show();
      }
    });

    function hideResult() {
      opts.win.value.text = '';
      winPlaque.hide(0);
      losePlaque.hide(0);
    }

    // Attach hide method to hideResult message
    msgBus.subscribe('UI.hideResult', hideResult);

    // Attach hide method to close button press event
    opts.win.closeButton.on('buttonpress', hideResult);
    opts.lose.closeButton.on('buttonpress', hideResult);
    
    return [winPlaque, losePlaque];
  };
});
