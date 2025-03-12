define({
  _BASE_FOOTER: {
    children: ['footerContainer', 'meter_2_3', 'meter_3_3', 'meter_1_2', 'meter_2_2'],
  },
  footerContainer: {
    type: 'container',
    children: ['footerBG', 'balanceMeter', 'ticketCostMeter', 'winMeter', 'divider_1_3', 'divider_2_3', 'divider_1_2'],
    landscape: { y: 754 },
    portrait: { y: 1128 },
  },
  footerBG: {
    type: 'sprite',
    landscape: { 
      texture: 'landscape_footerBar',
    },
    portrait: {
      texture: 'portrait_footerBar',
    },
  },
  
  balanceMeter: {
    type: 'container',
    children: ['balanceLabel', 'balanceValue'],
    portrait: { x: 135, y: 0 }, 
    landscape: { x: 240, y: 28 }, 
  },
  balanceLabel: {
    type: 'text',
    string: 'footer_balance',
    anchor: 0.5,
    portrait: {
      y: 70,
      anchor: { x: 0.5 },
    },
    landscape: {
      y: 0,
      anchor: { x: 0 },
    },
    style: 'footerLabel',
  },
  balanceValue: {
    type: 'text',
    anchor: 0.5,
    portrait: {
      y: 35,
      fontSize: 34,
      anchor: { x: 0.5 },
    },
    landscape: {
      y: 0,
      fontSize: 26,
      anchor: { x: 0 },
    },
    style: 'footerValue',
  },

  
  ticketCostMeter: {
    type: 'container',
    children: ['ticketCostLabel', 'ticketCostValue'],
  },
  ticketCostLabel: {
    type: 'text',
    string: 'footer_ticketCost',
    anchor: 0.5,
    portrait: {
      y: 70,
      anchor: { x: 0.5 },
    },
    landscape: {
      y: 0,
      anchor: { x: 0 },
    },
    style: 'footerLabel',
  },
  ticketCostValue: {
    type: 'text',
    anchor: 0.5,
    portrait: {
      y: 35,
      fontSize: 34,
      anchor: { x: 0.5 },
    },
    landscape: {
      y: 0,
      fontSize: 26,
      anchor: { x: 0 },
    },
    style: 'footerValue',
  },

  winMeter: {
    type: 'container',
    children: ['winLabel', 'winValue'],
  },
  winLabel: {
    type: 'text',
    string: 'footer_win',
    anchor: 0.5,
    portrait: {
      y: 70,
      anchor: { x: 0.5 },
    },
    landscape: {
      y: 0,
      anchor: { x: 0 },
    },
    style: 'footerLabel',
  },
  winValue: {
    type: 'text',
    anchor: 0.5,
    portrait: {
      y: 35,
      fontSize: 34,
      anchor: { x: 0.5 },
    },
    landscape: {
      y: 0,
      fontSize: 26,
      anchor: { x: 0 },
    },
    style: 'footerValue',
  },


  /*
   * DIVIDERS
   */
  divider_1_3: {
    type: 'sprite',
    portrait: {
      texture: 'portrait_footerDivider',
      x: 270,
      y: 50,
    },
    landscape: {
      texture: 'landscape_footerDivider',
      x: 480,
      y: 28,
    },
    anchor: 0.5,
  },
  divider_2_3: {
    type: 'sprite',
    portrait: {
      texture: 'portrait_footerDivider',
      x: 540,
      y: 50,
    },
    landscape: {
      texture: 'landscape_footerDivider',
      x: 960,
      y: 28,
    },
    anchor: 0.5,
  },
  divider_1_2: {
    type: 'sprite',
    portrait: {
      texture: 'portrait_footerDivider',
      x: 405,
      y: 50,
    },
    landscape: {
      texture: 'landscape_footerDivider',
      x: 720,
      y: 28,
    },
    anchor: 0.5,
  },


  /*
   * METER POSITION POINTS
   */
  meter_2_3: {
    type: 'point',
    portrait: { x: 405, y: 0 }, 
    landscape: { x: 720, y: 28 }, 
  },
  meter_3_3: {
    type: 'point',
    portrait: { x: 675, y: 0 }, 
    landscape: { x: 1200, y: 28 }, 
  },
  meter_1_2: {
    type: 'point',
    portrait: { x: 202, y: 0 }, 
    landscape: { x: 360, y: 28 }, 
  },
  meter_2_2: {
    type: 'point',
    portrait: { x: 608, y: 0 }, 
    landscape: { x: 1080, y: 28 }, 
  },
});
