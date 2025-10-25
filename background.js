let score = 0; // 점수 변수를 만들어 0으로 지정


chrome.runtime.onInstalled.addListener(() => {
  console.log("확장 프로그램 설치됨 ✅"); // 프로그램이 설치되면 설치가되었다고 메시지를 띄어주는 함수



   // 우클릭 메뉴 예시
  chrome.contextMenus.create({ // 우클릭 메뉴를 만듬
    id: "sample", // 식별자(메뉴를 구분하기 위함)
    title: "우클릭 테스트", // 실제로 우클릭했을때 뜨는 텍스트
    contexts: ["page", "link"] // 메뉴가 어떤 상황에서 나타날지 결정(page: 웹페이지의 아무곳이나 클릭해도 나타남, link: 링크를 클릭했을때 나타남)
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => { // 우클릭메뉴를 등록(info: 링크에 대한 정보, tab: 그 링크가 들어있는 탭에 대한 정보)
  score = 0;
  if (info.linkUrl.length > 100) score += 10; // url의 글자수가 100이 넘어가면 10점 추가
  if (info.linkUrl.includes("@")) score += 10; // url에 @가 포함되있으면 10점 추가
  if (info.linkUrl.includes("login") || info.linkUrl.includes("verify") || info.linkUrl.includes("bank") || info.linkUrl.includes("secure") || info.linkUrl.includes("account")) score += 10; // url에 login, verify, bank, secure, account가 포함되있으면 10점 추가
  if (info.linkUrl.includes(".xyz") || info.linkUrl.includes(".tk") || info.linkUrl.includes(".top") || info.linkUrl.includes(".ru") || info.linkUrl.includes(".zip")) score += 10; // url에 .xyz, .tk, .top, .ru, .zip가 포함되있으면 10점 추가
  if (info.linkUrl.includes("bit.ly") || info.linkUrl.includes("tinyurl")) score += 15; // url에 bit.ly, tinyurl이 포함되있으면 15점 추가
  if (/https?:\/\/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/.test(info.linkUrl)) score += 15 //url이 https(사이에아무문자)//수.수.수.수 꼴이라면 15점 추가(단 수는 최소 1자리에서 최대 3자리)
  if (info.linkUrl.includes("xn--")) score += 10 // url에 xn--이 포함되어있으면 10점 추가
  
  chrome.scripting.executeScript({ // 코드(파일)을 실행
    target: { tabId: tab.id }, // 실행시킬 탭(프레임)을 지정
    args: [score], // score을 args로 넘김
    func: (score) => alert(score) // 메인 함수(score을 알리는 함수)
  })

})
