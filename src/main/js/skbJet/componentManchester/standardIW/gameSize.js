define(function(require) {
  var windowSize = require('skbJet/component/deviceCompatibility/windowSize');
  var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  var orientation = require('skbJet/componentManchester/standardIW/orientation');
  var app = require('skbJet/componentManchester/standardIW/app');

  var dimensions = require('game/display/dimensions');


  /**
   * @param width Width of the container to fit within
   * @param height Height of the container to fit within
   * @description Fit the app within a given container size, maintaining the game aspect ratio and
   * centering the game canvas
   */
  function fitApp(width, height) {
    var o = orientation.get();
    var d = dimensions[o];

    var ratio = width / height;
    var baseR = d.width / d.height;

    app.renderer.resize(d.width, d.height);

    var x;
    var y;
    var w;
    var h;

    if (ratio > baseR) {
      // if container is wider than the game
      h = height;
      // calculate width based on constrained height
      w = height * baseR;
      x = (width - w) / 2;
      y = 0;
    } else {
      // otherwise container is narrower than the game (or exact match)
      w = width;
      // calcutate height from constrained width
      h = width / baseR;
      y = (height - h) / 2;
      x = 0;
    }

    app.view.style.width = w + 'px';
    app.view.style.height = h + 'px';
    app.view.style.marginLeft = x + 'px';
    app.view.style.marginTop = y + 'px';
  }


  function windowResized(){
    var winW, winH;
    if (SKBeInstant.isSKB()) {
      winW = windowSize.getDeviceWidth();
      winH = windowSize.getDeviceHeight();
      document.documentElement.style.width = winW + 'px';
      document.documentElement.style.height = winH + 'px';
      document.body.style.width = winW + 'px';
      document.body.style.height = winH + 'px';
      SKBeInstant.getGameContainerElem().style.width = winW + 'px';
      SKBeInstant.getGameContainerElem().style.height = winH + 'px';
    } else {
      var targetDiv = document.getElementById(SKBeInstant.config.targetDivId);
      winW = targetDiv.clientWidth;
      winH = targetDiv.clientHeight;
    }
    
    fitApp(winW, winH);
  }


  return function initGameSize() {
    if (SKBeInstant.isSKB() || SKBeInstant.config.screenEnvironment === 'device') {
      windowResized();
      window.addEventListener('resize', windowResized);
    } else {
      fitApp(Number(SKBeInstant.config.revealWidthToUse), Number(SKBeInstant.config.revealHeightToUse));
    }
  };
});
