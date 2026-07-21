// =====================
// 상점 목록 표시
// =====================

function updateShop(){

    shopList.innerHTML = "";

    shopItems.forEach(function(item){

        const shopItem =
        document.createElement("section");

        shopItem.className =
        "shop-item";

        let purchaseButton = "";

        if(
            currentUser &&
            currentUser.role === "user"
        ){

            purchaseButton =
            "<button class='buy-button'" +
            " onclick=\"buyItem('" +
            item.id +
            "')\">" +
            "구매" +
            "</button>";

        }

        shopItem.innerHTML =
        "<div class='shop-item-info'>" +
            "<span class='shop-item-emoji'>" +
            item.emoji +
            "</span>" +
            "<span>" +
            item.name +
            "</span>" +
        "</div>" +

        "<div class='shop-item-purchase'>" +
            "<strong>" +
                item.price +
                " P" +
            "</strong>" +
            purchaseButton +
        "</div>";

        shopList.appendChild(
            shopItem
        );

    });

}


// =====================
// 아이템 구매
// =====================

function buyItem(itemId){

    if(
        !currentUser ||
        currentUser.role !== "user"
    ){

        alert(
            "아이 계정에서만 구매할 수 있습니다."
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

    if(point < item.price){

        alert(
            "포인트가 부족합니다."
        );

        return false;

    }

    const confirmed =
    confirm(
        item.name +
        "\n" +
        item.price +
        " P로 구매할까요?"
    );

    if(!confirmed){
        return false;
    }

    const inventoryItem =
    currentUser.inventory.find(
        function(ownedItem){

            return (
                ownedItem.itemId === item.id
            );

        }
    );

    if(inventoryItem){

        inventoryItem.count += 1;

    }else{

        currentUser.inventory.push({

            itemId: item.id,
            count: 1

        });

    }

    usePoint(
        item.price,
        item.name + " 구매"
    );

    saveUsers();

    alert(
        item.name +
        "\n구매 완료!"
    );

    return true;

}