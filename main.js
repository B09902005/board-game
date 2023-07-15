function start_game(){
    // TODO: all the initializevar
    playerData = [
    { name: "玩家一", money: 0, shield: 0, dice: [], buff:[], x: 0, y: 0 },
    { name: "玩家二", money: 0, shield: 0, dice: [], buff:[], x: 0, y: 0 },
    { name: "玩家三", money: 0, shield: 0, dice: [], buff:[], x: 0, y: 0 },
    { name: "玩家四", money: 0, shield: 0, dice: [], buff:[], x: 0, y: 0 },
]
    console.log("重新開始");
}

function restart(){
    var temp = confirm('確定要重新開始遊戲？本局的遊戲資料將不會保存。');
    if (temp) start_game();
}
