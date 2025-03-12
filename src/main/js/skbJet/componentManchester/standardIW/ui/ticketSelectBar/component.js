define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var meterData = require('skbJet/componentManchester/standardIW/meterData');
  var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
  var PIXI = require('com/pixijs/pixi');

  return function ticketSelectComponent(parts) {
    // Hide initially
    parts.background.visible = false;

    // Block click-through
    parts.background.interactive = true;

    var iWidth = 22;
    var iHeight = 4;
    var iGap = 4;

    if (parts.indicatorActive) {
      iWidth = parts.indicatorActive.width;
      if (parts.indicatorActive.parent) {
        parts.indicatorActive.parent.removeChild(parts.indicatorActive);
      }
    }

    if (parts.indicatorInactive) {
      iWidth = Math.max(iWidth, parts.indicatorInactive.width);
      if (parts.indicatorInactive.parent) {
        parts.indicatorInactive.parent.removeChild(parts.indicatorInactive);
      }
    }

    function createMarker(index, total, fill) {
      var graphic = new PIXI.Graphics();
      var startX = ((total * iWidth) + ((total - 1) * iGap)) / -2;
      var x = startX + (index * (iWidth + iGap));
      graphic.beginFill(fill);
      graphic.drawRoundedRect(x, iHeight / -2, iWidth, iHeight, 2);
      graphic.endFill();
      return graphic;
    }
    
    function cloneMarker(index, total, sprite) {
      var clone = new PIXI.Sprite(sprite.texture);
      var startX = ((total * iWidth) + ((total - 1) * iGap)) / -2;
      clone.position.x = startX + (index * (iWidth + iGap));
      return clone;
    }

    function enableButtons() {
      var index = meterData.ticketCostIndex;
      var totalCosts = meterData.ticketCosts.length;
      parts.costUpButton.enabled = index < totalCosts - 1;
      parts.costDownButton.enabled = index > 0;
    }

    function setTicketCost(value) {
      parts.costValue.text = SKBeInstant.formatCurrency(value).formattedAmount;

      enableButtons();

      // If there aren't multiple ticket costs
      if (meterData.ticketCosts.length < 2) {
        parts.indicatorContainer.visible = false;
        parts.costUpButton.visible = false;
        parts.costDownButton.visible = false;
      }

      if (parts.indicatorContainer && !this.indicatorsOn) {
        this.indicatorsOn = meterData.ticketCosts.map(function(cost, i, costs) {
          if (parts.indicatorActive) {
            return cloneMarker(i, costs.length, parts.indicatorActive);
          }
          return createMarker(i, costs.length, 0xffffff);
        });
        this.indicatorsOff = meterData.ticketCosts.map(function(cost, i, costs) {
          if (parts.indicatorInactive) {
            return cloneMarker(i, costs.length, parts.indicatorInactive);
          }
          return createMarker(i, costs.length, 0x666666);
        });
        parts.indicatorContainer.addChild.apply(
          parts.indicatorContainer,
          this.indicatorsOff.concat(this.indicatorsOn)
        );
      }

      if (this.indicatorsOn) {
        this.indicatorsOn.forEach(function(indicator, i) {
          indicator.visible = i === meterData.ticketCostIndex;
        });
      }
      if (this.indicatorsOff) {
        this.indicatorsOff.forEach(function(indicator, i) {
          indicator.visible = i !== meterData.ticketCostIndex;
        });
      }
    }
    msgBus.subscribe('MeterData.TicketCost', setTicketCost);

    setTicketCost(meterData.ticketCost);

    parts.costUpButton.on('buttonpress', function onUpPress() {
      if (meterData.ticketCost < meterData.maxTicketCost) {
        meterData._ticketCost = meterData.ticketCosts[meterData.ticketCostIndex + 1];
        if (meterData.ticketCost < meterData.maxTicketCost) {
          msgBus.publish('TicketSelect.CostUp');
        } else {
          msgBus.publish('TicketSelect.CostMax');
        }
      }
    });
    
    parts.costDownButton.on('buttonpress', function onDownPress() {
      if (meterData.ticketCost > meterData.minTicketCost) {
        meterData._ticketCost = meterData.ticketCosts[meterData.ticketCostIndex - 1];
        msgBus.publish('TicketSelect.CostDown');
      }
    });


    function updateTicketSelectUI(conf) {
      // Bomb out if ticketSelect is not being updated
      if (conf.ticketSelect === undefined) {
        return;
      }

      var tConf = conf.ticketSelect;

      if (tConf === true || tConf.visible === true) {
        parts.background.visible = true;
      } else if (tConf === false || tConf.visible === false) {
        parts.background.visible = false;
      }

      if (tConf.enabled !== undefined) {
        enableButtons();
      }
    }
    msgBus.subscribe('UI.updateButtons', updateTicketSelectUI);
  };
});
