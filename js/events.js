
window.onload = function(){
//    var box = document.getElementById("content");
//    var box1 = document.getElementById("c-tab")
//    var li = box1.getElementsByTagName("li"); // 0 1 2 3
//    var box2 = document.getElementById("c-t-content")
//    var lis = box2.getElementsByTagName("div"); // 0 1 2 3
//
////2.给每一个span标签一个鼠标移入事件
//    for(var i = 0 ; i < li.length; i++){
//        //给每一个span标签设置一个index值，把下标存到自己身上。
//        li[i].setAttribute("xiaBiao",i);
//        //给每一个span标签一个鼠标移入事件
//        li[i].onmouseover = function () {
//            //排他，把所有的span标签的类清空。
//            for(var j = 0 ; j < li.length; j++){
//                li[j].removeAttribute("class");
//                lis[j].removeAttribute("class");
//            }
//
//            //把自己设置为紫色（自己的类设置成current）
//            this.setAttribute("class","current");
//
//            //排他，把所有的li标签的类给清空。
////     for(var k = 0 ; k < lis.length; k++){
////      	lis[k].removeAttribute("class");
////      }
//
//            //显示对应的li标签 （把对应的li标签的类设置成current）
////      console.log(this.getAttribute("xiaBiao"));
//            lis[this.getAttribute("xiaBiao")].setAttribute("class","current");
//        }
//    }

    var json = [
        {   //  1
            width:300,
            top:20,
            left:270,
            opacity:0.4,
            "z-index":2
        },
        {  // 2
            width:400,
            top:50,
            left:45,
            opacity:0.8,
            "z-index":3
        },
        {  // 3
            width:500,
            top:120,
            left:0,
            opacity:0.9,
            "z-index":4
        },
        {   // 4
            width:800,
            top:150,
            left:200,
            opacity:1,
            "z-index":5
        },
        {  // 5
            width:500,
            top:120,
            left:700,
            opacity:0.9,
            "z-index":4
        },
        {  // 6
            width:400,
            top:50,
            left:750,
            opacity:0.8,
            "z-index":3
        },
        {   //7
            width:300,
            top:20,
            left:630,
            opacity:0.4,
            "z-index":2
        }
    ];

    var slide = document.getElementById("slide");
    var liArr = slide.getElementsByTagName("li");
    var arrow = document.getElementById("arrow");
    var prev = arrow.children[0];
    var next = arrow.children[1];

    var flag1 = true;
    var flag2 = false;

    autoPlay();

    slide.onmouseenter = function () {
        animate(arrow,{"opacity":1});
    }
    slide.onmouseleave = function () {
        animate(arrow,{"opacity":0});
    }

    next.onclick = function () {
        if(flag1){
            flag1 = false;
            autoPlay(true);
        }
    }
    prev.onclick = function () {
        if(flag2===false){
            flag2 = true;
            autoPlay(false);
        }
    }

    function autoPlay(bool){
        if(bool !== undefined){
            if(bool){
                json.push(json.shift());
            }else{
                json.unshift(json.pop());
            }
        }

        for(var i=0;i<liArr.length;i++){
            animate(liArr[i],json[i], function () {
                flag1 = true;
                flag2 = false;
            });
        }
    }

}
