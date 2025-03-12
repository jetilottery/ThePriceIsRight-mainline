define(function(require) {

    var PIXI = require('com/pixijs/pixi');
    var IWLib = require('skbJet/componentManchester/standardIW/displayList');
    var IWOrientation = require('skbJet/componentManchester/standardIW/orientation');
    var resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');
    var IWSound = require('skbJet/componentManchester/standardIW/audio');

    var stageContainer;

    var currentStage;

    var moving = false;

    var stages = [];
    var stageArray = [];
    var stageIndex;

    var stageOffset;

    require('com/gsap/TweenLite');
    var Tween = window.TweenLite;

    /**
     * @title moveStage
     * @param nextStage
     * @param speed
     * @description moves the stageContainer to match the selected stage so it is in view
     */

    function updateLabels(value) {
        var label = IWLib.autoPlayStartButton.children[
        IWLib.autoPlayStartButton.children.length-2];

        label.text = value;
    }

    function moveStage (speed,cb) {

        var run = typeof cb === 'function' ? cb : function(){return false;};
        stageIndex++;
        if(moving === false) {
            moving = true;
            if(stageArray[stageIndex] === void(0)) {
                stageIndex = 0;
            }

            Tween.to(stageContainer,speed,{
                x: stageArray[stageIndex] === void(0) ? 0 : -stageArray[stageIndex],
                onComplete: function () {
                    switch(stageArray[stageIndex]) {
                        case stages[0].x : {
                            currentStage = "baseStage";
                            break;
                        }
                        case stages[1].x : {
                            IWSound.crossFade('cliffHangersMusic','baseGameMusic',3,true);
                            currentStage = "mountainStage";
                            break;
                        }
                        case stages[2].x : {
                            currentStage = "wheelStage";
                            break;
                        }
                    }
                    moving = false;
                    run();
                }
            });

            Tween.to(IWLib['audienceContainer'],speed,{
                x: -stageArray[stageIndex] * 1.5
            });
            Tween.to(IWLib['backgroundsContainer'],speed,{
                x: -stageArray[stageIndex] / 1.5
            });

        }
    }

    return {
        /**
         * @name init
         * @description initialises the 3 different stages the player will visit in the game
         * and adds a screen overlay for screen transition.
         */
        init: function () {
            var orientation = IWOrientation.get();

            stages[0] = IWLib['baseStage'];
            stages[1] = IWLib['mountainStage'];
            stages[2] = IWLib['wheelStage'];
            stageContainer = IWLib['stageContainer'];

            IWLib['backgroundsContainer'].children[1].scale.x = orientation === 'landscape' ? 1 : -1;
            IWLib['backgroundsContainer'].children[3].scale.x = orientation === 'landscape' ? -1 : 1;
            IWLib['backgroundsContainer'].children[4].scale.x = orientation === 'landscape' ? -1 : 1;

            [
                stages[0],
                stages[1],
                stages[2],
            ].forEach(function (element) {
                stageContainer.addChild(element);
            });

            currentStage = 'baseStage';

            stages[1].visible = false;
            stages[2].visible = false;

            var audienceContainer = new PIXI.Container();
            audienceContainer.name = 'audienceContainer';

            audienceContainer.y = orientation === 'landscape' ? 0 : 415;

            for(var i = 0;i<12;i++) {
                var sprite = new PIXI.Sprite(PIXI.Texture.fromFrame('audience'));
                sprite.name = 'audience_'+i;
                sprite.x = (i * (1440-30));
                sprite.y = orientation === 'landscape' ? 620 : 564 ;
                audienceContainer.addChild(sprite);
            }
            stageContainer.parent.addChildAt(audienceContainer,2);
            IWLib.audienceContainer = audienceContainer;

            stageIndex = 0;
        },
        /**
         * refrence to move stage
         */
        moveStage: moveStage,
        /**
         * @name get
         * @param currentStage
         * @description returns current stage the player is on
         */
        get: function () {
            return currentStage;
        },
        isMoving: function() {
            return moving;
        },
        populateScenes: function(data) {
            stageOffset = IWOrientation.get() === 'landscape' ? 1440 : 900;
            stageArray = [0];

            stages[1].visible = false;
            stages[2].visible = false;

            stages[1].x = 0;
            stages[2].x = 0;

            if(data.bonus.wheel === true && data.mountain.steps.indexOf("0") === 0) {
                stageArray.push(1 * stageOffset);
                stages[2].visible = true;
                stages[2].x = 1 * stageOffset;
            }

            if(data.mountain.steps.indexOf("0") !== 0) {
                stageArray.push(1 * stageOffset);
                stages[1].visible = true;
                stages[1].x = 1 * stageOffset;
                if(data.bonus.wheel === true) {
                    stageArray.push(2 * stageOffset);
                    stages[2].visible = true;
                    stages[2].x = 2 * stageOffset;
                }
            }

        },
        /**
         * @name reset
         * @description resets the game back to the base stage
         */
        reset: function () {
            moving = false;
            stageIndex = 0;

            updateLabels(resources.i18n.Game.button_autoPlay);

            IWLib['audienceContainer'].x = 0;
            IWLib['backgroundsContainer'].x = 0;
            stageContainer.x = 0;
            currentStage = "baseStage";

        },
        transitionAutoPlayButton : function() {

        },
        updateLabels:updateLabels,

    };

});
