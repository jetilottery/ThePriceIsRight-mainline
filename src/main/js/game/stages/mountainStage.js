define(function(require) {
    var PIXI = require('com/pixijs/pixi');
    require('com/pixijs/pixi-projection');

    require('com/gsap/TweenLite');
    var Tween = window.TweenLite;

    var autoplay = require('skbJet/componentManchester/standardIW/autoPlay');
    var scene = require('game/engine/scene');
    var resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');

    var textStyles = require('game/display/textStyles');

    var yodller = require('game/components/yodller');
    var spinner = require('game/components/mountainSpinner');
    var prizeBoxes = require('game/components/mountainPrizeBox');
    var IWApp = require('skbJet/componentManchester/standardIW/app');

    var IWLib = require('skbJet/componentManchester/standardIW/displayList');
    var IWOrientation = require('skbJet/componentManchester/standardIW/orientation');
    var IWSound = require('skbJet/componentManchester/standardIW/audio');
    var scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
    var prizeData = require('skbJet/componentManchester/standardIW/prizeData');

    var gameState = require('game/engine/gameState');
    var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');


    var Point = require('game/components/mountainPoint');

    var gameData;
    var index = 0;
    var valueBoxes = [];
    var numArray = [];
    var textArray = [];
    var segmentArray = [];
    var prize = 0;
    var point;

    var layoutData = [
        [0,0,5,5,5,5,5,0,0,2,2,0,0,4,4,4,4,0,0,3,3,3,0,0,1],
        [0,0,4,4,4,4,0,0,5,5,5,5,5,0,0,3,3,3,0,0,2,2,0,0,1],
        [0,0,3,3,3,0,0,4,4,4,4,0,0,2,2,0,0,5,5,5,5,5,0,0,1],
        [0,0,2,2,0,0,3,3,3,0,0,5,5,5,5,5,0,0,4,4,4,4,0,0,1]
    ];

    var pointArray = [];
    var inital = false;
    
    function valueAssociate() {
        numArray = layoutData[Number(gameData.mountain.layout-1)].filter(function (element) {
           return element !== 0;
        });
        numArray = numArray.filter(function (element,index) {
            return numArray.indexOf(element) === index;
        });

            layoutData[Number(gameData.mountain.layout-1)].forEach(function (e,i) {
                numArray.forEach(function (element,index) {
                if(e === element) {
                    valueBoxes[index].associatedPoints.push(i);
                }
            });
        });
    }

    function setup() {
        index = 0;
        gameData = scenarioData.scenario;
        prize = 0;
        if(gameData.mountain.layout > 0) {
            point.winValueContainer = layoutData[Number(gameData.mountain.layout-1)];
            pointArray.forEach(function (element) {
                element.set(false, null);
                element.reset();
            });
            valueBoxes.forEach(function (element) {
                element.reset();
            });
            numArray = [];
            IWLib['NumberLineContainer'].children.forEach(function (element, i) {
                if (layoutData[Number(gameData.mountain.layout - 1)][i] === 0) {
                    element.texture = PIXI.Texture.fromFrame('MountainSegment_Grey');
                } else {
                    element.texture = PIXI.Texture.fromFrame('MountainSegment_Yellow');
                }
            });


            textArray.forEach(function (element) {
                element.style = textStyles['mountainNumber'];
            });
            valueAssociate();
            yodller.reset();
            spinner.reset();
            shiftPointsOnLayoutChange();

            valueBoxes.forEach(function (element) {
                element.setPrizeValue(prizeData.prizeTable[element.associatedPoints.length.toString()]);
            });

            if (IWOrientation.get() === 'portrait') {

                valueBoxes.forEach(function (element, index) {
                    element.label = IWLib['port_mountain_value_label_' + (index + 1)];
                    element.label.text = (index + 1);
                    element.smallPrizeHeaderLabel.text = (index + 1);
                    element.smallPrizeContainer.y = 660 - (70 * (index));
                });
            }

            IWLib['mountainWinBonusWinValue'].text = SKBeInstant.formatCurrency(0).formattedAmount;
            IWLib['mountainWinBonusWinValue'].visible = false;

            IWApp.ticker.add(function () {
                yodller.step();
            });
        }
    }

    function updateScoreDisplay() {
        if(prize>0) {
            IWLib['mountainWinBonusWinValue'].visible = true;
        }
        IWLib['mountainWinBonusWinValue'].text = SKBeInstant.formatCurrency(prize).formattedAmount;
    }

    function shiftPointsOnLayoutChange() {
        switch (Number(gameData.mountain.layout)) {
            case 1: {
                valueBoxes[0].shift(2);
                valueBoxes[1].shift(9);
                valueBoxes[2].shift(13);
                valueBoxes[3].shift(19);
                valueBoxes[4].shift(20,true);
                break;
            }
            case 2: {
                valueBoxes[0].shift(2);
                valueBoxes[1].shift(8);
                valueBoxes[2].shift(15);
                valueBoxes[3].shift(20);
                valueBoxes[4].shift(20,true);
                break;
            }
            case 3: {
                valueBoxes[0].shift(2);
                valueBoxes[1].shift(7);
                valueBoxes[2].shift(13);
                valueBoxes[3].shift(17);
                valueBoxes[4].shift(20,true);
                break;
            }
            case 4: {
                valueBoxes[0].shift(2);
                valueBoxes[1].shift(6);
                valueBoxes[2].shift(11);
                valueBoxes[3].shift(18);
                valueBoxes[4].shift(20,true);
                break;
            }
        }
    }

    function startSpin() {
        IWLib['autoPlayStartButton'].enabled = false;
        IWLib['autoPlayStopButton'].enabled = false;
        IWLib['helpButton'].enabled = false;
        spinner.spin(scenarioData.scenario.mountain.steps[index], function () {
            var lastTurn = scenarioData.scenario.mountain.steps[index+1] === "0";
            yodller.moveTo(scenarioData.scenario.mountain.steps[index], lastTurn, function () {
                if (index !== scenarioData.scenario.mountain.steps.length-1 && Number(scenarioData.scenario.mountain.steps[index+1]) !== 0) {
                    pointArray[yodller.nextPoint - 1].set(true, layoutData[Number(gameData.mountain.layout - 1)][yodller.nextPoint - 1]);
                    prize += pointArray[yodller.nextPoint - 1].getScore();
                    IWLib['autoPlayStartButton'].enabled = true;
                    IWLib['autoPlayStartButtonSheen'].visible = true;
                    IWLib['helpButton'].enabled = true;
                    updateScoreDisplay();
                }
                if (Number(scenarioData.scenario.mountain.steps[index+1]) === 0||scenarioData.scenario.mountain.steps[index+1] === void(0)) {
                    IWLib['autoPlayButtonContainer'].visible = false;
                    if((yodller.nextPoint) === 25) {
                        pointArray[yodller.nextPoint - 1].set(true, layoutData[Number(gameData.mountain.layout - 1)][yodller.nextPoint - 1]);
                        prize += pointArray[yodller.nextPoint - 1].getScore();
                        IWLib['autoPlayStartButton'].enabled = true;
                        IWLib['autoPlayStartButtonSheen'].visible = true;
                        IWLib['helpButton'].enabled = true;
                        updateScoreDisplay();
                    }
                    Tween.to({}, 1, {
                        onComplete: function () {
                            gameState.score('mountain', prize);
                            gameState.readyToMove({
                                scoreData: {
                                    mountain: prize,
                                }
                            });
                        }
                    });
                }
                index++;
                if (autoplay.enabled) {
                    if (parseInt(scenarioData.scenario.mountain.steps[index])){
                        startSpin();                        
                    }
                }
            });
        });
    }

    return {
        init: function () {
            yodller = new yodller();
            spinner = new spinner();

            for(var i =0;i<5;i++) {
                var p = new prizeBoxes('mountainValueMeter_'+(i+1));
                valueBoxes[i] = p;
            }

            for (var i = 0; i< 25; i++) {
                var sprite = new PIXI.Sprite(PIXI.Texture.fromFrame('MountainSegment_Grey'));
                point = new Point({
                    assignedNumber: i+1,
                    valueBoxes : valueBoxes,
                    yodller : yodller,
                    segmentArray : segmentArray,
                    prize : prize,
                    textArray : textArray,
                });
                var text = new PIXI.Text(i+1, textStyles['mountainNumber']);

                sprite.mask = IWLib['mountainMask'];

                IWLib['NumberLine'].addChild(point.sprite);
                IWLib['NumberLine'].addChild(text);
                IWLib['NumberLineContainer'].addChild(sprite);

                sprite.x = sprite.width + ((sprite.width)*i);
                sprite.y = -17*i;

                segmentArray.push(sprite);

                point.sprite.x = sprite.x;
                point.sprite.y =  443 + (-16.8*i);
                point.sprite.visible = false;

                pointArray.push(point);

                text.x = 46 + (sprite.width*i);
                text.y = 430 + (-16.8*i);
                text.anchor.x = 0.5;

                if(i === 24) {
                    text.y = 34;
                }
                textArray.push(text);
            }

            inital = true;
            yodller.pointsArray = pointArray;

        },
        startSpin : startSpin,
        getSpinner: function() {
            return spinner;
        },
        active: function() {
            // IWSound.play('cliffHangersMusic',true);
            if(autoplay.enabled){
                startSpin(true);
            }
            IWLib['autoPlayStartButtonSheen'].visible = true;
            scene.updateLabels(resources.i18n.Game.button_play);
        },
        deActive: function() {
            IWLib['helpButton'].enabled = false;
            IWLib['autoPlayStopButton'].enabled = false;
            IWLib['autoPlayButtonContainer'].visible = false;
            IWSound.stop('cliffHangersMusic');
            autoplay._enabled = false;
        },
        setup:setup,
        reset:setup,
    };

});
