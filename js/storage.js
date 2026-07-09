// =====================
// 퀘스트 저장
// =====================

function saveQuests(){

    const completedData = {};

    quests.forEach(function(quest){

        completedData[quest.id] =
        quest.completed;

    });

    localStorage.setItem(
        "quests",
        JSON.stringify(completedData)
    );

}


// =====================
// 퀘스트 불러오기
// =====================

function loadQuests(){

    const savedData =
    JSON.parse(
        localStorage.getItem("quests")
    );

    if(!savedData){
        return;
    }

    quests.forEach(function(quest){

        if(savedData.hasOwnProperty(quest.id)){

            quest.completed =
            savedData[quest.id];

        }

    });

}