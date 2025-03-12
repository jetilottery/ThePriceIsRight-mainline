define(function(require) {
  var PIXI = require('com/pixijs/pixi');
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var fontColors = require('skbJet/componentManchester/standardIW/fontColors');
  var gameStyles = require('game/display/textStyles');

  var styles = {
    parse: function(styleName) {
      var style = styles[styleName];
      if (!style) {
        throw new Error('Text style `' + styleName + '` does not exist in the style map');
      }
      // If the text style has a fill that can be replaced by the fontColors util then do so
      if (style.fill && PIXI.utils.TextureCache[style.fill] !== undefined) {
        style.fill = fontColors(style.fill);
      }

      return new PIXI.TextStyle(style);
    }
  };

  var templateStyles = {
    mainButtonEnabled: {
      fontFamily: 'oswald',
      fontSize: 38,
      fill: 'fontColourMainButtonEnabled',
    },
    mainButtonDisabled: {
      fontFamily: 'oswald',
      fontSize: 38,
      fill: 'fontColourMainButtonDisabled',
    },
    mainButtonOver: {
      fontFamily: 'oswald',
      fontSize: 38,
      fill: 'fontColourMainButtonOver',
    },
    mainButtonPressed: {
      fontFamily: 'oswald',
      fontSize: 41,
      fill: 'fontColourMainButtonPressed',
    },

    footerValue: {
      fontFamily: 'oswald',
      fill: 'fontColourFooterValue',
    },
    footerLabel: {
      fontFamily: 'oswald',
      fill: 'fontColourFooterTitle',
    },

    ticketSelectCostValue: {
      fontFamily: 'oswald',
      fontSize: 65,
      fill: 'fontColourPricePointValue',  
    },
    ticketSelectCostLabel: {
      fontFamily: 'oswald',
      fontSize: 26,
      fill: 'fontColourPricePointTitle',
    },

    howToPlayTitle: {
      fill: 'fontColourTutorialTitle',
      fontFamily: 'oswald',
      fontSize: 40,
      fontWeight: 'bold',
    },
    howToPlayText: {
      fill: 'fontColourTutorialBodyText',
      fontFamily: 'oswald',
    },
  
    tutorialOKButtonEnabled: {
      fontFamily: 'oswald',
      fontSize: 38,
      fill: 'fontColourTutorialOKButtonEnabled',
    },
    tutorialOKButtonOver: {
      fontFamily: 'oswald',
      fontSize: 38,
      fill: 'fontColourTutorialOKButtonOver',
    },
    tutorialOKButtonPressed: {
      fontFamily: 'oswald',
      fontSize: 41,
      fill: 'fontColourTutorialOKButtonPressed',
    },
    versionText: {
      fontSize: 14,
      fontFamily: 'oswald',
      fill: 'fontColourTutorialBodyText',
    },

    resultPlaqueOKButtonEnabled: {
      fontFamily: 'oswald',
      fontSize: 38,
      fill: 'fontColourEndOfGameMessageOKButtonEnabled',
    },
    resultPlaqueOKButtonPressed: {
      fontFamily: 'oswald',
      fontSize: 41,
      fill: 'fontColourEndOfGameMessageOKButtonPressed',
    },
    resultPlaqueOKButtonOver: {
      fontFamily: 'oswald',
      fontSize: 38,
      fill: 'fontColourEndOfGameMessageOKButtonOver',
    },
  
    losePlaqueBody: {
      fontFamily: 'oswald',
      fontSize: 70,
      fontWeight: 'bold',
      align: 'center',
      fill: 'fontColourEndOfGameMessageNoWinBodyText',
    },
    winPlaqueBody: {
      fontFamily: 'oswald',
      fontSize: 60,
      align: 'center',
      fill: 'fontColourEndOfGameMessageWinBodyText',
    },
    winPlaqueValue: {
      fontFamily: 'oswald',
      fontSize: 120,
      fontWeight: 'bold',
      fill: 'fontColourEndOfGameMessageWinValue',
    },

    errorMessage: {
      fontFamily: 'oswald',
      fontSize: 30,
      align: 'center',
    },
    errorButtonEnabled: {
      fontFamily: 'oswald',
      fontSize: 38,
      fill: 'fontColourTimeOutButtonEnabled',
    },
    errorButtonOver: {
      fontFamily: 'oswald',
      fontSize: 38,
      fill: 'fontColourTimeOutButtonOver',
    },
    errorButtonPressed: {
      fontFamily: 'oswald',
      fontSize: 41,
      fill: 'fontColourTimeOutButtonPressed',
    },
  };

  function onAssetsLoadedAndGameReady() {
    var windowTextStyles = window.gameTextStyles || {};
    Object.assign(styles, templateStyles, gameStyles, windowTextStyles);
  }

  msgBus.subscribe('jLotteryGame.assetsLoadedAndGameReady', onAssetsLoadedAndGameReady);

  return styles;
});
