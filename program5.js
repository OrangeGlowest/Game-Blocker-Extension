chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && changeInfo.url.includes('poki.com')) {
    chrome.tabs.remove(tabId);
  }
});