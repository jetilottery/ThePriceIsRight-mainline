define(function(require) {
  var machine = require('skbJet/componentManchester/standardIW/stateMachine/machine');
  var meterData = require('skbJet/componentManchester/standardIW/meterData');
  var gameSize = require('skbJet/componentManchester/standardIW/gameSize');
  var layout = require('skbJet/componentManchester/standardIW/layout');
  var console = require('skbJet/componentManchester/standardIW/console');
  var app = require('skbJet/componentManchester/standardIW/app');

  /**
   * @function appInit
   * @description Initialise application and display tree, ready for game specific init
   */
  function appInit() {
    // Initialize the PIXI application
    app.init();

    // Parse game layout files and build the display tree
    layout.init();

    // Set available price points and default price
    meterData.init();

    // Register price/stake controls with the console
    console.register();

    // Setup game resizing
    gameSize();
    
    machine.next('GAME_INIT');
  }

  machine.handle(appInit, 'APP_INIT', machine.SUBSTATES.MAIN);
});
