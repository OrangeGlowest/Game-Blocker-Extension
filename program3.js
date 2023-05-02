let whitelist = ['google.com', 'chess.com', 'deltamath.com', 'bing.com', 'github.com', 'kahoot.it', 'kahoot.com', 'blooket.com'];
let extension_blacklist = ['.io', '.fm'];
let url_blacklist = ['poki.com', 'game.fm', ''];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    let isInWhitelist = whitelist.some(whitelistedUrl => tab.url.includes(whitelistedUrl));
    if (!isInWhitelist) {
      let isInBlacklist = url_blacklist.some(blacklistedUrl => tab.url.includes(blacklistedUrl));
      if (isInBlacklist) {
        chrome.tabs.remove(tabId);
          alert("This game has been blocked.");
      } else {
        chrome.scripting.executeScript({
          target: {tabId: tab.id},
          function: () => {
            let domain = window.location.hostname;
            let shouldCloseTab = false;
            extension_blacklist.forEach(ext => {
              if (domain.endsWith(ext)) {
                shouldCloseTab = true;
              }
            });
            if (document.body.innerText.includes('game') || shouldCloseTab){
              chrome.runtime.sendMessage({closeTab: true});
            }
          }
        });
      }
    }
  }
});

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.closeTab) {
    chrome.tabs.remove(sender.tab.id);
  }
});
