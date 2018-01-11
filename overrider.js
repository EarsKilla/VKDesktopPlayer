// ==UserScript==
// @name         VK Desktop Player
// @version      0.1
// @description  Music forwarder.
// @author       EarsKilla#0697
// @match        *://*.vk.com/*
// @match        *://vk.com/*
// @grant        none
// ==/UserScript==

(function() {
    window.getAudioPlayer().__proto__.toggleAudio = function(t, e) {
            if (vk && vk.widget && !vk.id && window.Widgets)
                return Widgets.oauth(),
                !1;
            if (domClosest("_audio_row__tt", e.target))
                return cancelEvent(e);
            var i = domClosest("_audio_row", t), o = AudioUtils.getAudioFromEl(i, !0);
            if (window.getSelection && window.getSelection().rangeCount) {
                var a = window.getSelection().getRangeAt(0);
                if (a && a.startOffset != a.endOffset)
                    return !1;
            }
            if (e && hasClass(e.target, "mem_link"))
                return nav.go(attr(e.target, "href"), e, {
                    navigateToUploader: !0
                }),
                cancelEvent(e);
            if (hasClass(e.target, "_audio_row__title_inner") && o.lyrics && !o.isInAttach)
                return AudioUtils.toggleAudioLyrics(i, o),
                cancelEvent(e);
            if (hasClass(e.target, "audio_row__performer"))
                return checkEvent(e) || vk.widget ? !0 : (AudioUtils.audioSearchPerformer(e.target, o.performer, e),
                cancelEvent(e));
            var s = cur.cancelClick || e && (hasClass(e.target, "audio_lyrics") || domClosest("_audio_duration_wrap", e.target) || domClosest("_audio_inline_player", e.target) || domClosest("audio_performer", e.target));
            if (cur._sliderMouseUpNowEl && cur._sliderMouseUpNowEl == geByClass1("audio_inline_player_progress", i) && (s = !0),
            delete cur.cancelClick,
            delete cur._sliderMouseUpNowEl,
            s)
                return !0;
            if (AudioUtils.isClaimedAudio(o) || o.isReplaceable) {
                var r = AudioUtils.getAudioExtra(o), l = r.claim;
                if (l)
                    return void (hasClass(i, "no_actions") || o.isInEditBox || showAudioClaimWarning(o, l, AudioUtils.replaceWithOriginal.bind(AudioUtils, i, o)));
            }
            if (o.isPlaying) {
                //this.pause();
            }
            else {
                var msgId = i.parentElement.parentElement.parentElement.parentElement.dataset.msgid;
                httpGetAsync("http://127.0.0.1:27700/playmsg?audio=" + o.fullId + "&msgid=" + msgId, function(e){ });
                //var n = AudioUtils.getContextPlaylist(i);
                //this.play(o.fullId, n.playlist, o.context || n.context);
                //if (cur.audioPage) cur.audioPage.onUserAction(o, n.playlist);
            }
            AudioUtils.onRowOver(i, !1, !0);
};

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
})();
