/**
 *  生成格子
 *  获取类为 grid-00 的元素即空格子，parseInt(Math.random()*16)，16为 grid-00 类的长度，
 *  随机生成一个[0-16}的数字，再通过 获取 grid-00 集合的下标找到某个空格，接着获得该空格的left、top
 *  用该元素在数组中的下标除以4，liItem = parseInt(i/4)得到li的第几行（第一行为0），divItem = i%4 得到余数为该li的第几个元素
 *  为生成的元素添加类名grid+liItem+"-"+divItem，此步为了以后滑动时方便操作
 * 
 * 1.右滑
 *   第一步、遍历for(var i=0;i<4;i++)
 *   分别取得 grid0-0 , grid0-1 , grid0-2 , grid0-3
 *            grid1-0 , grid1-1 , grid1-2 , grid1-3
 *            grid2-0 , grid2-1 , grid2-2 , grid2-3
 *            grid3-0 , grid3-1 , grid3-2 , grid3-3
 *
 *            如果找到，就把innerText取得push进一个数组 
 *            如果没有找到 undefined 就push一个为0的数值
 *   第二步、遍历上面的数组for(var i=3;i>=1;i--)
 *   1.从数组后面开始判断元素数值是否为0，
 *   if(arr[i]===0) { if(arr[i-1]) {var prev = arr[i-1]; arr[i-1] = arr[i];arr[i]=prev}}
 *   目的：把格子为空的元素（在数组中为0），提到前面，为后面判断相邻格子是否相同做好基础；
 *   2.从数组后面开始判断相邻元素是否相同并且该元素不等于0,
 *   相同则把arr[i-1]的值换为相加后的值，删除位置i的元素0，接着在头部加入一个为0的数值.。
 *   move为要位移的元素，对应grid-x-move，
 *   if(arr[i]!=0 && arr[i] === arr[i-1]) { var move = i-1;arr[i-1] = arr[i] + arr[i-1];arr.splice(i,1);arr.unshift(0);}
 *   这样做是为了把0都提前
 *
 *   要移动，有两个条件
 *   1.后面元素为空，对原数组，从当前位置寻找直到不为0的元素或者为数组的最长度，获取该元素的数组下标减去当前元素，
 *   则该元素要移动 74*3
 *   2.遇到可以合并的元素，按照上面的逻辑去进行判断
 *
 *   从最后一个元素开始寻找，遍历原数组，寻找直到不为0的元素，
 *   若该元素与当前元素不同，则（该元素下标-1-当前元素下标）* 74，得到当前元素要移动的距离；
 *   若该元素与当前元素相同，则（该元素下标-当前元素下标）* 74，得到当前元素要移动的距离；
 *
 *   
 *            
 * 
 * 2.左滑
 * 3.下滑
 * 4.上滑
 */

var Game2048 = function() {
    this.init();
}
var Game2048pro = Game2048.prototype;
Game2048pro.init = function() {
    var _this = this;
    this.createBox();
    this.game2048 = document.getElementsByClassName("game-2048")[0];
    this.game2048.addEventListener("touchstart", function(e) {
        _this.touchstart(e, _this);
    });
    this.game2048.addEventListener("touchend", function(e) {
        _this.touchend(e, _this);
    });
}
Game2048pro.createBox = function() {
    // 生成格子
    // *    获取类为 grid-00 的元素即空格子，parseInt(Math.random()*16)，16为 grid-00 类的长度，
    // *    随机生成一个[0-16}的数字，再通过 获取 grid-00 集合的下标找到某个空格，设置该空格的类名为 ""，接着获得该空格的left、top
    // *    用该元素在数组中的下标除以4，liItem = parseInt(i/4)得到li的第几行（第一行为0），divItem = i%4 得到余数为该li的第几个元素
    // *    为生成的元素添加类名grid+liItem+"-"+divItem，设置其left值，添加到lis[liItem]中,
    //  此步为了以后滑动时方便操作
    //在空格位置生成
    //
    //1.parseInt(Math.random()*16);16为空格的类的长度。length
    //
    //第一步取得位置后，生成2或4
    //1.parseInt(Math.random() * (4 - 2 + 1) + 2); 生成2-4的 [2-4]
    //对结果进行取余，如果能被2整除，则生成，不能则继续，好了就return 
    var blankBoxs = document.getElementsByClassName("grid-00"),
        boxs = document.getElementsByClassName("box"),
        lis = document.getElementsByClassName("row");
    var divIndex = parseInt(Math.random() * blankBoxs.length);
    var theBox = blankBoxs[divIndex], //某个空盒子
        liItem = parseInt(divIndex / 4), //第几个li
        divItem = divIndex % 4; //第几个li中的第几个div盒子
    var theBoxLeft = theBox.offsetLeft; //该盒子的left值
    var num = parseInt(Math.random() * (4 - 2 + 1) + 2);
    var rem = num % 2;
    num = rem == 0 ? num : num - 1; //对余数进行判断，生成2或4

    var newBox = document.createElement("div");
    var holderClassName = " grid" + liItem + "-" + divItem;
    var holderBox = document.getElementsByClassName(holderClassName)[0];
    if (boxs.length == 32) return; //如果格子已满
    if (holderBox) { //如果该位置已有盒子
        this.createBox();
    } else {
        newBox.className = "box grid-0" + num + holderClassName;
        newBox.style.left = theBoxLeft + "px";
        newBox.innerText = num;
        newBox.style["z-index"] = 1;
        lis[liItem].appendChild(newBox);
    }
}
Game2048pro.rightMove = function() {
    var allArr = [];
    for (var i = 0; i < 4; i++) {
        var arr = [];
        var sortArr = [];
        for (var j = 0; j < 4; j++) {
            var str = "grid" + i + "-" + j;
            var gridInfo = {};
            var divItem = document.getElementsByClassName(str)[0];
            divItemText = !!divItem ? parseInt(divItem.innerText) : 0;
            gridInfo.value = divItemText;
            gridInfo.className = str;
            arr.push(gridInfo);
            divItemText == 0 && sortArr.unshift(gridInfo);
            divItemText > 0 && sortArr.push(gridInfo);

        }
        for (var k = sortArr.length - 1; k > 0; k--) {
            //如果排序后的数组
            if (sortArr[k].value != 0 && sortArr[k].value === sortArr[k - 1].value) {
                var move = k - 1;
                sortArr[k - 1].value = sortArr[k].value + sortArr[k - 1].value;
                var num = sortArr[k].className.substr(4,1);
                var moveNode = document.getElementsByClassName(sortArr[k - 1].className)[0];
                moveNode.innerText = sortArr[k - 1].value;
                var removeNode = document.getElementsByClassName(sortArr[k].className)[0];
                sortArr.splice(k, 1);
                sortArr.unshift({vale:0,className:null});
                //移除的元素对应Li中要移除的盒子
                var li = document.getElementsByTagName('li')[num];
                li.removeChild(removeNode);
            }
        }
        /**
         * 遍历原数组，取得每一个元素对象的className与排序后的数组中每一个元素对象的calssName比较，
         * 相同则，取出该对象在两个数组中的下标，用排序后的数组对象下标-原来的数组对象下标，得到要位移的
         * 格子*74，就是位移的距离
         */
        for(var l = 0;l<arr.length;l++) {
            if(arr[l].value == 0) { continue;} 
            var arrClassName = arr[l].className;
            for(var p = 0;p<sortArr.length;p++){
                var sortClassName = sortArr[p].className;
                if(arrClassName == sortClassName) {
                    var boxNum = p - l;
                    var moveBox = document.getElementsByClassName(arrClassName)[0];
                    this.addClassName(moveBox,["scale","right"+l+"-"+p]);
                    //bug1:移动后，元素的类名不是对应当前位置的类名 如grid0-1移动到grid0-2后，类名还是grid0-1
                    //bug2:对于存在的类名不要重复添加
                    //bug3:先加再移动，应该移动后再显示数字，同时添加放大动画
                }
            }
        }
        
        allArr.push(arr);
    }

}
Game2048pro.addClassName = function(node,className) {
   for(var i=0;i<className.length;i++) {
        if(node.className)
        var str = node.className + " "
        node.className = str + className[i];
      }
}
Game2048pro.leftMove = function() {

}
Game2048pro.topMove = function() {

}
Game2048pro.bottomMove = function() {

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
        console.log("right");
        context.rightMove();
    }
    if (absX > absY && this.moveX < 0) {
        console.log("left");
    }
    if (absX < absY && this.moveY > 0) {
        console.log("bottom")
    }
    if (absX < absY && this.moveY < 0) {
        console.log("top")
    }
    context.createBox();
}
new Game2048;