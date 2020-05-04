chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        chrome.storage.local.get(['list', 'curr_pos'], function(result) { 
            chrome.storage.local.set({'curr_pos': result.curr_pos+1}, function() {
                console.log(request.message);
                console.log(result.list[result.curr_pos]);
                console.log('curr_pos updated to ' + result.curr_pos+1);
                if (result.curr_pos < result.list.length) {        
                    console.log(result.list[result.curr_pos]);
                    console.log($("a[title='" + result.list[result.curr_pos] + "']"));
                    console.log($("a[title='" + result.list[result.curr_pos] + "']").length);
                    if($("a[title='" + result.list[result.curr_pos] + "']").length > 0) {   
                        $("a[title='" + result.list[result.curr_pos] + "']")[0].click();
                        sendResponse({message: "opened next tab (from contentscript xoxo)"});
                    } else if ($("a[title*='" + result.list[result.curr_pos] + "']").length > 0) {
                            $("a[title*='" + result.list[result.curr_pos] + "']")[0].click();
                            sendResponse({message: "opened next tab (from contentscript xoxo)"});
                    } else {
                        sendResponse({message: `CAN'T open ${result.list[result.curr_pos]} (from contentscript xoxo)`});
                    }
                }
            });
        });
        return true;
    }
);
