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


aiSummary = document.querySelector("[data-q]:has([data-streaming-container])")

async function probe(targetUrl, timeoutMs = 5000) {
	const ac = new AbortController();
	const timer = setTimeout(() => ac.abort(), timeoutMs);
	try {
		await fetch(targetUrl, {
			method: 'GET',
			mode: 'no-cors',
			signal: ac.signal,
			cache: 'no-store',            // don't read or pollute the HTTP cache
			credentials: 'omit',          // no cookies -> much smaller request headers
			referrerPolicy: 'no-referrer',// drops the Referer header
			//redirect: 'manual',           // don't spend round-trips following 3xx
			priority: 'low',              // fetchPriority hint (Chromium)
			headers: {'Range': 'bytes=0-0'}, // ask for 1 byte
		});
		return true;   // headers arrived => host is reachable
	} catch (error) {
		console.log("1:" + error);
		return false;
	} finally {
		clearTimeout(timer);
		ac.abort();    // <- the important one: kills the body download
	}
}

setTimeout(() => {
	document.querySelectorAll('#search a[data-ved]').forEach((element) => {
		//console.log(element.href);
		probe(element.href).then((res) => {
			if (!res) {
				console.log(`remove ${element.href}`);
				element.closest('[data-rpos]').remove();
			}
		}).catch((error) => {
			// TypeError if the request is blocked or there is no network connection.
			console.log("2:" + error);
		});
	});
}, 1000);
