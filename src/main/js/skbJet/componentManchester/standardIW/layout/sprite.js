define(function(require) {
  var PIXI = require('com/pixijs/pixi');
  var utils = require('skbJet/componentManchester/standardIW/layout/utils');

  /**
   * @description Creates and returns a PIXI Sprite from the supplied texture, or empty texture if 
   * the texture supplied is null
   */
  function createSprite() {
    return new PIXI.Sprite();
  }

  /**
   * @param displayObj A PIXI Sprite to update
   * @param layoutObj An object describing the properties to be updated
   * @description Applies the properties of layoutObj to displayObj
   */
  function updateSprite(displayObj, layoutObj) {
    if (
      layoutObj.hasOwnProperty('texture') &&
      PIXI.utils.TextureCache[layoutObj.texture] !== undefined
    ) {
      displayObj.texture = PIXI.Texture.from(layoutObj.texture);
    }
    utils.assignPointProp(layoutObj, displayObj, 'anchor');
  }

  return {
    create: createSprite,
    update: updateSprite,
  };
});
