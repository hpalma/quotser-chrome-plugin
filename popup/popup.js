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
    let queryOptions = {active: true, currentWindow: true};
    chrome.tabs.query(queryOptions).then((tabs) => {
        if (
            tabs[0].url.startsWith("https://read.amazon.com/kp/notebook") ||
            tabs[0].url.startsWith("https://read.amazon.com/notebook")
        ) {
            (async () => {
                const quotes = await chrome.tabs.sendMessage(tabs[0].id, {function: "importHighlights"});
                sendQuotes(quotes);
            })();
        } else {
            chrome.tabs.create({
                url: "https://read.amazon.com/kp/notebook"
            });
        }
    })
}

async function sendQuotes(quotes) {
    const token = await chrome.storage.local.get("token");

    fetch('http://localhost:8000/api/quotes/import', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(quotes)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
        })
        .catch(error => {
            console.error(error);
            document.getElementById('error').textContent = 'Failed to import. Please try again later!';
            document.getElementById('error').style.display = 'block';
        });
}
