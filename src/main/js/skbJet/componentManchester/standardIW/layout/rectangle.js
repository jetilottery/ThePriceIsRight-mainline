define(function(require) {
  var PIXI = require('com/pixijs/pixi');
  var utils = require('skbJet/componentManchester/standardIW/layout/utils');

  /**
   * @description Creates and returns a PIXI Graphics object 
   */
  function createRectangle() {
    var g = new PIXI.Graphics();
    
    // set some defaults
    g._rect = {
      width: 0,
      height: 0,
      fill: 0x000000,
      fillAlpha: 1,
      radius: 0,
      lineWidth: 0,
      lineColor: 0x000000,
      lineAlpha: 1,
      lineAlignment: 1,
    };

    return g;
  }

  /**
   * @param displayObj A PIXI Graphics instance to draw a rectangle to
   * @param layoutObj An object describing the rectangle to be drawn
   * @description Draws a rectangle to a Graphics instance
   */
  function updateRectangle(displayObj, layoutObj) {
    var rect = displayObj._rect;

    // store the fill, dimensions and radius on the displayObject if set
    utils.assignProp(layoutObj, displayObj._rect, 'fill');
    utils.assignProp(layoutObj, displayObj._rect, 'fillAlpha');
    utils.assignProp(layoutObj, displayObj._rect, 'width');
    utils.assignProp(layoutObj, displayObj._rect, 'height');
    utils.assignProp(layoutObj, displayObj._rect, 'radius');
    utils.assignProp(layoutObj, displayObj._rect, 'lineColor');
    utils.assignProp(layoutObj, displayObj._rect, 'lineWidth');
    utils.assignProp(layoutObj, displayObj._rect, 'lineAlpha');
    utils.assignProp(layoutObj, displayObj._rect, 'lineAlignment');

    // redraw the rect
    displayObj.clear();
    displayObj.beginFill(rect.fill, rect.fillAlpha);

    if (rect.lineWidth > 0) {
      displayObj.lineStyle(rect.lineWidth, rect.lineColor, rect.lineAlpha, rect.lineAlignment);
    }

    if (rect.radius > 0) {
      displayObj.drawRoundedRect(0, 0, rect.width, rect.height, rect.radius);
    } else {
      displayObj.drawRect(0, 0, rect.width, rect.height);
    }

    displayObj.endFill();
  }

  return {
    create: createRectangle,
    update: updateRectangle,
  };
});
