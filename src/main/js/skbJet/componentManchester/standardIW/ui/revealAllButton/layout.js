define({
  _BASE_REVEAL_ALL_BUTTON: {
    children: ['revealAllButton'],
  },
  
  revealAllButton: {
    type: 'button',
    string: 'button_revealAll',
    landscape: { x: 720, y: 700 },
    portrait: { x: 405, y: 1074 },
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
