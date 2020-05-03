// EVENT LISTENER FOR CLICK FROM POPUP BUTTON
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        // FROM POPUP (1. Initialize List / Curr Pos in local storage. 2. Send to initial "next page" call)

        // FROM CONTENT-SCRIPT (1. )
        if (request.action === "popup") {
            chrome.storage.local.set({'list': request.path}, function() {
                console.log('List set to ' + request.path);
            });
            
            chrome.storage.local.set({'curr_pos': 0}, function() {
                console.log('Current Position set to ' + 0);
            });
        }

        chrome.storage.local.get(['list', 'curr_pos'], function(result) {
            console.log('message recived in background!');
            console.log(result);
        });

        // OPENS NEW TAB
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log(tabs);
            console.log("Hello!");
            chrome.tabs.sendMessage(tabs[0].id, { action: "background" }, function(response) {
                console.log(request);
            });
        });
        sendResponse({action: "successfully accomplished"});
    }
);

/*
    // CLICK THAT OPENS IN NEW TAB
    window.open($("a[title|='District Council of Elliston']").attr('href'));
    
    // CLICK THAT OPENS IN CURRENT TAB
    $(function(){ 
        window.location.href = $("a[title|='District Council of Elliston']").attr('href');
    });
*/



// chrome.tabs.onUpdated.addListener(function() {
//     console.log("Executed");
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//         chrome.tabs.executeScript(tabs[0].id, { file: "jquery-3.5.0.slim.min.js" }, function() {
//             chrome.tabs.executeScript(tabs[0].id, {code: 
//                 `
//                 if (jQuery) {
//                     console.log("jQuery loaded!");
//                 };
//                 console.log($("a[title|='District Council of Elliston']")[0]);
//                 $("a[title|='District Council of Elliston']")[0].click();

//                 // $(function(){
//                 //     window.location.href = $("a[title|='District Council of Elliston']").attr('href');
//                 // });
//                 `
//             });
//         });
        
//     });
// });

/*
        chrome.tabs.executeScript(tabs[0].id, { file: "jquery-3.5.0.slim.min.js" }, {code: 
            `
            if (jQuery) {
                console.log("jQuery loaded!");
            };
            // $(function(){
            //     window.location.href = $("a[title|='District Council of Elliston']").attr('href');
            // });
            `
        });
*/