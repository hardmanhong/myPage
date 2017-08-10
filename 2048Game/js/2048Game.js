/**
 * 作者: Up Hong 独立完成
 * 开发时间: 11 days
 */

var Game2048 = function() {
    this.init();
}
var Game2048pro = Game2048.prototype;
/**
 * 初始化
 */
Game2048pro.init = function() {
    this.currentScoreELem = util.getElement(".score")[0];
    this.bestScoreElem = util.getElement(".top-score")[0];
    this.overlay = util.getElement(".game-over")[0];
    this.overlayTitle = this.overlay.getElementsByTagName("h1")[0];
    this.initScore();
    this.event();
    this.createBox();
}
/**
 * 事件
 */
Game2048pro.event = function() {
    //禁止浏览器默认滑动事件
    document.body.addEventListener("touchmove", function(e) {
        e.preventDefault();
    });
    var _this = this;
    //github
    this.github = util.getElement(".github")[0];
    this.github.addEventListener("click",function (e) {
        e.defaultPrevented = true;        
    });
    //game2048
    this.game2048 = util.getElement(".game-2048")[0];
    this.game2048.addEventListener("touchstart", function(e) {
        _this.touchstart(e);
    });
    this.game2048.addEventListener("touchend", function(e) {
        _this.touchend(e, _this);
    });

    //右上角重玩按钮
    this.relayBtn = util.getElement(".game-btns")[0];
    this.relayBtn.addEventListener("click", function() {
        _this.hideOverlay();
        _this.rePlay();
    });
    //遮罩层重玩按钮
    this.overlayBtn = util.getElement(".game-over-btn")[0];
    this.overlayBtn.addEventListener("click", function() {
        _this.hideOverlay();
        _this.rePlay();
    });
}
Game2048pro.touchstart = function(e) {
    this.startX = e.changedTouches[0].pageX;
    this.startY = e.changedTouches[0].pageY;
}
Game2048pro.touchend = function(e, context) {
    this.moveX = e.changedTouches[0].pageX - this.startX;
    this.moveY = e.changedTouches[0].pageY - this.startY;
    var absX = Math.abs(this.moveX), //X绝对值
        absY = Math.abs(this.moveY); //Y绝对值
    if (absX < 5 && absY < 5) return;
    if (absX > absY && this.moveX > 0) this.move("right");
    if (absX > absY && this.moveX < 0) this.move("left");
    if (absX < absY && this.moveY > 0) this.move("bottom");
    if (absX < absY && this.moveY < 0) this.move("top");
    if (this.isWin()) { this.win(); return; }
    setTimeout(function() {
        context.setBestScore();
        if(!context.isBorder()) context.createBox();
        if (context.isGameOver()) context.gameOver();
    }, 600);
}
/**
 * 初始化分数
 */
Game2048pro.initScore = function() {
    this.currentScoreELem.innerText = 0;
    this.bestScoreElem.innerText = this.getBestScore() || 0;
}
/**
 * 设置最高分数
 */
Game2048pro.setBestScore = function() {
    console.log("setBestScore",this.bestScoreElem.innerText)
    var bestScore = parseInt(this.bestScoreElem.innerText);
    window.localStorage.setItem("2048GAME-BEST-SCORE", bestScore);
}
/**
 * 获取最高分数
 */
Game2048pro.getBestScore = function() {
    return window.localStorage.getItem("2048GAME-BEST-SCORE");
}
/**
 * 重玩
 */
Game2048pro.rePlay = function() {
    var rowLis = util.getElement(".row");
    for (var i = 0; i < rowLis.length; i++) {
        var boxs = util.getElement(".create-box", rowLis[i]);
        if (boxs.length <= 0) continue;
        var len = boxs.length;
        for (var j = 0; j < len; j++) {
            var box = boxs[0];
            rowLis[i].removeChild(box);
        }
    }
    this.initScore();
    this.createBox();
}
/**
 * 判断满盒子
 */
Game2048pro.fullBoxs = function() {
    var boxs = util.getElement(".box"),
        isFull;
    isFull = boxs.length == 32 ? true : false;
    return isFull;
}
/**
 * 判断游戏结束
 */
Game2048pro.isGameOver = function() {
    if (this.isOver) return;
    this.isOver = false;
    if (this.fullBoxs()) {
        this.isright = this.isleft = this.istop = this.isbottom = false
        this.canAdd("right");
        this.canAdd("left");
        this.canAdd("top");
        this.canAdd("bottom");
        if (!this.isright && !this.isleft && !this.istop && !this.isbottom) this.isOver = true;
    }
    return this.isOver;
}
/**
 * 游戏结束
 */
Game2048pro.gameOver = function() {
    this.overlayTitle.innerText = "Game Over!";
    this.showOverlay();
}
/**
 * 判断输赢
 */
Game2048pro.isWin = function() {
    var isWin = false,
        number2048 = util.getElement(".number-2048")[0];
    isWin = !!number2048 ? true : false;
    return isWin;
}
/**
 * 游戏 赢
 */
Game2048pro.win = function() {
    this.overlayTitle.innerText = "You Win!";
    this.showOverlay();
}
/**
 * 显示遮罩层
 */
Game2048pro.showOverlay = function() {
    this.overlay.style.display = 'block';
    util.addClass(this.overlay, "scale");
}
/**
 * 隐藏遮罩层
 */
Game2048pro.hideOverlay = function() {
    if (this.overlay.style.display == "block") {
        util.addClass(this.overlay, "scalesmall");
    }
}
/**
 * 判断数组合并
 */
Game2048pro.canAdd = function(direction) {
    for (var i = 0; i < 4; i++) {
        var arr = [],
            sortArr = [];
        this.saveGridInfo(i, arr, sortArr, direction);
        this.sortGridInfo(arr,sortArr, direction, true);
    }
}
/**
 * 创建盒子
 */
Game2048pro.createBox = function() {
    var _this = this;
    if (this.fullBoxs()) return;
    var blankBoxs = util.getElement(".place-holder-box"),
        lis = util.getElement(".row"),
        divIndex = parseInt(Math.random() * blankBoxs.length),
        theBox = blankBoxs[divIndex], //某个空盒子
        liItem = parseInt(divIndex / 4), //第几个li
        divItem = divIndex % 4, //第几个li中的第几个div盒子
        theBoxLeft = theBox.offsetLeft, //该盒子的left值
        num = Math.random() < 0.7 ? 2 : 4;
        // num = parseInt(Math.random() * (4 - 2 + 1) + 2),
        // rem = num % 2;
    // num = rem == 0 ? num : num - 1; //对余数进行判断，生成2或4
    var newBox = document.createElement("div"),
        holderClassName = "grid" + liItem + "-" + divItem,
        numberClassName = "number-" + num,
        holderBox = util.getElement("." + holderClassName)[0];
    if (holderBox) { //如果该位置已有盒子，递归
        this.createBox();
    } else {
        util.addClass(newBox, "box scale create-box " + numberClassName + " " + holderClassName);
        newBox.style.left = theBoxLeft + "px";
        newBox.innerText = num;
        newBox.style["z-index"] = 1;
        lis[liItem].appendChild(newBox);
    }
}
/**
 * 保存数组
 * @param  {[type]} arrIndex  原始数组下标
 * @param  {[type]} arr       原始数组
 * @param  {[type]} sortArr   排序数组
 * @param  {[type]} direction 方向
 */
Game2048pro.saveGridInfo = function(arrIndex, arr, sortArr, direction) {
    var count = 0;
    for (var j = 0; j < 4; j++) {
        var str,
            moveClassName,
            divItemText,
            gridInfo,
            divItem,
            re;
        switch (direction) {
            case "right":
            case "left":
                str = "grid" + arrIndex + "-" + j;
                break;
            case "top":
            case "bottom":
                str = "grid" + j + "-" + arrIndex;
                break;
        }
        gridInfo = {};
        divItem = util.getElement("." + str)[0];
        re = new RegExp("(right|left|top|bottom)\\d\\-\\d", "g");
        moveClassName = !!divItem ? divItem.className.match(re) : null;
        moveClassName = !!moveClassName ? moveClassName[0] : null;
        divItemText = !!divItem ? parseInt(divItem.innerText) : 0;
        gridInfo.divElement = !!divItem ? divItem : null;
        gridInfo.value = divItemText;
        gridInfo.className = str;
        gridInfo.moveClassName = moveClassName;

        arr.push(gridInfo);
        switch (direction) {
            case "right":
            case "bottom":
                divItemText == 0 && sortArr.unshift(gridInfo);
                divItemText > 0 && sortArr.push(gridInfo);
                break;
            case "left":
            case "top":
                divItemText > 0 && sortArr.push(gridInfo);
                divItemText == 0 && count++;
                break;
        }
    }
    for (var o = 0; o < count; o++) {
        sortArr.push({ value: 0, className: null, moveClassName: null, divElement: null });
    }
}
/**
 * 排序数组，移除盒子元素
 * @param  {[type]} sortArr   排序数组
 * @param  {[type]} k         排序数组下标
 * @param  {[type]} moveIndex 移动盒子下标
 */
Game2048pro.sortoutBox = function(sortArr, k, moveIndex) {
    var _this = this,
        currentScore = parseInt(this.currentScoreELem.innerText),
        bestScore = parseInt(this.bestScoreElem.innerText);
    var removeNode = sortArr[k].divElement;
    _this.moveBeforeValue = sortArr[moveIndex].value;
    _this.moveAfterValue = sortArr[k].value + sortArr[moveIndex].value; //移动元素在移动后的值
    removeNode.parentElement.removeChild(removeNode);
    sortArr[moveIndex].value = _this.moveAfterValue;
    sortArr.splice(k, 1);
    this.currentScoreELem.innerText = currentScore + _this.moveAfterValue;
    if (bestScore == 0 || bestScore <= parseInt(this.currentScoreELem.innerText)) this.bestScoreElem.innerText = parseInt(this.currentScoreELem.innerText);

}
/**
 * 过滤排序数组
 * @param  {[type]} sortArr   排序数组
 * @param  {[type]} direction 方向
 * @param  {[type]} gameOver  盒子是否满
 */
Game2048pro.sortGridInfo = function(arr,sortArr, direction, gameOver) {
    this.initIsBorderVar();
    switch (direction) {
        case "right":
        case "bottom":
            for (var k = sortArr.length - 1; k > 0; k--) {
                if (sortArr[k].value == 0) continue;
                if (sortArr[k].value === sortArr[k - 1].value) {
                    if (gameOver) { this["is" + direction] = true; return; } //满格子才会执行
                    var moveIndex = k - 1;
                    this.sortoutBox(sortArr, k, moveIndex);
                    sortArr.unshift({ value: 0, className: null, moveClassName: null, divElement: null });

                }
            }
            break;
        case "left":
        case "top":
            for (var k = 0; k < sortArr.length - 1; k++) {
                if (sortArr[k].value == 0) continue;
                if (sortArr[k].value === sortArr[k + 1].value) {
                    if (gameOver) { this["is" + direction] = true; return; } //满格子才会执行
                    var moveIndex = k + 1;
                    this.sortoutBox(sortArr, k, moveIndex);
                    sortArr.push({ value: 0, className: null, moveClassName: null, divElement: null }); //left top push()
                }
            }
            break;
    }
    if(this.isSame(arr,sortArr)){ this["isSame"+this.i] = true;};
}
/**
 * 初始化判断是否在边缘的变量
 */
Game2048pro.initIsBorderVar = function () {
    this.i = this.i || 0;
    if(this.i>=4) this.i = 0;
    this.i++
    this["isSame"+this.i] = false;
}
/**
 * 判断数组是否相同，以此来判断盒子是否在边缘
 */
Game2048pro.isSame = function(arr,sortArr){
    var isSame = arr.every(function (item,index) {
        return item.value == sortArr[index].value;
    });
    return isSame;
}
/**
 * 判断是否在边缘
 */
Game2048pro.isBorder = function () {
    var isborder = true;
    if(!this.isSame1 || !this.isSame2 || !this.isSame3 || !this.isSame4) isborder = false;
    return isborder;
}
/**
 * 移动盒子
 * @param  {[type]} arr       原始数组
 * @param  {[type]} sortArr   排序数组
 * @param  {[type]} direction 方向
 */
Game2048pro.moveBoxs = function(arr, sortArr, direction) {
    for (var l = 0; l < arr.length; l++) {
        if (!arr[l].divElement) continue;
        var arrElement = arr[l].divElement,
            arrClassName = arr[l].className;
        for (var p = 0; p < sortArr.length; p++) {
            if (!sortArr[p].divElement) continue;
            var sortArrElement = sortArr[p].divElement;
            if (arrElement === sortArrElement) {
                if (p - l == 0) break;
                /*
                    遇到的大BUG之一:
                    假如前面有盒子的类名改变之后与当前要获取的类名一样，
                    那么获取的盒子就不确定是哪一个了，
                    所以我把元素存进数组，遍历获取的类名元素，与数组中的原来的元素进行比较
                */
                var boxs = util.getElement("." + arrClassName),
                    moveBox;
                for (var q = 0; q < boxs.length; q++) {
                    if (boxs[q] === sortArrElement) {
                        moveBox = boxs[q];
                        break;
                    }
                }
                switch (direction) {
                    case "right":
                    case "left":
                        var numIndex = arrClassName.substr(4, 1); // 右滑，下滑区别在这里 下滑substr(6,1)
                        util.replaceClass(moveBox, arrClassName, "grid" + numIndex + "-" + p);
                        if (!!moveBox.prevTopLocation) moveBox.style.top = (moveBox.prevTopLocation * 74) + "px";
                        moveBox.style.left = 0;
                        moveBox.prevLeftLocation = p;
                        break;
                    case "top":
                    case "bottom":
                        var numIndex = arrClassName.substr(6, 1); // 右滑，下滑区别在这里 下滑substr(6,1)
                        util.replaceClass(moveBox, arrClassName, "grid" + p + "-" + numIndex);
                        if (!!moveBox.prevLeftLocation) moveBox.style.left = (moveBox.prevLeftLocation * 74) + "px";
                        moveBox.prevTopLocation = p;
                        moveBox.style.top = 0;
                        break;
                }
                !!sortArr[p].moveClassName ?
                    util.replaceClass(moveBox, sortArr[p].moveClassName, direction + l + "-" + p) :
                    util.addClass(moveBox, direction + l + "-" + p);
                moveBox.innerText = sortArr[p].value;
                util.replaceClass(moveBox, "number-\\d+", "number-" + sortArr[p].value);
                break;
            }
        }
    }
}
/**
 * 移动，触摸结束后调用
 * @param  direction 方向
 */
Game2048pro.move = function(direction) {
    for (var i = 0; i < 4; i++) {
        var arr = [],
            sortArr = [];
        this.saveGridInfo(i, arr, sortArr, direction);
        this.sortGridInfo(arr,sortArr, direction);
        this.moveBoxs(arr, sortArr, direction);
    }
}


new Game2048;