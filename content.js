var id = "menu-container";
var button_id = "command-set-button";
var video_url = "youtube.com/watch";

function createButton() {
    var button = document.getElementById(button_id);
    if(button == null){

        var style = `
            #command-set-button{

                border: none;
                width: 25px;
                height: 25px;
                background-color: transparent;
                background-repeat: no-repeat;

                background-size: 20px 20px;
                margin-left: 20px;
                background-position: 0 5px;
                transition: 0.1s;
                cursor: pointer;
                filter: brightness(100%);
            }
            #command-set-button:hover{
                filter: brightness(200%);
            }
            `
        
        var style_element = document.createElement("style");
        style_element.innerHTML = style; 

        var button = document.createElement("yt-icon");

        var img_source = "url('" + chrome.runtime.getURL('icons/grey/icon32.png') + "')";
        button.style.backgroundImage = img_source;
        button.id = button_id;
        button.className = "style-scope force-icon-button ytd-button-renderer style-text";
        button.type = "button";

        var element = document.querySelector('div#info').querySelector('div#container').querySelector('div#info');
        
        element.appendChild(style_element);
        element.appendChild(button);

        button.addEventListener('click', function event(){
            copyLink();
            button.style.filter = "invert(14%) sepia(97%) saturate(7408%) hue-rotate(7deg) brightness(126%) contrast(119%";
        });
    }
    else{
        button.parentNode.removeChild(button);
        createButton()
    }
}

function waitForElement(selector, time) {
    try{
        createButton();
    }
    catch{
            setTimeout(function() {
                waitForElement(selector, time);
            }, time);
    }
}

function copyLink()
{
    try{
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
    }
    catch{
        alert("ERROR! \nCommand Prefix couldn't be retrieved or copying to clipboard failed!\nMake sure that you have a prefix set.");
    }
}


//Listen to navigation calls from the background script
chrome.runtime.onMessage.addListener(createButton);

// On page reload; if page is a YouTube Watch page -> wait for the button elements
// to load and then add the button 
if(location.href.includes(video_url)){
    waitForElement(id, 500);
};