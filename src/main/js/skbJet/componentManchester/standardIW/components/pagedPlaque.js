define(function(require) {
  var PIXI = require('com/pixijs/pixi');
  var Plaque = require('skbJet/componentManchester/standardIW/components/plaque');

  var iWidth;
  var iHeight;
  var iGap;

  function createMarker(index, total, fill) {
    var graphic = new PIXI.Graphics();
    var startX = (total * iWidth + (total - 1) * iGap) / -2;
    var x = startX + index * (iWidth + iGap);
    graphic.beginFill(fill);
    graphic.drawRoundedRect(x, iHeight / -2, iWidth, iHeight, 2);
    graphic.endFill();
    return graphic;
  }

  function cloneMarker(index, total, sprite) {
    var clone = new PIXI.Sprite(sprite.texture);
    var startX = ((total * iWidth) + ((total - 1) * iGap)) / -2;
    clone.position.x = startX + (index * (iWidth + iGap));
    return clone;
  }


  function PagedPlaque(children, opts) {
    Plaque.call(this, children, opts);
    
    this.pages = opts.pages;

    this.currentPage = 0;

    iWidth = 22;
    iHeight = 4;
    iGap = 4;
  
    if (opts.indicatorActive) {
      iWidth = opts.indicatorActive.width;
      if (opts.indicatorActive.parent) {
        opts.indicatorActive.parent.removeChild(opts.indicatorActive);
      }
    }

    if (opts.indicatorInactive) {
      iWidth = Math.max(iWidth, opts.indicatorInactive.width);
      if (opts.indicatorInactive.parent) {
        opts.indicatorInactive.parent.removeChild(opts.indicatorInactive);
      }
    }

    if (this.pages.length > 1) {
      for (var index = 0; index < this.pages.length; index++) {
        this.pages[index].visible = index === 0;
      }
      if (opts.indicatorContainer) {
        this.indicatorsOn = this.pages.map(function(page, i, p) {
          if (opts.indicatorActive) {
            return cloneMarker(i, p.length, opts.indicatorActive);
          }
          return createMarker(i, p.length, opts.indicatorOnFill ? opts.indicatorOnFill : 0xffffff);
        });
        this.indicatorsOff = this.pages.map(function(page, i, p) {
          if (opts.indicatorInactive) {
            return cloneMarker(i, p.length, opts.indicatorInactive);
          }
          return createMarker(
            i,
            p.length,
            opts.indicatorOffFill ? opts.indicatorOffFill : 0x666666
          );
        });
        opts.indicatorContainer.addChild.apply(
          opts.indicatorContainer,
          this.indicatorsOff.concat(this.indicatorsOn)
        );
      }

      this.registerButtons(opts.previousButton, opts.nextButton);

      this.goToPage(0);
    } else {
      if (opts.indicatorContainer) {
        opts.indicatorContainer.visible = false;
      }
      if (opts.previousButton) {
        opts.previousButton.visible = false;
      }
      if (opts.nextButton) {
        opts.nextButton.visible = false;
      }
    }
  }

  PagedPlaque.prototype = Object.create(Plaque.prototype);

  PagedPlaque.prototype.goToPage = function goToPage(pageIndex) {
    if (this.pages.length === 0) {
      return;
    }

    var targetPage = (pageIndex + this.pages.length) % this.pages.length;
    for (var index = 0; index < this.pages.length; index++) {
      this.pages[index].visible = index === targetPage;
      if (this.indicatorsOn) {
        this.indicatorsOff[index].visible = index !== targetPage;
        this.indicatorsOn[index].visible = index === targetPage;
      }
    }
    this.currentPage = targetPage;
  };

  // Replace the parent class's show method with one that resets the plaque to page 0
  PagedPlaque.prototype._show = PagedPlaque.prototype.show;
  PagedPlaque.prototype.show = function show(d) {
    this.goToPage(0);
    this._show(d);
  };

  PagedPlaque.prototype.goBack = function goBack() {
    this.goToPage(this.currentPage - 1);
  };

  PagedPlaque.prototype.goForward = function goForward() {
    this.goToPage(this.currentPage + 1);
  };

  PagedPlaque.prototype.registerButtons = function registerButtons(previousButton, nextButton) {
    if (previousButton) {
      this.previousButton = previousButton;
      this.previousButton.on('buttonpress', this.goBack, this);
    }
    if (nextButton) {
      this.nextButton = nextButton;
      this.nextButton.on('buttonpress', this.goForward, this);
    }
  };

  return PagedPlaque;
});
