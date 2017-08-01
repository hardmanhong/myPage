/**
 *  grid0-0 , grid0-1 , grid0-2 , grid0-3
 *  grid1-0 , grid1-1 , grid1-2 , grid1-3
 *  grid2-0 , grid2-1 , grid2-2 , grid2-3
 *  grid3-0 , grid3-1 , grid3-2 , grid3-3
 */

var Game2048 = function() {
    this.init();
}
var Game2048pro = Game2048.prototype;
Game2048pro.init = function() {
    var _this = this;
    this.createBox();
    this.game2048 = util.getElement(".game-2048")[0];
    this.game2048.addEventListener("touchstart", function(e) {
        _this.touchstart(e, _this);
    });
    this.game2048.addEventListener("touchend", function(e) {
        _this.touchend(e, _this);
    });
    this.relayBtn = util.getElement(".game-btns")[0];
    this.relayBtn.addEventListener("click", function() {
        _this.rePlay(_this);
    });
}
Game2048pro.createBox = function() {
    var blankBoxs = util.getElement(".place-holder-box"),
        boxs = util.getElement(".box"),
        lis = util.getElement(".row"),
        divIndex = parseInt(Math.random() * blankBoxs.length),
        theBox = blankBoxs[divIndex], //某个空盒子
        liItem = parseInt(divIndex / 4), //第几个li
        divItem = divIndex % 4, //第几个li中的第几个div盒子
        theBoxLeft = theBox.offsetLeft, //该盒子的left值
        num = parseInt(Math.random() * (4 - 2 + 1) + 2),
        rem = num % 2;
    num = rem == 0 ? num : num - 1; //对余数进行判断，生成2或4

    var newBox = document.createElement("div");
    var holderClassName = "grid" + liItem + "-" + divItem;
    var numberClassName = "number-" + num;
    var holderBox = util.getElement("." + holderClassName)[0];
    if (boxs.length == 32) return; //如果格子已满
    if (holderBox) { //如果该位置已有盒子
        this.createBox();
    } else {
        util.addClass(newBox, "box scale create-box " + numberClassName + " " + holderClassName);
        newBox.style.left = theBoxLeft + "px";
        newBox.innerText = num;
        newBox.style["z-index"] = 1;
        lis[liItem].appendChild(newBox);
    }
}
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
        // re = new RegExp(direction + "\\d\\-\\d", "g");
        re = new RegExp("(right|left|top|bottom)\\d\\-\\d", "g");
        // /right\d\-\d/g
        moveClassName = !!divItem ? divItem.className.match(re) : null;
        moveClassName = !!moveClassName ? moveClassName[0] : null;
        divItemText = !!divItem ? parseInt(divItem.innerText) : 0;
        gridInfo.value = divItemText;
        gridInfo.className = str;
        gridInfo.moveClassName = moveClassName;
        arr.push(gridInfo);
        switch (direction) {
            case "right":
            case "bottom":
                divItemText == 0 && sortArr.unshift(gridInfo); //左右区别在这里 push()
                divItemText > 0 && sortArr.push(gridInfo); //左右区别 unshift()
                break;
            case "left":
            case "top":
                divItemText > 0 && sortArr.push(gridInfo); //左右区别在这里 push()
                divItemText == 0 && count++;
                // divItemText > 0 && sortArr.unshift(gridInfo); //左右区别 unshift()
                break;
        }
    }
    for (var o = 0; o < count; o++) {
        sortArr.push({ value: 0, className: null, moveClassName: null });
    }
}
Game2048pro.sortoutBox = function(sortArr, k, moveIndex) {
    var _this = this;
    _this.removeNodeClassName = sortArr[k].className; //要移除元素的类名
    _this.moveBeforeValue = sortArr[moveIndex].value;
    _this.moveAfterValue = sortArr[k].value + sortArr[moveIndex].value; //移动元素在移动后的值
    var num = _this.removeNodeClassName.substr(4, 1); //获取该元素是在第几个li top substr(6,1);
    var li = util.getElement('li')[num],
        removeNode = util.getElement("." + _this.removeNodeClassName)[0];
    li.removeChild(removeNode);
    sortArr[moveIndex].value = _this.moveAfterValue;
    sortArr.splice(k, 1);
}
Game2048pro.sortGridInfo = function(sortArr, direction) {
    switch (direction) {
        case "right":
        case "bottom":
            for (var k = sortArr.length - 1; k > 0; k--) { //right bottom
                //如果排序后的数组
                if (sortArr[k].value == 0) continue;
                if (sortArr[k].value === sortArr[k - 1].value) {
                    var moveIndex = k - 1; //要移动的元素的数组下标
                    this.sortoutBox(sortArr, k, moveIndex);
                    sortArr.unshift({ value: 0, className: null });
                }
            }
            break;
        case "left":
        case "top":
            for (var k = 0; k < sortArr.length - 1; k++) { // left top
                if (sortArr[k].value == 0) continue;
                if (sortArr[k].value === sortArr[k + 1].value) {
                    var moveIndex = k + 1;
                    this.sortoutBox(sortArr, k, moveIndex);
                    sortArr.push({ value: 0, className: null }); //left top push()
                }
            }
            break;
    }
}

Game2048pro.moveBoxs = function(arr, sortArr, direction) {
    console.log("arr", arr);
    console.log("sortArr", sortArr)
    console.log("===============================================================");
    console.log("===============================================================");
    var _this = this;
    for (var l = 0; l < arr.length; l++) {
        if (arr[l].value == 0) continue;
        var arrClassName = arr[l].className;
        for (var p = 0; p < sortArr.length; p++) {
            if (sortArr[p].value == 0) continue;
            var sortClassName = sortArr[p].className;
            if (arrClassName == sortClassName) {
                if (p - l == 0) continue;
                var moveBox = util.getElement("." + arrClassName)[0];
                switch (direction) {
                    case "right":
                    case "left":
                        var num = arrClassName.substr(4, 1); // 右滑，下滑区别在这里 下滑substr(6,1)
                        util.replaceClass(moveBox, sortClassName, "grid" + num + "-" + p);
                        break;
                    case "top":
                    case "bottom":
                        var num = arrClassName.substr(6, 1); // 右滑，下滑区别在这里 下滑substr(6,1)
                        util.replaceClass(moveBox, sortClassName, "grid" + p + "-" + num);
                        break;
                }
                // util.removeClass(moveBox, sortClassName);
                moveBox.innerText = sortArr[p].value;
                util.replaceClass(moveBox, "number-" + _this.moveBeforeValue, "number-" + sortArr[p].value);
                !!sortArr[p].moveClassName ? util.replaceClass(moveBox, sortArr[p].moveClassName, direction + l + "-" + p) : util.addClass(moveBox, direction + l + "-" + p);
            }
        }
    }
}
Game2048pro.rightMove = function() {
    var _this = this;
    /**
     * 创建数组
     * arr => 原始位置
     * sortArr => 把原始数组 0 提前
     * 
     */
    for (var i = 0; i < 4; i++) {
        var arr = [];
        var sortArr = [];
        for (var j = 0; j < 4; j++) {
            var str = "grid" + i + "-" + j;
            var moveClassName;
            var gridInfo = {};
            var divItemText;
            var divItem = util.getElement("." + str)[0];
            var direction = "right";
            var re = new RegExp(direction + "\\d\\-\\d", "g");
            // /right\d\-\d/g
            moveClassName = !!divItem ? divItem.className.match(re) : null;
            moveClassName = !!moveClassName ? moveClassName[0] : null;

            divItemText = !!divItem ? parseInt(divItem.innerText) : 0;
            gridInfo.value = divItemText;
            gridInfo.className = str;
            gridInfo.moveClassName = moveClassName;
            arr.push(gridInfo);
            divItemText == 0 && sortArr.unshift(gridInfo);
            divItemText > 0 && sortArr.push(gridInfo);
        }

        // 对排序后的数组进行处理，合并
        // 
        for (var k = sortArr.length - 1; k > 0; k--) {
            //如果排序后的数组
            if (sortArr[k].value == 0) continue;
            if (sortArr[k].value === sortArr[k - 1].value) {
                var moveIndex = k - 1; //要移动的元素的数组下标
                _this.removeNodeClassName = sortArr[k].className; //要移除元素的类名
                _this.moveBeforeValue = sortArr[moveIndex].value;
                _this.moveAfterValue = sortArr[k].value + sortArr[moveIndex].value; //移动元素在移动后的值
                var num = _this.removeNodeClassName.substr(4, 1); //获取该元素是在第几个li

                var li = util.getElement('li')[num],
                    removeNode = util.getElement("." + _this.removeNodeClassName)[0];
                li.removeChild(removeNode);
                sortArr[moveIndex].value = _this.moveAfterValue;
                sortArr.splice(k, 1);
                sortArr.unshift({ value: 0, className: null });
            }
        }
        /**
         * 遍历原数组，取得每一个元素对象的className与排序后的数组中每一个元素对象的calssName比较，
         * 相同则，取出该对象在两个数组中的下标，用排序后的数组对象下标-原来的数组对象下标，得到要位移的
         *
         * 找出变化后的数组与原来数组中相同元素的变化
         */
        for (var l = 0; l < arr.length; l++) {
            if (arr[l].value == 0) continue;
            var arrClassName = arr[l].className;
            for (var p = 0; p < sortArr.length; p++) {
                if (sortArr[p].value == 0) continue;
                var sortClassName = sortArr[p].className;
                if (arrClassName == sortClassName) {
                    if (p - l == 0) continue;
                    var num = arrClassName.substr(4, 1); // 右滑，下滑区别在这里 下滑substr(6,1)
                    var moveBox = util.getElement("." + arrClassName)[0];
                    util.addClass(moveBox, "grid" + num + "-" + p);
                    util.removeClass(moveBox, sortClassName);

                    moveBox.innerText = sortArr[p].value;
                    util.replaceClass(moveBox, "number-" + _this.moveBeforeValue, "number-" + sortArr[p].value);

                    !!sortArr[p].moveClassName ?
                        util.replaceClass(moveBox, sortArr[p].moveClassName, "right" + l + "-" + p) :
                        util.addClass(moveBox, "right" + l + "-" + p);
                    //bug1:移动后，元素的类名不是对应当前位置的类名 如grid0-1移动到grid0-2后，类名还是grid0-1:以解决
                    //bug2:对于存在的类名不要重复添加 :以解决
                }
            }
        }
    }

}
Game2048pro.move = function(direction) {
    for (var i = 0; i < 4; i++) {
        var arr = [];
        var sortArr = [];
        this.saveGridInfo(i, arr, sortArr, direction);
        this.sortGridInfo(sortArr, direction);
        this.moveBoxs(arr, sortArr, direction);
    }
}
Game2048pro.touchstart = function(e, context) {
    this.startX = e.changedTouches[0].pageX;
    this.startY = e.changedTouches[0].pageY;
}
Game2048pro.touchend = function(e, context) {
    this.moveX = e.changedTouches[0].pageX - this.startX;
    this.moveY = e.changedTouches[0].pageY - this.startY;
    var absX = Math.abs(this.moveX); //X绝对值
    var absY = Math.abs(this.moveY); //Y绝对值
    if (absX < 5 && absY < 5) return;
    if (absX > absY && this.moveX > 0) {
        context.move("right");
    }
    if (absX > absY && this.moveX < 0) {
        context.move("left");
    }
    if (absX < absY && this.moveY > 0) {
        context.move("bottom");
    }
    if (absX < absY && this.moveY < 0) {
        context.move("top");
    }
    setTimeout(function() {
        context.createBox();
    }, 500);

}
Game2048pro.rePlay = function(context) {
    var rowLis = util.getElement(".row");
    for (var i = 0; i < rowLis.length; i++) {
        var boxs = util.getElement(".create-box", rowLis[i]);
        // var boxs = rowLis[i].getElementsByClassName("create-box");
        if (boxs.length <= 0) continue;
        var len = boxs.length;
        for (var j = 0; j < len; j++) {
            var box = boxs[0];
            rowLis[i].removeChild(box);
        }
    }
    context.createBox();
}
new Game2048;