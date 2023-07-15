function start_game(){
    // TODO: all the initializevar
    playerData = [
    { name: "玩家一", money: 0, shield: 0, dice: [], buff:[], x: 0, y: 0 },
    { name: "玩家二", money: 0, shield: 0, dice: [], buff:[], x: 0, y: 0 },
    { name: "玩家三", money: 0, shield: 0, dice: [], buff:[], x: 0, y: 0 },
    { name: "玩家四", money: 0, shield: 0, dice: [], buff:[], x: 0, y: 0 },
]
    console.log("重新開始");
    for (var i = 0; i < playerData.length; i++) {
        var player = document.getElementById(playerData[i].name);
        player.innerHTML = get_player_data(playerData[i]);
    }
}

function restart(){
    var temp = confirm('確定要重新開始遊戲？本局的遊戲資料將不會保存。');
    if (temp) start_game();
}
    
function roll(){
    var intervalId;
    var diceImage = document.getElementById("big_dice");
    var counter = 0;
    var num = -1;

    intervalId = setInterval(function() {
        counter++;
        num = Math.floor(Math.random() * 6) + 1;
        diceImage.src = "images/dice/" + num + ".png";
        console.log(diceImage.src);
    }, 50);

    setTimeout(function() {
        clearInterval(intervalId);
        var card = document.getElementById("card");
        card.innerHTML = '<br>你骰出了 ' + num;
    }, 1000);
}
