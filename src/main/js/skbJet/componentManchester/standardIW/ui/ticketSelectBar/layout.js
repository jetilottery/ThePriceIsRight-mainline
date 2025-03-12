define({
  _BASE_TICKET_SELECT: {
    children: ['ticketSelectBar'],
  },

  /*
	* TicketSelectBar
	*/
  ticketSelectBar: {
    type: 'container',
    landscape: { x: 720, y: 551 },
    portrait: { x: 405, y: 910 },
    children: [
      'ticketSelectBarBG',
      'ticketSelectCostValue',
      'ticketSelectCostLabel',
      'ticketCostDownButton',
      'ticketCostUpButton',
      'ticketCostIndicators',
    ],
  },
  ticketSelectBarBG: {
    type: 'sprite',
    anchor: 0.5,
    landscape: {
      texture: 'landscape_pricePointSelectorBackground',
    },
    portrait: {
      texture: 'portrait_pricePointSelectorBackground',
    },
  },
  ticketSelectCostValue: {
    type: 'text',
    portrait: { y: -30 },
    landscape: { y: -30 },
    anchor: 0.5,
    style: 'ticketSelectCostValue',
  },
  ticketSelectCostLabel: {
    type: 'text',
    string: 'footer_ticketCost',
    portrait: { y: 24 },
    landscape: { y: 24 },
    anchor: 0.5,
    style: 'ticketSelectCostLabel',
  },
  ticketCostDownButton: {
    type: 'button',
    portrait: { x: -312 },
    landscape: { x: -360 },
    textures: {
      enabled: 'minusButtonEnabled',
      disabled: 'minusButtonDisabled',
      over: 'minusButtonOver',
      pressed: 'minusButtonPressed',
    },
  },
  ticketCostUpButton: {
    type: 'button',
    portrait: { x: 312 },
    landscape: { x: 360 },
    textures: {
      enabled: 'plusButtonEnabled',
      disabled: 'plusButtonDisabled',
      over: 'plusButtonOver',
      pressed: 'plusButtonPressed',
    },
  },
  ticketCostIndicators: {
    type: 'container',
    children: ['ticketCostIndicatorActive', 'ticketCostIndicatorInactive'],
    portrait: { y: 54 },
    landscape: { y: 54 },
  },
  ticketCostIndicatorActive: {
    type: 'sprite',
    texture: 'pricePointIndicatorActive',
  },
  ticketCostIndicatorInactive: {
    type: 'sprite',
    texture: 'pricePointIndicatorInactive',
  },
});
