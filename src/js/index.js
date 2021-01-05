
function bindEvent() {
  // 首页
  //滚动事件,回到顶部
  const goBack = document.getElementById("goBack");
  window.onscroll = function () {
    if (this.pageYOffset > 250) {
      goBack.style.display = "block";
    } else {
      goBack.style.display = "none";
    }
  };
  //首页导航切换
  var shouyenav = document.querySelectorAll("#shouye-nav span");
  var shouyenavLen = shouyenav.length;
  for (let i = 0; i < shouyenavLen; i++) {
    shouyenav[i].onclick = function (e) {
      if (this.classList.contains("active")) {
        return;
      } else {
        Active(shouyenav, this);
        tab = this.dataset.id;
        currentPage = 1;
        renderBtn();
        getDataCommonThen("topics?tab=" + this.dataset.id, shouyewrapper);
      }
    };
  }
  //帖子点击事件
  shouyewrapper.onclick = function (e) {
    const targetDom = e.target;
    if (targetDom.className === "tieziCapture") {
      localStorage.setItem(targetDom.id, targetDom.id);
    } else {
      return;
    }
  };
  //按钮翻页
  var btnWrap = document.getElementById("turnPage-btn");
  btnWrap.onclick = function (e) {
    if (e.target.className) {
      if (e.target.className === "first-btn") {
        turnPage(-1);
        getDataCommonThen("topics?tab=" + tab + "&page=" + currentPage, shouyewrapper);
      } else {
        turnPage(+1);
        getDataCommonThen("topics?tab=" + tab + "&page=" + currentPage, shouyewrapper);
      }
    } else if (e.target.dataset.id) {
      currentPage = +e.target.dataset.id;
      getDataCommonThen("topics?tab=" + tab + "&page=" + currentPage, shouyewrapper);
      renderBtn();
    }
  };
}
let message;
let shouyewrapper = document.querySelectorAll("#shouye")[0];
let tab = "all";
let currentPage = 1;
// 初始化
function init() {
  getData().then((resp) => {
    message = resp.data;
    // console.log(message);
    render(message, shouyewrapper); //数据驱动页面渲染
    renderBtn(); //渲染按钮组
    bindEvent(); //绑定所有事件
    // 获取locastorage里的数据,通过访问记录来达到变色目的。
    for (let i = 0; i < localStorage.length; i++) {
      var handleTargetDom = document.getElementById(localStorage.key(i));
      handleTargetDom && handleTargetDom.classList.add("active");
    }
  });
}
init();
