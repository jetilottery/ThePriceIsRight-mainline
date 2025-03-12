define({
  _BASE_AUTOPLAY_BUTTON: {
    children: ['autoPlayButton'],
  },
  
  autoPlayButton: {
    type: 'container',
    children: ['autoPlayStartButton', 'autoPlayStopButton'],
    landscape: { x: 720, y: 700 },
    portrait: { x: 405, y: 1074 },
  },
  
  autoPlayStartButton: {
    type: 'button',
    string: 'button_autoPlay',
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
  autoPlayStopButton: {
    type: 'button',
    string: 'button_stop',
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
