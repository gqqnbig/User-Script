// ==UserScript==
// @name         ASP.NET Error Page Enhancer
// @namespace    https://gqqnbig.me/
// @version      0.1
// @description  Enhace the ASP.NET error page. Change file paths to links so you can click and open the file in Visual Studio.
// @match        *://localhost:*/*
// @match        *://localhost/*
// @author       gqqnbig
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @grant        

// ==/UserScript==

/// <reference path="jquery-1.8.2.intellisense.js" />


$(() =>
{
	'use strict';
	let $h1 = $("span>h1");
	if ($h1.length === 0 || $h1.text().startsWith("Server Error in") === false)
		return;


	highlightOutermostException();

	convertPathToLink();


	function highlightOutermostException()
	{
		let $stackTracePre = $("table pre").eq(1);
		let pre = $stackTracePre.html();
		let regex = /\[\w+(:.*?)?]/g;
		let match;
		let lastMatch;
		while ((match = regex.exec(pre)) !== null)
		{
			lastMatch = match;
		}
		if (lastMatch)
		{
			let p = lastMatch.index;
			pre = pre.substr(0, p) + pre.substr(p).replace(/(\[\w+(:.*?)?])/, "<h2><i>$1</i></h2>");
			$stackTracePre.html(pre);
		}
	}

	function convertPathToLink()
	{
		let $sourceFile = $("b").filter(function ()
		{
			return $(this).text().trim() === "Source File:";
		});

		let pathElement = $sourceFile[0].nextSibling;
		let path = pathElement.nodeValue.trim();

		const $pathLink = $(`<a href='vs:${path}'>` + path + "</a>");
		$pathLink.insertAfter($sourceFile);
		$(pathElement).detach();
		$pathLink.before(document.createTextNode(" "));
		$pathLink.after(document.createTextNode(" "));
	}
});
