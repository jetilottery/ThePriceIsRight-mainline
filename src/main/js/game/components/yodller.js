define(function(require) {

    var PIXI = require('com/pixijs/pixi');

    var IWLib = require('skbJet/componentManchester/standardIW/displayList');
    var IWOrientation = require('skbJet/componentManchester/standardIW/orientation');
    var IWSound = require('skbJet/componentManchester/standardIW/audio');
    var IWApp = require('skbJet/componentManchester/standardIW/app');

    require('com/gsap/TweenLite');
    var Tween = window.TweenLite;

    function Yodeller() {
        var _this = this;
        _this.sprite = new PIXI.Sprite(PIXI.Texture.fromFrame('Yodeller'));
        _this.startPoint = [135,IWOrientation.get() === IWOrientation.LANDSCAPE ? 550 : 570];
        _this.nextPoint = 0;
        _this.pointPassed = 1;
        _this.moving = false;
        _this.nextStep = 136;
        _this.falling = false;

        _this.pointsArray = [];

        _this.sprite.x = _this.startPoint[0];
        _this.sprite.y = _this.startPoint[1];

        _this.sprite.anchor.x = 0.5;
        _this.sprite.anchor.y = 0.5;

        IWLib['mountainStageContainer'].addChildAt(_this.sprite,3);

        IWApp.ticker.add(function () {
            if(_this.sprite.x >= 1265 && _this.sprite.x < 1325)  {
                _this.sprite.y = 135;
            }
            if(_this.sprite.x >= 1325) {
                _this.fall();
                _this.sprite.x = 1325;
                if(_this.sprite.y > 555) {
                    _this.sprite.y = 555;
                }
            }
        });
    }

    Yodeller.prototype.step = function() {
        var _this = this;

        var audio = [
            'climb',
            'climb2',
            'climb3',
        ];

        if(_this.sprite.x >= _this.nextStep) {
            if(_this.moving === true) {
                if(_this.pointPassed > 0 && _this.pointPassed < 25) {
                    _this.pointsArray[_this.pointPassed-1].step(_this.nextPoint);
                }
                var audioTarget = Math.floor((Math.random() * 2) + 1);
                IWSound.play(audio[audioTarget]);
                _this.nextStep = _this.nextStep+46;
                _this.pointPassed++;
            }
        }

    };

    Yodeller.prototype.moveTo = function (num, lastTurn, cb) {
        var _this = this;

        _this.nextPoint += Number(num);

        var target = {
            x:(46*num)+_this.sprite.x,
            y:_this.sprite.y+(-16.8*num),
        };

        if(!_this.moving) {
            _this.moving = true;
            IWLib['autoPlayStopButton'].enabled = !lastTurn;
            IWLib['autoPlayButtonContainer'].visible = !lastTurn;
            var duration = (target.x - _this.sprite.x) / 100;
            Tween.to(_this.sprite, duration,{
                delay:1,
                x: target.x,
                y: target.y,
                onComplete: function () {
                    _this.moving = false;
                    cb();
                }
            });
        }
    };

    Yodeller.prototype.reset = function () {
        var _this = this;
        
        _this.sprite.rotation = 0;
        _this.sprite.x = _this.startPoint[0];
        _this.sprite.y = _this.startPoint[1];
        _this.nextPoint = 0;
        _this.nextStep = 136;
        _this.moving = false;
        _this.falling = false;
        _this.pointPassed = 1;
    };

    Yodeller.prototype.fall = function () {
        var _this = this;
        if(_this.falling === false) {
            _this.falling = true;
            Tween.to(_this.sprite,1,{
                y:555,
                rotation:1.5,
                onComplete:function () {
                    IWSound.stop('cliffHangersMusic');
                    IWSound.play('mountainFall');
                }
            });
        }
    };

    return Yodeller;

});
