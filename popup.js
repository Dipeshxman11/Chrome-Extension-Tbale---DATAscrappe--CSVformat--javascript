
// Add an event listener to send a message to the background script when the "Scrape Data" button is clicked
document.addEventListener('DOMContentLoaded', function () {
    let scrapeButton = document.getElementById('scrapeButton');
    if (scrapeButton) {
        scrapeButton.addEventListener('click', async function () {
            try {
                await chrome.runtime.sendMessage({ action: 'scrapeData' });
            } catch (error) {
                console.error('Error occurred while sending message:', error);
            }
        });
    }
});
