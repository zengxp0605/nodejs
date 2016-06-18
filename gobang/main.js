
var chessBoard = []; // 棋盘交叉点的状态, 0: 空, 1: 黑棋, 2: 白旗
var EMPTY = 0;
var myColor = 1;
var computerColor = 2;
var computerThinkTime = 1000; // 电脑默认思考时间, 1秒
var computerStartTime = 0;

// 当前时间戳,毫秒
var now = function(){
    var date = new Date();
    return date.getTime();
}

// 初始化棋盘每个点的状态
for(var i=0; i<15; i++){
    chessBoard[i] = [];
    for(var j=0; j<15; j++){
        chessBoard[i][j] = EMPTY;
    }
}

// 赢法相关
var Game = {
    isMyTurn: true,  // 是否轮到自己
    isOver: false, 
    winCount:0, // 赢法的数量
    wins:[],    // 赢法穷举, 3维数组
    
    // 初始化
    init: function(){
        Game.winsInit();
        Game.initWayRow();
        Game.initWayCol();
        Game.initWaySlash();
        Game.initWayBackslash();

        console.log(Game.winCount);

        // 初始化统计数组
        Game.initWinStats();
    },

    // 初始化赢法数组
    winsInit: function(){
        for(var i=0; i<15; i++){
            Game.wins[i] = [];
            for(var j=0; j<15; j++){
                Game.wins[i][j] = [];
            }
        }
    },

    // 初始化横线的赢法
    initWayRow:function(){
        for(var i=0; i<15; i++){
            for(var j=0; j<11; j++){ // 边上只剩4格时不能赢
                /* i=0,count=0 时, j在累加
                    Game.wins[0][0][0] = true;
                    Game.wins[0][1][0] = true;
                    Game.wins[0][2][0] = true;
                    Game.wins[0][3][0] = true;
                    Game.wins[0][4][0] = true;
                    /--******* 以上是第0种赢法******--/
                    j = 1,count=1时
                    Game.wins[0][1][1] = true;
                    Game.wins[0][2][1] = true;
                    Game.wins[0][3][1] = true;
                    Game.wins[0][4][1] = true;
                    Game.wins[0][5][1] = true;
                    /-----------/以上是第1种赢法-------------/

                 */
                for(var k=0; k<5; k++){ // 五个棋子获胜
                    Game.wins[i][j+k][Game.winCount] = true;
                }
                // 获胜的方式累加
                Game.winCount ++;
            }
        }
    },
    // 初始化竖线的赢法
    initWayCol:function(){
        for(var i=0; i<15; i++){
            for(var j=0; j<11; j++){ 
                for(var k=0; k<5; k++){ 
                    Game.wins[j+k][i][Game.winCount] = true;
                }
                // 获胜的方式累加
                Game.winCount ++;
            }
        }
    },

    // 初始化斜线的赢法
    initWaySlash:function(){
        for(var i=0; i<11; i++){
            for(var j=0; j<11; j++){ 
                for(var k=0; k<5; k++){ 
                    Game.wins[i+k][j+k][Game.winCount] = true;
                }
                // 获胜的方式累加
                Game.winCount ++;
            }
        }
    },
    // 初始化反斜线的赢法
    initWayBackslash:function(){
        for(var i=0; i<11; i++){
            for(var j=14; j>3; j--){ 
                for(var k=0; k<5; k++){ 
                    Game.wins[i+k][j-k][Game.winCount] = true;
                }
                // 获胜的方式累加
                Game.winCount ++;
            }
        }
    },

    // 赢法统计数组
    myWin: [], // 我的赢法
    computerWin: [], // 电脑的赢法
    // 初始化统计数组
    initWinStats: function(){
        for(var i=0; i< Game.winCount; i++){
            Game.myWin[i] = 0;
            Game.computerWin[i] = 0;
        }
    },

    /**
     * 每下一个子,验证是否我是否已经赢了
     * @param {[type]} i 横坐标
     * @param {[type]} j 纵坐标
     */
    checkMyWin: function(i, j){
        for(var k=0; k< Game.winCount; k++){
            if(Game.wins[i][j][k] == true){ // 如果这个点属于可以赢的点
                Game.myWin[k] ++; // 自己可以赢的棋子累加1
                Game.computerWin[k] = 6; // 置为一个不会赢的数字
                if(Game.myWin[k] == 5){
                    Game.isOver = true;
                    if(confirm('恭喜,你赢了! 再来一局?')){
                        window.location.reload();
                    };
                }
            }
        }
    },

    // 验证计算机是否赢了
    checkComputerWin: function(i, j){
        for(var k=0; k< Game.winCount; k++){
            if(Game.wins[i][j][k] == true){ // 如果这个点属于可以赢的点
                Game.computerWin[k] ++; // 自己可以赢的棋子累加1
                Game.myWin[k] = 6; // 置为一个不会赢的数字
                if(Game.computerWin[k] == 5){
                    Game.isOver = true;
                    if(confirm('计算机赢了! 再来一局?')){
                        window.location.reload();
                    }
                }
            }
        }
    },

    // 计算机自动落子
    computerAI : function(){
        var myScore = [];
        var computerScore = [];
        var maxScore = 0;
        var u = 0,v = 0; // 保存获取到的最佳坐标点,电脑落子的
        // 重置双方的得分
        for(var i=0; i<15; i++){
            myScore[i] = [];
            computerScore[i] = [];
            for(var j=0; j<15; j++){
                myScore[i][j] = 0;
                computerScore[i][j] = 0;
            }
        }

        // 计算当前棋盘中空白点对于双方的得分(优劣)
        for(var i=0; i<15; i++){
            for(var j=0; j<15; j++){
                // 排除已经落子的点
                if(chessBoard[i][j] != EMPTY) continue;

                for(var k=0; k<Game.winCount; k++){
                    // 跳过不能赢的点
                    if(Game.wins[i][j][k] !== true) continue; 
                    // 统计人的得分
                    // 判断当前赢法已经有几个子
                    switch(Game.myWin[k]){
                        case 1: 
                            myScore[i][j] += 200;
                            break;
                        case 2:
                            myScore[i][j] += 400;
                            break;
                        case 3:
                            myScore[i][j] += 2000;
                            break;
                        case 4:
                            myScore[i][j] += 10000;
                            break;
                    }

                    // 统计电脑得分
                    switch(Game.computerWin[k]){
                        case 1: 
                            computerScore[i][j] += 220;
                            break;
                        case 2:
                            computerScore[i][j] += 420;
                            break;
                        case 3:
                            computerScore[i][j] += 2100;
                            break;
                        case 4:
                            computerScore[i][j] += 20000;
                            break;
                    }
                }

                // 找到最佳点
                if(myScore[i][j] > maxScore){
                    maxScore = myScore[i][j];
                    u = i,v = j;
                } else if(myScore[i][j] == maxScore){
                    if(computerScore[i][j] > computerScore[u][v]){
                        u = i,v = j;
                    }
                }

                if(computerScore[i][j] > maxScore){
                    maxScore = computerScore[i][j];
                    u = i,v = j;
                } else if(computerScore[i][j] == maxScore){
                    if(myScore[i][j] > myScore[u][v]){
                        u = i,v = j;
                    }
                }
            }
        }
        
        var _now = now();
        var timtout = computerThinkTime;
        if(_now - computerStartTime > computerThinkTime){
            // 计算时间已经超时
            computerThinkTime = 0;
        }
        console.log('computer waiting...', computerThinkTime);
        (function(_u, _v){
            setTimeout(function(){
                // 计算机落子
                oneSetp(_u, _v, false);
                chessBoard[_u][_v] = computerColor; 
                Game.checkComputerWin(_u, _v);
                if(!Game.isOver){
                    Game.isMyTurn = true; // 转交到我下棋
                    Game.changeTip();
                }
            }, computerThinkTime);
        })(u, v);
        
    },

    // 提示当前谁下棋
    changeTip:function(){
        var tip = document.getElementById('turn-tip');
        var str = Game.isMyTurn === true ? '我' : '电脑';
        tip.innerHTML = str;
    },

};



setTimeout(function(){
    Game.init();
    
},100);

// 棋盘操作
var chess = document.getElementById('chess');
var context = chess.getContext('2d');

// 棋盘线条颜色
context.strokeStyle = '#BFBFBF';

// var bgImgPath = './images/lomo1.jpg';
var bgImgPath = '';

if(bgImgPath != ''){
    // 画背景图片
    var bgImg = new Image();
    bgImg.src = bgImgPath ;
    bgImg.onload = function () {
        context.drawImage(bgImg, 0, 0, 450, 450);
        drawChessBoard();

        // 测试画圆
        // Test.drawLine();
        // Test.drawArc();
        
        // 测试落子    
        // oneSetp(0, 0, true);
        // oneSetp(1, 1, false);
    };
} else {
    setTimeout(function(){
        drawChessBoard();
    }, 50);
}

// 画棋盘
var drawChessBoard = function(){
    for(var i =0; i<15; i++){
        // 竖线
        context.moveTo(15 + i * 30, 15); // 15 表示初始留白
        context.lineTo(15 + i * 30, 435);
        context.stroke();

        // 横线
        context.moveTo(15, 15 + i * 30);
        context.lineTo(435, 15 + i * 30);
        context.stroke();
    } 
};

/**
 * 走一步棋
 * @param  {[type]} i  棋盘 行索引
 * @param  {[type]} j  棋盘 列索引
 * @param  {[type]} isMyTurn true: 人下棋(黑子) , false: 电脑下棋(白子)
 * @return {[type]}    
 */
var oneSetp = function(i, j, isMyTurn){

    var x = 15 + i * 30;
    var y = 15 + j * 30;

    context.beginPath();
    // x: 圆心x坐标, y: 圆心y坐标, 13: 半径,  最后两个参数是弧度;
    context.arc(x, y, 13, 0, 2 * Math.PI);
    context.closePath();

    // 画渐变色
    var gradient = context.createRadialGradient(x + 2, y - 2, 13, x + 2, y - 2, 0);
    if(isMyTurn){ // 黑子
        gradient.addColorStop(0, '#0A0A0A');
        gradient.addColorStop(1, '#636766');
    } else { // 白子
        gradient.addColorStop(0, '#D1D1D1');
        gradient.addColorStop(1, '#F9F9F9');
    }
    context.fillStyle = gradient;
    context.fill();
};

// 落子点击事件
chess.onclick = function(e){
    // 如果游戏结束, 或者没有轮到我下棋, 那么点击无效
    if(Game.isOver || !Game.isMyTurn){
        return;
    }
    var x = e.offsetX;
    var y = e.offsetY;
    // 通过点击的偏移位置,获取到对应的索引
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    
    // console.log('click',x,y,i,j);

    if(chessBoard[i][j] > 0) return; // 已经有棋子了

    // 标记棋子颜色
    chessBoard[i][j] = myColor;

    oneSetp(i, j, Game.isMyTurn);


    Game.checkMyWin(i, j);

    if(!Game.isOver){
        Game.isMyTurn =  false; // 重置轮次
        Game.changeTip();
        computerStartTime = now();
        // 计算机自动落子
        Game.computerAI();
    }
};


// 没有 hover 事件???
chess.onhover = function(e){
    console.log('hover');
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    console.log('test',x,y,i,j);
};


// 测试方法
var Test = {
    // 画对角线
    drawLine: function(){
        // 画一条对角线
        context.moveTo(0, 0);
        context.lineTo(450, 450);
        context.stroke();
    },

    // 画圆
    drawArc: function(){
        
        context.beginPath();
        context.arc(200, 200, 100, 0, 2 * Math.PI);
        context.closePath();

        // 画渐变色
        var gradient = context.createRadialGradient(200, 200, 50, 200, 200, 20);
        gradient.addColorStop(0, '#0A0A0A');
        gradient.addColorStop(1, '#636766');
        context.fillStyle = gradient;
        context.fill();
    },
};
