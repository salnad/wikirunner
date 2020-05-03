document.getElementById('click-start').addEventListener('click', auto_play);

function auto_play() {
    document.getElementById('status').innerHTML = "LOADING";
    // GET START/END PAGE FROM INPUT FIELD
    var start_page = document.getElementById("start-page").value;
    var end_page = document.getElementById("end-page").value;

    // CALL API TO GET LIST OF PAGES TO NAVIGATE
    var start_page = start_page.replace(' ', '+');
    var end_page = end_page.replace(' ', '+');

    // ASYCN CALL TO API -> SENDS MESSAGE TO BACKGROUND
    fetch(`http://127.0.0.1:5000/?src=${start_page}&dst=${end_page}`)
        .then(response => {
            return response.json();
        })
        .then(found_path => {
            document.getElementById('status').innerHTML = "READY";
            window.open(`https://en.wikipedia.org/wiki/${start_page.replace('+','_')}`);
            found_path['path'].shift();
            message = {
                // message: typeof(found_path),
                message: "please load this list of pages (from popup xoxo)",
                path: found_path['path']
            };
            chrome.runtime.sendMessage(message, function(response) {
                console.log(response.message);
            });
        });

    // SEND MESSAGE TO BACKGROUND SCRIPT
}

 