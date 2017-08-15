//封装浏览器可视区域的宽高
/**
 * 功能：。。。。
 * @returns {*}
 */
function client(){
    //1.区分是普通浏览还是ie678； ie678中的window.innerWidth属性值为undefined；
    if(window.innerWidth !== undefined){
        //普通浏览器；
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }else if(document.compatMode==="CSS1Compat"){//2.区分有没有dtd
        //CSS1Compat:有DTD约束
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        };
    }else{
        //没有DTD约束
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        };
    }
}


//获取页面元素；
function $(str){
    //如果str是一个函数，那么就把他绑定到window.onload上；
    if(typeof str === "function"){
        window.onload = str;
    }else{
        //获取第一个字符
        var char = str.charAt(0);
        //判断：第一个字符是什么就调用什么方法
        if(char === "#"){
            return document.getElementById(str.slice(1));//去掉第一个字符
        }else if(char === "."){
            return document.getElementsByClassName(str.slice(1));//去掉第一个字符
        }else{
            return document.getElementsByTagName(str);//直接书写标签名，不需要去掉第一个字符了
        }
    }
}