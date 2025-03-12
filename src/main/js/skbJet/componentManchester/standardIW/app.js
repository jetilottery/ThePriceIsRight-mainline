define(function(require) {
  var PIXI = require('com/pixijs/pixi');

  // We'll return this empty object, only initialising the app later.
  // This gives us chance to load in any PIXI plugins before the renderer is created.
  var app = {};
  // Kind of dirty because the "app" we return isn't an instance of PIXI.Application, but the
  // alternative is app.get() everywhere or if we did async we could return a promise and await


  /**
  * @description Creates a new PIXI application, exposing its properties
  * in the already returned object
  */
  app.init = function init() {
    var newApp = new PIXI.Application({
      transparent: true,
      antiAlias: true,
    });

    app.renderer = newApp.renderer;
    app.stage = newApp.stage;
    app.screen = newApp.screen;
    app.view = newApp.view;
    app.ticker = newApp.ticker;
    app.loader = newApp.loader;

    delete app.init;
  };

  return app;
});
