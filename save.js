//Handles prefic saving to browser memory

document.getElementById("submit-save").addEventListener("click", submit);
function submit(){
       var prefix = document.getElementById("command-prefix").value.trim();
       if(!prefix){
           alert("You didn't input a prefix");
           return;
       }
       try{
        chrome.storage.sync.set({'command_prefix': prefix}, function(result){
        });
       }
       catch{
           alert('Prefix saving failed');
       }
}

//When popup loads, retrieve command-prefix form memory
try{
    chrome.storage.sync.get('command_prefix', function(result) {
        //if memory is set, retrieve the value
        if(result != undefined){
            document.getElementById("command-prefix").placeholder = result.command_prefix;
        }

        //if memory is not set, try set a default value of !play
        else{
            try{
                chrome.storage.sync.set({'command_prefix': '!play'}, function(result){
                    document.getElementById("command-prefix").placeholder = '!play';
                });
            }
            catch{
                alert('Error in setting a default prefix value to memory!');
            }

        }
      });
    }
//Shouldn't really get here
catch{
    document.getElementById("command-prefix").placeholder = '!play';
}

