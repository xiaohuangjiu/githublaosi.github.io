/**
 * Created by 678 on 2017/6/18.
 */
$(function () {
    //头部"去qq游戏"广告效果 移入显示 移开隐藏
    $(".hd_inner_ad,.hd_inner_ad_big").mouseenter(function () {
        $(".hd_inner_ad_big").show();
    }).mouseleave(function () {
        $(".hd_inner_ad_big").hide();
    });
    //头部右侧下拉菜单效果
    $(".hd_inner_r_r,#header .hd_game").mouseover(function () {
        $(this).css("color","#ff4e00");
        $(this).children("i").css("backgroundPosition","-170px -134px");
        //下拉菜单显示效果
        $("#header .hd_game").css("display","block");
        $(".hd_game_body p").css("color","#999");
    }).mouseout(function () {
        $(this).css("color","");
        $(this).children("i").css("backgroundPosition","-150px -134px");
        //下拉菜单隐藏效果
        $(".hd_game").css("display","none");
    });
});

$(function () {


    //下拉游戏菜单手风琴效果(封装函数)
    //ele是鼠标移入的li标签
    function gameDrop(ele) {
        $(ele).mouseenter(function () {
            $(ele).removeClass("h_li_current");
            $(ele).children("a").removeClass("game_name_current");
            $(ele).children("div").removeClass("hd_g_box_current");
            $(this).addClass("h_li_current");
            $(this).children("a").addClass("game_name_current");
            $(this).children("div").addClass("hd_g_box_current");
        });
    }
    gameDrop(".hd_g_left>.hd_game_body>ul>li");
    gameDrop(".hd_g_center>.hd_game_body>ul>li");
    gameDrop(".hd_g_right>.hd_game_body>ul>li");

    //下拉游戏菜单中 进入官网 鼠标悬停效果
    $(".icon_home").parent().mouseenter(function () {
        $(this).children("span").css("color","#ff4e00");
        $(this).children("span").css("text-decoration","underline");
        $(this).children("i").css("background-position","0 -17px");
    }).mouseleave(function () {
        $(this).children("span").css("color","#aaa");
        $(this).children("i").css("background-position","");
    });
    //下拉游戏菜单中 下载游戏 鼠标悬停效果
    $(".icon_download").parent().mouseenter(function () {
        $(this).children("span").css("color","#ff4e00");
        $(this).children("span").css("text-decoration","underline");
        $(this).children("i").css("background-position","-14px -17px");
    }).mouseleave(function () {
        $(this).children("span").css("color","#aaa");
        $(this).children("span").css("text-decoration","none");
        $(this).children("i").css("background-position","");
    });
    //下拉游戏菜单中 手游部分 鼠标悬停效果
    $(".icon_phome").parent().mouseenter(function () {
        $(this).children("i").css("backgroundPosition","-28px -17px");
    }).mouseleave(function () {
        $(this).children("i").css("backgroundPosition","-28px 0");

    });
    $(".icon_apple").parent().mouseenter(function () {
        $(this).children("i").css("backgroundPosition","-44px -17px");
    }).mouseleave(function () {
        $(this).children("i").css("backgroundPosition","-44px 0");

    });
    $(".icon_andriod").parent().mouseenter(function () {
        $(this).children("i").css("backgroundPosition","-60px -17px");
    }).mouseleave(function () {
        $(this).children("i").css("backgroundPosition","-60px 0");

    });
});