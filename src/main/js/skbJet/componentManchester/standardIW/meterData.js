define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  var machine = require('skbJet/componentManchester/standardIW/stateMachine/machine');

  // Private data store
  var _data = {
    _ticketCost: 0,
    _ticketCosts: [],
    _balance: 0,
    _win: 0,
    _totalWin: 0,
  };

  // Publicly exposed properties
  var data = {
    get _ticketCost() {
      return _data._ticketCost;
    },
    set _ticketCost(val) {
      _data._ticketCost = val;
      msgBus.publish('MeterData.TicketCost', val);
    },
    get win() {
      return _data._win;
    },
    set win(val) {
      // If win exceeds totalWin something is wrong, go to ERROR
      if (val > _data._totalWin) {
        machine.next('ERROR');
        return;
      }
      _data._win = val;
      msgBus.publish('MeterData.Win', val);
    },
    get ticketCost() {
      return _data._ticketCost;
    },
    get ticketCosts() {
      return _data._ticketCosts;
    },
    get ticketCostIndex() {
      return _data._ticketCosts.indexOf(_data._ticketCost);
    },
    get maxTicketCost() {
      return _data._ticketCosts[_data._ticketCosts.length - 1];
    },
    get minTicketCost() {
      return _data._ticketCosts[0];
    },
    get balance() {
      return _data._balance;
    },
    get totalWin() {
      return _data._totalWin;
    },

    init: function initMeterData() {
      var gameConfig = SKBeInstant.config.gameConfigurationDetails;

      _data._ticketCosts = gameConfig.availablePrices;
      data._ticketCost = _data._nextTicketCost || gameConfig.pricePointGameDefault;
      _data._nextTicketCost = undefined;
    },

    setTicket: function setTicketData(ticketData) {
      // if meterData is already initted we have the ticket cost array and can select a new price
      if (_data._ticketCosts.length > 0) {
        data._ticketCost = ticketData.price;
      } else {
        // otherwise we aren't ready to set the price, so save it until we're ready to init
        _data._nextTicketCost = ticketData.price;
      }
      // totalWin is private, only a getter is exposed. It can *only* be set from here
      _data._totalWin = ticketData.prizeValue;
    },
  };

  function updateBalance(input) {
    if (SKBeInstant.isSKB()) {
      _data._balance = parseFloat(input.balance) / SKBeInstant.getDenomamount();
    } else {
      _data._balance = input.balanceInCents;
    }
    msgBus.publish('MeterData.Balance', _data._balance);
  }
  msgBus.subscribe('jLottery.updateBalance', updateBalance);

  // 'jLottery.updateBalance' isn't published until after the game is displayed for some reason, so
  // subscribe to the initial platform balance message for SKB at least.
  function setInitialBalance(input) {
    _data._balance = parseFloat(input.balanceValue) / SKBeInstant.getDenomamount();
    msgBus.unsubscribe('platformMsg/ClientService/Account.Balances', setInitialBalance);
  }
  msgBus.subscribe('platformMsg/ClientService/Account.Balances', setInitialBalance);

  return data;
});
