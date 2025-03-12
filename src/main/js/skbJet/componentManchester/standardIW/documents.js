define(function(require) {
    var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    var resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');

    var docContainer = document.getElementById('documents');
    var gameContainer = document.getElementById('game');

    var paytableContent = document.createElement('div');

    var howToPlay;
    var paytable;

    var visible = 'GAME';

    function registerConsole() {
        msgBus.publish('toPlatform', {
            channel: 'Game',
            topic: 'Game.Register',
            data: {
                options: [
                    {
                        type: 'command',
                        name: 'paytable',
                        text: resources.i18n.MenuCommand.paytable,
                        enabled: 1,
                    },
                ],
            },
        });
        msgBus.publish('toPlatform', {
            channel: 'Game',
            topic: 'Game.Register',
            data: {
                options: [
                    {
                        type: 'command',
                        name: 'howToPlay',
                        text: resources.i18n.MenuCommand.howToPlay,
                        enabled: 1,
                    },
                ],
            },
        });
    }

    function show(id) {
        if (id === 'GAME') {
            gameContainer.style.visibility = 'visible';
            howToPlay.style.visibility = 'hidden';
            paytable.style.visibility = 'hidden';
        } else {
            gameContainer.style.visibility = 'hidden';
            howToPlay.style.visibility = id === 'HOWTOPLAY' ? 'visible' : 'hidden';
            paytable.style.visibility = id === 'PAYTABLE' ? 'visible' : 'hidden';
        }

        visible = id;
    }

    function hide() {
        show('GAME');
    }

    function onConsoleControl(data) {
        if (data.option === 'paytable' || data.option === 'howToPlay') {
            var id = data.option === 'howToPlay' ? 'HOWTOPLAY' : 'PAYTABLE';
            if (visible === id) {
                show('GAME');
            } else {
                show(id);
            }
        }
    }
    msgBus.subscribe('jLotterySKB.onConsoleControlChanged', onConsoleControl);

    function createDocument(heading, content) {
        var article = document.createElement('article');
        article.classList.add('document');

        var header = document.createElement('header');
        header.classList.add('documentHead');
        header.textContent = heading;

        var container;
        if (typeof content === 'string') {
            container = document.createElement('div');
            container.innerHTML = content;
        } else {
            container = content;
        }
        container.classList.add('documentContent');

        var btnBar = document.createElement('div');
        var closeBtn = document.createElement('button');
        btnBar.classList.add('documentBtnBar');
        closeBtn.textContent = resources.i18n.MenuCommand.close;
        btnBar.appendChild(closeBtn);
        closeBtn.addEventListener('click', hide);

        article.appendChild(header);
        article.appendChild(container);
        article.appendChild(btnBar);

        return article;
    }

    function registerPrizetableTransform(transform) {
        SKBeInstant.config.gameConfigurationDetails.revealConfigurations.forEach(
            function createTicketCostSection(revealConf) {
                var section = document.createElement('section');
                var heading = document.createElement('h2');
                heading.textContent = resources.i18n.Paytable.subheading.replace(
                    '{ticketCost}',
                    SKBeInstant.formatCurrency(revealConf.price).formattedAmount
                );

                var table = document.createElement('table');
                var thead = document.createElement('thead');
                var tbody = document.createElement('tbody');

                revealConf.prizeTable.forEach(function createPrizeTableRow(tier, i) {
                    var data = transform(tier);
                    var cells = data;

                    var tr = document.createElement('tr');

                    if (data.cells) {
                        cells = data.cells;
                        if (data.className) {
                            tr.className = data.className;
                        }
                    }
                    var thr;
                    if (i === 0) {
                        thr = document.createElement('tr');
                    }
                    Object.keys(cells).forEach(function createPrizeTableCell(column) {
                        if (i === 0) {
                            var th = document.createElement('th');
                            th.textContent = resources.i18n.Paytable[column];
                            thr.appendChild(th);
                        }

                        var td = document.createElement('td');
                        td.textContent = cells[column];
                        tr.appendChild(td);
                    });

                    tbody.appendChild(tr);
                    if (i === 0) {
                        thead.appendChild(thr);
                    }
                });

                table.appendChild(thead);
                table.appendChild(tbody);

                section.appendChild(heading);
                section.appendChild(table);

                paytableContent.appendChild(section);
            }
        );

        var paytableSection = document.createElement('section');
        paytableContent.appendChild(injectRTP(paytableSection));
    }

    function injectRTP(container) {
        var rtpHeading = document.createElement('h3');
        rtpHeading.textContent = resources.i18n.Paytable.paybackTitle;

        var minRTP = SKBeInstant.config.gameConfigurationDetails.minRTP;
        var maxRTP = SKBeInstant.config.gameConfigurationDetails.maxRTP;

        var paybackRTP;
        if (minRTP === maxRTP) {
            paybackRTP = resources.i18n.Paytable.RTPvalue.replace('{@minRTP}', minRTP);
        } else {
            paybackRTP = resources.i18n.Paytable.RTPrange.replace('{@minRTP}', minRTP).replace(
                '{@maxRTP}',
                maxRTP
            );
        }

        var rtpBody = document.createElement('p');
        rtpBody.textContent = resources.i18n.Paytable.paybackBody.replace('{RTP}', paybackRTP);

        container.appendChild(rtpHeading);
        container.appendChild(rtpBody);

        return container;
    }

    function init() {
        howToPlay = createDocument(
            resources.i18n.MenuCommand.howToPlay,
            resources.i18n.helpHTML.replace(/"/g, "'")
        );

        var rtpContainer = howToPlay.querySelector('#RTP');
        if (rtpContainer) {
            if (!SKBeInstant.isSKB()) {
                rtpContainer.parentElement.removeChild(rtpContainer);
            } else {
                injectRTP(rtpContainer);
            }
        }

        paytable = createDocument(resources.i18n.MenuCommand.paytable, paytableContent);

        docContainer.appendChild(howToPlay);
        docContainer.appendChild(paytable);

        registerConsole();
    }

    msgBus.subscribe('onBeforeShowStage', init);


    return {
        registerPrizetableTransform: registerPrizetableTransform,
    };
});
