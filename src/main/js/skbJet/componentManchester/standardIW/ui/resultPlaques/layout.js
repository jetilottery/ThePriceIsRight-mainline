define({
  _BASE_RESULT_PLAQUES: {
    children: ['resultPlaquesContainer'],
  },

  resultPlaquesContainer: {
    type: 'container',
    children: [
      'resultPlaqueOverlay', 
      'winPlaqueBG',
      'winPlaqueMessage',
      'winPlaqueValue',
      'winPlaqueCloseButton',
      'losePlaqueBG',
      'losePlaqueMessage',
      'losePlaqueCloseButton',
    ],
    landscape: { x: 720, y: 375 },
    portrait: { x: 405, y: 562 },
  },

  resultPlaqueOverlay: {
    type: 'sprite',
    anchor: 0.5,
    landscape: { texture: 'landscape_EndOfGameMessageOverlay' },
    portrait: { texture: 'portrait_EndOfGameMessageOverlay' },
  },

  winPlaqueBG: {
    type: 'sprite',
    anchor: 0.5,
    landscape: { texture: 'landscape_endOfGameMessageWinBackground' },
    portrait: { texture: 'portrait_endOfGameMessageWinBackground' },
  },
  winPlaqueMessage: {
    type: 'text',
    string: 'message_win',
    style: 'winPlaqueBody',
    y: -120,
    anchor: 0.5,
    portrait: { maxWidth: 700 },
    landscape: { maxWidth: 1200 },
  },
  winPlaqueValue: {
    type: 'text',
    style: 'winPlaqueValue',
    y: 40,
    anchor: 0.5,
  },
  winPlaqueCloseButton: {
    type: 'button',
    landscape: { y: 205 },
    portrait: { y: 345 },
    string: 'button_ok',
    style: {
      enabled: 'resultPlaqueOKButtonEnabled',
      over: 'resultPlaqueOKButtonOver',
      pressed: 'resultPlaqueOKButtonPressed',
    },
    textures: {
      enabled: 'endOfGameMessageCloseButtonEnabled',
      over: 'endOfGameMessageCloseButtonOver',
      pressed: 'endOfGameMessageCloseButtonPressed',
    },
  },

  losePlaqueBG: {
    type: 'sprite',
    anchor: 0.5,
    landscape: { texture: 'landscape_endOfGameMessageNoWinBackground' },
    portrait: { texture: 'portrait_endOfGameMessageNoWinBackground' },
  },
  losePlaqueMessage: {
    type: 'text',
    string: 'message_nonWin',
    style: 'losePlaqueBody',
    y: -50,
    anchor: 0.5,
    portrait: { maxWidth: 700 },
    landscape: { maxWidth: 1200 },
  },
  losePlaqueCloseButton: {
    type: 'button',
    landscape: { y: 205 },
    portrait: { y: 345 },
    string: 'button_ok',
    style: {
      enabled: 'resultPlaqueOKButtonEnabled',
      over: 'resultPlaqueOKButtonOver',
      pressed: 'resultPlaqueOKButtonPressed',
    },
    textures: {
      enabled: 'endOfGameMessageCloseButtonEnabled',
      over: 'endOfGameMessageCloseButtonOver',
      pressed: 'endOfGameMessageCloseButtonPressed',
    },
  },
});
