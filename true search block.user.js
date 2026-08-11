// ==UserScript==
// @name        Hide Blocked Search Results
// @namespace   gqqnbig.me
// @version     1.0
// @match       *://www.google.com/search*
// @match       *://google.com/search*
// @grant       none
// @author      gqqnbig
// @description
// ==/UserScript==


resource = `
||vpnfast.github.io*^$document
||sites.google.com/view/best-china-vpn/*^$document
||overwallvpn.com/*^$document
||howandbest.com/*^$document
||github.com/howandbest*^$document
||howandbest.github.io/*^$document
||github.com/topvpntool*^$document
`;

rules = new Array();
for (const m of resource.matchAll(/^\|\|(.+)\^\$(document|all)/gm)) {
	var template = m[1];
	while (template.endsWith('*') || template.endsWith('/'))
		template = template.substring(0, template.length - 1);

	i = template.indexOf('/');
	if (i != -1) {
		domain = template.substring(0, i);
		path = template.substring(i);
	} else {
		domain = template;
		path = null;
	}
	rules.push([domain, path])
}

function isLinkBlocked(link) {
	var linkUrl = new URL(link);
	for (const rule of rules) {
		if (linkUrl.hostname.endsWith(rule[0])) {
			if (rule[1]) {
				if (linkUrl.pathname.startsWith(rule[1]))
					return true;
			} else
				return true;
		}
	}
	return false;
}

setTimeout(() => {
	document.querySelectorAll('#search a[data-ved]').forEach((element) => {
		//console.log(element.href);
		if (!element.href.startsWith('http://') && !element.href.startsWith('https://'))
			return;
		if (isLinkBlocked(element.href)) {
			console.log(`remove ${element.href}`);
			element.closest('[data-rpos]').remove();

		}
	});
}, 1000);
