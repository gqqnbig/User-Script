// ==UserScript==
// @name       Consistent Player Control - Youtube
// @namespace  gqqnbig
// @match  https://www.youtube.com/watch?*
// @grant       none
// @version     1.0
// @author      gqqnbig
// @description 2024/2/23下午11:35:42
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/shortcut@1
// ==/UserScript==


VM.shortcut.register('c-right', () => { document.querySelector(".html5-main-video").currentTime+=30 });
VM.shortcut.register('c-left', () => { document.querySelector(".html5-main-video").currentTime-=30 });