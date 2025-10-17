/*

	Copyright 2025 - Herber eDevelopment - Jaroslav Herber
	All rights reserved.

	This code is proprietary and confidential.
	Copying, modification, distribution, or use of this code without explicit permission is strictly prohibited.

*/

function getEl(sId) {
    return document.getElementById(sId);
}

// Debugger
var bDebuggerEnabled = false,
    oDebugger = getEl('debugger'),
    iEpgTimeShift = 0,
    bIsAndroidTv = false,
    bTouchMode = false,
    sDeviceMode = false,
    sLgDeviceId = 'UnknownLG',
    bStatusOpened = false,
    bModalOpened = false,
    iStatusTimeout = false;

var bDbInitiated = 0,
    oDb = false,
    sLoadingFromDb = false,
    iDbVersion = 2,
    bBootComplete = false;

// DRM session
var sDrmSessionId = "m3u" + Date.now();


// For old devices!
if (typeof(NodeList.prototype.forEach) === 'undefined') {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

if (typeof(HTMLCollection.prototype.forEach) === 'undefined') {
    HTMLCollection.prototype.forEach = Array.prototype.forEach;
}

if (typeof(String.prototype.startsWith) === 'undefined') {
    String.prototype.startsWith = function(search, position) {
        position = position || 0;
        return this.substring(position, position + search.length) === search;
    };
}

if (typeof(Element.prototype.scrollTo) === 'undefined') {
    Element.prototype.scrollTo = function(x, y) {
        if (typeof(x) === "object") {
            if (x.left !== undefined) {
                this.scrollLeft = x.left;
            }
            if (x.top !== undefined) {
                this.scrollTop = x.top;
            }
        } else {
            this.scrollLeft = x;
            this.scrollTop = y;
        }
    };
}

if (typeof(Array.prototype.includes) === 'undefined') {
    Array.prototype.includes = function(element, fromIndex) {
        fromIndex = fromIndex || 0;
        if (fromIndex < 0) {
            fromIndex = Math.max(0, this.length + fromIndex);
        }

        for (var i = fromIndex; i < this.length; i++) {
            if (this[i] === element) {
                return true;
            }
        }
        return false;
    };
}

if (typeof(Element.prototype.prepend) === 'undefined') {
    Element.prototype.prepend = function(element) {
        this.insertBefore(
            element instanceof Node ? element : document.createTextNode(String(element)), this.firstChild
        );
    };
}


// Helpers
Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h * 3600000));
    return this;
};

Date.prototype.subHours = function(h) {
    this.setTime(this.getTime() - (h * 3600000));
    return this;
};

Date.prototype.subDays = function(d) {
    this.setDate(this.getDate() - d);
    return this;
};


function getTimeNow() {

    if (iEpgTimeShift) {
        var oDateNowLocal = new Date();
        oDateNowLocal.addHours(iEpgTimeShift);
        return oDateNowLocal.getTime();
    } else {
        return new Date().getTime();
    }

}


function getEpgDateObject(sTimeString, iAddTimezoneHours) {

    if (sTimeString) {

        var aSplittedTime = sTimeString.match(/^(\d{14}) ([+-]\d{4})$/);

        if (aSplittedTime) {
            return parseEpgTime(aSplittedTime[1], aSplittedTime[2]);
        }

        return false;

        var oDate = new Date(sTimeString);
        var iTimezoneOffset = oDate.getTimezoneOffset();
        if (iTimezoneOffset) {
            oDate.addHours(Math.round(iTimezoneOffset / 60 * -1));
        }

        if (iAddTimezoneHours) {
            iAddTimezoneHours = Math.round(iAddTimezoneHours / 100);
            if (iAddTimezoneHours) {
                oDate.addHours(iAddTimezoneHours);
            }
        }

        return oDate;

    }

    return false;

}


function getTimeString(oDate, aOptions) {

    if (typeof(oDate) === 'string') {
        oDate = getEpgDateObject(oDate);
    }

    var aOptions = aOptions || {
        hour: '2-digit',
        minute: '2-digit'
    };

    if (aOptions.showDate) {
        return oDate.toLocaleDateString(navigator.language, {
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    return oDate.toLocaleTimeString(navigator.language, aOptions);

}


function insertCharAt(sString, sChar, iPos) {
    return sString.substring(0, iPos) + sChar + sString.substring(iPos);
}


function debug(mVar) {
    if (bDebuggerEnabled) {
        /*if( sDeviceFamily !== 'Browser' ) {
        	var oDate = new Date(), iMinutes = oDate.getMinutes(), iSeconds = oDate.getSeconds();
        	if( iSeconds < 10 ) { iSeconds = '0' + iSeconds; }
        	if( iMinutes < 10 ) { iMinutes = '0' + iMinutes; }
        	var sDate = oDate.getHours() + ":" + iMinutes + ":" + iSeconds;
        	oDebugger.innerHTML = sDate + ': ' + mVar + '<hr>' + oDebugger.innerHTML;
        	oDebugger.scrollTop = 0;
        }*/
        console.log(mVar);
        //console.trace(mVar);
        //console.log(new Error().stack);
        if (typeof(debugCallback) === 'function') {
            debugCallback(sDate + ': ' + mVar);
        }
    }
}

function debugError(e) {
    if (bDebuggerEnabled) {
        console.error(e.message);
        //console.trace(e);
        //console.log(e.trace);
    }
}


function debugCritical(mVar) {
    if (typeof(debugRemote) === 'function') {
        debugRemote(mVar);
        return;
    }

    doAppServerRequest("https://m3u-ip.tv/premium/debug.php?msg=" + mVar, function(oHttp) {});
}


function defocus() {

    var oActiveElement = document.activeElement;
    if (oActiveElement) {
        oActiveElement.blur();
    }

    //getEl('defocus').focus();

}


function getAppId() {
    if (sDeviceFamily === 'Android') {
        return m3uConnector.getAppId();
    }

    return sDeviceFamily + sAppVersion;
}


function getBasename(sUrl) {
    try {
        var sPathname = new URL(sUrl).pathname;
        return sPathname.substring(sPathname.lastIndexOf('/') + 1);
    } catch (e) {}
    return '';
}


function getHostname(sUrl) {
    try {
        return new URL(sUrl).hostname;
    } catch (e) {}
    return '';
}


function openExternalLink(oEl) {
    //navigator.app.loadUrl(oEl.href, {openExternal: true});
    window.open(oEl.href, "_system");
    return false;
}


function showElement(sId, bFade) {
    bFade = bFade || false;

    var oEl = getEl(sId);
    if (!oEl) {
        return false;
    }

    if (bFade) {
        oEl.style.opacity = '1';
    } else {
        oEl.style.display = 'block';
    }
}

function hideElement(sId, bFade) {
    bFade = bFade || false;

    var oEl = getEl(sId);
    if (!oEl) {
        return false;
    }

    if (bFade) {
        oEl.style.opacity = '0';
    } else {
        oEl.style.display = 'none';
    }
}


function showStatus(sStatusText, mTimeout) {

    if (typeof(mTimeout) === 'undefined') {
        mTimeout = 3000;
    }

    var oStatus = getEl('status');
    oStatus.innerHTML = '<div id="status_text">' + sStatusText + '</div>';
    oStatus.style.display = 'block';
    bStatusOpened = true;

    if (iStatusTimeout) {
        clearTimeout(iStatusTimeout);
    }

    if (mTimeout) {
        iStatusTimeout = setTimeout(hideStatus, mTimeout);
    }

}


function hideStatus() {
    hideElement('status');
    bStatusOpened = false;
}


function showModal(sMessage, sError) {
    sError = sError || false;

    hideStatus();
    if (sError) {
        sMessage += '<br><br><span class="small">' + sError + '</span>';
    }

    bModalOpened = true;
    defocus();
    getEl('modal_content').innerHTML = sMessage + '<br><br><span class="small">' + getLang('hide-modal-hint') + '</span>';
    getEl('modal').classList.add('active');
}

function hideModal() {
    bModalOpened = false;
    getEl('modal').classList.remove('active');
    getEl('modal_content').removeAttribute('style');
}


function getMatch(sContent, sRegExp, iMatchNum) {

    iMatchNum = iMatchNum || 1;
    var aData = sContent.match(sRegExp);
    if (aData && aData.length > iMatchNum) {
        return aData[iMatchNum];
    }

    return '';

}


function getUniqueId() {

    var sDeviceUid = localStorage.getItem('deviceId');
    if (sDeviceUid) {
        return sDeviceUid;
    }

    sDeviceUid = sDeviceFamily + '|' + btoa([navigator.userAgent, new Date().getTime()].join('|')).replace(/=/g, '1');

    try {
        switch (sDeviceFamily) {
            case 'LG':
                sDeviceUid += '|' + sLgDeviceId;
                break;
            case 'Samsung':
                sDeviceUid += '|' + webapis.productinfo.getDuid();
                break;
            case 'Apple':
            case 'Android':
                sDeviceUid += m3uConnector.getDeviceId();
                break;
            default:
                sDeviceUid += '|Default';
                break;
        }
    } catch (e) {
        debugError(e);
    }

    sDeviceUid = sDeviceUid.replace(/[&?,.:;%!+# ]/g, "_");

    localStorage.setItem('deviceId', sDeviceUid);

    return sDeviceUid;

}


function setBootStatusText(sText) {
    getEl('boot_status').innerHTML = sText + ' …';
}


/*
// Database
	bDbInitiated:
		0 - no init yet
		1 - loading or creating success
		5 - error and recreate
		9 - is loading the first time right now
*/
function initDb(sOnSuccess, sOnFailure) {

    if (bDbInitiated > 0) {
        return bDbInitiated;
    }

    setBootStatusText('Loading database');

    try {
        var oDbOpen = indexedDB.open("m3u_v3", iDbVersion);

        if (bDbInitiated === 0) {
            bDbInitiated = 9; // First time loading
        }

        oDbOpen.onupgradeneeded = function(oEv) {

            setBootStatusText('Creating database');

            oDb = oEv.target.result;

            var aStoreNames = oDb.objectStoreNames,
                iTablesCount = aStoreNames.length;

            /*for( var i = 0; i < iTablesCount; i++ ) {
            	oDb.deleteObjectStore(aStoreNames[i]);
            }*/

            // recreate DB
            createObjectStores(oDb, aStoreNames);
        };

        oDbOpen.onsuccess = function() {
            oDb = oDbOpen.result;
            bDbInitiated = 1; // OK
            sOnSuccess();

            if (oDb.objectStoreNames.length < 2) {
                //createObjectStores(oDb); // cannot create in onsuccess
                debug("DB recreation neeeded");
            }

        };
        oDbOpen.onerror = function(oEv) {

            debug("Error loading db");

            // try recreate DB
            if (bDbInitiated !== -1 && oEv.target.error.name === 'VersionError') {
                bDbInitiated = -1; // prevent loop
                //debug("Delete and recreate DB");
                indexedDB.deleteDatabase("m3u_v3").onsuccess = function() {
                    //debug("Delete successful. Recreate now.");
                    initDb(sOnSuccess, sOnFailure);
                };
            } else {
                sOnFailure(oEv);
            }
        };

    } catch (e) {
        debug(e.message);
        sOnFailure();
    }

}


function stopDb() {

    if (oDb) {
        oDb.close();
        console.log('db closed');

        bDbInitiated = 0;
        oDb = false;
    }

}


function createObjectStores(oDb, aStoreNames) {

    try {

        var oStore = false;
        if (!aStoreNames.contains("playlistStore")) {
            oStore = oDb.createObjectStore("playlistStore", {
                keyPath: "id",
                autoIncrement: true
            });
            oStore.createIndex("id", "id", {
                unique: true
            });
        }

        if (!aStoreNames.contains("playlistChannels")) {
            oStore = oDb.createObjectStore("playlistChannels", {
                keyPath: ['pid', 'pos']
            });
            oStore.createIndex("pid", "pid", {
                unique: false
            });
            oStore.createIndex("pos", "pos", {
                unique: false
            });
        }

        if (!aStoreNames.contains("epgStore")) {
            oStore = oDb.createObjectStore("epgStore", {
                keyPath: "id",
                autoIncrement: true
            });
            oStore.createIndex("url", "url", {
                unique: true
            });
            oStore.createIndex("pid_url", ["url", "pid"], {
                unique: true
            });
        }

        if (!aStoreNames.contains("epgChannels")) {
            oStore = oDb.createObjectStore("epgChannels", {
                keyPath: ['name', 'eid']
            });
            oStore.createIndex("ch_name", "name", {
                unique: false
            });
            oStore.createIndex("epg_id", "eid", {
                unique: false
            });
        }

        if (!aStoreNames.contains("epgProgramme")) {
            oStore = oDb.createObjectStore("epgProgramme", {
                keyPath: ['id', 'start']
            });
            oStore.createIndex("id", "id", {
                unique: false
            });
            oStore.createIndex("epg_id", "eid", {
                unique: false
            });
        }

    } catch (e) {
        debugError(e);
    }

}


function getWorkerStatus(sResponseText, sSearch) {

    if (sResponseText.indexOf(sSearch) === 0) {
        sResponseText = sResponseText.replace(sSearch, '');
        return sResponseText;
    }

    return false;

}


function loadLatestVersion() {

    switch (sDeviceFamily) {
        case 'LG':
            location.href = 'http://m3u-ip.tv/lg/';
            break;
        case 'Samsung':
            location.href = 'http://m3u-ip.tv/samsung/';
            break;
        case 'Apple':
            location.href = 'http://m3u-ip.tv/apple/';
            break;
        case 'Android':
            location.href = 'http://m3u-ip.tv/android/';
            break;
        default:
            location.href = 'http://m3u-ip.tv/browser/';
            break;
    }

}


// DRM
function hexToBase64(hex) {
    var bytes = [];
    for (var i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }

    var binary = String.fromCharCode.apply(null, bytes);

    // Encode binary string to Base64
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=*$/, "");
}

function base64ToBytes(base64) {
    return new Uint8Array(atob(base64).split('').map(function(m) {
        return m.codePointAt(0);
    }));
}

function bytesToBase64(bytes) {
    return btoa(Array.prototype.map.call(bytes, function(byte) {
        return String.fromCodePoint(byte);
    }).join(''));
}


function utf8Encode(r) {

    if (typeof(TextEncoder) !== "undefined") {
        var byteArray = new TextEncoder().encode(r);
        return String.fromCharCode.apply(null, byteArray);
    }

    if (typeof(unescape) !== "undefined") {
        return unescape(encodeURI(r));
    }

    return false;

}

function md5(r) {
    var o, e, n, f = [-680876936, -389564586, 606105819, -1044525330, -176418897, 1200080426, -1473231341, -45705983, 1770035416, -1958414417, -42063, -1990404162, 1804603682, -40341101, -1502002290, 1236535329, -165796510, -1069501632, 643717713, -373897302, -701558691, 38016083, -660478335, -405537848, 568446438, -1019803690, -187363961, 1163531501, -1444681467, -51403784, 1735328473, -1926607734, -378558, -2022574463, 1839030562, -35309556, -1530992060, 1272893353, -155497632, -1094730640, 681279174, -358537222, -722521979, 76029189, -640364487, -421815835, 530742520, -995338651, -198630844, 1126891415, -1416354905, -57434055, 1700485571, -1894986606, -1051523, -2054922799, 1873313359, -30611744, -1560198380, 1309151649, -145523070, -1120210379, 718787259, -343485551],
        t = [o = 1732584193, e = 4023233417, ~o, ~e],
        c = [],
        a = utf8Encode(r) + "\u0080",
        d = a.length;
    for (r = --d / 4 + 2 | 15, c[--r] = 8 * d; ~d;) c[d >> 2] |= a.charCodeAt(d) << 8 * d--;
    for (i = a = 0; i < r; i += 16) {
        for (d = t; 64 > a; d = [n = d[3], o + ((n = d[0] + [o & e | ~o & n, n & o | ~n & e, o ^ e ^ n, e ^ (o | ~n)][d = a >> 4] + f[a] + ~~c[i | 15 & [a, 5 * a + 1, 3 * a + 5, 7 * a][d]]) << (d = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][4 * d + a++ % 4]) | n >>> -d), o, e]) o = 0 | d[1],
            e = d[2];
        for (a = 4; a;) t[--a] += d[a];
    }
    for (r = ""; 32 > a;) r += (t[a >> 3] >> 4 * (1 ^ a++) & 15).toString(16);
    return r;
}


// Close app
var oLastFocusedField = false,
    bConfirmBoxOpened = false,
    bYesConfirmSelected = false;

function customConfirmExit(sText) {

    try {

        switch (sDeviceFamily) {
            case 'LG':
                window.PalmSystem.platformBack();
                break;
            case 'Browser':
                if (typeof(sTvManufacturer) === 'string' && sTvManufacturer === 'Vidaa') {
                    // Show confirm box (see below)
                } else {
                    break;
                }
            case 'Samsung':
            case 'Android':
                bConfirmBoxOpened = true;
                oLastFocusedField = document.activeElement;
                if (oLastFocusedField) {
                    oLastFocusedField.blur();
                }

                var oConfirmbox = getEl('custom_confirm');
                oConfirmbox.style.display = 'block';
                var sButtons = '<div id="confirm_buttons"><span id="confirm_yes" onclick="closeApp()">' + getLang('yes') + '</span> <span id="confirm_no" onclick="closeConfirm()">' + getLang('no') + '</span></div>';

                if (typeof(sAdditionalExitHtml) === 'string') {
                    sButtons += sAdditionalExitHtml;
                }

                if (typeof(isPremiumAccessAllowed) === 'function' && !isPremiumAccessAllowed()) {
                    if (sDeviceFamily === 'Android' && !bIsAndroidTv) {
                        sButtons += '<div class="HR" style="margin: 40px 0;"></div><p style="padding: 10px">' + getLang('donate') + '</p>';
                    } else {
                        sButtons += '<div class="HR" style="margin: 40px 0;"></div><p id="custom_confirm_donation" class="FLOATLEFT" style="max-width: 260px; padding: 10px">' + getLang('donate') + '</p>';
                        sButtons += '<div style="display: inline-block; background: #fff; padding: 20px;"><img style="display: block;" src="https://m3u-ip.tv/images/donate.png" width="180" height="180" alt="donation"></div>';
                    }
                }

                oConfirmbox.innerHTML = '<div id="custom_confirm_content" class="fullscreen-popup">' + sText + sButtons + '</div>';
                bYesConfirmSelected = false;
                toggleConfirmOptions();
                break;
        }
    } catch (e) {
        debug(e.message);
    }

}


function toggleConfirmOptions() {
    bYesConfirmSelected = !bYesConfirmSelected;
    var oConfirmYes = getEl('confirm_yes'),
        oConfirmNo = getEl('confirm_no');
    if (bYesConfirmSelected) {
        oConfirmYes.className = 'selected';
        oConfirmNo.className = '';
    } else {
        oConfirmYes.className = '';
        oConfirmNo.className = 'selected';
    }
}


function closeConfirm() {

    if (oLastFocusedField) {
        oLastFocusedField.focus();
        oLastFocusedField = false;
    }
    bConfirmBoxOpened = false;
    getEl('custom_confirm').style.display = 'none';
}


function closeApp() {

    try {
        switch (sDeviceFamily) {
            case 'Browser':
            case 'Vidaa':
                window.close();
                break;
            case 'Samsung':
                tizen.application.getCurrentApplication().exit();
                break;
            case 'LG':
                window.PalmSystem.platformBack();
                break;
            case 'Android':
                m3uConnector.closeApp();
                break;
        }
    } catch (e) {
        debug(e.message);
    }

}


function getAvailableSpace(sCallback, sErrorCallback) {

    if (typeof(navigator.storage) === 'undefined' || typeof(navigator.storage.estimate) === 'undefined') {
        return sErrorCallback;
    }

    navigator.storage.estimate().then(function(oDrive) {
        var fUsed = (oDrive.usage / 1048576).toFixed(1);
        var fTotal = (oDrive.quota / 1048576).toFixed(1);
        sCallback(fUsed, fTotal);
    });

}


function doAppServerRequest(sUrl, sCallback) {

    var oHttp = new XMLHttpRequest(),
        bFailureFired = false,
        sDeviceId = getUniqueId();

    oHttp.timeout = 3000;
    oHttp.onreadystatechange = function() {
        if (oHttp.readyState == XMLHttpRequest.DONE) { // oHttpRequest.DONE == 4
            if (oHttp.status === 200 && oHttp.getResponseHeader('custom-validation-server') === 'https://m3u-ip.tv') {
                try {
                    eval(oHttp.response);
                    oHttp.m3uValidResponse = true;
                } catch (e) {
                    console.error(e);
                }
                sCallback(oHttp);
            } else {
                if (!bFailureFired) {
                    bFailureFired = true;
                    sCallback(oHttp);
                }
            }
        }
    };

    oHttp.addEventListener('error', function() {
        if (!bFailureFired) {
            bFailureFired = true;
            sCallback(oHttp);
        }
    });
    oHttp.addEventListener('abort', function() {
        if (!bFailureFired) {
            bFailureFired = true;
            sCallback(oHttp);
        }
    });
    oHttp.addEventListener('timeout', function() {
        if (!bFailureFired) {
            bFailureFired = true;
            sCallback(oHttp);
        }
    });

    try {
        oHttp.open("POST", sUrl, true);
        oHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        oHttp.send("ai=" + getAppId() + "&d=" + sDeviceFamily + "&v=" + sAppVersion + "&id=" + sDeviceId + "&vw=" + sView + "&l=" + getLangId());
    } catch (e) {
        if (!bFailureFired) {
            bFailureFired = true;
            sCallback(e);
        }
        console.error(e);
        return false;
    }

    return true;

}


function addRemoteBootScript(sCallback) {

    if (sDeviceFamily === 'LG' && typeof(webOSDev) === 'object') {
        webOSDev.LGUDID({
            onSuccess: function(res) {
                sLgDeviceId = res.id;
                doAppServerRequest("https://m3u-ip.tv/premium/settings.php", sCallback);
            },
            onFailure: function(res) {
                doAppServerRequest("https://m3u-ip.tv/premium/settings.php", sCallback);
            }
        });

        return;
    }

    return doAppServerRequest("https://m3u-ip.tv/premium/settings.php", sCallback);

}


// Android
function importLocalStorage(sJson) {
    var oData = JSON.parse(sJson);
    for (var key in oData) {
        if (oData.hasOwnProperty(key)) {
            localStorage.setItem(key, oData[key]);
        }
    }
    return true;
}


function applyTouchMode() {
    if (!bTouchMode && localStorage.getItem('bTouchMode')) {
        bTouchMode = true;

        document.body.classList.add('touchmode');

        // Add helper touch icons for guide function
        if (sView === 'settings') {
            var oGuideItems = document.querySelectorAll('.settings-nav li[data-guide]');
            if (oGuideItems.length) {
                oGuideItems.forEach(function(oEl) {
                    if (!oEl.dataset.guide || oEl.dataset.guide == 'none') {
                        return;
                    }
                    var oTouchIcon = document.createElement('i');
                    oTouchIcon.className = 'touchguide-icon';
                    oTouchIcon.innerText = '?';
                    oEl.insertBefore(oTouchIcon, oEl.firstChild);
                });
            }
        }
    }
}


function enableTouchMode() {
    if (bTouchMode) {
        return;
    }
    localStorage.setItem('bTouchMode', 1);
    applyTouchMode();
}


// Mobile or TV
function getDeviceMode() {

    if (sDeviceMode === false) {
        sDeviceMode = 'tv';
        if (m3uConnector) {
            sDeviceMode = m3uConnector.getDeviceMode();
        }
    }

    return sDeviceMode;

}


function applyFontsize(sSize) {
    if (sSize) {
        var oCustomTheme = getEl('custom_styles');
        oCustomTheme.innerText = ':root { --font-size: ' + sSize + '; }';
    }
}


function applyTheme(sTheme) {

    var oCustomTheme = getEl('custom_theme');
    switch (sTheme) {
        case 'Dark':
            oCustomTheme.innerText = ':root { --theme-light: #ddd; --theme-moderate: #888; --theme-dark: #171717; --bg-moderate: #181818; }';
            break;
        case 'Orange':
            oCustomTheme.innerText = ':root { --theme-light: #ffb26d; --theme-moderate: #ff7e00; --theme-dark: #52300e; --bg-moderate: #312b28; }';
            break;
        case 'Green':
            oCustomTheme.innerText = ':root { --theme-light: #61ff5d; --theme-moderate: #2d7900; --theme-dark: #112b13; --bg-moderate: #293128; }';
            break;
        case 'Lime':
            oCustomTheme.innerText = ':root { --theme-light: #9bcf9b; --theme-moderate: #00b300; --theme-dark: #005700; --bg-moderate: #223122; }';
            break;
        case 'Blue':
            oCustomTheme.innerText = ':root { --theme-light: #ddd; --theme-moderate: #0059b7; --theme-dark: #11112b; --bg-moderate: #232231; }';
            break;
        case 'Red':
            oCustomTheme.innerText = ':root { --theme-light: #ff7c7c; --theme-moderate: #c10000; --theme-dark: #2d1212; --bg-moderate: #312626; }';
            break;
        case 'Magenta':
            oCustomTheme.innerText = ':root { --theme-light: #ff97d5; --theme-moderate: #fe089a; --theme-dark: #290319; --bg-moderate: #271f23; }';
            break;
        case 'Purple':
            oCustomTheme.innerText = ':root { --theme-light: #db99ff; --theme-moderate: #890ccb; --theme-dark: #200a2d; --bg-moderate: #29212d; }';
            break;
        default:
            oCustomTheme.innerText = '';
    }

}