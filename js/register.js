/**
 * Created by ASUS on 2017/6/22.
 */
window.onload = function () {
    var inpArr = document.getElementsByTagName("input");

    //账号
    inpArr[0].onblur = function () {
        var playId =/^[1-9][1-9]{4,11}$/;
        if(playId.test(this.value)){
            this.nextSibling.innerHTML = "没毛病老铁，是对的！";
            this.nextSibling.className = "right";
        } else{
            this.nextSibling.innerHTML = "小学生，你妈喊你回家吃饭！";
            this.nextSibling.className = "wrong";
        }
    }
    //密码

    inpArr[1].onblur = function () {
        var miMa = /^[\$a-zA-Z0-9_-]{6,18}$/;
        if(miMa.test(this.value)){
            this.nextSibling.innerHTML = "没毛病老铁，是对的！";
            this.nextSibling.className = "right";
            if(/^[A-Za-z0-9]+[_$]+[A-Za-z0-9]*$/.test(this.value)){
                this.nextSibling.innerHTML = "不用怕，这样的密码看视频不愁。";
            }else if(/^([a-z].*[0-9])|([A-Z].*[0-9])|([0-9].*[a-zA-Z])$/.test(this.value)){
                this.nextSibling.innerHTML = "还不错，能不能再想个好点的。";
            }else if(/^([a-z].*[A-Z])|([A-Z].*[a-z])$/.test(this.value)){
                this.nextSibling.innerHTML = "低智商密码，容易中毒！！！";
            }else{
                this.nextSibling.innerHTML = "这样会被盗的！！！";
            }

        }else{
            this.nextSibling.innerHTML = "what fuck 你输得什么什么鬼";
            this.nextSibling.className = "wrong";
        }
    }
    //昵称
    inpArr[2].onblur = function () {
        var name = /^[\u4e00-\u9fa5]{4,6}$/;
        if(name.test(this.value)){
            this.nextSibling.innerHTML = "这个昵称好棒棒！！";
            this.nextSibling.className = "right";
        } else {
            this.nextSibling.innerHTML = "没有这么脑残的名字！！！";
            this.nextSibling.className = "wrong";
        }
    }
    //手机号
    fn(inpArr[3],/^((13[0-9])|(15[^4\D])|(18[0-9]))\d{8}$/);
    //邮箱
    inpArr[4].onblur = function () {
        var emial = /^[\w\-\.]+\@[\w]+\.[\w]{2,4}$/;
        if(emial.test(this.value)){
            this.nextSibling.innerHTML = "你会收到你要的东西的！！！";
            this.nextSibling.className = "right";
        } else {
            this.nextSibling.innerHTML = "笨蛋，这是你家地址吗！！！";
            this.nextSibling.className = "wrong";
        }
    }


    //




    function fn(ele,str){
        ele.onblur = function () {

            var reg = str;
            if(reg.test(this.value)){
                this.nextSibling.innerHTML = "你输入的什么鸟语言";
                this.nextSibling.className = "right";
            }else{

                this.nextSibling.innerHTML = "你输入的什么鸟语言";
                this.nextSibling.className = "wrong";
            }
        }
    }
    var content = document.getElementById("content");
    var json = {"width":800,"height":500,"left":700,"top":150,"opacity":0.7}
    animate(content,json,xuanZhuan(),100);
    run();
}



//window.onload = function () {
//
//}

function xuanZhuan(){
    var content = document.getElementById("content");
    var deg1 = 0 ;
    var time = null;
    clearInterval(time);
    time = setInterval(function () {
        deg1+=10;
        content.style.transform = "rotate("+deg1+"deg)";
        if(deg1===720){
            clearInterval(time);
        }
    },15);
}

//页面图片加载效果
function run(){
    var bar = document.getElementById("bar");
    bar.style.width=parseInt(bar.style.width) + 1 + "%";
    if(bar.style.width == "100%"){
        window.clearTimeout(timeout);
        return;
    }
    var timeout=window.setTimeout("run(bar)",80);
}


function animate(ele,json,fn){
    //清空计时器
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        //开闭原则
        var flag =true;
        for(var k in json){
            //判断k的值
            if( k === "z-index"){
                //是层级就直接赋值
                ele.style.zIndex = json[k];
            } else if( k === "opacity"){
                //若果是透明度，要考虐兼容性
                //透明度取值0-1，所以要放大再缩小
                //取值为0，就是0，取值为空字符串就当作1算
                if(getStyle(ele,k) === "0"){
                    var leader = 0 ;
                } else{
                    var leader = parseInt(getStyle(ele,k)*10) || 10;
                }
                var step = (parseInt(json[k]*10) - leader) /10 ;
                //二次处理
                var step = step>0? Math.ceil(step) : Math.floor(step);
                //赋值
                leader+= step;
                ele.style.opacity = leader/10;
                ele.style.filter = "alpha(opacity="+leader*10+")";
                if(json[k] !== leader/10){
                    //若所有属性没有到达目标位置始终不清除计时器
                    flag = false;
                }
            } else {
                //赋值
                var leader = parseInt(getStyle(ele,k)) || 0;
                var step = (json[k] - leader) / 10;
                //二次处理
                var step = step>0? Math.ceil(step) : Math.floor(step);
                //赋值
                leader+= step;
                ele.style[k] = leader + "px";
                if(json[k] !== leader){
                    //若所有属性没有到达目标位置始终不清除计时器
                    flag = false;
                }
            }
        }
        if(flag){
            clearInterval(ele.timer);
            if(fn){
                fn();
            }
        }
    },50)
}

function getStyle(ele,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele,null)[attr];
    } else {
        return ele.currentStyle[attr];
    }
}

