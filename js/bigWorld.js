/**
 * Created by Administrator on 2017/6/21.
 */
window.onload = function(){

    var wg = document.getElementsByClassName("wg")[0];
    wg.onmouseenter = function(){
        animate(wg,{"backgroundPositionY":-105});
    }

    wg.onmouseleave = function(){
        animate(wg,{"backgroundPositionY":-319});
    }

}


$(function(){

    //$(".wg").mouseenter(function(){
    ////  $(".line").css("display","block");
    //    $(".line").stop().slideDown();
    //  });
    //
    //
    //$(".wg").mouseleave(function(){
    //    $(".line").stop().slideUp();
    //});
    //
    //var wg = document.getElementsByClassName("wg")[0];
    //var line = document.getElementsByClassName("line")[0];
    //wg.onmousemove = function(event){
    //    line.style.display = "block";
    //    event = event || window.event;
    //    if(event.stopPropagation){
    //        event.stopPropagation();
    //    }else{
    //        event.cancelBubble = true;
    //    }
    //}


    var timer = null;

    $(".circle").mouseenter(function(){
        clearInterval(timer);
    });

    $(".circle").mouseleave(function(){
        timer = setInterval(setInt,1500);
    });

    $(".places>li").mouseenter(function(){
        var index = $(this).index();
        setNum(index);
        num = $(this).index();
    });


    setNum(0);

    var num=0;
    timer = setInterval(setInt,1500);

    function setInt(){
        num++;
        if(num<12){
            setNum(num);
        }else{
            num=0;
            setNum(0);
        }
    }

    function setNum(num){
        if(num===0){
            $(".places>li").eq(0).children("a").fadeIn();
            $(".places>li").eq(0).siblings("li").children("a").fadeOut();
            $(".places>li").eq(0).find("b").addClass("nm");
            $(".placesMap >li").eq(0).show().siblings("li").hide();
        }else{
            $(".places>li").eq(num).children("a").fadeIn();
            $(".places>li").eq(num).siblings("li").children("a").fadeOut();
            $(".places>li").eq(num).find("b").addClass("nm");
            $(".placesMap >li").eq(num).show().siblings("li").hide();
        }
    }

});