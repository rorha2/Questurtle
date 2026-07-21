// =====================
// 사용자 데이터
// =====================

let users = JSON.parse(
    localStorage.getItem("users")
);


// =====================
// 기존 공용 데이터
// =====================

const legacyPoint =
Number(
    localStorage.getItem("point")
) || 0;

const legacyHistory =
JSON.parse(
    localStorage.getItem("history")
) || [];

const legacyLastAttendance =
localStorage.getItem(
    "lastAttendance"
) || "";

const legacyLastQuestReset =
localStorage.getItem(
    "lastQuestReset"
) || "";

const legacyQuestProgress =
JSON.parse(
    localStorage.getItem("quests")
) || {};


// =====================
// 처음 실행할 때 기본 계정 생성
// =====================

if(!users){

    users = [

        {
            id: "1",
            password: "1",
            nickname: "관리자",
            role: "admin",
            profileEmoji: "👑",

            turtle: {

                name: "어드민",
                level: 1,
                exp: 0,
                maxExp: 2000

            }

        },

        {
            id: "2",
            password: "2",
            nickname: "김거북",
            role: "user",
            profileEmoji: "👤",

            turtle: {

                name: "꺼북",
                level: 1,
                exp: 0,
                maxExp: 2000

            }

        }

    ];

    saveUsers();

}


// =====================
// 기존 사용자 데이터 보완
// =====================

let usersUpdated = false;

users.forEach(function(user){

    if(!user.profileEmoji){

        if(user.role === "admin"){

            user.profileEmoji = "👑";

        }else{

            user.profileEmoji = "👤";

        }

        usersUpdated = true;

    }

    if(!user.turtle){

        user.turtle = {

            name: "꺼북",

            level: 1,

            exp: 0,

            maxExp: 2000

        };

        usersUpdated = true;

    }

    if(typeof user.point !== "number"){

        if(user.role === "user"){

            user.point =
            legacyPoint;

        }else{

            user.point = 0;

        }

        usersUpdated = true;

    }

    if(!Array.isArray(user.history)){

        if(user.role === "user"){

            user.history = [
                ...legacyHistory
            ];

        }else{

            user.history = [];

        }

        usersUpdated = true;

    }

    if(
        typeof user.lastAttendance
        !== "string"
    ){

        if(user.role === "user"){

            user.lastAttendance =
            legacyLastAttendance;

        }else{

            user.lastAttendance = "";

        }

        usersUpdated = true;

    }

        if(
        typeof user.lastQuestReset
        !== "string"
    ){

        if(user.role === "user"){

            user.lastQuestReset =
            legacyLastQuestReset;

        }else{

            user.lastQuestReset = "";

        }

        usersUpdated = true;

    }

    if(
        !user.questProgress ||
        typeof user.questProgress
        !== "object" ||
        Array.isArray(
            user.questProgress
        )
    ){

        if(user.role === "user"){

            user.questProgress = {
                ...legacyQuestProgress
            };

        }else{

            user.questProgress = {};

        }

        usersUpdated = true;

    }

    if(!Array.isArray(user.inventory)){

        user.inventory = [];

        usersUpdated = true;

    }

});

if(usersUpdated){

    saveUsers();

}


// =====================
// 현재 로그인한 사용자
// =====================

let currentUserId =
localStorage.getItem("currentUserId");

let currentUser = null;


// =====================
// 사용자 저장
// =====================

function saveUsers(){

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

}


// =====================
// 사용자 찾기
// =====================

function findUser(id){

    return users.find(function(user){

        return user.id === id;

    });

}


// =====================
// 현재 사용자 데이터 불러오기
// =====================

function loadCurrentUserData(){

    if(!currentUser){
        return;
    }

    point =
    currentUser.point;

    history =
    currentUser.history;

    lastAttendance =
    currentUser.lastAttendance;

    lastQuestReset =
    currentUser.lastQuestReset;

}


// =====================
// 로그인 상태 확인
// =====================

function checkLogin(){

    if(!currentUserId){

        showLogin();

        return false;

    }

    currentUser = findUser(currentUserId);

    if(!currentUser){

        localStorage.removeItem("currentUserId");

        currentUserId = null;

        showLogin();

        return false;

    }

    showApp();

    return true;

}


// =====================
// 로그인 화면 표시
// =====================

function showLogin(){

    loginScreen.style.display = "block";

    app.style.display = "none";

    loginPasswordInput.value = "";

    loginMessage.textContent = "";

}


// =====================
// 앱 화면 표시
// =====================

function showApp(){

    loginScreen.style.display = "none";

    app.style.display = "block";

    hideAll();

    homeScreen.style.display = "block";

    updateAdminButton();

    updateCurrentUserProfile();

}


// =====================
// 로그인
// =====================

function login(){

    const id =
    loginIdInput.value.trim();

    const password =
    loginPasswordInput.value;

    const user =
    users.find(function(item){

        return (
            item.id === id &&
            item.password === password
        );

    });

    if(!user){

        loginMessage.textContent =
        "아이디 또는 비밀번호가 맞지 않습니다.";

        return false;

    }

    currentUser = user;

    currentUserId = user.id;

    localStorage.setItem(
        "currentUserId",
        currentUserId
    );

    loginMessage.textContent = "";

    showApp();

    return true;

}


// =====================
// 로그아웃
// =====================

function logout(){

    localStorage.removeItem(
        "currentUserId"
    );

    currentUserId = null;

    currentUser = null;

    loginIdInput.value = "";

    loginPasswordInput.value = "";

    showLogin();

}


// =====================
// 관리자 버튼 표시
// =====================

function updateAdminButton(){

    if(!adminButton){
        return;
    }

    if(
        currentUser &&
        currentUser.role === "admin"
    ){

        adminButton.style.display = "block";

    }else{

        adminButton.style.display = "none";

    }

}


// =====================
// 현재 사용자 프로필 표시
// =====================

function updateCurrentUserProfile(){

    if(!currentUser){
        return;
    }

    
    currentUserName.textContent =
    currentUser.nickname;

    currentUserIcon.textContent =
    currentUser.profileEmoji || "👤";

    profileNickname.textContent =
    currentUser.turtle.name;

        turtleLevel.textContent =
    currentUser.turtle.level;

    turtleExp.textContent =
    currentUser.turtle.exp;

    turtleMaxExp.textContent =
    currentUser.turtle.maxExp;


    if(currentUser.role === "admin"){

        currentUserCard.className =
        "current-user-card admin";

    }else{

        currentUserCard.className =
        "current-user-card user";

    }

}


// =====================
// 거북이 이름 변경
// =====================

function changeTurtleName(newName){

    const turtleName =
    newName.trim();

    if(!currentUser){
        return false;
    }

    if(turtleName === ""){
        return false;
    }

    currentUser.turtle.name =
    turtleName;

    saveUsers();

    updateCurrentUserProfile();

    return true;

}