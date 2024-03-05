chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    if (request.action === 'scrapeData') {
      try {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.tabs.sendMessage(tabs[0].id, { action: 'executeScraping' });
      } catch (error) {
        console.error('Error occurred while scraping data:', error);
      }
    }
  });
  