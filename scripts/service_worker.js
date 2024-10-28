chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getActiveTabUrl") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length > 0) {
        var activeTab = tabs[0];
        var activeTabUrl = activeTab.url;
        sendResponse({ url: activeTabUrl });
        redirectUrl(activeTab, activeTabUrl);
      }
    });
    return true; // 表示异步响应
  }
});

// 对URl进行判断, 如果当前网站已经有了分支环境，则不进行重定向

// 判断是否符合重构的条件, 如果符合则重构并重定向
const redirectUrl = async (activeTab, url) => {
  const [requestAgreement, requestDomain] = url.split("//");
  const { isUsePrefix } = await chrome.storage.local.get("isUsePrefix");
  const { prefix } = await chrome.storage.local.get("prefix");
  if (isUsePrefix && requestDomain.split("---").length < 2) {
    const newUrl = requestAgreement + "//" + prefix + "---" + requestDomain;
    chrome.tabs.update(activeTab.id, { url: newUrl });
  }
};
