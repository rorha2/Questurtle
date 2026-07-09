// =====================
// 포인트 내역
// =====================

function updateHistory(){

    const box =
    document.getElementById("point-history");

    box.innerHTML =
    "<h3>📜 내역</h3>";

    history.forEach(function(item){

        box.innerHTML +=
        "<p>" + item + "</p>";

    });

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

}


// =====================
// 포인트 표시
// =====================

function updatePoint(){

    pointNumbers.forEach(function(item){

        item.textContent = point;

    });

    localStorage.setItem("point", point);

}


// =====================
// 포인트 지급
// =====================

function givePoint(amount, reason){

    point += amount;

    history.push(
        "+" + amount + " P (" + reason + ")"
    );

    updatePoint();
    updateHistory();

}


// =====================
// 포인트 사용
// =====================

function usePoint(amount, reason){

    point -= amount;

    history.push(
        "-" + amount + " P (" + reason + ")"
    );

    updatePoint();
    updateHistory();

}