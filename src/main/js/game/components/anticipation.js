define(function (require) {

    require('com/gsap/TweenLite');
    var Tween = window.TweenLite;
    var ease = require('com/gsap/easing/EasePack');

    var idle = false;
    var points = [];
    var active = false;
    var delay = 5;
    var timeout = 5;

    var toogleActive = function(params){
      active = !active;
      if(params !== void(0)) {
          if(params.delay !== void(0)) {
              delay = params.delay;
          }
      }
    };


    var resetIdleStatus = function () {
      idle = false;
    };

    var setIdleAnimtation = function (params) {
        if(params.points !== void(0)) {
            params.points.forEach(function (e) {
                points.push(e);
                e.anticipation.x = -300;
                e.anticipation.visible = false;
            });
        }
    };

    var playIdleAnimation = function () {
        var rand = Math.floor((Math.random() * points.length-1) + 1);
        var startPos = -150;

        if(points[rand] !== void(0)) {
            if(points[rand].card.interactive ){
                points[rand].anticipation.visible = true;
                points[rand].anticipation.x = startPos;
                Tween.to(points[rand].anticipation,0.5,{
                    x:150,
                    ease:ease.SlowMo.ease.config(0.4, 0.4, false),
                    onComplete:function () {
                        points[rand].anticipation.x = startPos;
                        points[rand].anticipation.visible = false;
                    }
                });
            }
        }
    };

    var checkIdleStatus = function () {
        setInterval(function () {
            idle = true;
        },timeout * 1000);
        setInterval(function () {
            if(idle && active) {
                playIdleAnimation();
            }
        },delay * 1000);
    };

    return {
        toogleActive:toogleActive,
        checkIdleStatus:checkIdleStatus,
        resetIdleStatus:resetIdleStatus,
        setIdleAnimtation:setIdleAnimtation
    };

});