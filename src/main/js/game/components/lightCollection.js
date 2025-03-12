define(function (require) {

    var PIXI = require('com/pixijs/pixi');
    var IWLib = require('skbJet/componentManchester/standardIW/displayList');

    function Collection(stage,name) {
        var _this = this;
        _this.lightArray = [];
        _this.container = new PIXI.Container();
        _this.activeTween = null;
        _this.timeOut = null;

        if(name !== void(0)) {
            _this.container.name = name;
        } else {
            _this.container.name = 'lightCollection';
        }

        IWLib[stage].addChild(_this.container);
    }

    Collection.prototype.add = function (prop) {
        var _this = this;
        _this.container.addChild(prop.container);
        _this.lightArray.push(prop);
    };

    Collection.prototype.setMode = function (time,type,params) {
        var _this = this;

        _this.clear();

        switch (type) {
            case 'flash': {
                _this.activeTween = _this.flash(time,params);
                break;
            }
        }
    };

    Collection.prototype.flash = function(time,params) {
        var _this = this;
        var set = 0;
        var set_max = 3;

        if(params !== void(0)) {

            if(params.set !== void(0)) {
                set_max = params.set;
            }

            if(params.limit !== void(0)){
                _this.timeOut = setTimeout(function () {
                    if(params.callback !== void(0)) {
                        _this.off();
                        params.callback();
                    } else {
                        _this.off();
                    }
                },params.limit * 1000);
            }

            if(params.type === 'solid') {
                return setInterval(function () {
                    _this.lightArray.forEach(function (element) {
                        if(element.full.visible) {
                            element.switch(0);
                        } else {
                            element.switch();
                        }

                    });
                },time * 1000);
            }
        } else {
            return setInterval(function () {
                _this.lightArray.forEach(function (element,index) {
                    switch ((index+set)%3) {
                        case 0: {
                            element.switch(0);
                            break;
                        }
                        case 1: {
                            element.switch(50);
                            break;
                        }
                        case 2: {
                            element.switch();
                            break;
                        }
                    }
                });
                set=(set+1)%set_max;
            },time * 1000);
        }


    };

    Collection.prototype.off = function () {
        var _this = this;

        _this.clear();

        this.lightArray.forEach(function (element) {
            element.switch(0);
        });
    };

    Collection.prototype.on = function (param) {
        var _this = this;
        var ammount = null;

        if(param !== void(0)) {
            if(param.type !== void(0)) {
                ammount = 50;
            }
        }

        _this.clear();

        this.lightArray.forEach(function (element) {
            element.switch(ammount);
        });
    };

    Collection.prototype.clear = function() {
        var _this = this;

        clearInterval(_this.activeTween);
        clearTimeout(_this.timeOut);
        _this.timeOut = null;
        _this.activeTween = null;
    };

    Collection.prototype.reset = function() {
        var _this = this;
        _this.clear();
        _this.off();
    };

    return Collection;
});