define(function(require) {
    var scene = require('game/engine/scene');
    var meter = require('game/components/meter');
    var gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
    var meterData = require('skbJet/componentManchester/standardIW/meterData');
    var transitionPlaque = require('game/components/transitionPlaque');
    var resultPlaque = require('game/components/resultPlaque');

    var baseStage;
    var mountainStage;
    var wheelStage;

    var score = {
        baseGame:0,
        mountain:0,
        wheel:0,
        total:0
    };

    var plaqueQueue = [];

    var scoreData;

    function updateScore(val,set) {
        if(val > 0) {
            if(set !== void(0)) {
                meterData.win = val;
            } else {
                meterData.win += val;
            }
        }
    }

    return {
        init:function(b,m,w) {
            baseStage = b;
            mountainStage = m;
            wheelStage = w;
            transitionPlaque.init();
        },
        updateScore:updateScore,
        score:function(set,val) {
            if(val !== void(0)) {
                score[set] = val;

                if(score.wheel !== 0) {
                    score.total = (score.baseGame + score.mountain) * score.wheel;
                } else {
                    score.total = score.baseGame + score.mountain;
                }
            } else {
                return score[set];
            }
        },
        readyToMove : function(params) {
            baseStage.deActive();
            mountainStage.deActive();
            wheelStage.deActive();            

            if (params.scoreData.baseGameScore){
                scoreData = params.scoreData;    
            }
            else{
                scoreData.mountain = params.scoreData.mountain; 
                scoreData.wheel = params.scoreData.wheel;
            }

            scoreData.total = score.total;

            transitionPlaque.parseResult(scoreData);

            function gameComplete(){
                resultPlaque.parseResult(scoreData);
                gameFlow.next();  
            }

            function transition(cb){
                transitionPlaque.show(function () {
                    scene.moveStage(2,cb);
                });
            }

            switch (scene.get()){
                case 'baseStage':
                    if (meter.checkBonus()){
                        transition(mountainStage.active);
                    }
                    else if (meter.checkWheel()){
                        transition(wheelStage.active);
                    }
                    else{
                        gameComplete();    
                    }
                    break;
                case 'mountainStage':
                    if (meter.checkWheel()){
                        transition(wheelStage.active);
                    }
                    else{
                        gameComplete();     
                    }
                    break;
                case 'wheelStage':
                    gameComplete();
                    break; 
            }
        },
        getScore:function(){
            return score;
        },
        reset: function() {
            transitionPlaque.reset();
            score = {
                baseGame:0,
                mountain:0,
                wheel:0,
                total:0
            };
        },
        plaqueQueue: function (prop) {
            if(prop !== void(0)) {
                plaqueQueue.push(prop);
            } else {
                return plaqueQueue;
            }
        }
    };
});
