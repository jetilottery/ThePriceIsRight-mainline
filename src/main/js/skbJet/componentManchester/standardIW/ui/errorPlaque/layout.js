define({
  _BASE_ERROR_PLAQUE: {
    children: ['errorContainer'],
  },
  errorContainer: {
    type: 'container',
    children: [
      'errorOverlay',
      'errorBackground',
      'errorMessage',
      'errorExit',
      'timeoutExit',
      'timeoutContinue'
    ],
  },
  errorOverlay: {
    type: 'sprite',
    landscape: {
      texture: 'landscape_timeOutMessageOverlay',
    },
    portrait: {
      texture: 'portrait_timeOutMessageOverlay',
    },
  },
  errorBackground: {
    type: 'sprite',
    anchor: { x: 0.5 },
    landscape: {
      x: 720,
      y: 185,
      texture: 'landscape_timeOutMessageBackground',
    },
    portrait: {
      x: 405,
      y: 400,
      texture: 'portrait_timeOutMessageBackground',
    },
  },
  errorMessage: {
    type: 'text',
    style: 'errorMessage',
    anchor: 0.5,
    wordWrap: true,
    landscape: { x: 720, y: 360, wordWrapWidth: 750 },
    portrait: { x: 405, y: 580, wordWrapWidth: 700 },
  },
  errorExit: {
    type: 'button',
    string: 'button_exit',
    landscape: { x: 720, y: 560 },
    portrait: { x: 405, y: 775 },
    style: {
      enabled: 'errorButtonEnabled',
      over: 'errorButtonOver',
      pressed: 'errorButtonPressed',
    },
    textures: {
      enabled: 'timeOutButtonEnabled',
      over: 'timeOutButtonOver',
      pressed: 'timeOutButtonPressed',
    },
  },
  timeoutExit: {
    type: 'button',
    landscape: { x: 600, y: 560 },
    portrait: { x: 285, y: 775 },
    style: {
      enabled: 'errorButtonEnabled',
      over: 'errorButtonOver',
      pressed: 'errorButtonPressed',
    },
    textures: {
      enabled: 'timeOutButtonEnabled',
      over: 'timeOutButtonOver',
      pressed: 'timeOutButtonPressed',
    },
  },
  timeoutContinue: {
    type: 'button',
    landscape: { x: 840, y: 560 },
    portrait: { x: 525, y: 775 },
    style: {
      enabled: 'errorButtonEnabled',
      over: 'errorButtonOver',
      pressed: 'errorButtonPressed',
    },
    textures: {
      enabled: 'timeOutButtonEnabled',
      over: 'timeOutButtonOver',
      pressed: 'timeOutButtonPressed',
    },
  },
});
