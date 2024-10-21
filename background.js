chrome.storage.local.get('token', (result) => {
    if (result.token) {
        chrome.action.setPopup({popup: 'popup/popup.html'});
    } else {
        chrome.action.setPopup({popup: 'popup/token.html'});
    }
});
