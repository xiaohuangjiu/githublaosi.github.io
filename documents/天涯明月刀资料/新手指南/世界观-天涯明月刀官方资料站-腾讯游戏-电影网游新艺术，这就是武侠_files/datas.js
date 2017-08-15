var glb={
	d:document,nau:navigator.userAgent,
	getId:function(id){return this.d.getElementById(id)},
	newElem:function(o){return this.d.createElement(o);},
	getElems:function(el,o){return el.getElementsByTagName(o);},
	getClass:function(cn,el,nd){
		var testClass=new RegExp("\\b"+cn+"\\b"),ar=[],el=el||this.d,nd=nd||'*',tag=this.getElems(el,nd),len=tag.length;
		for(var i=0;i<len;i++){var cel=tag[i];if(testClass.test(cel.className)){ar.push(cel);};};
		return ar;
	},
	st:function(){return (this.d.body.scrollTop)?this.d.body.scrollTop:this.d.documentElement.scrollTop;},
	ww:function(){return (this.d.documentElement&&this.d.documentElement.clientWidth)?this.d.documentElement.clientWidth:this.d.body.offsetWidth;},
	wh:function(){return (this.d.documentElement&&this.d.documentElement.clientHeight)?this.d.documentElement.clientHeight:this.d.body.offsetHeight;},
	offset:function(o){var y=o.offsetTop;if(o.style.position=='absolute')return y;while(o=o.offsetParent){y+=o.offsetTop;}return y;},
	addEvent:function(a,b,c,d){if(a.addEventListener){a.addEventListener(b,c,d)}else if(a.attachEvent){a.attachEvent('on'+b,c)}},
	delEvent:function (a,b,c,d){if(a.removeEventListener){a.removeEventListener(b,c,d)}else if(a.detachEvent){a.detachEvent('on'+b,c)}},
	delayLoad:function(url,callback){var script=this.newElem('script');if(script.readyState){script.onreadystatechange=function(){if(script.readyState=="loaded"||script.readyState=="complete"){script.onreadystatechange=null;if(callback){callback();};};};}else{script.onload=function(){if(callback){callback();};};script.onerror=function(e){return e;};};script.src=url;this.d.body.appendChild(script);}
};
glb.brow={
	isLowBrow:!-[1,],
	isIE9:/MSIE 9/i.test(glb.nau),
	isIE6:/MSIE 6/i.test(glb.nau),
	isLowIE:/MSIE 6|MSIE 7/i.test(glb.nau),
	isAndr:/Android/i.test(glb.nau),
	isApple:/iPhone|iTouch|iPad/i.test(glb.nau),
	isBlackBerry:/BlackBerry/i.test(glb.nau),
	isWindowsPhone:/IEMobile/i.test(glb.nau),
	isCellPhone:/Android|iPhone|iTouch|BlackBerry|IEMobile/i.test(glb.nau),
	isMobile:/Android|iPhone|iTouch|iPad|BlackBerry|IEMobile|Mobile/i.test(glb.nau)
};
glb.delayLoadPic=function(area){
	var a={
		pics:null,len:null,picarray:[]
	};
	a.pics=glb.getElems(area,'img');
	a.len=a.pics.length;
	for(var i=0;i<a.len;i++){a.picarray[i]=a.pics[i];};
	a.looPic=function(){
		var reheight=glb.wh(),residue=a.picarray.length,top=null,op=null,ut=null;
		if(residue!=0){
			top=glb.d.documentElement.scrollTop||glb.d.body.scrollTop;
			for(var j=residue;j--;){
				op=a.picarray[j];
				if(op.getAttribute("data-src")){
					ut=glb.offset(op)-top;
					if(ut<reheight){
						op.src=op.getAttribute("data-src");
						op.removeAttribute('data-src');
						a.picarray.splice(j,1);
					};
				};
			};
		}else{
			glb.delEvent(window,"scroll",a.looPic,false);
			glb.delEvent(window,"resize",a.looPic,false);
		};
	};
	a.looPic();
	glb.addEvent(window,"scroll",a.looPic,false);
	glb.addEvent(window,"resize",a.looPic,false);
};
if(!glb.brow.isMobile){
	glb.d.body.style.paddingTop='42px';glb.delayLoad("//game.gtimg.cn/features/js/title.js");
}else{
	glb.delayLoad("//game.gtimg.cn/features/js/WXJssdk.js",function(){
		var swx={tit:'《天涯明月刀》官方资料站，让我们一起来浪迹天涯！',pic:'//game.gtimg.cn/features/wuxia/picture/wuxia-wx-sharepic.jpg'};
		WXJssdk.init(function(wx){
			wx.onMenuShareTimeline({
			    title:swx.tit||glb.d.title,link:glb.d.location.href,imgUrl:swx.pic||'',
			    success:function(){pgvSendClick({hottag:'gamedata.share.timeline.success'});},
			    cancel:function(res){pgvSendClick({hottag:'gamedata.share.timeline.cancel'});},
		        fail:function(res){pgvSendClick({hottag:'gamedata.share.timeline.fail'});}
			});
			wx.onMenuShareAppMessage({
			    title:swx.tit||glb.d.title,desc:glb.d.title,link:glb.d.location.href,imgUrl:swx.pic||'',
			    success:function(){pgvSendClick({hottag:'gamedata.share.appmessage.success'});},
			    cancel:function(){pgvSendClick({hottag:'gamedata.share.appmessage.cancel'});},
			    fail:function(res){pgvSendClick({hottag:'gamedata.share.appmessage.fail'});}
			});
			wx.onMenuShareQQ({
			    title:swx.tit||glb.d.title,desc:glb.d.title,link:glb.d.location.href,imgUrl:swx.pic||'',
			    success:function(){pgvSendClick({hottag:'gamedata.share.shareQQ.success'});},
			    cancel:function(){pgvSendClick({hottag:'gamedata.share.shareQQ.cancel'});},
			    fail:function(res){pgvSendClick({hottag:'gamedata.share.shareQQ.fail'});}
			});
			wx.onMenuShareWeibo({
			    title:swx.tit||glb.d.title,desc:glb.d.title,link:glb.d.location.href,imgUrl:swx.pic||'',
			    success:function(){pgvSendClick({hottag:'gamedata.share.weibo.success'});},
			    cancel:function(){pgvSendClick({hottag:'gamedata.share.weibo.cancel'});},
			    fail:function(res){pgvSendClick({hottag:'gamedata.share.weibo.fail'});}
			});
		});
	});
};
var Main=function(o){
	this._o=o;
	this.setCotType=function(){return (glb.brow.isMobile)?'touchstart':'click';};
	this.ebody=glb.d.body;
	this.ehtml=glb.getElems(glb.d,'html')[0];
	this.wrap=glb.getClass('wrapper')[0];
	this.eq=this.setCotType();
	this.gb=0;
	this.pic_url='//game.gtimg.cn/features/wuxia/act/a20150312gamedata/';
	this.loadPic=function(url,callback){
		var img=glb.newElem('img'),self=this;
		if(img.readyState){
			img.onreadystatechange=function(){
				if(img.readyState=="loaded"||img.readyState=="complete"){
					img.onreadystatechange=null;
					if(callback&&!self.cancelimg){callback(img);};
				};
			};
		}else{
			img.onload=function(){
				if(callback&&!self.cancelimg){callback(img);};
			};
			img.onerror=function(e){return e;};
		};
		img.src=url;
	};
	if(glb.brow.isMobile){this.ebody.className+=' mobileEM';};
};
Main.prototype.rotateEvent=function(_u){
	var self=this,a={
		box:glb.getId('rotate_content'),rotate:glb.getId('rotate'),indrt:glb.getId('indrt'),prev:glb.getId('prev'),next:glb.getId('next'),li:null,span:null,width:null,target:null,flag:null,bk:null,
		ar:[],picAR:[],indAR:[],rotID:'1264',picurl:'//game.gtimg.cn/features/wuxia/act/a20150312gamedata/',
		allrot:null,len:9,index:0,n:0,cachewidth:null
	},domChage=function(){
		if(a.curli&&a.curspan){a.curli.className=a.curspan.className='';};
		a.curli=a.li[a.n];
		a.curspan=a.span[a.n];
		a.curli.className=a.curspan.className='cur';
		a.rotate.style.left=-(a.width*a.n)+'px';
	},
	prevArrow=function(){return a.n=(a.n--<=0)?a.index-1:a.n;},
	nextArrow=function(){return a.n=(a.n++>=a.index-1)?0:a.n;},
	turnPage=function(_c){
		(_c>0)?nextArrow():prevArrow();
		domChage();
	},
	pcControl=function(e){
		clearInterval(a.flag);
		var e=e||window.event;
		a.target=e.target||e.srcElement;
		if('SPAN'==a.target.nodeName&&''==a.target.className){
			a.n=a.target.getAttribute('data-id');
			domChage();
		};
	},
	hdControl=function(){
		var b={point:null,initmX:null,initmY:null,mX:null,mY:null,initleft:null,mX:null,mY:null};
		glb.addEvent(a.rotate,'touchstart',function(e){
			clearInterval(a.flag);
			b.point=e.touches[0];
			b.mX=0;b.mY=0;
			b.initmX=b.point.clientX;
			b.initmY=b.point.clientY;
			b.initleft=a.rotate.offsetLeft;
		});
		glb.addEvent(a.rotate,'touchmove',function(e){
			clearInterval(a.flag);
			e.preventDefault();
			b.point=e.touches[0];
			b.mX=b.point.pageX;
			if(!((a.n==0&&b.mX-b.initmX>0)||(a.n==(a.index-1)&&b.mX-b.initmX<0))){
				a.rotate.style.webkitTransition=a.rotate.style.mozTransition=a.rotate.style.oTransition=a.rotate.style.msTransition=a.rotate.style.transition='none';
				a.rotate.style.left=b.initleft+(b.mX-b.initmX)+'px';
			};
		});
		glb.addEvent(a.rotate,'touchend',function(e){
			a.rotate.style.webkitTransition=a.rotate.style.mozTransition=a.rotate.style.oTransition=a.rotate.style.msTransition=a.rotate.style.transition='left .2s ease 0s';
			if(b.mX!=0&&(b.mX-b.initmX)>0){ //右滑
				a.n=(a.n>0&&b.mX-b.initmX>80)?--a.n:a.n;
			}else if(b.mX!=0&&(b.mX-b.initmX)<0){ //左滑
				a.n=(a.n<(a.index-1)&&b.mX-b.initmX<-80)?++a.n:a.n;
			};
			domChage();
		});
	},
	writeRTs=function(){
		self.isLoaded=1;
		a.cachewidth=a.width=a.box.clientWidth;
		a.allrot=window['gamedata_map'];
		a.len=a.allrot.lists.length;
		for(a.index=0;a.index<a.len;a.index++){
			var cur=a.allrot.lists[a.index];
			a.picAR.push('<li style="width:'+a.width+'px;" class="'+((0==a.index)?'cur':'')+'"><span class="mpic"><img src="'+(a.picurl+cur.big)+'" alt="'+cur.name+'"></span></li>');
			a.indAR.push('<span class="'+((0==a.index)?'cur':'')+'" data-id="'+a.index+'"><strong>'+(a.index+1)+'</strong></span>');
		};
		a.rotate.style.width=(a.width*a.index)+'px';
		a.rotate.innerHTML=a.picAR.join('');
		if(glb.brow.isMobile){a.indrt.className+=' handheld';};
		a.indrt.innerHTML=a.indAR.join('');
		a.li=glb.getElems(a.rotate,'li');
		a.span=glb.getElems(a.indrt,'span');
		domChage();
		if(!glb.brow.isMobile){
			glb.addEvent(a.indrt,'mouseover',pcControl,false);
		}else{
			hdControl();
		};
		glb.addEvent(window,'resize',function(){
			clearInterval(a.flag);
			clearTimeout(a.bk);
			a.width=a.box.clientWidth;
			a.rotate.style.webkitTransition=a.rotate.style.transition='none';
			if(a.cachewidth!=a.width){
				var w=(a.width>a.cachewidth)?a.rotate.offsetLeft-(Math.abs(a.width-a.cachewidth)*a.n):a.rotate.offsetLeft+(Math.abs(a.width-a.cachewidth)*a.n);
				a.rotate.style.left=w+'px';
				a.cachewidth=a.width;
				a.rotate.style.width=(a.width*a.index)+'px';
				for(var i=0;i<a.index;i++){a.li[i].style.width=a.width+'px';};
			};
			a.bk=setTimeout(function(){
				a.rotate.style.webkitTransition=a.rotate.style.transition='left .2s ease 0s';
			},100);
		});
		glb.addEvent(a.prev,'click',function(){turnPage(-1);},false);
		glb.addEvent(a.next,'click',function(){turnPage(1);},false);
	};
	glb.delayLoad(_u+'?v='+Math.random(),writeRTs);
};
Main.prototype.sliderLine=function(line,left){line.style.left=left+'px';};
Main.prototype.createElem=function(){
	var self=this,c=glb.d.createDocumentFragment();
	self.mask=glb.newElem('div');
	self.mask.className='masklayer';
	self.layerdt=glb.newElem('div');
	self.layerdt.className='layerdt';
	self.layerdt.innerHTML='<div class="lydt" id="lydt"></div><a class="exitbig" href="javascript:;">&times;</a>';
	c.appendChild(this.layerdt);
	c.appendChild(this.mask);
	self.ebody.appendChild(c);
	self.lydt=glb.getId('lydt');
};
Main.prototype.fdsOne=function(){
	var self=this,fds=glb.newElem('div'),s='<div class="fd-ly"><span class="fd-tips">扫描分享至朋友圈</span><img class="fd-ewm" src="//game.gtimg.cn/features/wuxia/act/a20150312gamedata/ewm.png" alt="二维码" /><a class="fd-tov" href="/gamedata/">返回首页</a></div>';
	fds.className='fds fs-one';fds.id='fds';
	fds.innerHTML=s;
	self.wrap.appendChild(fds);
};
Main.prototype.fdsTwo=function(){
	var self=this,fds=glb.newElem('div'),s='<span class="ewmarea"><img src="//game.gtimg.cn/features/wuxia/act/a20150312gamedata/ewm.png" alt="二维码"><em>扫描分享至朋友圈</em></span><span class="ots"><a class="ota" href="//wuxia.qq.com/?ADTAG=GameDatas.button.slider" target="_blank">进入官网</a><i class="jx ilat"></i><i class="jx irat"></i><i class="jx ilab"></i><i class="jx irab"></i></span><span class="ots"><a class="ota" href="/gamedata/">返回首页</a><i class="jx ilat"></i><i class="jx irat"></i><i class="jx ilab"></i><i class="jx irab"></i></span><a class="totop spr" href="javascript:window.scrollTo(0,0);">返回顶部</a>';
	fds.className='fds fs-two';fds.id='fds';
	fds.innerHTML=s;
	self.wrap.appendChild(fds);
};
Main.prototype.appBigMap=function(_u){
	var self=this;
	self.lydt.innerHTML='<img src="'+(self.pic_url+_u)+'" alt="地图" />';
	self.openShow();
};
Main.prototype.viewMoreMap=function(_u){
	var self=this;
	if(!self.isLoaded){
		_u='//game.gtimg.cn/features/wuxia/act/a20150312gamedata/'+_u+'_maps.js';
		self.rotateEvent(_u);
	};
	self.openShow('bigshow');
};
Main.prototype.openShow=function(_id){
	var self=this,tag=glb.getId(_id)||self.layerdt,exit=glb.getClass('exitbig',tag)[0],
	exitLayerdt=function(){
		self.mask.style.display=tag.style.display='none';
		glb.delEvent(exit,self.eq,exitLayerdt,false);
	};
	self.mask.style.cssText='display:block;height:100%;';
	tag.style.cssText='display:block;top:'+((glb.wh()/2)+glb.st())+'px;';
	glb.addEvent(exit,self.eq,exitLayerdt,false);
};
Main.prototype.stopDefault=function(e){
	var e=e||window.event;
	e.preventDefault();
};
Main.prototype.isOrientation=function(){
	if(window.orientation!=0){
		var flag=setTimeout(function(){
			self.lydt.style.cssText='position:fixed;left:0;top:0;right:0;bottom:0;width:100%;height:'+glb.wh()+'px;margin:0;padding:0;z-index:9997;';
		},500);
	}else{
		clearTimeout(flag);
		self.lydt.style.cssText='';
	};
};
Main.prototype.toViewPrev=function(){
	var self=this;
	return (--self.index<0)?self.pages-1:self.index;
};
Main.prototype.toViewNext=function(){
	var self=this;
	return (++self.index>=self.pages)?0:self.index;
};
Main.prototype.openLayer=function(o){
	var self=this;
	self.cancelimg=0;
	self.mask.style.display=self.nld.style.display='block';
	glb.addEvent(self.layerdt,'touchmove',self.stopDefault,false);
	glb.addEvent(self.lydt,'touchmove',self.stopDefault,false);
	glb.addEvent(self.mask,'touchmove',self.stopDefault,false);
};
Main.prototype.closeLayer=function(){
	var self=this;
	self.cancelimg=1;
	self.mask.style.display=self.nld.style.display='none';
	self.layerdt.style.cssText='';
	self.layerdt.className='layerdt';
	self.lydt.innerHTML='';
	glb.delEvent(self.layerdt,'touchmove',self.stopDefault,false);
	glb.delEvent(self.lydt,'touchmove',self.stopDefault,false);
	glb.delEvent(self.mask,'touchmove',self.stopDefault,false);
};
Main.prototype.initNavFunction=function(){
	var self=this,mainNav=glb.getId('nav'),navi=glb.getId('look'),des=null,
	navSliderEvent=function(){
		var flag=(mainNav.style.cssText=='')?0:1;
		setNavHidn(flag);
	},setNavHidn=function(is){
		des=(glb.ww()<=768)?0:95;
		mainNav.style.cssText=(is)?'':'left:-95px;';
		navi.style.cssText=(is)?'display:block;left:'+des+'px;':'display:block;left:0;';
		//if(is){glb.delEvent(window,'resize',screenChange,false);}else{glb.addEvent(window,'resize',screenChange,false);};
	},screenChange=function(){
		if(glb.ww()>1190){
			setNavHidn(1);
			navi.style.display='none';
			glb.getId('bigshow').className='bigshow layerdt';
			if(glb.brow.isLowBrow){glb.getId('fds').style.display='block';};
		}else{
			navi.style.display='block';
			glb.getId('bigshow').className='bigshow layerdt smallsreen';
			if(glb.brow.isLowBrow){glb.getId('fds').style.display='none';};
			setNavHidn();
		};
	};
	screenChange();
	glb.addEvent(navi,self.eq,navSliderEvent,false);
	glb.addEvent(window,'resize',screenChange,false);
};
glb.addEvent(window,'load',function(){
	glb.delayLoad("//tajs.qq.com/stats?sId=30480237",function(){
		glb.delayLoad("//pingjs.qq.com/ping_tcss_ied.js",function(){
			if(typeof(pgvMain)=='function'){pgvMain();if(!glb.brow.isMobile){pgvSendClick({hottag:'officialweb.os.pc'});}else{pgvSendClick({hottag:'officialweb.os.mobile'});};};
		});
	});
});/*  |xGv00|50cc1e17ebae8d70e668b3d281996b8b */