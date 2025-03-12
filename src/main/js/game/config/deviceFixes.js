define(function () {
    // var IWLib = require('skbJet/componentManchester/standardIW/displayList');
    // var PIXI = require('com/pixijs/pixi');

    function getAgent() {
        var arr = navigator.userAgent.split(" ");
        if(arr.indexOf("iPhone") > -1) {
            return "iPhone";
        }
    }
    
    function spinnerFix_iphone() {
        // var spinnerContainer = IWLib['mountainSpinnerContainer'];
        if(getAgent() === "iPhone") {
            return 5;
        } else {
            return -10;
        }
    }

    return {
        spinnerFix_iphone:spinnerFix_iphone
    };
});