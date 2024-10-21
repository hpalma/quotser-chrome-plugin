chrome.storage.local.get("token").then((result) => {
    const token = result.token;

    if (!token) {
        document.location = '/popup/token.html';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("importFromKindle").addEventListener("click", importFromKindle);
    document.getElementById("settings").addEventListener("click", function () {
        document.location = '/popup/settings.html';
    });
});

function importFromKindle() {
    let queryOptions = {active: true};
    let tab = chrome.tabs.query(queryOptions).then((tabs) => {
        if (
            tabs[0].url.startsWith("https://read.amazon.com/kp/notebook") ||
            tabs[0].url.startsWith("https://read.amazon.com/notebook")
        ) {
            (async () => {
                const quotes = await chrome.tabs.sendMessage(tabs[0].id, {function: "importHighlights"});
                console.log(quotes);
            })();
        } else {
            chrome.tabs.create({
                url: "https://read.amazon.com/kp/notebook"
            });
        }
    })
}