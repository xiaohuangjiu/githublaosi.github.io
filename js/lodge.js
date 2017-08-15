window.onload = function () {

    //最新资讯
    var newInfor = document.getElementsByClassName("new-infor")[0];
    var allInfor = document.getElementsByClassName("all-infor")[0];
    var newLis = document.getElementsByClassName("new-news-lis")[0];
    var allLis = document.getElementsByClassName("all-news-lis")[0];
    var flag = true;
    allInfor.onmouseenter = function () {
        if (flag == true) {
            this.innerHTML = "最新资讯";
            newInfor.innerHTML = "综合资讯";
            newLis.style.display = "none";
            allLis.style.display = "block";
            flag = false;
        } else {
            this.innerHTML = "综合资讯";
            newInfor.innerHTML = "最新资讯";
            newLis.style.display = "block";
            allLis.style.display = "none";
            flag = true;
        }
    }


    //show
    $(function () {
        $(".show li").mouseenter(function () {
            var time = 300;
            var json = {"opcity": 0.7}
            $(this).animate(json, time);
        })
    })

    //手风琴
    var playContent = document.getElementsByClassName("play-content")[0];
    var playBboxs = document.getElementsByClassName("play-box");
    var playBs = document.getElementsByClassName("bs")[0];
    for (var i = 0; i < playBboxs.length; i++) {
        //var playBboxs[i].index = i;
        playBboxs[0].style.width = 428;
        playBboxs[i].onmouseenter = function () {

            for (var j = 0; j < playBboxs.length; j++) {
                animate(playBboxs[j], {"width": 86});
            }

            animate(this, {"width": 428});
        }
        playContent.onmouseleave = function () {
            playBboxs[0].style.width = 428;
            for (var j = 0; j < playBboxs.length; j++) {
                animate(playBboxs[j], {"width": 86});
            }
        }
    }


    function animate(ele, json, fn) {

        clearInterval(ele.timer);
        ele.timer = setInterval(function () {

            var bool = true;
            for (var k in json) {
                var leader = parseInt(getStyle(ele, k)) || 0;
                var step = (json[k] - leader) / 10;

                step = step > 0 ? Math.ceil(step) : Math.floor(step);

                leader = leader + step;
                ele.style[k] = leader + "px";

                if (json[k] !== leader) {
                    bool = false;
                }
            }

            if (bool) {
                clearInterval(ele.timer);
                if (fn) {
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


    //左边栏第二栏
    $("#nav2>li").mouseenter(function () {

        $(this).find("a").css("background-color", "rgba(0,217,163,0.5)").find("em").stop().animate({
            "left": 20,
            "top": 52,
            "font-weigh": 700
        });
        $(this).siblings("li").find("a").css("background", "").find("em").stop().animate({
            "left": 20,
            "top": 75,
            "font-weigh": 500
        });
    })
    $("#nav2").mouseleave(function () {
        $(this).find("a").css("background", "").find("em").stop().animate({"left": 20, "top": 75, "font-weigh": 500});
    })


    //职业介绍
    //获取元素


    $("#ico>li").mouseenter(function () {
        $("#pro>li").eq($(this).index()).css({"display": "block"}).siblings("li").css({"display": "none"});
        $(this).find("a").animate({"background-position-x": "-62"}, 0).parent("li").siblings("li").find("a").animate({"background-position-x": "0"}, 0)
    })
}

