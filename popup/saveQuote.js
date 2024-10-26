async function saveQuote() {
    let queryOptions = {active: true, currentWindow: true};
    currentTab = (await chrome.tabs.query(queryOptions))[0];

    result = await chrome.scripting
        .executeScript({
            target: {tabId: currentTab.id},
            func: function () {
                return window.getSelection().toString();
            },
        });

    selection = result[0].result;

    if (!selection) {
        document.getElementById('error').textContent = 'Please select text to save.';
        document.getElementById('error').style.display = 'block';
        return;
    }

    chrome.tabs.create({
        url: BASE_URL + 'quote?text=' + btoa(selection)
    });
}
