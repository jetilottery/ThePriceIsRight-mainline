define(function (require) {
    var IWLib = require('skbJet/componentManchester/standardIW/displayList');
    var IWOrientation = require('skbJet/componentManchester/standardIW/orientation');
    var PIXI = require('com/pixijs/pixi');
    var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');

    require('com/gsap/TweenLite');
    var TimelineLite = require('com/gsap/TimelineLite');

    var symbols = {
        2:'Win2x',
        3:'Win3x',
        5:'Win5x',
        10:'Win10x',
        25:'Win25x',
        100:'Win100x'
    };

    var AltWin = {
        fontFamily : 'oswald',
        fontSize: 120,
        fontWeight:600,
        fill : 0xFAD814,
        align : 'center',
        miterLimit: 28,
        strokeThickness: 5
    };

    function ShowCaseScreen(cb,anim) {
        var _this = this;
        _this.value = IWLib['ShowCaseMultiDisplay'];
        _this.graphic = anim.header;
        _this.sub = anim.sub;
        _this.end = cb;

        _this.total = 0;
        _this.multi = 0;

        _this.mergePos = [520,400];

        if(SKBeInstant.formatCurrency(0).formattedAmount[0] === '£' || SKBeInstant.formatCurrency(0).formattedAmount[0] === '€') {
            _this.totalScoreValue = new PIXI.extras.BitmapText("", {font: "120px WinValueFont-export", align: "left"});
            _this.scoreValue = new PIXI.extras.BitmapText("", {font: "120px WinValueFont-export", align: "left"});
        } else {
            _this.totalScoreValue = new PIXI.Text("", AltWin);
            _this.scoreValue = new PIXI.Text("", AltWin);
        }


        _this.totalScoreValue.anchor.set(0.5);
        _this.scoreValue.anchor.set(0.5);

        if(IWOrientation.get() === 'landscape') {

            _this.scoreValue.position.set(520,240);

            if(SKBeInstant.formatCurrency(0).formattedAmount[0] === '£' || SKBeInstant.formatCurrency(0).formattedAmount[0] === '€') {
                _this.totalScoreValue.position.set(520,500);
                _this.mergePos = [520,400];

            } else {
                _this.totalScoreValue.position.set(520,460);
                _this.mergePos = [520,360];

            }
        } else {
            _this.value.position.set(0,-70);

            if(SKBeInstant.formatCurrency(0).formattedAmount[0] === '£' || SKBeInstant.formatCurrency(0).formattedAmount[0] === '€') {
                _this.totalScoreValue.position.set(0,40);
                _this.mergePos = [0,0];
            } else {
                _this.totalScoreValue.position.set(0,20);
                _this.mergePos = [0,-30];
            }

            _this.totalScoreValue.scale.set(0.7,0.7);
            _this.value.scale.set(0.6,0.6);

        }



        IWLib['WheelFrame_Right'].addChild(_this.totalScoreValue);
        IWLib['WheelFrame_Right'].addChild(_this.scoreValue);

        _this.totalScoreValue.alpha = 0;
        _this.scoreValue.alpha = 0;
        _this.value.alpha = 0;
        _this.timeLine = null;
    }

    ShowCaseScreen.prototype.playTimeLine = function() {
        var _this = this;
        _this.timeLine = new TimelineLite({
            delay:IWOrientation.get() === 'landscape' ? 2: 1,
            onComplete: function () {
                _this.end();
            }
        });

        var merge = IWOrientation.get() === 'landscape' ? 0.5 : 0;

        _this.timeLine.to(_this.graphic,0.5,{
            alpha:0
        },merge);

        _this.timeLine.to(_this.value,0.5,{
            alpha:1
        },merge);


        _this.timeLine.to(_this.value,0.5,{
            alpha:0,
            x:_this.mergePos[0],
            y:_this.mergePos[1]
        },1 + merge);

        _this.timeLine.to(_this.value.scale,0.2,{
            x:0,
            y:0
        },1.2 + merge);

        _this.timeLine.to(_this.totalScoreValue,0.5,{
            x:_this.mergePos[0],
            y:_this.mergePos[1]
        },1 + merge);

        _this.timeLine.to(_this.totalScoreValue.scale,0.2,{
            x:0,
            y:0,
            onComplete:function () {
                var updatedScore = _this.total*_this.multi;

                _this.totalScoreValue.alpha = 1;
                _this.totalScoreValue.text = SKBeInstant.formatCurrency({amount:updatedScore}).formattedAmount;
            }
        },1.2 + merge);

        _this.timeLine.to(_this.totalScoreValue.scale,0.2,{
            x:1.5,
            y:1.5,
        },1.5 + merge);

        _this.timeLine.to(_this.totalScoreValue.scale,0.2,{
            x:Math.min(380 / (_this.totalScoreValue.width / _this.totalScoreValue.scale.x), 1),
            y:Math.min(380 / (_this.totalScoreValue.width / _this.totalScoreValue.scale.x), 1)
        },1.8 + merge);

    };

    ShowCaseScreen.prototype.setValue = function (val,total) {
        var _this = this;

        _this.timeLine = new TimelineLite();

        _this.total = total;
        _this.multi = val;

        _this.value.texture = PIXI.Texture.fromFrame(symbols[val]);

        _this.scoreValue.text = val;
        _this.totalScoreValue.text = SKBeInstant.formatCurrency({amount:total}).formattedAmount;

        _this.timeLine.to(_this.sub,0.5,{
            alpha:0
        },0);

        if(IWOrientation.get() === 'portrait') {
            _this.timeLine.to(_this.graphic,0.5,{
                alpha:0
            },0);
        }

        _this.timeLine.to(_this.totalScoreValue,0.5,{
            alpha:1
        },0);
    };

    ShowCaseScreen.prototype.reset = function () {
        var _this = this;
        _this.value.alpha = 0;
        _this.value.scale.set(1);
        _this.graphic.alpha = 1;
        _this.sub.alpha = 1;
        _this.totalScoreValue.alpha = 0;
        _this.scoreValue.alpha = 0;

        _this.total = 0;
        _this.multi = 0;

        if(IWOrientation.get() === 'landscape') {
            _this.value.position.set(520,310);
            if(SKBeInstant.formatCurrency(0).formattedAmount[0] === '£' || SKBeInstant.formatCurrency(0).formattedAmount[0] === '€') {
                _this.totalScoreValue.position.set(520,500);
            } else {
                _this.totalScoreValue.position.set(520,460);
            }
        } else {
            if(SKBeInstant.formatCurrency(0).formattedAmount[0] === '£' || SKBeInstant.formatCurrency(0).formattedAmount[0] === '€') {
                _this.totalScoreValue.position.set(0,40);
            } else {
                _this.totalScoreValue.position.set(0,20);
            }
            _this.totalScoreValue.position.set(0,40);
            _this.value.position.set(0,-70);
            _this.totalScoreValue.scale.set(0.7,0.7);
            _this.value.scale.set(0.6,0.6);
        }

        _this.totalScoreValue.text = "";
        _this.value.texture = PIXI.Texture.EMPTY;
        _this.timeLine = null;
    };

    return ShowCaseScreen;
});