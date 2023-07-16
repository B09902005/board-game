async function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
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
    return num;
}

function start_game(){
    playerData = [
    { name: "玩家一", id:0, money: 0, shield: 0, dice: [], buff:[], x: 0, y: 23 },
    { name: "玩家二", id:1, money: 0, shield: 0, dice: [], buff:[], x: 0, y: 23 },
    { name: "玩家三", id:2, money: 0, shield: 0, dice: [], buff:[], x: 0, y: 23 },
    { name: "玩家四", id:3, money: 0, shield: 0, dice: [], buff:[], x: 0, y: 23 },
]
    console.log("重新開始");
    for (var i = 0; i < playerData.length; i++) {
        var player = document.getElementById(playerData[i].name);
        player.innerHTML = get_player_data(playerData[i]);
        var player_icon = document.getElementById(playerData[i].name + "_icon");
        player_icon.style.marginLeft = 40 * playerData[i].x + i % 2 * 10 + 30 + "px";
        player_icon.style.marginTop = 40 * playerData[i].y + Math.floor(i/2) * 10 + "px";
    }
    main();
}

function restart(){
    var temp = confirm('確定要重新開始遊戲？本局的遊戲資料將不會保存。');
    if (temp) start_game();
}
      
