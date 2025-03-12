define(function (require) {

    var howToPlayComponent = require('skbJet/componentManchester/standardIW/ui/howToPlay/component');
    var errorPlaqueComponent = require('skbJet/componentManchester/standardIW/ui/errorPlaque/component');
    var audioButtonComponent = require('skbJet/componentManchester/standardIW/ui/audioButton/component');
    var IWLib = require('skbJet/componentManchester/standardIW/displayList');
    var Plaques = {};

    function resetButtonBarBG() {
        IWLib.buttonBarBG.visible = false;
        IWLib.helpOverlay.visible = false;
        if(IWLib.resultPlaque.visible === true) {
            IWLib.buttonBarBG.visible = true;
            IWLib.helpOverlay.visible = true;
        }
        if(IWLib.ticketSelectBar.visible === true) {
            IWLib.buttonBarBG.visible = true;
        }
    }

    return {
        init: function () {
            var audioButton = audioButtonComponent({
                audioOn: IWLib.audio_on_btn,
                audioOff: IWLib.audio_off_btn,
            });
            IWLib.audioButtonContainer.addChild(audioButton);

            Plaques.help = howToPlayComponent({
                pageContainer: IWLib.help_plaque_pages,
                background: IWLib.help_plaque,
                title: IWLib.tutorial_title,
                audioButton: IWLib.audioButtonContainer,
                closeButton: IWLib.close_help_btn,
                nextButton: IWLib.next_btn,
                previousButton: IWLib.back_btn,
                indicatorContainer: IWLib.help_plaque_indicators,
                indicatorOnFill: 0x15a0ff,
            });


            IWLib.help_plaque_container.addChild(Plaques.help);
            IWLib.helpOverlay.visible = false;

            Plaques.help.onShow = function() {
                IWLib.buttonBarBG.visible = true;
                IWLib.buttonBarBG.alpha = 1;
                IWLib.helpOverlay.visible = true;
            };

            Plaques.help.onHide = function() {
                resetButtonBarBG();
            };

            Plaques.error = errorPlaqueComponent({
                background: IWLib.error_plaque,
                messageText: IWLib.error_plaque_text,
                exitButton: IWLib.close_error_btn,
                timeoutExitButton:IWLib.timeoutExitButton,
                timeoutContinueButton:IWLib.timeoutContinueButton
            });
            IWLib.error_plaque_container.addChild(Plaques.error);

        },
        endGameAudio: function() {

        },
        get: function (target) {
            return Plaques[target];
        },
        reset:function () {
            resetButtonBarBG();
        }
    };
});
