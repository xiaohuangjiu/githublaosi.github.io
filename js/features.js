/**
 * Created by xiaoh on 2017/6/19.
 */
window.onload = function () {

    //ft-scene开始
    //地方图片
    //左上角楼层跳跃在第二页开始变成固定定位
    var selectUl = document.getElementsByClassName("ft-sc-header")[0].children[0];
    var selectLi = selectUl.children;



    selectUl.style.position = "fixed";
    selectUl.style.top = 30 + "px";
    selectUl.style.left = 14 + "px";

    //给各个当前页面(div)背景显示
    var ftBody = document.getElementsByClassName("ftBody")[0];
    var boxArr = ftBody.children;
    for (var i = 0; i < boxArr.length; i++) {
        boxArr[i].style.width = 100 + "%";
        boxArr[i].style.height = 100 + "%";
        //boxArr[i].style.background = "url(../images/features/bg-" + (i + 1) + ".jpg) no-repeat 50% 50%";
        if(i===6){
            boxArr[i].style.background = "#000 url(../images/features/bg-" + (i + 1) + ".jpg) no-repeat 50% -212px";
        }else{
            boxArr[i].style.background = "url(../images/features/bg-" + (i + 1) + ".jpg) no-repeat 50% 50%";
        }
    }


    //ft-header开始
    //第一页面分类li标签楼层跳跃
    var headerLiArr = document.getElementsByClassName("ft-hd-select")[0].children;
    var target = 0;
    var leader = 0;
    var timer = null;

    for (var j = 0; j < headerLiArr.length; j++) {
        //给li标签索引值
        headerLiArr[j].index = j;
        //li标签点击跳转
        headerLiArr[j].onclick = function () {
            //左上角固定选择li标签变色
            for (var k = 0; k < selectLi.length; k++) {
                selectLi[k].style.backgroundColor = "";
            }
            selectLi[this.index].style.backgroundColor = "skyblue";
            target = boxArr[this.index + 1].offsetTop;
            //设置定时器
            clearInterval(timer);
            timer = setInterval(function () {
                //获取步长
                var step = (target - leader) / 10;
                //二次处理
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader += step;
                //赋值
                window.scrollTo(0, leader);

                //清除定时器
                if (target === leader) {
                    clearInterval(timer);
                }
            }, 20);
        }

    }


    //左上角固定选择li标签点击事件
    for (var m = 0; m < selectLi.length; m++) {
        //给li标签索引值
        selectLi[m].index = m;
        //li标签点击跳转
        selectLi[m].onclick = function () {
            selectLi[this.index].style.backgroundColor = "skyblue";
            target = boxArr[this.index + 1].offsetTop;
            //设置定时器
            clearInterval(timer);
            timer = setInterval(function () {
                //获取步长
                var step = (target - leader) / 10;
                //二次处理
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader += step;
                //赋值
                window.scrollTo(0, leader);

                //清除定时器
                if (target === leader) {
                    clearInterval(timer);
                }
            }, 20);
        }
        //鼠标移入事件
        selectLi[m].onmouseover = function () {
            this.style.color = "skyblue";
            this.style.border = "1px solid skyblue" ;
        };
        selectLi[m].onmouseout = function () {
            this.style.color = "";
            this.style.border = "1px solid " ;
        }
    }


    var screenHeight = document.getElementsByClassName("ft-combat")[0].offsetHeight;
    //console.log(screenHeight);

    var num = 0;
    //清除滚到最后面返回上面的bug
    window.onscroll = function () {
        leader = window.scroll().top;

        //左上角楼层跳跃li标签在第二页开始变成固定定位
        if (leader >= screenHeight) {
            selectUl.style.display = "block";
        } else {
            selectUl.style.display = "none";
        }
        //固页面固定的li选择标签变色
        num = Math.floor(leader / screenHeight);
        for (var p = 0; p < selectLi.length; p++) {
            selectLi[p].style.backgroundColor = "";
        }
        if (num === 0) {
            return;
        } else {
            selectLi[num - 1].style.backgroundColor = "#2FC3A3";
        }

        //console.log(leader);
    };

    //ft-header结束

    //ft-scene开始


    //捏脸效果显示
    //var face = document.getElementsByClassName("ft-person-left-face")[0];
    //var faceLiArr = face.children;
    ////遍历图片

    // <!-- ft-scene结束-->
}

//封装页面卷起方法
function scroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop,
        left: window.pageXOffset || document.documentElement.scrollLeft
    }
}


//调用jQuery
$(function () {
    //ft-header开始

    //分类li标签变色
    var hColorJson1 = {"border":"1px solid skyblue","color":"skyblue"}
    var hColorJson2 = {"border":"1px solid","color":""}
    for (var i = 0; i < $(".ft-hd-select>li").length; i++) {
        //鼠标移进移出分类li标签中的样式
        $(".ft-hd-select>li").eq(i).mouseenter(function () {
            $(this).css(hColorJson1).siblings("li").css(hColorJson2);
        });
        $(".ft-hd-select>li").eq(i).mouseleave(function () {
            $(this).css(hColorJson2);
        });
    }

    // ft-scene开始
    //地方图片点击切换
    var index = 1;
    var timer2 = null;
    //自动换地图
    clearInterval(timer2);
    timer2 = setInterval(function () {
        if (index >= 12) {
            index = 1;
        } else if (index <= 0) {
            index = 11;
        }
        $(".ft-sc-body-place>img").attr("src", "../images/features/place-" + index + ".png");
        index++;

        //鼠标进入地图box，清除定时器，移开后开始定时器
        $(".ft-sc-body").on("mouseenter", function () {

            $(".ft-sc-body-place-select").stop().animate({"opacity": 1}, 500, "swing")
            clearInterval(timer2);
        });

        $(".ft-sc-body").on("mouseleave", function () {
            //小箭头关闭
            $(".ft-sc-body-place-select").stop().animate({"opacity": 0}, 500, "swing");
            //设置定时器
            clearInterval(timer2);
            timer2 = setInterval(function () {
                if (index >= 12) {
                    index = 1;
                } else if (index <= 0) {
                    index = 11;
                };
                $(".ft-sc-body-place>img").attr("src", "../images/features/place-" + index + ".png");
                index++;
            },1000);
        });

        //鼠标点击换图
        $(".ft-sc-body-place-select-right").on("click", function () {
            index = index+1
            index++;
            if (index >= 12) {
                index = 1;
            };
            $(".ft-sc-body-place>img").stop().attr("src", "../images/features/place-" + index + ".png");
        });

        $(".ft-sc-body-place-select-left").on("click", function () {
            index = index-1
            index--;
            if (index <= 0) {
                index = 11;
            };
            $(".ft-sc-body-place>img").stop().attr("src", "../images/features/place-" + index + ".png");
        });

    }, 1000);

    //点击播放天气视频
    $(".ft-sc-body-start").click( function () {
        $(".video1").children("video").attr("autoplay","autoplay");
        $(".video1").css("display","block");
        $(".video1")[0].children[0].play();
    });
    //点击关闭视频
    $(".video1-close").click( function () {
        $(".video1").children("video").removeAttr("autoplay");
        $(".video1").css("display","none");
        $(".video1")[0].children[0].pause();
    });
    //------------------------------------------------------------------------------------------------------------------------
    //ft-scene结束

    // ft-person开始
    //点击播放千人千面视频
    $(".ft-person-right-start>div").click(function () {
        $(".video-QRQM").children("video").attr("autoplay","autoplay");
        $(".video-QRQM").css("display","block");
        $(".video-QRQM")[0].children[0].play();
        console.log(1);
    });
    //点击关闭视频
    $(".video-QRQM-close").click(function () {
        $(".video-QRQM").children("video").removeAttr("autoplay");
        $(".video-QRQM").css("display","none");
        $(".video-QRQM")[0].children[0].pause();
    });

// ft-person结束

    //地方图片轮播
    //var pJson = {"left":-550}
    //$(".ft-sc-body-place").animate(pJson,1000);


    //捏脸效果显示
    var faceArr = $(".ft-person-left-face>li");
    var fJson = {"width": 120, "height": 120, "top": -28, "left": -28};
    var fJson2 = {"width": 64, "height": 64, "top": 0, "left": 0, "zIndex": 0};
    for (var n = 0; n < faceArr.length; n++) {
        $(faceArr).eq(n).mouseenter(function () {
            $(this).children("img").stop().css("zIndex", "1");
            $(this).children("img").stop().animate(fJson, 300, "swing");
        });
        $(faceArr).eq(n).mouseleave(function () {
            $(this).children("img").animate(fJson2, 10, "swing")
        });
    }

    //ft-story开始
//点击播放左边故事视频
    $(".ft-story-left-start>div").click(function () {
        $(".video2").children("video").attr("autoplay","autoplay");
        $(".video2").css("display","block");
        $(".video2")[0].children[0].play();
        console.log(1);
    });
    //点击关闭视频
    $(".video2-close").click(function () {
        $(".video2").children("video").removeAttr("autoplay");
        $(".video2").css("display","none");
        $(".video2")[0].children[0].pause();
    });

//点击播放右边故事视频
    $(".ft-story-right-start>div").click(function () {
        $(".video3").children("video").attr("autoplay","autoplay");
        $(".video3").css("display","block");
        $(".video3")[0].children[0].play();
        console.log(1);
    });
//点击关闭视频
    $(".video3-close").click(function () {
        $(".video3").children("video").removeAttr("autoplay");
        $(".video3").css("display","none");
        $(".video3")[0].children[0].pause();
    });
//ft-story结束

});

// ft-header结束

//----------------------------------------------------------------------------------

// ft-scene开始
//地方图片


//ft-scene结束



//战斗模块


$(function () {
    $("#FBlist .FB>p").eq(0).show().parent("li").siblings("li").children("p").hide();
    //fighting
    $("#FBlist .FB a").on("click",function(){
        //console.log(1);
        $(this).siblings("p").show().parent("li").siblings("li").children("p").hide();
    });
    $("#FBlist>li").on("click", function () {
        $(this).children("a").children("em").children("span").fadeIn().parent("em").parent("a").parent("li").siblings("li").children("a").children("em").children("span").hide();
    })
})



//八荒论剑
$(function () {
    $(".united #utdbut .tab").eq(0).mouseenter(function () {
        $(this).css("background-color","#2fc3a3").siblings(".tab").css("background-color","");
        $(this).children(".tit").css("background-position","-464px -650px");
        $(".united #utd img").attr("src","../images/features/tangmen.png");
    });

    //tianx
    $(".united #utdbut .tab").eq(1).mouseenter(function () {
        $(this).css("background-color","#2fc3a3").siblings(".tab").css("background-color","");
        $(this).children(".tit").css("background-position","-548px -738px");
        $(".united #utd img").attr("src","../images/features/tianxiang.png");
    });
    //gaib
    $(".united #utdbut .tab").eq(2).mouseenter(function () {
        $(this).css("background-color","#2fc3a3").siblings(".tab").css("background-color","");
        $(this).children(".tit").css("background-position","-628px -648px");
        $(".united #utd img").attr("src","../images/features/gaibang.png");
    });
    //shenw
    $(".united #utdbut .tab").eq(3).mouseenter(function () {
        $(this).css("background-color","#2fc3a3").siblings(".tab").css("background-color","");
        $(this).children(".tit").css("background-position","-709px -737px");
        $(".united #utd img").attr("src","../images/features/shenwei.png");
    });
    //zhenw
    $(".united #utdbut .tab").eq(4).mouseenter(function () {
        $(this).css("background-color","#2fc3a3").siblings(".tab").css("background-color","");
        $(this).children(".tit").css("background-position","-634px -825px");
        $(".united #utd img").attr("src","../images/features/zhenwu.png");
    });
    //taib
    $(".united #utdbut .tab").eq(5).mouseenter(function () {
        $(this).css("background-color","#2fc3a3").siblings(".tab").css("background-color","");
        $(this).children(".tit").css("background-position","-793px -821px");
        $(".united #utd img").attr("src","../images/features/taibai.png");
    });
    //wud
    $(".united #utdbut .tab").eq(6).mouseenter(function () {
        $(this).css("background-color","#2fc3a3").siblings(".tab").css("background-color","");
        $(this).children(".tit").css("background-position","-464px -817px");
        $(".united #utd img").attr("src","../images/features/wudu.png");
    });
})
$(function () {
    $(".united #utdbut .tab").eq(0).mouseleave(function () {
        $(this).css("background-color","");
        $(this).children(".tit").css("background-position","0px -650px");
    });
    $(".united #utdbut .tab").eq(1).mouseleave(function () {
        $(this).css("background-color","");
        $(this).children(".tit").css("background-position","-84px -738px");
    });
    $(".united #utdbut .tab").eq(2).mouseleave(function () {
        $(this).css("background-color","");
        $(this).children(".tit").css("background-position","-164px -648px");
    });
    $(".united #utdbut .tab").eq(3).mouseleave(function () {
        $(this).css("background-color","");
        $(this).children(".tit").css("background-position","-245px -737px");
    });
    $(".united #utdbut .tab").eq(4).mouseleave(function () {
        $(this).css("background-color","");
        $(this).children(".tit").css("background-position","-170px -825px");
    });
    $(".united #utdbut .tab").eq(5).mouseleave(function () {
        $(this).css("background-color","");
        $(this).children(".tit").css("background-position","-329px -821px");
    });
    $(".united #utdbut .tab").eq(6).mouseleave(function () {
        $(this).css("background-color","");
        $(this).children(".tit").css("background-position"," 0 -817px");
    });


})

//盟会
$(function () {
    $(".group .bosses li").children("img").hide();
    $(".group .bosses li").mouseenter(function () {
        $(this).children(".bn").slideDown(500).parent("li").siblings("li").children(".bn").fadeOut();
        $(this).children("img").fadeIn().parent("li").siblings("li").children("img").fadeOut();;
    })
    $(".group .bosses li").mouseleave(function () {
        $(this).children(".bn").fadeOut();
    })
})

//身份
$(function () {
    $(".profession #idebut .tab").eq(0).mouseenter(function () {
        $(this).css("background-color","#2fc3a3").siblings(".tab").css("background-color","");
        $(this).children(".tit").css("background-position","10px -103px");
        $("#job .rwpic>img").attr("src","../images/features/shashou.png");

    });
    //wenshi
    $(".profession #idebut .tab").eq(1).mouseenter(function () {
        $(this).css("background-color","#2fc3a3").siblings(".tab").css("background-color","");
        $(this).children(".tit").css("background-position","-56px -171px");
        $("#job .rwpic>img").attr("src","../images/features/wenshi.png");
        $("#job .jinfo>h3").text("文士");
        $("#job .jinfo>p>em").text("书中自有千钟粟，书中自有黄金屋，书中自有颜如玉，书中自有江湖路。以书中风云笑傲世间风云；以书中筹谋淡泊世间筹谋。");

    });
    //铺快
    $(".profession #idebut .tab").eq(2).mouseenter(function () {
        $(this).css("background-color","#2fc3a3").siblings(".tab").css("background-color","");
        $(this).children(".tit").css("background-position","-126px -241px");
        $("#job .rwpic>img").attr("src","../images/features/bukuai.png");
        $("#job .jinfo>h3").text("捕快");
        $("#job .jinfo>p>em").text("冷血无情，舍快意恩仇之剑，持庙堂法理之剑；鞠躬尽瘁，扫天下奸邪之氛，定盛世太平之氛！");
    });
    //leling
    $(".profession #idebut .tab").eq(3).mouseenter(function () {
        $(this).css("background-color","#2fc3a3").siblings(".tab").css("background-color","");
        $(this).children(".tit").css("background-position","-191px -305px");
        $("#job .rwpic>img").attr("src","../images/features/yueling.png");
        $("#job .jinfo>h3").text("乐伶");
        $("#job .jinfo>p>em").text("世人皆重颜色，我以色笑为刀剑；世人皆爱歌舞，我以歌舞为甲胄。琵琶瑶琴和锦瑟，世间知音又几何？ ");
    });
    //youxia
    $(".profession #idebut .tab").eq(4).mouseenter(function () {
        $(this).css("background-color","#2fc3a3").siblings(".tab").css("background-color","");
        $(this).children(".tit").css("background-position","10px -241px");
        $("#job .rwpic>img").attr("src","../images/features/youxia.png");
        $("#job .jinfo>h3").text("游侠");
        $("#job .jinfo>p>em").text("镜锁璇玑，蝶从天水，宝出怜花，令遵钱王。前尘旧事，不过一铲挖根掘底；独享快活，看我搜罗天下珍奇！");
    });
    //biaoshi
    $(".profession #idebut .tab").eq(5).mouseenter(function () {
        $(this).css("background-color","#2fc3a3").siblings(".tab").css("background-color","");
        $(this).children(".tit").css("background-position","-56px -305px");
        $("#job .rwpic>img").attr("src","../images/features/biaoshi.png");
        $("#job .jinfo>h3").text("镖师");
        $("#job .jinfo>p>em").text("论武功，为保红货不惜死；论人脉，镖行天下有捷径。奇货可居，南北自通衢；为得镖银，西天亦可去！ ");
    });
    //liehu
    $(".profession #idebut .tab").eq(6).mouseenter(function () {
        $(this).css("background-color","#2fc3a3").siblings(".tab").css("background-color","");
        $(this).children(".tit").css("background-position","-126px -371px");
        $("#job .rwpic>img").attr("src","../images/features/liehu.png");
        $("#job .jinfo>h3").text("猎户");
        $("#job .jinfo>p>em").text("驯服犬马，自可以驯服猛虎；缚鹰之手，亦无惧力缚苍龙。深山密林，是我之常胜沙场；百鸟万兽，乃我之帐下先锋。 ");
    });


})

$(function () {
    $(".profession #idebut .tab").eq(0).mouseleave(function () {
        $(this).css("background-color","#2fc3a3").siblings(".tab").css("background-color","");
        $(this).children(".tit").css("background-position","-455px -100px");
    });
    $(".profession #idebut .tab").eq(1).mouseleave(function () {
        $(this).css("background-color","#2fc3a3").siblings(".tab").css("background-color","");
        $(this).children(".tit").css("background-position","-521px -171px");
    });
    $(".profession #idebut .tab").eq(2).mouseleave(function () {
        $(this).css("background-color","#2fc3a3").siblings(".tab").css("background-color","");
        $(this).children(".tit").css("background-position","-591px -241px");
    });
    $(".profession #idebut .tab").eq(3).mouseleave(function () {
        $(this).css("background-color","#2fc3a3").siblings(".tab").css("background-color","");
        $(this).children(".tit").css("background-position","-656px -305px");
    });
    $(".profession #idebut .tab").eq(4).mouseleave(function () {
        $(this).css("background-color","#2fc3a3").siblings(".tab").css("background-color","");
        $(this).children(".tit").css("background-position","-455px -241px");
    });
    $(".profession #idebut .tab").eq(5).mouseleave(function () {
        $(this).css("background-color","#2fc3a3").siblings(".tab").css("background-color","");
        $(this).children(".tit").css("background-position","-521px -305px");
    });
    $(".profession #idebut .tab").eq(6).mouseleave(function () {
        $(this).css("background-color","#2fc3a3").siblings(".tab").css("background-color","");
        $(this).children(".tit").css("background-position","-591px -371px");
    });


})





















































































































