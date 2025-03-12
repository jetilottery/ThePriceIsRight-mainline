define(function (require){

    var textStyles = require('game/display/textStyles');
    var PIXI = require('com/pixijs/pixi');
    var gameState = require('game/engine/gameState');

    require('com/gsap/TweenLite');
    require('com/gsap/TimelineLite');

    var TimeLine = window.TimelineLite;

    var Point = function (params) {
        var _this = this;
        _this.assignedNumber = params.assignedNumber;
        _this.sprite = new PIXI.Sprite(PIXI.Texture.fromFrame('NumberLine_Highlight_White'));
        _this.winValueContainer = null;
        _this.sprite.anchor.x = 0.5;
        _this.sprite.anchor.y = 0.5;

        _this.valueBoxes = params.valueBoxes;
        _this.yodller = params.yodller;
        _this.segmentArray = params.segmentArray;
        _this.prize = params.prize;
        _this.textArray = params.textArray;
        _this.timeLine;
        _this.sprite.visible = false;
        _this.pointSet = false;
        _this.steppedOn = false;
    };
    Point.prototype.set = function (show,target) {
        var _this = this;
        _this.sprite.visible = show;

        if(target!==null) {
            if(Number(target)!==0) {
                _this.valueBoxes.forEach(function (e,index) {
                    if(e.associatedPoints.indexOf(_this.yodller.nextPoint-1)>-1) {
                        if(index===4){
                            e.setToWin(_this.yodller.nextPoint-1,true);
                        } else {
                            e.setToWin(_this.yodller.nextPoint-1);
                            _this.segmentArray[_this.yodller.nextPoint-1].texture = PIXI.Texture.fromFrame('MountainSegment_White');
                        }
                        gameState.updateScore(e.winAmmount);
                        _this.prize = e.winAmmount;
                    }
                });
                _this.sprite.texture = PIXI.Texture.fromFrame('NumberLine_Highlight_White');
            } else {
                _this.sprite.texture = PIXI.Texture.fromFrame('NumberLine_Highlight_Grey');
                _this.textArray[_this.yodller.nextPoint-1].style = textStyles['mountainNumberINV'];
            }
            _this.pointSet = true;


        }
    };

    Point.prototype.reset = function() {
        var _this = this;
        _this.sprite.visible = false;
        _this.pointSet = false;
        _this.steppedOn = false;
        _this.prize = 0;
    };

    Point.prototype.getScore = function() {
        var _this = this;
        return _this.prize;
    };

    Point.prototype.step = function (point) {
        var _this = this;
        _this.sprite.scale.set(0,0);
        _this.timeLine = new TimeLine();
        _this.sprite.texture = PIXI.Texture.fromFrame('NumberLine_Highlight_White');

        if(point === _this.assignedNumber) {
            _this.sprite.visible = true;
            _this.timeLine.to(_this.sprite.scale,0.1,{x:1.5,y:1.5});
                _this.timeLine.to(_this.sprite.scale,0.1,{x:1,y:1,onComplete:function () {
                        _this.sprite.scale.set(1,1);
                    }});
                _this.timeLine.play();
        } else {
            _this.timeLine.to({},0.1,{onComplete:function (){
                    _this.sprite.visible = true;
                    _this.sprite.scale.set(0,0);
                }});
            _this.timeLine.to(_this.sprite.scale,0.5,{x:1,y:1});
            _this.timeLine.to(_this.sprite.scale,0.5,{x:0,y:0});
            _this.timeLine.to({},0.1,{onComplete:function (){
                    if(_this.pointSet !== true) {
                        _this.sprite.visible = false;
                        _this.steppedOn = true;
                    }
                    _this.sprite.scale.set(1,1);
                }});
            _this.timeLine.play();
        }
    };

    return Point;
});