// 🐢 JavaScript 한 줄 주석

/* 
JavaScript 여러 줄 주석
*/


// =====================
// 데이터
// =====================

let point =
Number(localStorage.getItem("point")) || 1250;

let history =
JSON.parse(localStorage.getItem("history")) || [];

let lastAttendance =
localStorage.getItem("lastAttendance") || "";


// =====================
// 퀘스트
// =====================

let quests = [

    {
        id: "drink_water",
        title: "물 2L 마시기",
        reward: 100,
        type: "daily",
        completed: false
    },

    {
        id: "exercise",
        title: "운동 30분",
        reward: 300,
        type: "daily",
        completed: false
    },

    {
        id: "reading_book",
        title: "책 10페이지 읽기",
        reward: 150,
        type: "daily",
        completed: false
    },

    {
        id: "clean_room",
        title: "방 청소하기",
        reward: 200,
        type: "daily",
        completed: false
    }

];


// =====================
// 화면 요소
// =====================

const homeScreen =
document.getElementById("home-screen");

const pointScreen =
document.getElementById("point-screen");

const questScreen =
document.getElementById("quest-screen");

const shopScreen =
document.getElementById("shop-screen");



// 포인트 표시 영역

const pointNumbers =
document.querySelectorAll(".point-number");


// 포인트 입력

const pointInput =
document.getElementById("point-input");


// 버튼

const pointCard =
document.getElementById("point-card");

const backButton =
document.getElementById("back-button");

const addPointButton =
document.getElementById("add-point");

const usePointButton =
document.getElementById("use-point");

const questButton =
document.getElementById("quest-button");

const shopButton =
document.getElementById("shop-button");

const questList =
document.getElementById("quest-list");


// =====================
// 포인트 내역
// =====================

function updateHistory(){

    const box =
    document.getElementById("point-history");

    box.innerHTML =
    "<h3>📜 내역</h3>";

    history.forEach(function(item){

        box.innerHTML +=
        "<p>" + item + "</p>";

    });

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

}


// =====================
// 포인트 표시
// =====================

function updatePoint(){

    pointNumbers.forEach(function(item){

        item.textContent = point;

    });

    localStorage.setItem("point", point);

}


// =====================
// 포인트 지급
// =====================

function givePoint(amount, reason){

    point += amount;

    history.push(
        "+" + amount + " P (" + reason + ")"
    );

    updatePoint();
    updateHistory();

}


// =====================
// 포인트 사용
// =====================

function usePoint(amount, reason){

    point -= amount;

    history.push(
        "-" + amount + " P (" + reason + ")"
    );

    updatePoint();
    updateHistory();

}


// =====================
// 퀘스트 저장
// =====================

function saveQuests(){

    const completedData = {};

    quests.forEach(function(quest){

        completedData[quest.id] =
        quest.completed;

    });

    localStorage.setItem(
        "quests",
        JSON.stringify(completedData)
    );

}


// =====================
// 퀘스트 불러오기
// =====================

function loadQuests(){

    const savedData =
    JSON.parse(
        localStorage.getItem("quests")
    );

    if(!savedData){
        return;
    }

    quests.forEach(function(quest){

        if(savedData.hasOwnProperty(quest.id)){

            quest.completed =
            savedData[quest.id];

        }

    });

}


// 초기 실행

loadQuests();
updatePoint();
updateHistory();
checkAttendance();
updateQuest();


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
// 퀘스트 표시
// =====================

function updateQuest(){

    questList.innerHTML = "";

    quests.forEach(function(quest, index){

        questList.innerHTML +=
        `
        <div class="quest-card">

            <h3>${quest.title}</h3>

            <p>
                ⭐ ${quest.reward}P
            </p>

            <button
                onclick="completeQuest(${index})"
                ${quest.completed ? "disabled" : ""}
            >

                ${quest.completed ? "완료 ✓" : "완료"}

            </button>

        </div>
        `;

    });

}


// =====================
// 퀘스트 완료
// =====================

function completeQuest(index){

    if(quests[index].completed){
        return;
    }

    quests[index].completed = true;

    givePoint(
        quests[index].reward,
        quests[index].title
    );

    saveQuests();
    updateQuest();

}


// =====================
// 화면 전환
// =====================

function hideAll(){

    homeScreen.style.display="none";

    pointScreen.style.display="none";

    questScreen.style.display="none";

    shopScreen.style.display="none";

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