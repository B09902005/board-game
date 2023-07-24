async function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function roll2(){
    global_dice = 10;
}

async function roll(){
    var intervalId;
    var diceImage = document.getElementById("big_dice");
    var counter = 0;
    var num = -1;
    for (var i=0 ; i<20 ; i++){
        var temp = num;
        while (temp == num) temp = Math.floor(Math.random() * 6) + 1;
        num = temp;
        diceImage.src = "images/dice/" + num + ".png";
        await sleep(50);
    }
    global_dice = num;
    return num;
}

function openmodal(){
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
}

window.addEventListener("click", (event) => {
    const modal = document.getElementById("myModal");
    const button = document.getElementById("door")
    if (event.target != button){
        modal.style.display = "none";
    }
});

function output_player(player){
    var p = document.getElementById(player.name);
    p.innerHTML = get_player_data(player);
    var player_icon = document.getElementById(player.name + "_icon");
    player_icon.style.marginLeft = 40 * player.x + player.id % 2 * 10 + 30 + "px";
    player_icon.style.marginTop = 40 * player.y + Math.floor(player.id/2) * 10 + "px";
}

async function start_game(){
    init();
    console.log("遊戲開始");
    for (var i = 0; i < playerData.length; i++) output_player(playerData[i]);
    my_turn(0);
}

function restart(){
    var temp = confirm('確定要重新開始遊戲？本局的遊戲資料將不會保存。');
    if (temp) location.reload();
}

async function transferto(player, place, m){
    var money = m;
    if (have_buff(player, 10) == true) money = money / 2;
    if (player.money < money){
        alert("玩家金錢不足");
        return m;
    }
    var temp = true;
    if (player.person == true) temp = confirm('確定要花費$' + money + '，在這回合移動到' + place + '？');
    if (temp == true){
        player.money -= money;
        var card = document.getElementById("card");
        card.innerHTML = ('<br>' + player.name + '花' + money + '元，使用傳送門移動至' + place);
        console.log(player.name, '花', money, '元，使用傳送門移動至', place);
        var ques = {id:999, money: 0, description: ""};
        if (place == '車站') ques.id = 12;
        if (place == '廣場') ques.id = 14;
        if (place == '終點') ques.id = -1;
        await use_ques(ques, player);
    }
    return m;
}
