define(function(require) {
  var PIXI = require('com/pixijs/pixi');
  var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var orientation = require('skbJet/componentManchester/standardIW/orientation');
  var meterData = require('skbJet/componentManchester/standardIW/meterData');
  var dynamicText = require('skbJet/componentManchester/standardIW/layout/dynamicText');

  var background;
  var container = new PIXI.Container();

  var balanceMeter = new PIXI.Container();
  var ticketCostMeter = new PIXI.Container();
  var winMeter = new PIXI.Container();

  var balanceLabel = new PIXI.Text();
  var ticketCostLabel = new PIXI.Text();
  var winLabel = new PIXI.Text();

  var balanceValue = new PIXI.Text();
  var ticketCostValue = new PIXI.Text();
  var winValue = new PIXI.Text();

  balanceMeter.addChild(balanceLabel, balanceValue);
  ticketCostMeter.addChild(ticketCostLabel, ticketCostValue);
  winMeter.addChild(winLabel, winValue);

  container.addChild(balanceMeter, ticketCostMeter, winMeter);

  var gap = 10;

  function alignBalance() {
    if (orientation.get() === orientation.LANDSCAPE) {
      balanceLabel.x = (balanceLabel.width + gap + balanceValue.width) / -2;
      balanceValue.x = balanceLabel.width + gap + balanceLabel.x;
    }
  }

  function alignTicketCost() {
    if (orientation.get() === orientation.LANDSCAPE) {
      ticketCostLabel.x = (ticketCostLabel.width + gap + ticketCostValue.width) / -2;
      ticketCostValue.x = ticketCostLabel.width + gap + ticketCostLabel.x;
    }
  }

  function alignWin() {
    if (orientation.get() === orientation.LANDSCAPE) {
      winLabel.x = (winLabel.width + gap + winValue.width) / -2;
      winValue.x = winLabel.width + gap + winLabel.x;
    }
  }

  function layoutPortrait() {
    balanceLabel.anchor.set(0.5, 0);
    ticketCostLabel.anchor.set(0.5, 0);
    winLabel.anchor.set(0.5, 0);

    balanceValue.anchor.set(0.5, 1);
    ticketCostValue.anchor.set(0.5, 1);
    winValue.anchor.set(0.5, 1);

    balanceLabel.x = 0;
    balanceValue.x = 0;
    ticketCostLabel.x = 0;
    ticketCostValue.x = 0;
    winLabel.x = 0;
    winValue.x = 0;
  }

  function layoutLandscape() {
    balanceLabel.anchor.set(0, 0.5);
    ticketCostLabel.anchor.set(0, 0.5);
    winLabel.anchor.set(0, 0.5);

    balanceValue.anchor.set(0, 0.5);
    ticketCostValue.anchor.set(0, 0.5);
    winValue.anchor.set(0, 0.5);

    alignBalance();
    alignTicketCost();
    alignWin();
  }

  function layout() {
    var config = SKBeInstant.config;
    var showBalance = config.balanceDisplayInGame && config.wagerType === 'BUY';

    // Vertically center all the meters
    balanceMeter.y = background.height * 0.5;
    ticketCostMeter.y = background.height * 0.5;
    winMeter.y = background.height * 0.5;

    // If the balance meter is visible evenly space the three meters
    if (showBalance) {
      balanceMeter.visible = true;
      balanceMeter.x = background.width * 0.25;
      ticketCostMeter.x = background.width * 0.5;
      winMeter.x = background.width * 0.75;
    } else {
      // Otherwise hide the balance meter and evenly space the other two
      balanceMeter.visible = false;
      ticketCostMeter.x = background.width * 0.33;
      winMeter.x = background.width * 0.66;
    }

    // Apply either the landscape or portrait layout to the meters
    if (orientation.get() === orientation.LANDSCAPE) {
      layoutLandscape();
    } else {
      layoutPortrait();
    }
  }

  function setBalance(val) {
    balanceValue.text = SKBeInstant.formatCurrency(val).formattedAmount;
    alignBalance();
  }

  function setTicketCost(val) {
    ticketCostValue.text = SKBeInstant.formatCurrency(val).formattedAmount;
    alignTicketCost();
  }

  function setWin(val) {
    winValue.text = typeof val === 'number' ? SKBeInstant.formatCurrency(val).formattedAmount : val;
    alignWin();
  }

  return function footerComponent(bg, labels, styles) {
    if (bg) {
      background = bg;
      container.addChildAt(bg, 0);
    }

    if (labels !== undefined) {
      dynamicText.setText(balanceLabel, labels.balance);
      dynamicText.setText(ticketCostLabel, labels.ticketCost);
      dynamicText.setText(winLabel, labels.win);
    }

    if (styles !== undefined) {
      balanceLabel.style = styles.label;
      balanceValue.style = styles.value;
      ticketCostLabel.style = styles.label;
      ticketCostValue.style = styles.value;
      winLabel.style = styles.label;
      winValue.style = styles.value;
    }

    // temp
    setBalance(meterData.balance);
    setTicketCost(meterData.ticketCost);
    setWin(meterData.win > 0 ? meterData.win : SKBeInstant.config.defaultWinsValue);

    // Subscribe to meter data updates and set the meters accordingly
    msgBus.subscribe('MeterData.Balance', setBalance);
    msgBus.subscribe('MeterData.TicketCost', setTicketCost);
    msgBus.subscribe('MeterData.Win', setWin);

    // Subscribe to MoveToMoney, we need to relayout at this point because the balance meter was
    // hidden during TRY but might be visible for BUY
    msgBus.subscribe('jLotteryGame.playerWantsToMoveToMoneyGame', layout);

    layout();

    return container;
  };
});
