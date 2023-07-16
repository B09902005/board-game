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

async function moveAI(player){
    console.log(player);
    var diceNumber = await roll();
    var card = document.getElementById("card");
    card.innerHTML = '<br>' + player.name + '骰出了 ' + diceNumber;
    console.log(player.name + " rolled " + diceNumber);
    await sleep(1000);
    var paths = find_all_paths(player, diceNumber);
    var path = paths[Math.floor(Math.random()*paths.length)]
    console.log(paths, path);
    player.x = path[diceNumber].x;
    player.y = path[diceNumber].y;
    var player_icon = document.getElementById(player.name + "_icon");
    player_icon.style.marginLeft = 40 * player.x + player.id % 2 * 10 + 30 + "px";
    player_icon.style.marginTop = 40 * player.y + Math.floor(player.id/2) * 10 + "px";
}

async function main(){
    while (true) {
        for (var i = 0; i < playerData.length; i++) {
            if (i == 0) await moveAI(playerData[i]);
            else await moveAI(playerData[i]);
            await sleep(1000);
            if ((playerData[i].x == 9) && (playerData[i].y == 12)) break;
        }
        //break;
    }
}
