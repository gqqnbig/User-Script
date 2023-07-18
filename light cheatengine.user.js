// ==UserScript==
// @name        No dark on cheatengine.org
// @namespace   gqqnbig.me
// @match       https://forum.cheatengine.org/*
// @match       https://www.cheatengine.org/forum/*
// @grant       GM_addStyle
// @version     1.0
// @author      gqqnbig
// @description Recover light theme on cheatengine.org.
// ==/UserScript==

GM_addStyle(`body,.bodyline,.forumline,td.row1 {
  background-color: white;
}`);
