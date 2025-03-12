define(function (require) {

    var IWLib = require('skbJet/componentManchester/standardIW/displayList');
    var buttonBar = require('skbJet/componentManchester/standardIW/ui/buttonBar/component');
    var autoPlayButtonComponent = require('skbJet/componentManchester/standardIW/ui/autoPlayButton/component');
    var ticketSelectBar = require('skbJet/componentManchester/standardIW/ui/ticketSelectBar/component');
    var networkActivity = require('skbJet/componentManchester/standardIW/ui/networkActivity/component');
    var IWSound = require('skbJet/componentManchester/standardIW/audio');
    var meterData = require('skbJet/componentManchester/standardIW/meterData');
    var scene = require('game/engine/scene');
    var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

    require('com/gsap/TimelineLite');
    var TimeLine = window.TimelineLite;

    var interval = 5;
    var intervalHolder = null;

    msgBus.subscribe('UI.updateButtons',function (data) {
        if(data.ticketSelect && IWLib.ticketSelectBar.visible === true) {
            IWLib.buttonBarBG.alpha = 1;
            IWLib.buttonBarBG.visible = true;
        }
    });

    return {
        init: function (link) {
            var autoPlayButton = autoPlayButtonComponent({
                autoPlayStart: IWLib.autoPlayStartButton,
                autoPlayStop: IWLib.autoPlayStopButton,
                container: IWLib.autoPlayButtonContainer,
            });
            // IWLib.autoPlayButtonContainer.addChild(autoPlayButton);

            buttonBar = buttonBar({
                background: IWLib.buttonBar,
                buyButton: IWLib.buyButton,
                tryButton: IWLib.tryButton,
                playAgainButton: IWLib.playAgainButton,
                tryAgainButton: IWLib.tryAgainButton,
                moveToMoneyButton: IWLib.moveToMoneyButton,
                helpButton: IWLib.helpButton,
                homeButton: IWLib.homeButton,
                exitButton: IWLib.exitButton,
                autoPlayButton: autoPlayButton,
            });
            
            ticketSelectBar = ticketSelectBar({
                background: IWLib.ticketSelectBar,
                costValue: IWLib.ticketSelectCostValue,
                costUpButton: IWLib.ticketCostUpButton,
                costDownButton: IWLib.ticketCostDownButton,
                indicatorContainer: IWLib.ticketCostIndicators,
            });

            networkActivity = networkActivity({
                spinner: IWLib.networkActivity
            });

            var sheen = IWLib['autoPlayStartButtonSheen'];
            sheen.alpha = 0;

            function setIdleSheen() {
                var timeLine = new TimeLine();
                timeLine.to(sheen,0.5,{
                    alpha:0.7
                });
                timeLine.to(sheen,0.5,{
                    alpha:0
                });
                intervalHolder = setInterval(function () {
                    timeLine.restart();
                },interval/2 * 1000);
            }

            setIdleSheen();

            IWLib.ticketCostDownButton.on('buttonpress', function () {
                IWSound.playSequential('BetDown');
            });
            IWLib.ticketCostUpButton.on('buttonpress', function () {
                if(meterData.ticketCost === meterData.maxTicketCost) {
                    IWSound.play('BetMax');
                } else {
                    IWSound.playSequential ('BetUp');
                }
            });

            IWLib.resultPlaqueCloseBtn.on('buttonpress', function () {
                IWSound.play('click');
                IWLib['helpButton'].enabled = true;
                scene.reset();
            });

            IWLib.buyButton.on('buttonpress',function () {
                IWSound.play('play');
                link.pulse.pulseEnabled(false);
                IWLib.buttonBarBG.visible = false;
            });

            IWLib.helpButton.on('buttonpress',function () {
                if(IWLib.help_plaque_container.children[0].alpha === 0 && IWLib.help_plaque_container.children[0].visible === true) {
                   IWLib['autoPlayStartButtonSheen'].visible = false;
               }
                if(IWLib.help_plaque_container.children[0].alpha === 1 && IWLib.help_plaque_container.children[0].visible === true){
                   IWLib['autoPlayStartButtonSheen'].visible = true;
               }
            });

            IWLib.close_help_btn.on('buttonpress',function () {
                if(IWLib.help_plaque_container.children[0].alpha === 0 && IWLib.help_plaque_container.children[0].visible === true) {
                    IWLib['autoPlayStartButtonSheen'].visible = false;
                }
                if(IWLib.help_plaque_container.children[0].alpha === 1 && IWLib.help_plaque_container.children[0].visible === true){
                    IWLib['autoPlayStartButtonSheen'].visible = true;
                }
            });

            [
                // 'helpButton',
                'next_btn',
                'back_btn',
                'audio_on_btn',
                'audio_off_btn',
                'close_help_btn',
                // 'homeButton',
                // 'exitButton',
                'autoPlayStartButton',
                'autoPlayStopButton'
            ].forEach(function (e) {
                IWLib[e].on('buttonpress',function () {
                    IWSound.playSequential('click');
                });
            });

        },
        get: function (target) {
            return IWLib[target];
        }
    };

});
