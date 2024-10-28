const prefixList = [];

document.addEventListener("DOMContentLoaded", function () {
  const popupContent = document.querySelector(".popup_content");

  const isAddChecked = document.querySelector(".checkout");
  // 获取复选框的内容
  isAddChecked.addEventListener("click", function () {
    // 获取复选框的内容
    const isChecked = isAddChecked.checked;
    // 将复选框的内容存储到本地存储中
    chrome.storage.local.set({ isUsePrefix: isChecked });
    console.log("🚀 ~ isChecked:", isChecked);
  });

  // 获取输入框的内容
  const prefix = document.getElementById("prefix");
  prefix.addEventListener("input", function () {
    const value = prefix.value;
    // 将输入框的内容存储到本地存储中
    console.log("🚀 ~ value:", value);
    chrome.storage.local.set({ prefix: value });
  });

  // 点击增加按钮
  const addBtn = document.querySelector(".add_button button");
  addBtn.addEventListener("click", function () {});
});
// 在用户点击popup页面时，将数据回填到输入框中
chrome.storage.local.get(["isUsePrefix", "prefix"], function (result) {
  const isUsePrefix = result.isUsePrefix;
  const prefix = result.prefix;
  const checkout = document.querySelector(".checkout");
  checkout.checked = isUsePrefix;
  const input = document.getElementById("prefix");
  input.value = prefix;
});

console.log("popup.js");
