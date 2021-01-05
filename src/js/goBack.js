//滚动事件,回到顶部
const goBack = document.getElementById("goBack");
window.onscroll = function () {
  if (this.pageYOffset > 250) {
    goBack.style.display = "block";
  } else {
    goBack.style.display = "none";
  }
};