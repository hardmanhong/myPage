window.onload = function () {
	var wechat_i = document.getElementsByClassName("wechat-i")[0];
	var myWechat = document.getElementsByClassName("my-wechat")[0];
	wechat_i.addEventListener("mouseover",function () {
		myWechat.style.display = "block";
	});
	wechat_i.addEventListener("mouseout",function () {
		myWechat.style.display = "none";
	});
}
