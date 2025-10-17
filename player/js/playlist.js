/*

	Copyright 2025 - Herber eDevelopment - Jaroslav Herber
	All rights reserved.

	This code is proprietary and confidential.
	Copying, modification, distribution, or use of this code without explicit permission is strictly prohibited.

*/

var oPlaylistNavSelector = getEl('playlist_selector_list'),
    iFirstPlaylistId = false,
    bDownloadRunning = false,
    oActivePlaylistWorker = false,
    oChannelEpgIds = {},
    oSeriesNavSelector = getEl('series_selector_list'),
    oCurrentEpisode = false,
    iAppStartTime = Date.now();

function bootPlaylistReady(sOnSuccess, sOnFailure) {

    loadPlaylists(function(iListCount) {
        if (!iCurrentPlaylistId) {
            iCurrentPlaylistId = 0;
        }

        // Is allowed to load playlist?
        if (!isPremiumAccessAllowed()) {
            iCurrentPlaylistId = iFirstPlaylistId;
        }

        setActivePlaylist(iCurrentPlaylistId, sOnSuccess, sOnFailure);
        //getPlaylistChannels(iCurrentPlaylistId, sOnSuccess, sOnFailure);

    }, sOnFailure);

}


function playlistDownLoadFinished() {
    bDownloadRunning = false;
}


function abortPlaylistDownload() {

    if (oActivePlaylistWorker) {
        oActivePlaylistWorker.terminate();
        oActivePlaylistWorker = false;
    }

    playlistDownLoadFinished();

}


function reloadPlaylist(sCallback) {

    if (localStorage.getItem('coming-from-settings')) {
        sCallback();
        return;
    }

    if (oCurrentPlaylist && oCurrentPlaylist.startReload && oCurrentPlaylist.type === 'url' &&
        window.Worker && !bDownloadRunning && oCurrentPlaylist.grabtime < (iAppStartTime - 120000)) {

        setBootStatusText('Downloading playlist');

        localStorage.removeItem('deviceStartup');
        //debug('startup reloading playlist');

        abortPlaylistDownload();
        bDownloadRunning = true;

        oCurrentPlaylist.status = 'LOADING';
        if (oCurrentPlaylist.error) {
            oCurrentPlaylist.error = null;
        }

        var oPostData = {
            'playlistData': oCurrentPlaylist,
            'version': iDbVersion
        };

        oActivePlaylistWorker = new Worker("../js/playlist-worker.js?v=2");
        oActivePlaylistWorker.postMessage(oPostData);

        oActivePlaylistWorker.onmessage = function(e) {
            var sResponseText = e.data;
            if (sResponseText) {

                var sStatus = getWorkerStatus(sResponseText, 'ERROR');
                if (sStatus) {
                    abortPlaylistDownload();
                    sCallback();
                    return true;
                }

                sStatus = getWorkerStatus(sResponseText, 'COUNT live: ');
                if (sStatus) {
                    oCurrentPlaylist.liveCount = parseInt(sStatus);
                    return true;
                }

                sStatus = getWorkerStatus(sResponseText, 'COUNT movie: ');
                if (sStatus) {
                    oCurrentPlaylist.movieCount = parseInt(sStatus);
                    return true;
                }

                sStatus = getWorkerStatus(sResponseText, 'COUNT series: ');
                if (sStatus) {
                    oCurrentPlaylist.seriesCount = parseInt(sStatus);
                    return true;
                }

                if (sResponseText === 'finish') {
                    playlistDownLoadFinished();
                    oCurrentPlaylist.status = 'OK';
                    oCurrentPlaylist.grabtime = Date.now();
                    saveCurrentPlaylist(oCurrentPlaylist, sCallback);
                }

            }
        };

        oActivePlaylistWorker.onerror = function(e) {
            sCallback();
        };

    } else {
        sCallback();
    }

}


function setActivePlaylist(sId, sOnSuccess, sOnFailure) {

    if (aLoadedPlaylists && !aLoadedPlaylists[sId]) {
        for (sId in aLoadedPlaylists) {
            break;
        } // Overwrites playlist ID, if last played one was deleted
    }

    if (aLoadedPlaylists && aLoadedPlaylists[sId] && aLoadedPlaylists[sId].channelCount) {
        oChannelEpgIds = {};
        removeFilterCategory();
        iCurrentPlaylistId = parseInt(sId);
        localStorage.setItem('iCurrentPlaylistId', sId);
        oCurrentPlaylist = aLoadedPlaylists[sId];
        setCategoriesStatus(); // Update visibility in groups list

        sPlaylistNav = '<li id="current_playlist" data-prev="main_nav" data-next="main_nav">' + oCurrentPlaylist.name + ' (' + oCurrentPlaylist.channelCount + ')' + '</li>';
        getEl('active_playlist').innerHTML = oCurrentPlaylist.name;
        getEl('channel_playlist').innerHTML = oCurrentPlaylist.name;

        // Reload needed?
        reloadPlaylist(function() {
            getPlaylistChannels(sId, function(iPlaylistId) {
                //aActiveChannelList = aChannelList; //sortChannelList(aChannelList);
                sOnSuccess(iPlaylistId);
            }, sOnFailure);
        });

        return true;
    }

    sOnFailure();

    return false;

}


function loadPlaylists(sOnSuccess, sOnFailure) {

    if (bDbInitiated && oDb) {

        iFirstPlaylistId = false;

        setBootStatusText('Loading playlist');

        aLoadedPlaylists = [];
        //oPlaylistList.className = 'loading';

        var oTx = oDb.transaction("playlistStore"),
            oStore = oTx.objectStore("playlistStore"),
            oIndex = oStore.index('id'),
            oRequest = oIndex.openCursor(),
            iListCount = 0;

        bIsLoadingPlaylists = true;
        oPlaylistNavSelector.innerHTML = '';

        oRequest.onsuccess = function(event) {
            var oRecord = event.target.result;
            if (oRecord && oRecord.value) {

                var aPlaylist = oRecord.value,
                    sName = aPlaylist.name;
                if (!sName && aPlaylist.url) {
                    sName = getBasename(aPlaylist.url);
                }

                if (!sName) {
                    sName = getLang('noPlaylistName');
                }

                if (iFirstPlaylistId === false) {
                    iFirstPlaylistId = parseInt(aPlaylist.id);
                }

                aLoadedPlaylists[aPlaylist.id] = aPlaylist;
                iPlaylistChannelCount = aPlaylist.channelCount;

                var oPlaylistItem = document.createElement("div"),
                    sName = '';
                oPlaylistItem.id = 'playlist_item_' + aPlaylist.id;
                oPlaylistItem.className = 'playlist-item';

                var sHtml = '<button class="button icon-button edit focusable" onclick="editPlaylist(' + aPlaylist.id + ')"></button><p>' + sName;
                if (aPlaylist.url) {
                    sHtml += '<br><i>' + aPlaylist.url + '</i>';
                }

                sHtml += '</p>';
                oPlaylistItem.innerHTML = sHtml;

                //sHtmlList += '<div class="playlist-item" id="playlist_item_' + aPlaylist.id + '"><button class="button icon-button edit" onclick="editPlaylist(' + aPlaylist.id + ')"></button>' + aPlaylist.name + ' <span></span></div>';
                //oPlaylistList.appendChild(oPlaylistItem);
                iListCount++;

                // print channel count
                var oChannelsCount = document.createElement("span");
                oChannelsCount.innerHTML = '...';
                oPlaylistItem.appendChild(oChannelsCount);

                if (iPlaylistChannelCount) {
                    oChannelsCount.innerHTML = '(' + iPlaylistChannelCount + ')';
                    //oPlaylistItem.classList.remove('no-channels');
                } else {
                    oChannelsCount.innerHTML = 'no channels!';
                    oPlaylistItem.classList.add('no-channels');
                }

            }

            if (oRecord) {
                oRecord.continue();
            }
        };

        oRequest.onerror = function(e) {
            bIsLoadingPlaylists = false;
            //oPlaylistList.className = '';

            if (typeof(sOnFailure) === 'function') {
                sOnFailure(e);
            }
        };

        oTx.oncomplete = function() {

            bNeedNavRefresh = true;
            bIsLoadingPlaylists = false;
            //oPlaylistList.className = '';

            if (!iListCount) {
                //oPlaylistList.innerHTML = '<p class="i18n icon hint icon-guide" data-langid="noPlaylistYet">' + getLang('noPlaylistYet') + '</p>';
            } else {
                bPlaylistFileLoaded = true;
                //console.log("playlist header load complete. Playlist count: " + iListCount);
            }

            if (typeof(sOnSuccess) === 'function') {
                sOnSuccess(iListCount);
            }

            var sHtml = '';

            for (var i in aLoadedPlaylists) {
                if (!aLoadedPlaylists[i].channelCount) {
                    continue;
                }

                var sSelected = '',
                    sName = '';
                if (aLoadedPlaylists[i].name) {
                    sName = aLoadedPlaylists[i].name;
                } else {
                    sName = getLang('noPlaylistName');
                }

                if (aLoadedPlaylists[i].channelCount) {
                    sName += ' (' + aLoadedPlaylists[i].channelCount + ')';
                }

                if (iCurrentPlaylistId == i) {
                    sSelected = 'class="selected active"';
                }
                sHtml += '<li data-pid="' + i + '" ' + sSelected + '>' + sName + '</li>';
            }

            sHtml += '<li id="selector_open_playlist_manager" class="i18n icon icon-settings" data-langid="playlistSelectorOpenPm">' + getLang('playlistSelectorOpenPm') + '</li>';

            oPlaylistNavSelector.innerHTML = sHtml;
        };

    }

}


function getChannel(iPos) {

    if (aActiveChannelList && aActiveChannelList[iPos - 1]) {
        return aActiveChannelList[iPos - 1];
    }

    return false;

}


var aForcedPosChannels = [],
    aForcedPositions = {};

function sortForcedPositions() {

    aForcedPosChannels.sort(function(a, b) {
        return b.fposDate - a.fposDate;
    });

    for (var i = 0; i < aForcedPosChannels.length; i++) {
        var oCh = aForcedPosChannels[i],
            iPos = oCh.fpos;
        while (aForcedPositions[iPos]) {
            iPos++;
        }
        aForcedPositions[iPos] = oCh;
    }

}


// Experimental
function sortChannelList() {

    var result = [],
        insertPos = 0,
        aForcedPositions = {},
        aForcedDateSorted = [],
        iLength = aList.length;

    for (var i = 0; i < iLength; i++) {
        var oCh = aList[i];
        if (oCh.fposDate) {
            aForcedDateSorted.push(oCh);
        }
    }

    aForcedDateSorted.sort(function(a, b) {
        return b.fposDate - a.fposDate;
    });

    for (var i = 0; i < aForcedDateSorted.length; i++) {
        var oCh = aForcedDateSorted[i],
            iPos = oCh.fpos;
        while (aForcedPositions[iPos]) {
            iPos++;
        }
        aForcedPositions[iPos] = oCh;
    }

    console.log(aForcedDateSorted);
    console.log(aForcedPositions);

    for (var i = 0; i < iLength; i++) {
        if (aForcedPositions[i]) {
            result[insertPos] = aForcedPositions[i];
            insertPos++;
            //delete aForcedPositions[i];
        }
        var oCh = aList[i];
        if (typeof(oCh.fpos) !== 'undefined') {
            continue;
        }
        result[insertPos] = oCh;
        insertPos++;
    }

    for (i in aForcedPositions) {
        //result[insertPos] = aForcedPositions[i];
        //insertPos++;
    }

    console.log(aList);
    console.log(result);

    return result;
}


function getPlaylistChannels(iPlaylistId, sOnSuccess, sOnFailure) {

    setBootStatusText('Loading channels');

    iPlaylistId = parseInt(iPlaylistId);

    var oTx = oDb.transaction("playlistChannels"),
        oStore = oTx.objectStore("playlistChannels"),
        oIndex = oStore.index('pid'),
        oRange = IDBKeyRange.only(iPlaylistId),
        oRequest = oIndex.getAll(oRange);

    aForcedPosChannels = [];
    aForcedPositions = {};

    oRequest.onsuccess = function(e) {
        aActiveChannelList = e.target.result.filter(r => !r.deleted);
        //aForcedPosChannels = records.filter(r => r.fposDate);
    };

    /*oRequest.onsuccess = function(e) {
    	bIsLoadingPlaylists = true;
    	var oRecord = e.target.result;
    	if( oRecord && oRecord.value && !oRecord.value.deleted ) {
    		aChannelList.push(oRecord.value);
    		if( oRecord.value.fposDate ) {
    			aForcedPosChannels.push(oRecord.value);
    		}
    	}
    	if( oRecord ) {
    		oRecord.continue();
    	}
    };*/

    oRequest.onerror = function(e) {
        bIsLoadingPlaylists = false;
        if (typeof(sOnFailure) === 'function') {
            sOnFailure(e);
        }
    };

    oTx.oncomplete = function() {
        bIsLoadingPlaylists = false;
        //sortForcedPositions();

        if (typeof(sOnSuccess) === 'function') {
            sOnSuccess(iPlaylistId);
        }
    };

}


function saveCurrentPlaylist(oPlaylist, sCallback) {

    var tx = oDb.transaction("playlistStore", "readwrite"),
        oStore = tx.objectStore("playlistStore");

    if (!oPlaylist) {
        oPlaylist = oCurrentEditPlaylist;
    }

    if (oPlaylist) {
        oStore.put(oPlaylist);
    }

    if (typeof(sCallback) === 'function') {
        tx.oncomplete = sCallback;
    }

}


function saveChannel(oChannel, sCallback) {

    if (!oChannel) {
        return false;
    }
    var tx = oDb.transaction("playlistChannels", "readwrite"),
        oStore = tx.objectStore("playlistChannels");
    oStore.put(oChannel);
    tx.oncomplete = function() {
        //debug('channel updated in DB');
        if (typeof(sCallback) === 'function') {
            sCallback();
        }
    };

}


function setCategoriesStatus() {
    getEl('category_live').classList.toggle('visible', oCurrentPlaylist.liveCount > 0);
    getEl('category_movie').classList.toggle('visible', oCurrentPlaylist.movieCount > 0);
    getEl('category_series').classList.toggle('visible', oCurrentPlaylist.seriesCount > 0);
}


function getPlaylist() {
    return localStorage.getItem('sM3uList');
}


// Fired after Playlist was loaded
function playlistReadyHandler() {

    hideModal();

    try {
        if (bPlaylistFileLoaded) {
            bSettingsLoaded = true;
            if (AppSettings.isActive('startup-last-channel')) {
                var sLastStoredGroup = localStorage.getItem('sSelectedGroup');
                if (sLastStoredGroup && sLastStoredGroup !== '__all') {
                    setGroupFilter(sLastStoredGroup);
                }
            }

            buildNav();
            initPlayer();
        }
    } catch (e) {
        showChannelError('Framework loading error', e.message);
        debugError(e);
    }

}


function showPlaylistSelector() {
    bPlaylistSelectorOpened = true;
    getEl('playlist_selector').classList.add('active');
    oSelectedItem = getCurrentSelectedItem();
}


function hidePlaylistSelector() {
    bPlaylistSelectorOpened = false;
    getEl('playlist_selector').classList.remove('active');
    oSelectedItem = getCurrentSelectedItem();
}


function pickPlaylistSelector(oNavItem, bSkipPremiumCheck) {

    // Is allowed to load playlist?
    if (!bSkipPremiumCheck && !isPremiumAccessAllowed()) {
        showModal(getLang('license-fail'));
        return false;
    }

    var iPlaylistId = parseInt(oNavItem.dataset.pid);

    if (oCurrentPlaylist.id === iPlaylistId) {
        hidePlaylistSelector();
        return false;
    }

    // EPG download running? Close it
    abortEpgDownload();

    var oPlaylistSelector = getEl('playlist_selector'),
        oActiveNavItem = oPlaylistNavSelector.querySelector('.active');
    if (oActiveNavItem) {
        oActiveNavItem.classList.remove('active');
    }
    oPlaylistSelector.classList.add('loading-playlist');

    var oCurrentSelected = oPlaylistNavSelector.querySelector('li.selected');
    if (oCurrentSelected) {
        oCurrentSelected.classList.remove('selected');
    }

    oNavItem.classList.add('selected');

    // Save last played channel to DB
    if (oCurrentPlaylist) {
        oCurrentPlaylist.lastChannel = iCurrentChannel;
        saveCurrentPlaylist(oCurrentPlaylist);
    }

    setBootStatusText('Loading playlist from database');
    document.body.classList.add('booting');

    setActivePlaylist(iPlaylistId, function() {

        document.body.classList.remove('booting');
        oPlaylistSelector.classList.remove('loading-playlist');
        oNavItem.classList.add('active');

        hidePlaylistSelector();
        removeGroupFilter();
        hideGroups();
        bNeedNavRefresh = true;
        showNav();

        var iLoadChannel = 0;
        iCurrentChannel = false;
        if (oCurrentPlaylist.lastChannel && AppSettings.isActive('startup-last-channel')) {
            iLoadChannel = oCurrentPlaylist.lastChannel;
        }

        loadChannel(iLoadChannel);

        // start EPG grab
        startEgpGrabbing();

        //showGroups();
    }, function() {
        // error
        document.body.classList.remove('booting');
        showModal("Cannot load playlist. Please reload app.");
    });

}


//// Xtream
var aSeriesEpisodes = false,
    bSeriesPlaying = false;

function showXstreamSeriesSelector(oJson) {

    aSeriesEpisodes = oJson.episodes;
    var aInfo = oJson.info,
        sHtml = '';

    for (var i in aSeriesEpisodes) {

        var oSeason = aSeriesEpisodes[i];

        for (var x in oSeason) {
            var oEp = oSeason[x],
                sName = oEp.title;

            if (oEp.episode_num) {
                sName = 'S ' + i + ', EP ' + oEp.episode_num + ' | ' + sName;
            }

            sHtml += '<li data-sid="' + i + '" data-eid="' + x + '">' + sName + '</li>';
        }

    }

    oSeriesNavSelector.innerHTML = sHtml;
    getEl('series_headline').innerHTML = "(EXPERIMENTAL function!)<br><h2>" + aInfo.name + '</h2>';

    showEpisodeDescription(0);
    oSelectedItem = getCurrentSelectedItem();
    oSelectedItem.classList.add('selected');
}

function hideSeriesSelector() {
    bSeriesSelectorOpened = false;
    aSeriesEpisodes = false;
    getEl('series_selector').classList.remove('active', 'loading-series');

    oSeriesNavSelector.innerHTML = '';
    getEl('series_description').innerHTML = '';

    oSelectedItem = getCurrentSelectedItem();
}

// TODO
function showEpisodeDescription(i) {

    if (aSeriesEpisodes[i]) {
        var sHtml = aSeriesEpisodes[i].title;
        getEl('series_description').innerHTML = sHtml;
    }

}


function setSeriesPlayStatus(bPlaying) {
    bSeriesPlaying = bPlaying;
    document.body.classList.toggle('series-playing', bSeriesPlaying);
}


function pickSeriesSelector(oNavItem) {

    var iSid = oNavItem.dataset.sid,
        iEid = oNavItem.dataset.eid;
    if (aSeriesEpisodes && aSeriesEpisodes[iSid] && aSeriesEpisodes[iSid][iEid]) {

        if (!isPremiumAccessAllowed()) {
            showModal(getLang('license-fail'));
            return false;
        }

        var oEp = aSeriesEpisodes[iSid][iEid];
        var sServerUrl = oCurrentPlaylist.server,
            sLogin = oCurrentPlaylist.xtreamUser,
            sPw = oCurrentPlaylist.xtreamPw;
        var sAuthUrl = sServerUrl + 'player_api.php?username=' + sLogin + '&password=' + sPw;
        var sUrl = sServerUrl + 'series/' + sLogin + '/' + sPw + '/' + oEp.id;

        oCurrentEpisode = oEp;

        if (oEp.container_extension) {
            sUrl += '.' + oEp.container_extension;
        }

        setSeriesPlayStatus(true);
        sPlayingUrl = sUrl;
        setVideoEngine();
        playChannelUrl();
        hideSeriesSelector();
        showChannelName();

        return true;

    }

    return false;

}