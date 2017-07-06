var searchMovie = document.getElementsByClassName("search-movie")[0]; //搜索按钮
var returnSearch = document.getElementsByClassName("return-search")[0]; //返回
var movieName = document.getElementsByClassName("movie-name")[0]; //搜索框
var movieSearchResult = document.getElementsByClassName("movie-search-result")[0]; //搜索区域

var movieResultTitle = document.getElementsByClassName("movie-result-title")[0]; //标题
var movieResultYear = document.getElementsByClassName("movie-result-year")[0]; //年份
var movieResultType = document.getElementsByClassName("movie-result-type")[0]; //类型
var movieResultRating = document.getElementsByClassName("movie-result-rating")[0]; //评分
var movieResultAlt = document.getElementsByClassName("movie-result-alt")[0]; //详情
var movieResultPoster = document.getElementsByClassName("movie-result-poster")[0]; //海报

var frame = document.getElementsByClassName("frame")[0];
var seeTopMovie = document.getElementsByClassName("see-topMovie")[0];
var topMovie = document.getElementsByClassName("top-movie")[0];

var weather = document.getElementsByClassName("weather")[0];
var getSoonTime = 0;//监听获得 近期上映 的调用次数
/**
 * [initMovie 初始化函数]
 */
function initMovie() {
    getSoonMovie([0, 6]);
    searchMovie.onclick = function() {
        var movie = movieName.value;
        var searchArray = [movie, 0, 1];
        getSearchMovie(searchArray);
        movieSearchResult.style.display = "flex";
    }
    returnSearch.onclick = function() {
        movieSearchResult.style.display = "none";
    }
    seeTopMovie.onclick = function() {
        topMovie.style["z-index"] = 1;
        weather.style["z-index"] = 0;
        toggleSideBar(frame, frame.className, "right");
        removeClassName(frame, "sidebar-left-hide");

    }
}
initMovie();

/**
 * [getSoonMovie 获取即将上映电影]
 * @param  {[array]} array [需要的传递参数]
 */

function getSoonMovie(array) {
    var soonMovieUrl = getMovieUrl().soonMovieUrl;
    getJSONP(soonMovieUrl, soonMovieCallBack, array);
    console.log(getSoonTime);
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
}
/**
 * [getMovieUrl 获取豆瓣电影JSONP的调用url]
 * @return {[Object]} [地址]
 */
function getMovieUrl() {
    var _soonMovieUrl = "https://api.douban.com/v2/movie/coming_soon?start=?&count=?&callback=?";
    var _searchMovieUrl = "https://api.douban.com/v2/movie/search?q=?&start=?&count=?&callback=?";
    var _topMovieUrl = "https://api.douban.com/v2/movie/top250?start=?&count=?&callback=?";
    return {
        soonMovieUrl: _soonMovieUrl,
        searchMovieUrl: _searchMovieUrl,
        topMovieUrl: _topMovieUrl
    }
}
/**
 * [soonMovieCallBack 即将上映电影的回调函数]
 * @param  {[JSONP]} data [返回的数据]
 */
function soonMovieCallBack(data) {
    var _soonArr = data.subjects;
    var showMovieLiHeight;
    var showMovie = document.getElementsByClassName("show-movie")[0];

    _soonArr.forEach(function(item, index) {
        var loadt = document.getElementsByClassName("loadText")[0];
        loadt.innerText = "";
        loadt.style.height = 0;
        var typeArr = _soonArr[index].genres;
        var typeStr = typeArr.join("/");
        var titleH2 = document.createElement("h2");
        titleH2.innerText = _soonArr[index].title;

        var typeP = document.createElement("p");
        typeP.innerText = "类型：";
        var typeSpan = document.createElement("span");
        typeSpan.innerText = typeStr;
        typeP.appendChild(typeSpan);

        var ratingP = document.createElement("p");
        ratingP.innerText = "评分：";
        var ratingSpan = document.createElement("span");
        ratingSpan.innerText =
            _soonArr[index].rating.average === 0 ? "暂无评分" : _soonArr[index].rating.average
        ratingP.appendChild(ratingSpan);

        var detailsA = document.createElement("a");
        detailsA.innerText = "详情";
        detailsA.href = _soonArr[index].alt;

        var posterImg = document.createElement("img");
        posterImg.src = _soonArr[index].images.small;

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

        showMovie.insertBefore(showMovieLi, loadt);
        showMovieLiHeight = showMovieLi.offsetHeight;
    });
    console.log(showMovieLiHeight);
    showMovie.style.height = setHeight(showMovieLiHeight) * showMovieLiHeight + "px";
}

function setHeight(liheight) {
    var movieHeight = document.getElementsByClassName("movie")[0].offsetHeight;
    var movieTopHeight = document.getElementsByClassName("movie-top")[0].offsetHeight;
    var searchAreaHeight = document.getElementsByClassName("search-area")[0].offsetHeight;
    var soonTextHeight = document.getElementsByClassName("soon-text")[0].offsetHeight;
    var githubHeight = document.getElementsByClassName("github-code")[0].offsetHeight;
    var h = movieHeight - movieTopHeight - searchAreaHeight - soonTextHeight - githubHeight;
    return parseInt(h / liheight);
}
/**
 * [searchMovieCallBack 搜索电影的回调函数]
 * @param  {[JSONP]} data [返回的数据]
 */
function searchMovieCallBack(data) {
    var _searchArr = data.subjects;
    var typeArr = _searchArr[0].genres;
    var typeStr = typeArr.join("/");
    movieResultTitle.innerText = _searchArr[0].title;
    movieResultYear.innerText = _searchArr[0].year;
    movieResultType.innerText = typeStr;
    movieResultRating.innerText = _searchArr[0].rating.average;
    movieResultAlt.href = _searchArr[0].alt;
    movieResultPoster.src = _searchArr[0].images.small;

}
/**
 * [topMovieCallBack top榜电影的回调函数]
 * @param  {[JSONP]} data [返回的数据]
 */
function topMovieCallBack(data) {

}

var showMovie = document.getElementsByClassName("show-movie")[0];
showMovie.addEventListener("scroll", function(e) {
    var scrollLen = this.scrollHeight - this.offsetHeight;
    if (this.scrollTop === scrollLen) {
        showMovie.addEventListener("touchstart", touchstart);
        showMovie.addEventListener("touchmove", touchmove);
        showMovie.addEventListener("touchend", touchend);
    }
});

function touchstart(e) {
    this.startpageY = e.changedTouches[0].pageY;
}

function touchmove(e) {
    var move = this.startpageY - e.changedTouches[0].pageY;
    var loadt = document.getElementsByClassName("loadText")[0];
    loadt.innerText = "松开加载";
    loadt.style.height = move + "px";
}

function touchend(e) {
    this.touchLen = this.startpageY - e.changedTouches[0].pageY;
    if (this.touchLen > 20) {
        var loadt = document.getElementsByClassName("loadText")[0];
        loadt.innerText = "加载中";
        loadt.style.height = 2 + "rem";
        getSoonMovie([getSoonTime * 6, 6]);
    }
}
