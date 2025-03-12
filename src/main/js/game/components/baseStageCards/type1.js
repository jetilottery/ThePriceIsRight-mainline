define(function (require) {

    require('com/gsap/TweenMax');
    require('com/gsap/TimelineLite');
    var TweenMax = window.TweenMax;
    var TimeLine = window.TimelineLite;

    var PIXI = require('com/pixijs/pixi');

    var textStyles = require('game/display/textStyles');
    var IWSound = require('skbJet/componentManchester/standardIW/audio');
    var IWLib = require('skbJet/componentManchester/standardIW/displayList');
    var autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    var IWOrientation = require('skbJet/componentManchester/standardIW/orientation');
    // var particleConfig = require('game/config/particleConfig');

    require('com/pixijs/pixi-projection');
    require('com/pixijs/pixi-particles');

    function Card(container, group, revealCard, bonusContainer) {
        var _this = this;

        _this.group = group;
        _this.revealCard = revealCard;
        _this.animating = false;
        _this.card = null;
        _this.win = false;
        _this.winningNumber = null;
        _this.winningTexture = null;
        _this.interact = null;
        _this.container = null;
        _this.frame = null;
        _this.camera = null;
        _this.graphicsContainer = null;
        _this.bonusContainer = bonusContainer;
        _this.enabled = false;
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

        _this.graphicsContainer = new PIXI.projection.Container3d();

        if (_this.group === 1) {
            _this.card = new PIXI.projection.Sprite3d(PIXI.Texture.fromFrame('Game1_BoatSymbol'));
        }
        if (_this.group === 2) {
            _this.card = new PIXI.projection.Sprite3d(PIXI.Texture.fromFrame('Game2_CarSymbol'));
        }
        _this.card.frame = new PIXI.Sprite(PIXI.Texture.fromFrame('Games1&2_SymbolFrame'));
        _this.card.frame.name = 'SymbolFrame';
        _this.card.frame.x =- 112;
        _this.card.frame.y =- 54;
        _this.card.frame.visible = false;
        _this.graphicsContainer.addChild(_this.card.frame);

        var text = new PIXI.projection.Text3d(null, textStyles['prizeTextLose']);

        _this.winningTexture = new PIXI.Sprite(PIXI.Texture.fromFrame('OrangeWinBurst'));
        _this.winningTexture.anchor.x = 0.5;
        _this.winningTexture.anchor.y = 0.5;
        _this.winningTexture.scale.x = 0;
        _this.winningTexture.scale.y = 0;
        _this.graphicsContainer.addChild(this.winningTexture);

        _this.graphicsContainer.addChild(text);
        _this.card.prizeLabel = text;
        _this.card.revealed = false;

        _this.card.bonusIcon_1 = new PIXI.Sprite(PIXI.Texture.fromFrame('CliffHangerIcon_Small'));
        _this.card.bonusIcon_2 = new PIXI.Sprite(PIXI.Texture.fromFrame('CliffHangerIcon_Small'));
        _this.card.wheel = new PIXI.Sprite(PIXI.Texture.fromFrame('ShowcaseShowdownIcon_Small'));

        _this.card.bonusIcon_1.x = IWOrientation.get() === 'landscape' ? 91: 95;
        _this.card.bonusIcon_1.y = IWOrientation.get() === 'landscape' ? 18: 10;
        _this.card.bonusIcon_1.anchor.x = 0.5;
        _this.card.bonusIcon_1.anchor.y = 0.5;
        _this.card.bonusIcon_1.rotation = -0.1;
        _this.card.bonusIcon_1.scale.x = 0;
        _this.card.bonusIcon_1.scale.y = 0;

        _this.card.bonusIcon_2.x = IWOrientation.get() === 'landscape' ? 91: 95;
        _this.card.bonusIcon_2.y = IWOrientation.get() === 'landscape' ? 58: 50;
        _this.card.bonusIcon_2.anchor.x = 0.5;
        _this.card.bonusIcon_2.anchor.y = 0.5;
        _this.card.bonusIcon_2.rotation = -0.1;
        _this.card.bonusIcon_2.scale.x = 0;
        _this.card.bonusIcon_2.scale.y = 0;

        _this.card.bonusIcon_1.visible = false;
        _this.card.bonusIcon_2.visible = false;

        _this.card.wheel.x = -98;
        _this.card.wheel.y = 10;
        _this.card.wheel.anchor.x = 0.5;
        _this.card.wheel.anchor.y = 0.5;
        _this.card.wheel.scale.x = 0;
        _this.card.wheel.scale.y = 0;

        _this.bonusContainer.addChild(_this.card.bonusIcon_1);
        _this.bonusContainer.addChild(_this.card.bonusIcon_2);
        _this.bonusContainer.addChild(_this.card.wheel);

        _this.card.addChild(_this.graphicsContainer);

        text.anchor.x = 0.5;
        text.anchor.y = 0.5;
        text.euler.z = 3.14;
        text.euler.y = 3.14;
        text.visible = false;

        _this.card.anchor.x = 0.5;
        _this.card.anchor.y = 0.5;

        _this.card.x = container.x;
        _this.card.y = container.y;

        _this.card.animating = false;
        _this.card.interactive = true;

        _this.bonusContainer.x = IWOrientation.get() === 'landscape' ? _this.card.x+408: _this.card.x-168;
        _this.bonusContainer.y = IWOrientation.get() === 'landscape' ? _this.card.y+60: _this.card.y+214;

        _this.revealNumber = text.text;
        revealEvent(_this.card);
    }

    Card.prototype.animate = function () {
        var _this = this;
        if (_this.animating) {
            _this.card.euler.x += 0.2;
            if (_this.card.euler.x > 1.55) {
                _this.card.prizeLabel.visible = true;
                _this.card.texture = PIXI.Texture.fromFrame('Game1&2_RevealedState');
            }
            if (_this.card.euler.x > 3.14) {
                _this.frame.visible = false;
                _this.card.frame.visible = true;
                _this.animating = false;
            }
        }
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

    Card.prototype.enable = function(enable){
        var _this = this;
        _this.enabled = enable;
    };

    Card.prototype.setWin = function () {
        var _this = this;
        _this.win = true;
        _this.card.prizeLabel.style = textStyles['prizeTextWin'];
        _this.showWinPresentation();
        return true;
    };

    Card.prototype.setPrizeLabel = function(v) {
        this.card.prizeLabel.text = v;
        this.card.prizeLabel.updateText();
        this.card.prizeLabel.scale.set(
            Math.min(200 / this.card.prizeLabel.texture.orig.width, 1)
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
            particleContainer.x = IWOrientation.get() === 'landscape' ? -120 : -150;
            particleContainer.y = IWOrientation.get() === 'landscape' ? 0 : -10;
            _this.particleSprite.texture = PIXI.Texture.fromFrame('ShowcaseShowdownIcon_Small');
            target = particleContainer.toLocal(IWLib['wheel_meter_container'].toGlobal({
                x:IWOrientation.get() === 'landscape' ? -65 : -120,
                y:IWOrientation.get() === 'landscape' ? 65 : 25,
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
                    x: 1,
                    y: 1,
                    onComplete: function () {
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

    Card.prototype.reset = function () {
        var _this = this;
        TweenMax.killTweensOf(_this.winningTexture.scale);
        _this.animating = false;
        _this.winningNumber = null;
        _this.winningAnimationPlaying = false;
        _this.winningTexture.scale.x = 0;
        _this.winningTexture.scale.y = 0;
        _this.win = false;
        _this.card.interactive = true;
        _this.card.bonusIcon_1.visible = false;
        _this.card.bonusIcon_2.visible = false;
        _this.card.bonusIcon_1.scale.x = 0;
        _this.card.bonusIcon_1.scale.y = 0;
        _this.card.bonusIcon_2.scale.x = 0;
        _this.card.bonusIcon_2.scale.y = 0;
        _this.card.wheel.scale.x = 0;
        _this.card.wheel.scale.y = 0;
        _this.card.euler.x = 0;
        _this.enable(false);
        _this.card.texture = _this.group === 1 ? PIXI.Texture.fromFrame('Game1_BoatSymbol') : PIXI.Texture.fromFrame('Game2_CarSymbol');
        _this.revealedBonusLocation = 0;
        _this.winRotationSpeed = 0.01;
        _this.ukgcAudio = false;
        if (_this.card.prizeLabel !== null) {
            _this.card.prizeLabel.visible = false;
            _this.card.prizeLabel.style = textStyles['prizeTextLose'];
        }

    };
    return Card;
});
