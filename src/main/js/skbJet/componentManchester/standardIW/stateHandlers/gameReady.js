define(function(require) {
  var PIXI = require('com/pixijs/pixi');
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  var machine = require('skbJet/componentManchester/standardIW/stateMachine/machine');
  var meterData = require('skbJet/componentManchester/standardIW/meterData');
  var app = require('skbJet/componentManchester/standardIW/app');
  var resources = require('skbJet/component/resourceLoader/resourceLib');

  /**
   * @function gameReady
   * @description Append the PIXI app to the game container
   */
  function gameReady() {
    // If config option showHowToPlayOnLoad is set show the help screen imediately 
    if (resources.i18n.config && resources.i18n.config.showHowToPlayOnLoad) {
      msgBus.publish('UI.showHelp', 0);
    }

    var gce = SKBeInstant.getGameContainerElem();
    // Remove anything already in the target container (splash/loader) and inject the game canvas
    gce.innerHTML = '';
    gce.appendChild(app.view);

    // If a template background is present apply it to the container
    var bgImg = PIXI.utils.TextureCache.backgroundFill;
    if (bgImg !== undefined) {
      gce.style.backgroundImage = 'url(' + bgImg.baseTexture.imageUrl + ')';
      gce.style.backgroundSize = 'cover';
    }
  }

  /**
   * @function gameReadyPhase1
   * @description Once all loading/setup is done show the game
   */
  function gameReadyPhase1() {
    msgBus.publish('UI.updateButtons', {
      autoPlay: true,
    });
    gameReady();
    machine.next('TICKET_ACQUIRED');
  }

  /**
   * @function gameReadyPhase2
   * @description Once all loading/setup is done show the game
   */
  function gameReadyPhase2() {
    meterData.init();
    gameReady();
    machine.next('BUY_SCREEN');
  }

  machine.handle(gameReadyPhase1, 'GAME_READY', machine.SUBSTATES.MAIN, 1);
  machine.handle(gameReadyPhase2, 'GAME_READY', machine.SUBSTATES.MAIN, 2);
});
