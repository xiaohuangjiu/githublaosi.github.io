//活动相关js

function loginFunc()
{
	need(["biz.login"], function(LoginManager) {
		LoginManager.checkLogin(function(){main.ueserTestFunc();}, function(){LoginManager.login();});
	});
}

// 抽奖领取主功能初始化
amsCfg_120654 = {
	'iAMSActivityId' : '15330', // AMS活动号
	'activityId' : '109277', // 模块实例号
	'onBeginGetGiftEvent' : function(){
		return 0; // 抽奖前事件，返回0表示成功
	},
	'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
		alert(callbackObj.sMsg);
	},
	'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
		var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
		if(packageLen && packageLen.length > 1){
			alert(callbackObj.sMsg);
			return;
		}
	
		//1：实物
		if((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1){
			/*
			 * 0：虚拟游戏物品
			 * 1：实际物品，需要填写个人收货信息
			 * 2：cdkey
			 */
			LotteryManager.alert("恭喜您获得了 " + callbackObj.sPackageName + " ! 请您准确填写个人信息，官方将有工作人员联系您。");
			return;
		}
		//2：cdkey
		if(callbackObj.sPackageOtherInfo || callbackObj.sPackageCDkey){
			// 新的处理
			if(callbackObj.sPackageCDkey){
				LotteryManager.alert('您获得的cdkey为：' + callbackObj.sPackageCDkey + '<input type="button" value="复制" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageCDkey+'\'); alert(\'复制成功。\');">');
				return;
			}else{
				LotteryManager.alert('您获得的cdkey为：' + callbackObj.sPackageOtherInfo + '<input type="button" value="复制" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageOtherInfo+'\'); alert(\'复制成功。\');">');
				return;
			}
			
		}
		
		alert(callbackObj.sMsg);
	}
};
//反馈模块
amsCfg_121533 = {
		'iAMSActivityId':'15330',
		'iFlowId':'121533',
		'activityId':'15330',
		'delay':2000,
		'pType':"0,请选择问题类型,1,game-不能参与活动,2,game-礼包不能领取,3,game-活动时间有误,4,game-页面文字有误,5,game-其他问题"
	};
milo.ready(function(){
	amsInit(15330,121533);
});/*  |xGv00|33cd72b97f487e19fc0c4263702c914d */