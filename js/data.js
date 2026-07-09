// =====================
// 데이터
// =====================

let point =
Number(localStorage.getItem("point")) || 0;

let history =
JSON.parse(localStorage.getItem("history")) || [];

let lastAttendance =
localStorage.getItem("lastAttendance") || "";

let lastQuestReset =
localStorage.getItem("lastQuestReset") || "";


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