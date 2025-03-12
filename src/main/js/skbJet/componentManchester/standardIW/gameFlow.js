define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  var meterData = require('skbJet/componentManchester/standardIW/meterData');
  var gameData = require('skbJet/componentManchester/standardIW/gameData');
  var machine = require('skbJet/componentManchester/standardIW/stateMachine/machine');
  require('skbJet/componentManchester/standardIW/scenarioData');

  // State Handlers
  require('./stateHandlers/appInit');
  require('./stateHandlers/gameReady');
  require('./stateHandlers/buyScreen');
  require('./stateHandlers/ticketRequest');
  require('./stateHandlers/enterStartTurn');
  require('./stateHandlers/enterRevealTurn');
  require('./stateHandlers/endTurn');
  require('./stateHandlers/revealComplete');
  require('./stateHandlers/enterResultScreen');
  require('./stateHandlers/exitResultScreen');
  require('./stateHandlers/moveToMoney');
  require('./stateHandlers/timeout');
  require('./stateHandlers/enterError');

  // We need to know how many games have been played (Phase 2) for demosBeforeMoveToMoney and
  // determining between playerWantsToPlay/RePlay. It would be nice if jLottery/SKBeInstant kept
  // count itself, but it doesn't so we'll do it ourselves.
  gameData.gamesCompleted = 0;

  /**
   * @function init
   * @description Entry point for the state machine. Moves to the 1st proper state, BOOT which will
   * kick off the load process
   */
  function init() {
    // grab the jLottery game launch configuration at the earliest opportunity
    machine.next('BOOT');
  }
  msgBus.subscribe('jLottery.startAssetLoading', init);

  /**
   * @function initialize
   * @description Begin game initialization once all resources are loaded
   */
  function initialize() {
    machine.next('APP_INIT');
  }
  msgBus.subscribe('jLottery.initialize', initialize);

  /**
   * @function reInitialize
   * @description Reset the game and return to BUY_SCREEN following moveToMoney in WLA or ticket
   * request failure in RGS
   */
  function reInitialize() {
    machine.next('GAME_RESET');
  }
  msgBus.subscribe('jLottery.reInitialize', reInitialize);

  /**
   * @function startUserInteraction
   * @description Handle ticket acquisiton following either ticketReady load, or ticketNormal
   * purchase.
   */
  function startUserInteraction(ticketData) {
    if (SKBeInstant.config.gameType === 'ticketReady') {
      meterData.setTicket(ticketData);
      initialize();
    } else {
      meterData.setTicket(ticketData);
      msgBus.publish('UI.endNetworkActivity');
      msgBus.publish('UI.updateButtons', {
        autoPlay: { visible: true, enabled: true },
        help: { enabled: true },
      });
      machine.next('TICKET_ACQUIRED');
    }
  }
  msgBus.subscribe('jLottery.startUserInteraction', startUserInteraction);
  msgBus.subscribe('jLottery.reStartUserInteraction', startUserInteraction);

  /**
   * @function enterResultScreen
   * @description Handle confirmed result, move to BEFORE_RESULT_SCREEN
   */
  function enterResultScreen() {
    msgBus.publish('UI.endNetworkActivity');

    // If a PHASE2 game was started as a ticket ready, this is the time to switch and start
    // considering it 'normal'. We've shown the 'ready' ticket already and now the player will
    // have to buy a new one to continue playing.
    if (SKBeInstant.config.jLotteryPhase === 2) {
      SKBeInstant.config.gameType = 'normal';
    }

    machine.next('RESULT_SCREEN');
  }
  msgBus.subscribe('jLottery.enterResultScreenState', enterResultScreen);

  /**
   * @function error
   * @description Handle jLottery errors, move to ERROR state
   */
  function error(e) {
    machine.next('ERROR', e);
  }
  msgBus.subscribe('jLottery.error', error);


  /**
   * @function reset
   * @description Handle ticketPurchase failure
   */
  function reset() {
    machine.next('BUY_SCREEN');
  }

  msgBus.subscribe('jLotterySKB.reset', reset);


  function handle(handler, state, phase, wagerType, gameType) {
    return machine.handle(handler, state, machine.SUBSTATES.MAIN, phase, wagerType, gameType);
  }

  return {
    next: machine.next,
    handle: handle,
  };
});
