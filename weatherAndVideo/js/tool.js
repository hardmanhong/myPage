/**
 * [getJSONP JSONP函数]
 * @param  {[String]}   url      [心和天气API]
 * @param  {Function} callback [回调函数]
 * @param  {[array]}   array     [参数]
 */
function getJSONP(url, callback, array) {
    var paramLength = url.match(/\?/g).length; //匹配参数数量
    //创建一个唯一函数名称。
    var cbname = 'jsonp' + (new Date()).getTime();
    var i = 0;
    // console.log(array);
    /* 
     * 匹配 ？符号，进去先+1，找到第一个，不改变，return old，
     * 继续寻找 ？ 符号，找到第二个，把唯一变量cbname替换第二个 ？符号,即 回调函数
     */
    url = url.replace(/\?/g, function(old) {
        i++;
        if (i === 1) { //跳过第一个?
            return old;
        } else if (i === paramLength) { //最后一个?替换为回调函数
            return cbname;
        } else { //需要匹配的参数
            return array[i - 2];
        }
    });
    //创建回调函数。
    window[cbname] = function(response) {
            try {
                callback(response); //处理响应 
            } finally {
                //删除该函数, 并移除相应script元素 
                delete window[cbname];
                script.parentNode.removeChild(script);
            }
        }
        //创建script标签并添加到DOM中去
    var script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
}
/**
 * [getElemByClassname 以类名获取元素]
 * @param  {[String]} className     [类名]
 * @param  {[Boolean]} getCollection [true:获取该类名的元素集合，false:获取该类名的单个类名]
 */
function getElemByClassname(className, getCollection) {
    var arr = className.trim().split(/\-/);
    for (let i = 1; i < arr.length; i++) {
        arr[i] = arr[i].substr(0, 1).toUpperCase() + arr[i].substr(1);
    }
    var name = arr.join("");
    if (getCollection) {
        window[name] = document.getElementsByClassName(className);
    } else {
        window[name] = document.getElementsByClassName(className)[0];
    }
}
/**
 * [toggleSideBar 切换类名]
 * @param  {[element]} elem      [指定元素]
 * @param  {[String]} className [类名]
 */
function toggleSideBar(elem, className, direction) {
    (className.indexOf(direction) === -1) && (className = className + " sidebar-"+ direction + "-hide");
    var reStr = direction + "-";
    var re = new RegExp(reStr + "[a-z]*");
    className = className.replace(re, function(old) {
        var newStr = old === (reStr + "show") ? (reStr + "hide") : (reStr + "show");
        return newStr;
    });
    elem.className = className;
}
/**
 * [removeClassName 移除指定元素的类名]
 * @param  {[element]} elem      [指定元素]
 * @param  {[String]} className [类名]
 */
function removeClassName(elem, className) {
    var re = new RegExp(className);
    elem.className = elem.className.replace(re, function() {
        return '';
    });

}
