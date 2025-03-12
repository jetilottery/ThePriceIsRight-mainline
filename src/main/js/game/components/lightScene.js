define(function (require) {

    var lightArrays = require('game/config/lightArrays');
    var lightCollection = require('game/components/lightCollection');
    var Light = require('game/components/light');

    var IWOrientation = require('skbJet/componentManchester/standardIW/orientation');

    var lights = {};

    function build() {
        var orientation = IWOrientation.get() === 'landscape' ? 0 : 1;

        Object.keys(lightArrays).forEach(function (element) {
            var ammout = lightArrays[element].ammount[orientation];
            var xOffset = lightArrays[element].xOffset[orientation];
            var yOffset = lightArrays[element].yOffset[orientation];
            var x = lightArrays[element].x[orientation];
            var y = lightArrays[element].y[orientation];
            var collection = lights[lightArrays[element].parent];

            for(var i = 0;i<ammout;i++){
                var light = new Light(element+"_"+i);
                light.set(
                    x+(i * xOffset),
                    y+(i * yOffset)
                );
                collection.add(light);
            }
        });
    }

    return {
        init: function () {
            lights.game1 = new lightCollection('baseStage');
            lights.game2 = new lightCollection('baseStage');
            lights.winUpTo = new lightCollection('baseStage');
            lights.baseGameCHMeter = new lightCollection('baseStage');
            lights.baseGameSSMeter = new lightCollection('baseStage');
            lights.spinCliffHangersBtn = new lightCollection('mountainStage');
            lights.showdownScene = new lightCollection('wheelStage');
            lights.showdownBtn = new lightCollection('wheelStage');

            build();
        },
        lights:function (target) {
            return lights[target];
        },
        reset: function () {
          Object.keys(lights).forEach(function (e) {
              lights[e].reset();
          });
        }
    };

});