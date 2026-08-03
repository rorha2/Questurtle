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

function startApp(){

    loadCurrentUserData();

    loadQuests();

    updatePoint();

    updateHistory();

    resetDailyQuests();

    updateQuest();

    updateShop();

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
// 홈으로 이동
// =====================

function goHome(){

    hideAll();

    homeScreen.style.display =
    "block";

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

    button.addEventListener(
        "click",
        function(){

            const targetScreenId =
            button.dataset.backTarget ||
            "home-screen";

            const targetScreen =
            document.getElementById(
                targetScreenId
            );

            if(!targetScreen){
                return;
            }

            hideAll();

            targetScreen.style.display =
            "block";

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
// 가방
// =====================

bagButton.addEventListener("click",function(){

    hideAll();

    updateBag();

    bagScreen.style.display = "block";

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

                closeThemeModal();

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

            closeThemeModal();

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

            closeThemeModal();

        }

    }
);

adminButton.addEventListener("click", () => {

    hideAll();

    adminScreen.style.display = "block";

});

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

    if(
        !currentUser ||
        currentUser.role !== "user"
    ){
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

    hideAll();

    profileEditScreen.style.display =
    "block";

}

function closeProfileEditScreen(){

    closeProfileIconModal();

    hideAll();

    settingsScreen.style.display =
    "block";

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

        closeProfileEditScreen();

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

                closeProfileIconModal();

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

            closeProfileIconModal();

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

            closeProfileIconModal();

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

            closeProfileIconModal();

        }

    }
);


// localStorage.clear();