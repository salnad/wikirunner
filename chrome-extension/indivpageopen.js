chrome.runtime.onMessage.addListener(
    function(request, sender, senderResponse) {
        chrome.storage.local.get(['list', 'curr_pos'], function(result) { 
            chrome.storage.local.set({'curr_pos': result.curr_pos+1}, function() {
                console.log('Current Position is set to ' + result.curr_pos+1);
            });
            if (result.curr_pos < result.list.length) {        
                // console.log(result.list.slice(0,1));
                // console.log($("a[title|='" + result.list[result.curr_pos] + "']"));
                window.open($("a[title|='" + result.list[result.curr_pos] + "']").attr('href'));
                chrome.runtime.sendMessage({action: "content"}, function(response) {
                    console.log(response.action);
                });
            }
        });
    }
);








// chrome.storage.local.get(['list', 'curr_pos'], function(result) { 
//     chrome.storage.local.set({'curr_pos': result.curr_pos+1}, function() {
//         console.log('Value is set to ' + result.curr_pos+1);
//     });
    
//     if (result.curr_pos < result.list.length) {        
//         chrome.tabs.getCurrent(function (tab) {
//             console.log(tab.id);
//         });
//         window.open($("a[title|='" + result.list[result.curr_pos] + "']").attr('href'));
//         console.log("Hello");
//     }
// });

/*
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.executeScript(tabs[0].id, { file: "jquery-3.5.0.slim.min.js" }, function(t) {
                chrome.tabs.executeScript(null, { code: 
                    `
                    
                    `
                });
            });
            chrome.tabs.sendMessage(tabs[0].id, {"message": "continue"}, function(response) {});
        }); 
*/



