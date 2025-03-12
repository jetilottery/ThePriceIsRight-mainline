define(function (require) {

    var cards = require('game/components/baseStageCards');
    var mountain = require('game/stages/mountainStage');
    var wheel = require('game/stages/wheelStage');
    var scene = require('game/engine/scene');
    var IWLib = require('skbJet/componentManchester/standardIW/displayList');
    var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

    require('com/gsap/TweenLite');
    var Tween = window.TweenLite;

    var speed = 0;
    var rowDelay = 0;
    var cardGroups;
    var unrevealed = [
        [],
        [],
        [],
        []
    ];
    var tweenArray = [];

    function findUnrevealed() {
        cardGroups.forEach(function (element,i) {
            element.forEach(function (e) {
                if(e.enabled === true) {
                    unrevealed[i].push(e);
                }
            });
        });
    }

    function autoPlayStart() {
        IWLib['helpButton'].enabled = false;
        IWLib['autoPlayStartButtonSheen'].visible = true;
        findUnrevealed();
        if(scene.get() === 'baseStage') {

            var u = [];
            unrevealed.forEach(function (e) {
                if(e.length > 0) {
                    u.push(e);
                }
            });

            IWLib['autoPlayButtonContainer'].visible = false;
            u.forEach(function (element,index) {
                tweenArray[index] = Tween.to({}, rowDelay * index, {
                        onComplete:function () {
                            u[index].forEach(function (e,i) {
                                if(e.card.interactive === true) {
                                    e.card.interactive = false;
                                    Tween.to({},speed*i,{
                                        onComplete:function() {
                                            e.reveal();
                                        }
                                    });
                                }
                            });
                        }
                    });
            });
        }
        if(scene.get() === 'mountainStage') {
                mountain.startSpin();
        }
        if(scene.get() === 'wheelStage') {
            wheel.spin();
         }
    }

    function autoPlayStop() {
         if(scene.isMoving() === false) {
             //IWLib['helpButton'].enabled = true;
         }
    }

    msgBus.subscribe('Game.AutoPlayStart',autoPlayStart);
    msgBus.subscribe('Game.AutoPlayStop',autoPlayStop);

    return {
        init:function (s,r) {
            speed = s;
            rowDelay = r;

            cardGroups = [
                cards.group(1).slice(0),
                cards.group(2).slice(0),
                cards.group(3).slice(0),
                cards.group(4).slice(0)
            ];

            cardGroups[2].unshift(cards.get('game_3_reveal'));
            cardGroups[3].unshift(cards.get('game_4_reveal'));
        },
        reset: function () {
            IWLib['autoPlayButtonContainer'].visible = true;


            unrevealed = [
                [],
                [],
                [],
                []
            ];
        },
        tweenArray: function () {
            return tweenArray;
        }
    };

});