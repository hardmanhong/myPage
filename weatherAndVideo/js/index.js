window.onload = function() {
  var meizuWeather = document.getElementsByClassName("meizu-weather")[0];
  var eyepetizerVideo = document.getElementsByClassName("eyepetizer-video")[0];
  var html = document.getElementsByClassName("frame")[0];
  eyepetizerVideo.onclick = function() {
    html.className = html.className == "frame sidebar-show" ? "frame sidebar-hide" : "frame sidebar-show";
  }

}
