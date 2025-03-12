define(function (require) {
    var IWLib = require('skbJet/componentManchester/standardIW/displayList');
    var IWOrientation = require('skbJet/componentManchester/standardIW/orientation');
    var textStyles = require('game/display/textStyles');
    var PIXI = require('com/pixijs/pixi');
    var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    var IWSound = require('skbJet/componentManchester/standardIW/audio');

    require('com/gsap/TimelineLite');
    var TimeLine = window.TimelineLite;
    var ease = require('com/gsap/easing/EasePack');

    function mountainPrizeBox(targetBox) {
        var _this = this;
        _this.sprite = IWLib[targetBox];
        _this.associatedPoints = [];
        _this.prizeValue = null;
        _this.container = new PIXI.Container();
        _this.arrowContainer = new PIXI.Container();
        _this.smallPrizeBox = null;
        _this.smallPrizeHeader = null;
        _this.smallPrizeHeaderLabel = null;
        _this.smallPrizeContainer = null;
        _this.timeLine = new TimeLine();
        _this.arrows = {
            top:[],
            bottom:[]
        };
        _this.amount = 0;
        _this.winAmmount = 0;
        _this.startingPoint;
        _this.offset = -5;
        _this.originPos = _this.sprite.position;
        _this.label = null;

        _this.container.name = 'mountainPrizeBox';

        IWLib['mountainStageContainer'].addChild(_this.container);

        for(var i = 0; i<5;i++) {
                var spriteUp = new PIXI.Sprite(PIXI.Texture.fromFrame("ValueMeterArrowOff"));
                _this.arrowContainer.addChild(spriteUp);
                spriteUp.position.set(-128+(46*i),-50);
                _this.arrows.top.push(spriteUp);

                var spriteDown = new PIXI.Sprite(PIXI.Texture.fromFrame("ValueMeterArrowOff"));
                _this.arrowContainer.addChild(spriteDown);
                spriteDown.scale.y = -1;
                spriteDown.position.set(-128+(46*i),50);
                _this.arrows.bottom.push(spriteDown);

            if(IWOrientation.get()==='portrait') {
                spriteUp.alpha = 0;
                spriteDown.alpha = 0;
            }
        }

        _this.arrowContainer.position.set(_this.sprite.x,_this.sprite.y);


        _this.container.addChild(_this.arrowContainer);
        _this.container.addChild(_this.sprite);


        _this.prizeValue = new PIXI.Text('',textStyles['mountainPrize']);
        _this.prizeValue.anchor.set(0.5);
       if(IWOrientation.get()==='landscape') {
           _this.prizeValue.position.set(0,0);
       }else{
           _this.prizeValue.position.set(240,60);

           _this.smallPrizeContainer = new PIXI.Container();
           _this.smallPrizeContainer.name = 'smallPrizeContainer';

           _this.smallPrizeBox = new PIXI.Sprite(PIXI.Texture.EMPTY);
           _this.smallPrizeHeader = new PIXI.Sprite(PIXI.Texture.EMPTY);
           _this.smallPrizeHeaderLabel = new PIXI.Text("",textStyles['mountainPrize']);
           _this.smallPrizeBox.anchor.set(0.5);
           _this.smallPrizeHeader.anchor.set(0.5);
           _this.smallPrizeHeaderLabel.anchor.set(0.5);

           _this.smallPrizeContainer.addChild(_this.smallPrizeBox);
           _this.smallPrizeContainer.addChild(_this.smallPrizeHeader);
           _this.smallPrizeHeader.addChild(_this.smallPrizeHeaderLabel);
           _this.smallPrizeContainer.scale.set(1.6);

           IWLib['mountainStageContainer'].addChild(_this.smallPrizeContainer);

       }
        _this.sprite.addChild(_this.prizeValue);
    }

    mountainPrizeBox.prototype.shift = function(startIndex,last) {
        var _this = this;
        if(IWOrientation.get()==='landscape') {
            _this.sprite.x = 282 + (46 * startIndex);
            _this.arrowContainer.position = _this.sprite.position;
            _this.arrows.top.forEach(function (element, index) {
                if (index < _this.associatedPoints.length) {
                    element.visible = true;
                } else {
                    element.visible = false;
                }
            });
            _this.arrows.bottom.forEach(function (element, index) {
                if (index < _this.associatedPoints.length) {
                    element.visible = true;
                } else {
                    element.visible = false;
                }
            });

            if (last !== void(0)) {
                _this.arrows.top.forEach(function (element, index) {
                    if (index < 4) {
                        element.visible = false;
                    } else {
                        element.visible = true;
                    }
                });
                _this.arrows.bottom.forEach(function (element, index) {
                    if (index < 4) {
                        element.visible = false;
                    } else {
                        element.visible = true;
                    }
                });
            }
        }

        if(IWOrientation.get()==='portrait') {
            _this.smallPrizeHeader.texture = PIXI.Texture.fromFrame('port_ValueMeterOff');

            var smallTextureArray = [
                'ValueMeter_3Off',
                'ValueMeter_4Off',
                'ValueMeter_5Off'
            ];

            var smallTextureArrayPointer = function()  {
                switch (_this.associatedPoints.length) {
                    case 3: {
                        return PIXI.Texture.fromFrame(smallTextureArray[0]);
                    }
                    case 4: {
                        return PIXI.Texture.fromFrame(smallTextureArray[1]);
                    }
                    case 5: {
                        return PIXI.Texture.fromFrame(smallTextureArray[2]);
                    }
                    default : {
                        return PIXI.Texture.EMPTY;
                    }
                }
            };

            _this.smallPrizeBox.texture = smallTextureArrayPointer();
            _this.smallPrizeContainer.x = (150 + (46 * startIndex)) + ((46 * _this.associatedPoints.length) / 2);

            if(last !== void(0)) {
                _this.smallPrizeContainer.x = 1276;
            }
        }

    };

    mountainPrizeBox.prototype.setPrizeValue = function(value) {
        var _this = this;
        _this.amount = Number(value);
        _this.prizeValue.text = SKBeInstant.formatCurrency({amount:value}).formattedAmount;
    };

    mountainPrizeBox.prototype.setToWin = function(point,last) {
        var _this = this;
        _this.winAmmount = _this.amount;
        _this.sprite.texture = IWOrientation.get() === 'landscape' ? PIXI.Texture.fromFrame('ValueMeterOn') : PIXI.Texture.fromFrame('CHWinMeterOn');

        var tweenTargets = IWOrientation.get() === 'landscape' ?
            [_this.sprite,_this.prizeValue] :
            [_this.smallPrizeHeader,_this.prizeValue];

        tweenTargets.forEach(function (e) {
            _this.timeLine.to(e.scale,0.2,{
                x:1.5,
                y:1.5
            },0);
            _this.timeLine.to(e.scale,0.2,{
                ease: ease.Back.easeOut.config(1.7),
                x:1,
                y:1
            },0.2);
        });
        if(IWOrientation.get() === 'portrait') {
            [_this.sprite].forEach(function (e) {
                _this.timeLine.to(e.scale,0.2,{
                    x:2,
                    y:2
                },0);
                _this.timeLine.to(e.scale,0.2,{
                    ease: ease.Back.easeOut.config(1.7),
                    x:1.66,
                    y:1.66
                },0.2);
            });
        }

        if(IWOrientation.get()==='portrait') {

            var smallTextureArray = [
                'ValueMeter_3On',
                'ValueMeter_4On',
                'ValueMeter_5On'
            ];

            var smallTextureArrayPointer = function() {
                switch (_this.associatedPoints.length) {
                    case 3: {
                        return PIXI.Texture.fromFrame(smallTextureArray[0]);
                    }
                    case 4: {
                        return PIXI.Texture.fromFrame(smallTextureArray[1]);
                    }
                    case 5: {
                        return PIXI.Texture.fromFrame(smallTextureArray[2]);
                    }
                    default : {
                        return PIXI.Texture.EMPTY;
                    }
                }
            };

            _this.smallPrizeBox.texture = smallTextureArrayPointer();
            _this.smallPrizeHeader.texture = PIXI.Texture.fromFrame('port_ValueMeterOn');
        }

        if(last===void(0)) {
            _this.arrows.top[_this.associatedPoints.indexOf(point)].texture = PIXI.Texture.fromFrame('ValueMeterArrowOn');
            _this.arrows.bottom[_this.associatedPoints.indexOf(point)].texture = PIXI.Texture.fromFrame('ValueMeterArrowOn');
        } else {
            _this.arrows.top[4].texture = PIXI.Texture.fromFrame('ValueMeterArrowOn');
            _this.arrows.bottom[4].texture = PIXI.Texture.fromFrame('ValueMeterArrowOn');
        }

        if(_this.associatedPoints.indexOf(24) !== -1) {
            IWSound.stop('cliffHangersMusic');
            IWSound.play('play');
        } else {
            IWSound.play('match');
        }
    };

    mountainPrizeBox.prototype.reset = function () {
        var _this = this;
        _this.sprite.texture = IWOrientation.get() === 'landscape' ? PIXI.Texture.fromFrame('ValueMeterOff') : PIXI.Texture.fromFrame('CHWinMeterOff');
        _this.associatedPoints = [];
        _this.prizeValue.text = 0;
        _this.winAmmount = 0;
        _this.amount = 0;

        if(IWOrientation.get()==='portrait') {
            _this.smallPrizeHeader.texture = PIXI.Texture.fromFrame('port_ValueMeterOff');

            var smallTextureArray = [
                'ValueMeter_3Off',
                'ValueMeter_4Off',
                'ValueMeter_5Off'
            ];

            var smallTextureArrayPointer = function () {
                switch (_this.associatedPoints.length) {
                    case 3: {
                        return PIXI.Texture.fromFrame(smallTextureArray[0]);
                    }
                    case 4: {
                        return PIXI.Texture.fromFrame(smallTextureArray[1]);
                    }
                    case 5: {
                        return PIXI.Texture.fromFrame(smallTextureArray[2]);
                    }
                    default : {
                        return PIXI.Texture.EMPTY;
                    }
                }
            };
            _this.smallPrizeBox.texture = smallTextureArrayPointer();
        }

        _this.arrows.top.forEach(function (element) {
            element.texture = PIXI.Texture.fromFrame("ValueMeterArrowOff");
        });
        _this.arrows.bottom.forEach(function (element) {
            element.texture = PIXI.Texture.fromFrame("ValueMeterArrowOff");
        });
    };

    return mountainPrizeBox;


});
