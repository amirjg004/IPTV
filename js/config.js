/**
 * App name: Duplecast
 * App version: 1.0.0
 * Author: Duplecast, DEV
 * Build: 18-09-2025 05:27
 **/
CONFIG = {
    ads: !1,
    locale: "EN",
    versionSDK: "2.8.25",
    version: "5.0.2",
    m3u_parser: "http://data.duplecast.com/m3u/get/",
    demo_server: "http://duplecast.com/plugin/duplecast/demo/index/",
    server_demo: "http://duplecast.com/plugin/duplecast/demo/index/",
    offline: 10,
    server_license: "aHV2cz4vMGZkeGEvZnh0bGZlZHd0L2VycS90Z3V6aWRndjNjaWdmby8=",
    licence_renew_notification_days: 10,
    rows_update: "true",
    live_icon: "http://files.duplecast.com/images/notFoundlive.png",
    radio_icon: "http://files.duplecast.com/images/notFoundlive.png",
    vod_icon: "http://files.duplecast.com/images/notFound.jpg",
    picture_default: "http://files.duplecast.com/images/9gag.jpeg",
    video_default: "http://files.duplecast.com/images/maxresdefault.jpg",
    tiktok_default: "http://files.duplecast.com/images/tiktok.jpeg",
    _9gag_default: "http://files.duplecast.com/images/9gag.jpeg",
    intro: "http://files.duplecast.com/images/intro_logo.png",
    wizard_bg: "http://files.duplecast.com/images/wizard/background_pic.png",
    account_bg: "http://files.duplecast.com/images/account_background.png",
    loading_img: "http://files.duplecast.com/images/loading.svg",
    avatar_icon: "http://files.duplecast.com/images/avatar_actor.jpg",
    provider_path: "http://duplecast.com/plugin/duplecast/service_images/",
    tv_empty: "http://files.duplecast.com/images/tv_empty.png",
    kidsKeys: ["kids", "enfant", "أطفال", "bambin", "çocuklar", "çocuk", "crianças", "kind", "niños", "Дети", "ребятишки", "kinder", "klinci", "copii", "çocuklar", "crianças", "bambini", "kinderen"],
    adultsKeys: ["xxx", "adult", "porn", "sex"],
    tmdb_api: "d41cf499074746f584696d41f187e410",
    tmdb_img: "https://image.tmdb.org/t/p/w300",
    developer: {
        debug: !1,
        active: !1,
        console: null
    },
    player: {
        muted: !1,
        buffering: {
            preset: "auto",
            presets: {
                auto: {
                    name: "Auto Buffering",
                    description: "Automatically adjusts based on network and content",
                    initialBufferSize: 5,
                    resumeBufferSize: 15,
                    maxBufferSize: 30,
                    minBufferSize: 2,
                    smoothPlaybackThreshold: 8,
                    adaptiveBuffering: !0,
                    preload: "auto",
                    bufferTimeout: 1e4,
                    showBufferingIndicator: !0,
                    progressUpdateInterval: 250,
                    smartBuffering: !0,
                    contentTypeSettings: {
                        live: {
                            initialBufferSize: 3,
                            resumeBufferSize: 8,
                            maxBufferSize: 15
                        },
                        vod: {
                            initialBufferSize: 8,
                            resumeBufferSize: 20,
                            maxBufferSize: 45
                        },
                        hls: {
                            initialBufferSize: 6,
                            resumeBufferSize: 12,
                            maxBufferSize: 25
                        }
                    }
                },
                low: {
                    name: "Low Network Connection",
                    description: "Optimized for slow internet (2-5 Mbps)",
                    initialBufferSize: 10,
                    resumeBufferSize: 25,
                    maxBufferSize: 60,
                    minBufferSize: 5,
                    smoothPlaybackThreshold: 15,
                    adaptiveBuffering: !1,
                    preload: "metadata",
                    bufferTimeout: 2e4,
                    showBufferingIndicator: !0,
                    progressUpdateInterval: 500,
                    smartBuffering: !1,
                    contentTypeSettings: {
                        live: {
                            initialBufferSize: 8,
                            resumeBufferSize: 15,
                            maxBufferSize: 25
                        },
                        vod: {
                            initialBufferSize: 15,
                            resumeBufferSize: 30,
                            maxBufferSize: 90
                        },
                        hls: {
                            initialBufferSize: 12,
                            resumeBufferSize: 20,
                            maxBufferSize: 45
                        }
                    }
                },
                standard: {
                    name: "Standard",
                    description: "Balanced for medium internet (5-15 Mbps)",
                    initialBufferSize: 5,
                    resumeBufferSize: 15,
                    maxBufferSize: 30,
                    minBufferSize: 2,
                    smoothPlaybackThreshold: 8,
                    adaptiveBuffering: !1,
                    preload: "auto",
                    bufferTimeout: 1e4,
                    showBufferingIndicator: !0,
                    progressUpdateInterval: 250,
                    smartBuffering: !1,
                    contentTypeSettings: {
                        live: {
                            initialBufferSize: 3,
                            resumeBufferSize: 8,
                            maxBufferSize: 15
                        },
                        vod: {
                            initialBufferSize: 8,
                            resumeBufferSize: 20,
                            maxBufferSize: 45
                        },
                        hls: {
                            initialBufferSize: 6,
                            resumeBufferSize: 12,
                            maxBufferSize: 25
                        }
                    }
                },
                high: {
                    name: "High Network Connection",
                    description: "Optimized for fast internet (15+ Mbps)",
                    initialBufferSize: 3,
                    resumeBufferSize: 8,
                    maxBufferSize: 20,
                    minBufferSize: 1,
                    smoothPlaybackThreshold: 5,
                    adaptiveBuffering: !1,
                    preload: "auto",
                    bufferTimeout: 5e3,
                    showBufferingIndicator: !1,
                    progressUpdateInterval: 100,
                    smartBuffering: !1,
                    contentTypeSettings: {
                        live: {
                            initialBufferSize: 2,
                            resumeBufferSize: 5,
                            maxBufferSize: 10
                        },
                        vod: {
                            initialBufferSize: 5,
                            resumeBufferSize: 12,
                            maxBufferSize: 30
                        },
                        hls: {
                            initialBufferSize: 4,
                            resumeBufferSize: 8,
                            maxBufferSize: 20
                        }
                    }
                }
            },
            initialBufferSize: 5,
            resumeBufferSize: 15,
            maxBufferSize: 30,
            minBufferSize: 2,
            smoothPlaybackThreshold: 8,
            adaptiveBuffering: !0,
            preload: "auto",
            bufferTimeout: 1e4,
            showBufferingIndicator: !0,
            progressUpdateInterval: 250,
            smartBuffering: !0,
            contentTypeSettings: {
                live: {
                    initialBufferSize: 3,
                    resumeBufferSize: 8,
                    maxBufferSize: 15
                },
                vod: {
                    initialBufferSize: 8,
                    resumeBufferSize: 20,
                    maxBufferSize: 45
                },
                hls: {
                    initialBufferSize: 6,
                    resumeBufferSize: 12,
                    maxBufferSize: 25
                }
            }
        },
        quality: {
            preset: "auto",
            presets: {
                auto: {
                    name: "Auto Quality",
                    description: "Automatically adjusts quality based on network and performance",
                    autoQuality: !0,
                    aggressiveUpgrade: !1,
                    conservativeDowngrade: !0,
                    minQuality: "sd",
                    maxQuality: "ultra4k",
                    switchThresholds: {
                        bufferUnderrun: .3,
                        networkDegradation: .5,
                        performanceDrop: .4,
                        stabilityThreshold: .7
                    },
                    switchDelays: {
                        upgradeDelay: 1e4,
                        downgradeDelay: 3e3,
                        stabilityPeriod: 3e4
                    }
                },
                low: {
                    name: "Low Network Optimized",
                    description: "Optimized for slow internet connections",
                    autoQuality: !0,
                    aggressiveUpgrade: !1,
                    conservativeDowngrade: !0,
                    minQuality: "sd",
                    maxQuality: "hd",
                    switchThresholds: {
                        bufferUnderrun: .2,
                        networkDegradation: .3,
                        performanceDrop: .3,
                        stabilityThreshold: .8
                    },
                    switchDelays: {
                        upgradeDelay: 15e3,
                        downgradeDelay: 2e3,
                        stabilityPeriod: 45e3
                    }
                },
                standard: {
                    name: "Standard Quality",
                    description: "Balanced quality management for most connections",
                    autoQuality: !0,
                    aggressiveUpgrade: !1,
                    conservativeDowngrade: !0,
                    minQuality: "sd",
                    maxQuality: "fullhd",
                    switchThresholds: {
                        bufferUnderrun: .3,
                        networkDegradation: .5,
                        performanceDrop: .4,
                        stabilityThreshold: .7
                    },
                    switchDelays: {
                        upgradeDelay: 1e4,
                        downgradeDelay: 3e3,
                        stabilityPeriod: 3e4
                    }
                },
                high: {
                    name: "High Quality",
                    description: "Optimized for fast internet connections",
                    autoQuality: !0,
                    aggressiveUpgrade: !0,
                    conservativeDowngrade: !1,
                    minQuality: "hd",
                    maxQuality: "ultra4k",
                    switchThresholds: {
                        bufferUnderrun: .4,
                        networkDegradation: .6,
                        performanceDrop: .5,
                        stabilityThreshold: .6
                    },
                    switchDelays: {
                        upgradeDelay: 5e3,
                        downgradeDelay: 5e3,
                        stabilityPeriod: 2e4
                    }
                }
            },
            autoQuality: !0,
            aggressiveUpgrade: !1,
            conservativeDowngrade: !0,
            minQuality: "sd",
            maxQuality: "ultra4k",
            switchThresholds: {
                bufferUnderrun: .3,
                networkDegradation: .5,
                performanceDrop: .4,
                stabilityThreshold: .7
            },
            switchDelays: {
                upgradeDelay: 1e4,
                downgradeDelay: 3e3,
                stabilityPeriod: 3e4
            },
            networkQualityMap: {
                poor: {
                    maxQuality: "sd",
                    recommendedQuality: "sd"
                },
                fair: {
                    maxQuality: "hd",
                    recommendedQuality: "hd"
                },
                good: {
                    maxQuality: "fullhd",
                    recommendedQuality: "hd"
                },
                excellent: {
                    maxQuality: "ultra4k",
                    recommendedQuality: "fullhd"
                }
            },
            bufferHealthMap: {
                critical: {
                    action: "downgrade",
                    targetQuality: "sd"
                },
                poor: {
                    action: "downgrade",
                    targetQuality: "hd"
                },
                fair: {
                    action: "maintain",
                    targetQuality: "current"
                },
                good: {
                    action: "upgrade",
                    targetQuality: "next"
                },
                excellent: {
                    action: "upgrade",
                    targetQuality: "max"
                }
            }
        }
    },
    ajax: {
        timeout: 12e4,
        cache: !0
    },
    keyboard: {
        oneLayout: !1
    },
    GA: {
        account: "G-J56VTVWR27",
        app_name: "Duplecast App",
        ssl: !1,
        timeout: 6e3
    },
    defaults: {
        locale: "EN",
        sort: "default",
        sort_live: "default",
        sort_vod: "default",
        sort_serie: "default",
        sort_timeshift: "default",
        sort_radio: "default",
        aspect_ratio: "fullscreen",
        default_themes: "dark",
        time: "0",
        epg_time: "0",
        duplecast: "disable",
        epg: "enable",
        videos_locked: "enable",
        pictures_locked: "enable",
        default_background: "none",
        parental_lock: "disable",
        default_audio: "0",
        default_subtitle: "off",
        adults_protection: "enable",
        parser_type: "local",
        subtitle_transparency: "0",
        subtitle_size: "standard",
        subtitle_color: "white",
        subtitle_background: "black",
        subtitle_position: "bottom",
        force_tmdb: "enable",
        force_https: "enable",
        force_subtitles: "enable",
        duplecast_section_show: "enable",
        live_section_show: "enable",
        vod_section_show: "enable",
        serie_section_show: "enable",
        timeshift_section_show: "enable",
        radio_section_show: "enable",
        pictures_section_show: "enable",
        default_live_format: ".ts",
        epg_source: "provider",
        keyboard_language: "EN",
        quality_setting: "original",
        buffering_preset: "standard",
        seek_time: "30"
    },
    accountBtns: [{
        data_name: "reload",
        icon: "fas fa-sync-alt",
        name: "account_btn_Reload"
    }, {
        data_name: "sort",
        icon: "fas fa-align-left",
        name: "settings_setup_sort_default",
        class: "sort"
    }, {
        data_name: "support",
        icon: "fas fa-question-circle",
        name: "account_btn_Support"
    }, {
        data_name: "settings",
        icon: "fas fa-cog",
        name: "account_btn_Setting"
    }, {
        data_name: "add_account",
        icon: "fas fa-plus",
        name: "account_btn_add_account"
    }, {
        data_name: "exit",
        icon: "fas fa-sign-out-alt",
        name: "account_btn_Exit"
    }],
    mainMenu: [{
        id: "duplecast",
        image: "http://files.duplecast.com/images/icons/home.svg",
        name: "sidebar_my_Duplicast"
    }, {
        id: "live",
        image: "http://files.duplecast.com/images/icons/live.svg",
        name: "sidebar_Live_Channels"
    }, {
        id: "vod",
        image: "http://files.duplecast.com/images/icons/vod.svg",
        name: "sidebar_Movies"
    }, {
        id: "serie",
        image: "http://files.duplecast.com/images/icons/serie.svg",
        name: "sidebar_Series"
    }, {
        id: "timeshift",
        image: "http://files.duplecast.com/images/icons/timeshift.svg",
        name: "sidebar_Timeshift"
    }, {
        id: "radio",
        image: "http://files.duplecast.com/images/icons/radio.svg",
        name: "sidebar_Radio"
    }],
    options: [{
        id: "settings",
        image: "http://files.duplecast.com/images/icons/settings.svg",
        name: "sidebar_Setting"
    }, {
        id: "playlists",
        image: "http://files.duplecast.com/images/icons/playlist.svg",
        name: "sidebar_Playlists"
    }, {
        id: "exit",
        image: "http://files.duplecast.com/images/icons/exit.svg",
        name: "sidebar_Exit",
        class: "exit"
    }],
    categorieBtns: [{
        id: "gear",
        icon: "fas fa-bars",
        class: "btn gears"
    }, {
        id: "prev_page",
        icon: "fas fa-chevron-left",
        class: "btn prev_page"
    }, {
        id: "next_page",
        icon: "fas fa-chevron-right",
        class: "btn next_page"
    }, {
        id: "sort",
        icon: "fas fa-sort-alpha-up",
        name: "categories_btn_sort",
        class: "btn sort"
    }, {
        id: "refresh",
        icon: "fas fa-sync-alt",
        class: "btn refresh"
    }],
    channelsBtns: [{
        id: "gear",
        icon: "fas fa-bars",
        class: "btn gears"
    }, {
        id: "prev_page",
        icon: "fas fa-chevron-left",
        class: "btn prev_page"
    }, {
        id: "next_page",
        icon: "fas fa-chevron-right",
        class: "btn next_page"
    }, {
        id: "unlock",
        icon: "fas fa-lock",
        class: "btn lock unlock-button"
    }, {
        id: "lock",
        icon: "fas fa-lock-open",
        class: "btn lock lock-button"
    }, {
        id: "search",
        icon: "fas fa-search",
        class: "btn search-button"
    }, {
        id: "categories",
        icon: "fas fa-list-ul",
        class: "btn group-button"
    }, {
        id: "sort",
        icon: "fas fa-sort-alpha-up",
        name: "categories_btn_sort",
        class: "btn sort"
    }, {
        id: "pin",
        icon: "fas fa-thumbtack",
        class: "btn pin-button"
    }, {
        id: "refresh",
        icon: "fas fa-sync-alt",
        class: "btn refresh"
    }],
    matchesBtns: [{
        id: "prev_page",
        icon: "fas fa-chevron-left",
        class: "btn prev_page"
    }, {
        id: "next_page",
        icon: "fas fa-chevron-right",
        class: "btn next_page"
    }, {
        id: "search",
        icon: "fas fa-search",
        class: "btn search-button"
    }, {
        id: "sort",
        icon: "fas fa-sort-alpha-up",
        name: "categories_btn_sort",
        class: "btn sort"
    }, {
        id: "refresh",
        icon: "fas fa-sync-alt",
        class: "btn refresh"
    }, {
        id: "return",
        icon: "fas fa-undo-alt",
        class: "btn return"
    }],
    paginationBtns: [{
        id: "first_page",
        icon: "fas fa-step-backward",
        name: "movies_btn_first_page",
        class: "btn first_page"
    }, {
        id: "prev_page",
        icon: "fas fa-chevron-left",
        name: "movies_btn_prev_page",
        class: "btn prev_page"
    }, {
        id: "next_page",
        icon: "fas fa-chevron-right",
        name: "movies_btn_next_page",
        class: "btn next_page"
    }, {
        id: "last_page",
        icon: "fas fa-step-forward",
        name: "movies_btn_last_page",
        class: "btn last_page"
    }],
    wallpapersBtns: [{
        id: "add_background",
        icon: "fas fa-plus",
        name: "settings_add_background",
        class: "btn add"
    }, {
        id: "first_page",
        icon: "fas fa-step-backward",
        label: "movies_btn_first_page",
        class: "btn first_page"
    }, {
        id: "prev_page",
        icon: "fas fa-chevron-left",
        label: "movies_btn_prev_page",
        class: "btn prev_page"
    }, {
        id: "next_page",
        icon: "fas fa-chevron-right",
        label: "movies_btn_next_page",
        class: "btn next_page"
    }, {
        id: "last_page",
        icon: "fas fa-step-forward",
        label: "movies_btn_last_page",
        class: "btn last_page"
    }, {
        id: "return",
        icon: "fas fa-undo-alt",
        label: "Return",
        class: "btn return"
    }],
    moviesBtns: [{
        id: "first_page",
        icon: "fas fa-step-backward",
        label: "movies_btn_first_page",
        class: "btn first_page"
    }, {
        id: "prev_page",
        icon: "fas fa-chevron-left",
        label: "movies_btn_prev_page",
        class: "btn prev_page"
    }, {
        id: "next_page",
        icon: "fas fa-chevron-right",
        label: "movies_btn_next_page",
        class: "btn next_page"
    }, {
        id: "last_page",
        icon: "fas fa-step-forward",
        label: "movies_btn_last_page",
        class: "btn last_page"
    }, {
        id: "sort",
        icon: "fas fa-sort-alpha-up",
        name: "categories_btn_sort",
        label: "categories_btn_sort",
        class: "btn sort"
    }, {
        id: "search",
        icon: "fas fa-search",
        label: "channels_btn_search",
        class: "btn search-button"
    }, {
        id: "reload",
        icon: "fas fa-sync-alt",
        label: "channels_btn_Refresh",
        class: "btn refresh"
    }, {
        id: "unlock",
        icon: "fas fa-lock",
        label: "channels_btn_unlock",
        class: "btn lock unlock-button"
    }, {
        id: "lock",
        icon: "fas fa-lock-open",
        label: "channels_btn_lock",
        class: "btn lock lock-button"
    }, {
        id: "pin",
        icon: "fas fa-thumbtack",
        class: "btn pin-button"
    }, {
        id: "return",
        icon: "fas fa-undo-alt",
        label: "Return",
        class: "btn return"
    }],
    movieInfoBtns: [{
        id: "play",
        icon: "fas fa-play",
        name: "movieInfo_btn_Watch_Now",
        class: "play"
    }, {
        id: "favoris",
        icon: "far fa-heart",
        name: "movieInfo_btn_My_list",
        class: "favorite_button"
    }, {
        id: "unlock",
        icon: "fas fa-lock",
        name: "channels_btn_unlock",
        class: "btn lock unlock-button"
    }, {
        id: "lock",
        icon: "fas fa-lock-open",
        name: "channels_btn_lock",
        class: "btn lock lock-button"
    }, {
        id: "return",
        icon: "fas fa-undo-alt",
        name: "Return",
        class: "btn return"
    }],
    serieInfoBtns: [{
        id: "play",
        icon: "fas fa-play",
        name: "movieInfo_btn_Watch_Now",
        class: "play"
    }, {
        id: "episodes",
        icon: "fas fa-layer-group",
        name: "serieInfo_label_season"
    }, {
        id: "favoris",
        icon: "far fa-heart",
        name: "movieInfo_btn_My_list",
        class: "favorite_button"
    }, {
        id: "unlock",
        icon: "fas fa-lock",
        name: "channels_btn_unlock",
        class: "btn lock unlock-button"
    }, {
        id: "lock",
        icon: "fas fa-lock-open",
        name: "channels_btn_lock",
        class: "btn lock lock-button"
    }, {
        id: "return",
        icon: "fas fa-undo-alt",
        name: "Return",
        class: "btn return"
    }],
    tmdbInfoBtns: [{
        id: "search",
        icon: "fas fa-search",
        name: "search_in_list",
        class: "search_in_list"
    }, {
        id: "return",
        icon: "fas fa-undo-alt",
        name: "Return",
        class: "btn return"
    }],
    playerBtns: [{
        id: "stop",
        icon: "fas fa-undo-alt",
        class: "vod timeshift serie live"
    }, {
        id: "hide",
        icon: "fas fa-times",
        class: "vod timeshift serie live stream-close"
    }, {
        id: "reload",
        icon: "fas fa-step-backward",
        class: "vod timeshift serie"
    }, {
        id: "reload",
        icon: "fas fa-sync-alt",
        class: "live"
    }, {
        id: "recall",
        icon: "fas",
        name_in_icon: "PRE-CH",
        class: "live i-bg"
    }, {
        id: "pause",
        icon: "fas fa-pause",
        class: "vod timeshift serie stream-pause"
    }, {
        id: "next",
        icon: "fas fa-share",
        class: "serie next"
    }, {
        id: "list",
        icon: "fas fa-layer-group",
        class: "serie"
    }, {
        id: "epg",
        icon: "fas",
        name_in_icon: "EPG",
        class: "live i-bg epg ml-extra"
    }, {
        id: "favoris",
        icon: "far fa-heart",
        class: "live"
    }, {
        id: "aspect",
        icon: "fas fa-expand",
        class: "vod timeshift serie live"
    }, {
        id: "audio",
        icon: "fas fa-audio-description",
        class: "live vod timeshift serie ad"
    }, {
        id: "subtitle",
        icon: "fas fa-closed-captioning",
        class: "live vod timeshift serie cc"
    }, {
        id: "options",
        icon: "fas fa-cog",
        class: "vod serie live"
    }],
    playerOptions: [{
        name: "Seek_Time",
        id: "seek_time",
        class: "seek_time"
    }, {
        id: "buffering_options",
        name: "buffering_options_label_Buffering_Options"
    }, {
        id: "quality_options",
        name: "quality_options_label_Quality_Options"
    }, {
        id: "subtitle_size",
        name: "subtitle_size_label_Subtitle_Size"
    }, {
        id: "subtitle_transparency",
        name: "subtitle_opacity_label_Subtitle_Opacity"
    }, {
        id: "subtitle_position",
        name: "subtitle_position_label_Subtitle_Position"
    }],
    playerInfo: [{
        icon: "fas fa-star rate"
    }, {
        icon: "fas fa-calendar-alt year"
    }, {
        icon: "far fa-clock duration"
    }],
    playerControlsInfo: [{
        name: "channels_btn_lock",
        class: "time"
    }, {
        class: "stream-quality"
    }],
    generalSettings: [{
        name: "settings_label_App_Settings",
        id: "general",
        type: "menu",
        icon: "fas fa-cogs",
        options: [{
            name: "settings_label_Languages",
            id: "lang",
            storage: "locale",
            type: "radio",
            prefix: "lang_",
            icon: "fas fa-language",
            options: [{
                id: "EN",
                name: "language_label_English"
            }, {
                id: "FR",
                name: "language_label_Frensh"
            }, {
                id: "ES",
                name: "language_label_spanish"
            }, {
                id: "DE",
                name: "language_label_german"
            }, {
                id: "IT",
                name: "language_label_italian"
            }, {
                id: "PT",
                name: "language_label_portuguese"
            }, {
                id: "RU",
                name: "language_label_russian"
            }, {
                id: "BS",
                name: "language_label_bosnian"
            }, {
                id: "AR",
                name: "language_label_arabic"
            }, {
                id: "TR",
                name: "language_label_turkish"
            }, {
                id: "RO",
                name: "language_label_romanian"
            }]
        }, {
            name: "settings_label_keyboard_Languages",
            id: "lang",
            storage: "keyboard_language",
            type: "radio",
            prefix: "lang_",
            icon: "fas fa-keyboard",
            options: [{
                id: "EN",
                name: "language_label_English"
            }, {
                id: "FR",
                name: "language_label_Frensh"
            }, {
                id: "ES",
                name: "language_label_spanish"
            }, {
                id: "DE",
                name: "language_label_german"
            }, {
                id: "IT",
                name: "language_label_italian"
            }, {
                id: "PT",
                name: "language_label_portuguese"
            }, {
                id: "RU",
                name: "language_label_russian"
            }, {
                id: "BS",
                name: "language_label_bosnian"
            }, {
                id: "AR",
                name: "language_label_arabic"
            }, {
                id: "TR",
                name: "language_label_turkish"
            }, {
                id: "RO",
                name: "language_label_romanian"
            }]
        }, {
            name: "settings_label_Time_Zone",
            id: "timeZone",
            storage: "time",
            prefix: "UTC ",
            type: "radio",
            icon: "fas fa-clock",
            options: [{
                option: "UTC -12:00 ",
                id: "-12"
            }, {
                option: "UTC -11:00 ",
                id: "-11"
            }, {
                option: "UTC -10:00 ",
                id: "-10"
            }, {
                option: "UTC -09:00 ",
                id: "-9"
            }, {
                option: "UTC -08:00 ",
                id: "-8"
            }, {
                option: "UTC -07:00 ",
                id: "-7"
            }, {
                option: "UTC -06:00 ",
                id: "-6"
            }, {
                option: "UTC -05:00 ",
                id: "-5"
            }, {
                option: "UTC -04:00 ",
                id: "-4"
            }, {
                option: "UTC -03:00 ",
                id: "-3"
            }, {
                option: "UTC -02:00 ",
                id: "-2"
            }, {
                option: "UTC -01:00 ",
                id: "-1"
            }, {
                option: "UTC +00:00 ",
                id: "0"
            }, {
                option: "UTC +01:00 ",
                id: "1"
            }, {
                option: "UTC +02:00 ",
                id: "2"
            }, {
                option: "UTC +03:00 ",
                id: "3"
            }, {
                option: "UTC +04:00 ",
                id: "4"
            }, {
                option: "UTC +05:00 ",
                id: "5"
            }, {
                option: "UTC +06:00 ",
                id: "6"
            }, {
                option: "UTC +07:00 ",
                id: "7"
            }, {
                option: "UTC +08:00 ",
                id: "8"
            }, {
                option: "UTC +09:00 ",
                id: "9"
            }, {
                option: "UTC +10:00 ",
                id: "10"
            }, {
                option: "UTC +11:00 ",
                id: "11"
            }, {
                option: "UTC +12:00 ",
                id: "12"
            }]
        }, {
            name: "settings_label_EPG",
            id: "epg",
            storage: "epg",
            type: "radio",
            icon: "fas fa-calendar-alt",
            prefix: "settings_label_",
            options: [{
                id: "disable",
                name: "epg_label_Disable"
            }, {
                id: "enable",
                name: "epg_label_Enable"
            }]
        }, {
            name: "settings_label_Themes",
            id: "themes",
            storage: "default_themes",
            type: "radio",
            prefix: "themes_label_",
            capitalize: !0,
            icon: "fas fa-palette",
            options: [{
                id: "blue",
                name: "themes_label_Blue"
            }, {
                id: "purple",
                name: "themes_label_Purple"
            }, {
                id: "green",
                name: "themes_label_Green"
            }, {
                id: "pink",
                name: "themes_label_Pink"
            }, {
                id: "brown",
                name: "themes_label_brown"
            }, {
                id: "dark",
                name: "themes_label_Dark"
            }, {
                id: "summer",
                name: "themes_label_summer"
            }, {
                id: "classic",
                name: "themes_label_classic"
            }, {
                id: "fire",
                name: "themes_label_fire"
            }, {
                id: "royal",
                name: "themes_label_royal"
            }, {
                id: "monochrome",
                name: "themes_label_Monochrome"
            }]
        }, {
            name: "settings_label_Background",
            id: "bg",
            storage: "default_background",
            icon: "fas fa-image"
        }, {
            name: "settings_label_Hide_Show_Section",
            id: "hide_show",
            type: "menu",
            icon: "fas fa-eye",
            options: [{
                name: "settings_Show_my_Duplicast",
                id: "duplecast_section_show",
                storage: "duplecast_section_show",
                type: "radio",
                prefix: "setting_show_section_",
                options: [{
                    id: "enable",
                    name: "settings_section_show"
                }, {
                    id: "disable",
                    name: "settings_section_hide"
                }]
            }, {
                name: "settings_Show_Live_Channels",
                id: "live_section_show",
                storage: "live_section_show",
                type: "radio",
                prefix: "setting_show_section_",
                options: [{
                    id: "enable",
                    name: "settings_section_show"
                }, {
                    id: "disable",
                    name: "settings_section_hide"
                }]
            }, {
                name: "settings_Show_Movies",
                id: "vod_section_show",
                storage: "vod_section_show",
                type: "radio",
                prefix: "setting_show_section_",
                options: [{
                    id: "enable",
                    name: "settings_section_show"
                }, {
                    id: "disable",
                    name: "settings_section_hide"
                }]
            }, {
                name: "settings_Show_Series",
                id: "serie_section_show",
                storage: "serie_section_show",
                type: "radio",
                prefix: "setting_show_section_",
                options: [{
                    id: "enable",
                    name: "settings_section_show"
                }, {
                    id: "disable",
                    name: "settings_section_hide"
                }]
            }, {
                name: "settings_Show_Timeshift",
                id: "timeshift_section_show",
                storage: "timeshift_section_show",
                type: "radio",
                prefix: "setting_show_section_",
                options: [{
                    id: "enable",
                    name: "settings_section_show"
                }, {
                    id: "disable",
                    name: "settings_section_hide"
                }]
            }, {
                name: "settings_Show_Radio",
                id: "radio_section_show",
                storage: "radio_section_show",
                type: "radio",
                prefix: "setting_show_section_",
                options: [{
                    id: "enable",
                    name: "settings_section_show"
                }, {
                    id: "disable",
                    name: "settings_section_hide"
                }]
            }]
        }, {
            name: "settings_label_duplecast",
            id: "duplecast",
            storage: "duplecast",
            type: "radio",
            prefix: "duplecast_label_",
            capitalize: !0,
            icon: "fas fa-home",
            options: [{
                id: "enable",
                name: "duplecast_label_Enable"
            }, {
                id: "disable",
                name: "duplecast_label_Disable"
            }]
        }, {
            name: "settings_label_Sort",
            id: "sort",
            type: "menu",
            icon: "fas fa-sort-alpha-up",
            options: [{
                name: "sidebar_Live_Channels",
                id: "sort_live",
                storage: "sort_live",
                type: "radio",
                prefix: "settings_setup_sort_",
                options: [{
                    name: "settings_setup_sort_default",
                    id: "default"
                }, {
                    name: "settings_setup_sort_newest",
                    id: "newest"
                }, {
                    name: "settings_setup_sort_oldest",
                    id: "oldest"
                }, {
                    name: "settings_setup_sort_atoz",
                    id: "atoz"
                }, {
                    name: "settings_setup_sort_ztoa",
                    id: "ztoa"
                }]
            }, {
                name: "sidebar_Movies",
                id: "sort_vod",
                storage: "sort_vod",
                type: "radio",
                prefix: "settings_setup_sort_",
                options: [{
                    name: "settings_setup_sort_default",
                    id: "default"
                }, {
                    name: "settings_setup_sort_newest",
                    id: "newest"
                }, {
                    name: "settings_setup_sort_oldest",
                    id: "oldest"
                }, {
                    name: "settings_setup_sort_atoz",
                    id: "atoz"
                }, {
                    name: "settings_setup_sort_ztoa",
                    id: "ztoa"
                }]
            }, {
                name: "sidebar_Series",
                id: "sort_serie",
                storage: "sort_serie",
                type: "radio",
                prefix: "settings_setup_sort_",
                options: [{
                    name: "settings_setup_sort_default",
                    id: "default"
                }, {
                    name: "settings_setup_sort_newest",
                    id: "newest"
                }, {
                    name: "settings_setup_sort_oldest",
                    id: "oldest"
                }, {
                    name: "settings_setup_sort_atoz",
                    id: "atoz"
                }, {
                    name: "settings_setup_sort_ztoa",
                    id: "ztoa"
                }]
            }, {
                name: "sidebar_Timeshift",
                id: "sort_timeshift",
                storage: "sort_timeshift",
                type: "radio",
                prefix: "settings_setup_sort_",
                options: [{
                    name: "settings_setup_sort_default",
                    id: "default"
                }, {
                    name: "settings_setup_sort_newest",
                    id: "newest"
                }, {
                    name: "settings_setup_sort_oldest",
                    id: "oldest"
                }, {
                    name: "settings_setup_sort_atoz",
                    id: "atoz"
                }, {
                    name: "settings_setup_sort_ztoa",
                    id: "ztoa"
                }]
            }, {
                name: "sidebar_Radio",
                id: "sort_radio",
                storage: "sort_radio",
                type: "radio",
                prefix: "settings_setup_sort_",
                options: [{
                    name: "settings_setup_sort_default",
                    id: "default"
                }, {
                    name: "settings_setup_sort_newest",
                    id: "newest"
                }, {
                    name: "settings_setup_sort_oldest",
                    id: "oldest"
                }, {
                    name: "settings_setup_sort_atoz",
                    id: "atoz"
                }, {
                    name: "settings_setup_sort_ztoa",
                    id: "ztoa"
                }]
            }]
        }, {
            name: "settings_label_Parental_Lock",
            id: "lock",
            storage: "parental_lock",
            type: "radio",
            icon: "fas fa-lock",
            prefix: "settings_label_",
            options: [{
                id: "disable",
                name: "epg_label_Disable"
            }, {
                id: "enable",
                name: "epg_label_Enable"
            }]
        }, {
            name: "settings_label_adults_protection",
            id: "adultsProtection",
            storage: "adults_protection",
            type: "radio",
            icon: "fas fa-user-shield",
            prefix: "settings_label_",
            options: [{
                id: "enable",
                name: "epg_label_Enable"
            }, {
                id: "disable",
                name: "epg_label_Disable"
            }]
        }, {
            id: "resetApp",
            name: "reset_application",
            icon: "fas fa-redo"
        }]
    }, {
        name: "settings_label_Player",
        id: "player",
        type: "menu",
        icon: "fas fa-play",
        options: [{
            name: "settings_label_Audio",
            id: "audio",
            storage: "default_audio",
            type: "radio",
            prefix: "settings_audio_",
            icon: "fas fa-volume-off",
            options: [{
                id: "0",
                name: "language_label_OriginAudio"
            }, {
                id: "English",
                name: "language_label_English"
            }, {
                id: "Francais",
                name: "language_label_Frensh"
            }, {
                id: "Espanol",
                name: "language_label_spanish"
            }, {
                id: "German",
                name: "language_label_german"
            }, {
                id: "Italian",
                name: "language_label_italian"
            }, {
                id: "Portuguese",
                name: "language_label_portuguese"
            }, {
                id: "Arabic",
                name: "language_label_arabic"
            }, {
                id: "Turkish",
                name: "language_label_turkish"
            }, {
                id: "Romanian",
                name: "language_label_romanian"
            }]
        }, {
            name: "settings_label_Aspect",
            id: "aspect",
            storage: "aspect_ratio",
            type: "radio",
            prefix: "aspect_label_",
            icon: "fas fa-arrows-alt",
            options: [{
                id: "original",
                name: "aspect_label_original",
                class: "aspect",
                aspect: "original"
            }, {
                id: "fullscreen",
                name: "aspect_label_Fullscreen",
                class: "aspect",
                aspect: "fullscreen"
            }, {
                id: "16_9",
                option: "16/9",
                class: "aspect",
                aspect: "16_9"
            }, {
                id: "21_9",
                option: "21/9",
                class: "aspect",
                aspect: "21_9"
            }, {
                id: "4_3",
                option: "4/3",
                class: "aspect",
                aspect: "4_3"
            }]
        }, {
            name: "settings_label_Subtitle_Size",
            id: "subSize",
            storage: "subtitle_size",
            type: "radio",
            prefix: "subtitle_label_",
            icon: "fas fa-text-height",
            options: [{
                id: "tiny",
                name: "subtitle_label_tiny"
            }, {
                id: "small",
                name: "subtitle_label_small"
            }, {
                id: "standard",
                name: "subtitle_label_standard"
            }, {
                id: "large",
                name: "subtitle_label_large"
            }, {
                id: "huge",
                name: "subtitle_label_huge"
            }]
        }, {
            name: "settings_label_Subtitle_Opacity",
            id: "subOpacity",
            storage: "subtitle_transparency",
            type: "radio",
            prefix: "opacity_",
            icon: "fas fa-adjust",
            options: [{
                id: "0",
                name: "opacity_0"
            }, {
                id: "25",
                name: "opacity_25"
            }, {
                id: "50",
                name: "opacity_50"
            }, {
                id: "75",
                name: "opacity_75"
            }, {
                id: "100",
                name: "opacity_100"
            }]
        }, {
            name: "subtitle_position_label_Subtitle_Position",
            id: "subtitle_position",
            storage: "subtitle_position",
            type: "radio",
            prefix: "subtitle_label_",
            icon: "far  fa-window-maximize",
            options: [{
                id: "top",
                name: "subtitle_label_top"
            }, {
                id: "bottom",
                name: "subtitle_label_bottom"
            }]
        }, {
            name: "settings_label_Adaptive_Quality",
            id: "adaptive_quality",
            type: "radio",
            storage: "quality_setting",
            icon: "fas fa-video",
            options: [{
                id: "auto",
                name: "quality_auto_label_Auto_Recommended"
            }, {
                id: "original",
                name: "quality_original_label_Original_Quality"
            }, {
                id: "sd",
                name: "quality_sd_label_SD_480p"
            }, {
                id: "hd",
                name: "quality_hd_label_HD_720p"
            }, {
                id: "fullhd",
                name: "quality_fullhd_label_Full_HD_1080p"
            }, {
                id: "ultra4k",
                name: "quality_4k_label_Ultra_4K"
            }]
        }, {
            name: "settings_label_Adaptive_Buffering",
            id: "buffering",
            type: "radio",
            storage: "buffering_preset",
            icon: "fas fa-tachometer-alt",
            options: [{
                id: "auto",
                name: "quality_auto_label_Auto_Recommended"
            }, {
                id: "low",
                name: "settings_label_Low_Network_Connection"
            }, {
                id: "standard",
                name: "settings_label_Standard"
            }, {
                id: "high",
                name: "settings_label_High_Network_Connection"
            }]
        }, {
            name: "Seek_Time",
            id: "seek_time",
            type: "radio",
            storage: "seek_time",
            icon: "fas fa-forward",
            options: [{
                id: "5",
                name: "settings_label_5_Seconds"
            }, {
                id: "10",
                name: "settings_label_10_Seconds"
            }, {
                id: "15",
                name: "settings_label_15_Seconds"
            }, {
                id: "20",
                name: "settings_label_20_Seconds"
            }, {
                id: "30",
                name: "settings_label_30_Seconds"
            }, {
                id: "60",
                name: "settings_label_60_Seconds"
            }]
        }]
    }, {
        name: "settings_label_Playlist_Settings",
        id: "playlist",
        type: "menu",
        icon: "fas fa-list",
        options: [{
            name: "settings_label_playlist_processor",
            id: "playlistProcessor",
            storage: "parser_type",
            type: "radio",
            prefix: "playlist_processor_label_",
            icon: "fas fa-download",
            options: [{
                id: "remote",
                name: "playlist_processor_label_remote"
            }, {
                id: "local",
                name: "playlist_processor_label_local"
            }]
        }]
    }, {
        name: "settings_label_Support",
        id: "support",
        type: "menu",
        icon: "fas fa-life-ring",
        options: [{
            name: "settings_label_deviceInfo",
            id: "deviceInfo",
            icon: "fas fa-tv"
        }, {
            name: "settings_label_license_info",
            id: "license_info",
            icon: "fas fa-award bigger"
        }, {
            name: "settings_label_licence_transfer",
            id: "licence_transfer",
            icon: "fas fa-exchange-alt"
        }, {
            name: "settings_label_check_app",
            id: "check_app",
            icon: "fas fa-wifi big"
        }, {
            name: "settings_label_help",
            id: "help",
            icon: "fas fa-question-circle"
        }, {
            name: "settings_label_privacy",
            id: "privacy",
            icon: "fas fa-file-signature"
        }, {
            name: "settings_label_about_duplecast",
            id: "about_duplecast",
            icon: "fas fa-info-circle"
        }, {
            name: "settings_label_Reload",
            id: "reload",
            icon: "fas fa-redo"
        }]
    }],
    settings: [{
        name: "settings_label_App_Settings",
        id: "general",
        type: "menu",
        icon: "fas fa-cogs",
        options: [{
            name: "settings_label_Languages",
            id: "lang",
            storage: "locale",
            type: "radio",
            prefix: "lang_",
            icon: "fas fa-language",
            options: [{
                id: "EN",
                name: "language_label_English"
            }, {
                id: "FR",
                name: "language_label_Frensh"
            }, {
                id: "ES",
                name: "language_label_spanish"
            }, {
                id: "DE",
                name: "language_label_german"
            }, {
                id: "IT",
                name: "language_label_italian"
            }, {
                id: "PT",
                name: "language_label_portuguese"
            }, {
                id: "RU",
                name: "language_label_russian"
            }, {
                id: "BS",
                name: "language_label_bosnian"
            }, {
                id: "AR",
                name: "language_label_arabic"
            }, {
                id: "TR",
                name: "language_label_turkish"
            }, {
                id: "RO",
                name: "language_label_romanian"
            }]
        }, {
            name: "settings_label_keyboard_Languages",
            id: "lang",
            storage: "keyboard_language",
            type: "radio",
            prefix: "lang_",
            icon: "fas fa-keyboard",
            options: [{
                id: "EN",
                name: "language_label_English"
            }, {
                id: "FR",
                name: "language_label_Frensh"
            }, {
                id: "ES",
                name: "language_label_spanish"
            }, {
                id: "DE",
                name: "language_label_german"
            }, {
                id: "IT",
                name: "language_label_italian"
            }, {
                id: "PT",
                name: "language_label_portuguese"
            }, {
                id: "RU",
                name: "language_label_russian"
            }, {
                id: "BS",
                name: "language_label_bosnian"
            }, {
                id: "AR",
                name: "language_label_arabic"
            }, {
                id: "TR",
                name: "language_label_turkish"
            }, {
                id: "RO",
                name: "language_label_romanian"
            }]
        }, {
            name: "settings_label_Time_Zone",
            id: "timeZone",
            storage: "time",
            prefix: "UTC ",
            type: "radio",
            icon: "fas fa-clock",
            options: [{
                option: "UTC -12:00 ",
                id: "-12"
            }, {
                option: "UTC -11:00 ",
                id: "-11"
            }, {
                option: "UTC -10:00 ",
                id: "-10"
            }, {
                option: "UTC -09:00 ",
                id: "-9"
            }, {
                option: "UTC -08:00 ",
                id: "-8"
            }, {
                option: "UTC -07:00 ",
                id: "-7"
            }, {
                option: "UTC -06:00 ",
                id: "-6"
            }, {
                option: "UTC -05:00 ",
                id: "-5"
            }, {
                option: "UTC -04:00 ",
                id: "-4"
            }, {
                option: "UTC -03:00 ",
                id: "-3"
            }, {
                option: "UTC -02:00 ",
                id: "-2"
            }, {
                option: "UTC -01:00 ",
                id: "-1"
            }, {
                option: "UTC +00:00 ",
                id: "0"
            }, {
                option: "UTC +01:00 ",
                id: "1"
            }, {
                option: "UTC +02:00 ",
                id: "2"
            }, {
                option: "UTC +03:00 ",
                id: "3"
            }, {
                option: "UTC +04:00 ",
                id: "4"
            }, {
                option: "UTC +05:00 ",
                id: "5"
            }, {
                option: "UTC +06:00 ",
                id: "6"
            }, {
                option: "UTC +07:00 ",
                id: "7"
            }, {
                option: "UTC +08:00 ",
                id: "8"
            }, {
                option: "UTC +09:00 ",
                id: "9"
            }, {
                option: "UTC +10:00 ",
                id: "10"
            }, {
                option: "UTC +11:00 ",
                id: "11"
            }, {
                option: "UTC +12:00 ",
                id: "12"
            }]
        }, {
            name: "settings_label_EPG",
            id: "epg",
            storage: "epg",
            type: "radio",
            icon: "fas fa-calendar-alt",
            prefix: "settings_label_",
            options: [{
                id: "disable",
                name: "epg_label_Disable"
            }, {
                id: "enable",
                name: "epg_label_Enable"
            }]
        }, {
            name: "settings_label_Themes",
            id: "themes",
            storage: "default_themes",
            type: "radio",
            prefix: "themes_label_",
            capitalize: !0,
            icon: "fas fa-palette",
            options: [{
                id: "blue",
                name: "themes_label_Blue"
            }, {
                id: "purple",
                name: "themes_label_Purple"
            }, {
                id: "green",
                name: "themes_label_Green"
            }, {
                id: "pink",
                name: "themes_label_Pink"
            }, {
                id: "brown",
                name: "themes_label_brown"
            }, {
                id: "dark",
                name: "themes_label_Dark"
            }, {
                id: "summer",
                name: "themes_label_summer"
            }, {
                id: "classic",
                name: "themes_label_classic"
            }, {
                id: "fire",
                name: "themes_label_fire"
            }, {
                id: "royal",
                name: "themes_label_royal"
            }, {
                id: "monochrome",
                name: "themes_label_Monochrome"
            }]
        }, {
            name: "settings_label_Background",
            id: "bg",
            storage: "default_background",
            icon: "fas fa-image"
        }, {
            name: "settings_label_Hide_Show_Section",
            id: "hide_show",
            type: "menu",
            icon: "fas fa-eye",
            options: [{
                name: "settings_Show_my_Duplicast",
                id: "duplecast_section_show",
                storage: "duplecast_section_show",
                type: "radio",
                prefix: "setting_show_section_",
                icon: "fas fa-home",
                options: [{
                    id: "enable",
                    name: "settings_section_show"
                }, {
                    id: "disable",
                    name: "settings_section_hide"
                }]
            }, {
                name: "settings_Show_Live_Channels",
                id: "live_section_show",
                storage: "live_section_show",
                type: "radio",
                prefix: "setting_show_section_",
                icon: "fas fa-tv",
                options: [{
                    id: "enable",
                    name: "settings_section_show"
                }, {
                    id: "disable",
                    name: "settings_section_hide"
                }]
            }, {
                name: "settings_Show_Movies",
                id: "vod_section_show",
                storage: "vod_section_show",
                type: "radio",
                prefix: "setting_show_section_",
                icon: "fas fa-play",
                options: [{
                    id: "enable",
                    name: "settings_section_show"
                }, {
                    id: "disable",
                    name: "settings_section_hide"
                }]
            }, {
                name: "settings_Show_Series",
                id: "serie_section_show",
                storage: "serie_section_show",
                type: "radio",
                prefix: "setting_show_section_",
                icon: "fas fa-film",
                options: [{
                    id: "enable",
                    name: "settings_section_show"
                }, {
                    id: "disable",
                    name: "settings_section_hide"
                }]
            }, {
                name: "settings_Show_Timeshift",
                id: "timeshift_section_show",
                storage: "timeshift_section_show",
                type: "radio",
                prefix: "setting_show_section_",
                icon: "fas fa-archive",
                options: [{
                    id: "enable",
                    name: "settings_section_show"
                }, {
                    id: "disable",
                    name: "settings_section_hide"
                }]
            }, {
                name: "settings_Show_Radio",
                id: "radio_section_show",
                storage: "radio_section_show",
                type: "radio",
                prefix: "setting_show_section_",
                icon: "fas fa-microphone-alt",
                options: [{
                    id: "enable",
                    name: "settings_section_show"
                }, {
                    id: "disable",
                    name: "settings_section_hide"
                }]
            }]
        }, {
            name: "settings_label_duplecast",
            id: "duplecast",
            storage: "duplecast",
            type: "radio",
            prefix: "duplecast_label_",
            capitalize: !0,
            icon: "fas fa-home",
            options: [{
                id: "enable",
                name: "duplecast_label_Enable"
            }, {
                id: "disable",
                name: "duplecast_label_Disable"
            }]
        }, {
            name: "settings_label_Sort",
            id: "sort",
            type: "menu",
            icon: "fas fa-sort-alpha-up",
            options: [{
                name: "sidebar_Live_Channels",
                id: "sort_live",
                storage: "sort_live",
                type: "radio",
                prefix: "settings_setup_sort_",
                icon: "fas fa-tv",
                options: [{
                    name: "settings_setup_sort_default",
                    id: "default"
                }, {
                    name: "settings_setup_sort_newest",
                    id: "newest"
                }, {
                    name: "settings_setup_sort_oldest",
                    id: "oldest"
                }, {
                    name: "settings_setup_sort_atoz",
                    id: "atoz"
                }, {
                    name: "settings_setup_sort_ztoa",
                    id: "ztoa"
                }]
            }, {
                name: "sidebar_Movies",
                id: "sort_vod",
                storage: "sort_vod",
                type: "radio",
                prefix: "settings_setup_sort_",
                icon: "fas fa-play",
                options: [{
                    name: "settings_setup_sort_default",
                    id: "default"
                }, {
                    name: "settings_setup_sort_newest",
                    id: "newest"
                }, {
                    name: "settings_setup_sort_oldest",
                    id: "oldest"
                }, {
                    name: "settings_setup_sort_atoz",
                    id: "atoz"
                }, {
                    name: "settings_setup_sort_ztoa",
                    id: "ztoa"
                }]
            }, {
                name: "sidebar_Series",
                id: "sort_serie",
                storage: "sort_serie",
                type: "radio",
                prefix: "settings_setup_sort_",
                icon: "fas fa-film",
                options: [{
                    name: "settings_setup_sort_default",
                    id: "default"
                }, {
                    name: "settings_setup_sort_newest",
                    id: "newest"
                }, {
                    name: "settings_setup_sort_oldest",
                    id: "oldest"
                }, {
                    name: "settings_setup_sort_atoz",
                    id: "atoz"
                }, {
                    name: "settings_setup_sort_ztoa",
                    id: "ztoa"
                }]
            }, {
                name: "sidebar_Timeshift",
                id: "sort_timeshift",
                storage: "sort_timeshift",
                type: "radio",
                prefix: "settings_setup_sort_",
                icon: "fas fa-archive",
                options: [{
                    name: "settings_setup_sort_default",
                    id: "default"
                }, {
                    name: "settings_setup_sort_newest",
                    id: "newest"
                }, {
                    name: "settings_setup_sort_oldest",
                    id: "oldest"
                }, {
                    name: "settings_setup_sort_atoz",
                    id: "atoz"
                }, {
                    name: "settings_setup_sort_ztoa",
                    id: "ztoa"
                }]
            }, {
                name: "sidebar_Radio",
                id: "sort_radio",
                storage: "sort_radio",
                type: "radio",
                prefix: "settings_setup_sort_",
                icon: "fas fa-microphone-alt",
                options: [{
                    name: "settings_setup_sort_default",
                    id: "default"
                }, {
                    name: "settings_setup_sort_newest",
                    id: "newest"
                }, {
                    name: "settings_setup_sort_oldest",
                    id: "oldest"
                }, {
                    name: "settings_setup_sort_atoz",
                    id: "atoz"
                }, {
                    name: "settings_setup_sort_ztoa",
                    id: "ztoa"
                }]
            }]
        }, {
            name: "settings_label_Parental_Lock",
            id: "lock",
            storage: "parental_lock",
            type: "radio",
            icon: "fas fa-lock",
            prefix: "settings_label_",
            options: [{
                id: "disable",
                name: "epg_label_Disable"
            }, {
                id: "enable",
                name: "epg_label_Enable"
            }]
        }, {
            name: "settings_label_adults_protection",
            id: "adultsProtection",
            storage: "adults_protection",
            type: "radio",
            icon: "fas fa-user-shield",
            prefix: "settings_label_",
            options: [{
                id: "enable",
                name: "epg_label_Enable"
            }, {
                id: "disable",
                name: "epg_label_Disable"
            }]
        }, {
            id: "resetApp",
            name: "reset_application",
            icon: "fas fa-redo"
        }]
    }, {
        name: "settings_label_Player",
        id: "player",
        type: "menu",
        icon: "fas fa-play",
        options: [{
            name: "settings_label_Audio",
            id: "audio",
            storage: "default_audio",
            type: "radio",
            prefix: "settings_audio_",
            icon: "fas fa-volume-off",
            options: [{
                id: "0",
                name: "language_label_OriginAudio"
            }, {
                id: "English",
                name: "language_label_English"
            }, {
                id: "Francais",
                name: "language_label_Frensh"
            }, {
                id: "Espanol",
                name: "language_label_spanish"
            }, {
                id: "German",
                name: "language_label_german"
            }, {
                id: "Italian",
                name: "language_label_italian"
            }, {
                id: "Portuguese",
                name: "language_label_portuguese"
            }, {
                id: "Arabic",
                name: "language_label_arabic"
            }, {
                id: "Turkish",
                name: "language_label_turkish"
            }, {
                id: "Romanian",
                name: "language_label_romanian"
            }]
        }, {
            name: "settings_label_Aspect",
            id: "aspect",
            storage: "aspect_ratio",
            type: "radio",
            prefix: "aspect_label_",
            icon: "fas fa-arrows-alt",
            options: [{
                id: "original",
                name: "aspect_label_original",
                class: "aspect",
                aspect: "original"
            }, {
                id: "fullscreen",
                name: "aspect_label_Fullscreen",
                class: "aspect",
                aspect: "fullscreen"
            }, {
                id: "16_9",
                option: "16/9",
                class: "aspect",
                aspect: "16_9"
            }, {
                id: "21_9",
                option: "21/9",
                class: "aspect",
                aspect: "21_9"
            }, {
                id: "4_3",
                option: "4/3",
                class: "aspect",
                aspect: "4_3"
            }]
        }, {
            name: "settings_label_Subtitle_Size",
            id: "subSize",
            storage: "subtitle_size",
            type: "radio",
            prefix: "subtitle_label_",
            icon: "fas fa-text-height",
            options: [{
                id: "tiny",
                name: "subtitle_label_tiny"
            }, {
                id: "small",
                name: "subtitle_label_small"
            }, {
                id: "standard",
                name: "subtitle_label_standard"
            }, {
                id: "large",
                name: "subtitle_label_large"
            }, {
                id: "huge",
                name: "subtitle_label_huge"
            }]
        }, {
            name: "settings_label_Subtitle_Opacity",
            id: "subOpacity",
            storage: "subtitle_transparency",
            type: "radio",
            prefix: "opacity_",
            icon: "fas fa-adjust",
            options: [{
                id: "0",
                name: "opacity_0"
            }, {
                id: "25",
                name: "opacity_25"
            }, {
                id: "50",
                name: "opacity_50"
            }, {
                id: "75",
                name: "opacity_75"
            }, {
                id: "100",
                name: "opacity_100"
            }]
        }, {
            name: "subtitle_position_label_Subtitle_Position",
            id: "subtitle_position",
            storage: "subtitle_position",
            type: "radio",
            prefix: "subtitle_label_",
            icon: "far  fa-window-maximize",
            options: [{
                id: "top",
                name: "subtitle_label_top"
            }, {
                id: "bottom",
                name: "subtitle_label_bottom"
            }]
        }, {
            name: "settings_label_Adaptive_Quality",
            id: "adaptive_quality",
            type: "radio",
            storage: "quality_setting",
            icon: "fas fa-video",
            options: [{
                id: "auto",
                name: "quality_auto_label_Auto_Recommended"
            }, {
                id: "original",
                name: "quality_original_label_Original_Quality"
            }, {
                id: "sd",
                name: "quality_sd_label_SD_480p"
            }, {
                id: "hd",
                name: "quality_hd_label_HD_720p"
            }, {
                id: "fullhd",
                name: "quality_fullhd_label_Full_HD_1080p"
            }, {
                id: "ultra4k",
                name: "quality_4k_label_Ultra_4K"
            }]
        }, {
            name: "settings_label_Adaptive_Buffering",
            id: "buffering",
            type: "radio",
            storage: "buffering_preset",
            icon: "fas fa-tachometer-alt",
            options: [{
                id: "auto",
                name: "quality_auto_label_Auto_Recommended"
            }, {
                id: "low",
                name: "settings_label_Low_Network_Connection"
            }, {
                id: "standard",
                name: "settings_label_Standard"
            }, {
                id: "high",
                name: "settings_label_High_Network_Connection"
            }]
        }, {
            name: "Seek_Time",
            id: "seek_time",
            type: "radio",
            storage: "seek_time",
            icon: "fas fa-forward",
            options: [{
                id: "5",
                name: "settings_label_5_Seconds"
            }, {
                id: "10",
                name: "settings_label_10_Seconds"
            }, {
                id: "15",
                name: "settings_label_15_Seconds"
            }, {
                id: "20",
                name: "settings_label_20_Seconds"
            }, {
                id: "30",
                name: "settings_label_30_Seconds"
            }, {
                id: "60",
                name: "settings_label_60_Seconds"
            }]
        }]
    }, {
        name: "settings_label_Playlist_Settings",
        id: "playlist",
        type: "menu",
        icon: "fas fa-list",
        options: [{
            name: "settings_label_playlist_processor",
            id: "playlistProcessor",
            storage: "parser_type",
            type: "radio",
            prefix: "playlist_processor_label_",
            icon: "fas fa-download",
            options: [{
                id: "remote",
                name: "playlist_processor_label_remote"
            }, {
                id: "local",
                name: "playlist_processor_label_local"
            }]
        }, {
            name: "enable_account_history",
            id: "account_history",
            storage: "account_history",
            type: "radio",
            icon: "fas fa-history",
            options: [{
                id: "enable",
                name: "epg_label_Enable"
            }, {
                id: "disable",
                name: "epg_label_Disable"
            }]
        }, {
            id: "lock_playlist",
            name: "settings_label_lock_playlist",
            icon: "fas fa-lock"
        }, {
            id: "clean",
            name: "settings_label_Clean",
            type: "menu",
            icon: "fas fa-trash",
            options: [{
                id: "resetAllSearch",
                name: "reset_all_search",
                icon: "fas fa-trash"
            }, {
                id: "resetLiveWatching",
                name: "reset_live_watching",
                icon: "fas fa-trash"
            }, {
                id: "resetVodWatching",
                name: "reset_vod_watching",
                icon: "fas fa-trash"
            }, {
                id: "resetSerieWatching",
                name: "reset_serie_watching",
                icon: "fas fa-trash"
            }, {
                id: "resetRadioWatching",
                name: "reset_radio_watching",
                icon: "fas fa-trash"
            }, {
                id: "cleanAll",
                name: "clean_all_history",
                icon: "fas fa-trash"
            }]
        }, {
            id: "reset",
            name: "settings_label_Clean_list",
            type: "menu",
            icon: "fas fa-trash",
            options: [{
                id: "resetLiveFavoris",
                name: "reset_live_favoris",
                icon: "fas fa-trash"
            }, {
                id: "resetRadioFavoris",
                name: "reset_radio_favoris",
                icon: "fas fa-trash"
            }, {
                id: "resetVodFavoris",
                name: "reset_vod_favoris",
                icon: "fas fa-trash"
            }, {
                id: "resetSerieFavoris",
                name: "reset_serie_favoris",
                icon: "fas fa-trash"
            }, {
                id: "resetAllFavoris",
                name: "reset_all_favoris",
                icon: "fas fa-trash"
            }]
        }, {
            id: "resetAll",
            name: "reset_playlist",
            icon: "fas fa-redo"
        }, {
            id: "playlistInfo",
            name: "settings_playlist_info",
            icon: "fas fa-info-circle"
        }]
    }, {
        name: "settings_label_Support",
        id: "support",
        type: "menu",
        icon: "fas fa-life-ring",
        options: [{
            name: "settings_label_deviceInfo",
            id: "deviceInfo",
            icon: "fas fa-tv"
        }, {
            name: "settings_label_license_info",
            id: "license_info",
            icon: "fas fa-award bigger"
        }, {
            name: "settings_label_licence_transfer",
            id: "licence_transfer",
            icon: "fas fa-exchange-alt"
        }, {
            name: "settings_label_check_app",
            id: "check_app",
            icon: "fas fa-wifi big"
        }, {
            name: "settings_label_help",
            id: "help",
            icon: "fas fa-question-circle"
        }, {
            name: "settings_label_privacy",
            id: "privacy",
            icon: "fas fa-file-signature"
        }, {
            name: "settings_label_about_duplecast",
            id: "about_duplecast",
            icon: "fas fa-info-circle"
        }, {
            name: "settings_label_Reload",
            id: "reload",
            icon: "fas fa-redo"
        }]
    }],
    languages: [{
        id: "EN",
        name: "language_label_English"
    }, {
        id: "FR",
        name: "language_label_Frensh"
    }, {
        id: "ES",
        name: "language_label_spanish"
    }, {
        id: "DE",
        name: "language_label_german"
    }, {
        id: "IT",
        name: "language_label_italian"
    }, {
        id: "PT",
        name: "language_label_portuguese"
    }, {
        id: "RU",
        name: "language_label_russian"
    }, {
        id: "BS",
        name: "language_label_bosnian"
    }, {
        id: "AR",
        name: "language_label_arabic"
    }, {
        id: "TR",
        name: "language_label_turkish"
    }, {
        id: "RO",
        name: "language_label_romanian"
    }],
    subtitle_positions: [{
        id: "top",
        name: "subtitle_label_top"
    }, {
        id: "bottom",
        name: "subtitle_label_bottom"
    }],
    seek_time_options: [{
        id: "5",
        name: "settings_label_5_Seconds"
    }, {
        id: "10",
        name: "settings_label_10_Seconds"
    }, {
        id: "15",
        name: "settings_label_15_Seconds"
    }, {
        id: "20",
        name: "settings_label_20_Seconds"
    }, {
        id: "30",
        name: "settings_label_30_Seconds"
    }, {
        id: "60",
        name: "settings_label_60_Seconds"
    }],
    subtitle_sizes: [{
        id: "tiny",
        name: "subtitle_label_tiny"
    }, {
        id: "small",
        name: "subtitle_label_small"
    }, {
        id: "standard",
        name: "subtitle_label_standard"
    }, {
        id: "large",
        name: "subtitle_label_large"
    }, {
        id: "huge",
        name: "subtitle_label_huge"
    }],
    aspects: [{
        id: "original",
        name: "aspect_label_original",
        class: "aspect",
        aspect: "original"
    }, {
        id: "fullscreen",
        name: "aspect_label_Fullscreen",
        class: "aspect",
        aspect: "fullscreen"
    }, {
        id: "16_9",
        option: "16/9",
        class: "aspect",
        aspect: "16_9"
    }, {
        id: "21_9",
        option: "21/9",
        class: "aspect",
        aspect: "21_9"
    }, {
        id: "4_3",
        option: "4/3",
        class: "aspect",
        aspect: "4_3"
    }],
    subtitle_transparency: [{
        id: "0",
        name: "opacity_0"
    }, {
        id: "25",
        name: "opacity_25"
    }, {
        id: "50",
        name: "opacity_50"
    }, {
        id: "75",
        name: "opacity_75"
    }, {
        id: "100",
        name: "opacity_100"
    }],
    quality_options: [{
        id: "auto",
        name: "quality_auto_label_Auto_Recommended"
    }, {
        id: "original",
        name: "quality_original_label_Original_Quality"
    }, {
        id: "sd",
        name: "quality_sd_label_SD_480p"
    }, {
        id: "hd",
        name: "quality_hd_label_HD_720p"
    }, {
        id: "fullhd",
        name: "quality_fullhd_label_Full_HD_1080p"
    }, {
        id: "ultra4k",
        name: "quality_4k_label_Ultra_4K"
    }],
    buffering_presets: [{
        id: "auto",
        name: "quality_auto_label_Auto_Recommended"
    }, {
        id: "low",
        name: "settings_label_Low_Network_Connection"
    }, {
        id: "standard",
        name: "settings_label_Standard"
    }, {
        id: "high",
        name: "settings_label_High_Network_Connection"
    }],
    epg: [{
        id: "enable",
        name: "epg_label_Enable"
    }, {
        id: "disable",
        name: "epg_label_Disable"
    }],
    background: [{
        name: "background_label_no_option",
        small: "http://files.duplecast.com/images/backgrounds/small/no-pictures.png",
        id: "none"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper1.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper1.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper2.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper2.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper3.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper3.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper4.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper4.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper5.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper5.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper6.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper6.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper7.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper7.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper8.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper8.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper9.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper9.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper10.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper10.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper11.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper11.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper12.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper12.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper13.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper13.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper14.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper14.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper15.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper15.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper16.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper16.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper17.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper17.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper18.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper18.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper19.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper19.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper20.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper20.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper21.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper21.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper22.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper22.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper23.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper23.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper24.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper24.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper25.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper25.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper26.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper26.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper27.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper27.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper28.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper28.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper29.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper29.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper30.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper30.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper31.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper31.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper32.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper32.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper33.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper33.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper34.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper34.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper35.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper35.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper36.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper36.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper37.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper37.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper38.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper38.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper39.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper39.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper40.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper40.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper41.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper41.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper42.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper42.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper43.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper43.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper44.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper44.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper45.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper45.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper46.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper46.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper47.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper47.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper48.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper48.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper49.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper49.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper50.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper50.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper51.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper51.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper52.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper52.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper53.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper53.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper54.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper54.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper55.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper55.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper56.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper56.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper57.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper57.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper58.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper58.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper59.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper59.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper60.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper60.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper61.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper61.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper62.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper62.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper63.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper63.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper64.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper64.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper65.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper65.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper66.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper66.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper67.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper67.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper68.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper68.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper69.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper69.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper70.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper70.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper71.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper71.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper72.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper72.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper73.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper73.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper74.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper74.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper75.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper75.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper76.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper76.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper77.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper77.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper78.jpeg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper78.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper79.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper79.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper80.jpeg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper80.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper81.jpeg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper81.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper82.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper82.jpg",
        class: "option"
    }, {
        name: "background_label_option",
        src: "http://files.duplecast.com/images/backgrounds/wallpaper83.jpg",
        small: "http://files.duplecast.com/images/backgrounds/small/wallpaper83.jpg",
        class: "option"
    }],
    picturesBtns: [{
        id: "return",
        icon: "fas fa-undo-alt"
    }, {
        id: "prev",
        icon: "fas fa-chevron-left"
    }, {
        id: "play",
        icon: "fas fa-pause",
        class: "play"
    }, {
        id: "next",
        icon: "fas fa-chevron-right"
    }],
    videosBtns: [{
        id: "return",
        icon: "fas fa-undo-alt"
    }, {
        id: "prev",
        icon: "fas fa-chevron-left"
    }, {
        id: "play",
        icon: "fas fa-pause",
        class: "play"
    }, {
        id: "next",
        icon: "fas fa-chevron-right"
    }],
    radioBtns: [{
        id: "return",
        icon: "fas fa-undo-alt"
    }, {
        id: "favoris",
        icon: "far fa-heart",
        class: "fav-button"
    }, {
        id: "reload",
        icon: "fas fa-sync-alt"
    }],
    settingsCategorySetupSort: [{
        id: "default",
        name: "settings_setup_sort_default"
    }, {
        id: "atoz",
        name: "settings_setup_sort_atoz"
    }, {
        id: "ztoa",
        name: "settings_setup_sort_ztoa"
    }],
    settingsSetupSort: [{
        id: "default",
        name: "settings_setup_sort_default"
    }, {
        id: "newest",
        name: "settings_setup_sort_newest"
    }, {
        id: "oldest",
        name: "settings_setup_sort_oldest"
    }, {
        id: "atoz",
        name: "settings_setup_sort_atoz"
    }, {
        id: "ztoa",
        name: "settings_setup_sort_ztoa"
    }],
    duplecastButtons: [{
        id: "recommended",
        name: "duplecast_recomended"
    }, {
        id: "box_office",
        name: "duplecast_boxoffice"
    }, {
        id: "search",
        name: "duplecast_search"
    }],
    duplecastButtonsRight: []
};