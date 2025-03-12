define(function(require) {
  var PIXI = require('com/pixijs/pixi');

  var colors = {};

  return function getColorSwatch(swatch) {
    // If the swatch has already been sampled return that color
    if (colors[swatch]) {
      return colors[swatch];
    }

    // Find the swatch in the texture cache. If it doesn't exist return undefined
    var texture = PIXI.utils.TextureCache[swatch];
    if (!texture) {
      return;
    }

    // create a canvas and draw the swatch texture to it
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var pos = texture.orig;
    var res = texture.baseTexture.resolution;
    ctx.clearRect(0, 0, 1, 1);
    ctx.drawImage(texture.baseTexture.source, pos.x * res, pos.y * res, pos.width * res, pos.height * res, 0, 0, 1, 1);
    
    
    // grab the pixel data and convert it to a hex number
    var pixels = ctx.getImageData(0,0,1,1).data;
    colors[swatch] = PIXI.utils.rgb2hex([].slice.call(pixels,0,3).map(function mapZeroOne(val) {
      return val / 255;
    }));

    return colors[swatch];
  };
});
