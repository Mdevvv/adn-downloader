var loadPlayer = null;
!function() {
    function f() {
        location.reload()
    }
    loadPlayer = function(g, v, m) {
        m = m || {},
        g.style.backgroundImage = "url(" + v + ")",
        g.innerHTML = "",
        function n(t) {
            if (!0 === t)
                return e = function(t) {
                    var e, i, s;
                    t || "undefined" == typeof google ? (e = g,
                    i = adnPlayerLanguages.fr["Please disable AdBlock to start the video."],
                    (s = document.createElement("div")).className = "vjs-error-display adn-player-error",
                    s.innerHTML = '<div class="adn-player-error-message">' + i + "</div>",
                    e.appendChild(s)) : n(!1)
                }
                ,
                i = new Request("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",{
                    method: "HEAD",
                    mode: "no-cors"
                }),
                void fetch(i).then(function(t) {
                    return t
                }).then(function() {
                    e(!1)
                }).catch(function() {
                    e(!0)
                });
            var e, i;
            if (m.video && null !== m.video.startDate && !1 === m.video.available)
                new ADNCountDown(g,m.video.currentDate,m.video.startDate,f);
            else {
                var s;
                s = window.navigator.userAgent,
                (/WiiU/i.test(s) || function() {
                    if (/iP(hone|od|ad)/.test(navigator.platform)) {
                        var t = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                        return 8 <= [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3] || 0, 10)][0]
                    }
                }()) && (m.minimalist = !0);
                var o = document.createElement("video");
                o.className = "adn-video-js",
                o.id = "adn-video-js",
                o.style.width = "100%",
                o.style.height = "100%",
                o.controls = !0,
                g.appendChild(o);
                var r, a, h, d, l, u, c = (a = (r = m).preference || {},
                h = {
                    children: ["mediaLoader", "posterImage", "textTrackDisplay", "metaDisplay", "history", "clickthrough", "dock", "skipButton", "loadingSpinner", "bigPlayButton", "controlBar", "errorDisplay"],
                    controlBar: {
                        children: ["playToggle", "previousVideoButton", "nextVideoButton", "volumeMenuButton", "currentTimeDisplay", "progressControl", "remainingTimeDisplay", "customControlSpacer", "resolutionSwitcher", "languageSwitcher", "fullscreenToggle"]
                    },
                    preload: "metadata",
                    html5: {
                        nativeTextTracks: !1,
                        hlsjsConfig: {
                            maxBufferLength: 60,
                            fragLoadingTimeOut: 12e4
                        }
                    },
                    videoUrl: r.video.url,
                    dock: r.dock,
                    ads: r.ads,
                    user: r.user,
                    distribution: r.distribution,
                    i18nPlatform: r.i18nPlatform,
                    defaultResolution: r.defaultResolution,
                    defaultLanguage: r.defaultLanguage,
                    callback: r.callback,
                    autoPlay: r.autoPlay,
                    autoNextVideo: a.autoplay,
                    preferredResolution: a.quality,
                    preferredLanguage: a.language,
                    chromecast: r.chromecast,
                    skipButton: {
                        autoNextVideo: a.autoplay
                    }
                },
                r.minimalist && (h.children = ["mediaLoader", "posterImage", "history", "clickthrough", "dock", "loadingSpinner", "bigPlayButton", "controlBar", "errorDisplay"],
                h.minimalist = !0),
                h), p = new (videojs.getComponent("Player"))(o,c);
                m.logo && p.logobrand(m.logo),
                m.ads && p.ima({
                    id: "adn-video-js",
                    adLabel: adnPlayerLanguages.fr.Advertisement,
                    adTagUrl: (d = m.ads.url,
                    l = "euconsent",
                    u = function(t) {
                        for (var e = t + "=", i = document.cookie.split(";"), s = 0; s < i.length; s++) {
                            for (var n = i[s]; " " === n.charAt(0); )
                                n = n.substring(1);
                            if (0 === n.indexOf(e))
                                return n.substring(e.length, n.length)
                        }
                        return ""
                    }("euconsent-v2"),
                    u ? d += (d.split("?")[1] ? "&" : "?") + encodeURIComponent(l) + "=" + encodeURIComponent(u) : d),
                    debug: !1,
                    vpaidMode: google.ima.ImaSdkSettings.VpaidMode.INSECURE
                }),
                p.ready(function() {
                    m.minimalist || (this.hotkeys({
                        volumeStep: .1,
                        seekStep: 10,
                        alwaysCaptureHotkeys: !0,
                        enableVolumeScroll: !1
                    }),
                    this.poster(v),
                    m.chromecast && this.chromecast({
                        appId: m.chromecast.appId,
                        customData: this.onChromecastCustomData.bind(this)
                    }))
                })
            }
        }(!!m.ads)
    }
}();
var ADNRequester, _0xc4e9b7 = null;
function ADNCountDown(t, e, i, s) {
    this.container = t,
    this.callback = s,
    this.currentTime = this.parseTime(e),
    this.startTime = this.parseTime(i),
    this.endTime = new Date(this.startTime.getTime() - (this.currentTime.getTime() - (new Date).getTime())),
    this.node = document.createElement("div"),
    this.node.className = "adn-player-countdown vjs-error-display adn-player-error";
    var n = document.createElement("div");
    n.className = "adn-player-countdown-content",
    n.innerHTML = "<div>Cette vidéo sera disponible dans :</div>",
    this.countdownNode = document.createElement("span"),
    this.countdownNode.className = "adn-player-countdown-value",
    n.appendChild(this.countdownNode),
    this.node.appendChild(n),
    this.container.appendChild(this.node);
    var o = this;
    this.timer = setInterval(function() {
        o.sync()
    }, 500),
    this.sync()
}
!function() {
    var a = ""
      , h = ""
      , n = null
      , o = null
      , P = []
      , s = videojs.getComponent("Player")
      , t = videojs.extend(s, {
        constructor: function(t, e, i) {
            this.playerReady = !1,
            this.hashOptions = this.getHashOptions(),
            this.minimalist = e.minimalist || !1,
            this.resolutions = {},
            this.meta = {},
            this.defaultResolution = e.defaultResolution || "sd",
            this.preferredResolution = e.preferredResolution || "auto",
            this.currentAutoQuality = null,
            this.defaultLanguage = e.defaultLanguage || "vostf",
            this.preferredLanguage = e.preferredLanguage || "vostf",
            this.hideSubtitlesResolution = "mobile",
            this.callback = e.callback,
            this.trackIndex = 0,
            this.savedCurrentTime = 0,
            this.ignoreSavedCurrentTime = !1,
            this.autoPlay = 0 < this.hashOptions.autoPlay || e.autoPlay || !1,
            this.autoNextVideo = e.autoNextVideo || !1,
            this.firstVideo = !0,
            this.firstStart = !0,
            this.resolutionKeys = ["auto", "mobile", "sd", "hd", "fhd"],
            this.hlsJSAvailable = !1,
            this.embedded = -1 < window.location.pathname.indexOf("embedded/"),
            this.video = {
                id: 0,
                url: window.location.href,
                currentTime: 0
            },
            this.links = {},
            this.adsEnabled = !!e.ads,
            this.videoUrl = e.videoUrl || null,
            this.chromecastOptions = e.chromecast || {},
            this.chromecastRemotePlayer = !1,
            this.distribution = e.distribution,
            this.i18nPlatform = e.i18nPlatform,
            this.requester = new ADNRequester({
                refreshTokenUrl: e.user.refreshTokenUrl || null
            }),
            this.requester.setRefreshToken(e.user.refreshToken || null),
            this.requester.setAccessToken(e.user.accessToken || null),
            this.requester.setProfileId(e.user.profileId),
            this.currentRequest,
            s.apply(this, arguments),
            this.adnError = {
                msg: this.localize("An error occurred. Please empty your cache and reload the page."),
                code: "player-default-error"
            },
            this.setEvent(),
            this.trigger("chromecast.hideButton"),
            this.getPlayerToken()
        },
        getTargetDistribution: function() {
            return this.distribution
        },
        getI18NPlatform: function() {
            return this.i18nPlatform
        },
        setEvent: function() {
            this.ready(function() {
                "function" == typeof this.callback && this.callback(this)
            }),
            this.on("ended", videojs.bind(this, this.onEnded)),
            this.on("chromecast.remote", videojs.bind(this, this.onChromecastRemotePlayer)),
            this.on("chromecast.local", videojs.bind(this, this.onChromecastLocalPlayer)),
            this.on("adn.error", videojs.bind(this, this.onADNError)),
            this.on("loadedmetadata", videojs.bind(this, this.onMetadataLoaded)),
            this.on("fullscreenchange", videojs.bind(this, this.onFullscreenChanged)),
            this.on("timeupdate", videojs.bind(this, this.onTimeUpdated));
            var t = document.querySelector(".adn-video-js .vjs-big-play-button");
            t.addEventListener("touchend", videojs.bind(this, this.startAfterPlayClicked), !1),
            t.addEventListener("click", videojs.bind(this, this.startAfterPlayClicked), !1);
            var e = document.querySelector(".adn-video-js .vjs-clickthrough");
            e.addEventListener("touchend", videojs.bind(this, this.startAfterPlayClicked), !1),
            e.addEventListener("click", videojs.bind(this, this.startAfterPlayClicked), !1);
            try {
                videojs.Html5Hlsjs.addHook("beforeinitialize", videojs.bind(this, this.beforeInitializeHlsjs))
            } catch (t) {}
        },
        getPlayerToken: function() {
            this.addClass("vjs-loading");
            var t = {
                "X-Player-Refresh-Token": this.requester.getRefreshToken()
            }
              , e = this.requester.refreshTokenUrl
              , s = this;
            this.requester.request(e, "POST", t, null, function(t, e) {
                if (e)
                    return s.adnError.msg = e.message,
                    s.adnError.code = e.code,
                    void s.trigger("adn.error");
                try {
                    var i = JSON.parse(t);
                    n = i.token,
                    s.requester.setAccessToken(i.accessToken),
                    s.requester.setRefreshToken(i.refreshToken),
                    s.loadVideo()
                } catch (t) {
                    s.trigger("adn.error")
                }
            })
        },
        loadVideo: function() {
            if (null != n && null != this.videoUrl) {
                var t = {
                    k: h = this._randomHexaString(16),
                    t: n
                }
                  , e = this._generateADNT(t)
                  , i = this.videoUrl + this.requester.formatParameters({
                    freeWithAds: !0,
                    adaptive: !1,
                    withMetadata: !0,
                    source: "Web"
                })
                  , s = this;
                this.requester.request(i, "GET", {
                    "X-Player-Token": e,
                    "Accept-Language": this.getTargetDistribution(),
                    "x-target-distribution": this.getTargetDistribution(),
                    "x-i18n-platform": this.getI18NPlatform() ? "1" : "0"
                }, null, function(t, e) {
                    if (e)
                        return s.adnError.msg = e.message,
                        s.adnError.code = e.code,
                        void s.trigger("adn.error");
                    try {
                        var i = JSON.parse(t);
                        s.prepareVideo(i)
                    } catch (t) {
                        s.trigger("adn.error")
                    }
                })
            } else
                this.trigger("adn.error")
        },
        prepareVideo: function(t) {
            var e = t.links || {}
              , i = e.subtitles || {}
              , s = t.metadata || {};
            if (this.video = t.video || {},
            this.links = e,
            this.isFullscreen() || this.embedded || !this.video.url || this.video.url === window.location.pathname) {
                if (this.resolutions = this.prepareResolutions(e.streaming || {}, this.minimalist),
                0 === Object.keys(this.resolutions).length)
                    return this.adnError.msg = this.localize("Video available soon"),
                    void this.trigger("adn.error");
                this.currentAutoQuality = null,
                this.meta = this.setMetas(s),
                this.trackIndex = 0,
                this.savedCurrentTime = this._getSavedCurrentTime(),
                0 <= this.hashOptions.position && (this.savedCurrentTime = this.hashOptions.position),
                this.hashOptions = {},
                this.ignoreSavedCurrentTime = !1,
                this.minimalist ? this.prepareSubtitles(null) : this.getSubtitlesLink(i.all),
                this.trigger("adn.videoReady"),
                this.trigger("adn.resetHistory")
            } else if (this.firstVideo)
                window.location = this.video.url;
            else {
                var n = this._getSavedCurrentTime(!0);
                window.location = this.video.url + "#autoPlay=1&position=" + n
            }
        },
        getSubtitlesLink: function(t) {
            if (void 0 === t)
                return this.adnError.msg = this.localize("Video available soon"),
                void this.trigger("adn.error");
            var s = this;
            this.requester.request(t, "GET", {
                "Accept-Language": this.getTargetDistribution(),
                "x-target-distribution": this.getTargetDistribution()
            }, null, function(t, e) {
                if (e)
                    return s.adnError.msg = e.message,
                    s.adnError.code = e.code,
                    void s.trigger("adn.error");
                try {
                    var i = JSON.parse(t);
                    s.loadSubtitles(i.location)
                } catch (t) {
                    s.trigger("adn.error")
                }
            })
        },
        loadSubtitles: function(t) {
            if (void 0 === t)
                return this.adnError.msg = this.localize("Video available soon"),
                void this.trigger("adn.error");
            var i = this;
            this.requester.request(t, "GET", {
                "Accept-Language": this.getTargetDistribution(),
                "x-target-distribution": this.getTargetDistribution()
            }, null, function(t, e) {
                e ? i.trigger("adn.error") : i.prepareSubtitles(t)
            })
        },
        prepareSubtitles: function(t) {
            if (this.minimalist) {
                for (var e in P[this.trackIndex] = {},
                this.resolutions)
                    this.resolutions.hasOwnProperty(e) && (P[this.trackIndex][e] = {});
                this.startPlayer()
            } else {
                var i = CryptoJS.enc.Base64.parse(t.substring(0, 24))
                  , s = h + a
                  , n = CryptoJS.enc.Hex.parse(s)
                  , o = t.substring(24);
                try {
                    var r = CryptoJS.AES.decrypt(o, n, {
                        iv: i
                    });
                    r = r.toString(CryptoJS.enc.Utf8),
                    P[this.trackIndex] = JSON.parse(r) || {};
                    window.exposedValue = P[this.trackIndex];
                } catch (t) {
                    return void this.trigger("adn.error")
                }
                this.startPlayer()
            }
        },
        loadChromecastRefreshToken: function(s) {
            this.chromecastOptions.appId || s();
            var t = this.chromecastOptions.refreshTokenUrl
              , n = this;
            this.requester.authRequest(t, "POST", null, null, function(t, e) {
                if (e)
                    n.trigger("adn.error");
                else
                    try {
                        var i = JSON.parse(t);
                        o = i.refreshToken,
                        s()
                    } catch (t) {
                        n.trigger("adn.error")
                    }
            })
        },
        startPlayer: function() {
            return this.removeClass("vjs-loading"),
            0 === P.length ? (this.adnError.msg = this.localize("Video available soon"),
            void this.trigger("adn.error")) : 0 === P[0].length ? (this.adnError.msg = this.localize("Video available soon"),
            void this.trigger("adn.error")) : (this.subLanguage = this.initSubLanguage(),
            this.resolution = this.initResolution(),
            void this.switchTo(this.subLanguage, this.resolution, this.savedCurrentTime, !this.autoPlay))
        },
        startAfterPlayClicked: function() {
            this.firstStart && (this.firstStart = !1,
            this.adsEnabled && this.ima.initializeAdDisplayContainer(),
            null != this.poster && this.poster(null),
            this.switchTo(this.subLanguage, this.resolution, this.savedCurrentTime, !1))
        },
        dispose: function() {
            P[this.trackIndex] = null,
            s.prototype.dispose.apply(this, arguments)
        },
        previousItem: function(t) {
            var e = this.getPreviousVideoUrl();
            e && (this.trigger("adn.syncHistory"),
            this.autoPlay = !0,
            this.videoUrl = e,
            t && (this.ignoreSavedCurrentTime = !0),
            this.getPlayerToken())
        },
        nextItem: function(t) {
            var e = this.getNextVideoUrl();
            e && (this.trigger("adn.syncHistory"),
            this.autoPlay = !0,
            this.videoUrl = e,
            t && (this.ignoreSavedCurrentTime = !0),
            this.getPlayerToken())
        },
        onEnded: function() {
            this.removeClass("vjs-loading"),
            this.adsEnabled || this.chromecastRemotePlayer || !this.autoNextVideo ? this.switchTo(this.subLanguage, this.resolution, this.savedCurrentTime) : this.nextItem()
        },
        onChromecastRemotePlayer: function() {
            this.chromecastRemotePlayer = !0
        },
        onChromecastLocalPlayer: function() {
            this.chromecastRemotePlayer = !1
        },
        setCookie: function(t, e) {
            var i = new Date;
            i.setTime(i.getTime() + 2592e6);
            var s = "expires=" + i.toUTCString();
            document.cookie = t + "=" + e + "; " + s + "; path=/"
        },
        getCookie: function(t) {
            for (var e = t + "=", i = document.cookie.split(";"), s = 0; s < i.length; s++) {
                for (var n = i[s]; " " === n.charAt(0); )
                    n = n.substring(1);
                if (0 === n.indexOf(e))
                    return n.substring(e.length, n.length)
            }
            return ""
        },
        initSubLanguage: function() {
            for (var t = Object.keys(P[this.trackIndex]), e = t.length, i = e - 1; 0 <= i; i--)
                if (this.preferredLanguage === t[i])
                    return t[i];
            for (i = e - 1; 0 <= i; i--)
                if (this.defaultLanguage === t[i])
                    return t[i];
            return t[0]
        },
        setSubLanguage: function(t) {
            return P[this.trackIndex][t] && (this.subLanguage = t,
            this.switchTo(this.subLanguage, this.resolution)),
            this
        },
        getSubLanguages: function() {
            return void 0 !== P[this.trackIndex] && Object.keys(P[this.trackIndex])
        },
        prepareResolutions: function(t, e) {
            if (!1 === e)
                return t;
            var i = JSON.parse(JSON.stringify(t));
            return t.vf && t.vf.mobile && (i.vf = {},
            i.vf.mobile = t.vf.mobile),
            t.vostf && t.vostf.mobile && (i.vostf = {},
            i.vostf.mobile = t.vostf.mobile),
            t.vde && t.vde.mobile && (i.vde = {},
            i.vde.mobile = t.vde.mobile),
            t.vostde && t.vostde.mobile && (i.vostde = {},
            i.vostde.mobile = t.vostde.mobile),
            i
        },
        initResolution: function() {
            for (var t = Object.keys(this.resolutions[this.subLanguage]), e = t.length, i = e - 1; 0 <= i; i--)
                if (this.preferredResolution === t[i])
                    return t[i];
            for (i = e - 1; 0 <= i; i--)
                if (this.defaultResolution === t[i])
                    return t[i];
            return t.pop()
        },
        setResolution: function(t) {
            return this.resolutions[this.subLanguage][t] && (this.resolution = t,
            this.switchTo(this.subLanguage, this.resolution)),
            this
        },
        getResolutions: function() {
            return void 0 !== this.resolutions[this.subLanguage] ? (that = this,
            Object.keys(this.resolutions[this.subLanguage]).sort(function(t, e) {
                return that.resolutionKeys.indexOf(e) - that.resolutionKeys.indexOf(t)
            })) : []
        },
        switchTo: function(s, t, e, n) {
            this.addClass("vjs-loading"),
            this.firstVideo = !1,
            this.trigger("chromecast.showButton");
            var o = 0;
            try {
                o = void 0 !== e ? e : this.currentTime()
            } catch (t) {}
            var i = this.resolutions[s][t];
            if (this.videoSource !== i || this.subtitleTrack !== s) {
                this.pause();
                var r = this;
                this.currentRequest && this.currentRequest.abort(),
                this.videoSource = i,
                this.currentRequest = this.requester.request(i, "GET", null, null, function(t, e) {
                    e && (r.adnError.msg = e.message,
                    r.adnError.code = e.code,
                    r.trigger("adn.error")),
                    r.currentRequest = void 0;
                    var i = JSON.parse(t);
                    r.setSource(i.location, o, n),
                    r.setTrack(s),
                    r.trigger("adn.sourceSwitch"),
                    r.playerReady = !0,
                    r.trigger("adn.ready"),
                    r.trigger("chromecast.playerReady")
                })
            } else
                this.removeClass("vjs-loading");
            this.videoSource = i,
            this.subtitleTrack = s,
            t === this.hideSubtitlesResolution ? this.trigger("adn.subtitleHide") : this.trigger("adn.subtitleShow")
        },
        setSource: function(t, e, i) {
            this.one("loadedmetadata", function() {
                try {
                    0 < e && this.currentTime(e)
                } catch (t) {}
                this.removeClass("vjs-loading")
            }),
            this.one("canplay", function() {
                try {
                    0 < e && this.currentTime(e)
                } catch (t) {}
                this.removeClass("vjs-loading")
            }),
            this.adsEnabled && this.one("playing", function() {
                try {
                    this.currentTime() < e && this.currentTime(e)
                } catch (t) {}
                this.removeClass("vjs-loading")
            }),
            this.src({
                src: t,
                type: "application/x-mpegURL"
            }),
            !0 !== i && this.play(),
            this.removeClass("vjs-loading")
        },
        setTrack: function(t) {
            var e, i = this.textTracks();
            for (e = 0; e < i.length; e++)
                i.removeTrack_(i[e]);
            var s = P[this.trackIndex][t]
              , n = this.addTextTrack("subtitles", t, t);
            for (e = 0; e < s.length; e++)
                n.addCue({
                    startTime: s[e].startTime,
                    endTime: s[e].endTime,
                    text: e
                });
            n.mode = "showing"
        },
        isReady: function() {
            return this.playerReady
        },
        getMetas: function() {
            return this.meta
        },
        getVideo: function() {
            return this.video
        },
        setMetas: function(t) {
            this.meta = t,
            this.trigger("adn.metaUpdated")
        },
        getADNError: function() {
            return this.adnError
        },
        getHistoryUrl: function() {
            return this.links.history || null
        },
        getNextVideoUrl: function() {
            return this.links.nextVideoUrl || null
        },
        getPreviousVideoUrl: function() {
            return this.links.previousVideoUrl || null
        },
        getAdsEnabled: function() {
            return this.adsEnabled
        },
        getJWT: function() {
            return accessToken
        },
        onADNError: function(t) {
            this.removeClass("vjs-loading"),
            this.pause(),
            this.error(this.adnError.msg)
        },
        onMetadataLoaded: function(t) {
            this.textTracks() || this.setTrack(this.subLanguage),
            this.removeClass("vjs-loading")
        },
        onFullscreenChanged: function(t) {
            this.embedded || !this.isFullscreen() && this.video.url && this.video.url !== window.location.pathname && (window.location = this.video.url + "#autoPlay=2&position=" + Math.round(this.currentTime()))
        },
        onChromecastCustomData: function(t) {
            var e = this;
            this.loadChromecastRefreshToken(function() {
                t({
                    aesKey: a,
                    refreshToken: o,
                    guid: e.video.guid,
                    videoId: e.video.id || 0,
                    meta: e.getMetas(),
                    viewTime: e.currentTime(),
                    quality: e.resolution || e.defaultResolution,
                    language: e.subLanguage || e.defaultLanguage,
                    withSubtitles: !0,
                    source: "Web"
                })
            })
        },
        getHashOptions: function() {
            for (var t = window.location.hash.substr(1).split("&"), e = {}, i = 0; i < t.length; i++) {
                var s = t[i].split("=");
                if (2 === s.length)
                    switch (s[0]) {
                    case "autoPlay":
                        e.autoPlay = parseInt(s[1], 10);
                        break;
                    case "position":
                        e.position = parseInt(s[1], 10)
                    }
            }
            return e
        },
        _generateADNT: function(t) {
            var e = JSON.stringify(t)
              , i = new JSEncrypt;
            return i.setPublicKey("-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbQrCJBRmaXM4gJidDmcpWDssgnumHinCLHAgS4buMtdH7dEGGEUfBofLzoEdt1jqcrCDT6YNhM0aFCqbLOPFtx9cg/X2G/G5bPVu8cuFM0L+ehp8s6izK1kjx3OOPH/kWzvstM5tkqgJkNyNEvHdeJl6KhS+IFEqwvZqgbBpKuwIDAQAB-----END PUBLIC KEY-----"),
            i.encrypt(e)
        },
        _randomHexaString: function(t) {
            for (var e = [], i = "0123456789abcdef", s = 0; s < t; s++)
                e.push(i.charAt(Math.floor(Math.random() * i.length)));
            return e.join("")
        },
        _getSavedCurrentTime: function(t) {
            if (this.ignoreSavedCurrentTime)
                return 0;
            if (!this.firstVideo)
                return this.convertTimeCodeToSeconds(this.video.tcEpisodeStart) || 0;
            if (t)
                return 0;
            var e = this.video.duration || 1440
              , i = this.video.currentTime || 0;
            return .9 * e < i ? 0 : i
        },
        beforeInitializeHlsjs: function(t, e) {
            this.hlsJSAvailable = !0;
            var i = this;
            e.on("hlsManifestParsed", function(t) {
                0 <= e.firstLevel && (i.currentAutoQuality = e.levels[e.firstLevel].height,
                i.trigger("adn.sourceSwitch"))
            }),
            e.on("hlsLevelSwitched", function(t) {
                0 <= e.currentLevel && (i.currentAutoQuality = e.levels[e.currentLevel].height,
                i.trigger("adn.sourceSwitch"))
            })
        },
        onTimeUpdated: function() {
            this.hlsJSAvailable || 0 !== this.videoHeight() && this.currentAutoQuality !== this.videoHeight() && (this.currentAutoQuality = this.videoHeight(),
            this.trigger("adn.sourceSwitch"))
        },
        convertTimeCodeToSeconds: function(t) {
            if ("start" === t)
                return 0;
            if ("end" === t)
                return 1 / 0;
            if (t) {
                var e = t.split(":");
                if (e && !(e.length < 3))
                    return 3600 * parseInt(e[0], 10) + 60 * parseInt(e[1], 10) + parseInt(e[2], 10)
            }
        }
    });
    t.players = s.players,
    videojs.registerComponent("Player", t);
    var r = videojs.getComponent("TextTrackDisplay")
      , e = videojs.extend(r, {
        constructor: function(t, e, i) {
            r.apply(this, arguments),
            t.on("seeking", videojs.bind(this, this.onSeeking)),
            t.on("seeked", videojs.bind(this, this.onSeeked)),
            window.addEventListener("resize", videojs.bind(this, this.onResize)),
            this.forceRedraw = !1,
            this.noSubtitles = !1,
            t.on("adn.subtitleHide", videojs.bind(this, this.hideSubtitles)),
            t.on("adn.subtitleShow", videojs.bind(this, this.showSubtitles))
        }
    });
    e.prototype.stripTags = function(t) {
        return t.replace(/<[^>]*>/g, "")
    }
    ,
    e.prototype.prepareText = function(t) {
        var e = t.indexOf("<i>") < t.indexOf("\n") && 0 <= t.indexOf("<i>");
        if (!e)
            return t;
        for (var i = t.split("\n"), s = 0; s < i.length; s++) {
            var n = i[s].indexOf("<i>")
              , o = i[s].indexOf("</i>");
            e && -1 === n && (i[s] = "<i>" + i[s]),
            (e || 0 <= n) && -1 === o && (i[s] = i[s] + "</i>")
        }
        return i.join("\n")
    }
    ,
    e.prototype.vttTextToCanvas = function(t) {
        for (var e = []; 0 < t.length; ) {
            var i = t.indexOf("<i>");
            if (-1 === i) {
                e.push(""),
                e.push(this.stripTags(t));
                break
            }
            0 < i && (e.push(""),
            e.push(this.stripTags(t.substr(0, i))),
            t = t.substr(i),
            i = 0),
            i = t.indexOf("</i>"),
            e.push("italic"),
            e.push(this.stripTags(t.substr(3, i - 3))),
            t = t.substr(i + 4)
        }
        return e
    }
    ,
    e.prototype.showSubtitles = function() {
        this.noSubtitles = !1,
        this.clearDisplay()
    }
    ,
    e.prototype.hideSubtitles = function() {
        this.noSubtitles = !0
    }
    ,
    e.prototype.onSeeking = function() {
        this.seeking = !0,
        this.clearDisplay()
    }
    ,
    e.prototype.onSeeked = function() {
        this.seeking = !1,
        this.forceRedraw = !0,
        this.updateDisplay()
    }
    ,
    e.prototype.onResize = function() {
        this.forceRedraw = !0,
        this.updateDisplay()
    }
    ,
    e.prototype.createEl = function() {
        var t = document.createElement("canvas");
        return t.className = "vjs-text-track-display",
        t
    }
    ,
    e.prototype.shouldRedraw = function(t) {
        if (this.noSubtitles)
            return !1;
        if (this.seeking)
            return !1;
        if (this.forceRedraw)
            return !0;
        if (this.cleared)
            return !0;
        if (this.activeCues.length !== t.length)
            return !0;
        for (var e = t.length - 1; 0 <= e; e--)
            if (t[e].text !== this.activeCues[e].text)
                return !0;
        return !1
    }
    ,
    e.prototype.updateForTrack = function(t) {
        var e = P[this.player_.trackIndex][this.player_.subLanguage]
          , i = t.activeCues;
        if (i) {
            var s, n = this.el_, o = n.getContext("2d"), r = [];
            for (s = 0; s < i.length; s++)
                r.push(i[s]);
            if (this.activeCues = this.activeCues || [],
            this.shouldRedraw(r)) {
                this.cleared = !1,
                this.forceRedraw = !1,
                this.activeCues = r;
                var a = this.player_.videoHeight()
                  , h = this.player_.videoWidth();
                if (0 !== a && 0 !== h) {
                    var d = this.player_.el_.clientHeight
                      , l = this.player_.el_.clientWidth
                      , u = h / a / (l / d);
                    1 < u ? (n.width = l,
                    n.height = l * a / h | 0) : u < 1 ? (n.height = d,
                    n.width = d * h / a | 0) : (n.width = l,
                    n.height = d),
                    n.style.marginLeft = (l - n.width) / 2 + "px",
                    n.style.marginTop = (d - n.height) / 2 + "px";
                    var c = 60 * n.height / 1080 | 0
                      , p = 1.1 * c;
                    o.clearRect(0, 0, n.width, n.height),
                    o.font = "bold " + c + "px Arial,sans-serif",
                    o.lineWidth = Math.max(8 * n.height / 1080, 4),
                    o.lineJoin = "round",
                    o.miterLimit = 2;
                    var g = {
                        start: {
                            start: [],
                            middle: [],
                            end: []
                        },
                        middle: {
                            start: [],
                            middle: [],
                            end: []
                        },
                        end: {
                            start: [],
                            middle: [],
                            end: []
                        }
                    };
                    s = r.length;
                    for (var v = null; s--; ) {
                        var m = r[s];
                        m && g[(v = e[m.text]).lineAlign][v.positionAlign].push(v.text)
                    }
                    for (var f in g)
                        if (g.hasOwnProperty(f))
                            for (var y in g[f])
                                if (g[f].hasOwnProperty(y)) {
                                    var b = this.prepareText(g[f][y].join("\n"));
                                    b = b.split("\n");
                                    for (var T = 0; T < b.length; T++) {
                                        v = this.vttTextToCanvas(b[T]);
                                        var k = 0
                                          , C = []
                                          , w = 0;
                                        for (k = 0; k < v.length; k += 2) {
                                            o.font = v[k] + " bold " + c + "px Arial,sans-serif";
                                            var S = o.measureText(v[k + 1]).width;
                                            C.push(S),
                                            w += S
                                        }
                                        var j = 0;
                                        for (k = 0; k < v.length; k += 2) {
                                            var E = 0
                                              , x = 0;
                                            E = "end" === f ? (o.textBaseline = "top",
                                            .1 * n.height + T * p) : "start" === f ? (o.textBaseline = "bottom",
                                            .9 * n.height - (b.length - T - 1) * p) : (o.textBaseline = "middle",
                                            n.height / 2 - b.length / 2 * p + T * p),
                                            x = "end" === y ? .9 * n.width - w + j : "start" === y ? .1 * n.width + j : .5 * (n.width - w) + j,
                                            E |= 0,
                                            x |= 0,
                                            o.font = v[k] + " bold " + c + "px Arial,sans-serif",
                                            o.fillStyle = "#000",
                                            o.strokeText(v[k + 1], x, E),
                                            o.fillStyle = "#FFF",
                                            o.fillText(v[k + 1], x, E),
                                            j += C[k / 2]
                                        }
                                    }
                                }
                }
            }
        }
    }
    ,
    e.prototype.clearDisplay = function() {
        var t = this.el_;
        t.getContext("2d").clearRect(0, 0, t.width, t.height),
        this.cleared = !0
    }
    ,
    videojs.registerComponent("TextTrackDisplay", e),
    _0xc4e9b7 = function() {
        a = "7fac1178830cfe0c"
    }
}(),
function() {
    var t = function() {
        var t, e = [t = 52324, t += -18405, t += 44678, t += -55864];
        e[2] = e[3] ^ e[2],
        e[1] = [e[2], e[2] = e[1]][0],
        e[0] = e[2] * e[3];
        for (var i = 1; i < 17; i++)
            e[1] += i;
        e[3] = [e[1], e[1] = e[3]][0],
        e[1] = e[0] ^ e[1],
        _0xc4e9b7(e.map(function(t) {
            return ("6750" + t.toString(16)).substr(-4)
        }).join(""))
    };
    t(),
    t = {}
}(),
function() {
    var t = videojs.getComponent("Component")
      , e = videojs.extend(t, {
        constructor: function() {
            t.apply(this, arguments),
            this.popupIsVisible = !1,
            this.initPopup(),
            this.el().addEventListener("click", videojs.bind(this, this.handleClick)),
            this.player_.el().addEventListener("click", videojs.bind(this, this.hidePopup))
        }
    });
    e.prototype.handleClick = function() {
        this.player_.paused() ? this.player_.play() : this.player_.pause(),
        this.hidePopup()
    }
    ,
    e.prototype.createEl = function() {
        var t = document.createElement("div");
        return t.className = "vjs-clickthrough",
        t.style.position = "absolute",
        t.style.top = "0",
        t.style.bottom = "0",
        t.style.left = "0",
        t.style.right = "0",
        this.popup = document.createElement("div"),
        this.popup.className = "adn-player-popup",
        this.popup.innerHTML = "<ul><li><strong>ADN Player</strong></li><li>version 1.7.15</li></ul>",
        t
    }
    ,
    e.prototype.showPopup = function(t) {
        var e = this.mousePositionElement(t);
        this.popupIsVisible && this.hidePopup(),
        this.popup.style.left = e.x + "px",
        this.popup.style.top = e.y + "px",
        this.el().appendChild(this.popup),
        this.popupIsVisible = !0
    }
    ,
    e.prototype.hidePopup = function() {
        this.popupIsVisible && (this.el().removeChild(this.popup),
        this.popupIsVisible = !1)
    }
    ,
    e.prototype.initPopup = function() {
        document.addEventListener("contextmenu", videojs.bind(this, function(t) {
            if ("vjs-clickthrough" === t.target.className || "vast-blocker" === t.target.className)
                return this.showPopup(t),
                void t.preventDefault();
            void 0 !== t.offsetParent && -1 < t.offsetParent.className.indexOf("adn-video-js") && t.preventDefault()
        }, !1))
    }
    ,
    e.prototype.mouseTarget = function(t) {
        var e;
        return t || (t = window.event),
        t.target ? e = t.target : t.srcElement && (e = t.srcElement),
        3 === e.nodeType && (e = e.parentNode),
        e
    }
    ,
    e.prototype.mousePositionDocument = function(t) {
        var e = 0
          , i = 0;
        return t || (t = window.event),
        t.pageX || t.pageY ? (e = t.pageX,
        i = t.pageY) : (t.clientX || t.clientY) && (e = t.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
        i = t.clientY + document.body.scrollTop + document.documentElement.scrollTop),
        {
            x: e,
            y: i
        }
    }
    ,
    e.prototype.findPos = function(t) {
        return {
            left: (t = t.getBoundingClientRect()).left + window.scrollX,
            top: t.top + window.scrollY
        }
    }
    ,
    e.prototype.mousePositionElement = function(t) {
        var e = this.mousePositionDocument(t)
          , i = this.mouseTarget(t)
          , s = this.findPos(i);
        return {
            x: e.x - s.left,
            y: e.y - s.top
        }
    }
    ,
    videojs.registerComponent("Clickthrough", e)
}(),
function() {
    var e = videojs.getComponent("Component")
      , t = videojs.extend(e, {
        constructor: function(t) {
            e.apply(this, arguments),
            t.on("adn.metaUpdated", videojs.bind(this, this.updateMeta)),
            this.updateMeta(),
            this.hide(),
            t.on("vast.adStart", videojs.bind(this, this.hide)),
            t.on("vast.contentStart", videojs.bind(this, this.show)),
            t.on("loadstart", videojs.bind(this, this.show))
        }
    });
    t.prototype.updateMeta = function() {
        var t = this.player_.getMetas();
        t.title && (this.titleContainer.innerHTML = t.title),
        t.subtitle && (this.subtitleContainer.innerHTML = t.subtitle),
        t.summary && (this.summaryContainer.innerHTML = t.summary),
        t.rating && (this.ratingValueContainer.style.width = (t.rating / 5 * 100 | 0) + "%")
    }
    ,
    t.prototype.createEl = function() {
        var t = document.createElement("div");
        t.className = "vjs-meta-display";
        var e = document.createElement("h2");
        e.className = "vjs-meta-title",
        t.appendChild(e),
        this.titleContainer = e;
        var i = document.createElement("div");
        i.className = "vjs-meta-subtitle",
        t.appendChild(i),
        this.subtitleContainer = i;
        var s = document.createElement("div");
        s.className = "vjs-meta-summary",
        t.appendChild(s),
        this.summaryContainer = s;
        var n = document.createElement("div");
        n.className = "vjs-meta-rating",
        t.appendChild(n),
        this.ratingContainer = n;
        var o = document.createElement("div");
        return o.className = "vjs-meta-rating-value",
        n.appendChild(o),
        this.ratingValueContainer = o,
        t
    }
    ,
    videojs.registerComponent("MetaDisplay", t)
}(),
ADNCountDown.prototype.sync = function() {
    var t = new Date
      , e = Math.round((this.endTime.getTime() - t.getTime()) / 1e3);
    e <= 0 && this.startPlayer();
    var i = e % 60
      , s = (e = (e - i) / 60) % 60
      , n = (e = (e - s) / 60) % 24
      , o = (e - n) / 24;
    i = ("00" + i).slice(-2),
    s = ("00" + s).slice(-2),
    n = ("00" + n).slice(-2),
    this.countdownNode.innerHTML = [o, n, s, i].join(":")
}
,
ADNCountDown.prototype.parseTime = function(t) {
    var e = t.split("T")
      , i = e[0].split("-")
      , s = e[1].split(":");
    return new Date(i[0],i[1] - 1,i[2],s[0],s[1],s[2].slice(0, -1))
}
,
ADNCountDown.prototype.deinit = function() {
    this.container.removeChild(this.node),
    clearTimeout(this.timer)
}
,
ADNCountDown.prototype.startPlayer = function() {
    this.deinit(),
    this.callback()
}
,
function() {
    var e = videojs.getComponent("MenuButton")
      , i = (videojs.getComponent("Button"),
    videojs.getComponent("MenuItem"))
      , o = videojs.extend(i, {
        constructor: function(t, e) {
            i.apply(this, arguments),
            this.language = e.language || null,
            this.resolution = e.resolution || null,
            this.switcher = e.switcher || null
        },
        handleClick: function() {
            var t = this.player_;
            this.resolution && t.setResolution(this.resolution),
            this.language && t.setSubLanguage(this.language)
        }
    })
      , t = videojs.extend(e, {
        constructor: function(t) {
            e.apply(this, arguments),
            t.on("vast.adStart", videojs.bind(this, this.hide)),
            t.on("vast.contentStart", videojs.bind(this, this.show)),
            t.on("adn.ready", videojs.bind(this, this.show)),
            t.on("adn.sourceSwitch", videojs.bind(this, this.update)),
            this.hide()
        }
    });
    t.prototype.show = function() {
        this.player_.getResolutions() && 1 < this.player_.getResolutions().length ? e.prototype.show.apply(this) : e.prototype.hide.apply(this)
    }
    ,
    t.prototype.buildCSSClass = function() {
        return "vjs-icon-hd " + e.prototype.buildCSSClass.call(this)
    }
    ,
    t.prototype.createItems = function(t) {
        t = t || [];
        for (var e = this.player_.resolution, i = this.player_.getResolutions(), s = 0; s < i.length; s++) {
            var n = this.localize("label_" + i[s]);
            "auto" === i[s] && "auto" === e && null != this.player_.currentAutoQuality && (n += " <small>(" + this.player_.currentAutoQuality + "p)</small>"),
            t.push(new o(this.player_,{
                label: n,
                selected: e === i[s],
                selectable: !0,
                resolution: i[s]
            }))
        }
        return t
    }
    ,
    videojs.registerComponent("ResolutionSwitcher", t);
    var s = videojs.extend(e, {
        constructor: function(t) {
            e.apply(this, arguments),
            t.on("vast.adStart", videojs.bind(this, this.hide)),
            t.on("vast.contentStart", videojs.bind(this, this.show)),
            t.on("adn.ready", videojs.bind(this, this.show)),
            t.on("adn.sourceSwitch", videojs.bind(this, this.update)),
            this.hide()
        }
    });
    s.prototype.show = function() {
        this.player_.getSubLanguages() && 1 < this.player_.getSubLanguages().length ? e.prototype.show.apply(this) : e.prototype.hide.apply(this)
    }
    ,
    s.prototype.buildCSSClass = function() {
        return "vjs-icon-subtitles " + e.prototype.buildCSSClass.call(this)
    }
    ,
    s.prototype.createItems = function(t) {
        t = t || [];
        for (var e = this.player_.subLanguage, i = this.player_.getSubLanguages(), s = 0; s < i.length; s++)
            t.push(new o(this.player_,{
                label: this.localize("label_" + i[s]),
                selected: e === i[s],
                selectable: !0,
                language: i[s]
            }));
        return t
    }
    ,
    videojs.registerComponent("LanguageSwitcher", s)
}(),
WebVTT = !0,
function() {
    var i = videojs.getComponent("Component")
      , t = videojs.extend(i, {
        constructor: function(t, e) {
            this.duration = 0,
            this.stopTime = 0,
            this.viewTime = 0,
            this.waitTime = 0,
            i.apply(this, arguments),
            this.refreshTime = 45,
            this.source = "Web",
            this.reset(),
            t.on("adn.syncHistory", videojs.bind(this, this.onSyncHistory)),
            t.on("adn.resetHistory", videojs.bind(this, this.reset)),
            t.on("timeupdate", videojs.bind(this, this.onTimeUpdate)),
            t.on("pause", videojs.bind(this, this.onPause)),
            t.on("play", videojs.bind(this, this.onPlay)),
            t.on("ended", videojs.bind(this, this.onEnded))
        }
    });
    t.prototype.reset = function() {
        this.duration = 0,
        this.stopTime = 0,
        this.viewTime = 0,
        this.waitTime = 0,
        this.forceUpdate = !0,
        this.initialPlay = !1,
        this.pauseTime = new Date,
        this.startTime = new Date,
        this.lastUpdateTime = new Date
    }
    ,
    t.prototype.update = function() {
        this.needUpdate() && (this.lastUpdateTime = new Date,
        this.viewTime = this.lastUpdateTime.getTime() / 1e3 - this.startTime.getTime() / 1e3 - this.waitTime,
        this.send())
    }
    ,
    t.prototype.send = function() {
        var i = this.player_
          , t = i.getHistoryUrl()
          , e = i.video.guid || null
          , s = i.getTargetDistribution();
        if (t && e) {
            var n = Math.round(this.viewTime);
            n < 0 && console.warn("Something wrong with viewTime", {
                viewTime: n,
                waitTime: this.waitTime,
                startTime: this.startTime,
                lastUpdateTime: this.lastUpdateTime
            }),
            i.requester.authRequest(t, "PUT", null, {
                guid: e,
                language: i.subLanguage || "unknown",
                quality: i.resolution || "unknown",
                viewtime: n < 0 ? 0 : n,
                stoptime: Math.round(this.stopTime),
                duration: Math.round(this.duration),
                source: this.source,
                distribution: s
            }, function(t, e) {
                e && 401 === e.code && (i.adnError.msg = this.localize("Pardon the interruption. Your session has expired. Please reload the page."),
                i.trigger("adn.error"))
            })
        } else
            i.trigger("adn.error")
    }
    ,
    t.prototype.needUpdate = function() {
        return !!this.initialPlay && (0 !== this.duration && (!(this.stopTime < 1) && (this.forceUpdate ? !(this.forceUpdate = !1) : (new Date).getTime() / 1e3 >= this.refreshTime + this.lastUpdateTime.getTime() / 1e3)))
    }
    ,
    t.prototype.onSyncHistory = function() {
        this.forceUpdate = !0,
        this.update()
    }
    ,
    t.prototype.onPlay = function() {
        this.updateWaitTime(),
        this.initialPlay || (this.initialPlay = !0)
    }
    ,
    t.prototype.onPause = function() {
        this.updateWaitTime()
    }
    ,
    t.prototype.onEnded = function() {
        this.forceUpdate = !0,
        this.update()
    }
    ,
    t.prototype.onTimeUpdate = function() {
        this.stopTime = this.player_.currentTime();
        var t = this.player_.duration();
        this.duration !== t && 0 < t && (this.duration = t),
        this.stopTime > this.duration && (this.stopTime = this.duration),
        this.update()
    }
    ,
    t.prototype.updateWaitTime = function() {
        if (this.player_.paused())
            this.pauseTime = new Date;
        else {
            var t = new Date;
            this.waitTime += t.getTime() / 1e3 - this.pauseTime.getTime() / 1e3
        }
    }
    ,
    videojs.registerComponent("History", t)
}(),
function() {
    var i = videojs.getComponent("Component")
      , t = videojs.extend(i, {
        constructor: function(t, e) {
            i.apply(this, arguments),
            this.options = e || [],
            t.on("vast.adStart", videojs.bind(this, this.hide)),
            t.on("vast.contentStart", videojs.bind(this, this.show)),
            t.on("loadstart", videojs.bind(this, this.show)),
            this.createDockEl(t)
        }
    });
    t.prototype.createEl = function() {
        var t = document.createElement("div");
        return t.className = "vjs-dock",
        this.list = document.createElement("ul"),
        this.list.className = "vjs-dock-list",
        t.appendChild(this.list),
        t
    }
    ,
    t.prototype.createDockEl = function(t) {
        if (0 !== this.options.length)
            for (var e = 0; e < this.options.length; e++) {
                var i = document.createElement("li");
                i.className = "vjs-dock-element",
                i.innerHTML = '<a href="' + this.options[e].url + '" target="_blank"><span class="vjs-icon-play-circle"></span> ' + this.options[e].title + "</a>",
                this.list.appendChild(i),
                i.addEventListener("click", function() {
                    t.pause()
                })
            }
    }
    ,
    videojs.registerComponent("Dock", t)
}(),
function() {
    var i = videojs.getComponent("Button")
      , t = videojs.extend(i, {
        constructor: function(t, e) {
            i.apply(this, arguments),
            t.on("adn.videoReady", videojs.bind(this, this.show)),
            this.controlText("Play next video"),
            this.hide()
        },
        handleClick: function() {
            this.player_.nextItem(!0)
        },
        buildCSSClass: function() {
            return "vjs-icon-next " + i.prototype.buildCSSClass.call(this)
        },
        show: function() {
            null == this.player_.getNextVideoUrl() || this.player_.getAdsEnabled() ? i.prototype.hide.apply(this) : i.prototype.show.apply(this)
        }
    })
      , e = videojs.extend(i, {
        constructor: function(t, e) {
            i.apply(this, arguments),
            t.on("adn.videoReady", videojs.bind(this, this.show)),
            this.controlText("Play previous video"),
            this.hide()
        },
        handleClick: function() {
            this.player_.previousItem(!0)
        },
        buildCSSClass: function() {
            return "vjs-icon-previous " + i.prototype.buildCSSClass.call(this)
        },
        show: function() {
            null == this.player_.getPreviousVideoUrl() || this.player_.getAdsEnabled() ? i.prototype.hide.apply(this) : i.prototype.show.apply(this)
        }
    });
    videojs.registerComponent("PreviousVideoButton", e),
    videojs.registerComponent("NextVideoButton", t)
}(),
function() {
    var s = videojs.getComponent("Component")
      , t = videojs.extend(s, {
        constructor: function(t, e) {
            s.apply(this, arguments),
            this.player = t;
            var i = e || {};
            this.autoNextVideo = i.autoNextVideo || !1,
            this.lastUpdateTime = new Date,
            this.duration = 0,
            this.mode = null,
            this.end = 1 / 0,
            this.introStart = void 0,
            this.introEnd = void 0,
            this.endingStart = void 0,
            this.endingEnd = void 0,
            this.bindButton(),
            this.hide()
        }
    });
    t.prototype.createEl = function() {
        this.buttonContainer = document.createElement("div"),
        this.buttonContainer.className = "vjs-dock vjs-dock-bottom vjs-dock-visible";
        var t = document.createElement("ul");
        return t.className = "vjs-dock-list",
        this.buttonContainer.appendChild(t),
        this.buttonElement = document.createElement("li"),
        this.buttonElement.className = "vjs-dock-element",
        this.buttonElement.innerHTML = '<a href="#"><span class="vjs-icon-play-circle"></span> <span class="text"></span></a>',
        t.appendChild(this.buttonElement),
        this.buttonContainer
    }
    ,
    t.prototype.syncButton = function(t) {
        this.buttonContainer.className = t ? "vjs-dock vjs-dock-bottom vjs-dock-visible" : "vjs-dock vjs-dock-bottom";
        var e = "";
        switch (this.mode) {
        case "skipIntro":
            e = this.localize("Skip intro");
            break;
        case "skipEnding":
            e = this.localize("Skip ending");
            break;
        case "skipToNext":
            e = this.localize("Next video")
        }
        this.buttonElement.getElementsByClassName("text")[0].innerText = e
    }
    ,
    t.prototype.bindButton = function() {
        this.player.on("timeupdate", videojs.bind(this, this.onTimeUpdate)),
        this.player.on("adn.videoReady", videojs.bind(this, this.setVideo)),
        this.buttonElement.addEventListener("click", videojs.bind(this, this.onClick))
    }
    ,
    t.prototype.setVideo = function() {
        this.duration = 0,
        this.mode = null;
        var t = this.player.getVideo();
        this.end = this.player.convertTimeCodeToSeconds(t.tcEpisodeEnd),
        this.introStart = this.player.convertTimeCodeToSeconds(t.tcIntroStart),
        this.introEnd = this.player.convertTimeCodeToSeconds(t.tcIntroEnd),
        this.endingStart = this.player.convertTimeCodeToSeconds(t.tcEndingStart),
        this.endingEnd = this.player.convertTimeCodeToSeconds(t.tcEndingEnd)
    }
    ,
    t.prototype.onClick = function(t) {
        switch (t.preventDefault(),
        this.mode) {
        case "skipIntro":
            this.player.currentTime(this.introEnd);
            break;
        case "skipEnding":
            this.player.currentTime(this.endingEnd);
            break;
        case "skipToNext":
            this.player.nextItem()
        }
        this.hide()
    }
    ,
    t.prototype.isReady = function() {
        return !((new Date).getTime() / 1e3 < .5 + this.lastUpdateTime.getTime() / 1e3) && (this.lastUpdateTime = new Date,
        !this.player.getAdsEnabled())
    }
    ,
    t.prototype.isIntro = function(t) {
        return void 0 !== this.introStart && void 0 !== this.introEnd && (!(this.introStart + 10 > this.introEnd) && (t >= this.introStart && t < this.introStart + 10 ? 2 : t >= this.introStart && t < this.introEnd - 1 && 1))
    }
    ,
    t.prototype.isEnding = function(t) {
        return void 0 !== this.endingStart && void 0 !== this.endingEnd && (!(this.endingStart + 10 > this.endingEnd) && (t >= this.endingStart && t < this.endingStart + 10 ? 2 : t >= this.endingStart && t < this.endingEnd - 1 && 1))
    }
    ,
    t.prototype.isNext = function(t) {
        if (null == this.player.getNextVideoUrl())
            return !1;
        if (!this.autoNextVideo)
            return !1;
        if (void 0 === this.end)
            return !1;
        if (0 === this.duration)
            return !1;
        if (this.duration < 60)
            return !1;
        var e = this.getEndTime();
        return e <= t && t < e + 20
    }
    ,
    t.prototype.getEndTime = function() {
        return isFinite(this.end) ? this.end : this.duration - 20
    }
    ,
    t.prototype.onTimeUpdate = function() {
        if (this.isReady()) {
            this.setDuration();
            var t = this.player.currentTime();
            if (t < 1 || 0 < this.duration && t > this.duration - 1)
                this.hide();
            else {
                if (this.isNext(t))
                    return this.mode = "skipToNext",
                    this.syncButton(!0),
                    void this.show();
                var e = this.isIntro(t);
                if (e)
                    return this.mode = "skipIntro",
                    this.syncButton(2 === e),
                    void this.show();
                var i = this.isEnding(t);
                if (i)
                    return this.mode = "skipEnding",
                    this.syncButton(2 === i),
                    void this.show();
                this.hide()
            }
        }
    }
    ,
    t.prototype.setDuration = function() {
        0 < this.duration || (this.duration = this.player.duration())
    }
    ,
    videojs.registerComponent("SkipButton", t)
}(),
function() {
    var n = null
      , h = null
      , e = 1;
    (ADNRequester = function(t) {
        this.refreshTokenUrl = t.refreshTokenUrl
    }
    ).prototype.setRefreshToken = function(t) {
        n = t
    }
    ,
    ADNRequester.prototype.getRefreshToken = function() {
        return n
    }
    ,
    ADNRequester.prototype.setAccessToken = function(t) {
        h = t
    }
    ,
    ADNRequester.prototype.setProfileId = function(t) {
        e = t || 1
    }
    ,
    ADNRequester.prototype.request = function(t, e, i, s, n) {
        var o = new XMLHttpRequest;
        if (o.addEventListener("error", function() {
            n(null, {
                message: "Request error.",
                code: 500
            })
        }),
        o.addEventListener("abort", function() {
            n(null, {
                message: "Request aborded.",
                code: 500
            })
        }),
        o.addEventListener("load", function() {
            if (200 == this.status) {
                t = this.responseText.trim();
                n(t, null)
            } else
                try {
                    var t = this.responseText.trim()
                      , e = JSON.parse(t);
                    n(null, {
                        message: e.message || "Unknown error.",
                        code: this.status
                    })
                } catch (t) {
                    n(null, {
                        message: t.message,
                        code: this.status
                    })
                }
        }),
        o.open(e, t),
        i)
            for (var r in i)
                o.setRequestHeader(r, i[r]);
        return s ? (o.setRequestHeader("Content-Type", "application/json"),
        o.send(JSON.stringify(s))) : o.send(),
        o
    }
    ,
    ADNRequester.prototype.authRequest = function(i, s, n, o, r) {
        if (null === h)
            return r(null, {
                message: "Missing parameters.",
                code: 500
            }),
            null;
        (n = n || {})["X-Player-Access-Token"] = h,
        n["X-Profile-ID"] = e;
        var a = this;
        return this.request(i, s, n, o, function(t, e) {
            e && 401 === e.code ? a.refreshToken(function(t) {
                t ? r(null, t) : a.authRequest(i, s, n, o, r)
            }) : r(t, e)
        })
    }
    ,
    ADNRequester.prototype.refreshToken = function(s) {
        if (null === n || null === this.refreshTokenUrl)
            return s(null, {
                message: "Missing parameters.",
                code: 500
            }),
            null;
        var t = {
            "X-Player-Refresh-Token": n
        };
        this.request(this.refreshTokenUrl, "POST", t, {
            onlyJWT: !0
        }, function(t, e) {
            if (e)
                s(e);
            else {
                var i = JSON.parse(t);
                h = i.accessToken,
                n = i.refreshToken,
                s(null)
            }
        })
    }
    ,
    ADNRequester.prototype.formatParameters = function(e) {
        return "?" + Object.keys(e).map(function(t) {
            return t + "=" + encodeURIComponent(e[t])
        }).join("&")
    }
}();
