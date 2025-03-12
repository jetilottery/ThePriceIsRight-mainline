define(function(require) {

    var IWLib = require('skbJet/componentManchester/standardIW/displayList');
    var IWOrientation = require('skbJet/componentManchester/standardIW/orientation');
    var IWSound = require('skbJet/componentManchester/standardIW/audio');

    var lights = require('game/components/lightScene');

    require('com/gsap/TweenLite');
    var Tween = window.TweenLite;

    var bonusMeter = 0;
    var bonus = false;
    var wheel = false;

    var bonusIcons = [];

    function morph(target,ammount) {
        if(target.visible===false) {
            target.visible = true;
            Tween.to(target.scale,0.1,{
                x: 1.5,
                y: 1.5,
                onComplete:function () {
                    Tween.to(target.scale,0.1, {
                        x: IWOrientation.get() === 'landscape' ? 1 : ammount,
                        y: IWOrientation.get() === 'landscape' ? 1 : ammount,
                    });
                }
            });
        }
    }

    return {
        init: function() {
            bonusIcons[0] = IWLib['bonusMeterIcon1'];
            bonusIcons[2] = IWLib['bonusMeterIcon2'];
            bonusIcons[3] = IWLib['bonusMeterIcon3'];

            bonusIcons.forEach(function (element) {
                element.visible = false;
                element.anchor.set(0.5);
            });

            IWLib['wheelIcon'].anchor.set(0.5);

            if(IWOrientation.get() === 'landscape') {
                bonusIcons.forEach(function (element) {
                    element.scale.x = 0;
                    element.scale.y = 0;
                });
                IWLib['wheelIcon'].scale.x = 1;
                IWLib['wheelIcon'].scale.y = 1;
            } else {
                bonusIcons.forEach(function (element) {
                    element.scale.x = 0.7;
                    element.scale.y = 0.7;
                });
                IWLib['wheelIcon'].scale.x = 0.9;
                IWLib['wheelIcon'].scale.y = 0.9;
            }
        },
        plusBonusMeter: function (num) {
                    bonusMeter += Number(num);
                    //TODO:Show the Symbols

            if(num > 0) {
                switch (bonusMeter) {
                    case 1: {
                        morph(bonusIcons[0],0.7);
                        lights.lights('baseGameCHMeter').setMode(0.3,'flash',{
                            type:'solid',
                            limit: 2
                        });
                        break;
                    }
                    case 2: {
                        morph(bonusIcons[0],0.7);
                        morph(bonusIcons[2],0.7);
                        lights.lights('baseGameCHMeter').setMode(0.3,'flash',{
                            type:'solid',
                            limit: 2
                        });
                        break;
                    }
                    case 3: {
                        morph(bonusIcons[0],0.7);
                        morph(bonusIcons[2],0.7);
                        morph(bonusIcons[3],0.7);

                        lights.lights('baseGameCHMeter').on();

                        IWSound.play('cliffHangersActivated');
                        bonus = true;
                        break;
                    }
                }
            }

        },
        activateWheelSymbol: function () {
            lights.lights('baseGameSSMeter').on();
            wheel = true;
            IWSound.play('wheelAwarded');
            morph(IWLib['wheelIcon'],0.8);
        },
        checkBonus: function () {
            return (bonusMeter === 3);
        },
        bonusMeter:function (){return bonusMeter;},
        checkWheel: function () {
            return wheel;
        },
        reset: function () {
            lights.lights('baseGameSSMeter').off();
            lights.lights('baseGameCHMeter').off();
            bonusMeter = 0;
            bonusIcons.forEach(function (element) {
                element.visible = false;
            });
            IWLib['wheelIcon'].visible = false;
            wheel = false;
        },
        cliffTarget: function (num,amount) {
            var num = num;
            var output = {
                target: null,
                target_2: null,
            };
            if(amount === 2) {
                num -=1;
            }

                switch (num) {
                    case 2: {
                        output.target = {
                            x: IWOrientation.get() === 'landscape' ? 300 : 152,
                            y: IWOrientation.get() === 'landscape' ? 60 : 35
                        };
                        output.target_2 = {
                            x: IWOrientation.get() === 'landscape' ? 380 : 214,
                            y: IWOrientation.get() === 'landscape' ? 40 : 32
                        };
                        break;
                    }
                    case 3: {
                        output.target = {
                            x: IWOrientation.get() === 'landscape' ? 380 : 214,
                            y: IWOrientation.get() === 'landscape' ? 40 : 32
                        };
                        output.target_2 = null;
                        break;
                    }
                    default: {
                        output.target = {
                            x: IWOrientation.get() === 'landscape' ? 210 : 90,
                            y: IWOrientation.get() === 'landscape' ? 80 : 42
                        };
                        output.target_2 = {
                            x: IWOrientation.get() === 'landscape' ? 300 : 152,
                            y: IWOrientation.get() === 'landscape' ? 60 : 35
                        };
                        break;
                    }
                }
                return output;
        }
    };
});
