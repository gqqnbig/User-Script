// ==UserScript==
// @name         Stackexchange 方便的引用
// @namespace    gqqnbig.me
// @version      0.1
// @description  在Stackexchange旗下站点，当按了cite按钮后，自动生成gqqnbig.me博客的引用格式。
// @author       gqqnbig
// @match        https://*.stackexchange.com/questions/*
// @match	     https://*.stackoverflow.com/questions/*
// @match	     https://serverfault.com/questions/*
// @match	     https://superuser.com/questions/*
// @match	     https://askubuntu.com/questions/*
// @match	     https://stackapps.com/questions/*
// @match	     https://mathoverflow.net/questions/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function formatToday(){
        var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return year+"-"+month+"-"+day;
    }


    $(".cite-link").click(function() {
        let handle = setInterval(()=> {
            let $textarea=$(this).parentsUntil(".grid").find("*[id^='cite-popup'] textarea");
            if($textarea.length==0)
                return;
            clearInterval(handle);
            let bib=$textarea.val();


            let blogCite=(`[CiteWeb author="${bib.match(/AUTHOR\s*\=\s*{(.*)\s\(http/im)[1]}" url=\"${bib.match(/url\s*\=\s*{(.*)},?$/im)[1]}" title="${bib.match(/title\s*\=\s*{(.*)},?$/im)[1]}" publisher="${bib.match(/HOWPUBLISHED\s*\=\s*{(.*)},?$/im)[1]}" date="${bib.match(/NOTE\s*\=\s*{.+\(version:\s(.*)\)},?$/im)[1]}" accessdate="${formatToday()}"]`);


            $textarea.after($("<p>").text(blogCite));

        },100);

    })
})();