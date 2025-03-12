define(function(require){
    var scene = require('game/engine/scene');
    var baseStage = require('game/stages/baseStage');
    var mountainStage = require('game/stages/mountainStage');
    var wheelStage = require('game/stages/wheelStage');
    var gameState = require('game/engine/gameState');
    var IWLib = require('skbJet/componentManchester/standardIW/displayList');
    var IWOrientation = require('skbJet/componentManchester/standardIW/orientation');
    var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');

    var textStyles = require('skbJet/componentManchester/standardIW/textStyles');

    var scenarioTransform = require('game/engine/scenarioTransform');
    var plaque = require('game/components/plaque');
    var uiController = require('game/components/uiController');
    var lights = require('game/components/lightScene');
    var anticipation = require('game/components/anticipation');
    var autoplay = require('game/engine/autoplay');

    var paytableTransform = require('game/engine/paytable');

    var gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
    var scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
    var app = require('skbJet/componentManchester/standardIW/app');
    var documents = require('skbJet/componentManchester/standardIW/documents');
    var layout = require('skbJet/componentManchester/standardIW/layout');
    var footer = require('skbJet/componentManchester/standardIW/ui/footer/component');
    var gamePlayMeters = require('game/engine/gamePlayMeters');

    var resultPlaque = require('game/components/resultPlaque');
    var rotateReminder = require('skbJet/component/rotateReminder/rotateReminder');
    var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

    var l18nFixes = require('game/components/l18nFixes');

    require('game/engine/autoplay');
    require('com/gsap/TweenLite');

    var Tween = window.TweenLite;

    // Register a transform function that will be applied to the scenario string
    // to generate the parsed scenario data object
    scenarioData.registerTransform(scenarioTransform);

    function gameInit() {
        app.stage.addChild(layout.container);

        scene.init();
        plaque.init();
        lights.init();
        resultPlaque.init();

        screenRotate();
        documents.registerPrizetableTransform(paytableTransform);

        lights.lights('winUpTo').setMode(0.2,'flash');

        footer = footer(IWLib.footerBar, {
            balance: 'footer_balance',
            ticketCost: 'footer_ticketCost',
            win: 'footer_win',
        }, {
            label: textStyles.footerLabel,
            value: textStyles.footerValue,
        });
        IWLib.footerContainer.addChild(footer);

        uiController.init({
            plaque:plaque,
            mountain:mountainStage,
            wheel:wheelStage,
            baseGame:baseStage,
            pulse:gamePlayMeters,
    });

        gameState.init(
            baseStage,
            mountainStage,
            wheelStage
        );

        l18nFixes.init();

        baseStage.init();
        mountainStage.init();
        wheelStage.init();

        gamePlayMeters.init();
        gamePlayMeters.pulseEnabled(true);
        anticipation.checkIdleStatus();
        autoplay.init(0.1,0.8);

        gameFlow.next();
    }

    function ticketAcquired() {
        baseStage.setup();
        mountainStage.setup();
        wheelStage.setup();

        msgBus.publish('toPlatform', {
            channel: 'Game',
            topic: 'Game.Control',
            data: { name: 'howToPlay', event: 'enable', params: [0] },
        });
        msgBus.publish('toPlatform', {
            channel: 'Game',
            topic: 'Game.Control',
            data: { name: 'paytable', event: 'enable', params: [0] },
        });

        Tween.to(IWLib.buttonBarBG, 0.25, {alpha: 0});

        gameFlow.next('START_REVEAL');
    }

    function startReveal() {
        baseStage.active();
        scene.populateScenes(scenarioData.scenario);
        lights.lights('winUpTo').off();
        anticipation.toogleActive();
    }

    function enterResultScreen() {
        //plaque.toggleEndGamePlaque()
        //plaque.endGameAudio();
        resultPlaque.show();
        gamePlayMeters.pulseEnabled(true);
    }

    function gameReset() {

        baseStage.reset();
        mountainStage.reset();
        wheelStage.reset();
        scene.reset();
        gameState.reset();
        lights.reset();
        autoplay.reset();
        anticipation.toogleActive();
        IWLib['helpButton'].enabled = true;
        resultPlaque.hide();

        lights.lights('winUpTo').setMode(0.2,'flash');
        IWLib.buttonBarBG.alpha = 1;
        IWLib.buttonBarBG.visible = true;
        plaque.reset();

        gameFlow.next();
    }

    function screenRotate() {
        if(SKBeInstant.config.screenEnvironment !== 'desktop') {
            var orientation = IWOrientation.get();
            if (orientation === "landscape") {
                rotateReminder.setLandscapeOnly();
            } else {
                rotateReminder.setPortraitOnly();
            }
            rotateReminder.init('', function(rotateMsgShowFlag) {
                if (rotateMsgShowFlag) {
                    document.getElementById('game').style.visibility = 'hidden';
                    document.getElementById('documents').style.display = 'none';
                    document.body.style.backgroundColor = 'black';
                } else {
                    document.getElementById('game').style.visibility = 'visible';
                    document.getElementById('documents').style.display = 'block';
                    document.body.style.backgroundColor = '';
                }
            });
        }
    }

    function error () {
        baseStage.error();
        autoplay.tweenArray().forEach(function (e) {
            e.kill();
        });
        IWLib['autoPlayStartButton'].visible = false;
        IWLib['autoPlayStopButton'].visible = false;
    }

    //fix for - PRIWI_COM: Bet Selector overlay display a part after close error message
    msgBus.subscribe('MeterData.Win', function () {
        plaque.reset();
    });

    gameFlow.handle(gameInit, 'GAME_INIT');
    gameFlow.handle(gameReset, 'GAME_RESET');
    gameFlow.handle(ticketAcquired, 'TICKET_ACQUIRED');
    gameFlow.handle(startReveal, 'START_REVEAL');
    gameFlow.handle(enterResultScreen, 'RESULT_SCREEN');
    gameFlow.handle(error, 'ERROR');

});
