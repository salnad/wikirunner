chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
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
    return true;
});