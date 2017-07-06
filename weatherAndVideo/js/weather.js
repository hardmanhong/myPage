getElemByClassname("see-weather");
getElemByClassname("frame");
seeWeather.onclick = function() {
        initWeather();
        getElemByClassname("top-movie");
        getElemByClassname("weather");
        weather.style["z-index"] = 1;
        topMovie.style["z-index"] = 0;
        toggleSideBar(frame, frame.className, "left");
        removeClassName(frame, "sidebar-right-hide");
        
    }
    /**
     * [getWeatherUrl 获取天气api]
     */
function getWeatherUrl() {
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
function dailyWeatherCallBack(data) {
    var dailyArr = data.results[0].daily; //array
    dailyArr.forEach(function(item, index) {
        textDay[index].innerText = dailyArr[index].text_day;
        temperatureLow[index].innerText = dailyArr[index].low;
        temperatureHigh[index].innerText = dailyArr[index].high;
        dailyDate[index].innerText = dailyArr[index].date;
        weatherDailyIcon[index].src = "img/3d_60/" + dailyArr[index].code_day + ".png";
    });
}
/**
 * [nowWeatherCallBack 获取当前天气的回调函数]
 * @param  {[Object]} data [响应的数据]
 */
function nowWeatherCallBack(data) {
    var city = cityName.value;
    var dailyUrl = getWeatherUrl().dailyUrl;
    var nowData = data.results[0];
    var Name = nowData.location.name; //城市名
    var nowWeather = nowData.now;
    weatherNowCity.innerText = Name;
    weatherNowIcon.src = "img/3d_60/" + nowWeather.code + ".png";
    weatherNowTem.innerText = nowWeather.temperature;
    weatherNowText.innerText = nowWeather.text;
    var _arr = city === "" ? ["ip"] : [city];
    getJSONP(dailyUrl, dailyWeatherCallBack, _arr);
}
/**
 * [getWeather 获取天气函数]
 * @param  {[String]} city [搜索城市名]
 */
function getWeather(array) {
    var nowUrl = getWeatherUrl().nowUrl;
    getJSONP(nowUrl, nowWeatherCallBack, array);
}
/**
 * [init 初始化函数]
 */
function initWeather() {
    getElemByClassname("search-city");
    getElemByClassname("city-name");
    getElemByClassname("weather-now-icon");
    getElemByClassname("weather-now-tem");
    getElemByClassname("weather-now-text");
    getElemByClassname("weather-now-city");
    getElemByClassname("text-day", true);
    getElemByClassname("weather-daily-icon", true);
    getElemByClassname("temperature-low", true);
    getElemByClassname("temperature-high", true);
    getElemByClassname("daily-date", true);
    var city = cityName.value;
    var _arr = city === "" ? ["ip"] : [city];
    getWeather(_arr);
    searchCity.onclick = function() {
        var city = cityName.value;
        var _arr = [city];
        getWeather(_arr);
    }

}
