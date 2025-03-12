define(function (require) {

    var PIXI = require('com/pixijs/pixi');
    require('com/pixijs/pixi-projection');

    require('com/gsap/TweenLite');
    var Tween = window.TweenLite;

    require('com/gsap/TimelineLite');
    var TimeLine = window.TimelineLite;

    var cards = require('game/components/baseStageCards');

    var IWLib = require('skbJet/componentManchester/standardIW/displayList');
    var IWApp = require('skbJet/componentManchester/standardIW/app');
    var IWSound = require('skbJet/componentManchester/standardIW/audio');
    var IWOrientation = require('skbJet/componentManchester/standardIW/orientation');

    var scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
    var prizeData = require('skbJet/componentManchester/standardIW/prizeData');
    var autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');

    var state = require('game/engine/gameState');
    var meter = require('game/components/meter');
    var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');

    var lights = require('game/components/lightScene');

    var gameDataIndex;

    var camera;
    var cardsProjContainer;
    var gameData;

    var movingStage;

    var winningGame;
    var winningGame_1;
    var winningGame_2;

    var lastCardPressed;

    var animations = [];
    var wheelTriggerCheck = null;

    var revealedBonus = 0;

    var gameScore = {
        1:0,
        2:0,
        3:0,
        4:0
    };

    var timeLineArray = [];
    var t1;

    var cardGroups;

    function setPrize(target) {
        if(target.revealCard) {
            if(target.setSymbol === void(0)) {
                target.winningNumber = gameData[Object.keys(gameData)[target.group-1]][gameDataIndex[Object.keys(gameData)[target.group-1]]].value;
                target.setPrizeLabel(
                    SKBeInstant.formatCurrency(prizeData.prizeTable[target.winningNumber]).formattedAmount
                );
                target.revealNumber = prizeData.prizeTable[target.winningNumber];
            } else {
                target.setSymbol(gameData[Object.keys(gameData)[target.group-1]].points[gameDataIndex[Object.keys(gameData)[target.group-1]]].symbol-1);
                target.winningNumber = gameData[Object.keys(gameData)[target.group-1]].points[gameDataIndex[Object.keys(gameData)[target.group-1]]].symbol-1;
                target.setPrizeLabel(
                    SKBeInstant.formatCurrency(prizeData.prizeTable[gameData[Object.keys(gameData)[target.group-1]].points[gameDataIndex[Object.keys(gameData)[target.group-1]]].value]).formattedAmount
                );

                target.revealNumber = prizeData.prizeTable[gameData[Object.keys(gameData)[target.group-1]].points[gameDataIndex[Object.keys(gameData)[target.group-1]]].value];
            }
            timeLineArray.push(Tween.to({},0.3,{
                onComplete: function () {
                    setBonus(target);
                    }
                }
            ));

            gameDataIndex[Object.keys(gameData)[target.group-1]]++;
        } else {
            target.winningNumber = gameData[Object.keys(gameData)[target.group-1]].win-1;
            target.setSymbol(target.winningNumber);
            target.reveal[target.group] = Number(gameData[Object.keys(gameData)[target.group-1]].win);
        }
    }

    function setBonus(target) {
        var speed = 0.25;
        t1 = new TimeLine();

        if(autoPlay.enabled) {
            speed = 0;
        }

        var amount;

        if(Number(gameData.bonus.points[gameDataIndex.bonus])>0) {
            revealedBonus+=Number(gameData.bonus.points[gameDataIndex.bonus]);
            amount = Number(gameData.bonus.points[gameDataIndex.bonus]);
            switch (Number(gameData.bonus.points[gameDataIndex.bonus])) {
                case 1:{
                    target.card.bonusIcon_1.visible = true;
                    animations.push(true);
                    break;
                }
                case 2: {
                    target.card.bonusIcon_1.visible = true;
                    target.card.bonusIcon_2.visible = true;
                    animations.push(true);
                    break;
                }
            }
            target.revealedBonusLocation = revealedBonus;
            t1.to(target.card.bonusIcon_1.scale,speed,{
                x:1,
                y:1,
            });
            t1.to(target.card.bonusIcon_1.scale,speed,{
                data: revealedBonus,
                x:0.7,
                y:0.7,
                onComplete:function () {
                    var amountUpdate = this.data;

                    target.activeBonusParticles(
                        'cliff',
                        animations,
                        function() {
                            animations.splice(animations.length-1,1);
                            meter.plusBonusMeter(amount,state);
                            checkAllRevealed();
                        },
                        meter.cliffTarget.bind(this,amountUpdate,amount),
                        amount,
                        autoPlay.enabled
                    );
                }
            });
            timeLineArray.push(
                Tween.to(target.card.bonusIcon_2.scale, 0.25, {
                    x: 1,
                    y: 1,
                    onComplete: function () {
                        Tween.to(target.card.bonusIcon_2.scale, 0.25, {
                            x: 0.7,
                            y: 0.7
                        });
                    }
                }));

            t1.play();
        }

        if(!isNaN(Number(gameData.bonus.points[gameDataIndex.bonus]))){
            gameDataIndex.bonus++;
        }
    }



    function setWheel(target) {
        var speed = 0.25;
        if(autoPlay.enabled) {
            speed = 0;
        }

        if(gameData.bonus.wheel) {
            if (!gameDataIndex.wheel) {
                target.card.wheel.visible = true;
                IWLib['helpButton'].enabled = false;
                animations.push(true);
                timeLineArray.push(Tween.to(target.card.wheel.scale, speed, {
                    x: 1.5,
                    y: 1.5,
                    onComplete:function () {
                        timeLineArray.push(Tween.to(target.card.wheel.scale, speed, {
                            x: 0.6,
                            y: 0.6,
                            onComplete:function () {
                                    target.activeBonusParticles('wheel',animations,function () {
                                        meter.activateWheelSymbol();
                                        animations = [];
                                        checkAllRevealed();
                                    },null,null,autoPlay.enabled);
                            }
                        }));
                    }
                }));
            }
            gameDataIndex.wheel = true;
            wheelTriggerCheck = true;
        }
    }

    function checkResolved() {
        if(animations.length === 0) {
            moveStage();
        }
    }

    function checkMatch() {
        if(cards.compare(1)) {
            cards.group(1).forEach(function (element) {
                winningGame_1 = element.setWin();
            });
        }
        if(cards.compare(2)) {
            cards.group(2).forEach(function (element) {
                winningGame_1 = element.setWin();
            });
        }
        cards.compare(3).forEach(function (element) {
            winningGame_2 = element.setWin();
        });
        cards.compare(4).forEach(function (element) {
            winningGame_2 = element.setWin();
        });

        if(winningGame_1 === true || winningGame_2 === true) {
            winningGame = true;
        }

        state.updateScore(cards.prize(),true);
    }

    function checkAllRevealed() {
            if(gameDataIndex.game_1 === 3 && gameDataIndex.game_2 === 3) {
                if(winningGame_1) {
                    lights.lights('game1').on(50);
                } else {
                    lights.lights('game1').off();
                }
            }

        if(cardGroups[2].every(function (e) {
                return e.card.interactive === false;
            }) &&
            cardGroups[3].every(function (e) {
                return e.card.interactive === false;
            })
        ) {
            if(winningGame_2) {
                lights.lights('game2').on(50);
            } else {
                lights.lights('game2').off();
            }
        }


        if(Object.keys(cards.get()).map(function (element) {
                return cards.get(element).winningNumber;
            }).indexOf(null) === -1) {
            IWLib['autoPlayStopButton'].enabled = false;
            IWLib['autoPlayStartButton'].enabled = false;
            IWLib['autoPlayStartButton'].visible = false;
            IWLib['helpButton'].enabled = false;
            setTimeout(function () {
                        state.score('baseGame',cards.prize());
                        checkResolved();
                    },2000);
            }
    }

    function moveStage() {
        if(wheelTriggerCheck === null || wheelTriggerCheck) {
            if(movingStage === false) {
                movingStage = true;
                if (state.score('baseGame') === 0) {
                    lights.lights('game1').off();
                    lights.lights('game2').off();
                }
                state.readyToMove({
                    scoreData: {
                        baseGameScore: {
                            1: cards.winningCards()[1],
                            2: cards.winningCards()[2],
                            3: cards.winningCards()[3].length !== 0 ? cards.winningCards()[3].reduce(function (a, b) {
                                return a + b;
                            }) : 0,
                            4: cards.winningCards()[4].length !== 0 ? cards.winningCards()[4].reduce(function (a, b) {
                                return a + b;
                            }) : 0,
                        },
                        bonuses: {
                            mountain: meter.checkBonus(),
                            wheel: gameDataIndex.wheel,
                        }
                    }
                });
            }
        } else {
            var cardArray = [];
            Object.keys(cards.get()).slice(0,11).forEach(function (e) {
                cardArray.push(cards.get(e));
            });
            setWheel(cardArray[Math.floor((Math.random() * cardArray.length-1) + 1)]);
        }
    }

    return {
        init: function () {
            camera = new PIXI.projection.Camera3d();
            camera.position.set(0, 0);
            camera.setPlanes(350, 30, 10000,true);
            if(IWOrientation.get() === 'landscape') {
                IWLib['baseStage'].addChild(camera);
            } else {
                IWLib['baseGameContainer'].addChildAt(camera,IWLib['baseGameContainer'].length - 7);
            }

            cardsProjContainer = new PIXI.projection.Container3d();
            cardsProjContainer.x = IWLib['game1_container'].x;
            cardsProjContainer.y = IWLib['game1_container'].y;
            camera.addChild(cardsProjContainer);

            cards.init();
            meter.init();

            Object.keys(cards.get()).forEach(function (element) {
               if(cards.get(element).card instanceof PIXI.projection.Sprite3d) {
                   var sprite = new PIXI.Sprite(PIXI.Texture.fromFrame('Games1&2_SymbolFrame'));
                   sprite.name = 'SymbolFrame';

                   sprite.x = cards.get(element).card.x - 112;
                   sprite.y = cards.get(element).card.y - 56;

                   cards.get(element).frame = sprite;
                   cards.get(element).frame.y += 4; 
                   cards.get(element).container = cardsProjContainer;
                   cards.get(element).camera = camera;

                   cardsProjContainer.addChild(cards.get(element).card);
                   cardsProjContainer.addChild(sprite);
               }

               cards.get(element).interact = function () {
                   setPrize(cards.get(element));
                   lastCardPressed = element;
                   cards.get(element).animating = true;
                   if(cards.get(element).card instanceof PIXI.Container) {
                       cards.get(element).animate();
                   }
                       setTimeout(function () {
                           checkMatch(cards.get(element));
                       },1000);

                   checkAllRevealed();
               };
            });

            cardGroups = [
                cards.group(1).slice(0),
                cards.group(2).slice(0),
                cards.group(3).slice(0),
                cards.group(4).slice(0)
            ];

            cardGroups[2].unshift(cards.get('game_3_reveal'));
            cardGroups[3].unshift(cards.get('game_4_reveal'));

            IWApp.ticker.add(function () {
                Object.keys(cards.get()).forEach(function (element) {
                    cards.get(element).winningTexture.rotation -= cards.get(element).winRotationSpeed;
                    if(cards.get(element).card instanceof PIXI.projection.Sprite3d) {
                        cards.get(element).animate();
                    }
                });
            });
            meter.reset();
        },
        setup: function() {
            this.reset();
            gameData = scenarioData.scenario;
            if(gameData.wheel !== "0") {
                wheelTriggerCheck = false;
            }
        },
        active: function() {
            IWSound.play('baseGameMusic',true);
            IWLib['helpButton'].enabled = true;
            IWLib['autoPlayStartButton'].enabled = true;
            IWLib['autoPlayStopButton'].enabled = true;
            IWLib['autoPlayStartButton'].visible = true;
            IWLib['autoPlayStartButtonSheen'].visible = true;
            lights.lights('game1').setMode(0.2,'flash');
            lights.lights('game2').setMode(0.2,'flash');
            cards.enable(true);
            },
        deActive: function() {
            IWLib['helpButton'].enabled = false;
            IWLib['autoPlayStopButton'].enabled = false;
            IWLib['autoPlayButtonContainer'].visible = false;
            if(!gameData.bonus.wheel) {
                autoPlay._enabled = false;
            }
        },
        reset: function () {
            cards.reset();
            meter.reset();
            movingStage = false;
            lastCardPressed = null;
            winningGame = false;
            winningGame_1 = false;
            winningGame_2 = false;
            gameDataIndex = {
                game_1:0,
                game_2:0,
                game_3:0,
                game_4:0,
                bonus:0,
                wheel:false
            };
            gameScore = {
                1:0,
                2:0,
                3:0,
                4:0
            };
            wheelTriggerCheck = null;
            animations = [];
            revealedBonus = 0;
        },
        checkAllRevealed:checkAllRevealed,
        error:function () {
            t1.kill();
            timeLineArray.forEach(function (e) {
               e.kill();
            });
            timeLineArray = null;
        }
    };

});
