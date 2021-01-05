const formData = document.getElementsByTagName("form");
function formEvent() {
  const nav = document.getElementsByClassName("main-xinshounav");
  const content = document.getElementsByClassName("main-xinshoucontent");
  const forGot = document.getElementsByClassName("span-special")[0];
  const inputFocus = document.getElementsByTagName("input");
  const signIn = document.getElementsByClassName("sign-in")[0];
  //input框的聚焦失焦事件。
  [].forEach.call(inputFocus, (item) => {
    item.onfocus = function () {
      this.className = "active";
    };
    item.onblur = function () {
      this.classList.remove("active");
    };
  });

  // 忘记密码事件
  forGot.onclick = function () {
    showHidden(nav, "nav");
    showHidden(content, "content");
  };
  // 登陆验证事件
  signIn.onclick = async function (e) {
    e.preventDefault();
    let userMessage = {};
    userMessage.userName = formData[0].signIn.value;
    userMessage.passWord = formData[0].inpassword.value;
    const resp = await fetch("/src/signIn.json");
    const result = await resp.json();
    console.log(result);
    let flag = false; //加锁，不然遍历的时候后边的数据不知道前边已经登陆成功或者密码错误了。
    result.forEach((item, index) => {
      if (item.userName == userMessage.userName) {
        if (item.passWord == userMessage.passWord) {
          flag = true;
          storeMessage(); //用户信息存储cookie
          alert("登陆成功");
        } else {
          flag = true;
          alert("密码错误");
        }
      } else {
        if (index == result.length - 1 && !flag) {
          alert("用户不存在");
        }
      }
    });
  };
}

//处理显隐类名切换
function showHidden(domArray, classFirst) {
  [].forEach.call(domArray, (item) => {
    if (item.classList.contains(classFirst + "-active")) {
      item.classList.remove(classFirst + "-active");
      item.classList.add(classFirst + "-hidden");
    } else {
      item.classList.remove(classFirst + "-hidden");
      item.classList.add(classFirst + "-active");
    }
  });
}
// 先访问cookie，如果cookie有值就数据回填，没有值就手动输入，验明证成功后就存储在cookie中
// cookie存储的用户信息回填
function backMessage() {
    let userName = manageCookie.get("Username");
    formData[0].signIn.value = userName ? userName : "";
    let passWord = manageCookie.get("Password");
    formData[0].inpassword.value = passWord ? passWord : "";
  }
  // 存储用户信息在cookie里
function storeMessage() {
    // 先清理
    manageCookie.remove("Username");
    manageCookie.remove("Password");
    // 再存储
    manageCookie.set("Username", formData[0].signIn.value, 300000);
    manageCookie.set("Password", formData[0].inpassword.value, 30000);
  }

const manageCookie = {
  set: function (name, value, date) {
    //expires，要求用户传入的是一个时间节点默认是天数
    // var endDate = new Date();
    // endDate.setDate( endDate.getDate()+date);
    // document.cookie = name + '=' + value+'; expires='+endDate;
    //max-age,要求用户传入的是一个时间段默认是秒数
    document.cookie = name + "=" + value + "; max-age=" + date;
  },
  remove: function (name) {
    this.set(name, "", 0);
  },
  get: function (name) {
    let cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      let item = cookies[i].split("=");
      if (item[0] == name) {
        return item[1];
      }
    }
  },
};

formEvent();
backMessage();
