window.onload = function() {
  var countryText = document.getElementsByClassName("country-text")[0];
  var selectBtn = document.getElementsByClassName("select")[0];
  var countryList = document.getElementsByClassName("country-list")[0];
  var countryItem = document.getElementsByClassName("country-item");
  var formInput = document.getElementsByClassName("form-input");
  countryText.ontouchstart = showCountryList;
  selectBtn.ontouchstart = showCountryList;

  function showCountryList() {
    countryList.style.display =
      countryList.style.display === "block" ? "none" : "block";
    (event || window.event).cancelBubble = true;
  }
  for (let i = 0; i < countryItem.length; i++) {
    countryItem[i].ontouchstart = function() {
      this.className = "touch";
      countryText.innerText = this.innerText;
    }
    countryItem[i].ontouchend = function() {
      this.className = "";
    }
  }
  document.ontouchstart = function() {
    countryList.style.display = "none";
  }
  for (let i = 0; i < formInput.length; i++) {
    //获得焦点
    formInput[i].onfocus = function() {
        this.className = "form-input";
        this.nextElementSibling.style.display = 'none';
      }
      //失去焦点
    formInput[i].onblur = function() {
      this.nextElementSibling.className =
        this.value === "" ? "error fa fa-close fa-2x" : "right fa fa-check fa-2x";
      this.className = "form-input onblur";
      this.nextElementSibling.style.display = 'block';
    }
  }
}
