define(function(require) {
  var PIXI = require('com/pixijs/pixi');
  var utils = require('skbJet/componentManchester/standardIW/layout/utils');

  /**
   * @description Creates and returns a PIXI Animated Sprite from the supplied textures.
   */
  function createAnimatedSprite() {
    return new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]);
  }

  /**
   * @param displayObj A PIXI Animated Sprite to update
   * @param layoutObj An object describing the properties to be updated
   * @description Applies the properties of layoutObj to displayObj
   */
  function updateAnimatedSprite(displayObj, layoutObj) {
    if (layoutObj.hasOwnProperty('textures')) {
      if (Array.isArray(layoutObj.textures)) {
        displayObj.textures = layoutObj.textures.map(PIXI.Texture.from);
      } else {
        displayObj.textures = utils.findFrameSequence(layoutObj.textures).map(PIXI.Texture.from);
      }
    }

    utils.assignProp(layoutObj, displayObj, 'loop');
    utils.assignProp(layoutObj, displayObj, 'animationSpeed');
    utils.assignPointProp(layoutObj, displayObj, 'anchor');
  }

  return {
    create: createAnimatedSprite,
    update: updateAnimatedSprite,
  };
});
