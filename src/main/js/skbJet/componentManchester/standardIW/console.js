define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var meterData = require('skbJet/componentManchester/standardIW/meterData');
  var resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');
  var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');

  function updateConsoleStake(value) {
    msgBus.publish('jLotteryGame.onGameControlChanged', {
      name: 'stake',
      event: 'change',
      params: [value * SKBeInstant.getDenomamount(), SKBeInstant.formatCurrency(value).formattedAmount],
    });
    msgBus.publish('jLotteryGame.onGameControlChanged', {
      name: 'price',
      event: 'change',
      params: [value, SKBeInstant.formatCurrency(value).formattedAmount],
    });
  }

  function consoleControlChanged(data) {
    if (data.option === 'price') {
      msgBus.publish('jLotteryGame.onGameControlChanged', {
        name: 'stake',
        event: 'change',
        params: [data.value * SKBeInstant.getDenomamount(), SKBeInstant.formatCurrency(data.value).formattedAmount],
      });

      meterData._ticketCost = parseInt(data.value, 10);
    }
  }

  function register() {
    msgBus.publish('jLotteryGame.registerControl', [
      {
        name: 'price',
        text: resources.i18n.MenuCommand.price,
        type: 'list',
        enabled: 0,
        valueText: meterData.ticketCosts.map(function(cost) {
          return SKBeInstant.formatCurrency(cost).formattedAmount;
        }),
        values: meterData.ticketCosts.map(function(cost) {
          return cost.toString();
        }),
        value: meterData.ticketCost,
      },
    ]);
    msgBus.publish('jLotteryGame.registerControl', [
      {
        name: 'stake',
        text: resources.i18n.MenuCommand.stake,
        type: 'stake',
        enabled: 0,
        valueText: '0',
        value: 0,
      },
    ]);

    // Ensure initial stake is set
    updateConsoleStake(meterData.ticketCost);

    // Subscribe to future updates
    msgBus.subscribe('MeterData.TicketCost', updateConsoleStake);
    msgBus.subscribe('jLotterySKB.onConsoleControlChanged', consoleControlChanged);
  }

  return {
    register: register,
  };
});
