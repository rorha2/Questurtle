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
// 터치 이벤트 연결
// =====================

if(turtleCharacter){

    turtleCharacter.addEventListener(
        "click",
        handleTurtleTouch
    );

}