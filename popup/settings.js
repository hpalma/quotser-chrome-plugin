chrome.storage.local.get("importAsPrivate").then((result) => {
    let importAsPrivate = result.importAsPrivate;

    if (importAsPrivate === undefined) {
        chrome.storage.local.set({'importAsPrivate': true});
        importAsPrivate = true;
    }

    document.getElementById("importAsPrivate").checked = importAsPrivate;
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("back").addEventListener("click", function () {
        document.location = '/popup/popup.html';
    });

    document.getElementById("importAsPrivate").addEventListener("change", function () {
        chrome.storage.local.set({'importAsPrivate': document.getElementById("importAsPrivate").checked});
    });
});
