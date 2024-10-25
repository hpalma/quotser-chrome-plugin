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
