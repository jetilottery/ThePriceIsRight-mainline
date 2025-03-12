define(function (require) {
    var IWLib = require('skbJet/componentManchester/standardIW/displayList');
    var IWOrientation = require('skbJet/componentManchester/standardIW/orientation');
    var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    var PIXI = require('com/pixijs/pixi');
    var TimelineLite = require('com/gsap/TimelineLite');
    require('com/gsap/plugins/PixiPlugin');
    var transitionPlaque, youHaveWonText, YouHaveWonValue, youHaveWonText_2, YouHaveWonValue_2, baseGameLogo,
        mountainGameLogo, transitionResult, playingNextText, orientation, scoreData, runningValue;
    var bonusFrame, bonusPlaque, cliffImage, hangersImage, showcaseImage, showdownImage;

    var cMatrix, cMatrix_2;

    var PlayingNextTexture;
    var ease = require('com/gsap/easing/EasePack');

    require('com/gsap/TweenLite');
    var Tween = window.TweenLite;

    var textStyle = {
        fontFamily: 'oswald',
        fontSize: 60,
        fontWeight: 600,
        fill: 0xFFFFFF,
        align: 'center'
    };

    var AltWin = {
        fontFamily: 'oswald',
        fontSize: 120,
        fontWeight: 600,
        fill: 0xFAD814,
        align: 'center',
        miterLimit: 28,
        strokeThickness: 5
    };

    var textures = {
        base: 'TPIRlogo',
        mountain: {
            A: 'CH1_Big', B: 'CH2_Big'
        },
        wheel: {
            A: 'SS2_Big', B: 'SS1_Big'
        },
    };

    var totalBaseGameScore = 0;

    function init() {

        if (SKBeInstant.formatCurrency(0).formattedAmount[0] === '£' || SKBeInstant.formatCurrency(0).formattedAmount[0] === '€') {
            YouHaveWonValue = new PIXI.extras.BitmapText("", {font: "120px WinValueFont-export", align: "left"});
            YouHaveWonValue_2 = new PIXI.extras.BitmapText("", {font: "120px WinValueFont-export", align: "left"});
        } else {
            YouHaveWonValue = new PIXI.Text('', AltWin);
            YouHaveWonValue_2 = new PIXI.Text('', AltWin);
        }

        youHaveWonText = IWLib['transitionYouHaveWonText'];
        youHaveWonText_2 = IWLib['transitionYouHaveWonText_2'];
        orientation = IWOrientation.get();
        transitionPlaque = IWLib['transitionPlaque'];
        baseGameLogo = IWLib['transitionBaseGameTexture'];
        mountainGameLogo = IWLib['transitionMountainGameTexture'];
        transitionResult = IWLib['transitionResult'];
        playingNextText = IWLib['transitionPlayingNextText'];
        PlayingNextTexture = IWLib['transitionPlayingNextTexture'];

        YouHaveWonValue.anchor.set(0.5);
        YouHaveWonValue_2.anchor.set(0.5);

        IWLib['transitionYouHaveWonValue'].addChild(YouHaveWonValue);
        IWLib['transitionYouHaveWonValue_2'].addChild(YouHaveWonValue_2);

        youHaveWonText.visible = true;
        YouHaveWonValue.visible = true;
        youHaveWonText_2.visible = false;
        YouHaveWonValue_2.visible = false;
        playingNextText.visible = false;
        PlayingNextTexture.visible = false;
        baseGameLogo.visible = false;
        mountainGameLogo.visible = false;

        bonusPlaque = new PIXI.Container();
        bonusFrame = new PIXI.Sprite(PIXI.Texture.fromFrame('SSFrame'));
        cliffImage = new PIXI.Sprite(PIXI.Texture.fromFrame('CH_1'));
        hangersImage = new PIXI.Sprite(PIXI.Texture.fromFrame('CH_2'));
        showcaseImage = new PIXI.Sprite(PIXI.Texture.fromFrame('SS_1'));
        showdownImage = new PIXI.Sprite(PIXI.Texture.fromFrame('SS_2'));

        bonusPlaque.x = orientation === 'landscape' ? 720 : 360;
        bonusPlaque.y = playingNextText.y + 150;
        bonusPlaque.addChild(bonusFrame);
        bonusPlaque.pivot.x = bonusPlaque.width / 2;
        bonusPlaque.pivot.y = bonusPlaque.height / 2;
        transitionPlaque.addChild(bonusPlaque);

        transitionPlaque.visible = false;
        transitionPlaque.alpha = 0;

        hide();
    }

    function parseResult(data) {
        scoreData = data;
        scoreData.baseGameCount = 0;
        scoreData.baseGameWins = [];

        if (scoreData.total) {
            if (scoreData.baseGameScore) {
                Object.keys(scoreData.baseGameScore).forEach(function (e) {
                    if (scoreData.baseGameScore[e] !== 0 && scoreData.baseGameScore[e] !== void(0)) {
                        var winData = {row: e, value: scoreData.baseGameScore[e]};
                        scoreData.baseGameWins.push(winData);
                        scoreData.baseGameCount++;
                    }
                });
            }

            if (scoreData.mountain) {
                runningValue = {};
                runningValue.value = SKBeInstant.formatCurrency(scoreData.total).formattedAmount;
                runningValue.element = new PIXI.Container();
                runningValue.image = new PIXI.Sprite(PIXI.Texture.fromFrame('gamesummary_totalwinicon'));
                runningValue.text = new PIXI.Text(runningValue.value, textStyle);
                runningValue.text.x += 100;
                runningValue.element.visible = false;
                runningValue.element.x = 0;
                runningValue.element.y = orientation === 'landscape' ? 45 : 150;
                runningValue.element.addChild(runningValue.image, runningValue.text);
                runningValue.element.pivot.x = runningValue.element.width / 2;
                runningValue.element.pivot.y = runningValue.element.height / 2;
                transitionResult.addChild(runningValue.element);
            }
            else {
                processBaseGameResult();
            }
        }
    }

    function processBaseGameResult() {
        totalBaseGameScore = scoreData.total;
        YouHaveWonValue.text = SKBeInstant.formatCurrency(totalBaseGameScore).formattedAmount;
    }

    function transitionChorography(cb, scale, PNScale) {
        var t = transitionPlaque;
        var timeLine = new TimelineLite();
        t.visible = true;
        t.alpha = 1;
        t.scale.set(0);
        var timeMultiplyer = 1;

        IWLib.helpOverlay.visible = true;
        IWLib.buttonBarBG.visible = true;
        IWLib.helpOverlay.alpha = 0;
        IWLib.buttonBarBG.alpha = 0;

        Tween.to(IWLib.helpOverlay, 0.25, {alpha: 1});
        Tween.to(IWLib.buttonBarBG, 0.25, {alpha: 1});

        YouHaveWonValue.scale.set(0);
        YouHaveWonValue_2.scale.set(0);

        if (totalBaseGameScore !== 0) {
            timeLine.to(t.scale, 0.3, {
                ease: ease.Power1.easeInOut,
                x: 1.3,
                y: 1.3,
                onComplete: function () {
                    [
                        YouHaveWonValue,
                        YouHaveWonValue_2,
                    ].forEach(function (e) {
                        Tween.to(e.scale, 0.3, {
                            ease: ease.Power1.easeInOut,
                            x: 1.3,
                            y: 1.3,
                            onComplete: function () {
                                Tween.to(e.scale, 0.3, {
                                    ease: ease.Power1.easeInOut,
                                    x: Math.min(scale / (e.width / e.scale.x), 1),
                                    y: Math.min(scale / (e.width / e.scale.x), 1),
                                });
                            }
                        });
                    });
                }
            }, 0)
                .to(t.scale, 0.3, {
                    x: 1,
                    y: 1
                });
            timeMultiplyer = 2;
        }

        timeLine.to({}, 0.3, {
            onComplete: function () {
                youHaveWonText.visible = false;
                YouHaveWonValue.visible = false;
                youHaveWonText_2.visible = false;
                YouHaveWonValue_2.visible = false;
                baseGameLogo.visible = false;
                mountainGameLogo.visible = false;
                playingNextText.visible = true;
                PlayingNextTexture.visible = true;
                PlayingNextTexture.alpha = 1;
            }
        }, (1.4 * timeMultiplyer));

        timeLine.to(t.scale, 0.3, {
            ease: ease.Power1.easeInOut,
            delay: 0.5,
            x: 0,
            y: 0,
        }, (1 * timeMultiplyer));

        timeLine.to(PlayingNextTexture.scale, 0.3, {
            ease: ease.Power1.easeInOut,
            x: 1.3,
            y: 1.3,
        }, (1.50 * timeMultiplyer))
            .to(PlayingNextTexture.scale, 0.3, {
                x: 1,
                y: 1,
            }, (1.75 * timeMultiplyer));

        timeLine.to(t.scale, 0.3, {
            ease: ease.Power1.easeInOut,
            x: 1.3,
            y: 1.3
        }, (1.50 * timeMultiplyer))
            .to(t.scale, 0.3, {
                x: 1,
                y: 1,
                onComplete: function () {
                    setTimeout(cb, 2000);
                }
            }, (1.75 * timeMultiplyer));

        timeLine.to(t, 0.5, {
            alpha: 0
        }, 5);

        if (IWOrientation.get() === IWOrientation.LANDSCAPE) {
            if (playingNextText.text === " ") {
                timeLine.to(PlayingNextTexture, 0.5, {
                    y: 590,
                }, 6);
            }


            timeLine.to(PlayingNextTexture.scale, 0.5, {
                x: 2,
                y: 2,
            }, 6);
        } else {
            timeLine.to(PlayingNextTexture.scale, 0.5, {
                x: PNScale,
                y: PNScale,
            }, 6);
        }

        timeLine.to(cMatrix, 0.3, {
            alpha: 1
        }, 8);
        timeLine.to(cMatrix_2, 0.3, {
            alpha: 1
        }, 8);
        if (IWOrientation.get() === 'landscape') {
            timeLine.to(PlayingNextTexture.scale, 0.5, {
                x: 2.5,
                y: 2.5,
            }, 8);
        } else {
            timeLine.to(PlayingNextTexture.scale, 0.5, {
                x: 2,
                y: 2,
            }, 8);
        }

        timeLine.to(cMatrix, 0.3, {
            alpha: 0
        }, 8.3);
        timeLine.to(cMatrix_2, 0.3, {
            alpha: 0
        }, 8.3);

        timeLine.to(PlayingNextTexture, 0.5, {
            alpha: 0,
        }, 8.6);

        timeLine.to(PlayingNextTexture.scale, 0.5, {
            x: 0,
            y: 0,
            onComplete: function () {
                IWLib['autoPlayButtonContainer'].visible = true;
                IWLib['autoPlayStartButtonSheen'].visible = true;
                IWLib['autoPlayStopButton'].visible = false;
                IWLib['autoPlayStartButton'].visible = true;
                IWLib['autoPlayStartButton'].enabled = true;
                IWLib['autoPlayStopButton'].enabled = true;
                IWLib['helpButton'].enabled = true;
            }
        }, 8.6);

        timeLine.to(IWLib.helpOverlay, 0.3, {alpha: 0}, 8.2);
        timeLine.to(IWLib.buttonBarBG, 0.3, {
            alpha: 0, onComplete: function () {
                IWLib.helpOverlay.visible = false;
                IWLib.buttonBarBG.visible = false;
            }
        }, 8.2);

        timeLine.play();
    }

    //Fade plaque in on game complete
    function show(callback) {
        if (scoreData.total) {
            transitionResult.visible = true;
        }

        transitionPlaque.visible = true;
        animateResult(callback);
    }

    function singleGameSetup() {
        youHaveWonText_2.visible = false;
        YouHaveWonValue_2.visible = false;

        youHaveWonText.position.set(0, -130);
        youHaveWonText.scale.set(0.8);
        YouHaveWonValue.position.set(0, -20);
    }

    function multiGameSetup() {
        youHaveWonText_2.visible = true;
        YouHaveWonValue_2.visible = true;

        youHaveWonText.position.set(140, -160);
        youHaveWonText.scale.set(0.8);
        YouHaveWonValue.position.set(140, -120);
        YouHaveWonValue.scale.set(0.8);


        youHaveWonText_2.position.set(140, 70);
        youHaveWonText_2.scale.set(0.8);
        YouHaveWonValue_2.position.set(140, 100);
        YouHaveWonValue_2.scale.set(0.8);

        if (SKBeInstant.formatCurrency(0).formattedAmount[0] === '£' || SKBeInstant.formatCurrency(0).formattedAmount[0] === '€') {
            YouHaveWonValue.position.set(140, -100);
            YouHaveWonValue_2.position.set(140, 140);
        }

        baseGameLogo.visible = true;
        mountainGameLogo.visible = true;
    }

    function animateResult(callback) {
        youHaveWonText.visible = true;
        YouHaveWonValue.visible = true;
        playingNextText.visible = false;
        PlayingNextTexture.visible = false;
        baseGameLogo.visible = false;
        mountainGameLogo.visible = false;

        var scaleSize = 700;
        var transitionPlayingNextScale = 1;

        singleGameSetup();

        if (scoreData.total || scoreData.bonuses.mountain) {
            //Cliff Hangers
            if (scoreData.bonuses.mountain && !scoreData.mountain) {
                PlayingNextTexture.scale.set(0);
                IWLib['transitionPlayingNextTextureA'].texture = PIXI.Texture.fromFrame(textures.mountain.A);
                IWLib['transitionPlayingNextTextureB'].texture = PIXI.Texture.fromFrame(textures.mountain.B);
                playingNextText.text !== " " ? IWLib['transitionPlayingNextTextureA'].y = -150 : IWLib['transitionPlayingNextTextureA'].y = -200;

                if (playingNextText.text === " " && IWOrientation.get() === IWOrientation.LANDSCAPE) {
                    playingNextText.text = " ";
                    IWLib['transitionPlayingNextTextureB'].y = (IWLib['transitionPlayingNextTextureA'].y + IWLib['transitionPlayingNextTextureA'].height);
                }
                scaleSize = 700;
                transitionPlayingNextScale = 1.5;
            }
            else {
                if (scoreData.mountain) {
                    multiGameSetup();
                    YouHaveWonValue_2.text = SKBeInstant.formatCurrency(scoreData.mountain).formattedAmount;
                }
                IWLib['transitionPlayingNextTextureA'].texture = PIXI.Texture.fromFrame(textures.wheel.A);
                IWLib['transitionPlayingNextTextureB'].texture = PIXI.Texture.fromFrame(textures.wheel.B);
                playingNextText.text !== " " ? IWLib['transitionPlayingNextTextureA'].y = -90 : IWLib['transitionPlayingNextTextureA'].y = -150;

                if (playingNextText.text === " " && IWOrientation.get() === IWOrientation.LANDSCAPE) {
                    playingNextText.text = " ";
                    IWLib['transitionPlayingNextTextureB'].y = (IWLib['transitionPlayingNextTextureA'].y + IWLib['transitionPlayingNextTextureA'].height);
                }
                PlayingNextTexture.scale.set(0);
                transitionPlayingNextScale = 1.2;
                scaleSize = 400;
            }

            cMatrix = new PIXI.filters.ColorMatrixFilter();
            cMatrix_2 = new PIXI.filters.ColorMatrixFilter();
            PlayingNextTexture.filters = [cMatrix, cMatrix_2];
            cMatrix.contrast(-1);
            cMatrix_2.brightness(2);
            cMatrix.alpha = 0;
            cMatrix_2.alpha = 0;
            transitionChorography(callback,
                scaleSize,
                IWOrientation.get() === 'portrait' ? transitionPlayingNextScale : void(0)
            );
        }
    }

    function hide() {
        transitionResult.visible = false;
        transitionResult.removeChildren();
        bonusPlaque.visible = false;
        bonusPlaque.alpha = 0;
    }

    function reset() {
        if (playingNextText.text === " " && IWOrientation.get() === IWOrientation.LANDSCAPE) {
            PlayingNextTexture.y = 480;
        }
        totalBaseGameScore = 0;
    }

    return {
        init: init,
        parseResult: parseResult,
        show: show,
        hide: hide,
        reset: reset
    };
});
