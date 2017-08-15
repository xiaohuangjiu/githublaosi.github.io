/*
author:biggixe
*/
(function(w){//2147483647
	var _glb={
		d:document,
		nowLoadData:function(o,callback){
			var tail=o.url.split('.').pop(),dom=(/js/i.test(tail))?_glb.d.createElement('script'):(/jpg|gif|jpeg|png|bmp/i.test(tail))?_glb.d.createElement('img'):null;
			if(!dom){return;};
			if(dom.readyState){dom.onreadystatechange=function(){if(dom.readyState=="loaded"||dom.readyState=="complete"){dom.onreadystatechange=null;if(callback){callback();};};};}else{dom.onload=function(){if(callback){callback();};};};
			dom.src=o.url+'?timer'+Math.random();if(o.tag){o.tag.appendChild(dom);};
		},
		formatTime:function(t){return new Date(t.replace(/-/g,'/')).getTime();}
	},parseData=function(){
		var data=w.newsIndexData;
		if(data.length==0){return;
		}else{
			data=data[0];
			var flag=null,dtShowBegTime=_glb.formatTime(data.dtShowBegTime),dtShowEndTime=_glb.formatTime(data.dtShowEndTime),nowTime=new Date().getTime(),sInfoImageAddr=decodeURIComponent(data.sInfoImageAddr),insertData=function(){
				var box=_glb.d.createElement('div');
				box.className=box.id='new_event_info';
				box.innerHTML='<div class="new_event_info_con"><img src="'+decodeURIComponent(sInfoImageAddr)+'"><a href="'+decodeURIComponent(data.sDetailUrl)+'" class="new_event_info_btn" target="_blank" onclick="pgvSendClick({hottag:&apos;index.layer.btn.ev'+data.iInfoId+'&apos;});">查看详情</a></div><a class="new_event_info_close" id="new_event_info_close" href="javascript:;"></a>';
				_glb.d.body.appendChild(box);
				showNewEventInfo(box.id);
			},showNewEventInfo=function(id){
				var endsTime=dtShowEndTime-nowTime,closeNewEventInfo=function(){
					clearTimeout(flag);
					showDialog.hide();
				};
				showDialog.show({id:id});
				_glb.d.getElementById('new_event_info_close').onclick=closeNewEventInfo;
				if(endsTime<=864001000){flag=setTimeout(closeNewEventInfo,endsTime);}else{return;};
			};
			if(nowTime<dtShowBegTime||nowTime>dtShowEndTime){return;
			}else{
				_glb.nowLoadData({url:'//game.gtimg.cn/features/js/comm/showDialog.min.js',tag:_glb.d.body},function(){_glb.nowLoadData({url:sInfoImageAddr},insertData);});
			};
		};
	};
	_glb.nowLoadData({url:'//wuxia.qq.com/webplat/info/news_version3/5012/5013/20176/m3482/index.js',tag:_glb.d.body},parseData);
})(window);/*  |xGv00|71feb41fdeb9bb47d4581f38fbfc5150 */