define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  var meterData = require('skbJet/componentManchester/standardIW/meterData');

  var revealConfigurations;

  var _data = {
    _prizeStructure: null,
    _prizeTable: null,
  };

  function reducePrizesByDescription(obj, next) {
    obj[next.description] = next.prize;
    return obj;
  }

  var data = {
    get _prizeStructure() {
      return _data._prizeStructure;
    },
    set _prizeStructure(input) {
      _data._prizeStructure = input.reduce(reducePrizesByDescription, {});
      msgBus.publish('PrizeData.PrizeStructure', _data._prizeStructure);
    },
    get prizeStructure() {
      return _data._prizeStructure;
    },
    get _prizeTable() {
      return _data._prizeTable;
    },
    set _prizeTable(input) {
      _data._prizeTable = input.reduce(reducePrizesByDescription, {});
      msgBus.publish('PrizeData.PrizeTable', _data._prizeTable);
    },
    get prizeTable() {
      return _data._prizeTable;
    },
  };


  function onTicketCostChange() {
    revealConfigurations = SKBeInstant.config.gameConfigurationDetails.revealConfigurations;

    if (revealConfigurations.length > 0) {
      data._prizeTable = revealConfigurations[meterData.ticketCostIndex].prizeTable;
      data._prizeStructure = revealConfigurations[meterData.ticketCostIndex].prizeStructure;
    }
  }
  msgBus.subscribe('MeterData.TicketCost', onTicketCostChange);

  function onStartUserInteraction(ticketData) {
    data._prizeTable = ticketData.prizeTable;
  }
  msgBus.subscribe('jLottery.startUserInteraction', onStartUserInteraction);


  return data;
});
