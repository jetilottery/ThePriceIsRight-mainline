define(function(require) {
  var PIXI = require('com/pixijs/pixi');
  var displayList = require('skbJet/componentManchester/standardIW/displayList');
  var utils = require('skbJet/componentManchester/standardIW/layout/utils');

  var sprite = require('skbJet/componentManchester/standardIW/layout/sprite');
  var animatedSprite = require('skbJet/componentManchester/standardIW/layout/animatedSprite');
  var rectangle = require('skbJet/componentManchester/standardIW/layout/rectangle');
  var text = require('skbJet/componentManchester/standardIW/layout/text');
  var button = require('skbJet/componentManchester/standardIW/layout/button');

  var DISPLAY_TYPES = [
    'point',
    'container',
    'sprite',
    'animatedSprite',
    'rectangle',
    'text',
    'point',
    'button',
  ];

  /**
   * @description Creates and returns a PIXI Container
   */
  function createContainer() {
    return new PIXI.Container();
  }

  /**
   * @description Creates and returns a PIXI Point
   */
  function createPoint() {
    return new PIXI.Point();
  }

  /**
   * @param layoutObj The layout data for this display object from the layout file
   * @description Creates and returns a PIXI display object of the given type
   */
  function createDisplayObjectByType(type) {
    switch (type) {
      case 'container':
        return createContainer();
      case 'sprite':
        return sprite.create();
      case 'animatedSprite':
        return animatedSprite.create();
      case 'rectangle':
        return rectangle.create();
      case 'text':
        return text.create();
      case 'button':
        return button.create();
      case 'point':
        return createPoint();
      default:
        return createContainer();
    }
  }

  function createDisplayObject(layout, variant, name) {
    var pixiObject;

    // Check for existing display objects with this name to prevent duplicates/overriding
    if (displayList[name] !== undefined) {
      throw new Error('Duplicate display object in displayList: ' + name);
    }

    if (DISPLAY_TYPES.indexOf(layout[name].type) > -1) {
      // if we've got a type use that to create the correct display object
      pixiObject = createDisplayObjectByType(layout[name].type);
    } else if (layout[name].hasOwnProperty('texture')) {
      // or for compat fall back to a Sprite if a texture is supplied
      pixiObject = sprite.create();
      layout[name].type = 'sprite';
    } else if (layout[name][variant] && layout[name][variant].texture) {
      // or check for a texture in the orientation variant
      pixiObject = sprite.create();
      layout[name].type = 'sprite';
    } else {
      // default to a container
      pixiObject = createContainer();
      layout[name].type = 'container';
    }

    pixiObject.name = name; //for use with the pixi-inspector

    updateDisplayObject(pixiObject, layout[name], layout[name].type, variant);

    displayList[name] = pixiObject;

    return pixiObject;
  }

  function updateDisplayObject(displayObj, layoutObj, type, variant) {
    // update generic props for all display types
    utils.assignProp(layoutObj, displayObj, 'x');
    utils.assignProp(layoutObj, displayObj, 'y');
    utils.assignProp(layoutObj, displayObj, 'visible');
    utils.assignProp(layoutObj, displayObj, 'alpha');
    utils.assignProp(layoutObj, displayObj, 'rotation');
    utils.assignPointProp(layoutObj, displayObj, 'pivot');
    utils.assignPointProp(layoutObj, displayObj, 'scale');

    // call update for the specific display type
    switch (type) {
      case 'sprite':
        sprite.update(displayObj, layoutObj);
        break;
      case 'animatedSprite':
        animatedSprite.update(displayObj, layoutObj);
        break;
      case 'rectangle':
        rectangle.update(displayObj, layoutObj);
        break;
      case 'text':
        text.update(displayObj, layoutObj);
        break;
      case 'button':
        button.update(displayObj, layoutObj);
        break;
    }

    // check for variant properties and re-update with them
    if (variant && layoutObj.hasOwnProperty(variant)) {
      updateDisplayObject(displayObj, layoutObj[variant], type);
    }
  }

  /**
   * @param {object} node The layout node to process
   * @param {PIXI.DisplayObject} parent The pixi object to add children to
   * @param {string} variant The orientation variant to layout
   * @param {array} layouts The layout objects from which to look up the child nodes
   * @description Iterates over a layout node's children recursively creating a PIXI display tree
   */
  function createChildNodes(node, parent, layouts, variant) {
    if (node.children && node.children.length > 0) {
      node.children.forEach(function createChild(name) {
        var layout = utils.findFirstWithProp(layouts, name);
        var pixiObject = createDisplayObject(layout, variant, name);
        createChildNodes(layout[name], pixiObject, layouts, variant);
        if (parent && layout[name].type !== 'point') {
          parent.addChild(pixiObject);
        }
      });
    }
  }

  /**
   * @param {object} rootNode The node in the layout object to begin crawling from
   * @param {PIXI.Container} container The PIXI Container to use as the root parent
   * @param {object[]} layout The layout object(s) to create the display tree from, ordered most to
   * least specific. Each node specifies it's children.
   * @param {string} variant The orientation variant to layout
   * @description Reads through one or more layout objects and produces a PIXI display tree
   */
  function createFromTree(rootNode, container, layout, variant) {
    var layouts = layout.length > 0 ? layout : [layout];
    createChildNodes(rootNode, container, layouts, variant);

    return displayList;
  }

  /**
   * @param {string} rootName The identifier for the root parent eg. _BASE_APP
   * @param {PIXI.Container} container The PIXI Container to use as the root parent
   * @param {object[]} layouts An array of flat layout objects to create the display tree from,
   * ordered most to least specific. Each node specifies it's parent.
   * @param {string} variant The orientation variant to layout
   * parent node
   * @description Reads through a layout object and produces a PIXI display tree
   * @deprecated See createFromTree for creating layout from a flat tree
   */
  function createFromList(rootName, container, layouts, variant) {
    // iterate layouts, starting with the last (most generic)
    for (var i = layouts.length; i >= 0; i--) {
      if (layouts[i] === undefined) {
        continue;
      }

      var layoutNames = Object.keys(layouts[i]);
      // iterate over all the display definitions in the layout file
      layoutNames.forEach(function(name) {
        if (displayList[name] === undefined) {
          // find the most specific definition for this display object across all layouts
          var layout = utils.findFirstWithProp(layouts, name);
          var pixiObject = createDisplayObject(layout, variant, name);
          // Find the parent object (or root) that was set in the layout and add this child
          if (layout[name].parent === rootName) {
            container.addChild(pixiObject);
          } else if (displayList[layout[name].parent]) {
            displayList[layout[name].parent].addChild(pixiObject);
          } else {
            throw new Error(
              'Parent `' + layout[name].parent + '` not found for display object `' + name + '`'
            );
          }
        }
      });
    }

    return displayList;
  }

  /**
   * @param layout The layout object to iterate for updates
   * @param variant The orientation variant to layout
   * @description Reads through a layout object and applies properties to the matching display
   * objects in the displayList
   */
  function updateChildNodes(node, layouts, variant) {
    if (node.children && node.children.length > 0) {
      node.children.forEach(function updateChild(name) {
        var layout = utils.findFirstWithProp(layouts, name);
        // check for variant properties and re-update with them
        if (layout[name].hasOwnProperty(variant)) {
          updateDisplayObject(displayList[name], layout[name][variant], layout[name].type);
        }
        updateChildNodes(layout[name], layouts, variant);
      });
    }
  }

  return {
    createFromTree: createFromTree,
    createFromList: createFromList,
    update: updateChildNodes,
  };
});
