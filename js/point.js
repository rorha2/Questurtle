// =====================
// 포인트 내역 날짜 표시
// =====================

function formatHistoryDate(createdAt){

    const date = new Date(createdAt);

    return (
        String(date.getFullYear()).slice(-2) +
        ". " +
        (date.getMonth() + 1) +
        ". " +
        date.getDate() +
        "."
    );

}

function formatHistoryTime(createdAt){

    const date = new Date(createdAt);

    const hour = date.getHours();

    const period =
    hour < 12 ? "AM" : "PM";

    const displayHour =
    hour % 12 || 12;

    const minute =
    String(date.getMinutes()).padStart(2, "0");

    return (
        date.getFullYear() +
        ". " +
        (date.getMonth() + 1) +
        ". " +
        date.getDate() +
        ". " +
        period +
        " " +
        displayHour +
        ":" +
        minute
    );

}

function escapeHistoryText(text){

    return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

}


// =====================
// 포인트 내역
// =====================

function updateHistory(){

    const box =
    document.getElementById(
        "point-history"
    );

    let historyRows = "";

    history
    .slice()
    .reverse()
    .forEach(function(item){

        const isAdd =
        item.type === "add";

        const addAmount =
        isAdd
        ? "+" + item.amount.toLocaleString()
        : "";

        const useAmount =
        !isAdd
        ? "−" + item.amount.toLocaleString()
        : "";

        const shortDate =
        formatHistoryDate(item.createdAt);

        const exactTime =
        formatHistoryTime(item.createdAt);

        historyRows +=
        "<div class='history-row'>" +

            "<div class='history-cell history-date-cell'>" +

                "<button" +
                " type='button'" +
                " class='history-date'" +
                " aria-expanded='false'>" +

                    shortDate +

                    "<span class='history-time'>" +
                        exactTime +
                    "</span>" +

                "</button>" +

            "</div>" +

            "<div class='history-cell history-content'>" +
                escapeHistoryText(
                    item.description
                ) +
            "</div>" +

            "<div class='history-cell history-add'>" +
                addAmount +
            "</div>" +

            "<div class='history-cell history-use'>" +
                useAmount +
            "</div>" +

            "<div class='history-cell history-balance'>" +
                item.balanceAfter.toLocaleString() +
            "</div>" +

        "</div>";

    });

    if(historyRows === ""){

        historyRows =
        "<p class='history-empty'>" +
            "아직 포인트 내역이 없어요." +
        "</p>";

    }

    box.innerHTML =
    "<h3>📜 내역</h3>" +

    "<div class='history-table'>" +

        "<div class='history-row history-header'>" +

            "<div class='history-cell'>날짜</div>" +

            "<div class='history-cell'>내용</div>" +

            "<div class='history-cell'>＋</div>" +

            "<div class='history-cell'>－</div>" +

            "<div class='history-cell'>잔여</div>" +

        "</div>" +

        historyRows +

    "</div>";

    const isTouchDevice =
        window.matchMedia(
            "(hover: none), (pointer: coarse)"
        ).matches;

    if(isTouchDevice){

        const dateButtons =
        box.querySelectorAll(".history-date");

        dateButtons.forEach(function(button){

            button.addEventListener(
                "click",
                function(event){

                    event.stopPropagation();

                    const willOpen =
                    !button.classList.contains(
                        "is-open"
                    );

                    document
                    .querySelectorAll(
                        ".history-date.is-open"
                    )
                    .forEach(function(openButton){

                        openButton.classList.remove(
                            "is-open"
                        );

                        openButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    });

                    if(willOpen){

                        button.classList.add(
                            "is-open"
                        );

                        button.setAttribute(
                            "aria-expanded",
                            "true"
                        );

                    }

                }
            );

        });

    }

    if(currentUser){

        currentUser.history =
        history;

        saveUsers();

    }

}

// 날짜에 시간 표시 팝업(다른 곳 누르면 닫힘)
document.addEventListener(
    "click",
    function(){

        document
        .querySelectorAll(
            ".history-date.is-open"
        )
        .forEach(function(button){

            button.classList.remove(
                "is-open"
            );

            button.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    }
);


// =====================
// 포인트 표시
// =====================

function updatePoint(){

    pointNumbers.forEach(function(item){

        item.textContent = point;

    });

    if(currentUser){

        currentUser.point =
        point;

        saveUsers();

    }

}


// =====================
// 포인트 지급
// =====================

function givePoint(amount, reason){

    point += amount;

    history.push({

        type: "add",

        amount: amount,

        description: reason,

        createdAt:
        new Date().toISOString(),

        balanceAfter: point

    });

    updatePoint();
    updateHistory();

}


// =====================
// 포인트 사용
// =====================

function usePoint(amount, reason){

    if(
        !Number.isFinite(amount) ||
        amount <= 0
        ){
        return false;
    }

    if(amount > point){

        alert(
            "보유 포인트가 부족해요.\n" +
            "현재 포인트: " +
            point.toLocaleString() +
            "P"
        );

        return false;

    }

    point -= amount;

        history.push({

        type: "use",

        amount: amount,

        description: reason,

        createdAt:
        new Date().toISOString(),

        balanceAfter: point

    });

    updatePoint();
    updateHistory();

    return true;

}