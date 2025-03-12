define(function (require) {

    var IWLib = require('skbJet/componentManchester/standardIW/displayList');
    var IWOrientation = require('skbJet/componentManchester/standardIW/orientation');

    return {
        init: function () {
            IWLib.game_3_4_info.scale.x = Math.min(700 / (IWLib.game_3_4_info.width / IWLib.game_3_4_info.scale.x), 1);
            IWLib.game_3_4_info.scale.y = Math.min(700 / (IWLib.game_3_4_info.width / IWLib.game_3_4_info.scale.x), 1);

            IWLib.winUpToLabel.scale.x = Math.min(200 / (IWLib.winUpToLabel.width / IWLib.winUpToLabel.scale.x), 1);
            IWLib.winUpToLabel.scale.y = Math.min(200 / (IWLib.winUpToLabel.width / IWLib.winUpToLabel.scale.x), 1);

            IWLib.winningSymbols.scale.x = Math.min(150 / (IWLib.winningSymbols.width / IWLib.winningSymbols.scale.x), 1);
            IWLib.winningSymbols.scale.y = Math.min(150 / (IWLib.winningSymbols.width / IWLib.winningSymbols.scale.x), 1);

            IWLib.congratulationsText.scale.x = Math.min(650 / (IWLib.congratulationsText.width / IWLib.congratulationsText.scale.x), 1);
            IWLib.congratulationsText.scale.y = Math.min(650 / (IWLib.congratulationsText.width / IWLib.congratulationsText.scale.x), 1);

            if(IWOrientation.get() === IWOrientation.LANDSCAPE) {
                IWLib.tutorial_splash.scale.x = Math.min(450 / (IWLib.tutorial_splash.width / IWLib.tutorial_splash.scale.x), 1);
                IWLib.tutorial_splash.scale.y = Math.min(450 / (IWLib.tutorial_splash.width / IWLib.tutorial_splash.scale.x), 1);
            } else {
                IWLib.tutorial_splash.scale.x = Math.min(250 / (IWLib.tutorial_splash.width / IWLib.tutorial_splash.scale.x), 1);
                IWLib.tutorial_splash.scale.y = Math.min(250 / (IWLib.tutorial_splash.width / IWLib.tutorial_splash.scale.x), 1);

            }
        }
    };

});
