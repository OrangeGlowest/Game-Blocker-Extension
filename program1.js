let whitelist = ['google.com', 'chess.com', 'deltamath.com', 'bing.com', 'github.com'];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    let isInWhitelist = whitelist.some(whitelistedUrl => tab.url.includes(whitelistedUrl));
    if (!isInWhitelist) {
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: () => {
          if (document.body.innerText.includes('game') || tab.url.endsWith('.io') || tab.url.endsWith('.fm')){
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