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
if(!glb.brow.isMobile){glb.d.body.style.paddingTop='42px';glb.delayLoad("//game.gtimg.cn/features/js/title.js",function(){ostb_int();});};
if(glb.brow.isMobile){
	glb.delayLoad("//game.gtimg.cn/features/js/WXJssdk.js",function(){
		var swx={
			tit:'《天涯明月刀》官方资料站，让我们一起来浪迹天涯！',
			pic:'https://game.gtimg.cn/features/wuxia/picture/wuxia-wx-sharepic.jpg'
		};
		WXJssdk.init(function(wx){
			wx.onMenuShareTimeline({
			    title:swx.tit||glb.d.title,
			    link:glb.d.location.href,
			    imgUrl:swx.pic||'',
			    success:function(){ 
			    	pgvSendClick({hottag:'guide.share.timeline.success'});
			    },
			    cancel:function(res){
		            pgvSendClick({hottag:'guide.share.timeline.cancel'});
		        },
		        fail:function(res){
		            pgvSendClick({hottag:'guide.share.timeline.fail'});
		        }
			});
			wx.onMenuShareAppMessage({
			    title:swx.tit||glb.d.title,
			    desc:glb.d.title,
			    link:glb.d.location.href,
			    imgUrl:swx.pic||'',
			    success:function(){ 
			        pgvSendClick({hottag:'guide.share.appmessage.success'});
			    },
			    cancel:function(){ 
			        pgvSendClick({hottag:'guide.share.appmessage.cancel'});
			    },
			    fail:function(res){
		            pgvSendClick({hottag:'guide.share.appmessage.fail'});
		        }
			});
			wx.onMenuShareQQ({
			    title:swx.tit||glb.d.title,
			    desc:glb.d.title,
			    link:glb.d.location.href,
			    imgUrl:swx.pic||'',
			    success:function(){ 
			    	pgvSendClick({hottag:'guide.share.shareQQ.success'});
			    },
			    cancel:function(){ 
			    	pgvSendClick({hottag:'guide.share.shareQQ.cancel'});
			    },
			    fail:function(res){
		            pgvSendClick({hottag:'guide.share.shareQQ.fail'});
		        }
			});
			wx.onMenuShareWeibo({
			    title:swx.tit||glb.d.title,
			    desc:glb.d.title,
			    link:glb.d.location.href,
			    imgUrl:swx.pic||'',
			    success:function(){ 
			    	pgvSendClick({hottag:'guide.share.weibo.success'});
			    },
			    cancel:function(){ 
			    	pgvSendClick({hottag:'guide.share.weibo.cancel'});
			    },
			    fail:function(res){
		            pgvSendClick({hottag:'guide.share.weibo.fail'});
		        }
			});
		});
	});
};
glb.addEvent(window,'load',function(){
	glb.delayLoad("//tajs.qq.com/stats?sId=30480237",function(){
		glb.delayLoad("//pingjs.qq.com/ping_tcss_ied.js",function(){
			if(typeof(pgvMain)=='function'){pgvMain();if(!glb.brow.isMobile){pgvSendClick({hottag:'guide.os.pc'});}else{pgvSendClick({hottag:'guide.os.mobile'});};};
		});
	});
});
var MoreEquipmentVideo=function(o){
	this.init=1;
	this.setCotType=function(){return (glb.brow.isMobile)?'touchstart':'click';};
	this.equipmentType=function(){return (!(glb.newElem('video').canPlayType))&&!glb.brow.isMobile;};
	this.ustype=this.setCotType();
	this.curEquipment=this.equipmentType();
	this.isWhich=function(){return (glb.brow.isMobile)?1:0;};
	this.tag=null;
	this.str={left:'<a class="clk_to_play" id="clk_to_play" href="javascript:;" title="点击观看视频">',right:'</a>'};
	this.index=0;
	this.auto=false;
	this.device=(glb.brow.isMobile)?'11001':'1';
	this.fmt=(glb.brow.isMobile)?'auto':'fhd';
	this.rnd=new Date().valueOf();
	if(o){
		this.tag=(o.tag)?glb.getId(o.tag):this.tag;
		this.index=o.index||this.index;
		this.vidQuery=o.vidQuery||null;
		this.vid=(o.vid)?o.vid:(this.vidQuery)?this.vidQuery[this.index]:null;
		this.cover=o.cover||null;
		this.auto=o.auto||this.auto;
		this.initPageVideo();
	};
};
MoreEquipmentVideo.prototype.reAppVideo=function(o){
	var self=this;
	self.init=0;
	self.tag=(o.tag)?glb.getId(o.tag):self.tag;
	self.index=(o.hasOwnProperty('index'))?o.index:self.index;
	self.auto=o.auto||self.auto;
	self.vid=o.vid||self.vidQuery[self.index];
	if(!self.auto){self.cover=o.cover||self.cover[self.index];};
	self.initPageVideo();
};
MoreEquipmentVideo.prototype.outVideo=function(obj){
	var self=obj,data=window['QZOutputJson'],
		_ipurl=data.vl.vi[0].ul.ui[0].url,
		_name=data.vl.vi[0].fn,
		_vkey=data.vl.vi[0].fvkey,
		_br=data.vl.vi[0].br,
		_platform=2,
		_fmt='auto',
		_level=0,
		_sdtfrom='v3010',
		_ar=[],_url=null,_s=null,_isauto=null;
	if('1'==self.device){
		_ar=data.vl.vi[0].fn.split('.');
		if(data.vl.vi[0].cl.ci&&data.vl.vi[0].cl.ci[0].idx){_ar.splice(_ar.length-1,0,data.vl.vi[0].cl.ci[0].idx);};
		_name=_ar.join('.');
	};
	_url=_ipurl+_name+'?vkey='+_vkey+'&br='+_br+'&platform='+_platform+'&fmt='+_fmt+'&level='+_level+'&sdtfrom='+_sdtfrom;
	_isauto=(self.auto)?' autoplay="autoplay"':' style="width:1px;height:1px;"';
	self.str.v='<video id="curVideoPlay" src="'+_url+'"'+_isauto+' controls="controls"></video>';
	if(self.tag){
		if(self.auto){
			self.tag.innerHTML=self.str.v;
		}else{
			self.tag.innerHTML=self.str.v+self.str.left+self.str.img+self.str.right;
			self.clkPlayVideo();
		};
	};
	self.video=glb.getId('curVideoPlay');
};
MoreEquipmentVideo.prototype.outFlashPlay=function(){
	var self=this;
	self.tag.innerHTML='<object width="100%" height="100%" codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab#version=10,0,0,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="video_w0015pec1lz"><param value="'+self.url+'" name="movie"><param value="opaque" name="wmode"><param value="always" name="allowscriptaccess"><param value="high" name="quality"><param value="true" name="allowfullscreen"><param value="all" name="allownetworking"><embed width="100%" height="100%" align="middle" wmode="opaque" src="'+self.url+'" quality="high" name="_playerswf" id="_playerswf" allowscriptaccess="always" allowfullscreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></object>';
};
MoreEquipmentVideo.prototype.clkPlayVideo=function(){
	var self=this,playVideo=function(e){
		var e=e||window.event,target=e.target||e.srcElement;
		if('IMG'==target.nodeName&&'clk_to_play'==target.parentNode.className){
			if((!(glb.newElem('video').canPlayType))&&!glb.brow.isMobile){
				self.outFlashPlay();
			}else{
				self.video.style.cssText='width:100%;height:100%;';
				self.video.play();
			};
			self.tag.removeChild(target.parentNode);
			glb.delEvent(self.tag,self.ustype,playVideo,false);
		};
	};
	glb.addEvent(self.tag,self.ustype,playVideo,false);
};
MoreEquipmentVideo.prototype.initPageVideo=function(){
	var self=this;
	self.str.img=(self.cover)?'<img src="'+(self.cover[self.index])+'" />':'';
	if(self.curEquipment){
		self.url='http://imgcache.qq.com/tencentvideo_v1/player/TPout.swf?autoplay=1&amp;outhost=http://wuxia.qq.com/&amp;skin=http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf&amp;vid='+self.vid;
		if(self.auto){self.outFlashPlay();return;};
		if(self.tag){
			self.tag.innerHTML=self.str.left+self.str.img+self.str.right;
			self.clkPlayVideo();
		};
	}else{
		if(self.vid){
			self.url='//vv.video.qq.com/getinfo?vids='+self.vid+'&platform='+self.device+'&charge=0&otype=json&defaultfmt='+self.fmt+'&sb=0&nocache=0&_rnd='+self.rnd;
			glb.delayLoad(self.url,function(){self.outVideo(self);});
		};
	};
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
	this.createElem();
	if(!glb.brow.isLowBrow){this.initNavFunction();};
	if(glb.brow.isMobile){this.ebody.className+=' mobileEM';}else{this.navFloat();};
};
Main.prototype.createElem=function(){
	var self=this,c=glb.d.createDocumentFragment();
	self.mask=glb.newElem('div');
	self.mask.className='masklayer';
	self.layerdt=glb.newElem('div');
	self.layerdt.className='layerdt';
	self.layerdt.innerHTML='<div class="lydt" id="lydt"></div><a class="exitbig" href="javascript:closeVideo();">&times;</a>';
	c.appendChild(this.layerdt);
	c.appendChild(this.mask);
	self.ebody.appendChild(c);
	self.lydt=glb.getId('lydt');
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
Main.prototype.initNavFunction=function(){
	var self=this,mainNav=glb.getId('slider'),navi=glb.getId('navi'),des=null,
	navSliderEvent=function(e){
		var e=e||window.event;
		e.preventDefault();
		var nowClass=mainNav.className;
		if(/\bfadeInLeft\b/i.test(nowClass)){mainNav.className=nowClass.replace(/fadeInLeft/,'fadeOutLeft');setNavHidn();return;};
		if(/\bfadeOutLeft\b/i.test(nowClass)){mainNav.className=nowClass.replace(/fadeOutLeft/,'fadeInLeft');setNavHidn(1);return;};
		mainNav.className+=' fadeOutLeft';
		var flag=(mainNav.style.cssText=='')?0:1;
		setNavHidn(flag);
	},setNavHidn=function(is){
		des=(glb.ww()<=768)?0:95;
		self.ebody.style.height=self.ehtml.style.height=(is)?'auto':'100%';
		self.ebody.style.overflowY=self.ehtml.style.overflowY=(is)?'auto':'hidden';
		self.mask.style.display=(is)?'none':'block';
		if(is){glb.delEvent(self.mask,self.eq,navSliderEvent,false);}else{glb.addEvent(self.mask,self.eq,navSliderEvent,false);};
	},screenChange=function(){
		if(glb.ww()>768){
			setNavHidn(1);
			mainNav.className='slider';
		};
	};
	screenChange();
	glb.addEvent(navi,self.eq,navSliderEvent,false);
	glb.addEvent(window,'resize',screenChange,false);
};
Main.prototype.navFloat=function(){
if(glb.getId('snav')){
var tag=glb.getId('snav'),b=function(){tag.style.cssText=(glb.st()>=256)?'position:fixed;top:0;z-index:900;margin-top:0;':'';};b();
glb.addEvent(window,'scroll',b,false);
};
};
/*  |xGv00|b3d1f405a4c2b51e36746da02fd1f656 */