define([
    'skbJet/component/resourceLoader/resourceLib',
    'skbJet/componentCRDC/splash/splashLoadController',
    'skbJet/componentCRDC/splash/splashUIController'
], function(resLib, splashLoadController, splashUIController) {

    var progressBarDivHeightSign = 0;
    var progressBarDivWidth = 580;
    var progressBarDivHeight = 25;
    var progressBarBGDivWidth = 592;
    var progressBarBGDivHeight = 36;
    var logoDivTop = 0;
    var logoDivWidth =290;
    var logoDivHeight = 329;
    var subHeaderDivTop = 0;
    var subHeaderDivWidth = 318;
    var subHeaderDivHeight = 78;

    var loadDiv, progressBarDiv, progressDiv, progressBarBGDiv, logo, subHeader;
    var softId = window.location.search.match(/&?softwareid=(\d+.\d+.\d+)?/);
    var showCopyRight = true; //TEMP

    if(softId){
        if(softId[1].split('-')[2].charAt(0) !== '0'){
            showCopyRight = true;
        }
    }

    function checkScreenMode() {
        var winW = Math.floor(Number(window.innerWidth));
        var winH = Math.floor(Number(window.innerHeight));
        return winW >= winH ? "landScape" : "portrait";
    }

    function updateLayoutRelatedByScreenMode() {
        if (checkScreenMode() === 'landScape') {
            document.body.style.backgroundImage = 'url(' + resLib.splash.LoaderBG.src + ')';
            progressBarDivHeightSign = 486;
            logoDivTop = 40;
            subHeaderDivTop = 340 + logoDivTop;
        } else {
            document.body.style.backgroundImage = 'url(' + resLib.splash.LoaderBGPort.src + ')';
            progressBarDivHeightSign = 666;
            logoDivTop = 100;
            subHeaderDivTop = 340 + logoDivTop;
        }

        document.body.style.backgroundSize = '100% 100%';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
    }

    function onLoadDone() {
        updateLayoutRelatedByScreenMode();
        loadDiv = document.getElementById("loadDiv");
        progressBarDiv = document.getElementById("progressBarDiv");
        progressDiv = document.getElementById("progressDiv");
        progressBarBGDiv = document.createElement("div");
        logo = document.createElement("div");
        subHeader = document.createElement("div");

        [logo,subHeader].forEach(function (e) {
            e.style.backgroundRepeat = 'no-repeat';
            e.style.backgroundSize = 'cover';
            e.style.position = 'absolute';
        });
        logo.style.backgroundImage = 'url(' + resLib.splash.TPIRlogo.src + ')';
        subHeader.style.backgroundImage = 'url(' + resLib.splash.TPIRsubtitle.src + ')';
        loadDiv.appendChild(logo);
        loadDiv.appendChild(subHeader);

        if(showCopyRight){
            var copyRightDiv = document.getElementById('copyRightDiv');
            copyRightDiv.innerHTML = resLib.i18n.splash.splashScreen.footer.shortVersion;
            copyRightDiv.style.color = '#fff';
        }

        loadDiv.style.backgroundSize = 'cover';
        progressDiv.style.backgroundImage = 'url(' + resLib.splash.LoaderBar.src + ')';
        progressDiv.style.backgroundRepeat = 'no-repeat';
        progressDiv.style.borderRadius = '5px';
        
        loadDiv.insertBefore(progressBarBGDiv, loadDiv.childNodes[2]);

        progressBarBGDiv.style.backgroundImage = 'url(' + resLib.splash.LoaderBarBG.src + ')';
        progressBarBGDiv.style.backgroundSize = 'contain';
        progressBarBGDiv.style.backgroundRepeat = 'no-repeat';
        progressBarBGDiv.style.position = 'absolute'; 

        splashUIController.onSplashLoadDone();

        window.addEventListener('resize', onWindowResized);
        onWindowResized();
        window.postMessage('splashLoaded', window.location.origin);
    }

    function onWindowResized() {
        updateLayoutRelatedByScreenMode();

        progressBarDiv.style.width = splashUIController.scale(progressBarDivWidth);
        progressBarDiv.style.height = splashUIController.scale(progressBarDivHeight);
        progressBarDiv.style.left = ((loadDiv.offsetWidth - progressBarDiv.offsetWidth) / 2) + "px";
        progressBarDiv.style.top = splashUIController.scale(progressBarDivHeightSign + 5);

        progressDiv.style.height = splashUIController.scale(progressBarDivHeight);

        progressBarBGDiv.style.width = splashUIController.scale(progressBarBGDivWidth);
        progressBarBGDiv.style.height = splashUIController.scale(progressBarBGDivHeight);
        progressBarBGDiv.style.left = ((loadDiv.offsetWidth - progressBarBGDiv.offsetWidth)) / 2 + "px";
        progressBarBGDiv.style.top = splashUIController.scale(progressBarDivHeightSign);

        logo.style.width = splashUIController.scale(logoDivWidth);
        logo.style.height = splashUIController.scale(logoDivHeight);
        logo.style.left = ((loadDiv.offsetWidth - logo.offsetWidth)) / 2 + "px";
        logo.style.top = splashUIController.scale(logoDivTop);

        subHeader.style.width = splashUIController.scale(subHeaderDivWidth);
        subHeader.style.height = splashUIController.scale(subHeaderDivHeight);
        subHeader.style.left = ((loadDiv.offsetWidth - subHeader.offsetWidth)) / 2 + "px";
        subHeader.style.top = splashUIController.scale(subHeaderDivTop);
    }

    function init() {
        splashUIController.init({ layoutType: 'IW' });
        splashLoadController.load(onLoadDone);
    }
    init();
    return {};
});