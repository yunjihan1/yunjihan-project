chrome.runtime.onInstalled.addListener(() => {
  console.log("확장 프로그램 설치됨 ✅"); // 프로그램이 설치되면 설치가되었다고 메시지를 띄어주는 함수

let score = 0; // 점수 변수를 만들어 0으로 지정

   // 우클릭 메뉴 예시
  chrome.contextMenus.create({ // 우클릭 메뉴를 만듬
    id: "sample", // 식별자(메뉴를 구분하기 위함)
    title: "우클릭 테스트", // 실제로 우클릭했을때 뜨는 텍스트
    contexts: ["page", "link"] // 메뉴가 어떤 상황에서 나타날지 결정(page: 웹페이지의 아무곳이나 클릭해도 나타남, link: 링크를 클릭했을때 나타남)
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => { // 우클릭 메뉴를 등록(info: 클릭한 링크에 대한 정보, tab: 그 링크가 들어있는 탭에 대한 정보)
if (info.linkUrl.length < 50) //url의 글자수가 50자보다 적을때
    chrome.scripting.executeScript({ // 코드(파일)을 실행
      target: { tabId: tab.id }, // 실행시킬 탭(프레임)을 지정
      func: () => { // 주요 함수(main)
        score =+ 10 //점수에 10을 더함
        alert(score) // 점수를 알림으로 띄어줌
      }
    })
})
