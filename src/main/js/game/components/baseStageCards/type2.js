define(function (require) {

    require('com/gsap/TweenMax');
    require('com/gsap/TimelineLite');
    var TweenMax = window.TweenMax;
    var TimeLine = window.TimelineLite;

    var PIXI = require('com/pixijs/pixi');
    var textStyles = require('game/display/textStyles');
    var IWSound = require('skbJet/componentManchester/standardIW/audio');
    var IWLib = require('skbJet/componentManchester/standardIW/displayList');
    var IWOrientation = require('skbJet/componentManchester/standardIW/orientation');
    var autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    // var particleConfig = require('game/config/particleConfig');

    require('com/pixijs/pixi-projection');
    require('com/pixijs/pixi-particles');

    var symbols = [
        "Camera",
        "Golf",
        "Guitar",
        "Headphones",
        "Helicopter",
        "Holiday",
        "Iron",
        "Motorbike",
        "Necklace",
        "Pan",
        "Ring",
        "Shades",
    ];

    function Card(card, group, revealCard, bonusContainer) {
        var _this = this;

        _this.group = group;
        _this.revealCard = revealCard;
        _this.animating = false;
        _this.card = card;
        _this.winningNumber = null;
        _this.winningTexture = null;
        _this.interact = null;
        _this.win = false;
        _this.winProccessed = false;
        _this.enabled = false;
        _this.bonusContainer = bonusContainer;
        _this.revealedBonusLocation = 0;
        _this.winRotationSpeed = 0.01;
        _this.ukgcAudio = false;

        function revealEvent() {
            _this.card.on('pointertap',function(ev) {
                if(ev.data.pointerType === 'mouse' && ev.data.button !== 0) {
                    return false;
                } else {
                    if(!autoPlay.enabled) {
                        _this.reveal(_this);
                    }
                }
            });
        }

        var doors = [];
        doors[0] = new PIXI.Sprite(PIXI.Texture.fromFrame('Games3&4_Door1'));
        doors[1] = new PIXI.Sprite(PIXI.Texture.fromFrame('Games3&4_Door2'));
        doors[2] = new PIXI.Sprite(PIXI.Texture.fromFrame('Games3&4_Door1'));
        doors[3] = new PIXI.Sprite(PIXI.Texture.fromFrame('Games3&4_Door2'));

        _this.card.frameBack = new PIXI.Sprite(PIXI.Texture.fromFrame('Games3&4_SymbolFrame'));
        _this.card.frameBack.name = 'SymbolFrame';
        _this.card.frameBack.x = -56;
        _this.card.frameBack.y = -3;
        _this.card.addChild(_this.card.frameBack);
        _this.card.frameBack.visible = false;

        var questionMarkSprite = new PIXI.Sprite(PIXI.Texture.fromFrame('Games3&4_QuestionMark'));
        questionMarkSprite.x -= 10;
        questionMarkSprite.y += 2;
        var prizeBackground = new PIXI.Sprite(PIXI.Texture.EMPTY);
        var prizeLabel = null;

        var doorMask = new PIXI.Graphics()
            .beginFill(0xfff,1)
            .drawRoundedRect(0,0,154,102,5)
            .endFill();


        var doorcard = new PIXI.Container();

        prizeBackground.anchor.set(0.5);

        this.winningTexture = new PIXI.Sprite(PIXI.Texture.fromFrame('BlueWinBurst'));
        this.winningTexture.anchor.x = 0.5;
        this.winningTexture.anchor.y = 0.5;
        this.winningTexture.scale.x = 0;
        this.winningTexture.scale.y = 0;
        this.winningTexture.x = 28;
        this.winningTexture.y = 50;

        _this.card.addChild(this.winningTexture);

        _this.card.addChild(prizeBackground);

        if(_this.revealCard) {
            prizeBackground.scale.set(0.8);
            prizeBackground.x = 22;
            prizeBackground.y = 34;

            prizeLabel = new PIXI.Text('0',textStyles['prizeTextLoseSmall']);
            prizeLabel.x = 24;
            prizeLabel.y = 82;
            prizeLabel.anchor.set(0.5);
            _this.revealNumber = prizeLabel.text;
            _this.card.addChild(prizeLabel);
        }
        else{
            prizeBackground.scale.set(1.1);
            prizeBackground.x = 26;
            prizeBackground.y = 52;
        }

        doorMask.x = -52;
        doorcard.mask = doorMask;

        _this.card.questionMarkSprite = questionMarkSprite;
        _this.card.doors = doors;
        _this.card.prizeLabel = prizeLabel;
        _this.card.prizeBackground = prizeBackground;
        _this.card.doorMask = doorMask;

        doors.forEach(function (element,index) {
            element.name = "door_"+index;
        });

        _this.card.doors[0].x = 63;
        _this.card.doors[1].x = 25;
        _this.card.doors[2].x = -14;
        _this.card.doors[3].x = -52;

        _this.card.bonusIcon_1 = new PIXI.Sprite(PIXI.Texture.fromFrame('CliffHangerIcon_Small'));
        _this.card.bonusIcon_2 = new PIXI.Sprite(PIXI.Texture.fromFrame('CliffHangerIcon_Small'));
        _this.card.wheel = new PIXI.Sprite(PIXI.Texture.fromFrame('ShowcaseShowdownIcon_Small'));

        _this.card.bonusIcon_1.x = 98;
        _this.card.bonusIcon_1.y = 15;
        _this.card.bonusIcon_1.anchor.x = 0.5;
        _this.card.bonusIcon_1.anchor.y = 0.5;
        _this.card.bonusIcon_1.rotation = -0.1;
        _this.card.bonusIcon_1.scale.x = 0;
        _this.card.bonusIcon_1.scale.y = 0;

        _this.card.bonusIcon_2.x = 98;
        _this.card.bonusIcon_2.y = 58;
        _this.card.bonusIcon_2.anchor.x = 0.5;
        _this.card.bonusIcon_2.anchor.y = 0.5;
        _this.card.bonusIcon_2.rotation = -0.1;
        _this.card.bonusIcon_2.scale.x = 0;
        _this.card.bonusIcon_2.scale.y = 0;

        _this.card.bonusIcon_1.visible = false;
        _this.card.bonusIcon_2.visible = false;

        _this.card.wheel.x = -31;
        _this.card.wheel.y = 18;
        _this.card.wheel.anchor.x = 0.5;
        _this.card.wheel.anchor.y = 0.5;
        _this.card.wheel.scale.x = 0;
        _this.card.wheel.scale.y = 0;

        _this.bonusContainer.addChild(_this.card.bonusIcon_1);
        _this.bonusContainer.addChild(_this.card.bonusIcon_2);
        _this.bonusContainer.addChild(_this.card.wheel);

        doorcard.addChild(doors[1]);
        doorcard.addChild(doors[2]);
        doorcard.addChild(doors[0]);
        doorcard.addChild(doors[3]);

        doorcard.addChild(doorMask);
        _this.card.addChild(doorcard);
        _this.card.addChild(questionMarkSprite);
        _this.card.interactive = true;

        _this.card.frame = new PIXI.Sprite(PIXI.Texture.fromFrame('Games3&4_SymbolFrame'));
        _this.card.frame.name = 'SymbolFrame';
        _this.card.frame.x = -56;
        _this.card.frame.y = -3;
        _this.card.addChild(_this.card.frame);

        _this.bonusContainer.position = _this.bonusContainer.toLocal(_this.card.toGlobal(new PIXI.Point(0,0)));

        revealEvent(_this.card);
    }

    Card.prototype.animate = function () {
        var _this = this;

        var timeline = new TimeLine({
            onComplete: function() {
                _this.card.frame.visible = false;
                _this.card.frameBack.visible = true;
            }
        });

        timeline.to(_this.card.questionMarkSprite,0.25,{
            alpha:0,
        },0);
        timeline.to(_this.card.doors[0],0.4,{
            x:105
        },0.1);
        timeline.to(_this.card.doors[3],0.4,{
            x:-90
        },0.1);
        timeline.to(_this.card.doors[2],0.6,{
            x:-90
        },0.1);
        timeline.to(_this.card.doors[1],0.6,{
            x:105
        },0.1);

    };

    Card.prototype.reveal = function() {
        var _this = this;
        if(_this.enabled) {
            _this.card.interactive = false;
            IWSound.playSequential('revealSymbol');
            _this.animating = true;
            _this.interact();
            _this.enable(false);
        }
    };

    Card.prototype.setWin = function () {
        var _this = this;
        _this.showWinPresentation();
        _this.win = true;
        if(_this.revealCard) {
            _this.card.prizeLabel.style = textStyles['prizeTextWinSmall'];
            _this.card.prizeLabel.scale.set(
                Math.min(150 / _this.card.prizeLabel.texture.orig.width, 1)
            );
            return true;
        }
    };

    Card.prototype.setPrizeLabel = function(v) {
        this.card.prizeLabel.text = v;
        this.card.prizeLabel.updateText();
        this.card.prizeLabel.scale.set(
            Math.min(150 / this.card.prizeLabel.texture.orig.width, 1)
        );
    };

    Card.prototype.activeBonusParticles = function(type,animationsArray,cb,cliffTarget,amount) {
        var _this = this;
        var speed = 1;
        var particleContainer = new PIXI.Container();
        var particleContainer_2 = new PIXI.Container();
        var target;

        _this.particleSprite = new PIXI.Sprite();
        _this.particleSprite.rotation = -0.15;
        _this.particleSprite.scale.set(0.7);

        particleContainer.addChild(_this.particleSprite);
        _this.bonusContainer.addChild(particleContainer,particleContainer_2);

        particleContainer.y = 0;
        particleContainer_2.y = 0;

        if(type==="cliff") {
            particleContainer.x = IWOrientation.get() === 'landscape' ? 0 : 60;
            _this.particleSprite.texture = PIXI.Texture.fromFrame('CliffHangerIcon_Small');
            target = particleContainer.toLocal(IWLib['bonus_meter_container'].toGlobal({
                x:cliffTarget().target.x,
                y:cliffTarget().target.y
            }));
            if(amount === 2) {
                var target_2;

                _this.particleSprite_2 = new PIXI.Sprite();
                _this.particleSprite_2.rotation = -0.15;
                _this.particleSprite_2.scale.set(0.7);

                particleContainer_2.addChild(_this.particleSprite_2);

                particleContainer_2.x = IWOrientation.get() === 'landscape' ? 0 : 60;
                _this.particleSprite_2.texture = PIXI.Texture.fromFrame('CliffHangerIcon_Small');
                target_2 = particleContainer_2.toLocal(IWLib['bonus_meter_container'].toGlobal({
                    x:cliffTarget().target_2.x,
                    y:cliffTarget().target_2.y
                }));

                TweenMax.to(particleContainer_2,speed,{
                    x:target_2.x,
                    y:target_2.y,
                    onComplete:function () {
                        particleContainer_2.removeChild(_this.particleSprite_2);
                    }
                });
            }

        } else {
            particleContainer.x = IWOrientation.get() === 'landscape' ? -120 : -80;
            _this.particleSprite.texture = PIXI.Texture.fromFrame('ShowcaseShowdownIcon_Small');
            target = particleContainer.toLocal(IWLib['wheel_meter_container'].toGlobal({
                x:IWOrientation.get() === 'landscape' ? -65 : -50,
                y:IWOrientation.get() === 'landscape' ? 65 : 35,
            }));
        }

        TweenMax.to(particleContainer,speed,{
            x:target.x,
            y:target.y,
            onComplete:function () {
                particleContainer.removeChild(_this.particleSprite);
                cb();
            }
        });
        var t1 = new TimeLine();

        t1.to(_this.particleSprite.scale,speed/2,{x:2,y:2},0);
        t1.to(_this.particleSprite.scale,speed/2,{x:0.7,y:0.7},speed/2);
        t1.to(_this.particleSprite,speed/2,{alpha:0},speed-0.2);
        if(amount === 2) {
            t1.to(_this.particleSprite_2.scale,speed/2,{x:2,y:2},0);
            t1.to(_this.particleSprite_2.scale,speed/2,{x:0.7,y:0.7},speed/2);
            t1.to(_this.particleSprite_2,speed/2,{alpha:0},speed-0.2);
        }
        t1.play();

        return true;
    };

    Card.prototype.showWinPresentation = function () {
        var _this = this;
        if (_this.winningAnimationPlaying === false) {
            if (_this.winningTexture.visible === true) {
                TweenMax.to(_this.winningTexture.scale, 0.5, {
                    x: 1,
                    y: 1,
                    onComplete: function () {
                        if(!_this.ukgcAudio) {
                            if(!IWSound.isPlaying('match')) {
                                IWSound.play('match');
                            }
                        } else {
                            if(!IWSound.isPlaying('ding')) {
                                IWSound.play('ding');
                            }
                        }
                        TweenMax.to(_this.winningTexture.scale, 0.5, {
                            x: 0.7,
                            y: 0.7,
                            yoyo: true,
                            ease: window.ElasticInOut(),
                        });
                    }
                });
                _this.winningAnimationPlaying = true;
            }
        }
    };

    Card.prototype.setSymbol = function(num) {
        this.card.prizeBackground.texture = PIXI.Texture.fromFrame(symbols[num]);
    };

    Card.prototype.enable = function(enable){
        var _this = this;
        _this.enabled = enable;
    };

    Card.prototype.reset = function () {
        var _this = this;
        TweenMax.killTweensOf(_this.winningTexture.scale);
        _this.animating = false;
        _this.winningNumber = null;
        _this.win = false;
        _this.winProccessed = false;
        _this.winningAnimationPlaying = false;
        _this.winningTexture.scale.x = 0;
        _this.winningTexture.scale.y = 0;
        _this.card.interactive = true;
        _this.card.bonusIcon_1.visible = false;
        _this.card.bonusIcon_2.visible = false;
        _this.card.bonusIcon_1.scale.x = 0;
        _this.card.bonusIcon_1.scale.y = 0;
        _this.card.bonusIcon_2.scale.x = 0;
        _this.card.bonusIcon_2.scale.y = 0;
        _this.card.wheel.scale.x = 0;
        _this.card.wheel.scale.y = 0;
        _this.card.doors[0].x = 63;
        _this.card.doors[1].x = 25;
        _this.card.doors[2].x = -14;
        _this.card.doors[3].x = -52;
        _this.card.questionMarkSprite.alpha = 1;
        _this.revealedBonusLocation = 0;
        _this.winRotationSpeed = 0.01;
        _this.ukgcAudio = false;
        _this.enable(false);
        if(_this.card.prizeLabel !== null) {
            _this.card.prizeLabel.text = " ";
            _this.card.prizeLabel.style = textStyles['prizeTextLoseSmall'];
        }

    };
    return Card;
});
