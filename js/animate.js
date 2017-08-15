//显示元素；
function show(ele){
    ele.style.display = "block";
}
//隐藏元素；
function hide(ele){
    ele.style.display = "none";
}


//页面被卷去的部分方法封装
function scroll(){
    return {
        top: window.pageYOffset || document.documentElement.scrollTop,
        left: window.pageXOffset || document.documentElement.scrollLeft
    }
}


//缓动框架
function animate(ele,json,fn){
    //清除定时器
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        //开闭原则：
        var bool = true;
        for(var k in json){
            //操作属性在for循环中，特殊属性特殊处理；
            //进行if判断；判断k的值；

            if(k === "z-index"){//层级的：直接一步到位设置为目标值，不干涉到清除定时器；
                ele.style.zIndex = json[k];

            }else if(k === "opacity"){//透明度：1.小数(放大在缩小)；    2.兼容
                //获取步长
                //获取值的时候放大10/100方便运算，赋值的时候在缩小10/100;

                //如果取值为0，按0算，如果取值为空字符串，按1算；
                if(getStyle(ele,k) === "0"){
                    var leader = 0;
                }else{
                    var leader = parseInt(getStyle(ele,k)*10) || 10;
                }
                var step = (parseInt(json[k]*10) - leader)/10;
                //二次处理
                step = step>0?Math.ceil(step):Math.floor(step);
                //赋值
                leader = leader + step;
                //透明度赋值：1.缩小10/100;   2.不带单位；   3.兼容ie678;
                ele.style.opacity = leader/10;
                //兼容ie678;
                ele.style.filter = "alpha(opacity="+leader*10+")";

                //没有到达指定位置，不允许清除定时器
                if(json[k] !== leader/10){
                    bool = false;
                }
            }else{//正常属性；

                //获取步长
                var leader = parseInt(getStyle(ele,k)) || 0;
                var step = (json[k] - leader)/10;
                //二次处理
                step = step>0?Math.ceil(step):Math.floor(step);
                //赋值
                leader = leader + step;
                ele.style[k] = leader + "px";
                //没有到达指定位置，不允许清除定时器
                if(json[k] !== leader){
                    bool = false;
                }
            }
        }
        //清除定时器
        console.log(1);
        if(bool){
            clearInterval(ele.timer);
            if(fn){
                fn();
            }
        }
    },30);
}

//获取的属性值为字符串
function getStyle(ele,attr){
    //第一种
    if(window.getComputedStyle){
        return window.getComputedStyle(ele,null)[attr];
    }else{
        return ele.currentStyle[attr];
    }
}
