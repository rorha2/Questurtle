// =====================
// 거북이 공통 기능
// =====================

let turtleSpeechTimer;

function getRandomTurtleDialogue(type){

    const dialogues = turtleDialogues[type];

    if(!dialogues || dialogues.length === 0){
        return "";
    }

    const randomIndex =
    Math.floor(Math.random() * dialogues.length);

    return dialogues[randomIndex];

}

function getTurtleCatchphrase(){

    const catchphrase = "거북";

    return catchphrase.trim();

}

function showTurtleSpeech(message){

    const speech =
    document.getElementById("turtle-speech");

    if(!speech || !message){
        return;
    }

    clearTimeout(turtleSpeechTimer);

    const catchphrase =
    getTurtleCatchphrase();

    speech.textContent =
    catchphrase
        ? message + " " + catchphrase
        : message;


    const turtleStage =
    speech.closest(
        ".turtle-stage"
    );

    const turtleCharacter =
    document.getElementById(
        "turtle-character"
    );

    if(
        turtleStage &&
        turtleCharacter
    ){

        // 이전 위치 초기화
        speech.style.left = "0px";

        const stageRect =
        turtleStage.getBoundingClientRect();

        const characterRect =
        turtleCharacter.getBoundingClientRect();

        const speechRect =
        speech.getBoundingClientRect();


        // 거북이 현재 중앙
        const turtleCenterX =
        characterRect.left
        + characterRect.width / 2;


        // 말풍선을 거북이 중앙에 맞춘 위치
        let desiredLeft =
        turtleCenterX
        - speechRect.width / 2;


        // 스테이지 가장자리 여백
        const edgeMargin = 8;

        const minLeft =
        stageRect.left
        + edgeMargin;

        const maxLeft =
        stageRect.right
        - speechRect.width
        - edgeMargin;


        desiredLeft =
        Math.max(
            minLeft,
            Math.min(
                maxLeft,
                desiredLeft
            )
        );


        // 말풍선 이동
        const moveX =
        desiredLeft
        - speechRect.left;

        speech.style.left =
        moveX + "px";


        // 꼬리는 거북이 중앙을 가리킴
        let tailX =
        turtleCenterX
        - desiredLeft;

        tailX =
        Math.max(
            14,
            Math.min(
                speechRect.width - 14,
                tailX
            )
        );

        speech.style.setProperty(
            "--turtle-speech-tail-x",
            tailX + "px"
        );

    }


    speech.classList.remove("show");
    speech.classList.remove("hide");

    void speech.offsetWidth;

    speech.classList.add("show");

    turtleSpeechTimer =
    setTimeout(function(){

        speech.classList.add("hide");

        setTimeout(function(){

            speech.classList.remove("show");
            speech.classList.remove("hide");

        }, 250);

    }, 5000);

}

function hideTurtleSpeech(){

    const speech =
    document.getElementById(
        "turtle-speech"
    );

    if(!speech){
        return;
    }

    clearTimeout(
        turtleSpeechTimer
    );

    if(
        !speech.classList.contains(
            "show"
        )
    ){
        return;
    }

    speech.classList.add(
        "hide"
    );

    setTimeout(function(){

        speech.classList.remove(
            "show"
        );

        speech.classList.remove(
            "hide"
        );

    }, 250);

}


// =====================
// 거북이 상호작용 보상 표시
// =====================

function showTurtleReward(rewards){

    const rewardBox =
    document.getElementById("turtle-reward");

    if(
        !rewardBox ||
        !Array.isArray(rewards) ||
        rewards.length === 0
    ){
        return;
    }

    const rewardGroup =
    document.createElement("div");

    rewardGroup.classList.add(
        "turtle-reward-group"
    );

    rewards.forEach(function(reward){

        const item =
        document.createElement("div");

        item.classList.add(
            "turtle-reward-item",
            reward.type
        );

        item.textContent =
        "+ " + reward.amount + " " + reward.label;

        rewardGroup.appendChild(item);

    });

    rewardBox.appendChild(
        rewardGroup
    );

    void rewardGroup.offsetWidth;

    rewardGroup.classList.add(
        "show"
    );

    rewardGroup.addEventListener(
        "animationend",
        function(){

            rewardGroup.remove();

        },
        {
            once:true
        }
    );

}


// =====================
// 거북이 경험치 지급
// =====================

function giveTurtleExp(amount){

    if(
        !currentUser ||
        !Number.isFinite(amount) ||
        amount <= 0
    ){
        return false;
    }

    currentUser.turtle.exp += amount;

    while(
        currentUser.turtle.exp >=
        currentUser.turtle.maxExp
    ){

        currentUser.turtle.exp -=
        currentUser.turtle.maxExp;

        currentUser.turtle.level += 1;

    }

    saveUsers();
    updateCurrentUserProfile();

    return true;

}


// =====================
// 상호작용-말 걸기 보상
// =====================

function receiveTouchReward(){

    if(!currentUser){
        return false;
    }

    const today =
    new Date().toLocaleDateString("sv-SE");

    const now =
    Date.now();

    const cooldown =
    5 * 60 * 1000;

    if(!currentUser.turtleInteraction){

        currentUser.turtleInteraction = {
            touchDate:"",
            touchCount:0,
            lastTouchRewardAt:0
        };

    }

    const interaction =
    currentUser.turtleInteraction;

    if(interaction.touchDate !== today){

        interaction.touchDate = today;
        interaction.touchCount = 0;
        interaction.lastTouchRewardAt = 0;

    }

    if(interaction.touchCount >= 10){
        return false;
    }

    if(
        now - interaction.lastTouchRewardAt
        < cooldown
    ){
        return false;
    }

    giveTurtleExp(1);

    interaction.touchCount += 1;
    interaction.lastTouchRewardAt = now;

    saveUsers();

    return true;

}


// =====================
// 하루 첫 인사
// =====================

function receiveFirstGreeting(){

    if(!currentUser){
        return false;
    }

    const today =
    new Date().toLocaleDateString(
        "sv-SE"
    );

    if(
        currentUser.lastAttendance
        === today
    ){
        return false;
    }

    currentUser.lastAttendance =
    today;

    lastAttendance = today;

    givePoint(
        100,
        "거북이 첫 인사"
    );

    giveTurtleExp(100);

    saveUsers();

    return true;

}