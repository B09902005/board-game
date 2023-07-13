function start_game(){
    // TODO: all the initialize
    console.log("重新開始");
}

function restart(){
    var temp = confirm('確定要重新開始遊戲？本局的遊戲資料將不會保存。');
    if (temp) start_game();
}
