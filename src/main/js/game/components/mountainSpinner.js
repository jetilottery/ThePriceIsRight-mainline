define(function (require) {

    var IWLib = require('skbJet/componentManchester/standardIW/displayList');
    var IWApp = require('skbJet/componentManchester/standardIW/app');
    var ease = require('com/gsap/easing/EasePack');
    var IWSound = require('skbJet/componentManchester/standardIW/audio');
    var lights = require('game/components/lightScene');
    var fixes = require('game/config/deviceFixes');

    require('com/gsap/TimelineLite');
    var TimeLine = window.TimelineLite;

    require('com/gsap/TweenLite');
    var Tween = window.TweenLite;

    function Spinner() {
        var _this = this;

        _this.numbers = {
            next: 0,
            curr: 0
        };

        _this.timeLine = new TimeLine();

        _this.targetNumber = 0;

        _this.buttonLights = false;

        _this.num1 = IWLib['mountainSpinnerNum_1'];
        _this.num2 = IWLib['mountainSpinnerNum_2'];
        _this.container = IWLib['mountainSpinnerContainer'];

        _this.spinning = false;

        _this.num1.text = _this.nextNumber(_this.num2.text);
        _this.num2.text = _this.nextNumber(_this.num1.text);

        _this.num1.anchor.x = 0.5;
        _this.num2.anchor.x = 0.5;

        _this.mask = IWLib['mountainSpinnerContainerMask'];

        _this.num1.mask = _this.mask;
        _this.num2.mask = _this.mask;


        _this.num1.y = (_this.mask.y - _this.mask.height);

        IWApp.ticker.add(function () {
          _this.update({speed:50});
        });

    }



    Spinner.prototype.nextNumber = function(val) {
        var nonMatchValue = Number(val);
        var numArray = [1,2,3,4,5,6,7,8,9,10,11,12];
        numArray.splice(numArray.indexOf(nonMatchValue),nonMatchValue);
        return numArray[Math.floor((Math.random() * numArray.length))];
    };
    Spinner.prototype.spin = function(targetNumber,cb) {
        var _this = this;
        _this.spinning = true;
        lights.lights('spinCliffHangersBtn').setMode(0.2,'flash');
        Tween.to({},2,{onComplete:function () {_this.stop(targetNumber,cb);}});
    };
    Spinner.prototype.stop = function(targetNumber,cb) {
        var _this = this;
        lights.lights('spinCliffHangersBtn').reset();

        _this.spinning = false;
        _this.targetNumber = targetNumber;
        _this.num1.text = _this.targetNumber;
        _this.num2.y = (_this.mask.y - _this.mask.height) -28;
        _this.buttonLights = false;
        Tween.to(_this.num1,0.2,{
            ease: ease.Bounce.easeOut,
            y: ((_this.mask.y - (_this.mask.height/2))+(_this.num1.height / 2))+fixes.spinnerFix_iphone(),
            onComplete:function () {
                IWSound.play('revealSymbol');
                cb();
            }
        });
    };
    Spinner.prototype.reset = function(){
        var _this = this;
        _this.spinning = false;
    };
    Spinner.prototype.update = function(param) {
        var _this = this;
        if(_this.spinning) {
            _this.num1.y += param.speed;
            _this.num2.y += param.speed;
            if(_this.num1.y > _this.mask.y + (_this.mask.height)) {
                _this.num1.y = _this.mask.y - _this.mask.height;
                _this.num1.text = this.nextNumber(_this.num2.text);
            }
            if(_this.num2.y >  _this.mask.y + (_this.mask.height)) {
                _this.num2.y = _this.mask.y - _this.mask.height;
                _this.num2.text = this.nextNumber(_this.num1.text);
            }
        }
    };

    return Spinner;

});