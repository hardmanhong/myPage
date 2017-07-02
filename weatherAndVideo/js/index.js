window.onload = function() {
    var meizuWeather = document.getElementsByClassName("meizu-weather")[0];
    var eyepetizerVideo = document.getElementsByClassName("eyepetizer-video")[0];
    var html = document.getElementsByClassName("frame")[0];
    eyepetizerVideo.onclick = function() {
        html.className = html.className == "frame sidebar-show" ? "frame sidebar-hide" : "frame sidebar-show";
    }

    // var getJSONP = function(url, callback) {
    //         //创建一个唯一函数名称。
    //         var cbname = 'jsonp' + (new Date()).getTime();
    //         var i = 0;
    //         //替换
    //         url = url.replace(/\?/g, function(old) {
    //             if (++i === 2) {
    //                 return cbname;
    //             } else {
    //                 return old;
    //             }
    //         });
    //         //创建回调函数。
    //         window[cbname] = function(response) {
    //                 try {
    //                     callback(response); //处理响应 
    //                 } finally {
    //                     //删除该函数, 并移除相应script元素 
    //                     delete window[cbname];
    //                     script.parentNode.removeChild(script);
    //                 }
    //             }
    //             //创建script标签并添加到DOM中去
    //         var script = document.createElement("script");
    //         script.src = url;
    //         document.body.appendChild(script);
    //     }
    //     //获取数据
    // var time = Math.round(new Date().getTime()/1000);
    // var str ="&ttl=30&uid=U4A2739901";
    // var hash = CryptoJS.HmacSHA1(str, "ll23zs7e78ltconu");
    // var base = hash.toString(CryptoJS.enc.Base64);
    // var sig = encodeURIComponent(base);
    // var url = "https://api.thinkpage.cn/v3/weather/now.json?location=深圳&ts="+time+str+"&sig="+sig+"&callback=?";


    // // var url = "https://api.thinkpage.cn/v3/weather/now.json?
    // //        location=ip&callback=convertWeatherObj&" + str + "&sig=" + sig;
    // getJSONP(url, function(data) {
    //     console.log(data);
    //     //do something;
    // });
    var searchBtn = document.getElementsByClassName("search-btn")[0];
    searchBtn.onclick = function () {
    	var time = Math.round(new Date().getTime() / 1000);
        var str = "ts=" + time + "&ttl=30&uid=U4A2739901";
        var hash = CryptoJS.HmacSHA1(str, "ll23zs7e78ltconu");
        var base = hash.toString(CryptoJS.enc.Base64);
        var sig = encodeURIComponent(base);
        var url = "https://api.thinkpage.cn/v3/weather/daily.json?location=beijing&callback=showWeather&" + str + "&sig=" + sig;
        var script = document.createElement('script');
        script.setAttribute('src', url);
        document.getElementsByTagName('body')[0].appendChild(script);
    }
        
    
}
