
// =====================
// 퀘스트 표시
// =====================

function updateQuest(){

    questList.innerHTML = "";

    const sections = [

        {
            type: "special",
            title: "⭐ 특별 퀘스트"
        },

        {
            type: "daily",
            title: "📅 일일 퀘스트"
        },

        {
            type: "challenge",
            title: "🏆 도전 퀘스트"
        }
    
    ];

    sections.forEach(function(section){

        questList.innerHTML +=
        `<h2>${section.title}</h2>`;

        quests.forEach(function(quest, index){

            if(quest.type !== section.type){
                return;
            }

            questList.innerHTML +=
            `
            <div class="quest-card">

                <h3>${quest.title}</h3>

                <p>
                    ⭐ ${quest.reward}P
                </p>

                <button
                    onclick="completeQuest(${index})"
                    ${quest.completed ? "disabled" : ""}
                >

                    ${quest.completed ? "완료 ✓" : "완료"}

                </button>

            </div>
            `;

        });

    });

}


// =====================
// 퀘스트 완료
// =====================

function completeQuest(index){

    if(quests[index].completed){
        return;
    }

    quests[index].completed = true;

    givePoint(
        quests[index].reward,
        quests[index].title
    );

    saveQuests();
    updateQuest();
    updateHistory();

}