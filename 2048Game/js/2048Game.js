/**
 * 1.右滑
 * 	 第一步、遍历for(var i=0;i<4;i++)
 * 	 分别取得 gird0-0 , gird0-1 , gird0-2 , gird0-3
 * 	 		  gird1-0 , gird1-1 , gird1-2 , gird1-3
 * 	 		  gird2-0 , gird2-1 , gird2-2 , gird2-3
 * 	 		  gird3-0 , gird3-1 , gird3-2 , gird3-3
 * 	 		  等类
 * 	 		  如果找到，就把innerText取得push进一个数组 
 * 	 		  如果没有找到 undefined 就push一个为0的数值
 * 	 第二步、遍历上面的数组for(var i=3;i>=1;i--)
 * 	 1.从数组后面开始判断元素数值是否为0，
 * 	 if(arr[i]===0) { var prev = arr[i-1]; arr[i-1] = arr[i];arr[i]=prev}
 * 	 目的：把格子为空的元素（在数组中为0），提到前面，为后面判断相邻格子是否相同做好基础；
 * 	 2.从数组后面开始判断相邻元素是否相同并且该元素不等于0,
 * 	 相同则把arr[i-1]的值换为相加后的值，删除位置i的元素0，接着在头部加入一个为0的数值.。
 * 	 move为要位移的元素，对应gird-x-move，
 * 	 if(arr[i]!=0 && arr[i] === arr[i-1]) { var move = i-1;arr[i-1] = arr[i] + arr[i-1];arr.splice(i,1);arr.unshift(0);}
 * 	 这样做是为了把0都提前
 *
 * 	 要移动，有两个条件
 * 	 1.后面元素为空，对原数组，从当前位置寻找直到不为0的元素或者为数组的最长度，获取该元素的数组下标减去当前元素，
 * 	 则该元素要移动 74*3
 * 	 2.遇到可以合并的元素，按照上面的逻辑去进行判断
 *
 * 	 
 * 	 		  
 * 
 * 2.左滑
 * 3.下滑
 * 4.上滑
 */

var Game2048 = function () {
}
var Game2048pro = Game2048.prototype;
Game2048pro.createNum = function () {
	//在空格位置生成
	//1.parseInt(Math.random()*16);16为空格的类的长度。length
	//
	//第一步取得位置后，生成2或4
	//1.parseInt(Math.random() * (4 - 2 + 1) + 2);
	//对结果进行取余，如果能被2整除，则生成，不能则继续，好了就return 
}