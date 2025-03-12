define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  var resourceMgr = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');
  var ResourceLoader = require('skbJet/component/resourceLoader/ResourceLoader');
  var FontSubLoader = require('skbJet/componentManchester/webfontLoader/FontSubLoader');
  var HowlerSubLoader = require('skbJet/component/howlerAudioPlayer/HowlerAudioSubLoader');
  var gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
  var PIXI = require('com/pixijs/pixi');

  var loadPage;

  function getUrlOrigin(url) {
    var ln = document.createElement('a');
    ln.href = url;
    if (ln.origin) {
      return ln.origin;
    } else {
      return '*';
    }
  }

  function loadBitmapFonts() {
        PIXI.loader
            .add('WinValueFont-export', SKBeInstant.config.urlGameFolder + 'assetPacks/' + SKBeInstant.config.assetPack + '/bitmapFonts/WinValueFont-export.xml')
            .load();
  }

  function startResourceLoad() {
    resourceMgr.load(
      SKBeInstant.config.urlGameFolder + 'assetPacks/' + SKBeInstant.config.assetPack,
      SKBeInstant.config.locale,
      SKBeInstant.config.siteId
    );
    ResourceLoader.getDefault().addSubLoader('fonts', new FontSubLoader());
    ResourceLoader.getDefault().addSubLoader('sounds', new HowlerSubLoader({ type: 'sounds' }));
    loadBitmapFonts();
  }

  function boot() {
    function windowResized() {
      if (!SKBeInstant.isSKB() && SKBeInstant.config.assetPack === 'desktop') {
        return;
      }
      loadPage.width = window.innerWidth + 'px';
      loadPage.height = window.innerHeight + 'px';
    }

    if (!SKBeInstant.isSKB()) {
      var gce = SKBeInstant.getGameContainerElem();
      var splashUrl = SKBeInstant.config.urlGameFolder + 'splash.html?';

      var jLotteryCustom = 0;
      if (
        window.gtk &&
        window.gtk.jLottery &&
        window.gtk.jLottery.embeddedParams &&
        window.gtk.jLottery.embeddedParams.custom
      ) {
        jLotteryCustom = 1;
      }

      var softwareIdM = '';
      var softwareId = window.location.search.match(/&?softwareid=\d+-(\d+)-\d+&?/);
      if (softwareId && softwareId[1]) {
        softwareIdM = softwareId[1];
      }

      splashUrl +=
        '&assetPack=' +
        SKBeInstant.config.assetPack +
        '&language=' +
        SKBeInstant.config.locale +
        '&skincode=' +
        SKBeInstant.config.siteId +
        '&jLotteryCustom=' +
        jLotteryCustom +
        '&softwareIdM=' +
        softwareIdM;

      gce.innerHTML =
        '<iframe id="loadPage" src="' +
        splashUrl +
        '" margin=0, padding=0, frameborder=0 scrolling=no style="overflow: hidden"></iframe>';

      loadPage = document.getElementById('loadPage');
      loadPage.origin = getUrlOrigin(splashUrl);
      if (SKBeInstant.config.assetPack === 'desktop') {
        loadPage.width = gce.clientWidth + 'px';
        loadPage.height = gce.clientHeight + 'px';
      } else {
        loadPage.width = window.innerWidth + 'px';
        loadPage.height = window.innerHeight + 'px';
      }

      window.addEventListener('resize', windowResized);

      setTimeout(gameFlow.next.bind(null, 'LOADING'), 1000);
    } else {
      gameFlow.next('LOADING');
    }
  }

  function onResourceLoadProgress(data) {
    if (!SKBeInstant.isSKB()) {
      loadPage.contentWindow.postMessage(
        {
          loaded: Math.floor((data.current / data.total) * 100),
        },
        loadPage.origin
      );
    } else {
      msgBus.publish('jLotteryGame.updateLoadingProgress', {
        items: data.total,
        current: data.current,
      });
    }

    if (data.complete) {
      if (!SKBeInstant.isSKB()) {
        // jLottery spec: "0.5s wait for player to see assets fully loaded"
        setTimeout(msgBus.publish.bind(null, 'jLotteryGame.assetsLoadedAndGameReady'), 500);
      } else {
        msgBus.publish('jLotteryGame.assetsLoadedAndGameReady');
      }
    }
  }
  msgBus.subscribe('resourceLoader.loadProgress', onResourceLoadProgress);

  gameFlow.handle(boot, 'BOOT');
  gameFlow.handle(startResourceLoad, 'LOADING');
});
