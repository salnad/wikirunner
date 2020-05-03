console.log("hello");

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        chrome.storage.local.get(['list', 'curr_pos'], function(result) { 
            chrome.storage.local.set({'curr_pos': result.curr_pos+1}, function() {
                console.log(request.message);
                console.log(result.list[result.curr_pos]);
                console.log('curr_pos updated to ' + result.curr_pos+1);
                if (result.curr_pos < result.list.length) {        
                    window.open($("a[title|='" + result.list[result.curr_pos] + "']").attr('href'), "_blank");
                    sendResponse({message: "opened next tab (from contentscript xoxo)"});
                }
            });
        });
        return true;
    }
);

