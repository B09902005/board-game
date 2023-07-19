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

function output_player(player){
    var p = document.getElementById(player.name);
    p.innerHTML = get_player_data(player);
    var player_icon = document.getElementById(player.name + "_icon");
    player_icon.style.marginLeft = 40 * player.x + player.id % 2 * 10 + 30 + "px";
    player_icon.style.marginTop = 40 * player.y + Math.floor(player.id/2) * 10 + "px";
}

function start_game(){
    init();
    console.log("重新開始");
    for (var i = 0; i < playerData.length; i++) output_player(playerData[i]);
    main();
}

function restart(){
    var temp = confirm('確定要重新開始遊戲？本局的遊戲資料將不會保存。');
    if (temp) location.reload();
}
      
