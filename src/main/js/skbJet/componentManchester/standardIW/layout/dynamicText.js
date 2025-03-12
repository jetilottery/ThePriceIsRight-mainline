define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  var resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');

  // Track all the text objects that require wagerType variation.
  // Each item is an array like [textObject, stringname]
  var managedText = [];

  function setText(textObj, stringName) {
    var string = resources.i18n.Game[stringName];
    if (string === undefined) {
      throw new Error('String `' + stringName + '` not found in strings file.');
    }
    if (string.BUY && SKBeInstant.config.wagerType === 'BUY') {
      string = string.BUY;
      managedText.push([textObj, stringName]);
    }
    if (string.TRY && SKBeInstant.config.wagerType === 'TRY') {
      string = string.TRY;
      managedText.push([textObj, stringName]);
    }
    textObj.text = string;
  }

  function updateManagedText() {
    managedText.forEach(function updateText(item) {
      var strings = resources.i18n.Game[item[1]];
      item[0].text = (SKBeInstant.config.wagerType === 'BUY') ? strings.BUY : strings.TRY;
    });
  }

  // Update all text whenever new game params are received
  msgBus.subscribe('SKBeInstant.gameParametersUpdated', updateManagedText);

  return {
    setText: setText,
    updateManagedText: updateManagedText,
  };
});
