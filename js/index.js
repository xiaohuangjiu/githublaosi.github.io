//轮播图开始
window.onload = function () {

    var box = document.getElementById("all");
    var screen = document.getElementById("screen");
    //图片的宽
    var imgWidth = screen.offsetWidth;
    var ul = document.getElementById("rotate");
    var ulLiArr = ul.children;
    var ol = document.getElementById("indrt");
    ul.appendChild(ulLiArr[0].cloneNode(true));

    var olLiArr = ol.children;
    olLiArr[0].className = "current-numbox";


    for (var i = 0; i < olLiArr.length; i++) {
        olLiArr[i].index = i;
        olLiArr[i].onmouseover = function () {
            for (var j = 0; j < olLiArr.length; j++) {
                olLiArr[j].className = "";
            }
            this.className = "current-numbox";
            animate(ul, -imgWidth * this.index);
            key = square = this.index;
        }
    }

    var key = 0;
    var square = 0;


    var timer = setInterval(autoPlay, 3000);
    box.onmouseover = function () {
        clearInterval(timer);
    }
    box.onmouseout = function () {
        timer = setInterval(autoPlay, 3000);
    }


    function autoPlay() {

        key++;
        if (key === 8) {
            ul.style.left = 0;
            key = 1;
        }

        square++;
        if (square === 7) {
            square = 0;
        }

        for (var j = 0; j < olLiArr.length; j++) {
            olLiArr[j].className = "";
        }
        olLiArr[square].className = "current-numbox";
        animate(ul, -imgWidth * key);
    }

    function animate(ele, target) {
        clearInterval(ele.timer);
        ele.timer = setInterval(function () {
            var step = target > ele.offsetLeft ? 10 : -10;
            ele.style.left = ele.offsetLeft + step + "px";

            if (Math.abs(target - ele.offsetLeft) <= Math.abs(step)) {
                ele.style.left = target + "px";
                clearInterval(ele.timer);
            }
        }, 5);
    }


//轮播图结束


//新手指南部分
    $(function () {
        $(".otherlist>li").mouseenter(function () {
            $(this).addClass("active").siblings("li").removeClass("active");
        })
        $(".otherlist>li").mouseleave(function () {
            $(this).removeClass("active");
        })
    })


//全新内容部位开始
    $(function () {
        $(".rls").mouseenter(function () {
            $(this).children(".gbg").stop().slideDown(500).siblings(".gbg").slideUp();
        })
        $(".rls").mouseleave(function () {
            $(this).children(".gbg").stop().slideUp(500);
        })
    })


//全新内容结束


//    八荒门派开始
//    var units = document.getElementById("units");
    //var lastli = units.getElementsByTagName("li");
    //for (var k = 0; k < lastli.length; k++) {
    //    lastli[k].index = k;
    //    lastli[k].onmouseover = function () {
    //        for (var l = 0; l < lastli.length; l++) {
    //            animate2(lastli[l], {width: 63})
    //        }
    //        animate2(lastli[this.index], {width: 559})
    //    }
    //    lastli[k].onmouseout = function () {
    //        for (var j = 0; j < lastli.length; j++) {
    //            animate2(lastli[j], {width: 63});
    //        }
    //        animate2(lastli[this.index],{width:559})
    //    }
    //
    //
    //}
    $(function(){
        $(".units li").each(function(){
            var fold = $(this).find(".fold");
            var unfold = $(this).find(".unfold");
            if(fold.is(":hidden")){
                $(this).width(559);
                $(this).siblings().find(".unfold").hide()
            }else{
                $(this).width(63);
            }
        })
        $(".units li").mouseenter(function(){
            $(this).animate({width:559},100);
            $(this).find(".unfold").show();
            $(this).find(".fold").hide();
            $(this).siblings().animate({width:63},100);
            $(this).siblings().find(".unfold").hide();
            $(this).siblings().find(".fold").show();
        })
    })


    function animate2(ele, json, fn) {
        //每次启动定时器之前先清除定时器
        clearInterval(ele.time);
        ele.time = setInterval(function () {
            var bool = true;
            //用for in 遍历json的属性k
            for (var k in json) {

                var leader = parseInt(getStyle(ele, k)) || 0;
                //计时器每计时一次走的距离
                var step = (json[k] - leader ) / 10;
                //二次处理
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //赋值
                leader = leader + step;
                ele.style[k] = leader + "px";
                //在所有元素没有到目的的时候，不清除定时器
                if (json[k] !== leader) {
                    bool = false;
                }
            }
            if (bool) {
                clearInterval(ele.time);

                //  判断调用的函数是否是函数类型
                if (fn && typeof fn == "function") {

                    fn();
                }
            }
        }, 10);
    }


    function getStyle(ele, attr) {

        if (window.getComputedStyle) {
            return window.getComputedStyle(ele, null)[attr];
        } else {
            return ele.currentStyle[attr];
        }
    }



}





