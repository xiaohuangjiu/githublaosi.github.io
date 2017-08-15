/**
 * Created by ASUS on 2017/6/20.
 */
$(function () {
    var json7 = {"height":50,"top":0,"left":0,"opacity":1};
    $(".slogn>.logo").animate(json7,1000,speed, function () {
    });
    var json1 = {"height":191,"width":184,"top":479,"left":40,"opacity":1};
    var json2 = {"height":191,"width":184,"top":479,"left":237,"opacity":1};
    var json3 = {"height":191,"width":184,"top":479,"left":560,"opacity":1};
    var json4 = {"height":191,"width":184,"top":479,"left":744,"opacity":1};
    var json5 = {"top":479,"left":480,"opacity":1};
    var json6 = {"top":0,"left":0,"opacity":1};
    var json7 = {"top":90,"left":820,"height":224,"opacity":1};
    var speed = "swing" ;
    $(".mnav>.fsmh").animate(json1,900,speed, function () {
        $(".mnav>.sdmh").animate(json2,800,speed, function () {
            $(".mnav>.thmh").animate(json3,700,speed, function () {
                $(".mnav>.fumh").animate(json4,600,speed, function () {
                    $(".mnav>.fvde").animate(json5,500,speed, function () {
                        $(".slogn>h1").animate(json6,400,speed, function () {
                            $(".thnav").animate(json7,300,speed);
                        });
                    });
                });
            });
        });
    });
});

//窗口抖动效果
window.onload=function(){
    var win=document.getElementById("header");
    var a=['top','left'];
    var b=0;
    var u;
    var timer=null;
    timer=setTimeout(function () {
        function fudu(){
            win.style[a[b%2]]=(b++)%4<2?"0px":"4px";
            if(b>15){
                clearInterval(u);
                b=0;
                win.style.top = 0;
                win.style.left = 0;
            }
        }
        function zd(){
            clearInterval(u);
            u=setInterval(fudu,50)
        }
        zd();
    },4000);

}
