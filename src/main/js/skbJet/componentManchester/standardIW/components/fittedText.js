define(function(require) {
  var PIXI = require('com/pixijs/pixi');

  function FittedText(text, style) {
    PIXI.Text.call(this, text, style);
  }

  FittedText.prototype = Object.create(PIXI.Text.prototype, {
    text: {
      get: function getText() {
        return this._text;
      },
      set: function setText(v) {
        Object.getOwnPropertyDescriptor(
          Object.getPrototypeOf(Object.getPrototypeOf(this)),
          'text'
        ).set.call(this, v);

        if (this._maxWidth) {
          this.updateText();
          this.scale.set(Math.min(this._maxWidth / this.texture.orig.width, 1));
        }
      },
    },
    maxWidth: {
      get: function getButtonState() {
        return this._maxWidth;
      },
      set: function setButtonState(v) {
        this._maxWidth = v;
        if (this._maxWidth) {
          this.updateText();
          this.scale.set(Math.min(this._maxWidth / this.texture.orig.width, 1));
        }
      },
    },
  });

  return FittedText;
});
