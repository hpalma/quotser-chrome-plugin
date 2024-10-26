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

    let highlightElements = document.querySelectorAll('#highlight');
    let highlights = [];
    highlightElements.forEach(highlight => {
        highlights.push(highlight.textContent);
    });

    sendResponse({title: title, author: author, highlights: highlights});
}
