/**
 * Created by lusheng on 2017/6/20.
 */
window.onload = function () {

    //var slogo = document.getElementById("slogo");
    //var snav = document.getElementById("snav");
    //var container = document.getElementById("container");

   window.onscroll = function () {
       var header = document.getElementsByClassName("header")[0];
       var snav = document.getElementsByClassName("snav")[0];
       if(scroll().top >= header.offsetHeight - snav.offsetHeight){
           snav.className = "fixed snav";
       }else{
           snav.className = "snav"
       }
   }






    function scroll(){
        return {
            top: window.pageYOffset || document.documentElement.scrollTop,
            left: window.pageXOffset || document.documentElement.scrollLeft
        };
    }
}