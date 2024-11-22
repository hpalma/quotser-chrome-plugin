let settings = chrome.storage.local.get("settings");

if (settings === undefined || Object.keys(settings).length === 0) {
    chrome.storage.local.set(
        {
            'settings':
                {'importAsPrivate': true}
        }
    );
}

chrome.storage.local.get('token', (result) => {
    if (result.token) {
        chrome.action.setPopup({popup: 'popup/popup.html'});
    } else {
        chrome.action.setPopup({popup: 'popup/token.html'});
    }
});

chrome.runtime.onStartup.addListener( () => {
    console.log(`onStartup()`);
});
