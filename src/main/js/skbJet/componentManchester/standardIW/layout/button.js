define(function(require) {
  var Button = require('skbJet/componentManchester/standardIW/components/button');
  var utils = require('skbJet/componentManchester/standardIW/layout/utils');
  var dynamicText = require('skbJet/componentManchester/standardIW/layout/dynamicText');
  var textStyles = require('skbJet/componentManchester/standardIW/textStyles');


  /**
   * @description Creates and returns a Button component
   */
  function createButton() {
    return new Button();
  }

  /**
   * @param displayObj A Button component to update
   * @param layoutObj An object describing the properties to be updated
   * @description Applies the properties of layoutObj to displayObj
   */
  function updateButton(displayObj, layoutObj) {
    utils.assignProp(layoutObj, displayObj, 'textures');

    if (layoutObj.style) {
      // style can be set as a string, which is looked up in the global text style list
      if (typeof layoutObj.style === 'string') {
        displayObj.style = textStyles.parse(layoutObj.style);
      } else {
        // or as an object, where each key is a button state and the values are looked up in the
        // style list and passed to the button as an object
        displayObj.style = Object.keys(layoutObj.style).reduce(function createTextStyle(style, state) {
          style[state] = textStyles.parse(layoutObj.style[state]);
          return style;
        }, {});
      }
    }

    if (layoutObj.string) {
      dynamicText.setText(displayObj.label, layoutObj.string);
    }
  }

  return {
    create: createButton,
    update: updateButton,
  };
});
