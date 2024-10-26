document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("linkToToken").href = BASE_URL + "api-token";

    var form = document.getElementById("api-token-form")
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!document.getElementById("token").value) {
            document.getElementById('error').textContent = 'You need to provide a value for the API token';
            document.getElementById('error').style.display = 'block';
            return;
        }

        chrome.storage.local.set({'token': document.getElementById("token").value});
        document.location = '/popup/popup.html';
    })
});

chrome.storage.local.get("token").then((result) => {
    const token = result.token;

    if (token) {
        document.location = '/popup/popup.html';
    }
});
