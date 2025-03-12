define(function (require) {
    var IWLib = require('skbJet/componentManchester/standardIW/displayList');
    var IWSound = require('skbJet/componentManchester/standardIW/audio');
    var IWOrientation = require('skbJet/componentManchester/standardIW/orientation');
    var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    var PIXI = require('com/pixijs/pixi');
    var meterData = require("skbJet/componentManchester/standardIW/meterData");

    var gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');

    require('com/gsap/TweenLite');
    var TimelineLite = require('com/gsap/TimelineLite');
    var ease = require('com/gsap/easing/EasePack');
    var Tween = window.TweenLite;
    var resultPlaque, resultPlaqueBG, congratulationsText, winText, winResult, winValueText, loseText, closeBtn,
        totalWinText, orientation, scoreData;

    var AltWin = {
        fontFamily: 'oswald',
        fontSize: 120,
        fontWeight: 600,
        fill: 0xFAD814,
        align: 'center',
        miterLimit: 28,
        strokeThickness: 5
    };

    function init() {
        orientation = IWOrientation.get();
        resultPlaque = IWLib['resultPlaque'];
        resultPlaqueBG = IWLib['resultPlaqueBG'];
        congratulationsText = IWLib['congratulationsText'];
        winText = IWLib['winText'];
        winResult = IWLib['winResult'];
        loseText = IWLib['loseText'];
        closeBtn = IWLib['resultPlaqueCloseBtn'];
        totalWinText = IWLib['totalWinText'];

        closeBtn.on('buttonpress', function () {
            IWSound.play('click');
            IWLib.buttonBarBG.visible = false;
            hide();
        });

        hide();
    }

    function parseResult(data) {
        scoreData = data;
        scoreData.baseGameCount = 0;
        scoreData.baseGameWins = [];

        if (scoreData.total) {
            if (scoreData.baseGameScore) {
                Object.keys(scoreData.baseGameScore).forEach(function (e) {
                    if (scoreData.baseGameScore[e] !== 0 && scoreData.baseGameScore[e] !== void (0)) {
                        var winData = {row: e, value: scoreData.baseGameScore[e]};
                        scoreData.baseGameWins.push(winData);
                        scoreData.baseGameCount++;
                    }
                });
            }

            processTotalResult();
        }
    }

    function processTotalResult() {
        var winValue = SKBeInstant.formatCurrency(meterData.win).formattedAmount;

        if (SKBeInstant.formatCurrency(0).formattedAmount[0] === '£' || SKBeInstant.formatCurrency(0).formattedAmount[0] === '€') {
            winValueText = new PIXI.extras.BitmapText("", {font: "120px WinValueFont-export", align: "left"});
        } else {
            winValueText = new PIXI.Text("", AltWin);
        }


        winValueText.visible = false;
        winValueText.anchor.x = 0.5;
        winValueText.anchor.y = 0.5;
        winResult.addChild(winValueText);
        winValueText.text = winValue;
        winResult.scale.set(
            Math.min(700 / (winValueText.width / winValueText.scale.x), 1)
        );
    }

    //Fade plaque in on game complete
    function show() {
        [
            'baseGameMusic',
            'cliffHangersMusic',
        ].forEach(function (e) {
            IWSound.stop(e);
        });
        if (scoreData.total) {
            congratulationsText.visible = true;
            winText.visible = true;
            winResult.visible = true;
            if (gameConfig.ukgc) {
                if (scoreData.total <= meterData.ticketCost) {
                    IWSound.play('loseMusic');
                    Tween.delayedCall(1.5,function(){
                        IWSound.fadeOut('loseMusic', 1.5);
                    });
                } else {
                    IWSound.play('winMusic');
                    IWSound.play('winSFX');
                }
            } else {
                IWSound.play('winSFX');
                IWSound.play('winMusic');
            }
            resultPlaqueBG.filters = [];
            resultPlaque.scale.set(0);
        } else {
            var filter = new PIXI.filters.ColorMatrixFilter();
            filter.desaturate();
            resultPlaqueBG.filters = [filter];
            IWSound.play('loseMusic');
            if (!gameConfig.ukgc) {
                IWSound.play('loseSFX');
            } else {
                Tween.delayedCall(1.5,function(){
                    IWSound.fadeOut('loseMusic', 1.5);
                });
            }
            loseText.visible = true;
        }

        if (gameConfig.ukgc) {
            if (scoreData.total) {
                if (meterData.totalWin > meterData.ticketCost) {
                    resultPlaque.visible = true;
                }
            }
        } else {
            resultPlaque.visible = true;
        }

        IWLib.helpOverlay.alpha = 0;
        IWLib.helpOverlay.visible = true;
        IWLib.buttonBarBG.alpha = 0;
        IWLib.buttonBarBG.visible = true;

        if (gameConfig.ukgc) {
            if (scoreData.total) {
                if (meterData.totalWin > meterData.ticketCost) {
                    Tween.to(IWLib.helpOverlay, 0.25, {alpha: 1});
                }
            }
        } else {
            Tween.to(IWLib.helpOverlay, 0.25, {alpha: 1});
        }

        Tween.to(IWLib.buttonBarBG, 0.25, {alpha: 1});
        Tween.to(resultPlaque, 0.25, {alpha: 1, ease: ease.Power1.easeInOut, onComplete: animateResult});
    }

    function animateResult() {
        if (scoreData.total) {
            var Timeline = new TimelineLite();
            totalWinText.alpha = 0;
            totalWinText.scale.set(0);
            Timeline.to(totalWinText, 0.3, {
                alpha: 1
            }, 0);
            Timeline.to(totalWinText.scale, 0.30, {
                ease: ease.Power1.easeInOut,
                x: 1.3,
                y: 1.3
            }, 0.3);
            Timeline.to(resultPlaque.scale, 0.30, {
                ease: ease.Power1.easeInOut,
                x: 1.3,
                y: 1.3
            }, 0.3);
            Timeline.to(resultPlaque.scale, 0.30, {
                ease: ease.Power1.easeInOut,
                x: 1,
                y: 1
            }, 0.6);
            Timeline.to(totalWinText.scale, 0.30, {
                ease: ease.Power1.easeInOut,
                x: 1,
                y: 1
            }, 0.6);
            if(winResult.children[0] !== undefined) {
                winResult.children[0].visible = true;
                winResult.children[0].scale.set(0);
                Timeline.to(winResult.children[0].scale, 0.25, {
                    ease: ease.Power1.easeInOut,
                    x: 1.3,
                    y: 1.3,
                    onComplete: function () {
                        Tween.to(winResult.children[0].scale, 0.25, {
                            x: 1,
                            y: 1
                        });
                    }
                }, 0.6);
            }

            Timeline.play();

        }
    }

    function hide() {
        IWLib.helpOverlay.alpha = 1;
        IWLib.helpOverlay.visible = false;
        resultPlaque.visible = false;
        resultPlaque.alpha = 0;
        congratulationsText.visible = false;
        winText.visible = false;
        winResult.visible = false;
        loseText.visible = false;
        totalWinText.visible = false;
        winResult.removeChildren();
    }

    return {
        init: init,
        parseResult: parseResult,
        show: show,
        hide: hide
    };
});
