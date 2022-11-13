chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (!observer_online) {
			waitForElement(id, 500);
		}
	}
);

var id = "#below #top-row #top-level-buttons-computed";
var button_id = "command-set-button";
var video_url = "youtube.com/watch";
var observer_online = false

function createButton() {
	var button = document.getElementById(button_id);
	if (button == null) {
		const observer = new MutationObserver(function(mutations_list) {
			mutations_list.forEach(function(mutation) {
				mutation.removedNodes.forEach(function(removed_node) {
					if (removed_node.id == button_id) {
						observer.disconnect();
						observer_online = false
						waitForElement(id, 500);
					}
				});
			});
		});
		observer.observe(document.querySelector(id), {
			subtree: false,
			childList: true
		});
		observer_online = true
		var style = `
		    #command-set-button{
			position: relative;
			background-repeat: no-repeat;
			aspect-ratio: 1/1;
			background-size: 50%;
			margin-left: 20px;
			background-position: 50%;
			transition: 0.1s;
			cursor: pointer;
			filter: brightness(150%);
		    }
		    `
		var style_element = document.createElement("style");
		style_element.innerHTML = style;

		var button = document.createElement("button");

		var img_source = "url('" + chrome.runtime.getURL('icons/grey/icon32.png') + "')";
		button.style.backgroundImage = img_source;
		button.id = button_id;
		button.className = "yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading";

		button.type = "button";
		var element = document.querySelector(id);
		element.appendChild(style_element);
		element.appendChild(button);
		button.addEventListener('click', function event() {
			copyLink();
			button.style.filter = "invert(14%) sepia(97%) saturate(7408%) hue-rotate(7deg) brightness(126%) contrast(119%";
		});
	}
}

function waitForElement(selector, time) {
	try {
		createButton();
	} catch {
		setTimeout(function() {
			waitForElement(selector, time);
		}, time);
	}
}

function copyLink() {
	try {
		chrome.storage.sync.get('command_prefix', function(result) {
			var prefix = result.command_prefix;
			console.log(prefix);
			var dummy = document.createElement('input'),
				text = location.href;
			document.body.appendChild(dummy);
			dummy.value = prefix + " " + text;
			dummy.select();
			document.execCommand('copy');
			document.body.removeChild(dummy);
		});
	} catch {
		alert("ERROR! \nCommand Prefix couldn't be retrieved or copying to clipboard failed!\nMake sure that you have a prefix set.");
	}
}

// On page reload; if page is a YouTube Watch page -> wait for the button elements
// to load and then add the button 
if (location.href.includes(video_url)) {
	waitForElement(id, 500)
};
