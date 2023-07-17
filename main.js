function find_all_paths(player, num){
    if (num == 0) return [[{x:player.x, y:player.y}]];
    var prev_paths = find_all_paths(player, num-1);
    var paths = [];
    var dx = [-1,0,1,0];
    var dy = [0,1,0,-1];
    for (const path of prev_paths){
        for (var i=0 ; i<4 ; i++){
            var last = {x:path[num-1].x+dx[i], y:path[num-1].y+dy[i]};
            if ((num >= 2) && (last.x == path[num-2].x) && (last.y == path[num-2].y)) continue;
            if ((last.x<0) || (last.y<0) || (last.y>=tileData.length) || (last.x>=tileData[last.y].length)) continue;
            if (tileData[last.y][last.x].class == "tile nothing") continue;
            var temppath = path.concat([last]);
            paths.push(temppath);
        }
    }
    return paths;
}

function get_buff(player){
    var card = document.getElementById("card");
    if (tileData[player.y][player.x].class == "tile money"){
        player.money += 30;
        card.innerHTML = '<br>' + player.name + '獲得30元';
    }
    if (tileData[player.y][player.x].class == "tile star"){
        var star = starData.shift();
        if (star.type == "shield"){
            player.shield += 1;
            card.innerHTML = '<br>' + player.name + '獲得嫁禍無效卡';
        }
        if (star.type == "dice"){
            player.dice.push(star.description);
            card.innerHTML = '<br>' + player.name + '獲得控骰卡：骰' + star.description;
        }
        if (star.type == "buff"){
            player.buff.push(star.description);
            card.innerHTML = '<br>' + player.name + '獲得永久效果卡：' + star.description;
        }
        console.log(starData);
    }
    if (tileData[player.y][player.x].class == "tile ques"){
        var ques = quesData[quesData[quesData.length-1]];
        card.innerHTML = '<br>' + '？卡效果：' + ques.description;
        quesData[quesData.length-1] = (quesData[quesData.length-1] + 1) % (quesData.length-1);
        console.log(quesData);
    }
    output_player(player);
}

async function moveAI(player){
    var diceNumber = await roll();
    var card = document.getElementById("card");
    card.innerHTML = '<br>' + player.name + '骰出了 ' + diceNumber;
    console.log(player.name + " rolled " + diceNumber);
    await sleep(1000);
    var paths = find_all_paths(player, diceNumber);
    var path = paths[Math.floor(Math.random()*paths.length)]
    console.log(path[0].x, path[0].y, 'to', path[diceNumber].x, path[diceNumber].y);
    for (var i=1 ; i<=diceNumber ; i++){
        player.x = path[i].x;
        player.y = path[i].y;
        output_player(player);
        await sleep(500);
    }
    await sleep(1000);
    get_buff(player);
}

async function main(){
    while (true) {
        for (var i = 0; i < playerData.length; i++) {
            if (i == 0) await moveAI(playerData[i]);
            else await moveAI(playerData[i]);
            await sleep(1000);
            if ((playerData[i].x == 9) && (playerData[i].y == 12)) break;
        }
    }
}
