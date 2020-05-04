// RECIEVE MESSAGE FROM POPUP -> LOADS DATA INTO LOCAL STORAGE -> SENDS FIRST MESSAGE TO CONTENT
chrome.runtime.onMessage.addListener(    
    function(request, sender, sendResponse) {
        console.log(request.message);
        console.log(request.path);
        chrome.storage.local.set({'list': request.path}, function() {
            chrome.storage.local.set({'curr_pos': 0}, function() {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { message: "please open FIRST tab (from background xoxo)" }, function(response) {
                        console.log(response.message);
                    });
                });
                sendResponse({message: "succesfully loaded pages (from background xoxo)"});
            });
        });
        return true;
    }
);

// UPDATES WHENEVER NEW TAB CREATED & THAT TAB IS UPDATED (hacky, need to make more secure) -> SENDS MESSAGE TO CONTENT SCRIPT
chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab) {
    if (changeInfo.status === "complete") {
        chrome.tabs.sendMessage(tab.id, { message: "please open next tab (from background xoxo)" }, function(response) {
            console.log(response.message);
        });
    }
});