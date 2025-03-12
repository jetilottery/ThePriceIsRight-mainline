define(function(require) {
  var PIXI = require('com/pixijs/pixi');

  /**
  * @param {object} source An object from which to read the specified property
  * @param {object} target An object on which to set the new property/value
  * @param {string} prop The property key to check for and apply
  * @description Applies a property to a target if it exists in source
  */
  function assignProp(source, target, prop) {
    if (source.hasOwnProperty(prop)) {
      target[prop] = source[prop];
    }
  }

  /**
  * @param {object} source An object from which to read the specified property
  * @param {object} target An object on which to set the new property/value
  * @param {string[]} props The property keys to check for and apply
  * @description Applies multiple properties to a target if they exists in source
  */
  function assignProps(source, target, props) {
    for (var i = 0; i < props.length; i++) {
      assignProp(source, target, props[i]);
    }
  }

  /**
  * @param {object} source An object from which to read the specified property
  * @param {object} target An object on which to set the new property/value
  * @param {string} prop The property key to check for and apply
  * @description Applies a PIXI Point type property to a target if it exists in source
  */
  function assignPointProp(source, target, prop) {
    if (source.hasOwnProperty(prop)) {
      if (typeof source[prop] === 'number') {
        target[prop].set(source[prop]);
      } else {
        target[prop].x = source[prop].x !== undefined ? source[prop].x : target[prop].x;
        target[prop].y = source[prop].y !== undefined ? source[prop].y : target[prop].y;
      }
    }
  }

  /**
  * @param {object[]} source An array of objects in which to look for the specified property
  * @param {string} prop The property key to look for
  * @description Returns the first object in an array that contains a given property
  */
 function findFirstWithProp(sources, prop) {
    var i = 0;
    while (i < sources.length) {
      if(sources[i] && sources[i][prop] !== undefined) {
        return sources[i];
      }
      i += 1;
    }

    throw new Error('Property `' + prop + '` not found in any of the passed objects');
  }

  function findFrameSequence(query) {
    return Object.keys(PIXI.utils.TextureCache)
      .filter(function doesFrameStartsWithQuery(frameName) {
        return frameName.substr(0, query.length) === query;
      })
      .sort();
  }

  return {
    assignProp: assignProp,
    assignProps: assignProps,
    assignPointProp: assignPointProp,
    findFirstWithProp: findFirstWithProp,
    findFrameSequence: findFrameSequence,
  };
});
