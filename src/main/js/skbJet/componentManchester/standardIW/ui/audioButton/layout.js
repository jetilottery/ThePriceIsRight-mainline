define({
  _BASE_AUDIO_BUTTON: {
    children: ['audio_on_btn', 'audio_off_btn'],
  },

  audio_on_btn: {
    type: 'button',
    textures: {
      enabled: 'soundOnButtonEnabled',
      over: 'soundOnButtonOver',
      pressed: 'soundOnButtonPressed',
    },
    parent: '_BASE_AUDIO_BUTTON',
  },
  audio_off_btn: {
    type: 'button',
    textures: {
      enabled: 'soundOffButtonEnabled',
      over: 'soundOffButtonOver',
      pressed: 'soundOffButtonPressed',
    },
    parent: '_BASE_AUDIO_BUTTON',
  },
});
