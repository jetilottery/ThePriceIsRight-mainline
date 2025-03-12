define(function (require) {
    var IWLib = require('skbJet/componentManchester/standardIW/displayList');
    var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

    require('skbJet/componentManchester/standardIW/prizeData');

    require('com/gsap/TweenMax');
    require('com/gsap/TimelineLite');
    var TimeLine = window.TimelineLite;
    var t1 = null;
    var prizeStruc;
    var pulse = false;

    function updateWinUpToMeter(prizeStructure){
        if(pulse === true) {
            if(prizeStruc !== void(0)) {
                IWLib.winUpToValue.text = SKBeInstant.formatCurrency(prizeStruc).formattedAmount;
                IWLib.winUpToValue_2.text = SKBeInstant.formatCurrency(prizeStructure[1]).formattedAmount;
                playTextSplash();
            } else {
                IWLib.winUpToValue.text = SKBeInstant.formatCurrency(prizeStructure[1]).formattedAmount;
            }
            prizeStruc = prizeStructure[1];
        } else {
            IWLib.winUpToValue.text = SKBeInstant.formatCurrency(prizeStructure[1]).formattedAmount;
        }
    }

    function setupTextSplash(textA, textB) {
        t1 = new TimeLine({
            onComplete:function () {
                if(prizeStruc !== void(0)) {
                    textA.text = SKBeInstant.formatCurrency(prizeStruc).formattedAmount;
                }
                textA.alpha = 1;
                textA.scale.set(
                    Math.min(165 / textA.texture.orig.width, 1)
                );
                textB.alpha = 0;
                textB.scale.set(0.5);
            }
        });

        t1.to(textA.scale,0.5,{
            x:1.5,
            y:1.5,
        },0);
        t1.to(textA,0.5,{alpha:0},0);

        t1.to(textB.scale,0.5,{
            x:1,
            y:1,
            onUpdate:function () {
                textB.scale.set(
                    Math.min(165 / textB.texture.orig.width, 1)
                );
            }
        },0);
        t1.to(textB,0.5,{alpha:1},0);
    }

    function playTextSplash() {
        t1.play(0);
    }

    msgBus.subscribe('PrizeData.PrizeStructure', updateWinUpToMeter);

    return {
        init:function () {

            IWLib.winUpToValue_2.text = IWLib.winUpToValue.text;
            IWLib.winUpToValue_2.alpha = 0;
            IWLib.winUpToValue_2.scale.set(0.5);

            setupTextSplash(IWLib.winUpToValue,IWLib.winUpToValue_2);
        },
        pulseEnabled:function (bool) {
            pulse = bool;
        }
    };

});
