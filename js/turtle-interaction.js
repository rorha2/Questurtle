// =====================
// 거북이 상호작용
// =====================

const turtleCharacter =
document.getElementById(
    "turtle-character"
);


// =====================
// 거북이 터치
// =====================

function handleTurtleTouch(){

    const isFirstGreeting =
    receiveFirstGreeting();

    const dialogueType =
    isFirstGreeting
        ? "greeting"
        : "touch";

    const message =
    getRandomTurtleDialogue(
        dialogueType
    );

    showTurtleSpeech(message);

    if(isFirstGreeting){

        showTurtleReward([
            {
                type:"xp",
                amount:100,
                label:"XP"
            },
            {
                type:"point-reward",
                amount:100,
                label:"P"
            }
        ]);

    }else{

        const receivedTouchReward =
        receiveTouchReward();

        if(receivedTouchReward){

            showTurtleReward([
                {
                    type:"xp",
                    amount:1,
                    label:"XP"
                }
            ]);

        }

    }

    turtleCharacter.classList.remove(
        "touch"
    );

    void turtleCharacter.offsetWidth;

    turtleCharacter.classList.add(
        "touch"
    );

}


// =====================
// 상호작용 상태
// =====================

let turtlePressTimer = null;
let turtleInteractionType = null;
let turtleIsPressing = false;

let turtleStartX = 0;
let turtleStartY = 0;

let turtleDragStartX = 0;
let turtleDragStartY = 0;

const TURTLE_HOLD_TIME = 1000;
const TURTLE_MOVE_THRESHOLD = 8;

// 쓰다듬기 (pet)
let turtlePetFrame = 1;
let turtleLastPetX = 0;
let turtlePetDirection = 0;
let turtlePetDirectionStartX = 0;

const TURTLE_PET_TURN_DISTANCE = 10;

// 들어올리기 (lift)
let turtleLiftFrame = 1;
let turtleLiftAnimation = null;

const TURTLE_LIFT_FRAME_INTERVAL = 180;

let turtleWalkTimer = null;
let turtleIsWalking = false;

const TURTLE_WALK_MOVE_INTERVAL = 15;
const TURTLE_WALK_FRAME_INTERVAL = 160;
const TURTLE_WALK_STEP = 1;

// 자율산책
let turtleWanderTimer = null;

const TURTLE_WANDER_MIN_DELAY = 7000;
const TURTLE_WANDER_MAX_DELAY = 16000;

const TURTLE_WANDER_MOVE_INTERVAL = 30;
const TURTLE_WANDER_FRAME_INTERVAL = 200;
const TURTLE_WANDER_STEP = 1;


// =====================
// 누르기 시작
// =====================

function handleTurtlePointerDown(event){

    event.preventDefault();

    clearTimeout(
        turtleWanderTimer
    );

    clearInterval(
        turtleWalkTimer
    );

    turtleWalkTimer = null;
    turtleIsWalking = false;

    turtleIsPressing = true;
    turtleInteractionType = null;

    turtleStartX = event.clientX;
    turtleStartY = event.clientY;

    const dragLayer =
    turtleCharacter.closest(
        ".turtle-drag-layer"
    );

    if(dragLayer){

        turtleDragStartX =
        parseFloat(
            dragLayer.dataset.moveX || 0
        );

        turtleDragStartY =
        parseFloat(
            dragLayer.dataset.moveY || 0
        );

    }

    turtleCharacter.setPointerCapture(
        event.pointerId
    );

    turtlePressTimer =
    setTimeout(function(){

        if(!turtleIsPressing){
            return;
        }

        turtleInteractionType = "hold";

        hideTurtleSpeech();

        console.log(
            "거북이 들어올리기!"
        );

        turtleLiftFrame = 1;

        turtleCharacter.src =
        "images/characters/turtle-lift-1.png";

        turtleLiftAnimation =
        setInterval(function(){

            turtleLiftFrame =
            turtleLiftFrame === 1
                ? 2
                : 1;

            turtleCharacter.src =
            "images/characters/turtle-lift-"
            + turtleLiftFrame
            + ".png";

        }, TURTLE_LIFT_FRAME_INTERVAL);

    }, TURTLE_HOLD_TIME);

}


// =====================
// 누른 채 움직이기
// =====================

function handleTurtlePointerMove(event){

    if(!turtleIsPressing){
        return;
    }

    if(turtleInteractionType === "hold"){

        const dragLayer =
        turtleCharacter.closest(
            ".turtle-drag-layer"
        );

        const turtleStage =
        turtleCharacter.closest(
            ".turtle-stage"
        );

        const stageRect =
        turtleStage.getBoundingClientRect();

        const turtleRect =
        turtleCharacter.getBoundingClientRect();

        let moveX =
        turtleDragStartX
        + event.clientX
        - turtleStartX;

        let moveY =
        turtleDragStartY
        + event.clientY
        - turtleStartY;


        const currentX =
        parseFloat(
            dragLayer.dataset.moveX || 0
        );

        const currentY =
        parseFloat(
            dragLayer.dataset.moveY || 0
        );


        const originalLeft =
        turtleRect.left - currentX;

        const originalRight =
        turtleRect.right - currentX;

        const originalTop =
        turtleRect.top - currentY;

        const originalBottom =
        turtleRect.bottom - currentY;


        const TURTLE_EDGE_MARGIN_X = 10;
        const TURTLE_EDGE_MARGIN_Y = 30;


        const minX =
        stageRect.left - originalLeft
        - TURTLE_EDGE_MARGIN_X;

        const maxX =
        stageRect.right - originalRight
        + TURTLE_EDGE_MARGIN_X;

        const minY =
        stageRect.top - originalTop
        - TURTLE_EDGE_MARGIN_Y;

        const maxY =
        stageRect.bottom - originalBottom
        + TURTLE_EDGE_MARGIN_Y;


        moveX =
        Math.max(
            minX,
            Math.min(maxX, moveX)
        );

        moveY =
        Math.max(
            minY,
            Math.min(maxY, moveY)
        );


        dragLayer.style.transform =
        "translate("
        + moveX
        + "px, "
        + moveY
        + "px)";

        dragLayer.dataset.moveX =
        moveX;

        dragLayer.dataset.moveY =
        moveY;

        return;
    }

    const moveX =
    Math.abs(
        event.clientX - turtleStartX
    );

    const moveY =
    Math.abs(
        event.clientY - turtleStartY
    );

    if(
    moveX > TURTLE_MOVE_THRESHOLD ||
    moveY > TURTLE_MOVE_THRESHOLD
    ){

        clearTimeout(
            turtlePressTimer
        );

        if(
            turtleInteractionType
            !== "pet"
        ){

            turtleInteractionType =
            "pet";

            turtlePetFrame = 1;
            turtleLastPetX = event.clientX;
            turtlePetDirection = 0;
            turtlePetDirectionStartX = event.clientX;

            console.log(
                "거북이 쓰다듬기!"
            );

        }

        const petMoveX =
        event.clientX - turtleLastPetX;

        const newDirection =
        petMoveX > 0
            ? 1
            : petMoveX < 0
                ? -1
                : 0;


        if(
            turtlePetDirection === 0 &&
            newDirection !== 0
        ){

            turtlePetDirection =
            newDirection;

            turtlePetDirectionStartX =
            event.clientX;

        }


        if(
            newDirection !== 0 &&
            newDirection !== turtlePetDirection
        ){

            const turnDistance =
            Math.abs(
                event.clientX
                - turtlePetDirectionStartX
            );

            if(
                turnDistance
                >= TURTLE_PET_TURN_DISTANCE
            ){

                turtlePetDirection =
                newDirection;

                turtlePetDirectionStartX =
                event.clientX;

                turtlePetFrame =
                turtlePetFrame === 1
                    ? 2
                    : 1;

                turtleCharacter.src =
                "images/characters/turtle-pet-"
                + turtlePetFrame
                + ".png";

            }

        }


        if(
            newDirection === turtlePetDirection
        ){

            turtlePetDirectionStartX =
            event.clientX;

        }

        turtleLastPetX =
        event.clientX;

    }

}


// =====================
// 거북이 걷기
// =====================

function walkTurtleTo(
    targetX,
    moveInterval = TURTLE_WALK_MOVE_INTERVAL,
    frameInterval = TURTLE_WALK_FRAME_INTERVAL,
    step = TURTLE_WALK_STEP
){

    const dragLayer =
    turtleCharacter.closest(
        ".turtle-drag-layer"
    );

    if(!dragLayer){
        return;
    }

    clearInterval(
        turtleWalkTimer
    );

    turtleIsWalking = true;

    let currentX =
    parseFloat(
        dragLayer.dataset.moveX || 0
    );

    let turtleWalkFrame = 1;
    let lastWalkFrameAt = 0;


    turtleWalkTimer =
    setInterval(function(){

        const distance =
        targetX - currentX;

        const direction =
        distance > 0
            ? 1
            : -1;


        // ----- 걷는 방향 -----

        if(direction < 0){

            turtleCharacter.style.scale =
            "1 1";

        }else{

            turtleCharacter.style.scale =
            "-1 1";

        }


        // ----- 위치 이동 -----

        if(
            Math.abs(distance)
            <= step
        ){

            currentX = targetX;

        }else{

            currentX +=
            direction
            * step;

        }


        dragLayer.style.transform =
        "translate("
        + currentX
        + "px, 0px)";

        dragLayer.dataset.moveX =
        currentX;

        dragLayer.dataset.moveY = 0;


        // ----- 걷기 프레임 -----

        const now =
        Date.now();

        if(
            now - lastWalkFrameAt
            >= frameInterval
        ){

            turtleCharacter.src =
            "images/characters/turtle-walk-"
            + turtleWalkFrame
            + ".png";

            turtleWalkFrame++;

            if(turtleWalkFrame > 6){
                turtleWalkFrame = 1;
            }

            lastWalkFrameAt = now;

        }


        // ----- 목적지 도착 -----

        if(currentX === targetX){

            clearInterval(
                turtleWalkTimer
            );

            turtleWalkTimer = null;
            turtleIsWalking = false;

            turtleCharacter.src =
            "images/characters/turtle-idle-1.png";

            scheduleTurtleWander();

        }

    }, moveInterval);

}


// =====================
// 거북이 자율 산책
// =====================

function scheduleTurtleWander(){

    clearTimeout(
        turtleWanderTimer
    );

    const delay =
    TURTLE_WANDER_MIN_DELAY
    + Math.random()
    * (
        TURTLE_WANDER_MAX_DELAY
        - TURTLE_WANDER_MIN_DELAY
    );

    turtleWanderTimer =
    setTimeout(function(){

        if(
            turtleIsPressing ||
            turtleIsWalking
        ){
            scheduleTurtleWander();
            return;
        }

        const dragLayer =
        turtleCharacter.closest(
            ".turtle-drag-layer"
        );

        const turtleStage =
        turtleCharacter.closest(
            ".turtle-stage"
        );

        if(
            !dragLayer ||
            !turtleStage
        ){
            return;
        }


        const stageRect =
        turtleStage.getBoundingClientRect();

        const turtleRect =
        turtleCharacter.getBoundingClientRect();


        const maxWalkX =
        Math.max(
            0,
            (
                stageRect.width
                - turtleRect.width
            ) / 2
            + 10
        );


        const currentX =
        parseFloat(
            dragLayer.dataset.moveX || 0
        );


        let targetX =
        (
            Math.random() * 2 - 1
        )
        * maxWalkX;


        // 너무 찔끔 움직이지 않도록
        if(
            Math.abs(
                targetX - currentX
            ) < 35
        ){

            targetX =
            currentX <= 0
                ? maxWalkX
                : -maxWalkX;

        }


        walkTurtleTo(
            Math.round(targetX),
            TURTLE_WANDER_MOVE_INTERVAL,
            TURTLE_WANDER_FRAME_INTERVAL,
            TURTLE_WANDER_STEP
        );

    }, delay);

}


// =====================
// 누르기 종료
// =====================

function handleTurtlePointerUp(){

    clearTimeout(
        turtlePressTimer
    );

    clearInterval(
        turtleLiftAnimation
    );

    turtleLiftAnimation = null;

    const dragLayer =
    turtleCharacter.closest(
        ".turtle-drag-layer"
    );

    if(dragLayer){

        const currentX =
        parseFloat(
            dragLayer.dataset.moveX || 0
        );

        const currentY =
        parseFloat(
            dragLayer.dataset.moveY || 0
        );

        if(
            turtleInteractionType === "hold"
        ){

            dragLayer.classList.add(
                "dropping"
            );

            dragLayer.style.transform =
            "translate("
            + currentX
            + "px, 0px)";

            dragLayer.dataset.moveX =
            currentX;

            dragLayer.dataset.moveY = 0;

            setTimeout(function(){

                dragLayer.classList.remove(
                    "dropping"
                );

                turtleCharacter.classList.add(
                    "landing"
                );


                setTimeout(function(){

                    turtleCharacter.classList.remove(
                        "landing"
                    );

                    walkTurtleTo(0);

                }, 300);

            }, 500);

        }

    }

    if(
        turtleInteractionType === null
    ){

        handleTurtleTouch();

    }

    turtleIsPressing = false;

    turtleCharacter.src =
    "images/characters/turtle-idle-1.png";

    if(
        turtleInteractionType !== "hold"
    ){

        scheduleTurtleWander();

    }

    turtleInteractionType = null;

}


// =====================
// 터치 이벤트 연결
// =====================

if(turtleCharacter){

    turtleCharacter.addEventListener(
        "pointerdown",
        handleTurtlePointerDown
    );

    turtleCharacter.addEventListener(
        "pointermove",
        handleTurtlePointerMove
    );

    turtleCharacter.addEventListener(
        "pointerup",
        handleTurtlePointerUp
    );

    turtleCharacter.addEventListener(
        "pointercancel",
        handleTurtlePointerUp
    );

}

scheduleTurtleWander();
