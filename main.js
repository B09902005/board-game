function have_buff(player, id){
    for (var j=0 ; j<player.buff.length ; j++){
        if (player.buff[j].type != "buff") continue;
        if (player.buff[j].id == id) return true;
    }
    return false;
}

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

function distance_to_terminal(x, y){
    var distance = [];
    for (var i=0 ; i<tileData.length ; i++){
        distance.push([]);
        for (var j=0 ; j<tileData[0].length ; j++) distance[i].push(99999);
    }
    var list = [{x:9, y:12}];
    var distance_now = 0;
    distance[9][12] = 0;
    var dx = [-1,0,1,0];
    var dy = [0,1,0,-1];
    while (list.length != 0){
        distance_now += 1;
        var templist = [];
        for (const point of list){
            for (var i=0 ; i<4 ; i++){
                var last = {x:point.x+dx[i], y:point.y+dy[i]};
                if ((last.x<0) || (last.y<0) || (last.y>=tileData.length) || (last.x>=tileData[last.y].length)) continue;
                if (tileData[last.y][last.x].class == "tile nothing") continue;
                if (distance[last.y][last.x] <= distance_now) continue;
                distance[last.y][last.x] = distance_now;
                templist.push(last);
            }
        }
        list = templist;
    }
    console.log(x, y, distance[y][x]);
    return distance[y][x];
}

async function use_ques(ques, player){
    if (player == null) return;
    if (ques.id < 15){
        var src = {x:player.x, y:player.y};
        var dest = {x:0, y:23};
        if (ques.id == 0) dest = {x:0, y:23};
        if (ques.id == 1) dest = {x:0, y:23};
        if (ques.id == 2) dest = {x:3, y:22};
        if (ques.id == 3) dest = {x:2, y:19};
        if (ques.id == 4) dest = {x:10, y:23};
        if (ques.id == 5) dest = {x:18, y:19};
        if (ques.id == 6) dest = {x:18, y:19};
        if (ques.id == 7) dest = {x:0, y:9};
        if (ques.id == 8) dest = {x:13, y:6};
        if (ques.id == 9) dest = {x:16, y:5};
        if (ques.id == 10) dest = {x:18, y:0};
        if (ques.id == 11) dest = {x:2, y:0};
        if (ques.id == 12) dest = {x:7, y:0};
        if (ques.id == 13) dest = {x:9, y:9};
        if (ques.id == 14) dest = {x:9, y:9};
        if (ques.id == -1) dest = {x:9, y:12};
        for (var i=1 ; i<=100 ; i++){
            player.x = (i*dest.x + (100-i)*src.x) / 100;
            player.y = (i*dest.y + (100-i)*src.y) / 100;
            output_player(player);
            await sleep(10);
        }
    }
    if (ques.id == 15) player.money += 50;
    if (ques.id == 16) player.money += 100;
    if (ques.id == 17) player.money += 100;
    if (ques.id == 18) player.money += 200;
    if (ques.id == 19) player.money -= 50;
    if (ques.id == 20) player.money -= 100;
    if (ques.id == 21) player.money = 0;
    if (ques.id == 22){
        for (var i=0 ; i<player.shield ; i++) starData.push({type: "shield", description:""});
        for (var i=0 ; i<player.dice.length ; i++) starData.push({type: "dice", description:player.dice[i]});
        for (var i=0 ; i<player.buff.length ; i++) starData.push(player.buff[i]);
        player.shield = 0;
        player.dice = [];
        player.buff = [];
    }
    if (ques.id == 23){
        for (var i=0 ; i<player.dice.length ; i++) starData.push({type: "dice", description:player.dice[i]});
        player.dice = [];
    }
    if (ques.id == 24){
        for (var i=0 ; i<player.buff.length ; i++) starData.push(player.buff[i]);
        player.buff = [];
    }
    if (ques.id == 25){
        var tempid = (player.id+1)%4;
        for (var i=0 ; i<4 ; i++){
            if (playerData[i].name == player.name) continue;
            if (distance_to_terminal(playerData[i].x, playerData[i].y) < distance_to_terminal(playerData[tempid].x, playerData[tempid].y)) tempid = i;
        }
        var src = {x:player.x, y:player.y};
        var dest = {x:playerData[tempid].x, y:playerData[tempid].y};
        for (var i=1 ; i<=100 ; i++){
            player.x = (i*dest.x + (100-i)*src.x) / 100;
            player.y = (i*dest.y + (100-i)*src.y) / 100;
            output_player(player);
            playerData[tempid].x = (i*src.x + (100-i)*dest.x) / 100;
            playerData[tempid].y = (i*src.y + (100-i)*dest.y) / 100;
            output_player(playerData[tempid]);
            await sleep(10);
        }
        output_player(playerData[tempid]);
    }
    if (ques.id == 26){
        var tempid = (player.id+1)%4;
        for (var i=0 ; i<4 ; i++){
            if (playerData[i].name == player.name) continue;
            if (playerData[i].money > playerData[tempid].money) tempid = i;
        }
        [player.money, playerData[tempid].money] = [playerData[tempid].money, player.money];
        output_player(playerData[tempid]);
    }
    if (ques.id == 27){
        var tempid = (player.id+1)%4;
        for (var i=0 ; i<4 ; i++){
            if (playerData[i].name == player.name) continue;
            if (playerData[i].shield + playerData[i].dice.length + playerData[i].buff.length > playerData[tempid].shield + playerData[tempid].dice.length + playerData[tempid].buff.length) tempid = i;
        }
        [player.shield, playerData[tempid].shield] = [playerData[tempid].shield, player.shield];
        [player.dice, playerData[tempid].dice] = [playerData[tempid].dice, player.dice];
        [player.buff, playerData[tempid].buff] = [playerData[tempid].buff, player.buff];
        output_player(playerData[tempid]);
    }
    if (ques.id >= 28){
        for (var i=0 ; i<2 ; i++){
            await sleep(1000);
            if (starData.length == 0){
                card.innerHTML = '<br>道具卡已經全部分發完';
                continue;
            }
            var star = starData.shift();
            if (star.type == "shield"){
                player.shield += 1;
                card.innerHTML = '<br>' + player.name + '獲得嫁禍無效卡';
                console.log(player.name, '獲得嫁禍無效卡');
            }
            if (star.type == "dice"){
                player.dice.push(star.description);
                card.innerHTML = '<br>' + player.name + '獲得控骰卡：骰' + star.description;
                console.log(player.name, '獲得控骰卡：骰', star.description);
            }
            if (star.type == "buff"){
                player.buff.push(star);
                card.innerHTML = '<br>' + player.name + '獲得永久效果卡：' + star.description;
                console.log(player.name, '獲得永久效果卡：', star.description);
            }
        }
    }
    if (player.money < 0) player.money = 0;
}

async function transfer(player, ques){
    await sleep(1000);
    var card = document.getElementById("card");
    var player2 = playerData[(player.id+1)%4];
    if (player.money < ques.money) player2 = player;
    if (player2.name != player.name){
        card.innerHTML += ('<br>' + player.name + '選擇嫁禍給' + player2.name);
        console.log(player.name, '選擇嫁禍給', player2.name);
        player.money -= ques.money;
        await sleep(1000);
        if (player2.shield != 0){
            card.innerHTML += ('<br>' + player2.name + '使用嫁禍無效卡');
            console.log(player2.name, '使用嫁禍無效卡');
            player2.shield -= 1;
            starData.push({type: "shield", description:""});
            return null;
        }
    }
    await sleep(1000);
    return player2;
}

async function get_buff(player){
    var card = document.getElementById("card");
    if (tileData[player.y][player.x].class == "tile money"){
        player.money += 30;
        card.innerHTML = '<br>' + player.name + '獲得30元';
        console.log(player.name, '獲得30元');
    }
    if (tileData[player.y][player.x].class == "tile star"){
        if (starData.length == 0) card.innerHTML = '<br>道具卡已經全部分發完';
        else{
            var star = starData.shift();
            if (star.type == "shield"){
                player.shield += 1;
                card.innerHTML = '<br>' + player.name + '獲得嫁禍無效卡';
                console.log(player.name, '獲得嫁禍無效卡');
            }
            if (star.type == "dice"){
                player.dice.push(star.description);
                card.innerHTML = '<br>' + player.name + '獲得控骰卡：骰' + star.description;
                console.log(player.name, '獲得控骰卡：骰', star.description);
            }
            if (star.type == "buff"){
                player.buff.push(star);
                card.innerHTML = '<br>' + player.name + '獲得永久效果卡：' + star.description;
                console.log(player.name, '獲得永久效果卡：', star.description);
            }
        }
    }
    if (tileData[player.y][player.x].class == "tile ques"){
        var ques = quesData[quesData[quesData.length-1]];
        card.innerHTML = '<br>' + '？卡效果：' + ques.description + '<br>' + '（嫁禍金額：' + ques.money + '）';
        console.log('？卡效果：' + ques.description);
        quesData[quesData.length-1] = (quesData[quesData.length-1] + 1) % (quesData.length-1);
        var to_player = await transfer(player, ques);
        await use_ques(ques, to_player);
    }
    output_player(player);
}

function pick_dice(player){
    if (player.dice.length == 0) return null;
    return player.dice.shift();
}

async function moveAI(player){
    var card = document.getElementById("card");
    var diceNumber = pick_dice(player);
    if (diceNumber == null){
        diceNumber = await roll();
        card.innerHTML = '<br>' + player.name + '骰出了 ' + diceNumber;
        console.log(player.name + '骰出了 ' + diceNumber);
    }else{
        await sleep(1000);
        card.innerHTML = '<br>' + player.name + '使用控骰卡：骰' + diceNumber;
        console.log(player.name + '使用控骰卡：骰' + diceNumber);
        starData.push({type: "dice", description:diceNumber});
    }
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
    await get_buff(player);
    console.log(starData.length);
}

async function main(){
    while (true) {
        for (var i = 0; i < playerData.length; i++) {
            if (i == 0) await moveAI(playerData[i]);
            else await moveAI(playerData[i]);
            await sleep(1000);
            if ((playerData[i].x == 9) && (playerData[i].y == 12)){
                var card = document.getElementById("card");
                card.innerHTML = '<br>' + '恭喜' + playerData[i].name + '勝出！';
                console.log(playerData[i].name + '勝出！');
                return;
            }
        }
    }
}
