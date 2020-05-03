chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // log message from popup
        console.log(request.message);
        chrome.storage.local.set({'list': request.path}, function() {
            chrome.storage.local.set({'curr_pos': 0}, function() {
                sendResponse({message: "succesfully loaded pages (from background xoxo)"});
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { message: "please open next tab (from background xoxo)" }, function(response) {
                        console.log(response.message);
                    });
                });
            });
        });
        return true;
    }
);

chrome.tabs.onCreated.addListener(function(cr_tab){
    chrome.tabs.onUpdated.addListener(function (up_tabId, up_changeInfo, up_tab) {
        console.log("something was created!");
        console.log(up_tabId)
        console.log(up_changeInfo.status)
        if (up_changeInfo.status == 'complete' && up_tab.id == cr_tab.id) {
            chrome.tabs.sendMessage(cr_tab.id, { message: "please open next tab (from background xoxo)" }, function(response) {
                console.log(response.message);
            });
        }
        return true;
    });
    // chrome.tabs.sendMessage(tab.id, { message: "please open next tab (from background xoxo)" }, function(response) {
    //     console.log(response.message);
    // });
    return true;
});








// // EVENT LISTENER FOR CLICK FROM POPUP BUTTON
// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {

//         // FROM POPUP (1. Initialize List / Curr Pos in local storage. 2. Send to initial "next page" call)

//         // FROM CONTENT-SCRIPT (1. )
//         if (request.action === "popup") {
//             chrome.storage.local.set({'list': request.path}, function() {
//                 console.log('List set to ' + request.path);
//             });
            
//             chrome.storage.local.set({'curr_pos': 0}, function() {
//                 console.log('Current Position set to ' + 0);
//             });
//         }

//         chrome.storage.local.get(['list', 'curr_pos'], function(result) {
//             console.log('message recived in background!');
//             console.log(result);
//         });

//         // OPENS NEW TAB
//         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//             console.log(tabs);
//             chrome.tabs.sendMessage(tabs[0].id, { action: "background" }, function(response) {
//                 console.log(request);
//             });
//             sendResponse({action: "accomplished"});
//         });
//         return true;   
//     }
// );

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