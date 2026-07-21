// =====================
// 데이터
// =====================

let point = 0;

let history = [];

let lastAttendance = "";

let lastQuestReset = "";


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
// 상점 아이템
// =====================

let shopItems = [

    {
        id: "turtle_snack_01",
        name: "떡잎(50xp)",
        price: 50,
        exp: 50,
        emoji: "🌿"
    },

    {
        id: "turtle_snack_02",
        name: "당근(200xp)",
        price: 180,
        exp: 200,
        emoji: "🥕"
    },

    {
        id: "turtle_snack_03",
        name: "사과(500xp)",
        price: 400,
        exp: 500,
        emoji: "🍎"
    }

];