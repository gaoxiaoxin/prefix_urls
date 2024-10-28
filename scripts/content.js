chrome.runtime.sendMessage({ action: "getActiveTabUrl" }, function (response) {
  var activeTabUrl = response.url;
  console.log("当前网站已被重定向到", activeTabUrl);
  console.log("来自URL前缀添加插件");
});
