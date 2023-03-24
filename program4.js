let whitelist = ['google.com', 'chess.com', 'deltamath.com', 'bing.com'];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    let isInWhitelist = false;
    for (let i = 0; i < whitelist.length; i++) {
      if (tab.url.includes(whitelist[i])) {
        isInWhitelist = true;
        break;
      }
    }
    if (!isInWhitelist) {
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: () => {
          if (document.body.innerHTML.includes('game')) {
            chrome.runtime.sendMessage({closeTab: true});
          }
        }
      });
    }
  }
});

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.closeTab) {
    chrome.tabs.remove(sender.tab.id);
  }
});