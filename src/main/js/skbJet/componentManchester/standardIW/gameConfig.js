define(function(require) {
    var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    var resources = require('skbJet/component/resourceLoader/resourceLib');
    var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');

    /*
     * gameConfig
     * Consolidates the various config options into a single object that the game can read settings
     * from. Order of precedence, from low to high:
     * 1. Locally registered config (ie /template/config.js, /custom/config.js)
     * 2. Channel config as window.gameConfig (/assetPacks/desktop/layout/config.js)
     * 3. Site config (i18n/default/default/config.json)
     * 4. RGS config (injected in clientConfig or jLotteryParams)
     */

    var config = {};
    config.ukgc = false;

    function register(/*newConfigs*/) {
        for (var l = arguments.length, i = 0; i < l; i++) {
            Object.assign(config, arguments[i]);
        }
    }

    Object.defineProperty(config, 'register', {
        value: register,
        writeable: false,
    });

    function onUpdateGameParameters() {
        var windowGameConfig = window.gameConfig || {};
        var rgsSkinConfig = SKBeInstant.config.customBehavior || {};
        var localSiteConfig = resources.i18n.config;

        Object.assign(config, windowGameConfig, localSiteConfig, rgsSkinConfig);
    }

    function onSystemInit(data) {
        var rawPresVal = data.gameConfig.rgPresentation;
        config.ukgc = rawPresVal !== undefined ? (typeof rawPresVal === "boolean" ? rawPresVal : rawPresVal.toLowerCase() === "true") : false;
    }

    msgBus.subscribe('platformMsg/Kernel/System.Init', onSystemInit);
    msgBus.subscribe('jLotterySKB.updateGameParameters', onUpdateGameParameters);

    return config;
});
