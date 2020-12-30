var message;
var shouyewrapper = document.querySelectorAll('#shouye')[0];

async function getData (url){
    var urlend = url ? url : '';
    var resp = await fetch('https://cnodejs.org/api/v1/topics'+urlend);
    var result = await resp.json();
    console.log(1)
    return result
}
function render(data,wrapper){
    console.log(wrapper);
    var htmlStr = '';
    for(var i = 0;i< data.length;i++){
       
       htmlStr += createEle(data[i]);
    }
    wrapper.innerHTML = htmlStr;
}
function createEle(data){
  var replyCount = data.reply_count;
  var visitCount = data.visit_count;
  /*关于置顶贴和精华贴以及别的贴判断比较深，首先是文字的显示有5种，之后样式的判断也是基于此*/
  var tab = data.top == true ? '置顶':(data.good == true ? '精华' : (data.tab ? (data.tab === 'ask' ? '问答': (data.tab === 'share' ? '分享' : '')):'' ));
  var title = data.title;
  var lastTime = data.last_reply_at;
return  ` <div class="main-content content-hover">
  <div class="main-left">
    <a href="http://127.0.0.1:5500/public/user.html"
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
        <span class=${tab ? ((tab === '置顶' || tab === '精华')?'impo' : 'ordin') : ''}>${tab}</span
        ><a
          href="http://127.0.0.1:5500/public/tiezi.html"
          title="${title}"
          >${title}</a
        >
      </div>
    </div>
  </div>
  <div class="main-right">
    <a href="http://127.0.0.1:5500/public/tiezi.html">
      <img
        src="../src/image/main-content-img_01.jpg"
        alt=""
        class="user-imgSmall"
      /><span class="time">1小时前</span>
    </a>
  </div>
</div>`;

} 

getData().then((resp)=>{
    message = resp.data;
    console.log(message);
    render(message,shouyewrapper);
});
  
function Active(domArr,nowDom){
    //处理所有类名激活
    var len = domArr.length;
    for(let i = 0;i<len;i++){
        domArr[i].classList.remove('active');
        nowDom.classList.add('active');
    }
} 
function bindEvent(){
    // 首页
    //导航
    var shouyenav = document.querySelectorAll('#shouye-nav span');
    var shouyenavLen = shouyenav.length;
    for(let i = 0;i<shouyenavLen;i++){
      shouyenav[i].onclick = function(e){
        if(this.classList.contains('active')){
            return
        }else{
            Active(shouyenav,this);
            console.log( this.dataset.id);
        getData ('?tab='+ this.dataset.id).then((resp)=>{
            message = resp.data;
            console.log(message);
            render(message,shouyewrapper);
        });
        
        }
      }
    }

}
bindEvent();

