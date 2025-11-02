let score = 0; // 점수 변수를 만들어 0으로 지정


chrome.runtime.onInstalled.addListener(() => {
  console.log("확장 프로그램 설치됨 ✅"); // 프로그램이 설치되면 설치가되었다고 메시지를 띄어주는 함수



   // 우클릭 메뉴 예시
  chrome.contextMenus.create({ // 우클릭 메뉴를 만듬
    id: "sample", // 식별자(메뉴를 구분하기 위함)
    title: "링크 판단하기", // 실제로 우클릭했을때 뜨는 텍스트
    contexts: ["page", "link"] // 메뉴가 어떤 상황에서 나타날지 결정(page: 웹페이지의 아무곳이나 클릭해도 나타남, link: 링크를 클릭했을때 나타남)
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => { // 우클릭메뉴를 등록(info: 링크에 대한 정보, tab: 그 링크가 들어있는 탭에 대한 정보)
  score = 0;
  danger = ''
  const decodedUrl = decodeURIComponent(info.linkUrl || ""); // 크롬에선 문자 @가 %40으로 인식되므로 암호화해서 변수에 저장

  if (decodedUrl.length > 100) {
    score += 15;
    danger += '⦁ 길이 과도 \n';
  } // url의 글자수가 100이 넘어가면 15점 추가 
  if (decodedUrl.includes("@")) {
    score += 10
    danger += '⦁ @ 포함 \n';
  } // url에 @가 포함되있으면 10점 추가
  if (decodedUrl.includes("login") || decodedUrl.includes("verify") || decodedUrl.includes("bank") || decodedUrl.includes("secure") || decodedUrl.includes("account")) {
    score += 10;
    danger += '⦁ 피싱 키워드 \n,'; 
  } // url에 login, verify, bank, secure, account가 포함되있으면 10점 추가
  if (decodedUrl.includes(".xyz") || decodedUrl.includes(".tk") || decodedUrl.includes(".top") || decodedUrl.includes(".ru") || decodedUrl.includes(".zip")) {
    score += 15;
    danger += '⦁ 의심스러운 TLD \n'; 
  } // url에 .xyz, .tk, .top, .ru, .zip가 포함되있으면 15점 추가
  if (decodedUrl.includes("bit.ly") || decodedUrl.includes("tinyurl")) {
    score += 20;
    danger += '⦁ 단축 도메인 \n'; 
  } // url에 bit.ly, tinyurl이 포함되있으면 20점 추가
  if (/https?:\/\/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/.test(decodedUrl)) {
    score += 20;
    danger += '⦁ IP 주소 \n' 
  } //url이 https(사이에아무문자)//수.수.수.수 꼴이라면 20점 추가(단 수는 최소 1자리에서 최대 3자리)
  if (decodedUrl.includes("xn--")) {
    score += 10;
    danger += '⦁ Punycode 사용 \n' 
  } // url에 xn--이 포함되어있으면 10점 추가


  result = '' // 결과를 나타내기위해 결과변수 생성
  if (score == 0) { // 점수가 0점일때
    result = "URL안전도: ✅ 안전!" + "     (점수: " + score + "점" + ")" + "\n" +  "\n" + "사용가능한 URL 입니다!"
  }
    else if (score <= 20) { // 점수가 20점 이하일때
    result = "URL안전도: ✅ 안전!" + "     (점수: " + score + "점" + ")" + "\n" +  "\n" + "사용가능한 URL 입니다!" + "\n" + "\n" + "[주의해야할 점]" + danger 
  } else if (score <= 40) { // 점수가 21점 이상 40점 이하일때
    result = "URL안전도: ⚠️ 주의!" + "     (점수: " + score + "점" + ")" + "\n" +  "\n" + "[위험요소]" + "\n" + danger  // 주의하라고 알림
  } else { // 점수가 41점 이상일때
    result = "URL안전도: ❌ 위험!" + "     (점수: " + score + "점" + ")" + "\n" +  "\n" + "[위험요소]" + "\n" + danger  // 위험하다고 알림
  }

  chrome.scripting.executeScript({ // 코드(파일)을 실행
    target: { tabId: tab.id }, // 실행시킬 탭(프레임)을 지정
    args: [result], // score을 args로 넘김
    func: (result) => alert(result) // 메인 함수(score을 알리는 함수)
  })

})