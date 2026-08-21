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

function showTurtleSpeech(
    message,
    useCatchphrase = true,
    duration = 5000
){

    const speech =
    document.getElementById("turtle-speech");

    if(!speech || !message){
        return;
    }

    clearTimeout(turtleSpeechTimer);

    const catchphrase =
    getTurtleCatchphrase();

    speech.textContent =
    useCatchphrase && catchphrase
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

    }, duration);

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


let lastTurtleHeartX = null;
let lastTurtleHeartY = null;


// =====================
// 거북이 하트 효과
// =====================

function showTurtleHeart(){

    const turtleStage =
    document.querySelector(
        ".turtle-stage"
    );

    const turtleCharacter =
    document.getElementById(
        "turtle-character"
    );

    if(
        !turtleStage ||
        !turtleCharacter
    ){
        return;
    }

    const stageRect =
    turtleStage.getBoundingClientRect();

    const turtleRect =
    turtleCharacter.getBoundingClientRect();


    const heart =
    document.createElement(
        "span"
    );

    heart.classList.add(
        "turtle-heart"
    );

    heart.textContent = "🧡";


    // 거북이 주변 랜덤 위치

    let randomX;
    let randomY;

    let attempts = 0;

    do{

        randomX =
        Math.random()
        * turtleRect.width
        * 0.8
        + turtleRect.width * 0.1;

        randomY =
        turtleRect.height * 0.15
        + Math.random()
        * turtleRect.height
        * 0.2;

        attempts += 1;

    }while(
        lastTurtleHeartX !== null &&
        Math.hypot(
            randomX - lastTurtleHeartX,
            randomY - lastTurtleHeartY
        ) < 35 &&
        attempts < 5
    );

    lastTurtleHeartX = randomX;
    lastTurtleHeartY = randomY;


    heart.style.left =
    turtleRect.left
    - stageRect.left
    + randomX
    + "px";

    heart.style.top =
    turtleRect.top
    - stageRect.top
    + randomY
    + "px";


    turtleStage.appendChild(
        heart
    );


    heart.addEventListener(
        "animationend",
        function(){

            heart.remove();

        },
        {
            once:true
        }
    );

}


// =====================
// 거북이 하트 효과
// =====================

function showTurtleHearts(){

    const turtleStage =
    document.querySelector(
        ".turtle-stage"
    );

    const turtleCharacter =
    document.getElementById(
        "turtle-character"
    );

    if(
        !turtleStage ||
        !turtleCharacter
    ){
        return;
    }

    const stageRect =
    turtleStage.getBoundingClientRect();

    const turtleRect =
    turtleCharacter.getBoundingClientRect();


    for(let i = 0; i < 3; i++){

        const heart =
        document.createElement(
            "span"
        );

        heart.classList.add(
            "turtle-heart"
        );

        heart.textContent = "🧡";


        const isFlipped =
        turtleCharacter.style.scale === "-1 1";

        const centerX =
        turtleRect.left
        - stageRect.left
        + turtleRect.width
        * (
            isFlipped
                ? 0.68
                : 0.325
        );

        const topY =
        turtleRect.top
        - stageRect.top;


        heart.style.left =
        centerX
        + (i - 1) * 28
        + "px";

        heart.style.top =
        topY
        + turtleRect.height * 0.2
        + Math.abs(i - 1) * 10
        + "px";

        heart.style.animationDelay =
        i * 0.08
        + "s";


        turtleStage.appendChild(
            heart
        );


        heart.addEventListener(
            "animationend",
            function(){

                heart.remove();

            },
            {
                once:true
            }
        );

    }

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
// 상호작용-쓰다듬기 보상
// =====================

function receivePetReward(){

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
            lastTouchRewardAt:0,
            petDate:"",
            petCount:0,
            lastPetRewardAt:0
        };

    }

    const interaction =
    currentUser.turtleInteraction;


    // 기존 데이터 보완

    if(
        typeof interaction.petDate
        !== "string"
    ){
        interaction.petDate = "";
    }

    if(
        typeof interaction.petCount
        !== "number"
    ){
        interaction.petCount = 0;
    }

    if(
        typeof interaction.lastPetRewardAt
        !== "number"
    ){
        interaction.lastPetRewardAt = 0;
    }


    // 날짜가 바뀌면 초기화

    if(interaction.petDate !== today){

        interaction.petDate = today;
        interaction.petCount = 0;
        interaction.lastPetRewardAt = 0;

    }


    // 하루 최대 10회

    if(interaction.petCount >= 10){
        return false;
    }


    // 5분 쿨타임

    if(
        now - interaction.lastPetRewardAt
        < cooldown
    ){
        return false;
    }


    giveTurtleExp(2);

    interaction.petCount += 1;
    interaction.lastPetRewardAt = now;

    saveUsers();

    return true;

}


// =====================
// 상호작용-쓰다듬기 보상
// =====================

function receivePetReward(){

    if(!currentUser){
        return false;
    }

    const now =
    Date.now();

    const cooldown =
    5 * 60 * 1000;


    if(!currentUser.turtleInteraction){

        currentUser.turtleInteraction = {
            touchDate:"",
            touchCount:0,
            lastTouchRewardAt:0,
            lastPetRewardAt:0
        };

    }


    const interaction =
    currentUser.turtleInteraction;


    // 기존 데이터 보완

    if(
        typeof interaction.lastPetRewardAt
        !== "number"
    ){

        interaction.lastPetRewardAt = 0;

    }


    // 5분 쿨타임

    if(
        now - interaction.lastPetRewardAt
        < cooldown
    ){

        return false;

    }


    giveTurtleExp(2);

    interaction.lastPetRewardAt = now;

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