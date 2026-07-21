// =====================
// 퀘스트 저장
// =====================

function saveQuests(){

    if(!currentUser){
        return;
    }

    const completedData = {};

    quests.forEach(function(quest){

        completedData[quest.id] =
        quest.completed;

    });

    currentUser.questProgress =
    completedData;

    saveUsers();

}


// =====================
// 퀘스트 불러오기
// =====================

function loadQuests(){

    quests.forEach(function(quest){

        quest.completed = false;

    });

    if(!currentUser){
        return;
    }

    const savedData =
    currentUser.questProgress;

    if(!savedData){
        return;
    }

    quests.forEach(function(quest){

        if(
            savedData.hasOwnProperty(
                quest.id
            )
        ){

            quest.completed =
            savedData[quest.id];

        }

    });

}