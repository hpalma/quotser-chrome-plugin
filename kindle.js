chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        switch (request.function) {
            case "importHighlights": {
                importHighlights(sendResponse);
                return;
            }
        }
    }
);

function importHighlights(sendResponse) {
    let title = document.querySelector('h3.kp-notebook-metadata').textContent;
    title = title.replace(/\(.*?\)/g, '').trim();

    let author = document.querySelector('p.kp-notebook-metadata.a-spacing-none').textContent;
    author = author.split(',')[0];

    let link = document.querySelector('a.kp-notebook-printable').href;

    let highlightElements = document.querySelectorAll('#highlight');
    let highlights = [];
    highlightElements.forEach(highlight => {
        highlights.push(highlight.textContent);
    });

    sendResponse({source: title, author: author, link: link, highlights: highlights});
}
