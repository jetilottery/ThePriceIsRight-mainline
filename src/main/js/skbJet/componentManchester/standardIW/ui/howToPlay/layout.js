define({
  _BASE_HOW_TO_PLAY: {
    children: ['howToPlayContainer'],
  },
  howToPlayOverlay: {
    type: 'sprite',
    landscape: {
      texture: 'landscape_tutorialOverlay',
    },
    portrait: {
      texture: 'portrait_tutorialOverlay',
    },
  },
  howToPlayContainer: {
    type: 'container',
    children: [
      'howToPlayOverlay',
      'howToPlayBackground',
      'howToPlayPages',
      'howToPlayTitle',
      'versionText',
      'audioButtonContainer',
      'howToPlayPrevious',
      'howToPlayNext',
      'howToPlayClose',
      'howToPlayIndicators',
    ],
  },
  howToPlayPages: {
    type: 'container',
    children: [],
  },
  howToPlayBackground: {
    type: 'sprite',
    anchor: { x: 0.5 },
    y: 98,
    landscape: {
      x: 720,
      texture: 'landscape_tutorialBackground',
    },
    portrait: {
      x: 405,
      texture: 'portrait_tutorialBackground',
    },
  },
  howToPlayTitle: {
    type: 'text',
    string: 'howToPlay',
    style: 'howToPlayTitle',
    anchor: 0.5,
    y: 178,
    landscape: { x: 720 },
    portrait: { x: 405 },
  },
  versionText: {
    type: 'text',
    style: 'versionText',
    x: 35,
    y: 120,
    alpha: 0.3,
  },
  howToPlayClose: {
    type: 'button',
    string: 'button_ok',
    landscape: { x: 720, y: 678 },
    portrait: { x: 405, y: 957 },
    textures: {
      enabled: 'tutorialOKButtonEnabled',
      over: 'tutorialOKButtonOver',
      pressed: 'tutorialOKButtonPressed',
    },
    style: {
      enabled: 'tutorialOKButtonEnabled',
      over: 'tutorialOKButtonOver',
      pressed: 'tutorialOKButtonPressed',
    },
  },
  howToPlayPrevious: {
    type: 'button',
    landscape: { x: 72, y: 418 },
    portrait: { x: 64, y: 568 },
    textures: {
      enabled: 'tutorialLeftButtonEnabled',
      disabled: 'tutorialLeftButtonDisabled',
      over: 'tutorialLeftButtonOver',
      pressed: 'tutorialLeftButtonPressed',
    },
  },
  howToPlayNext: {
    type: 'button',
    landscape: { x: 1368, y: 418 },
    portrait: { x: 746, y: 568 },
    textures: {
      enabled: 'tutorialRightButtonEnabled',
      disabled: 'tutorialRightButtonDisabled',
      over: 'tutorialRightButtonOver',
      pressed: 'tutorialRightButtonPressed',
    },
  },

  howToPlayIndicators: {
    type: 'container',
    children: ['howToPlayIndicatorActive', 'howToPlayIndicatorInactive'],
    landscape: { x: 720, y: 610 },
    portrait: { x: 405, y: 885 },
  },
  howToPlayIndicatorActive: {
    type: 'sprite',
    texture: 'tutorialPageIndicatorActive',
  },
  howToPlayIndicatorInactive: {
    type: 'sprite',
    texture: 'tutorialPageIndicatorInactive',
  },

  audioButtonContainer: {
    type: 'container',
    landscape: { x: 79, y: 675 },
    portrait: { x: 71, y: 957 },
  },
});
