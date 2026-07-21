// 🐢 JavaScript 한 줄 주석

/* 
JavaScript 여러 줄 주석
*/


// 초기 실행

loadQuests();

updatePoint();
updateHistory();

checkAttendance();

updateQuest();

resetDailyQuests();


// =====================
// 일일 퀘스트 초기화
// =====================

function resetDailyQuests(){

    const today =
    new Date().toLocaleDateString("sv-SE");

    if(lastQuestReset === today){
        return;
    }

    quests.forEach(function(quest){

        if(quest.type === "daily"){

            quest.completed = false;

        }

    });

    saveQuests();

    lastQuestReset = today;

    localStorage.setItem(
        "lastQuestReset",
        lastQuestReset
    );

}


// =====================
// 출석 보상
// =====================

function checkAttendance(){

    const today =
    new Date().toLocaleDateString("sv-SE");

    if(lastAttendance === today){
        return;
    }

    givePoint(100, "출석 보상");

    lastAttendance = today;

    localStorage.setItem(
        "lastAttendance",
        lastAttendance
    );

}



// =====================
// 홈 → 포인트
// =====================

pointCard.addEventListener("click",function(){

    hideAll();

    pointScreen.style.display="block";

});


// =====================
// 뒤로가기
// =====================

document
.querySelectorAll(".back-button")
.forEach(function(button){

    button.addEventListener("click",function(){

        hideAll();

        homeScreen.style.display="block";

    });

});


// =====================
// 포인트 적립
// =====================

addPointButton.addEventListener("click",function(){

    let amount =
    Number(pointInput.value);

        if(amount <= 0){
        return;
        }

    givePoint(amount, "직접 적립");

    pointInput.value = "";

});


// =====================
// 포인트 사용
// =====================

usePointButton.addEventListener("click",function(){

    let amount =
    Number(pointInput.value);

        if(amount <= 0){
        return;
        }

    usePoint(amount, "직접 사용");

    pointInput.value = "";

});


// =====================
// 퀘스트
// =====================

questButton.addEventListener("click",function(){

    hideAll();

    questScreen.style.display="block";

});


// =====================
// 상점
// =====================

shopButton.addEventListener("click",function(){

    hideAll();

    shopScreen.style.display="block";

});


// =====================
// 설정
// =====================

settingsButton.addEventListener("click", () => {

    hideAll();

    settingsScreen.style.display = "block";

});

soundButton.addEventListener("click", () => {

    alert("효과음 설정은 준비 중입니다.");

});

musicButton.addEventListener("click", () => {

    alert("배경음 설정은 준비 중입니다.");

});

themeButton.addEventListener("click", () => {

    alert("테마 기능은 준비 중입니다.");

});

adminButton.addEventListener("click", () => {

    hideAll();

    adminScreen.style.display = "block";

});

adminLoginButton.addEventListener("click", () => {

    alert("다음 단계에서 비밀번호 기능을 만들 예정입니다.");

});



// localStorage.clear();