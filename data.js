function add_targets(paths){
    for (var i=0 ; i<paths.length ; i++){
        var target_icon = document.createElement("img");
        var target_modal = document.getElementById("target_modal");
        target_icon.className = "player_icon";
        target_icon.id = "target_icon" + i;
        target_icon.style.marginLeft = 40 * paths[i][paths[i].length-1].x + 35 + "px";
        target_icon.style.marginTop = 40 * paths[i][paths[i].length-1].y + 5 + "px";
        target_icon.style.width = 30 + "px";
        target_icon.style.height = 30 + "px";
        target_icon.style.opacity = 0.6;
        target_icon.src = "images/tile/dest.png";
        target_icon.dataset.index = i;
        target_modal.appendChild(target_icon);
    }
}

// 建立遊戲版上的各個格子
function add_tiles(){
    var gameboard = document.getElementById("gameboard");
    for (var i = 0; i < tileData.length; i++) {
        for (var j=0 ; j<tileData[i].length; j++){
            var tile = document.createElement("div");
            tile.className = tileData[i][j].class;
            gameboard.appendChild(tile);
        }
    }
}

// 建立各大地點的附加文字
function add_board_text(){
    for (var i = 0; i < placeData.length; i++) {
        var text = document.createElement("div");
        text.className = "place_text";
        text.style.marginLeft = placeData[i].margin_left + 'px';
        text.style.marginTop = placeData[i].margin_top + 'px';
        text.textContent = placeData[i].text;
        document.body.appendChild(text);
    }
}

function get_player_data(data){
    var ans = '<center> <b> <font size=5px>' + data.name + '資料 </font> </b> </center> <br>';
    
    ans += '<span class="icons money"> </span>' + '<font color="blue"> 金錢： </font>$' + data.money + '<br>';
    ans += '<span class="icons shield"> </span>' + '<font color="blue"> 嫁禍無效卡： </font> ' + data.shield + '張<br>';
    ans += '<span class="icons dice"> </span>' + '<font color="blue"> 控骰卡： </font>';
    if (data.dice.length == 0) ans += '無';
    for (var j = 0; j < data.dice.length; j++) {
        if (j != 0) ans += '、';
        ans += '骰' + data.dice[j] + '  ';
    }
    ans += '<br> <span class="icons buff"> </span>' + '<font color="blue"> 永久效果：</font>';
    if (data.buff.length == 0) ans += '無';
    for (var j = 0; j < data.buff.length; j++) {
        if (j != 0) ans += '、';
        if (data.buff[j].id == 1) ans += '<span class="icons buff1" > </span>';
        if (data.buff[j].id == 2) ans += '<span class="icons buff2" > </span>';
        if (data.buff[j].id == 3) ans += '<span class="icons buff3" > </span>';
        if (data.buff[j].id == 4) ans += '<span class="icons buff4" > </span>';
        if (data.buff[j].id == 5) ans += '<span class="icons buff5" > </span>';
        if (data.buff[j].id == 6) ans += '<span class="icons buff6" > </span>';
        if (data.buff[j].id == 7) ans += '<span class="icons buff7" > </span>';
        if (data.buff[j].id == 8) ans += '<span class="icons buff8" > </span>';
        if (data.buff[j].id == 9) ans += '<span class="icons buff9" > </span>';
        if (data.buff[j].id == 10) ans += '<span class="icons buff10" > </span>';
    }
    return ans;
}

// 建立玩家資料
function add_player_data(){
    var player_data = document.getElementById("player_data");
    for (var i = 0; i < playerData.length; i++) {
        var player = document.createElement("div");
        player.className = "player_status";
        player.id = playerData[i].name;
        player.innerHTML = get_player_data(playerData[i]);
        player_data.appendChild(player);
        
        var player_icon = document.createElement("img");
        player_icon.className = "player_icon";
        player_icon.id = playerData[i].name + "_icon";
        player_icon.style.marginLeft = 40 * playerData[i].x + i % 2 * 10 + 30 + "px";
        player_icon.style.marginTop = 40 * playerData[i].y + Math.floor(i/2) * 10 + "px";
        player_icon.src = "images/player/" + (i+1) + ".png";
        document.body.appendChild(player_icon);
                                                                        
    }
}
                                                                        
function init(){
    playerData = [
        { name: "玩家一", id: 0, person: false, money: 0, shield: 0, dice: [], buff:[], x: 0, y: 23 },
        { name: "玩家二", id: 1, person: false, money: 0, shield: 0, dice: [], buff:[], x: 0, y: 23 },
        { name: "玩家三", id: 2, person: false, money: 0, shield: 0, dice: [], buff:[], x: 0, y: 23 },
        { name: "玩家四", id: 3, person: false, money: 0, shield: 0, dice: [], buff:[], x: 0, y: 23 }
    ];
    quesData = [
                {id:0, money: 30, description: "前往起點"},
                {id:1, money: 30, description: "前往起點"},
                {id:2, money: 30, description: "前往博物館"},
                {id:3, money: 30, description: "前往森林"},
                {id:4, money: 30, description: "前往警察局"},
                {id:5, money: 30, description: "前往銀行"},
                {id:6, money: 30, description: "前往銀行"},
                {id:7, money: 20, description: "前往商業區"},
                {id:8, money: 20, description: "前往公園"},
                {id:9, money: 20, description: "前往醫院"},
                {id:10, money: 20, description: "前往寺廟"},
                {id:11, money: 10, description: "前往古蹟"},
                {id:12, money: 10, description: "前往車站"},
                {id:13, money: 10, description: "前往車站"},
                {id:14, money: 10, description: "前往廣場"},
                {id:15, money: 100, description: "獲得50元"},
                {id:16, money: 100, description: "獲得100元"},
                {id:17, money: 100, description: "獲得100元"},
                {id:18, money: 100, description: "獲得200元"},
                {id:19, money: 20, description: "失去50元"},
                {id:20, money: 50, description: "失去100元"},
                {id:21, money: 100, description: "失去所有錢"},
                {id:22, money: 100, description: "失去所有道具卡"},
                {id:23, money: 50, description: "失去所有控骰卡"},
                {id:24, money: 50, description: "失去所有永久效果卡"},
                {id:25, money: 10, description: "與離終點最近的對手交換位置"},
                {id:26, money: 10, description: "與最有錢的對手交換金錢數量"},
                {id:27, money: 10, description: "與最多道具卡的對手交換所有道具卡"},
                {id:28, money: 100, description: "獲得兩張道具卡"},
                {id:29, money: 100, description: "獲得兩張道具卡"}
            ];
    starData = [
                {type: "shield", description:""},
                {type: "shield", description:""},
                {type: "shield", description:""},
                {type: "shield", description:""},
                {type: "shield", description:""},
                {type: "shield", description:""},
                {type: "shield", description:""},
                {type: "shield", description:""},
                {type: "shield", description:""},
                {type: "shield", description:""},
                {type: "dice", description:1},
                {type: "dice", description:1},
                {type: "dice", description:2},
                {type: "dice", description:2},
                {type: "dice", description:3},
                {type: "dice", description:3},
                {type: "dice", description:4},
                {type: "dice", description:4},
                {type: "dice", description:5},
                {type: "dice", description:5},
                {type: "dice", description:6},
                {type: "dice", description:6},
                {type: "dice", description:1},
                {type: "dice", description:2},
                {type: "dice", description:3},
                {type: "dice", description:4},
                {type: "dice", description:5},
                {type: "dice", description:6},
                {type: "dice", description:10},
                {type: "dice", description:10},
                {type: "buff", id:1, description:"可以免費將？卡嫁禍於人"},
                {type: "buff", id:2, description:"他人無法用嫁禍無效卡來抵擋你的嫁禍"},
                {type: "buff", id:3, description:"無限量嫁禍無效卡"},
                {type: "buff", id:4, description:"到達星星格時，可一次抽兩張道具卡"},
                {type: "buff", id:5, description:"每回合結束後獲得10元"},
                {type: "buff", id:6, description:"金錢的收入加倍"},
                {type: "buff", id:7, description:"每回移動步數+3 (控骰卡除外)"},
                {type: "buff", id:8, description:"每次被有效嫁禍時，可抽一張道具卡"},
                {type: "buff", id:9, description:"踩在有其他人的格子時，可搶走他至多50元"},
                {type: "buff", id:10, description:"使用傳送門的所需費用折半"}
            ]
    for (var i=quesData.length-1 ; i>0 ; i--){
        var temp = Math.floor(Math.random() * (i + 1));
        [quesData[i], quesData[temp]] = [quesData[temp], quesData[i]];
    }
    quesData.push(0);
    for (var i=starData.length-1 ; i>0 ; i--){
        var temp = Math.floor(Math.random() * (i + 1));
        [starData[i], starData[temp]] = [starData[temp], starData[i]];
    }
}

var global_dice = -999;
var global_path = [];
var global_paths = [];
var global_toplayer = null;
var global_shield = null;
                                                                        
var playerData = [
    { name: "玩家一", id: 0, money: 0, shield: 0, dice: [], buff:[], x: 0, y: 23 },
    { name: "玩家二", id: 1, money: 0, shield: 0, dice: [], buff:[], x: 0, y: 23 },
    { name: "玩家三", id: 2, money: 0, shield: 0, dice: [], buff:[], x: 0, y: 23 },
    { name: "玩家四", id: 3, money: 0, shield: 0, dice: [], buff:[], x: 0, y: 23 }
];
var quesData = [];
var starData = [];
                                       
var placeData = [
    { margin_left: 40, margin_top: 890, text: "起點" },
    { margin_left: 200, margin_top: 890, text: "博物館" },
    { margin_left: 70, margin_top: 770, text: "森林" },
    { margin_left: 440, margin_top: 890, text: "警察局" },
    { margin_left: 710, margin_top: 770, text: "銀行" },
    { margin_left: 80, margin_top: 370, text: "商業區" },
    { margin_left: 110, margin_top: 40, text: "古蹟" },
    { margin_left: 350, margin_top: 370, text: "廣場" },
    { margin_left: 350, margin_top: 490, text: "終點" },
    { margin_left: 510, margin_top: 250, text: "公園" },
    { margin_left: 720, margin_top: 210, text: "醫院" },
    { margin_left: 750, margin_top: 40, text: "寺廟" },
    { margin_left: 310, margin_top: 40, text: "車站" }
]
var tileData = [
    [{ class: "tile star" },
    { class: "tile normal" },
    { class: "tile place" },
    { class: "tile ques" },
    { class: "tile money" },
    { class: "tile normal" },
    { class: "tile ques" },
    { class: "tile place" },
    { class: "tile money" },
    { class: "tile star" },
    { class: "tile normal" },
    { class: "tile ques" },
    { class: "tile normal" },
    { class: "tile normal" },
    { class: "tile money" },
    { class: "tile normal" },
    { class: "tile normal" },
    { class: "tile ques" },
    { class: "tile place" }],
    
    [{ class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile money" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile money" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile money" },
    { class: "tile normal" },
    { class: "tile star" },
    { class: "tile money" },
    { class: "tile star" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile money" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile place" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile money" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile place" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile normal" },
    { class: "tile ques" },
    { class: "tile money" },
    { class: "tile normal" },
    { class: "tile money" },
    { class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile money" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile star" },
    { class: "tile normal" },
    { class: "tile nothing" }],
    
    [{ class: "tile place" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile place" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile normal" },
    { class: "tile money" },
    { class: "tile nothing" },
    { class: "tile money" },
    { class: "tile nothing" }],
    
    [{ class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile star" },
    { class: "tile normal" },
    { class: "tile nothing" }],
    
    [{ class: "tile money" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile money" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile place" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile money" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile money" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile money" },
    { class: "tile nothing" },
    { class: "tile nothing" }],
    
    [{ class: "tile normal" },
    { class: "tile ques" },
    { class: "tile normal" },
    { class: "tile star" },
    { class: "tile normal" },
    { class: "tile money" },
    { class: "tile normal" },
    { class: "tile ques" },
    { class: "tile money" },
    { class: "tile normal" },
    { class: "tile normal" },
    { class: "tile star" },
    { class: "tile ques" },
    { class: "tile money" },
    { class: "tile ques" },
    { class: "tile normal" },
    { class: "tile ques" },
    { class: "tile normal" },
    { class: "tile money" }],
    
    [{ class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" }],
    
    [{ class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile place" },
    { class: "tile money" },
    { class: "tile normal" },
    { class: "tile ques" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile place" }],
    
    [{ class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile money" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile money" }],
    
    [{ class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile money" },
    { class: "tile star" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile ques" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" }],
    
    [{ class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile place" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile normal" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile nothing" },
    { class: "tile star" }],
    
    [{ class: "tile place" },
    { class: "tile normal" },
    { class: "tile star" },
    { class: "tile ques" },
    { class: "tile money" },
    { class: "tile normal" },
    { class: "tile normal" },
    { class: "tile ques" },
    { class: "tile normal" },
    { class: "tile star" },
    { class: "tile place" },
    { class: "tile ques" },
    { class: "tile money" },
    { class: "tile normal" },
    { class: "tile normal" },
    { class: "tile star" },
    { class: "tile money" },
    { class: "tile ques" },
    { class: "tile normal" }]
];
