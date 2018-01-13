// ==UserScript==
// @name         VK Desktop Player
// @version      1.0
// @description  Music forwarder.
// @author       EarsKilla#0697
// @match        *://*.vk.com/*
// @match        *://vk.com/*
// @updateURL https://earskilla.github.io/VKDesktopPlayer/overrider.js
// ==/UserScript==

var script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.src = "//earskilla.github.io/VKDesktopPlayer/forwarder.js";
document.head.appendChild(script);
