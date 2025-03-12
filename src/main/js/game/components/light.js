define(function (require) {

    var PIXI = require('com/pixijs/pixi');

    function Light(name) {
        var _this = this;
        _this.container = new PIXI.Container();

        if(name !== void(0)) {
            _this.container.name = name;
        } else {
            _this.container.name = 'bulb';
        }

        _this.bulb = new PIXI.Sprite(PIXI.Texture.fromFrame('MasterLightbulb'));

        _this.full = new PIXI.Sprite(PIXI.Texture.fromFrame('Game1&2_FrameLight_100'));
        _this.half = new PIXI.Sprite(PIXI.Texture.fromFrame('Game1&2_FrameLight_50'));

        _this.bulb.anchor.set(0.5,0.5);
        _this.full.anchor.set(0.5,0.5);
        _this.half.anchor.set(0.5,0.5);

        _this.bulb.scale.set(0.5,0.5);
        _this.full.scale.set(0.5,0.5);
        _this.half.scale.set(0.5,0.5);

        _this.container.addChild(_this.bulb);
        _this.container.addChild(_this.full);
        _this.container.addChild(_this.half);

        _this.switch(0);
    }

    Light.prototype.switch = function (ammount) {
        var _this = this;

        switch (ammount) {
            case 0: {
                _this.full.visible = false;
                _this.half.visible = false;
                break;
            }
            case 50: {
                _this.full.visible = false;
                _this.half.visible = true;
                break;
            }
            default : {
                _this.full.visible = true;
                _this.half.visible = false;
                break;
            }
        }
    };

    Light.prototype.set = function (x,y) {
          var _this = this;
          _this.container.x = x;
          _this.container.y = y;
    };


    return Light;

});