define(function (require) {

    var IWLib = require('skbJet/componentManchester/standardIW/displayList');

    var cardType1 = require('game/components/baseStageCards/type1');
    var cardType2 = require('game/components/baseStageCards/type2');

    var gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    var meterData = require('skbJet/componentManchester/standardIW/meterData');


    var cards = {};
    var cardGroup = {
        1: [],
        2: [],
        3: [],
        4: []
    };

    var winningCards = {
        1:0,
        2:0,
        3:[],
        4:[],
    };

    function ukgcCheck(e,index,reveal){
        if(gameConfig.ukgc) {
            if(e.revealNumber <= meterData.ticketCost) {
                cardGroup[index].forEach(function(el) {
                    el.winRotationSpeed = 0;
                    el.ukgcAudio = true;
                });
                if(reveal !== undefined) {
                    reveal.winRotationSpeed = 0;
                    reveal.ukgcAudio = true;
                }
            }
        }
    }

    return {
        init:function () {
            cards.game_1_1 = new cardType1(
                IWLib['box1_game1'],1,true,
                IWLib['bonusContainer_1']
            );
            cards.game_1_2 = new cardType1(
                IWLib['box2_game1'],1,true,
                IWLib['bonusContainer_2']
            );
            cards.game_1_3 = new cardType1(
                IWLib['box3_game1'],1,true,
                IWLib['bonusContainer_3']
            );
            cards.game_2_1 = new cardType1(
                IWLib['box1_game2'],2,true,
                IWLib['bonusContainer_4']
            );
            cards.game_2_2 = new cardType1(
                IWLib['box2_game2'],2,true,
                IWLib['bonusContainer_5']
            );
            cards.game_2_3 = new cardType1(
                IWLib['box3_game2'],2,true,
                IWLib['bonusContainer_6']
            );
            cards.game_3_1 = new cardType2(
                IWLib['box1_game3'],3,true,
                IWLib['bonusContainer_7']
            );
            cards.game_3_2 = new cardType2(
                IWLib['box2_game3'],3,true,
                IWLib['bonusContainer_8']
            );
            cards.game_3_3 = new cardType2(
                IWLib['box3_game3'],3,true,
                IWLib['bonusContainer_9']
            );
            cards.game_4_1 = new cardType2(
                IWLib['box1_game4'],4,true,
                IWLib['bonusContainer_10']
            );
            cards.game_4_2 = new cardType2(
                IWLib['box2_game4'],4,true,
                IWLib['bonusContainer_11']
            );
            cards.game_4_3 = new cardType2(
                IWLib['box3_game4'],4,true,
                IWLib['bonusContainer_12']
            );
            cards.game_3_reveal = new cardType2(
                IWLib['reveal_game3'],3,false,
                IWLib['bonusContainer_13']
            );
            cards.game_4_reveal = new cardType2(
                IWLib['reveal_game4'],4,false,
                IWLib['bonusContainer_14']
            );

            Object.keys(cards).forEach(function (element,index) {
                if(index < 3) {cardGroup[1].push(cards[element]);}
                if(index > 2 && index < 6) {cardGroup[2].push(cards[element]);}
                if(index > 5 && index < 9) {cardGroup[3].push(cards[element]);}
                if(index > 8 && index < 12) {cardGroup[4].push(cards[element]);}
            });

            IWLib['baseStage'].addChildAt(IWLib['bonusContainers'],IWLib['baseStage'].children.length);
        },
        reset:function () {
            Object.keys(cards).forEach(function (element) {
                cards[element].reset();
            });

            winningCards = {
                1:0,
                2:0,
                3:[],
                4:[],
            };
        },
        compare: function (num) {
            switch (num) {
                case 1: {
                    return cardGroup[1].every(function (e) {
                        if(cardGroup[1][0].winningNumber !== null) {
                            if(e.winningNumber===cardGroup[1][0].winningNumber) {
                                ukgcCheck(e,1);
                                return true;
                            }
                        }
                    });
                }
                case 2: {
                    return cardGroup[2].every(function (e) {
                        if(cardGroup[2][0].winningNumber !== null) {
                            if(e.winningNumber===cardGroup[2][0].winningNumber) {
                                ukgcCheck(e,2);
                                return true;
                            }
                        }
                    });
                }
                case 3: {
                    var winning = [];
                    cardGroup[3].forEach(function (e) {
                        if(cards.game_3_reveal.winningNumber !== null) {
                            if(Number(e.winningNumber)===Number(cards.game_3_reveal.winningNumber) && e.winningNumber !== null) {
                                ukgcCheck(e,3,cards.game_3_reveal);
                                cards.game_3_reveal.setWin();
                                winning.push(e);
                            }
                        }
                    });
                    return winning;
                }
                case 4: {
                    var winning = [];
                    cardGroup[4].forEach(function (e) {
                        if(cards.game_4_reveal.winningNumber !== null) {
                            if(Number(e.winningNumber)===Number(cards.game_4_reveal.winningNumber) && e.winningNumber !== null) {
                                ukgcCheck(e,4,cards.game_4_reveal);
                                    cards.game_4_reveal.setWin();
                                    winning.push(e);

                            }
                        }
                    });
                    return winning;
                }
            }

        },
        get:function (target) {
            if(target !== void(0)) {
                return cards[target];
            } else {
                return cards;
            }
        },
        group: function (num) {
            return cardGroup[num];
        },
        enable: function(enable) {
            Object.keys(cards).forEach(function (element) {
                cards[element].enable(enable);
            });
        },
        winningCards:function () {
            return winningCards;
        },
        prize: function () {
            cardGroup[1].forEach(function (e) {
                if(e.win === true) {
                    winningCards[1] = e.revealNumber;
                }
            });
            cardGroup[2].forEach(function (e) {
                if(e.win === true) {
                    winningCards[2] = e.revealNumber;
                }
            });
            cardGroup[3].forEach(function (e) {
                if(e.win === true && e.winProccessed === false) {
                    e.winProccessed = true;
                    winningCards[3].push(e.revealNumber);
                }
            });
            cardGroup[4].forEach(function (e) {
                if(e.win === true && e.winProccessed === false) {
                    e.winProccessed = true;
                    winningCards[4].push(e.revealNumber);
                }
            });
            var totalPrize = 0;
            totalPrize += winningCards[1];
            totalPrize += winningCards[2];
            winningCards[3].forEach(function (e) {
               totalPrize += e;
            });
            winningCards[4].forEach(function (e) {
                totalPrize += e;
            });
            return totalPrize;
        }
    };
});
