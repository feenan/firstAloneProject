async function getData(url) {
  var urlend = url ? url : "topics?tab=all";
  var resp = await fetch("https://cnodejs.org/api/v1/" + urlend);
  var result = await resp.json();
  return result;
}
function getDataCommonThen(url,wrapper) {
  getData(url).then((resp) => {
    message = resp.data;
    console.log(message);
    render(message, wrapper);
  });
}

function render(data, wrapper) {
  var htmlStr = "";
  for (var i = 0; i < data.length; i++) {
    htmlStr += createEle(data[i]);
  }
  wrapper.innerHTML = htmlStr;
}
function createEle(data) {
  var replyCount = data.reply_count;
  var visitCount = data.visit_count;
  /*关于置顶贴和精华贴以及别的贴判断比较深，首先是文字的显示有5种，之后样式的判断也是基于此*/
  var tab =
    data.top == true
      ? "置顶"
      : data.good == true
      ? "精华"
      : data.tab
      ? data.tab === "ask"
        ? "问答"
        : data.tab === "share"
        ? "分享"
        : ""
      : "";
  var title = data.title;
  var dataId = data.id;
  var authorId = data.author_id;
  var authorName = data.author.loginname;
  var lastTime = data.last_reply_at;
  var timeData = handleDate(lastTime);
  return ` <div class="main-content content-hover">
  <div class="main-left">
    <a 
    href="./user.html?author=${authorName}"
    title = ${authorName}
      ><img
        src="../src/image/main-content-img_01.jpg"
        alt=""
        class="user-img"
    /></a>
    <div class="main-text">
      <div class="main-text-left">
        <span class="comment">${replyCount}</span>/<span class="view"
          >${visitCount}</span
        >
      </div>
      <div class="main-text-right">
        <span class=${
          tab ? (tab === "置顶" || tab === "精华" ? "impo" : "ordin") : ""
        }>${tab}</span
        ><a
          id=${dataId}
          href="./tiezi.html?dataId=${dataId}"
          title="${title}" 
          class="tieziCapture"
          >${title}</a  
        >
      </div>
    </div>
  </div>
  <div class="main-right">
    <a href="./tiezi.html?dataId=${dataId}">
      <img
        src="../src/image/main-content-img_03.jpg"
        alt=""
        class="user-imgSmall"
      /><span class="time">${timeData}前</span>
    </a>
  </div>
</div>`;
}

// 翻页按钮的渲染函数
function turnPage(num,ArrLength){
  if(num == -1 && currentPage == 1){
    return 
  }
  if(ArrLength){
    if(num == +1 && currentPage == ArrLength)
    {return}
  }
   currentPage += num;
   renderBtn(ArrLength);
}
function renderBtn(length) {
  const btnWrap = document.getElementById("turnPage-btn");
  btnWrap.innerHTML = "";
  const preBtn = document.createElement("a");
  preBtn.className = "first-btn";
  btnWrap.appendChild(preBtn);
  preBtn.innerHTML = "<<";
  if (currentPage - 2 >= 2) {
    let iBtn = document.createElement("a");
     iBtn.innerHTML = "...";
     btnWrap.appendChild(iBtn);
   }
   
  if(length){
   // 添加中间页
  if (length > 5 && currentPage >= 1 && currentPage<= 3) {
    for (let i = 1; i <= 5; i++) {
      let numBtn = document.createElement("a");
      numBtn.innerHTML = i;
      numBtn.dataset.id = i;
      if(currentPage == i){
        numBtn.className = 'active';
      }
      btnWrap.appendChild(numBtn);
    }
    console.log(currentPage);
  } else if (length > 5 && currentPage > 3) {
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      let numBtn = document.createElement("a");
      numBtn.innerHTML = i;
      numBtn.dataset.id = i;
      if(currentPage == i){
        numBtn.className = 'active';
      }
      btnWrap.appendChild(numBtn);
   
    }
  }else{
    for (let i = 1; i <= length; i++) {
      let numBtn = document.createElement("a");
      numBtn.innerHTML = i;
      numBtn.dataset.id = i;
      if(currentPage == i){
        numBtn.className = 'active';
      }
      btnWrap.appendChild(numBtn);
    }
  }
  if(length - currentPage - 1 > 2){
    let iBtn2 = document.createElement("a");
  iBtn2.innerHTML = "...";
  btnWrap.appendChild(iBtn2);
  }
  
  }else{
  // 添加中间页
  if (currentPage >= 1 && currentPage<= 3) {
    for (let i = 1; i <= 5; i++) {
      let numBtn = document.createElement("a");
      numBtn.innerHTML = i;
      numBtn.dataset.id = i;
      if(currentPage == i){
        numBtn.className = 'active';
      }
      btnWrap.appendChild(numBtn);
    }
    console.log(currentPage);
  } else if (currentPage > 3) {
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      let numBtn = document.createElement("a");
      numBtn.innerHTML = i;
      numBtn.dataset.id = i;
      if(currentPage == i){
        numBtn.className = 'active';
      }
      btnWrap.appendChild(numBtn);
    }
  }
  
  let iBtn2 = document.createElement("a");
  iBtn2.innerHTML = "...";
  btnWrap.appendChild(iBtn2);
}
//   添加末尾固定按键
let nextBtn = document.createElement("a");
nextBtn.innerHTML = ">>";
nextBtn.className = "last-btn";
btnWrap.appendChild(nextBtn);
}

  //处理所有类名激活
function Active(domArr, nowDom) {
  domArr.forEach(element => {
    element.classList.remove("active");
  });
    nowDom.classList.add("active");
  
}

// 日期处理
function handleDate(date){
  let date1 = new Date(date);
  let date2 = new Date();
  let year1 = date1.getFullYear();
  let year2 = date2.getFullYear();
  let month1 = date1.getMonth();
  let month2 = date2.getMonth();
  let day1 = date1.getDate();
  let day2 = date2.getDate();
  let Hour1 = date1.getHours();
  let Hour2 = date2.getHours();
  let Minute1 = date1.getMinutes();
  let Minute2 = date2.getMinutes();
   if((year2 - year1) != 0){
     return  year2 - year1 + '年'
   }else if((month2 - month1) != 0){
    return  month2 - month1 + '月'
   }else if((day2 - day1) != 0){
    return  day2 - day1 + '天'
   }else if((Hour2 - Hour1) != 0){
    return  Hour2 - Hour1 + '小时'
   }else if((Minute2 - Minute1) != 0){
    return  Minute2 - Minute1 + '分钟'
   }
}

//网址数据处理函数
function handleUrl(dataStr){
    const data = dataStr.split('=');
   return data[1];
}
function handleUrlData(dataStr){
  const data = dataStr.split('&');
  
 return data.map((item)=>{
  const data = item.split('=');
  return data[1]
})
}

// 数据长度限制
function dataLimited(dataArr,num){
  const newDataArr = [...dataArr]
   if(newDataArr.length > num){
    newDataArr.length =num;
    return newDataArr
   }else{
     return newDataArr
   }
   
}
// 数据数组分组
function dataDistribute(data){
  let arr = [...data];
  const arrLen = arr.length;
  let result = [];
  for(let i = 0;i < Math.ceil(arrLen/40);i++){
     if(arr.length >= 40){
      result.push(arr.splice(0,40))
     }else{
      result.push(arr.splice(0))
     }
  }
  console.log(result);
  return result
}