define(function(require) {

    var PIXI = require('com/pixijs/pixi');
    require('com/pixijs/pixi-projection');

    var IWLib = require('skbJet/componentManchester/standardIW/displayList');
    var IWOrientation = require('skbJet/componentManchester/standardIW/orientation');
    var IWSound = require('skbJet/componentManchester/standardIW/audio');

    require('com/gsap/TweenLite');
    var Tween = window.TweenLite;
    var ease = require('com/gsap/easing/EasePack');

    var wheel;
    var camera;
    var startRotation;
    var nextSound;

    var segmentTextureArray = [
        '3xSymbol',
        '2xSymbol',
        '100xSymbol',
        '2xSymbol',
        '5xSymbol',
        '25xSymbol',
        '3xSymbol',
        '2xSymbol',
        '5xSymbol',
        '10xSymbol',
    ];

    var targetValues = {
        2: [9],
        3: [6],
        5: [8],
        10: [3],
        25: [7],
        100: [10],
    };

    return {
        /**
         * @name: init
         * @description: sets up the PIXI.Projection wheel and PIXI.Projection Camera
         * then adds the sections to the wheel.
         * TODO: add a wheel stop array and logic for wheel to stop at the correct points
         */
        init: function () {
            camera = new PIXI.projection.Camera3d();
            camera.setPlanes(5000, 10, 10, IWOrientation.get() !== 'landscape');
            camera.position.set(
                IWOrientation.get() === 'landscape' ? 880 : 898 ,
                IWOrientation.get() === 'landscape' ? 218 : 436
            );
            IWLib['wheelStageContainer'].addChildAt(camera,1);

            wheel = new PIXI.projection.Container3d();
            wheel.position3d.x = -500;
            wheel.position3d.y = 200;
            wheel.position3d.z = 500;

            startRotation = wheel.euler.x;
            nextSound = startRotation;
            var segments = [];

            /**
             * added the different segments to the wheel
             */
            for(var i = 0; i < 10; i++) {

                segments[i] = new PIXI.projection.Sprite3d(PIXI.Texture.fromFrame(segmentTextureArray[i]));

                segments[i].anchor.x = 0.5;
                segments[i].anchor.y = 0.5;

                segments[i].pivot3d.z = 270;

                /**
                 * makes sure the segments are face outwards to form the wheel shape
                 */
                segments[i].euler.x = (((Math.PI*2)/10)*i);
                wheel.addChild(segments[i]);
            }

            camera.addChild(wheel);

            PIXI.ticker.shared.add(function () {

                wheel.children.forEach(function (segment) {

                    /**
                     * adds culling to the wheel so the back part of the wheel doesn't
                     * draw over the front part of the wheel as there is no drawing
                     * layers setup with PIXI.Projection
                     */

                    var rot = (segment.euler.x + wheel.euler.x) % (Math.PI * 2);

                    if(rot > (Math.PI * 0.46) && rot < (Math.PI * 1.5)) {
                        segment.visible = false;
                    } else {
                        segment.visible = true;
                    }
                });

                camera.updateTransform();

            });
        },
        spin:function (target,cb) {
            target = Number(target);
            var targetAngle = (function () {
                if(targetValues[target].length > 1) {
                    return targetValues[target][Math.floor(Math.random() * targetValues[target].length-1)];
                } else {
                    return targetValues[target][0];
                }
            }());

                Tween.to(wheel.euler,6,{
                    ease:ease.Power1.easeInOut,
                    x:5+(((Math.PI * 2) / 10) * targetAngle)+(2 * (Math.PI*2)),
                    onUpdate:function() {
                        if(wheel.euler.x > nextSound) {
                            nextSound = nextSound+((Math.PI*2)/10);
                            IWSound.play('wheelSpin');
                        }
                    },
                    onComplete:function () {
                        IWSound.play('wheelLand');
                        cb();
                    }
                });
        },
        reset: function () {
            nextSound = startRotation;
            wheel.euler.x = startRotation;
        }
    };

});