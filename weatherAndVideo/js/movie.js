var soonMovieTitle = document.getElementsByClassName("soon-movie-title"); //标题
var soonMovieType = document.getElementsByClassName("soon-movie-type"); //类型
var soonMovieRating = document.getElementsByClassName("soon-movie-rating"); //评分
var soonMovieAlt = document.getElementsByClassName("soon-movie-alt"); //详情
var soonMoviePoster = document.getElementsByClassName("soon-movie-poster"); //海报

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

/**
 * [initMovie 初始化函数]
 */
function initMovie() {


    var soonArray = [0, 3];
    getSoonMovie(soonArray);


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
    _soonArr.forEach(function(item, index) {
        var typeArr = _soonArr[index].genres;
        var typeStr = typeArr.join("/");
        soonMovieTitle[index].innerText = _soonArr[index].title;
        soonMovieType[index].innerText = typeStr;
        soonMovieRating[index].innerText =
            _soonArr[index].rating.average === 0 ? "暂无评分" : _soonArr[index].rating.average
        soonMovieAlt[index].href = _soonArr[index].alt;
        soonMoviePoster[index].src = _soonArr[index].images.small;
    });
}
/**
 * [searchMovieCallBack 搜索电影的回调函数]
 * @param  {[JSONP]} data [返回的数据]
 */
function searchMovieCallBack(data) {
    console.log(data)
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
