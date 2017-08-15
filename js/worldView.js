/**
 * Created by lusheng on 2017/6/18.
 */

window.onload = function () {



    var titTabs = document.getElementById("titTabs");
    var titLs = titTabs.getElementsByClassName("tit-ls");
    var nav = document.getElementById("nav");
    var wm = document.getElementById("wm");
    var cont = document.getElementById("cont");




    wm.onmouseenter = function(){
        animate(wm,{"backgroundPositionY":-105});
    }

    wm.onmouseleave = function(){
        animate(wm,{"backgroundPositionY":-319});
    }

    //wm.onmouseover = function () {
    //
    //    wm.style.background = "url(../lodge/guide/allicon.png) 185px 428px";
    //}
    //wm.onmouseout = function () {
    //    wm.style.background = "url(../lodge/guide/allicon.png) 185px 214px";
    //}


    titLs[0].style.backgroundPositionY = 0;
    titLs[0].firstElementChild.style.color = "#2fc3a3";

    for(var i = 0 ; i < titLs.length; i++){
        titLs[i].index =i;
        titLs[i].onclick = function () {
             for(var j = 0 ; j < titLs.length; j++){
                 titLs[j].style.background = "";
                 titLs[j].firstElementChild.style.color = "";
             }
            this.style.backgroundPositionY = 0;
            this.firstElementChild.style.color = "#2fc3a3";
            target = -this.index*554;
            animate(cont,{left:target});
        }


    }
    //for(var i=0;i<titLs.length;i++){
    //    titLs[i].index = i;
    //
    //    titLs[i].onclick = function(){
    //        for(var j=0;j<titLs.length;j++){
    //            titLs[j].style.background = "";
    //            //titLs[j].firstElementChild.style.color = "#fff";
    //        }
    //        this.style.backgroundPositionY = 0;
    //        this.firstElementChild.style.color = "#2fc3a3";
    //
    //        target = -this.index*554;
    //        animate(cont,{left:target});
    //
    //    }
    //}







    function animate(ele,json,fn){
        clearInterval(ele.timer);
        ele.timer = setInterval(function () {
            var bool = true;
            for(var k in json){

                if(k === "z-index"){
                    ele.style.zIndex = json[k];

                }else if(k === "opacity"){
                    if(getStyle(ele,k) === "0"){
                        var leader = 0;
                    }else{
                        var leader = parseInt(getStyle(ele,k)*10) || 10;
                    }
                    var step = (parseInt(json[k]*10) - leader)/10;
                    step = step>0?Math.ceil(step):Math.floor(step);
                    leader = leader + step;
                    ele.style.opacity = leader/10;
                    ele.style.filter = "alpha(opacity="+leader*10+")";

                    if(json[k] !== leader/10){
                        bool = false;
                    }
                }else{
                    var leader = parseInt(getStyle(ele,k)) || 0;
                    var step = (json[k] - leader)/10;
                    step = step>0?Math.ceil(step):Math.floor(step);
                    leader = leader + step;
                    ele.style[k] = leader + "px";
                    if(json[k] !== leader){
                        bool = false;
                    }
                }
            }
            console.log(1);
            if(bool){
                clearInterval(ele.timer);
                if(fn){
                    fn();
                }
            }
        },30);
    }

    function getStyle(ele,attr){
        if(window.getComputedStyle){
            return window.getComputedStyle(ele,null)[attr];
        }else{
            return ele.currentStyle[attr];
        }

    }


}