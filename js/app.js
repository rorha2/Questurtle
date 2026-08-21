// 🐢 JavaScript 한 줄 주석

/* 
JavaScript 여러 줄 주석
*/


// =====================
// 초기 실행
// =====================

const isLoggedIn =
checkLogin();

if(isLoggedIn){

    startApp();

}


// =====================
// 앱 데이터 시작
// =====================

function createExitGuard(){

    const currentState =
    window.history.state;

    if(
        currentState?.exitGuardReady
    ){
        return;
    }

    const screenId =
    currentState?.screenId ||
    "home-screen";

    const depth =
    currentState?.depth || 0;


    window.history.replaceState(
        {
            questurtle:true,
            screenId:screenId,
            depth:depth,
            exitGuard:true,
            exitGuardReady:true
        },
        ""
    );

    window.history.pushState(
        {
            questurtle:true,
            screenId:screenId,
            depth:depth,
            exitGuardReady:true
        },
        ""
    );

}


function prepareExitGuard(){

    if(
        navigator.userActivation?.isActive
    ){

        createExitGuard();

        return;
    }


    const activateExitGuard =
    function(){

        document.removeEventListener(
            "click",
            activateExitGuard,
            true
        );

        createExitGuard();

    };


    document.addEventListener(
        "click",
        activateExitGuard,
        true
    );

}

function startApp(){

    loadCurrentUserData();

    loadQuests();

    updatePoint();

    updateHistory();

    resetDailyQuests();

    updateQuest();

    updateShop();


    window.history.replaceState(
        {
            questurtle:true,
            screenId:"home-screen",
            depth:0
        },
        ""
    );

    prepareExitGuard();

}


// =====================
// 로그인
// =====================

loginButton.addEventListener(
"click",
function(){

    const success =
    login();

    if(success){

        startApp();

    }

});

// 엔터키 로그인
loginPasswordInput.addEventListener(
"keydown",
function(event){

    if(event.key !== "Enter"){
        return;
    }

    const success =
    login();

    if(success){

        startApp();

    }

});

// =====================
// 로그아웃
// =====================

logoutButton.addEventListener(
"click",
function(){

    logout();

});


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

    currentUser.lastQuestReset =
    lastQuestReset;

    saveUsers();

}


// =====================
// 사이드 메뉴
// =====================

function openSideMenu(){

    sideMenuOverlay.classList.add(
        "is-open"
    );

    sideMenuOverlay.setAttribute(
        "aria-hidden",
        "false"
    );

    sideMenuButton.setAttribute(
        "aria-expanded",
        "true"
    );


    const currentState =
    window.history.state;

    window.history.pushState(
        {
            questurtle:true,
            screenId:
                currentState?.screenId ||
                "home-screen",
            depth:
                currentState?.depth || 0,
            exitGuardReady:true,
            overlay:"side-menu"
        },
        ""
    );

}

function closeSideMenu(){

    sideMenuOverlay.classList.remove(
        "is-open"
    );

    sideMenuOverlay.setAttribute(
        "aria-hidden",
        "true"
    );

    sideMenuButton.setAttribute(
        "aria-expanded",
        "false"
    );

}

sideMenuButton.addEventListener(
    "click",
    openSideMenu
);

sideMenuClose.addEventListener(
    "click",
    function(){

        window.history.back();

    }
);

sideMenuOverlay.addEventListener(
    "click",
    function(event){

        if(
            event.target ===
            sideMenuOverlay
        ){
            window.history.back();
        }

    }
);

sideMenuProfileButton.addEventListener(
    "click",
    function(){

        closeSideMenu();

        openProfileEditScreen();

    }
);

sideMenuQuestButton.addEventListener(
    "click",
    function(){

        closeSideMenu();

        showScreen(
            questScreen
        );

    }
);

sideMenuBagButton.addEventListener(
    "click",
    function(){

        closeSideMenu();

        updateBag();

        showScreen(
            bagScreen
        );

    }
);

sideMenuShopButton.addEventListener(
    "click",
    function(){

        closeSideMenu();

        showScreen(
            shopScreen
        );

    }
);

sideMenuLogoutButton.addEventListener(
    "click",
    async function(){

        const didLogout =
        await logout();

        if(didLogout){
            closeSideMenu();
        }

    }
);


// =====================
// 화면 이동
// =====================

function showScreen(
    screen,
    addHistory = true
){

    if(!screen){
        return;
    }

    hideAll();

    screen.style.display =
    "block";


    if(
        addHistory &&
        screen.id
    ){

        const currentState =
        window.history.state;

        const currentDepth =
        currentState?.depth || 0;

        if(
            currentState?.overlay ===
            "side-menu"
        ){

            window.history.replaceState(
                {
                    questurtle:true,
                    screenId:screen.id,
                    depth:currentDepth + 1,
                    exitGuardReady:true
                },
                ""
            );

        }else{

            window.history.pushState(
                {
                    questurtle:true,
                    screenId:screen.id,
                    depth:currentDepth + 1,
                    exitGuardReady:true
                },
                ""
            );

        }

    }

}


function pushOverlayHistory(
    overlayName
){

    const currentState =
    window.history.state;

    window.history.pushState(
        {
            questurtle:true,
            screenId:
                currentState?.screenId ||
                "home-screen",
            depth:
                currentState?.depth || 0,
            exitGuardReady:true,
            overlay:overlayName
        },
        ""
    );

}


// =====================
// 홈으로 이동
// =====================

function goHome(){

    const currentState =
    window.history.state;

    const currentDepth =
    currentState?.depth || 0;

    if(currentDepth > 0){

        window.history.go(
            -currentDepth
        );

        return;
    }

    showScreen(
        homeScreen,
        false
    );

}

homeLogoButton.addEventListener(
    "click",
    goHome
);

document
.querySelectorAll(".home-button")
.forEach(function(button){

    button.addEventListener(
        "click",
        goHome
    );

});


// =====================
// 홈 → 포인트
// =====================

pointCard.addEventListener(
    "click",
    function(){

        showScreen(
            pointScreen
        );

    }
);


// =====================
// 뒤로가기
// =====================

document
.querySelectorAll(".back-button")
.forEach(function(button){

    button.addEventListener(
        "click",
        function(){

            window.history.back();

        }
    );

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

    const success =
        usePoint(amount, "직접 사용");

        if(success){
            pointInput.value = "";
        }

});


// =====================
// 퀘스트
// =====================

questButton.addEventListener(
    "click",
    function(){

        showScreen(
            questScreen
        );

    }
);


// =====================
// 상점
// =====================

shopButton.addEventListener(
    "click",
    function(){

        showScreen(
            shopScreen
        );

    }
);


// =====================
// 가방
// =====================

bagButton.addEventListener(
    "click",
    function(){

        updateBag();

        showScreen(
            bagScreen
        );

    }
);


// =====================
// 설정
// =====================

if(settingsButton){

    settingsButton.addEventListener(
        "click",
        function(){

            closeSideMenu();

            showScreen(
                settingsScreen
            );

        }
    );

}

soundButton.addEventListener("click", () => {

    alert("효과음 설정은 준비 중입니다.");

});

musicButton.addEventListener("click", () => {

    alert("배경음 설정은 준비 중입니다.");

});

function updateThemeOptions(){

    themeOptionsBox.innerHTML = "";

    themeList.forEach(function(theme){

        const button =
        document.createElement("button");

        button.type = "button";

        button.className =
        "theme-option";

        button.textContent =
        theme.icon + " " + theme.name;

        const isSelected =
        currentUser.theme === theme.id;

        button.classList.toggle(
            "is-selected",
            isSelected
        );

        button.setAttribute(
            "aria-pressed",
            String(isSelected)
        );

        button.addEventListener(
            "click",
            function(){

                selectTheme(theme.id);

                window.history.back();

            }
        );

        themeOptionsBox.appendChild(
            button
        );

    });

}

function openThemeModal(){

    updateThemeOptions();

    themeModal.style.display = "flex";

    themeModal.setAttribute(
        "aria-hidden",
        "false"
    );

    pushOverlayHistory(
        "theme-modal"
    );

}

function closeThemeModal(){

    themeModal.style.display = "none";

    themeModal.setAttribute(
        "aria-hidden",
        "true"
    );

}

themeButton.addEventListener(
    "click",
    openThemeModal
);

themeModal.addEventListener(
    "click",
    function(event){

        if(event.target === themeModal){

            window.history.back();

        }

    }
);

document.addEventListener(
    "keydown",
    function(event){

        if(
            event.key === "Escape" &&
            themeModal.style.display ===
            "flex"
        ){

            window.history.back();

        }

    }
);

adminButton.addEventListener(
    "click",
    function(){

        showScreen(
            adminScreen
        );

    }
);

adminLoginButton.addEventListener("click", () => {

    alert("다음 단계에서 비밀번호 기능을 만들 예정입니다.");

});


// =====================
// 프로필 수정
// =====================

let selectedProfileIcon = "";

function resizeProfilePhoto(file){

    return new Promise(
        function(resolve, reject){

            const reader =
            new FileReader();

            reader.addEventListener(
                "load",
                function(){

                    const image =
                    new Image();

                    image.addEventListener(
                        "load",
                        function(){

                            const cropSize =
                            Math.min(
                                image.naturalWidth,
                                image.naturalHeight
                            );

                            const cropX =
                            (
                                image.naturalWidth -
                                cropSize
                            ) / 2;

                            const cropY =
                            (
                                image.naturalHeight -
                                cropSize
                            ) / 2;

                            const canvas =
                            document.createElement(
                                "canvas"
                            );

                            canvas.width = 256;
                            canvas.height = 256;

                            const context =
                            canvas.getContext("2d");

                            context.drawImage(
                                image,
                                cropX,
                                cropY,
                                cropSize,
                                cropSize,
                                0,
                                0,
                                256,
                                256
                            );

                            resolve(
                                canvas.toDataURL(
                                    "image/webp",
                                    0.82
                                )
                            );

                        }
                    );

                    image.addEventListener(
                        "error",
                        reject
                    );

                    image.src =
                    reader.result;

                }
            );

            reader.addEventListener(
                "error",
                reject
            );

            reader.readAsDataURL(file);

        }
    );

}

function updateProfileIconPreview(){

    renderProfileIcon(
        profileIconPreview,
        selectedProfileIcon
    );

    profileIconOptions.forEach(
        function(option){

            const isSelected =
            option.dataset.icon ===
            selectedProfileIcon;

            option.classList.toggle(
                "is-selected",
                isSelected
            );

            option.setAttribute(
                "aria-pressed",
                String(isSelected)
            );

        }
    );

}

function openProfileIconModal(){

    updateProfileIconPreview();

    profileIconModal.style.display =
    "flex";

    profileIconModal.setAttribute(
        "aria-hidden",
        "false"
    );

    pushOverlayHistory(
        "profile-icon-modal"
    );

}

function closeProfileIconModal(){

    profileIconModal.style.display =
    "none";

    profileIconModal.setAttribute(
        "aria-hidden",
        "true"
    );

}

function openProfileEditScreen(){

    if(!currentUser){
        return;
    }

    profileNicknameInput.value =
    currentUser.nickname;

    profileTurtleNameInput.value =
    currentUser.turtle.name;

    selectedProfileIcon =
    currentUser.profileIcon ||
    currentUser.profileEmoji ||
    "❤️";

    updateProfileIconPreview();

    showScreen(
        profileEditScreen
    );

}

function closeProfileEditScreen(){

    closeProfileIconModal();

    window.history.back();

}

profileEditButton.addEventListener(
    "click",
    openProfileEditScreen
);

profileEditBackButton.addEventListener(
    "click",
    closeProfileEditScreen
);

profileEditCancelButton.addEventListener(
    "click",
    closeProfileEditScreen
);

profileEditSaveButton.addEventListener(
    "click",
    function(){

        const success =
        changeCurrentUserProfile(
            profileNicknameInput.value,
            profileTurtleNameInput.value,
            selectedProfileIcon
        );

        if(!success){

            alert(
                "사용자명과 거북이 이름을 모두 입력해주세요."
            );

            return;

        }

        alert("프로필이 저장되었어요.");

    }
);

profileIconButton.addEventListener(
    "click",
    openProfileIconModal
);

profileIconOptions.forEach(
    function(option){

        option.addEventListener(
            "click",
            function(){

                selectedProfileIcon =
                option.dataset.icon;

                updateProfileIconPreview();

                window.history.back();

            }
        );

    }
);

profilePhotoInput.addEventListener(
    "change",
    async function(){

        const file =
        profilePhotoInput.files[0];

        if(!file){
            return;
        }

        if(
            !file.type.startsWith(
                "image/"
            )
        ){

            alert(
                "이미지 파일을 선택해주세요."
            );

            profilePhotoInput.value = "";

            return;

        }

        try{

            selectedProfileIcon =
            await resizeProfilePhoto(file);

            updateProfileIconPreview();

            window.history.back();

        }catch(error){

            alert(
                "사진을 불러오지 못했어요."
            );

        }

        profilePhotoInput.value = "";

    }
);

profileIconModal.addEventListener(
    "click",
    function(event){

        if(event.target === profileIconModal){

            window.history.back();

        }

    }
);

document.addEventListener(
    "keydown",
    function(event){

        if(
            event.key === "Escape" &&
            profileIconModal.style.display ===
            "flex"
        ){

            window.history.back();

        }

    }
);

document.addEventListener(
    "contextmenu",
    function(event){

        event.preventDefault();

    }
);


// =====================
// 브라우저 뒤로가기
// =====================

let exitConfirmOpen = false;
let allowAppExit = false;

window.addEventListener(
    "pageshow",
    function(){

        if(!allowAppExit){
            return;
        }

        allowAppExit = false;

        window.location.reload();

    }
);

window.addEventListener(
    "popstate",
    async function(event){

        const state =
        event.state;


        if(exitConfirmOpen){

            if(
                state?.exitGuard
            ){
                window.history.forward();
            }

            return;
        }


        if(allowAppExit){

            if(
                state?.questurtle
            ){

                window.history.back();

            }

            return;
        }


        if(
            themeModal.style.display ===
            "flex"
        ){

            closeThemeModal();

            return;
        }


        if(
            profileIconModal.style.display ===
            "flex"
        ){

            closeProfileIconModal();

            return;
        }


        if(
            state?.exitGuard
        ){

            window.history.forward();

            exitConfirmOpen = true;

            const confirmed =
            await showConfirm(
                "종료할까요?",
                "취소",
                "종료"
            );

            exitConfirmOpen = false;


            if(confirmed){

                allowAppExit = true;

                window.history.back();

            }

            return;
        }


        if(
            sideMenuOverlay.classList.contains(
                "is-open"
            )
        ){

            closeSideMenu();

        }


        if(
            !state ||
            !state.questurtle
        ){
            return;
        }

        const screen =
        document.getElementById(
            state.screenId
        );

        if(!screen){
            return;
        }

        showScreen(
            screen,
            false
        );

    }
);


// localStorage.clear();