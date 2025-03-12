define({
  _BASE_PANEL: {
    children: ['buttonBar'],
  },

  /*
  * UI Panel
  */
  buttonBar: {
    type: 'container',
    landscape: { x: 0, y: 649 },
    portrait: { x: 0, y: 1023 },
    children: [
      'helpButton',
      'homeButton',
      'exitButton',
      'playAgainButton',
      'tryAgainButton',
      'buyButton',
      'tryButton',
      'moveToMoneyButton',
    ],
  },
  helpButton: {
    type: 'button',
    landscape: { x: 1385, y: 50 },
    portrait: { x: 755, y: 50 },
    textures: {
      enabled: 'tutorialButtonEnabled',
      disabled: 'tutorialButtonDisabled',
      over: 'tutorialButtonOver',
      pressed: 'tutorialButtonPressed',
    },
  },
  homeButton: {
    type: 'button',
    landscape: { x: 55, y: 50 },
    portrait: { x: 55, y: 50 },
    textures: {
      enabled: 'homeButtonEnabled',
      over: 'homeButtonOver',
      pressed: 'homeButtonPressed',
      disabled: 'homeButtonDisabled',
    },
  },
  exitButton: {
    type: 'button',
    landscape: { x: 720, y: 50 },
    portrait: { x: 405, y: 50 },
    string: 'button_exit',
    textures: {
      enabled: 'mainButtonEnabled',
      over: 'mainButtonOver',
      pressed: 'mainButtonPressed',
      disabled: 'mainButtonDisabled',
    },
    style: {
      enabled: 'mainButtonEnabled',
      over: 'mainButtonOver',
      pressed: 'mainButtonPressed',
      disabled: 'mainButtonDisabled',
    },
  },
  buyButton: {
    type: 'button',
    landscape: { x: 720, y: 50 },
    portrait: { x: 405, y: 50 },
    string: 'button_buy',
    textures: {
      enabled: 'mainButtonEnabled',
      over: 'mainButtonOver',
      pressed: 'mainButtonPressed',
      disabled: 'mainButtonDisabled',
    },
    style: {
      enabled: 'mainButtonEnabled',
      over: 'mainButtonOver',
      pressed: 'mainButtonPressed',
      disabled: 'mainButtonDisabled',
    },
  },
  tryButton: {
    type: 'button',
    landscape: { x: 868, y: 50 },
    portrait: { x: 553, y: 50 },
    string: 'button_try',
    textures: {
      enabled: 'mainButtonEnabled',
      over: 'mainButtonOver',
      pressed: 'mainButtonPressed',
      disabled: 'mainButtonDisabled',
    },
    style: {
      enabled: 'mainButtonEnabled',
      over: 'mainButtonOver',
      pressed: 'mainButtonPressed',
      disabled: 'mainButtonDisabled',
    },
  },
  moveToMoneyButton: {
    type: 'button',
    landscape: { x: 572, y: 50 },
    portrait: { x: 252, y: 50 },
    string: 'button_moveToMoney',
    textures: {
      enabled: 'mainButtonEnabled',
      over: 'mainButtonOver',
      pressed: 'mainButtonPressed',
      disabled: 'mainButtonDisabled',
    },
    style: {
      enabled: 'mainButtonEnabled',
      over: 'mainButtonOver',
      pressed: 'mainButtonPressed',
      disabled: 'mainButtonDisabled',
    },
  },
  tryAgainButton: {
    type: 'button',
    landscape: { x: 868, y: 50 },
    portrait: { x: 553, y: 50 },
    string: 'button_tryAgain',
    textures: {
      enabled: 'mainButtonEnabled',
      over: 'mainButtonOver',
      pressed: 'mainButtonPressed',
      disabled: 'mainButtonDisabled',
    },
    style: {
      enabled: 'mainButtonEnabled',
      over: 'mainButtonOver',
      pressed: 'mainButtonPressed',
      disabled: 'mainButtonDisabled',
    },

  },
  playAgainButton: {
    type: 'button',
    landscape: { x: 720, y: 50 },
    portrait: { x: 405, y: 50 },
    string: 'button_playAgain',
    textures: {
      enabled: 'mainButtonEnabled',
      over: 'mainButtonOver',
      pressed: 'mainButtonPressed',
      disabled: 'mainButtonDisabled',
    },
    style: {
      enabled: 'mainButtonEnabled',
      over: 'mainButtonOver',
      pressed: 'mainButtonPressed',
      disabled: 'mainButtonDisabled',
    },
  },
});
