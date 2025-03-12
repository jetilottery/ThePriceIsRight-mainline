define(function(require) {
    var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    var machine = require('skbJet/componentManchester/standardIW/stateMachine/machine');
    var autoplay = require('skbJet/componentManchester/standardIW/autoPlay');

    function error(e) {
        // stop network activity timer
        msgBus.publish('UI.endNetworkActivity');

        // Hide all other UI
        msgBus.publish('UI.updateButtons', {
            buy: false,
            try: false,
            playAgain: false,
            tryAgain: false,
            moveToMoney: false,
            help: false,
            home: false,
            exit: false,
            autoPlay: false,
            ticketSelect: false,
        });

        // disable autoPlay;
        autoplay._enabled = false;

        // Reset win meter
        msgBus.publish('MeterData.Win', SKBeInstant.config.defaultWinsValue);

        // Trigger error screen
        msgBus.publish('UI.showError', e);
    }

    machine.handle(error, 'ERROR', machine.SUBSTATES.ENTER);
});
