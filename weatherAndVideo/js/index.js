window.onload = function() {
    var meizuWeather = document.getElementsByClassName("meizu-weather")[0];
    var eyepetizerVideo = document.getElementsByClassName("eyepetizer-video")[0];
    var html = document.getElementsByClassName("frame")[0];
    eyepetizerVideo.onclick = function() {
            html.className = html.className == "frame sidebar-show" ? "frame sidebar-hide" : "frame sidebar-show";
        }
        //获取数据
    var time = Math.round(new Date().getTime() / 1000);
    var str = "ts=" + time + "&ttl=30&uid=U4A2739901";
    var hash = CryptoJS.HmacSHA1(str, "ll23zs7e78ltconu");
    var base = hash.toString(CryptoJS.enc.Base64);
    var sig = encodeURIComponent(base);
    var params = "&ts=" + time + "&ttl=30&uid=U4A2739901&sig=" + sig; //参数签名认证
    console.log("签名： " + params);
    var nowUrl = "https://api.thinkpage.cn/v3/weather/now.json?location=ip&callback=?" + params; //现在天气url
    var dailyUrl = "https://api.thinkpage.cn/v3/weather/daily.json?location=深圳&callback=?" + params; //未来天气url
    var getJSONP = function(url, callback) {
        //创建一个唯一函数名称。
        var cbname = 'jsonp' + (new Date()).getTime();
        var i = 0;
        /* 
         * 匹配 ？符号，进去先+1，找到第一个，不改变，return old，
         * 继续寻找 ？ 符号，找到第二个，把唯一变量cbname替换第二个 ？符号,即 回调函数
         */
        url = url.replace(/\?/g, function(old) {
            console.log("first", i)
            if (++i === 2) {
                return cbname;
            } else {
                return old;
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


    getJSONP(nowUrl, function(data) {
        console.dir(data);
    });
    setTimeout(function () {
    	getJSONP(dailyUrl, function(data) {
        console.dir(data);
    });
    }, 500);
    
    var searchBtn = document.getElementsByClassName("search-btn")[0];
    searchBtn.onclick = function() {

    }


}
