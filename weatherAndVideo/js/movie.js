window.onload = function () {
	/**
	 * [initMovie 初始化函数]
	 */
	function initMovie () {
		getElemByClassname("soon-movie-title",true);//标题
		getElemByClassname("soon-movie-type",true);//类型
		getElemByClassname("soon-movie-rating",true);//评分
		getElemByClassname("soon-movie-alt",true);//详情
		getElemByClassname("soon-movie-poster",true);//海报

		var soonArray = [0,3];
		getSoonMovie(soonArray);

		getElemByClassname("search-movie");//搜索按钮
		getElemByClassname("return-search");//返回
		getElemByClassname("movie-name");//搜索框
		getElemByClassname("movie-search-result");//搜索区域

		getElemByClassname("movie-result-title");//标题
		getElemByClassname("movie-result-year");//年份
		getElemByClassname("movie-result-type");//类型
		getElemByClassname("movie-result-rating");//评分
		getElemByClassname("movie-result-alt");//详情
		getElemByClassname("movie-result-poster");//海报
		searchMovie.onclick = function () {
			var movie = movieName.value;
			var searchArray = [movie,0,1];
			getSearchMovie(searchArray);
			movieSearchResult.style.display = "flex";
		}
		returnSearch.onclick = function () {
			movieSearchResult.style.display = "none";
		}

	}
	initMovie();
	/**
	 * [getSoonMovie 获取即将上映电影]
	 * @param  {[array]} array [需要的传递参数]
	 */
	function getSoonMovie (array) {
		var soonMovieUrl = getMovieUrl().soonMovieUrl;
		getJSONP(soonMovieUrl,soonMovieCallBack,array);
	}
	/**
	 * [getSearchMovie 获取搜索的电影]
	 * @param  {[array]} array [需要的传递参数]
	 */
	function getSearchMovie (array) {
		var searchMovieUrl = getMovieUrl().searchMovieUrl;
		getJSONP(searchMovieUrl,searchMovieCallBack,array);
	}
	/**
	 * [getTopMovie 获取Top榜电影]
	 * @param  {[array]} array [需要的传递参数]
	 */
	function getTopMovie (array) {
		var topMovieUrl = getMovieUrl().topMovieUrl;
		getJSONP(topMovieUrl,topMovieCallBack,array);
	}
	/**
	 * [getMovieUrl 获取豆瓣电影JSONP的调用url]
	 * @return {[Object]} [地址]
	 */
	function getMovieUrl(){
		var _soonMovieUrl = "https://api.douban.com/v2/movie/coming_soon?start=?&count=?&callback=?";
		var _searchMovieUrl = "https://api.douban.com/v2/movie/search?q=?&start=?&count=?&callback=?";
		var _topMovieUrl = "https://api.douban.com/v2/movie/top250?start=?&count=?&callback=?";
		return {
			soonMovieUrl : _soonMovieUrl,
			searchMovieUrl : _searchMovieUrl,
			topMovieUrl : _topMovieUrl
		}
	}
	/**
	 * [soonMovieCallBack 即将上映电影的回调函数]
	 * @param  {[JSONP]} data [返回的数据]
	 */
	function soonMovieCallBack (data) {
		var _soonArr = data.subjects;
		_soonArr.forEach(function(item, index) {
			var typeArr = _soonArr[index].genres;
			var typeStr = typeArr.join("/");
			soonMovieTitle[index].innerText = _soonArr[index].title;
			soonMovieType[index].innerText = typeStr;
			soonMovieRating[index].innerText = 
				_soonArr[index].rating.average ===0 
					? "暂无评分" 
					: _soonArr[index].rating.average
			soonMovieAlt[index].href = _soonArr[index].alt;
			soonMoviePoster[index].src = _soonArr[index].images.medium;
		});
	}
	/**
	 * [searchMovieCallBack 搜索电影的回调函数]
	 * @param  {[JSONP]} data [返回的数据]
	 */
	function searchMovieCallBack (data) {
		console.log(data)
		var _searchArr = data.subjects;
		console.log(_searchArr)
		console.log(_searchArr[0])
		var typeArr = _searchArr[0].genres;
		var typeStr = typeArr.join("/");
		movieResultTitle.innerText = _searchArr[0].title;
		movieResultYear.innerText = _searchArr[0].year;
		movieResultType.innerText = typeStr;
		movieResultRating.innerText = _searchArr[0].rating.average;
		movieResultAlt.href = _searchArr[0].alt;
		movieResultPoster.src = _searchArr[0].images.medium;

	}
	/**
	 * [topMovieCallBack top榜电影的回调函数]
	 * @param  {[JSONP]} data [返回的数据]
	 */
	function topMovieCallBack (data) {

	}
}