define(function (require) {
    var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    var resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');

    return function paytableTransform(data) {
        var prizeLevel = data.division;
        var description = "";
        var prizeValue = SKBeInstant.formatCurrency(data.prize).formattedAmount;

        var className = 'noneHeader';

        if(data.division === 1) {
            description = resources.i18n.Paytable.game1;
            className = 'header';
        }
        if(data.division === 11) {
            description = resources.i18n.Paytable.game2;
            className = 'header';
        }
        if(data.division === 21) {
            description = resources.i18n.Paytable.cliffHangers;
            className = 'header';
        }

        return {
            cells: {
                prizeLevel: prizeLevel,
                description: description,
                prizeValue: prizeValue,
            },
            className: className
        };
    };
});
