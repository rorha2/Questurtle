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
            profileIcon: "👑",
            theme: "default",

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
            profileIcon: "❤️",
            theme: "default",

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

    const themeExists =
    themeList.some(function(theme){

        return theme.id === user.theme;

    });

    if(!themeExists){

        user.theme = "default";

        usersUpdated = true;

    }

    if(!user.profileIcon){

        user.profileIcon =
        user.profileEmoji ||
        (
            user.role === "admin"
            ? "👑"
            : "❤️"
        );

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
// 테마 적용
// =====================

function applyTheme(){

    const selectedTheme =
    themeList.find(function(theme){

        return (
            currentUser &&
            theme.id === currentUser.theme
        );

    }) || themeList[0];

    document.body.classList.remove(
        "theme-night"
    );

    document.body.dataset.theme =
    selectedTheme.id;

    themeButton.textContent =
    selectedTheme.name;

}


// =====================
// 테마 선택
// =====================

function selectTheme(themeId){

    if(!currentUser){
        return;
    }

    const themeExists =
    themeList.some(function(theme){

        return theme.id === themeId;

    });

    if(!themeExists){
        return;
    }

    currentUser.theme = themeId;

    saveUsers();

    applyTheme();

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

    document.body.classList.remove(
    "theme-night"
    );

    document.body.dataset.theme =
    themeList[0].id;

    themeButton.textContent =
    themeList[0].name;

    loginScreen.style.display = "block";

    app.style.display = "none";

    loginPasswordInput.value = "";

    loginMessage.textContent = "";

}


// =====================
// 앱 화면 표시
// =====================

function showApp(){

    applyTheme();

    loginScreen.style.display = "none";

    app.style.display = "block";

    hideAll();

    homeScreen.style.display = "block";

    updateAdminButton();

    updateProfileEditButton();

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

async function logout(){

    const confirmed =
    await showConfirm(
        "로그아웃 할까요?"
    );

    if(!confirmed){
        return false;
    }

    localStorage.removeItem(
        "currentUserId"
    );

    currentUserId = null;

    currentUser = null;

    loginIdInput.value = "";

    loginPasswordInput.value = "";

    showLogin();

    return true;

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
// 프로필 수정 버튼 표시
// =====================

function updateProfileEditButton(){

    if(!profileEditButton){
        return;
    }

    if(currentUser){

        profileEditButton.style.display =
        "block";

    }else{

        profileEditButton.style.display =
        "none";

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

    renderProfileIcon(
        currentUserIcon,
        currentUser.profileIcon ||
        currentUser.profileEmoji ||
        "❤️"
    );

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
// 프로필 아이콘 표시
// =====================

function renderProfileIcon(
    element,
    icon
){

    element.replaceChildren();

    if(
        typeof icon === "string" &&
        icon.startsWith("data:image/")
    ){

        const image =
        document.createElement("img");

        image.className =
        "profile-photo-image";

        image.src = icon;
        image.alt = "프로필 사진";

        element.appendChild(image);

        return;

    }

    element.textContent =
    icon || "❤️";

}


// =====================
// 현재 사용자 프로필 변경
// =====================

function changeCurrentUserProfile(
    newNickname,
    newTurtleName,
    newProfileIcon
){

    if(!currentUser){
        return false;
    }

    const nickname =
    newNickname.trim();

    const turtleName =
    newTurtleName.trim();

    const profileIcon =
    String(
        newProfileIcon || ""
    ).trim();

    if(
        nickname === "" ||
        turtleName === "" ||
        profileIcon === ""
    ){
        return false;
    }

    currentUser.nickname =
    nickname;

    currentUser.turtle.name =
    turtleName;

    currentUser.profileIcon =
    profileIcon;

    saveUsers();

    updateCurrentUserProfile();

    return true;

}