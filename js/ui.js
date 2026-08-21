// =====================
// 화면 전환
// =====================

function hideAll(){

    homeScreen.style.display = "none";

    pointScreen.style.display = "none";

    questScreen.style.display = "none";

    shopScreen.style.display = "none";

    bagScreen.style.display = "none";

    settingsScreen.style.display = "none";

    profileEditScreen.style.display = "none";

    adminScreen.style.display = "none";

}


// =====================
// 공용 확인 팝업
// =====================

function showConfirm(
    message,
    cancelText = "아니요",
    okText = "네"
){

    return new Promise(function(resolve){

        confirmMessage.textContent =
        message;

        confirmCancelButton.textContent =
        cancelText;

        confirmOkButton.textContent =
        okText;


        confirmOverlay.classList.add(
            "is-open"
        );

        confirmOverlay.setAttribute(
            "aria-hidden",
            "false"
        );


        function closeConfirm(result){

            confirmOverlay.classList.remove(
                "is-open"
            );

            confirmOverlay.setAttribute(
                "aria-hidden",
                "true"
            );

            confirmCancelButton.removeEventListener(
                "click",
                handleCancel
            );

            confirmOkButton.removeEventListener(
                "click",
                handleOk
            );

            resolve(result);

        }


        function handleCancel(){

            closeConfirm(false);

        }


        function handleOk(){

            closeConfirm(true);

        }


        confirmCancelButton.addEventListener(
            "click",
            handleCancel
        );

        confirmOkButton.addEventListener(
            "click",
            handleOk
        );

    });

}