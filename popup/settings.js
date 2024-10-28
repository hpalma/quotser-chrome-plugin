document.addEventListener('DOMContentLoaded', async function () {
    let settings = await chrome.storage.local.get("settings");
    settings = settings.settings;

    document.getElementById("importAsPrivate").checked = settings.importAsPrivate;

    document.getElementById("back").addEventListener("click", function () {
        document.location = '/popup/popup.html';
    });

    document.getElementById("importAsPrivate").addEventListener("change", async function () {
        let settings = await chrome.storage.local.get("settings");
        settings = settings.settings;

        settings.importAsPrivate = document.getElementById("importAsPrivate").checked;

        chrome.storage.local.set({'settings': settings});
    });
});
