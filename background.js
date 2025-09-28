chrome.runtime.onInstalled.addListener(() => {
  console.log("확장 프로그램 설치됨 ✅");

  // 우클릭 메뉴 예시
  chrome.contextMenus.create({
    id: "sample",
    title: "우클릭 테스트",
    contexts: ["page", "link"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("우클릭 메뉴 선택됨:", info, tab);
});
