define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var layoutEngine = require('skbJet/componentManchester/standardIW/layout/engine');
  var orientation = require('skbJet/componentManchester/standardIW/orientation');
  var ticketSelectLayout = require('skbJet/componentManchester/standardIW/ui/ticketSelectBar/layout');
  var ticketSelectComponent = require('skbJet/componentManchester/standardIW/ui/ticketSelectBar/component');
  var gameLayout = require('game/display/layout');
  var audio = require('skbJet/componentManchester/standardIW/audio');


  return function ticketSelectTemplate() {
    var displayList = layoutEngine.createFromTree(
      ticketSelectLayout._BASE_TICKET_SELECT,
      null,
      [window.gameLayout, gameLayout, ticketSelectLayout],
      orientation.get()
    );

    function updateLayout() {
      layoutEngine.update(
        ticketSelectLayout._BASE_TICKET_SELECT,
        [window.gameLayout, gameLayout, ticketSelectLayout],
        orientation.get()
      );
    }

    window.addEventListener('resize', updateLayout);


    ticketSelectComponent({
      background: displayList.ticketSelectBar,
      costValue: displayList.ticketSelectCostValue,
      costUpButton: displayList.ticketCostUpButton,
      costDownButton: displayList.ticketCostDownButton,
      indicatorContainer: displayList.ticketCostIndicators,
      indicatorActive: displayList.ticketCostIndicatorActive,
      indicatorInactive: displayList.ticketCostIndicatorInactive,
    });

    // If sfx with the templated names exist in the audio map then attach listeners
    if (audio.exists('costUp')) {
      msgBus.subscribe('TicketSelect.CostUp', audio.play.bind(audio, 'costUp'));
    }
    if (audio.exists('costMax')) {
      msgBus.subscribe('TicketSelect.CostMax', audio.play.bind(audio, 'costMax'));
    }
    if (audio.exists('costDown')) {
      msgBus.subscribe('TicketSelect.CostDown', audio.play.bind(audio, 'costDown'));
    }

    return displayList.ticketSelectBar;
  };
});
