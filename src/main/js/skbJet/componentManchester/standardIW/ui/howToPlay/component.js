define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  // var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  var PagedPlaque = require('skbJet/componentManchester/standardIW/components/pagedPlaque');
  var autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');

  return function howToPlayComponent(opts) {
    var howToPlayPlaque = new PagedPlaque(
      [
        opts.background,
        opts.pageContainer,
        // opts.versionText,
        opts.title,
        opts.audioButton,
        opts.nextButton,
        opts.previousButton,
        opts.closeButton,
        opts.indicatorContainer,
      ],
      {
        pages: opts.pageContainer.children,
        overlay: opts.overlay,
        nextButton: opts.nextButton,
        previousButton: opts.previousButton,
        indicatorContainer: opts.indicatorContainer,
        indicatorOnFill: opts.indicatorOnFill,
        indicatorOffFill: opts.indicatorOffFill,
        indicatorActive: opts.indicatorActive,
        indicatorInactive: opts.indicatorInactive,
      }
    );

    // howToPlayPlaque.name = 'HowToPlay';
    //
    // var info = window._cacheFlag;
    //
    // if (!SKBeInstant.isSKB()) {
    //   opts.versionText.text =
    //     info.gameVersion +
    //     (info.changeList ? '.CL' + info.changeList : '') +
    //     (info.buildNumber ? '_' + info.buildNumber : '');
    // }

    function enableUI(toggle) {
      msgBus.publish('UI.updateButtons', {
        buy: { enabled: toggle },
        try: { enabled: toggle },
        playAgain: { enabled: toggle },
        tryAgain: { enabled: toggle },
        moveToMoney: { enabled: toggle },
        home: { enabled: toggle },
        exit: { enabled: toggle },
        autoPlay: { enabled: toggle },
        ticketSelect: { enabled: toggle },
      });
    }

    // Attach hide method to close button press event
    opts.closeButton.on(
      'buttonpress',
      function hidePlaque() {
        enableUI(true);
        howToPlayPlaque.hide();
        autoPlay._suspended = false;
      },
      howToPlayPlaque
    );

    // Attach show method to showHelp message
    msgBus.subscribe('UI.showHelp', function showHelp() {
      autoPlay._suspended = true;
      enableUI(false);
      howToPlayPlaque.show();
    });

    // Attach toggle method to toggleHelp message
    msgBus.subscribe('UI.toggleHelp', function toggleHelp() {
      autoPlay._suspended = !autoPlay._suspended;
      var plaqueOpen = howToPlayPlaque.toggle();
      enableUI(!plaqueOpen);
    });

    return howToPlayPlaque;
  };
});
