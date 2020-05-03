document.getElementById('click-start').addEventListener('click', auto_play);

function auto_play() {
    // GET END PAGE FROM INPUT FIELD
    // var end_page = document.getElementById("end-page").value;
    var end_page = ['Mathematics','Geometry'];
    // CALL API TO GET LIST OF PAGES TO NAVIGATE

    // SEND MESSAGE TO BACKGROUND SCRIPT
    message = {
        action: "popup",
        path: end_page
    };
    chrome.runtime.sendMessage(message, function(response) {
        console.log(response.action);
    });
}

 