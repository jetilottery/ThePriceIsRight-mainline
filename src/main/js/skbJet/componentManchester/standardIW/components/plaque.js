define(function(require) {
  var PIXI = require('com/pixijs/pixi');
  require('com/gsap/TweenLite');

  var Tween = window.TweenLite;

  function removeUndefined(item) {
    return item !== undefined;
  }

  function Plaque(children, opts) {
    PIXI.Container.call(this);

    if (Array.isArray(children)) {
      this.addChild.apply(this, children.filter(removeUndefined));
    } else if (children !== undefined) {
      this.addChild(children);
    }

    if (opts && opts.name) {
      this.name = opts.name;
    }

    // block interaction through the plaque
    this.interactive = true;

    if (opts && opts.overlay) {
      this.overlay = opts.overlay;
      this.overlay.visible = false;
      this.overlay.alpha = 0;
      this.overlay.interactive = true;
    }

    this._duration = opts && opts.duration !== undefined ? opts.duration : 0.25;

    if (opts && opts.onShow) {
      this.onShow = opts.onShow;
    }
    if (opts && opts.onHide) {
      this.onHide = opts.onHide;
    }

    this.alpha = 0;
    this.visible = false;
  }

  Plaque.prototype = Object.create(PIXI.Container.prototype);

  Plaque.prototype.show = function show(d) {
    if (this.tween) {
      this.tween.kill();
    }

    if (this.overlay) {
      this.overlay.visible = true;
    }

    this._direction = 'IN';
    this.visible = true;
      if (this.onShow) {
          this.onShow();
      }
    this.tween = new Tween([this, this.overlay || {}], d !== undefined ? d : this._duration, {
      alpha: 1,
      onComplete: function showComplete() {

      },
      callbackScope: this,
    });
  };

  Plaque.prototype.hide = function hide(d) {
    if (this.tween) {
      this.tween.kill();
    }

    this.visible = true;
    this._direction = 'OUT';
      if (this.onHide) {
          this.onHide();
      }
    this.tween = new Tween([this, this.overlay || {}], d !== undefined ? d : this._duration, {
      alpha: 0,
      onComplete: function hideComplete() {
        this.visible = false;
        if (this.overlay) {
          this.overlay.visible = false;
        }

      },
      callbackScope: this,
    });
  };

  Plaque.prototype.toggle = function toggle(d) {
    if (this._direction !== 'IN') {
      this.show(d);
      return true;
    } else {
      this.hide(d);
      return false;
    }
  };

  return Plaque;
});
