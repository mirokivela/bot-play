//Listen for navigations, if url is youtube and has watch in it, then send a message to content script
chrome.webNavigation.onHistoryStateUpdated.addListener(newVideo, {url: [{pathContains: "watch", hostSuffix: "youtube.com"}]});

function newVideo(tab){
	let msg = {
		value: true
	}
	chrome.tabs.sendMessage(tab.tabId, msg);
};
