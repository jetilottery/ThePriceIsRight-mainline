define(function(require) {

    var wheel = require('game/components/wheel');
    var IWOrientation = require('skbJet/componentManchester/standardIW/orientation');
    var IWLib = require('skbJet/componentManchester/standardIW/displayList');
    var gameState = require('game/engine/gameState');
    var IWSound = require('skbJet/componentManchester/standardIW/audio');
    var scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');

    var scene = require('game/engine/scene');
    var resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');

    var autoplay = require('skbJet/componentManchester/standardIW/autoPlay');
    var lights = require('game/components/lightScene');

    var ShowCaseScreen = require('game/components/showCaseScreen');

    var PIXI = require('com/pixijs/pixi');

    var gameData;

    var showCaseScreen;

    function winPresentaion() {
        gameState.updateScore(gameState.score('total')*parseInt(gameData.wheel),true);

        gameState.score('wheel',gameData.wheel);
        gameState.readyToMove({
            scoreData: {
                wheel: gameData.wheel,
            }
        });
    }

    return {
        init: function () {
            wheel.init();

            if(IWOrientation.get() === 'portrait') {
                IWLib.RedArrow.scale.x = -1;
            }

            var spriteArray = [];
            for(var i=0;i<41;i++) {
                var acc = i;
                if(i<10) {
                    acc = '0'+i;
                }
                var sprite = PIXI.Texture.fromFrame('_JustLogoSpinOnAlpha_000'+acc);
                spriteArray.push(sprite);
            }
            var animatedLogo = new PIXI.extras.AnimatedSprite(spriteArray);
            animatedLogo.x = 420;
            animatedLogo.y = 200;
            animatedLogo.scale.set(0.8);
            IWLib['WheelFrame_Right'].addChild(animatedLogo);

            animatedLogo.gotoAndPlay(0);
            showCaseScreen = new ShowCaseScreen(winPresentaion,{
                header: animatedLogo,
                sub: IWLib['subTitleWheelFrame']
            });

            if(IWOrientation.get()==='landscape') {

            } else {
                animatedLogo.x = -100;
                animatedLogo.y = -120;
            }

        },
        active: function() {
            if(!IWSound.isPlaying('baseGameMusic')) {
                IWSound.play('baseGameMusic', true);
            }
            lights.lights('showdownBtn').setMode(0.2,'flash');
            IWLib['autoPlayStartButtonSheen'].visible = true;
            scene.updateLabels(resources.i18n.Game.button_spin);
        },
        deActive: function() {
            IWLib['helpButton'].enabled = false;
            IWLib['autoPlayStopButton'].enabled = false;
            IWLib['autoPlayButtonContainer'].visible = false;
            autoplay._enabled = false;
        },
        spin: function () {
            showCaseScreen.setValue(gameData.wheel,gameState.score('total'));
            IWLib['autoPlayButtonContainer'].visible = false;
            wheel.spin(gameData.wheel,showCaseScreen.playTimeLine.bind(showCaseScreen));
            lights.lights('showdownBtn').reset();
            lights.lights('showdownScene').setMode(0.2,'flash');
        },
        setup: function() {
            gameData = scenarioData.scenario;
        },
        reset: function () {
            if(showCaseScreen !== void(0)) {
                showCaseScreen.alpha = 1;
                showCaseScreen.visible = true;
                showCaseScreen.reset();
            }
            wheel.reset();
            lights.lights('showdownScene').reset();
        }
    };
});
