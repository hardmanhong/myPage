var searchMovie = document.getElementsByClassName("search-movie")[0]; //搜索按钮
var movieName = document.getElementsByClassName("movie-name")[0]; //搜索框
var mainSearchResult = document.getElementsByClassName("main-search-result")[0]; //搜索区域

var frame = document.getElementsByClassName("frame")[0];
var seeTopMovie = document.getElementsByClassName("see-topMovie")[0];//top电影 按钮
var topMovie = document.getElementsByClassName("top-movie")[0]; //top电影界面

var weather = document.getElementsByClassName("weather")[0];//天气
var getSoonTime = 0; //监听获得 近期上映 的调用次数
var getTopTime = 0; //监听获得 Top电影 的调用次数

var showSoonMovie = document.getElementsByClassName("show-soonMovie")[0]; //近期上映
var showSearchMovie = document.getElementsByClassName("show-searchMovie")[0]; //搜索电影
var showTopMovie = document.getElementsByClassName("show-topMovie")[0]; //top电影

/**
 * [getMovieUrl 获取豆瓣电影JSONP的调用url]
 * @return {[Object]} [地址]
 */
function getMovieUrl() {
    var _soonMovieUrl = "https://api.douban.com/v2/movie/in_theaters?city=北京&start=?&count=?&callback=?";
    var _searchMovieUrl = "https://api.douban.com/v2/movie/search?q=?&start=?&count=?&callback=?";
    var _topMovieUrl = "https://api.douban.com/v2/movie/top250?start=?&count=?&callback=?";
    return {
        soonMovieUrl: _soonMovieUrl,
        searchMovieUrl: _searchMovieUrl,
        topMovieUrl: _topMovieUrl
    }
}
/**
 * [createElemForShowMovie 创建元素存储数据]
 * @param  {[item]} item [数组项]
 * @return {[element]}      [返回的元素]
 */
function createElemForShowMovie(item) {
    var typeArr = item.genres;
    var typeStr = typeArr.join("/");
    var titleH2 = document.createElement("h2");
    titleH2.innerText = item.title + " (" + item.year + "年)";

    var typeP = document.createElement("p");
    typeP.innerText = "类型：";
    var typeSpan = document.createElement("span");
    typeSpan.innerText = typeStr;
    typeP.appendChild(typeSpan);

    var ratingP = document.createElement("p");
    ratingP.innerText = "评分：";
    var ratingSpan = document.createElement("span");
    ratingSpan.innerText =
        item.rating.average === 0 ? "暂无评分" : item.rating.average
    ratingP.appendChild(ratingSpan);

    var detailsA = document.createElement("a");
    detailsA.innerText = "详情";
    detailsA.href = item.alt;

    var posterImg = document.createElement("img");
    posterImg.src = item.images.small;

    var showMovieLi = document.createElement("li");
    var descDiv = document.createElement("div");
    var posterDiv = document.createElement("div");

    descDiv.appendChild(titleH2);
    descDiv.appendChild(typeP);
    descDiv.appendChild(ratingP);
    descDiv.appendChild(detailsA);
    posterDiv.appendChild(posterImg);

    showMovieLi.appendChild(descDiv);
    showMovieLi.appendChild(posterDiv);
    return showMovieLi;
}
/**
 * [setHeight 设置显示近期上映区ul的高度]
 * @param {[element]} liheight [li高度]
 * @return {Number} [显示多少个li]
 */
function setSoonMovieHeight(liheight) {
    var mainHeight = document.getElementsByClassName("main")[0].offsetHeight;
    var mainTopHeight = document.getElementsByClassName("main-top")[0].offsetHeight;
    var searchAreaHeight = document.getElementsByClassName("search-area")[0].offsetHeight;
    var soonTextHeight = document.getElementsByClassName("soon-text")[0].offsetHeight;
    var githubHeight = document.getElementsByClassName("github-code")[0].offsetHeight;
    var h = mainHeight - mainTopHeight - searchAreaHeight - soonTextHeight - githubHeight;
    console.log("liheight:  ",liheight);
    console.log("mainHeight:  ",mainHeight);
    console.log("mainTopHeight:  ",mainTopHeight);
    console.log("searchAreaHeight:  ",searchAreaHeight);
    console.log("soonTextHeight:  ",soonTextHeight);
    console.log("githubHeight:  ",githubHeight);
    console.log("h:  ",h);
    console.log("h / liheight:  ",h / liheight);
    return parseInt(h / liheight);
}
/**
 * [setHeight 设置显示top电影 ul的高度]
 * @param {[element]} liheight [li高度]
 * @return {Number} [显示多少个li]
 */

function setTopMovieHeight(liheight) {
    var topmovieHeight = document.getElementsByClassName("top-movie")[0].offsetHeight;
    var topTextHeight = document.getElementsByClassName("top-text")[0].offsetHeight;
    var h = topmovieHeight - topTextHeight;
    return parseInt(h / liheight);
}

/**
 * [getSoonMovie 获取即将上映电影]
 * @param  {[array]} array [需要的传递参数]
 */

function getSoonMovie(array) {
    var soonMovieUrl = getMovieUrl().soonMovieUrl;
    getJSONP(soonMovieUrl, soonMovieCallBack, array);
    getSoonTime++;
}
/**
 * [getSearchMovie 获取搜索的电影]
 * @param  {[array]} array [需要的传递参数]
 */
function getSearchMovie(array) {
    var searchMovieUrl = getMovieUrl().searchMovieUrl;
    getJSONP(searchMovieUrl, searchMovieCallBack, array);
}
/**
 * [getTopMovie 获取Top榜电影]
 * @param  {[array]} array [需要的传递参数]
 */
function getTopMovie(array) {
    var topMovieUrl = getMovieUrl().topMovieUrl;
    getJSONP(topMovieUrl, topMovieCallBack, array);
    getTopTime++;
}

/**
 * [soonMovieCallBack 近期上映电影的回调函数]
 * @param  {[JSONP]} data [返回的数据]
 */
function soonMovieCallBack(data) {
    var _soonArr = data.subjects;
    var showMovieLiHeight;
    var loadt = document.getElementsByClassName("loadText")[0];
    loadt.innerText = "";
    loadt.style.height = 0;
    _soonArr.forEach(function(item, index) {
        var showMovieLi = createElemForShowMovie(item);
        showSoonMovie.insertBefore(showMovieLi, loadt);
        showMovieLiHeight = showMovieLi.offsetHeight;
    });
    showSoonMovie.style.height = setSoonMovieHeight(showMovieLiHeight) * showMovieLiHeight + "px";
    console.log(showSoonMovie.style.height);
    showSoonMovie.removeEventListener("touchstart", touchstart);
    showSoonMovie.removeEventListener("touchmove", touchmove);
    showSoonMovie.removeEventListener("touchend", touchend);
}
/**
 * [topMovieCallBack top电影的回调函数]
 * @param  {[JSONP]} data [返回的数据]
 */
function topMovieCallBack(data) {
    var initText = topMovie.getElementsByClassName("top-movie-initload")[0];
    initText && topMovie.removeChild(initText);
    var _topArr = data.subjects;
    var showMovieLiHeight;
    var loadt = document.getElementsByClassName("loadText")[1];
    loadt.innerText = "";
    loadt.style.height = 0;
    _topArr.forEach(function(item, index) {
        var showMovieLi = createElemForShowMovie(item);
        showTopMovie.insertBefore(showMovieLi, loadt);
        showMovieLiHeight = showMovieLi.offsetHeight;
    });
    showTopMovie.style.height = setTopMovieHeight(showMovieLiHeight) * showMovieLiHeight + "px";
    showTopMovie.removeEventListener("touchstart", touchstart);
    showTopMovie.removeEventListener("touchmove", touchmove);
    showTopMovie.removeEventListener("touchend", touchend);
}
/**
 * [searchMovieCallBack 搜索电影的回调函数]
 * @param  {[JSONP]} data [返回的数据]
 */
function searchMovieCallBack(data) {
    var _searchArr = data.subjects;
    var typeArr = _searchArr[0].genres;
    var typeStr = typeArr.join("/");
    _searchArr.forEach(function(item, inex) {
        var showMovieLi = createElemForShowMovie(item);
        var returnA = document.createElement("a");
        returnA.innerText = "返回";
        returnA.onclick = function() {
            mainSearchResult.style.display = "none";
            showSearchMovie.innerHTML = "";
        }
        showMovieLi.children[0].appendChild(returnA);
        showSearchMovie.appendChild(showMovieLi);
    });
}
/* 触摸事件函数 */
function touchstart(e) {
    this.startpageY = e.changedTouches[0].pageY;
}

function touchmove(e) {
    var move = this.startpageY - e.changedTouches[0].pageY;
    var loadt = this.getElementsByClassName("loadText")[0];
    loadt.innerText = "松开加载";
    loadt.style.height = move + "px";
}

function touchend(e) {
    this.touchLen = this.startpageY - e.changedTouches[0].pageY;
    if (this.touchLen > 20) {
        var loadt = this.getElementsByClassName("loadText")[0];
        loadt.innerText = "加载中";
        loadt.style.height = 2 + "rem";
        if (this.className.search("show-soonMovie")>=0) {
            getSoonMovie([getSoonTime * 6, 6]);
        } else if (this.className.search("show-topMovie")>=0) {
            getTopMovie([getTopTime * 10, 10]);
        }
    }
}
/**
 * [scrollLoad 滚动到底部添加触摸事件]
 * @param  {[element]} element [调用该方法的元素]
 */
function scrollLoad(element) {
    var scrollLen = element.scrollHeight - element.offsetHeight;
    if (element.scrollTop === scrollLen) {
        element.addEventListener("touchstart", touchstart);
        element.addEventListener("touchmove", touchmove);
        element.addEventListener("touchend", touchend);
    }
}
showSoonMovie.addEventListener("scroll", function(e) {
    scrollLoad(this);
});
showTopMovie.addEventListener("scroll", function(e) {
    scrollLoad(this);
});

/**
 * [initMovie 初始化函数]
 */
function initMovie() {
    getSoonMovie([0, 6]);
    searchMovie.onclick = function() {
        var movie = movieName.value;
        if(movie) {
            var searchArray = [movie, 0, 1];
            getSearchMovie(searchArray);
            mainSearchResult.style.display = "flex";
        }else {
            return;
        }
        
    }

    seeTopMovie.onclick = function() {
        var initLoadText = document.getElementsByClassName("top-movie-initload")[0];
        topMovie.style["z-index"] = 1;
        weather.style["z-index"] = 0;
        toggleSideBar(frame, frame.className, "right");
        removeClassName(frame, "sidebar-left-hide");
        getTopMovie([getTopTime * 10, 10]);
    }
}
initMovie();
