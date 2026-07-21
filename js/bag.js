// =====================
// 가방 목록 표시
// =====================

function updateBag(){

    bagList.innerHTML = "";

    if(
        !currentUser ||
        !Array.isArray(
            currentUser.inventory
        ) ||
        currentUser.inventory.length === 0
    ){

        bagList.innerHTML =
        "<p class='bag-empty'>" +
        "가방이 비어 있어요." +
        "</p>";

        return;

    }

    currentUser.inventory.forEach(
        function(ownedItem){

            const item =
            shopItems.find(
                function(shopItem){

                    return (
                        shopItem.id ===
                        ownedItem.itemId
                    );

                }
            );

            if(!item){
                return;
            }

            const bagItem =
            document.createElement(
                "section"
            );

            bagItem.className =
            "bag-item";

            bagItem.innerHTML =
            "<div class='shop-item-info'>" +
                "<span class='shop-item-emoji'>" +
                    item.emoji +
                "</span>" +
                "<span>" +
                    item.name +
                "</span>" +
            "</div>" +

            "<div class='bag-item-action'>" +

                "<strong class='bag-item-count'>" +
                    ownedItem.count +
                    "개" +
                "</strong>" +

                "<button class='use-item-button'" +
                " onclick=\"useInventoryItem('" +
                item.id +
                "')\">" +
                    "사용" +
                "</button>" +

            "</div>";

            bagList.appendChild(
                bagItem
            );

        }
    );

}


// =====================
// 가방 아이템 사용
// =====================

function useInventoryItem(itemId){

    if(
        !currentUser ||
        currentUser.role !== "user"
    ){

        alert(
            "아이 계정에서만 사용할 수 있습니다."
        );

        return false;

    }

    const item =
    shopItems.find(function(shopItem){

        return shopItem.id === itemId;

    });

    if(!item){
        return false;
    }

    const inventoryItem =
    currentUser.inventory.find(
        function(ownedItem){

            return (
                ownedItem.itemId === itemId
            );

        }
    );

    if(
        !inventoryItem ||
        inventoryItem.count <= 0
    ){
        return false;
    }

    const confirmed =
    confirm(
        item.name +
        "\n거북이에게 줄까요?"
    );

    if(!confirmed){
        return false;
    }

    currentUser.turtle.exp +=
    item.exp;

    inventoryItem.count -= 1;

    currentUser.inventory =
    currentUser.inventory.filter(
        function(ownedItem){

            return ownedItem.count > 0;

        }
    );

    let leveledUp = false;

    while(
        currentUser.turtle.exp >=
        currentUser.turtle.maxExp
    ){

        currentUser.turtle.exp -=
        currentUser.turtle.maxExp;

        currentUser.turtle.level += 1;

        leveledUp = true;

    }

    saveUsers();

    updateBag();

    updateCurrentUserProfile();

    let message =
    item.name +
    "\nEXP +" +
    item.exp;

    if(leveledUp){

        message +=
        "\n🎉 레벨 업!";

    }

    alert(message);

    return true;

}