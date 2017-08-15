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
isFF:/Firefox/i.test(glb.nau),
	isIE9:/MSIE 9/i.test(glb.nau),
	isIE6:/MSIE 6/i.test(glb.nau),
	isLowIE:/MSIE 6|MSIE 7/i.test(glb.nau),
	isAndr:/Android/i.test(glb.nau),
	isApple:/iPhone|iTouch|iPad/i.test(glb.nau),
	isBlackBerry:/BlackBerry/i.test(glb.nau),
	isWindowsPhone:/IEMobile/i.test(glb.nau),
	isCellPhone:/Android|iPhone|iTouch|BlackBerry|IEMobile/i.test(glb.nau),
	isMobile:/Android|iPhone|iTouch|iPad|BlackBerry|IEMobile|Mobile/i.test(glb.nau),
isWeChat:/micromessenger/i.test(glb.nau)
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
if((!glb.getId('detail'))&&glb.brow.isMobile){
	glb.delayLoad("//game.gtimg.cn/features/js/WXJssdk.js",function(){
		var swx={
			tit:'《天涯明月刀》官方网站，这就是武侠，让我们一起来浪迹天涯！',
			pic:'//game.gtimg.cn/features/wuxia/picture/wuxia-wx-sharepic.jpg'
		};
		WXJssdk.init(function(wx){
			wx.onMenuShareTimeline({
			    title:swx.tit||glb.d.title,
			    link:glb.d.location.href,
			    imgUrl:swx.pic||'',
			    success:function(){ 
			    	pgvSendClick({hottag:'officialweb.share.timeline.success'});
			    },
			    cancel:function(res){
		            pgvSendClick({hottag:'officialweb.share.timeline.cancel'});
		        },
		        fail:function(res){
		            pgvSendClick({hottag:'officialweb.share.timeline.fail'});
		        }
			});
			wx.onMenuShareAppMessage({
			    title:swx.tit||glb.d.title,
			    desc:glb.d.title,
			    link:glb.d.location.href,
			    imgUrl:swx.pic||'',
			    success:function(){ 
			        pgvSendClick({hottag:'officialweb.share.appmessage.success'});
			    },
			    cancel:function(){ 
			        pgvSendClick({hottag:'officialweb.share.appmessage.cancel'});
			    },
			    fail:function(res){
		            pgvSendClick({hottag:'officialweb.share.appmessage.fail'});
		        }
			});
			wx.onMenuShareQQ({
			    title:swx.tit||glb.d.title,
			    desc:glb.d.title,
			    link:glb.d.location.href,
			    imgUrl:swx.pic||'',
			    success:function(){ 
			    	pgvSendClick({hottag:'officialweb.share.shareQQ.success'});
			    },
			    cancel:function(){ 
			    	pgvSendClick({hottag:'officialweb.share.shareQQ.cancel'});
			    },
			    fail:function(res){
		            pgvSendClick({hottag:'officialweb.share.shareQQ.fail'});
		        }
			});
			wx.onMenuShareWeibo({
			    title:swx.tit||glb.d.title,
			    desc:glb.d.title,
			    link:glb.d.location.href,
			    imgUrl:swx.pic||'',
			    success:function(){ 
			    	pgvSendClick({hottag:'officialweb.share.weibo.success'});
			    },
			    cancel:function(){ 
			    	pgvSendClick({hottag:'officialweb.share.weibo.cancel'});
			    },
			    fail:function(res){
		            pgvSendClick({hottag:'officialweb.share.weibo.fail'});
		        }
			});
		});
	});
};
glb.addEvent(window,'load',function(){
	glb.delayLoad("//tajs.qq.com/stats?sId=30480237",function(){
		glb.delayLoad("//pingjs.qq.com/ping_tcss_ied.js",function(){
			if(typeof(pgvMain)=='function'){pgvMain();if(!glb.brow.isMobile){pgvSendClick({hottag:'officialweb.os.pc'});}else{pgvSendClick({hottag:'officialweb.os.mobile'});};};
		});
	});
});
var Main=function(o){
	this._o=o;
	this.setCotType=function(){return (glb.brow.isMobile)?'touchstart':'click';};
	this.ebody=glb.d.body;
	this.ehtml=glb.getElems(glb.d,'html')[0];
	this.eq=this.setCotType();
	this.gb=0;
	this.loadPic=function(url,callback){var img=glb.newElem('img'),self=this;if(img.readyState){img.onreadystatechange=function(){if(img.readyState=="loaded"||img.readyState=="complete"){img.onreadystatechange=null;if(callback&&!self.cancelimg){callback(img);};};};}else{img.onload=function(){if(callback&&!self.cancelimg){callback(img);};};img.onerror=function(e){return e;};};img.src=url;};
	this.createElem();
	if(!glb.brow.isLowBrow){this.initNavFunction();};
	if(glb.brow.isCellPhone){this.ebody.className+=' mobileEM';};
};
Main.prototype.loadAllBanner=function(){
	var self=this,a={rotID:11141,picurl:'//game.gtimg.cn/upload/adw/',s:null,ar:[],bans:[],n:null},writeRTs=function(){
		a.allrot=window['oDaTaNew'+a.rotID];
		for(var datas in a.allrot){
			a.n=datas.substr(3);
			a.s=(10150==a.n)?'<a class="hote" href="'+a.allrot[datas][1]+'" target="_blank"><img src="'+(a.picurl+a.allrot[datas][2])+'" alt="'+decodeURIComponent(a.allrot[datas][0])+'"></a>':(10151==a.n)?'<a href="'+a.allrot[datas][1]+'" target="_blank"><img src="'+(a.picurl+a.allrot[datas][2])+'" alt="'+decodeURIComponent(a.allrot[datas][0])+'"></a>':(10156==a.n)?'<a class="banns" href="'+a.allrot[datas][1]+'" target="_blank"><img src="'+(a.picurl+a.allrot[datas][2])+'" alt="'+decodeURIComponent(a.allrot[datas][0])+'"></a>':'';
			if(a.n>=10152&&a.n<=10155){
				a.bans.push('<a class="banns" href="'+a.allrot[datas][1]+'" target="_blank"><img src="'+(a.picurl+a.allrot[datas][2])+'" alt="'+decodeURIComponent(a.allrot[datas][0])+'"></a>');
				continue;
			};
			a.ar.push(a.s);
		};
		if(glb.getId('pos10150')&&a.ar[0]){glb.getId('pos10150').innerHTML=a.ar[0];};
		if(glb.getId('pos10151')&&a.ar[1]){glb.getId('pos10151').innerHTML=a.ar[1];};
		if(glb.getId('pos10156')&&a.ar[2]){glb.getId('pos10156').innerHTML=a.ar[2];};
		if(glb.getId('bners')&&a.bans.length){glb.getId('bners').innerHTML=a.bans.join('');};
	};
	glb.delayLoad('//game.qq.com/time/qqadv/Info_new_'+a.rotID+'.js?v='+Math.random(),writeRTs);
};
Main.prototype.sliderLine=function(line,left){line.style.left=left+'px';};
Main.prototype.createElem=function(){
	var self=this,c=glb.d.createDocumentFragment();
	self.mask=glb.newElem('div');
	self.mask.className='masklayer';
	self.nld=glb.newElem('p');
	self.nld.className='nowloading';
	self.nld.innerHTML='加载中...<br><a class="cancelload" href="javascript:exitLayerdt();">取消加载</a>';
	self.layerdt=glb.newElem('div');
	self.layerdt.className='layerdt';
	self.layerdt.innerHTML='<div class="lydt" id="lydt"></div><a title="Prev" id="prev" class="prev arrow" href="javascript:turnViewPic(-1);">Prev</a><a title="Next" id="next" class="next arrow" href="javascript:turnViewPic(1);">Next</a><a class="exitlayer" href="javascript:exitLayerdt();">&times;</a>';
	c.appendChild(this.mask);
	c.appendChild(this.nld);
	c.appendChild(this.layerdt);
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
Main.prototype.toViewPrev=function(){
	var self=this;
	return (--self.index<0)?self.curListLen-1:self.index;
};
Main.prototype.toViewNext=function(){
	var self=this;
	return (++self.index>=self.curListLen)?0:self.index;
};
Main.prototype.openLayer=function(o){
	var self=this;
	self.cancelimg=0;
	self.mask.style.cssText='display:block;z-index:2000;';
	self.nld.style.display='block';
	glb.addEvent(self.layerdt,'touchmove',self.stopDefault,false);
	glb.addEvent(self.lydt,'touchmove',self.stopDefault,false);
	glb.addEvent(self.mask,'touchmove',self.stopDefault,false);
};
Main.prototype.closeLayer=function(){
	var self=this;
	self.cancelimg=1;
	self.nld.style.display='none';
	self.mask.style.cssText=self.layerdt.style.cssText='';
	self.layerdt.className='layerdt';
	self.lydt.innerHTML='';
	glb.delEvent(self.layerdt,'touchmove',self.stopDefault,false);
	glb.delEvent(self.lydt,'touchmove',self.stopDefault,false);
	glb.delEvent(self.mask,'touchmove',self.stopDefault,false);
	//glb.delEvent(window,'orientationchange',self.isOrientation,false);
};
Main.prototype.initNavFunction=function(){
	var self=this,mainNav=glb.getId('mainNav'),navi=glb.getId('navi'),
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
		self.ebody.style.height=self.ehtml.style.height=(is)?'auto':'100%';
		self.ebody.style.overflowY=self.ehtml.style.overflowY=(is)?'auto':'hidden';
		self.mask.style.display=(is)?'none':'block';
		if(is){glb.delEvent(self.mask,self.eq,navSliderEvent,false);}else{glb.addEvent(self.mask,self.eq,navSliderEvent,false);};
	},screenChange=function(){
		if(glb.ww()>645){
			setNavHidn(1);
			mainNav.className='mnav';
		};
	};
	screenChange();
	glb.addEvent(navi,self.eq,navSliderEvent,false);
	glb.addEvent(window,'resize',screenChange,false);
};


/*  |xGv00|a62cf22fb6d8f28c5f7599698b8ddc35 */