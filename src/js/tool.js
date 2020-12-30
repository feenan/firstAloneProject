// async function getData (){
   
//     var resp = await fetch('https://cnodejs.org/api/v1/topics?page=2');
//     var result = await resp.json();
//     console.log(1)
//     return result
// }
// getData().then(resp=>{
  
//     console.log(resp.data);
// })
var nowPage = 1;
var btnWrap = document.getElementsByClassName('turnPage-btn')[0];
// function turnPage(){}
function renderBtn(){
   var preBtn = document.createElement('a');
   preBtn.className = 'first-btn';
   btnWrap.appendChild(preBtn);
   preBtn.innerHTML = "<<";
   var iBtn = document.createElement('a');
    iBtn.innerHTML = "...";
   if(nowPage -2 > 2){
    btnWrap.appendChild(iBtn);
   }
// 添加中间页
for (var i = nowPage - 2;i <= nowPage + 2;i++) {
    if (i >= 1) {
        var numBtn = document.createElement('a');
        numBtn.innerHTML = i;
        btnWrap.appendChild(numBtn);
    }
}

   btnWrap.appendChild(iBtn);
   var nextBtn = document.createElement('a');
   nextBtn.innerHTML = ">>";
   nextBtn.className = 'last-btn';
   btnWrap.appendChild(nextBtn);

console.log(1);
 }
renderBtn();