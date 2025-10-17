/*

	Copyright 2025 - Herber eDevelopment - Jaroslav Herber
	All rights reserved.

	This code is proprietary and confidential.
	Copying, modification, distribution, or use of this code without explicit permission is strictly prohibited.

*/

var oLongPressTimeout = false,
    bButtonIsPressed = false,
    fShortEventFunction = false,
    sSmartControlActive = false;

// Android
function doKey(iKeyCode) {
    document.dispatchEvent(new KeyboardEvent('keydown', {
        'keyCode': iKeyCode
    }));
}

var is = function(el, selector) {
    return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
};


function toggleFullScreen() {
    try {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            getEl('cs_fs').classList.add('active');
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            getEl('cs_fs').classList.remove('active');
        }
    } catch (e) {

    }
}


function togglePip() {

    try {
        if (document.pictureInPictureElement) {
            getEl('cs_pip').classList.remove('active');
            bPipActive = false;
            document.exitPictureInPicture();
        } else if (document.pictureInPictureEnabled) {
            getEl('cs_pip').classList.add('active');
            bPipActive = true;
            oAvPlayer.requestPictureInPicture();
        }
    } catch (e) {}

}


function focusSearchField() {

    if (!bNavOpened) {
        showNav();
    }

    if (bAdvancedNavOpened) {
        hideAdvancedNav();
    }

    if (bGroupsOpened) {
        hideGroups();
    }

    oSearchField.blur();
    setTimeout(function() {
        oSearchField.focus();
    }, 501);

}


/* #### Controls #### */
function toggleControls() {
    if (bControlsOpened) {
        hideControls();
    } else {
        showControls();
    }
}

function showControls() {
    if (!bControlsOpened) {
        clearUi('smartControls');
        bControlsOpened = true;
        if (typeof(m3uConnector) === 'object') {
            m3uConnector.showControls();
            return;
        }
        updateProgressBar();
        document.body.classList.add('controls-enabled');
    }
}

function hideControls() {

    if (sSmartControlActive === 'playback') {
        return;
    }

    if (bControlsOpened) {
        bControlsOpened = false;
        if (typeof(m3uConnector) === 'object') {
            m3uConnector.hideControls();
            return;
        }
        document.body.classList.remove('controls-enabled');
    }
}


function toggleUi() {
    if (bUiOpened) {
        hideUi();
    } else {
        showUi();
    }
}

function showUi() {
    if (!bUiOpened) {
        bUiOpened = true;
        if (bEpgLoaded) {
            showElement('epg_ui_element');
            showChannelProgramBrowser();
        } else {
            hideElement('epg_ui_element');
            hideChannelProgramBrowser();
        }
        document.body.classList.add('ui-enabled');
    }
}

function hideUi() {
    if (bUiOpened) {
        bUiOpened = false;
        hideChannelProgramBrowser();
        document.body.classList.remove('ui-enabled');
    }
}


function smartControlMoveEpgProgram(bSmooth) {

    if (bSmooth) {
        oEpgChannelContent.classList.add('smooth-move');
    }
    var oEpgProg = createChannelEpgProgram(iCurrentProgramPos);
    oEpgChannelContent.style.transform = 'translateX(' + (iCurrentProgramPos * -100) + '%)';
    getEl('smart_controls').classList.toggle('arch-play-icon', (oEpgProg && oEpgProg.classList.contains('p-arch')));

}


function smartControlAction(k) {

    switch (k) {
        case aButtons['KeyUp']:
            if (bProgramBrowserOpened) {
                //document.body.classList.toggle('full-epg-desc');
                var oDesc = oEpgChannelBrowser.querySelector('#p_pos_' + iCurrentProgramPos + ' .p-content');
                if (oDesc) {
                    var iLastScrollPos = oDesc.scrollTop,
                        iNewScrollPos = iLastScrollPos + 45,
                        iMaxScroll = oDesc.scrollHeight - oDesc.offsetHeight;
                    if ((iNewScrollPos - 42) > iMaxScroll) {
                        iNewScrollPos = 0;
                    }

                    oDesc.scrollTop = iNewScrollPos;

                }
                return true;
            }

            if (sSmartControlActive === 'player' || sSmartControlActive === 'playback') {
                if (bEpgEnabled && bEpgLoaded && iChannelEpgLivePos !== false) {
                    showSmartControls('epg');
                    smartControlMoveEpgProgram();
                }
                return true;
            }
            return true;

        case aButtons['KeyDown']:
            if (sSmartControlActive === 'epg' || sSmartControlActive === 'player') {
                return showSmartControls('playback');
            } else if (sSmartControlActive === 'playback') {
                //toggleSubtitles();
                //getEl('smart-arrow-down').innerText = getLang('smart-togglesubtitles') + ' (' + (bSubtitlesActive ? 'on' : 'off') + ')';
                //focusControls();
            }

            if (bProgramBrowserOpened) {
                hideChannelProgramBrowser();
            }

            return true;

        case aButtons['KeyRight']:
            if (bProgramBrowserOpened) {
                if (iCurrentProgramPos < (iMaxProgramCount - 1)) {
                    iCurrentProgramPos++;
                    smartControlMoveEpgProgram(true);
                }
                return true;
            }

            if (sSmartControlActive === 'playback') {
                jumpForwards();
                return true;
            }
            hideSmartControls();
            break;

        case aButtons['KeyLeft']:
            if (bProgramBrowserOpened) {
                if (iCurrentProgramPos >= 1) {
                    iCurrentProgramPos--;
                    smartControlMoveEpgProgram(true);
                }
                return true;
            }

            if (sSmartControlActive === 'playback') {
                jumpBackwards();
                return true;
            }
            hideSmartControls();
            break;

        case 13: // OK button
            if (bProgramBrowserOpened) {
                // If program has archive, play
                var oEpgProg = getEl('p_pos_' + iCurrentProgramPos);
                if (oEpgProg && oEpgProg.classList.contains('p-arch')) {
                    var aData = JSON.parse(JSON.stringify(oEpgProg.dataset));
                    if (aData) {
                        hideSmartControls();
                        loadArchiveChannel(aData);
                        loadChannelEpg(iCurrentChannel, (aArchiveData !== false));
                    }
                }

                return true;
            }

            if (sSmartControlActive === 'playback') {
                togglePlayState();
                return true;
            }

            if (sSmartControlActive === 'player') {
                hideChannelName();
                hideSmartControls();
                showEpgOverview();
                return true;
            }
            break;

        case aButtons['BackButton']:
        case 10009: // RETURN
        case 27: // ESC
        case 113: // F2 - backbutton in android
            hideSmartControls();
            return true;
    }

    return false;

}


function showSmartControls(sType, bSilent) {

    if (!bSmartControlsEnabled && sType !== 'epg') {
        hideSmartControls();
        return true;
    }

    sSmartControlActive = sType;

    var oUp = getEl('smart-arrow-up'),
        oDown = getEl('smart-arrow-down'),
        oLeft = getEl('smart-arrow-left'),
        oRight = getEl('smart-arrow-right'),
        oOk = getEl('smart-button-ok');

    switch (sType) {
        case 'epg':
            oUp.innerText = '';
            oDown.innerText = getLang('smart-playback');
            oLeft.innerText = getLang('smart-epg-prev');
            oRight.innerText = getLang('smart-epg-next');
            oOk.innerHTML = '&#9654;';

            hideControls();
            showChannelProgramBrowser();

            break;

        case 'player':
            clearUi('smartControls');

            oUp.innerText = bEpgEnabled ? getLang('smart-channelepg') : '';
            oDown.innerText = getLang('smart-playback');
            oLeft.innerText = getLang('smart-channellist');
            oRight.innerText = getLang('smart-channelsettings');
            oOk.innerText = getLang('smart-guide');

            // Load EPG
            setSmartEpg();
            body.classList.add('show-top-epg');

            if (bSmartControlsEnabled) {
                body.classList.add('smart-controls-enabled');
            }

            break;

        case 'playback':

            hideChannelProgramBrowser();

            if (sDeviceFamily === 'Android') {
                hideSmartControls();
                showControls();
                return true; // Only allow ExoPlayer controls
            }

            showControls();

            var iSkipSteps = AppSettings.getNumberSetting('skip-step-size', 10);

            oUp.innerText = bEpgEnabled ? getLang('smart-channelepg') : '';
            //oDown.innerText = getLang('smart-togglesubtitles') + ' (' + (bSubtitlesActive ? 'on' : 'off') + ')';
            oDown.innerText = '';
            oLeft.innerText = '+' + iSkipSteps + 's';
            oRight.innerText = '-' + iSkipSteps + 's';
            oOk.innerText = ''; //getLang('smart-playpause');

            break;
    }

    getEl('smart_controls').className = sType;

    return true;

}

function hideSmartControls() {

    sSmartControlActive = false;
    hideChannelProgramBrowser();
    hideControls();

    getEl('smart_controls').className = '';
    body.classList.remove('show-top-epg', 'smart-controls-enabled');

}


function focusControls() {
    showModal("TODO");
}


function changeButtonState(sType) {

    if (sType == 'playpause') {
        var oPlayPause = document.getElementById('playpause');
        if (!oPlayPause) return;

        if (oAvPlayer.paused || oAvPlayer.ended) {
            oPlayPause.setAttribute('data-state', 'play');
            oPlayPause.classList.add('active');
        } else {
            oPlayPause.setAttribute('data-state', 'pause');
            oPlayPause.classList.remove('active');
        }
    } else if (sType == 'volume') {
        var oVolume = document.getElementById('volume');
        if (!oVolume) return;

        if (oAvPlayer.muted) {
            oVolume.className = 'volume-0';
        } else {
            if (oAvPlayer.volume < 0.6) {
                oVolume.className = 'volume-50';
            } else {
                oVolume.className = 'volume-100';
            }
        }
    }

}


function changeVolume(sDir, bVolumneOnly) {

    bVolumeChange = bVolumneOnly || false;

    if (sDir && oAvPlayer) {
        var currentVolume = oAvPlayer.volume;
        if (sDir === '+') {
            if (currentVolume < 1) currentVolume += 0.1;
        } else if (sDir === '-') {
            if (currentVolume > 0) currentVolume -= 0.1;
        }

        setVolume(currentVolume);

        // If the volume has been turned off, also set it as muted
        if (currentVolume <= 0) {
            oAvPlayer.muted = true;
            oAvPlayer.volume = 0;
        } else oAvPlayer.muted = false;

        if (oVolume) {
            oVolume.setAttribute('data-state', oAvPlayer.muted ? 'unmute' : 'mute');
        }

    }

    // change volume with mousewheel
    if (bVolumeChange) {
        var oPlaybackController = document.getElementById('playback_controller');
        oPlaybackController.classList.add('show-volume');
        if (iVolumeVisibleTimeout) {
            clearTimeout(iVolumeVisibleTimeout);
        }
        iVolumeVisibleTimeout = setTimeout(function() {
            oPlaybackController.classList.remove('show-volume');
        }, 1000);
    }

    changeButtonState('volume');

}


function setVolume(fVol) {

    if (typeof(fVol) === 'string') {
        fVol = parseFloat(fVol);
    }

    fVol = fVol.toFixed(2);

    if (fVol < 0) {
        fVol = 0;
    } else if (fVol > 1) {
        fVol = 1;
    }

    oAvPlayer.volume = fVol;
    oVolumeBar.value = fVol;
    localStorage.setItem('fVolume', fVol);

}

function transformTime(iSeconds, bAddHours) {

    var iHours = Math.floor(iSeconds / 3600);
    var iMinutes = Math.floor((iSeconds % 3600) / 60);
    iSeconds = Math.floor(iSeconds % 60);

    if (iMinutes < 10) {
        iMinutes = "0" + iMinutes;
    }
    if (iSeconds < 10) {
        iSeconds = "0" + iSeconds;
    }

    if (bAddHours) {

        if (iHours < 10) {
            iHours = "0" + iHours;
        }
        return iHours + ':' + iMinutes + ':' + iSeconds;
    }

    return iMinutes + ':' + iSeconds;
}


function getCurrentControlsTime() {
    if (aArchiveData) {
        return iArchiveCurrentTime;
    }

    switch (sDeviceFamily) {
        case 'Browser':
        case 'LG':
            return oAvPlayer.currentTime;
        case 'Samsung':
            try {
                return Math.round(webapis.avplay.getCurrentTime() / 1000);
            } catch (e) {}

    }

    return 0;

}

function getControlsDuration() {
    if (aArchiveData) {
        return parseInt(aArchiveData.duration);
    }

    switch (sDeviceFamily) {
        case 'Browser':
        case 'LG':
            return oAvPlayer.duration;
        case 'Samsung':
            try {
                var iDuration = webapis.avplay.getDuration();
                if (!iDuration) {
                    var aDuration = webapis.avplay.getStreamingProperty("GET_LIVE_DURATION").split('|');
                    if (aDuration && aDuration.length == 2) {
                        iDuration = aDuration[1];
                    }
                }

                return Math.round(iDuration / 1000);
            } catch (e) {}
            break;
    }

    return 0;

}


function jumpStart() {
    if (aArchiveData) {
        loadArchiveChannel(aArchiveData, aArchiveData.originStartUtc - 60);
    } else {
        oAvPlayer.currentTime = 0;
    }
}

function jumpEnd() {
    if (aArchiveData) {
        loadArchiveChannel(aArchiveData, aArchiveData.originEndUtc + 1);
    } else {
        oAvPlayer.currentTime = getControlsDuration() - 5;
    }
}


function jumpForwards() {
    var iSkipSteps = AppSettings.getNumberSetting('skip-step-size', 10);
    if (aArchiveData) {
        iArchiveCurrentTime += iSkipSteps;
        return jumpArchiveStream(iSkipSteps);
    }

    if (sDeviceFamily === 'Samsung') {
        var sState = webapis.avplay.getState();
        if (sState === 'PLAYING' || sState === 'PAUSED') {
            webapis.avplay.jumpForward(iSkipSteps * 1000);
            updateProgressBar();
            return;
        }
    }

    if ((oAvPlayer.currentTime + 14) < getControlsDuration()) {
        oAvPlayer.currentTime += iSkipSteps;
    } else {
        oAvPlayer.currentTime = getControlsDuration() - 5;
    }
}

function jumpBackwards() {
    var iSkipSteps = AppSettings.getNumberSetting('skip-step-size', 10);
    if (aArchiveData) {
        iArchiveCurrentTime -= iSkipSteps;
        if (iArchiveCurrentTime < 0) {
            iArchiveCurrentTime = 0;
        }
        return jumpArchiveStream(-1 * iSkipSteps);
    }

    if (sDeviceFamily === 'Samsung') {
        var sState = webapis.avplay.getState();
        if (sState === 'PLAYING' || sState === 'PAUSED') {
            webapis.avplay.jumpBackward(iSkipSteps * 1000);
            updateProgressBar();
            return;
        }
    }

    if (oAvPlayer.currentTime < iSkipSteps) {
        oAvPlayer.currentTime = 0;
    } else {
        oAvPlayer.currentTime -= iSkipSteps;
    }
}

function updateProgressBar(iCurTime) {

    if (!bControlsOpened) {
        return false;
    }

    var iDur = getControlsDuration(),
        bAddHours = iDur > 3599;

    if (iCurTime && !aArchiveData) {
        // Take time from players timeupdate
    } else {
        iCurTime = getCurrentControlsTime();
    }

    oProgressBar.setAttribute('max', iDur);
    oProgressBar.value = iCurTime;
    getEl('time_progress').innerText = transformTime(iCurTime, bAddHours) + ' / ' + transformTime(iDur, bAddHours);

}


function removeDeviceControls() {

    if (sDeviceFamily === 'Samsung') {

        getEl('cs_ctrl').remove();
        getEl('cs_pip').remove();
        getEl('cs_fs').remove();
        getEl('volume_control').remove();

    }

}


function initPlaybackControls() {

    //removeDeviceControls();

    oVolume = document.getElementById('volume');
    oVolumeBar = document.getElementById('volume_bar');

    var fSavedVolume = localStorage.getItem('fVolume');
    if (fSavedVolume) {
        setVolume(fSavedVolume);
    }

    var oPlayPause = document.getElementById('playpause');

    // Add event listeners for video specific events
    oAvPlayer.addEventListener('play', function() {
        changeButtonState('playpause');
    }, false);
    oAvPlayer.addEventListener('pause', function() {
        changeButtonState('playpause');
    }, false);

    oVolume.addEventListener('click', function(e) {
        oAvPlayer.muted = !oAvPlayer.muted;
        if (!oAvPlayer.muted && oAvPlayer.volume <= 0) {
            setVolume(0.5);
        }
        changeButtonState('volume');
    });

    oAvPlayer.addEventListener('volumechange', function() {
        changeVolume();
    }, false);

    oVolumeBar.addEventListener('input', function(e) {
        var currentVolume = this.value;
        oAvPlayer.volume = currentVolume;
        // Note: can only do this with the custom control set as when the 'volumechange' event is raised, there is no way to know if it was via a volume or a mute change
        if (currentVolume <= 0) {
            oAvPlayer.muted = true;
        } else {
            oAvPlayer.muted = false;
        }
    });

    oVolumeBar.addEventListener('change', function(e) {
        setVolume(this.value);
    });

    oAvPlayer.addEventListener('loadedmetadata', function() {
        oProgressBar.setAttribute('max', getControlsDuration());
    });

    // As the video is playing, update the progress bar
    oAvPlayer.addEventListener('timeupdate', function() {
        updateProgressBar();
    });

    oProgressBar.addEventListener('click', function(e) {
        var pos = (e.pageX - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
        var iValue = pos * getControlsDuration();
        if (aArchiveData) {
            iArchiveCurrentTime = iValue;
            loadArchiveChannel(aArchiveData, aArchiveData.originStartUtc + iValue);
        } else {
            oAvPlayer.currentTime = iValue;
        }
    });

}


function swipeLeft2Right() {
    if (bNavOpened) {
        // RIGHT
        if (bAdvancedNavOpened) {
            showGroups();
        } else if (bGroupsOpened) {
            hideGroups();
        } else {
            hideNav();
        }
    } else {
        showChannelSettings();
    }
}

function swipeRight2Left() {
    // LEFT
    if (bAdvancedNavOpened) {} else if (bChannelSettingsOpened) {
        hideChannelSettings();
    } else if (bGroupsOpened) {
        showAdvancedNav();
    } else if (bNavOpened) {
        showGroups();
    } else {
        showNav();
    }
}


function swipeBottom2Top() {
    channelUp();
}


function swipeTop2Bottom() {
    channelDown();
}


function initTouchControls() {

    var cX = 0,
        cY = 0,
        newX = 0,
        newY = 0,
        bMoving = false,
        oBody = document.body;

    oBody.addEventListener("touchstart", touchPlayerStart, {
        passive: true
    });
    oBody.addEventListener("touchmove", touchPlayerMove, {
        passive: true
    });
    oBody.addEventListener("touchend", touchPlayerEnd, false);

    if (sDeviceFamily === 'Browser') {
        oAvPlayer.ondblclick = function() {
            toggleFullScreen();
        };
    }

    var bSwitchNavToRight = (AppSettings.getSetting('channellist-right') === 'on');
    var bSwitchUpDown = (AppSettings.getSetting('swap-up-down') === 'on');

    function touchPlayerStart(e) {

        if (bEpgOverviewOpened || bSearchFocused || bConfirmBoxOpened || bGuideOpened || bModalOpened || bPlaylistSelectorOpened || bSeriesSelectorOpened) {
            //e.preventDefault();
            bMoving = false;
            return false;
        }

        cX = e.touches[0].screenX;
        cY = e.touches[0].screenY;
        bMoving = true;
    }

    function touchPlayerMove(e) {

        if (!bMoving) {
            return false;
        }

        //touchPlayerEnd(e);
        if (e.touches.length) {
            newX = e.touches[0].screenX;
            newY = e.touches[0].screenY;
        }

        var x = (cX - newX),
            y = (cY - newY);

        // activate if X movement is twice as far as Y movement
        if ((Math.abs(x)) > (Math.abs(y) * 2)) {

            if (x > 100) {
                if (bProgramBrowserOpened) {
                    smartControlAction(aButtons['KeyRight']);
                    bMoving = false;
                    return false;
                }

                bSwitchNavToRight ? swipeRight2Left() : swipeLeft2Right();
                bMoving = false;
                return false;
            }

            if (x < -100) {
                if (bProgramBrowserOpened) {
                    smartControlAction(aButtons['KeyLeft']);
                    bMoving = false;
                    return false;
                }

                bSwitchNavToRight ? swipeLeft2Right() : swipeRight2Left();
                bMoving = false;
                return false;
            }

        } else if (!bNavOpened && !bChannelSettingsOpened) {

            if (y > 80) {
                if (bProgramBrowserOpened) {
                    if (e.target.className === 'p-desc') {
                        bMoving = false;
                        return false;
                    }
                    smartControlAction(aButtons['KeyDown']);
                    bMoving = false;
                    return false;
                }
                bSwitchUpDown ? swipeTop2Bottom() : swipeBottom2Top();
                bMoving = false;
                return false;
            }

            if (y < -80) {
                if (bProgramBrowserOpened) {
                    bMoving = false;
                    return false;
                }
                bSwitchUpDown ? swipeBottom2Top() : swipeTop2Bottom();
                bMoving = false;
                return false;
            }

        }

    }

    var tLastTapTime = 0;

    function touchPlayerEnd(e) {

        if (sDeviceFamily === 'Browser') {
            var tNow = new Date().getTime(),
                tTimeFly = tNow - tLastTapTime;
            if (tTimeFly < 500 && tTimeFly > 0) {
                tLastTapTime = 0;
                toggleFullScreen();
                return false;
            }
            tLastTapTime = new Date().getTime();
        }

        if (bFirstPlayStatus === 1) {
            playVideo();
        }

        bFirstPlayStatus = 2;

        if (e.touches.length) {
            newX = e.touches[0].screenX;
            newY = e.touches[0].screenY;
        }

    }


    oContextNav.onclick = function(el) {
        if (is(el.target, 'li')) {
            oSelectedItem = el.target;
            selectListItem();
        } else if (is(el.target.parentElement, 'li')) {
            oSelectedItem = el.target.parentElement;
            selectListItem();
        }
    };

    oChannelList.onclick = function(el) {
        if (is(el.target, 'li')) {
            oSelectedItem = el.target;
            selectListItem();
        } else if (is(el.target.parentElement, 'li')) {
            oSelectedItem = el.target.parentElement;
            selectListItem();
        } else if (is(el.target, 'img')) { // logo
            oSelectedItem = el.target.parentElement.parentElement;
            selectListItem();
        }
    };

    oGroupsNav.onclick = function(el) {
        if (is(el.target, 'li')) {
            oSelectedItem = el.target;
            selectListItem();
        } else if (is(el.target.parentElement, 'li')) {
            oSelectedItem = el.target.parentElement;
            selectListItem();
        }
    };

    getEl('advanced_list').onclick = function(el) {
        if (is(el.target, 'li')) {
            oSelectedItem = el.target;
            selectListItem();
        } else if (is(el.target.parentElement, 'li')) {
            oSelectedItem = el.target.parentElement;
            selectListItem();
        }
    };

    oChannelSettingsList.onclick = function(el) {
        if (is(el.target, 'li')) {
            oSelectedItem = el.target;
            selectListItem();
        } else if (is(el.target.parentElement, 'li')) {
            oSelectedItem = el.target.parentElement;
            selectListItem();
        }
    };

}


function initAndroidControls() {

    getEl('player').onclick = function() {
        if (bControlsOpened || bProgramBrowserOpened || bChannelSettingsOpened) {
            clearUi(0);
            return false;
        }

        showChannelName();
    };

}


function showControlsArrow() {
    if (!bControlsArrowVisible && !bNavOpened) {
        bControlsArrowVisible = true;
        document.body.classList.add('mousemove');
    }
}

function hideControlsArrow() {
    if (bControlsArrowVisible) {
        bControlsArrowVisible = false;
        document.body.classList.remove('mousemove');
    }
}


function initMouseControls() {

    // Hover on settings nav items
    /*
    oSettingsTabs.forEach(function(el) {
    	el.onmouseover = function() {
    		el.click();
    	}
    });*/

    oGroupsNav.onwheel = function(oEl) {
        this.scrollTop += (oEl.wheelDelta < 0 ? 1 : -1) * 162;
        oEl.preventDefault();
    };
    oChannelList.onwheel = function(oEl) {
        this.scrollTop += (oEl.wheelDelta < 0 ? 1 : -1) * 162;
        oEl.preventDefault();
    };

    document.body.onwheel = function(oEl) {

        if (bProgramBrowserOpened || bEpgOverviewOpened || bNavOpened || bChannelSettingsOpened || bSearchFocused ||
            bConfirmBoxOpened || bGuideOpened || bModalOpened || bPlaylistSelectorOpened || bSeriesSelectorOpened) {
            return true;
        }

        if (oEl.target.id === 'volume' || oEl.target.id === 'volume_bar') {
            changeVolume(oEl.wheelDelta > 0 ? '+' : '-', false);
            return true;
        }

        if (oEl.wheelDelta > 0) {
            if (AppSettings.getSetting('mousewheel-volume') === 'on') {
                changeVolume('+', true);
            } else {
                channelUp();
            }

        } else {
            if (AppSettings.getSetting('mousewheel-volume') === 'on') {
                changeVolume('-', true);
            } else {
                channelDown();
            }
        }

    };

    // Leave window
    /*document.addEventListener("mouseout", function(e) {
    	e = e ? e : window.event;
    	var oEl = e.relatedTarget || e.toElement;
    	if( !oEl || oEl.nodeName == "HTML" ) {
    		if( bProgramBrowserOpened ) {
    			hideChannelProgramBrowser();
    		}
    	}
    });
    */

    var oPlayer = document.getElementById('player'),
        iHideArrowTimeout = 0;
    var oPlaybackController = document.getElementById('playback_controller');

    oPlayer.onclick = function() {
        if (!bChannelSettingsOpened) {
            showChannelName();
        }
    };

    if (sDeviceFamily === 'Android') {
        return;
    }

    document.getElementById('epg_nav_list_container').addEventListener('mouseover', function(ev) {
        if (bMouseOpenedNav) {
            hideNav();
        }
    });

    document.getElementById('nav_activator').addEventListener('mouseover', function(ev) {
        bMouseOpenedNav = true;
        hideControlsArrow();
        showNav();
    });

    var oControlsActivator = document.getElementById('controls_activator');
    oControlsActivator.addEventListener('mouseover', function(ev) {
        if (bNavOpened || bChannelSettingsOpened) {
            return false;
        }

        showControls();
        hideNav();
    });

    oControlsActivator.addEventListener('click', function(ev) {
        showControls();
        clearTimeout(iHideArrowTimeout);
    });

    document.getElementById('epg_activator').addEventListener('mouseover', function(ev) {
        if (bNavOpened || bChannelSettingsOpened) {
            return false;
        }

        bMouseOpenedEpg = true;
        hideChannelName();
        hideControlsArrow();
        showChannelProgramBrowser();
    });

    oPlayer.addEventListener('mousemove', function(ev) {
        clearTimeout(iHideArrowTimeout);
        showControlsArrow();

        // Mouse cursor on left edge - open nav
        /*
        if( ev.pageX < 5 ) {
        	bMouseOpenedNav = true;
        	showNav();
        	return false;
        } else */

        if (bMouseOpenedNav) {
            hideNav();
            return false;
        }

        if (bNavOpened || bChannelSettingsOpened) {
            return false;
        }

        // Mouse cursor on right edge - open epg
        //if( (oAvPlayer.offsetWidth - ev.pageX) < 10 ) {
        /*if( ev.pageY < 30 ) {
        	bMouseOpenedEpg = true;
        	hideChannelName();
        	showChannelProgramBrowser();
        	return false;
        } else if( bMouseOpenedEpg ) {
        	bMouseOpenedEpg = false;
        	hideChannelProgramBrowser();
        	return false;
        }*/

        //var iPercentY = ev.pageY / oAvPlayer.offsetHeight;
        //if( iPercentY > 0.8 ) {
        if ((oAvPlayer.offsetHeight - ev.pageY) < 100) {
            showControls();
            hideControlsArrow();
        } else {
            hideControls();
            iHideArrowTimeout = setTimeout(function() {
                hideControlsArrow();
            }, 500);
        }
    }, {
        passive: true
    });


    window.addEventListener('mouseout', function(ev) {
        clearTimeout(iHideArrowTimeout);
        iHideArrowTimeout = setTimeout(function() {
            hideControlsArrow();
            hideControls();
        }, 600);
    }, {
        passive: true
    });


    oPlaybackController.addEventListener('mouseout', function(ev) {
        clearTimeout(iHideArrowTimeout);
        iHideArrowTimeout = setTimeout(function() {
            hideControlsArrow();
            hideControls();
        }, 600);
    }, {
        passive: true
    });

    oPlaybackController.addEventListener('mouseover', function(ev) {
        if (bChannelSettingsOpened) {
            return false;
        }

        clearTimeout(iHideArrowTimeout);
        hideControlsArrow();
        showControls();
    }, {
        passive: true
    });


    if (sDeviceFamily === 'Browser' || sDeviceFamily === 'LG') {
        initPlaybackControls();
    }

    // Use custom fullscreen
    /*
    document.addEventListener('webkitfullscreenchange', function(ev) {
    	ev.preventDefault();
    	//toggleFullScreen();
    	console.log( ev );
    	return false;
    });

    oPlayer.addEventListener('click', function(ev) {
    	console.log( ev );
    }, false);
    */

    if (sDeviceFamily === 'Browser') {
        document.addEventListener('contextmenu', function(ev) {
            ev.preventDefault();
            showControlsGuide(sDeviceFamily);
            return false;
        }, false);
    }
}


// LG
function initVirtualKeyboard() {

    document.addEventListener('keyboardStateChange', function(event) {
        if (event.detail.visibility) {
            console.log("Virtual keyboard appeared");
            bKeyboardVisible = true;
            // Do something.
        } else {
            console.log("Virtual keyboard disappeared");
            bKeyboardVisible = false;

            if (document.activeElement && document.activeElement.nodeName === 'INPUT') {
                document.activeElement.blur();
            }

            // Do something.
        }
    }, false);

}


function initEvents() {

    oPlaylistNavSelector.addEventListener('click', function(oItem) {
        oItem = oItem.target.closest('li');
        if (bPlaylistSelectorOpened && oItem) {
            oSelectedItem = oItem;
            selectListItem();
        }
    });

    oSeriesNavSelector.addEventListener('click', function(oItem) {
        oItem = oItem.target.closest('li');
        if (bSeriesSelectorOpened && oItem) {
            oSelectedItem = oItem;
            selectListItem();
        }
    });

}


var aButtons = {
    'KeyLeft': 37,
    'KeyRight': 39,
    'KeyUp': 38,
    'KeyDown': 40,

    'ChannelUp': 33, // Page UP
    'ChannelDown': 34, // Page Down
    'PreviousChannel': 8, // Back
    'ChannelList': 2,

    'MediaPlay': 32, // Space
    'MediaStop': 2,
    'MediaPause': 2,
    'MediaRewind': 9999,
    'MediaFastForward': 9999,
    //'MediaPlayPause': 9999,
    'MediaTrackPrevious': 9999,
    'MediaTrackNext': 9999,

    'PictureSize': 9999,

    'Search': 70, // F
    'Info': 72, // H
    'E-Manual': 72, // H
    'Guide': 72, // H
    'Menu': 77, // M
    'Tools': 77, // M

    'Caption': 67, // C
    'Teletext': 67, // C

    'ColorF0Red': 82, // R
    'ColorF1Green': 71, // G
    'ColorF2Yellow': 89, // Y
    'ColorF3Blue': 66, // B

    'BackButton': 27 // ESC

};

if (sDeviceFamily === 'Android') {
    aButtons['ChannelUp'] = 1011;
    aButtons['ChannelDown'] = 1012;
    aButtons['PreviousChannel'] = 1017;
    aButtons['ChannelList'] = 1013;
    aButtons['MediaPlay'] = 1014;
    aButtons['MediaStop'] = 1015;
    aButtons['MediaPause'] = 1016;

    aButtons['Info'] = 1005;
    aButtons['E-Manual'] = 1005;
    aButtons['Guide'] = 1006;
    aButtons['Menu'] = 1007;

    aButtons['ColorF0Red'] = 1001;
    aButtons['ColorF1Green'] = 1002;
    aButtons['ColorF2Yellow'] = 1003;
    aButtons['ColorF3Blue'] = 1004;

    aButtons['BackButton'] = 999;
}

if (sDeviceFamily === 'LG') {
    aButtons['ColorF0Red'] = 403;
    aButtons['ColorF1Green'] = 404;
    aButtons['ColorF2Yellow'] = 405;
    aButtons['ColorF3Blue'] = 406; // also Guide
    aButtons['BackButton'] = 461;

    aButtons['Guide'] = 406; // Blue button
    aButtons['ChannelUp'] = 38;
    aButtons['ChannelDown'] = 40;
    //aButtons['PreviousChannel'] = 40;
}

if (sDeviceFamily === 'Browser') {
    aButtons['ChannelUp'] = 38; // Pfeil nach oben
    aButtons['ChannelDown'] = 40; // Pfeil nach unten
}

if (sDeviceFamily === 'Samsung' && tizen) {

    var aRcKeys = tizen.tvinputdevice.getSupportedKeys();
    if (aRcKeys && aRcKeys.length) {
        var aRegisterKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        aRcKeys.forEach(function(oKey) {
            if (aButtons[oKey.name]) {
                aButtons[oKey.name] = oKey.code;
                aRegisterKeys.push(oKey.name);
            }
        });
        tizen.tvinputdevice.registerKeyBatch(aRegisterKeys);
    }

}


function longPressEvent(fLongEvent, fShortEvent, iTimeout, bContinuous) {

    bButtonIsPressed = true;
    fShortEventFunction = fShortEvent;
    iTimeout = iTimeout || 400;

    oLongPressTimeout = setTimeout(function() {
        oLongPressTimeout = false;
        fShortEventFunction = false;
        fLongEvent();

        if (bContinuous) {
            longPressEvent(fLongEvent, false, iTimeout, bContinuous);
        }

    }, iTimeout);

}


function initControls() {

    var bChannellistRight = (AppSettings.getSetting('channellist-right') === 'on');
    var bSwitchUpDown = (AppSettings.getSetting('swap-up-down') === 'on');

    if (bChannellistRight) {
        document.body.classList.add('channellist-right');
    }

    initEvents();

    oSearchField.onfocus = function(e) {
        this.select();
        bSearchFocused = true;
    }

    oSearchField.onblur = function(e) {
        setTimeout(function() {
            bSearchFocused = false;
        }, 100);
    }

    oSearchField.onkeypress = function(e) {
        if (this.value.length > 14) {
            this.value = this.value.substring(0, 14);
            return false;
        }
    }

    // Key 113 -> F2 ist mapped as backbutton in android app
    oSearchField.onkeydown = function(e) {
        var k = e.keyCode;
        if (this.value == '' && (k == 37 || k == 39)) {
            oSearchField.blur();
            return false;
        }

        if (k == 38 || k == 40 || k == 13 || k == 65385 || k == 65376 || k == 10009 || k == 27 || k == 113 || k == aButtons['BackButton']) {
            oSearchField.blur();
            return false;
        }

        return true;
    }

    document.addEventListener('keyup', function(e) {

        if (bButtonIsPressed) {
            bButtonIsPressed = false;

            if (oLongPressTimeout) {
                clearTimeout(oLongPressTimeout);
                oLongPressTimeout = false;
            }

            if (fShortEventFunction) {
                fShortEventFunction();
                fShortEventFunction = false;
            }

            e.preventDefault();
            return false;
        }

    });

    // add eventListener for keydown
    document.addEventListener('keydown', function(e) {

        if (!bBootComplete) {
            e.preventDefault();
            return false;
        }

        if (bSearchFocused || e.target.id === 'search_field') {
            return false;
        }

        // Handled in keydown event
        if (bButtonIsPressed) {
            e.preventDefault();
            return false;
        }

        //bFirstPlayStatus = 1;

        var k = e.keyCode;

        // Disable default behaviour of arrow buttons
        if (k == 38 || k == 40) {
            e.preventDefault();
        }

        var oActiveElement = document.activeElement;
        var bIsInputField = (oActiveElement && oActiveElement.nodeName === 'INPUT');

        if (bModalOpened) {
            hideModal();
            e.preventDefault();
            return false;
        }

        if (sProtectionInputActive !== false) {
            switch (k) {
                case 38: // UP
                case 40: // DOWN
                case aButtons['ChannelUp']: // PAGE UP
                case aButtons['ChannelDown']: // PAGE UP
                    hideProtectionInput();
                    break;
                case aButtons['BackButton']:
                case 10009: // RETURN
                case 27: // ESC
                case 113: // F2 - backbutton in android
                    hideProtectionInput();
                default:
                    if (!bIsInputField) {
                        getEl('password_confirm_input').focus();
                    }
                    return true;
            }

        }

        if (bMoveChannelFieldActive) {
            switch (k) {
                case 13: // OK button
                case aButtons['BackButton']:
                case 10009: // RETURN
                case 27: // ESC
                case 113: // F2 - backbutton in android
                    //moveChannelPos(0);
                    if (bIsInputField) {
                        oMoveChannelInput.blur();
                    }
                    return false;
                case 38: // UP
                case aButtons['ChannelUp']:
                    moveChannelPos(-1);
                    break;
                case 40: // DOWN
                case aButtons['ChannelDown']:
                    moveChannelPos(1);
                    break;
                default:
                    if (!bIsInputField && oMoveChannelInput) {
                        oMoveChannelInput.focus();
                    }
                    return true;
            }

            e.preventDefault();
            return false;
        }

        if (iContextMenuEditChannel !== false) {

            if (bRenameFieldActive) {
                switch (k) {
                    case 13: // OK button
                    case aButtons['BackButton']:
                    case 10009: // RETURN
                    case 27: // ESC
                    case 113: // F2 - backbutton in android
                        renameChannel();
                        return false;
                    case 38: // UP
                    case 40: // DOWN
                    case aButtons['ChannelUp']:
                    case aButtons['ChannelDown']:
                        renameChannel();
                        break;
                    default:
                        if (!bIsInputField && oRenameItem) {
                            oRenameItem.focus();
                        }
                        return true;
                }
            }

            e.preventDefault();
            switch (k) {
                case 33: // PAGE UP
                case 38: // UP
                    oSelectedItem = moveListUp();
                    break;
                case 34: // PAGE DOWN
                case 40: // DOWN
                    oSelectedItem = moveListDown();
                    break;
                case 13: // OK button
                    selectListItem();
                    break;

                case aButtons['BackButton']:
                case 10009: // RETURN
                case 27: // ESC
                case 113: // F2 - backbutton in android
                    hideContextMenu();
                    break;
                default:
                    if (!bIsInputField && bRenameFieldActive) {
                        oRenameItem.focus();
                    }
                    return true;
            }


            return false;
        }

        if (bFirstPlayStatus === 0 && sDeviceFamily === 'Browser') {
            playVideo();
            return false;
        }


        if (bConfirmBoxOpened) {
            e.preventDefault();

            switch (k) {
                case 37: // LEFT
                case 39: // RIGHT
                    toggleConfirmOptions();
                    break;
                case 13: // OK button (keyboard ENTER)
                    if (bYesConfirmSelected) {
                        closeApp();
                    } else {
                        closeConfirm();
                    }
                    break;

                case aButtons['BackButton']:
                case 10009: // RETURN
                case 27: // ESC
                case 113: // F2 - backbutton in android
                    closeConfirm();
                    break;

            }

            return false;
        }


        if (bStatusOpened) {
            if (iStatusTimeout) {
                clearTimeout(iStatusTimeout);
            }
            hideStatus();
            e.preventDefault();
            return false;
        }


        if ((sSmartControlActive || bProgramBrowserOpened) && smartControlAction(k)) {
            e.preventDefault();
            return;
        }


        // Some global keys
        switch (k) {
            case aButtons['E-Manual']:
                //showGuide();
                showControlsGuide(sDeviceFamily);
                break;
            case aButtons['Info']:
            case aButtons['Guide']:
                showEpgOverview();
                return false;
                break;

            case aButtons['Menu']:
            case aButtons['Tools']:
                openSettings();
                return false;
                break;

            case aButtons['ColorF3Blue']:
                if (sDeviceFamily === 'Samsung') {
                    toggleDebugger();
                }
                break;

            case 10182: // EXIT
                if (sDeviceFamily === 'Samsung') {
                    tizen.application.getCurrentApplication().hide();
                }
                break;

        }


        // Playlist selector (nav)
        if (bPlaylistSelectorOpened) {
            e.preventDefault();

            switch (k) {

                case 33: // PAGE UP
                case 38: // UP
                    oSelectedItem = moveListUp();
                    break;
                case 34: // PAGE DOWN
                case 40: // DOWN
                    oSelectedItem = moveListDown();
                    break;
                case 37: // LEFT
                    hidePlaylistSelector();
                    break;
                case 13: // OK button
                    selectListItem();
                    break;

                case aButtons['BackButton']:
                case 10009: // RETURN
                case 27: // ESC
                case 113: // F2 - backbutton in android
                    hidePlaylistSelector();
                    break;

            }

            return false;

        }

        // Series selector (nav)
        if (bSeriesSelectorOpened) {
            e.preventDefault();

            switch (k) {

                case 33: // PAGE UP
                case 38: // UP
                    oSelectedItem = moveListUp();
                    break;
                case 34: // PAGE DOWN
                case 40: // DOWN
                    oSelectedItem = moveListDown();
                    break;
                case 37: // LEFT
                    //hideSeriesSelector();
                    break;
                case 13: // OK button
                    selectListItem();
                    break;

                case aButtons['BackButton']:
                case 10009: // RETURN
                case 27: // ESC
                case 113: // F2 - backbutton in android
                    hideSeriesSelector();
                    break;

            }

            return false;

        }


        if (false && bProgramBrowserOpened) {
            e.preventDefault();

            switch (k) {
                case aButtons['BackButton']:
                case 10009: // RETURN
                case 27: // ESC
                case 113: // F2 - backbutton in android
                case 69: // E
                    hideChannelProgramBrowser();
                    break;
                case 38: // UP
                    oEpgChannelContent.scrollTop -= 90;
                    break;
                case 40: // DOWN
                    oEpgChannelContent.scrollTop += 90;
                    break;
                case aButtons['ChannelUp']: // PAGE UP
                case 33:
                    oEpgChannelContent.scrollTop = 0;
                    break;
                case aButtons['ChannelDown']: // PAGE DOWN
                case 34:
                    oEpgChannelContent.scrollTop += 1000;
                    break;

                case 13: // OK button
                    hideChannelProgramBrowser();
                    break;
            }

            return false;
        }

        if (bChannellistRight) {
            switch (k) {
                case 37:
                    k = 39;
                    break;
                case 39:
                    k = 37;
                    break;
            }
        }

        // Channel settings opened
        if (bChannelSettingsOpened) {

            if (sChannelSetting) {

                var oSettingSelectBoxes = false;

                // Sub / Dub settings opened
                if (sChannelSetting === 'sub-dub') {
                    oSettingSelectBoxes = document.querySelectorAll('#channel_settings_subs .setting-button');
                } else if (sChannelSetting === 'video') {
                    oSettingSelectBoxes = document.querySelectorAll('#channel_settings_video .setting-button');
                }

                if (oSettingSelectBoxes && oSettingSelectBoxes.length) {
                    switch (k) {
                        case 33: // PAGE UP
                        case 38: // UP
                            iChannelSettingsFocusedField--;
                            if (iChannelSettingsFocusedField < 0) {
                                iChannelSettingsFocusedField = oSettingSelectBoxes.length - 1;
                            }

                            oSettingSelectBoxes[iChannelSettingsFocusedField].focus();
                            e.preventDefault();
                            break;
                        case 34: // PAGE DOWN
                        case 40: // DOWN
                            iChannelSettingsFocusedField++;
                            if (iChannelSettingsFocusedField >= oSettingSelectBoxes.length) {
                                iChannelSettingsFocusedField = 0;
                            }

                            oSettingSelectBoxes[iChannelSettingsFocusedField].focus();
                            e.preventDefault();
                            break;

                        case aButtons['KeyLeft']:
                            hideChannelSettings();
                            e.preventDefault();
                            break;
                        case aButtons['KeyRight']:
                            showChannelSettings();
                            e.preventDefault();
                            break;

                        case 13: // OK button
                            return true;
                            break;

                        case aButtons['BackButton']:
                        case 10009: // RETURN
                        case 27: // ESC
                        case 113: // F2 - backbutton in android
                            hideChannelSettings();
                            break;
                    }

                    return false;

                }

            }

            e.preventDefault();

            switch (k) {

                case 33: // PAGE UP
                case 38: // UP
                    oSelectedItem = moveListUp();
                    break;
                case 34: // PAGE DOWN
                case 40: // DOWN
                    oSelectedItem = moveListDown();
                    break;

                case aButtons['KeyLeft']:
                    hideChannelSettings();
                    break;
                case aButtons['KeyRight']:
                    if (sChannelSetting) {
                        showChannelSettings();
                    } else {
                        hideChannelSettings();
                    }
                    break;

                case 13: // OK button
                    selectListItem();
                    break;

                case aButtons['ColorF2Yellow']:
                    toggleFavourite(iCurrentChannel);
                    break;

                case aButtons['ColorF1Green']:
                    toggleSubtitles();
                    break;

                case aButtons['BackButton']:
                case 10009: // RETURN
                case 27: // ESC
                case 113: // F2 - backbutton in android
                    hideChannelSettings();
                    break;

            }

            return false;

        }


        // Nav opened
        if (bNavOpened) {
            e.preventDefault();

            // Edit mode
            if (bChannelEditModeActive) {

                console.log('bChannelEditModeActive');

                switch (k) {

                    case 37: // LEFT
                    case 39: // RIGHT
                        toggleChannelEditMode(sChannelEditMode == 'move' ? 'delete' : 'move');
                        break;

                    case 33: // PAGE UP
                    case 38: // UP
                        oSelectedItem = moveListUp();
                        break;

                    case 34: // PAGE DOWN
                    case 40: // DOWN
                        oSelectedItem = moveListDown();
                        break;

                    case aButtons['ChannelUp']:
                        oSelectedItem = moveListUp(10);
                        break;

                    case aButtons['ChannelDown']:
                        oSelectedItem = moveListDown(10);
                        break;

                    case 13: // OK button
                        console.log(sChannelEditMode);
                        if (sChannelEditMode == 'delete') {
                            removeChannel(oSelectedItem.dataset.channelnum);
                        } else {

                        }
                        break;

                    case aButtons['BackButton']:
                    case 10009: // RETURN
                    case 27: // ESC
                    case 113: // F2 - backbutton in android
                        toggleChannelEditMode('exit');
                        break;

                }

                return false;

            }


            switch (k) {
                case 48: // 0
                case 49:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57: // 9
                    channelInput(k - 48);
                    hideNav();
                    break;

                case 33: // PAGE UP
                case 38: // UP
                    /*longPressEvent(function() {
                    	oSelectedItem = moveListUp(10);
                    }, function() {
                    	oSelectedItem = moveListUp();
                    }, 450, true);*/

                    oSelectedItem = moveListUp();
                    break;
                case 34: // PAGE DOWN
                case 40: // DOWN
                    /*longPressEvent(function() {
                    	oSelectedItem = moveListDown(10);
                    }, function() {
                    	oSelectedItem = moveListDown();
                    }, 450, true);*/

                    oSelectedItem = moveListDown();
                    break;

                case aButtons['KeyLeft']:
                    if (bGroupsOpened) {
                        showAdvancedNav();
                    } else if (!bAdvancedNavOpened) {
                        showGroups();
                    }
                    break;
                case aButtons['KeyRight']:
                    if (bAdvancedNavOpened) {
                        showGroups();
                    } else if (bGroupsOpened) {
                        hideGroups();
                    } else {
                        hideNav();
                    }
                    break;

                case aButtons['ChannelUp']:
                    // scroll faster
                    if (!bGroupsOpened) {
                        oSelectedItem = moveListUp(10);
                    }
                    break;

                case aButtons['ChannelDown']:
                    // scroll faster
                    if (!bGroupsOpened) {
                        oSelectedItem = moveListDown(10);
                    }
                    break;

                case aButtons['PreviousChannel']:
                    // search previous channel in list

                    break;
                case 13: // OK button
                    /*
                    if( bSearchFocused ) {
                    	oSearchField.blur();
                    	bSearchFocused = false;
                    	return false;
                    }
                    */

                    if (bGroupsOpened || bAdvancedNavOpened) {
                        selectListItem();
                        return false;
                    }

                    longPressEvent(function() {
                        openContextMenu('channellist');
                    }, selectListItem);

                    break;

                case aButtons['ColorF0Red']:
                    focusSearchField();
                    break;

                case aButtons['ColorF2Yellow']:
                    if (!bGroupsOpened) {
                        toggleFavourite('FROMLIST');
                    }
                    break;

                case aButtons['BackButton']:
                case 10009: // RETURN
                case 27: // ESC
                case 113: // F2 - backbutton in android
                    /*
                    if( bSearchFocused ) {
                    	oSearchField.blur();
                    	bSearchFocused = false;
                    	return false;
                    }
                    */
                    hideNav();
            }

            return false;
        }


        // no other layer opened. Channel playing
        switch (k) {

            case aButtons['Search']:
            case aButtons['ColorF0Red']:
                focusSearchField();
                break;

            case aButtons['ColorF2Yellow']:
                toggleFavourite(iCurrentChannel);
                break;

            case aButtons['Caption']:
            case aButtons['Teletext']:
            case aButtons['ColorF1Green']:
            case 85: // U
            case 83: // S
                toggleSubtitles();
                break;

            case 69: // E
                e.preventDefault();
                toggleEpgOverview();
                break;

            case aButtons['BackButton']:
            case 10009: // RETURN
            case 27: // ESC
            case 113: // F2 - backbutton in android

                if (sDeviceFamily === 'Browser' && document.fullscreenElement && document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (bChannelNameOpened) {
                    hideChannelName();
                } else if (bChannelInputOpened) {
                    hideChannelInput();
                } else if (bEpgOverviewOpened) {
                    hideEpgOverview();
                } else if (bChannelSettingsOpened) {
                    hideChannelSettings();
                } else if (bControlsOpened) {
                    hideControls();
                } else if (bUiOpened) {
                    hideUi();
                } else {
                    customConfirmExit(getLang('close-app-hint'));
                }

                break;

            case 48: // 0
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57: // 9
                channelInput(k - 48);
                break;

            case aButtons['PreviousChannel']:
                if (iPreviousChannel) {
                    loadChannel(iPreviousChannel);
                }
                break;

            case aButtons['MediaRewind']:
                jumpBackwards();
                break;
            case aButtons['MediaFastForward']:
                jumpForwards();
                break;

                //case aButtons['MediaPlayPause']:
            case aButtons['MediaPlay']:
                if (sDeviceFamily === 'Samsung' && webapis.avplay.getState() === 'PAUSED') {
                    webapis.avplay.play();
                    return false;
                }

                //playVideo();
                togglePlayState();
                return false;
                //oHlsApi.startLoad();
                break;

            case aButtons['MediaStop']:
                stopVideo();
                showNav();
                break;

            case aButtons['MediaPause']:
                if (sDeviceFamily === 'Samsung' && webapis.avplay.getState() === 'PLAYING') {
                    webapis.avplay.pause();
                    return false;
                }

                break;

            case 10073: // Channel list
            case aButtons['ChannelList']:
                toggleNav();
                break;

            case 38: // UP
            case 33: // Page UP / Channel UP
            case aButtons['ChannelUp']:
                bSwitchUpDown ? channelDown() : channelUp();
                break;

            case 40: // DOWN
            case 34: // Page DOWN / Channel DOWN
            case aButtons['ChannelDown']:
                bSwitchUpDown ? channelUp() : channelDown();
                break;

            case aButtons['PictureSize']:
                //switchVideoFormat('next');
                break;

            case aButtons['MediaTrackPrevious']:
                jumpStart();
                break;
            case aButtons['MediaTrackNext']:
                jumpEnd();
                break;

            case aButtons['KeyRight']:
                showChannelSettings();
                break;
            case aButtons['KeyLeft']:
                showNav();
                break;

            case 13: // OK button

                if (iChannelInputNumber) {
                    clearTimeout(iChannelInputTimer);
                    iChannelInputNumber = parseInt(iChannelInputNumber) - 1;
                    loadChannel(iChannelInputNumber);
                    iChannelInputNumber = '';
                    //getEl('channel_input').style.display = 'none';
                    hideChannelInput();
                    return false;
                }

                if (bSmartControlsEnabled) {
                    showSmartControls('player');
                    return;
                }

                if (bChannelNameOpened && bChannelHasEpg) {
                    showTopEpg('browser');
                    //showEpgOverview();
                    return false;
                }

                showChannelName(true);
                //longPressEvent(showEpgOverview, showChannelName);

                break;

            case 73: // i
                showControlsGuide(sDeviceFamily);
                break;

            case 109: // - (Numpad)
            case 189: // -
                changeVolume('-', true);
                break;

            case 107: // + (Numpad)
            case 187: // +
                changeVolume('+', true);
                break;

            default:
                //showModal('Key code : ' + k);
                //console.log('no action for key:' + k);
                return true;
                break;
        }
    });

    initTouchControls();
    initMouseControls();

    switch (sDeviceFamily) {
        case 'Browser':
        case 'LG':
            break;
        case 'Android':
            initAndroidControls();
            break;
    }

    initVirtualKeyboard();

}