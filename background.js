chrome.runtime.onInstalled.addListener(() => {
  console.log("확장 프로그램 설치됨 ✅"); // 프로그램이 설치되면 설치가되었다고 메시지를 띄어주는 함수

  // 우클릭 메뉴 예시
  chrome.contextMenus.create({ // 우클릭 메뉴를 만듬
    id: "sample", // 식별자(메뉴를 구분하기 위함)
    title: "우클릭 테스트", // 실제로 우클릭했을때 뜨는 텍스트
    contexts: ["page", "link"] // 메뉴가 어떤 상황에서 나타날지 결정(page: 웹페이지의 아무곳이나 클릭해도 나타남, link: 링크를 클릭했을때 나타남)
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.linkUrl) {
    // 링크 클릭 시 alert 띄우기
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (url) => {
        alert("클릭한 링크 URL: " + url);
      },
      args: [info.linkUrl]
    });
  } else {
    // 페이지 클릭 시
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        alert("페이지를 클릭했습니다!");
      }
    });
  }
});
