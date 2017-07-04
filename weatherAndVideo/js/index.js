window.onload = function() {
    var eyepetizerVideo = document.getElementsByClassName("eyepetizer-video")[0];
    var html = document.getElementsByClassName("frame")[0];
    eyepetizerVideo.ontouchstart = function() {
        html.className = html.className == "frame sidebar-show" ? "frame sidebar-hide" : "frame sidebar-show";
    }
    /**
     * [getElemByClassname 以类名获取元素]
     * @param  {[String]} className     [类名]
     * @param  {[Boolean]} getCollection [true:获取该类名的元素集合，false:获取该类名的单个类名]
     */
    var getElemByClassname = function(className, getCollection) {
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
     * [getJSONP JSONP函数]
     * @param  {[String]}   url      [心和天气API]
     * @param  {Function} callback [回调函数]
     * @param  {[String]}   city     [搜索的城市名]
     */
    var getJSONP = function(url, callback, city) {
        //创建一个唯一函数名称。
        var cbname = 'jsonp' + (new Date()).getTime();
        var i = 0;
        /* 
         * 匹配 ？符号，进去先+1，找到第一个，不改变，return old，
         * 继续寻找 ？ 符号，找到第二个，把唯一变量cbname替换第二个 ？符号,即 回调函数
         */
        url = url.replace(/\?/g, function(old) {
            if (++i === 3) {
                return cbname;
            } else if (i === 2) {
                if (city) {
                    return city;
                } else {
                    return "ip";
                }
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
    /**
     * [getWeatherUrl 获取天气api]
     */
    var getWeatherUrl = function() {
        var _time = Math.round(new Date().getTime() / 1000);
        var _str = "ts=" + _time + "&ttl=30&uid=U4A2739901";
        var _hash = CryptoJS.HmacSHA1(_str, "ll23zs7e78ltconu");
        var _base = _hash.toString(CryptoJS.enc.Base64);
        var _sig = encodeURIComponent(_base);
        var _params = "&ts=" + _time + "&ttl=30&uid=U4A2739901&sig=" + _sig; //参数签名认证
        var _nowUrl = "https://api.thinkpage.cn/v3/weather/now.json?location=?&callback=?" + _params; //现在天气url
        var _dailyUrl = "https://api.thinkpage.cn/v3/weather/daily.json?location=?&callback=?" + _params; //未来天气url
        return {
            nowUrl: _nowUrl,
            dailyUrl: _dailyUrl
        }
    }
    /**
     * [dailyWeatherCallBack 获取三天天气的回调函数]
     * @param  {[Object]} data [响应的数据]
     */
    var dailyWeatherCallBack = function(data) {
        var dailyArr = data.results[0].daily; //array
        dailyArr.forEach(function(item, index) {
            textDay[index].innerText = dailyArr[index].text_day;
            temperatureLow[index].innerText = dailyArr[index].low;
            temperatureHigh[index].innerText = dailyArr[index].high;
            dailyDate[index].innerText = dailyArr[index].date;
            weatherDailyIcon[index].src = "img/3d_60/" + dailyArr[index].code_day + ".png";
        })
    }
    /**
     * [nowWeatherCallBack 获取当前天气的回调函数]
     * @param  {[Object]} data [响应的数据]
     */
    var nowWeatherCallBack = function(data) {
        var city = searchInput.value;
        var dailyUrl = getWeatherUrl().dailyUrl;
        var nowData = data.results[0];
        var Name = nowData.location.name; //城市名
        var nowWeather = nowData.now;
        weatherNowCity.innerText = Name;
        weatherNowIcon.src = "img/3d_60/" + nowWeather.code + ".png";
        weatherNowTem.innerText = nowWeather.temperature;
        weatherNowText.innerText = nowWeather.text;
        getJSONP(dailyUrl, dailyWeatherCallBack, city);
    }
    /**
     * [getWeather 获取天气函数]
     * @param  {[String]} city [搜索城市名]
     */
    var getWeather = function(city) {
        var nowUrl = getWeatherUrl().nowUrl;
        getJSONP(nowUrl, nowWeatherCallBack, city);
    }
    /**
     * [init 初始化函数]
     */
    var init = function() {
        getElemByClassname("search-btn");
        getElemByClassname("search-input");
        getElemByClassname("weather-now-icon");
        getElemByClassname("weather-now-tem");
        getElemByClassname("weather-now-text");
        getElemByClassname("weather-now-city");

        getElemByClassname("text-day", true);
        getElemByClassname("weather-daily-icon", true);
        getElemByClassname("temperature-low", true);
        getElemByClassname("temperature-high", true);
        getElemByClassname("daily-date", true);
        getWeather();
    }
    init();
    /**
     * [ontouchstart 点击搜索城市天气]
     */
    searchBtn.ontouchstart = function() {
        var city = searchInput.value;
        getWeather(city);
    }
}
