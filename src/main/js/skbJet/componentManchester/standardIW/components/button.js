define(function(require) {
  var PIXI = require('com/pixijs/pixi');
  var FittedText = require('skbJet/componentManchester/standardIW/components/fittedText');

  var singleButtonLock = null;

  function Button(textures) {
    PIXI.Container.call(this);

    // init with empty sprites for each button state
    this.states = {
      enabled: new PIXI.Sprite(),
      pressed: new PIXI.Sprite(),
      over: new PIXI.Sprite(),
      disabled: new PIXI.Sprite(),
    };
    // and empty text label
    this.label = new FittedText('');

    // center everything so we don't have to worry about positioning the text
    this.states.enabled.anchor.set(0.5);
    this.states.pressed.anchor.set(0.5);
    this.states.over.anchor.set(0.5);
    this.states.disabled.anchor.set(0.5);
    this.label.anchor.set(0.5);

    this.addChild(
      this.states.enabled,
      this.states.pressed,
      this.states.over,
      this.states.disabled,
      this.label
    );

    if (textures !== undefined) {
      this.textures = textures;
    }

    this._style = {};

    this.on('pointerdown', this.handleDown, this);
    this.on('pointerup', this.handleUp, this);
    this.on('pointerupoutside', this.handleUpOutside, this);
    this.on('pointerover', this.handleOver, this);
    this.on('pointerout', this.handleOut, this);

    this._visible = true;

    this.enabled = true;
    this.buttonMode = true;
  }

  Button.prototype = Object.create(PIXI.Container.prototype, {
    enabled: {
      get: function getEnabled() {
        return this._enabled;
      },
      set: function setEnabled(v) {
        this._enabled = !!v;
        this.buttonState = this._enabled ? 'enabled' : 'disabled';
        this.interactive = this._enabled;
      },
    },
    visible: {
      get: function get() {
        return this._visible;
      },
      set: function set(v) {
        // hiding the button should also release the button lock
        if (!v && singleButtonLock === this.name) {
          singleButtonLock = null;
        }
        this._visible = v;
      },
    },
    buttonState: {
      get: function getButtonState() {
        return this._buttonState;
      },
      set: function setButtonState(v) {
        var stateList = ['enabled', 'pressed', 'over', 'disabled'];
        this._buttonState = v;
        // Show the sprite for the selected state first. Using alpha because visible triggers a
        // pointerout event when the previous sprite is hidden
        this.states[this._buttonState].alpha = 1;
        // Then loop over all the states, hiding all the other sprites
        for (var i = 0; i < stateList.length; i++) {
          if (stateList[i] !== this._buttonState) {
            this.states[stateList[i]].alpha = 0;
          }
        }
        // If a label style exists for this state, set it
        if (this._style[this._buttonState]) {
          this.label.style = this.style[this._buttonState];
        }
      },
    },
    textures: {
      get: function getTextures() {
        return {
          enabled: this.states.enabled.texture,
          pressed: this.states.pressed.texture,
          over: this.states.over.texture,
          disabled: this.states.disabled.texture,
        };
      },
      set: function setTextures(states) {
        // Set textures for each button state. Enabled and Pressed must always be set.
        this.states.enabled.texture = PIXI.Texture.from(states.enabled);
        this.states.pressed.texture = PIXI.Texture.from(states.pressed);
        // Over will fall back to the using the Pressed texture if not set
        this.states.over.texture = PIXI.Texture.from(states.over || states.pressed);
        // Disabled will fall back to an EMPTY texture. Useful if the button should hide when
        // disabled, assuming it has no text label
        this.states.disabled.texture = PIXI.Texture.from(states.disabled || PIXI.Texture.EMPTY);
        // Set the max label width to 95% of the narrowest button state
        this.label.maxWidth = Math.min(this.states.enabled.width, this.states.pressed.width) * 0.95;
      },
    },
    style: {
      get: function getTextures() {
        return this._style;
      },
      set: function setTextures(style) {
        // Set the style for each state, falling back to more common states or to a single style object
        this._style.enabled = style.enabled || style;
        this._style.pressed = style.pressed || style.enabled || style;
        this._style.over = style.over || style.pressed || style.enabled || style;
        this._style.disabled = style.disabled || style.enabled || style;
        // set the label to the current style
        this.label.style = this._style[this._buttonState];
      },
    },
  });

  Button.prototype.handleDown = function handleDown(ev) {
    // If the button is disabled, another button has the lock, or the mouse button wasn't the
    // left button then ignore the click
    if (
      !this._enabled ||
      singleButtonLock ||
      (ev.data.pointerType === 'mouse' && ev.data.button !== 0)
    ) {
      return;
    }

    // Lock buttons to prevent other buttons being activated until this one is released
    singleButtonLock = this.name;
    // Update the button state
    this.buttonState = 'pressed';
  };

  Button.prototype.handleUp = function handleUp(ev) {
    // if this button did not have the lock, no need to process pointer up
    if (singleButtonLock !== this.name) {
      return;
    }

    // Update the button state
    if (ev.data.pointerType === 'mouse') {
      this.buttonState = this._enabled ? 'over' : 'disabled';
    } else {
      this.buttonState = this._enabled ? 'enabled' : 'disabled';
    }

    // emit a new event that game code can listen for
    this.emit('buttonpress', ev);

    // release the lock
    singleButtonLock = null;
  };

  Button.prototype.handleUpOutside = function handleUpOutside() {
    // if this button had the lock it is safe to release it
    if (singleButtonLock === this.name) {
      singleButtonLock = null;
    }
    // Update the button state
    this.buttonState = this._enabled ? 'enabled' : 'disabled';
  };

  Button.prototype.handleOver = function handleOver() {
    if (!this._enabled) {
      return;
    }

    this.buttonState = singleButtonLock === this.name ? 'pressed' : 'over';
  };

  Button.prototype.handleOut = function handleOut() {
    if (!this._enabled) {
      return;
    }

    this.buttonState = 'enabled';
  };

  return Button;
});
