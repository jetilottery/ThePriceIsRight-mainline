define(function(require) {
  var PIXI = require('com/pixijs/pixi');
  var FittedText = require('skbJet/componentManchester/standardIW/components/fittedText');
  var dynamicText = require('skbJet/componentManchester/standardIW/layout/dynamicText');
  var utils = require('skbJet/componentManchester/standardIW/layout/utils');
  var textStyles = require('skbJet/componentManchester/standardIW/textStyles');
  var fontColors = require('skbJet/componentManchester/standardIW/fontColors');


  /**
   * @description Creates and returns a PIXI Text object
   */
  function createText() {
    return new FittedText();
  }

  /**
   * @param displayObj A Text component to update
   * @param layoutObj An object describing the properties to be updated
   * @description Applies the properties of layoutObj to displayObj
   */
  function updateText(displayObj, layoutObj) {
    if (layoutObj.string) {
      dynamicText.setText(displayObj, layoutObj.string);
    }

    if (layoutObj.style) {
      if (!textStyles[layoutObj.style]) {
        throw new Error('Text style `' + layoutObj.style + '` not found in game text styles');
      }

      // Replace possible named swatch colors with the corresponding hex number
      if (PIXI.utils.TextureCache[textStyles[layoutObj.style].fill] !== undefined) {
        textStyles[layoutObj.style].fill = fontColors(textStyles[layoutObj.style].fill);
      }

      displayObj.style = new PIXI.TextStyle(textStyles[layoutObj.style]);
    }

    // Replace possible named swatch colors with the corresponding hex number
    if (PIXI.utils.TextureCache[layoutObj.fill] !== undefined) {
      layoutObj.fill = fontColors(layoutObj.fill);
    }

    // apply style props from the layout object on top of the style object
    utils.assignProps(layoutObj, displayObj.style, [
      'align',
      'breakWords',
      'dropShadow',
      'dropShadowAlpha',
      'dropShadowAngle',
      'dropShadowBlur',
      'dropShadowColor',
      'dropShadowDistance',
      'fill',
      'fillGradientStops',
      'fillGradientType',
      'fontFamily',
      'fontSize',
      'fontStyle',
      'fontVariant',
      'fontWeight',
      'leading',
      'letterSpacing',
      'lineHeight',
      'lineJoin',
      'miterLimit',
      'padding',
      'stroke',
      'strokeThickness',
      'textBaseline',
      'trim',
      'whiteSpace',
      'wordWrap',
      'wordWrapWidth',
    ]);

    utils.assignPointProp(layoutObj, displayObj, 'anchor');
    utils.assignProp(layoutObj, displayObj, 'maxWidth');
  }

  return {
    create: createText,
    update: updateText,
  };
});
