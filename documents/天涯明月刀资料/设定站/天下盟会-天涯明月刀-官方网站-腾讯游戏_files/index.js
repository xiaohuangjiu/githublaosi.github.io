//����js

function loginFunc()
{
	need(["biz.login"], function(LoginManager) {
		LoginManager.checkLogin(function(){main.ueserTestFunc();}, function(){LoginManager.login();});
	});
}

// �齱��ȡ�����ܳ�ʼ��
amsCfg_120654 = {
	'iAMSActivityId' : '15330', // AMS���
	'activityId' : '109277', // ģ��ʵ����
	'onBeginGetGiftEvent' : function(){
		return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
	},
	'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
		alert(callbackObj.sMsg);
	},
	'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
		var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
		if(packageLen && packageLen.length > 1){
			alert(callbackObj.sMsg);
			return;
		}
	
		//1��ʵ��
		if((callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood") || callbackObj.sPackageRealFlag == 1){
			/*
			 * 0��������Ϸ��Ʒ
			 * 1��ʵ����Ʒ����Ҫ��д�����ջ���Ϣ
			 * 2��cdkey
			 */
			LotteryManager.alert("��ϲ������� " + callbackObj.sPackageName + " ! ����׼ȷ��д������Ϣ���ٷ����й�����Ա��ϵ����");
			return;
		}
		//2��cdkey
		if(callbackObj.sPackageOtherInfo || callbackObj.sPackageCDkey){
			// �µĴ���
			if(callbackObj.sPackageCDkey){
				LotteryManager.alert('����õ�cdkeyΪ��' + callbackObj.sPackageCDkey + '<input type="button" value="����" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageCDkey+'\'); alert(\'���Ƴɹ���\');">');
				return;
			}else{
				LotteryManager.alert('����õ�cdkeyΪ��' + callbackObj.sPackageOtherInfo + '<input type="button" value="����" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageOtherInfo+'\'); alert(\'���Ƴɹ���\');">');
				return;
			}
			
		}
		
		alert(callbackObj.sMsg);
	}
};
//����ģ��
amsCfg_121533 = {
		'iAMSActivityId':'15330',
		'iFlowId':'121533',
		'activityId':'15330',
		'delay':2000,
		'pType':"0,��ѡ����������,1,game-���ܲ���,2,game-���������ȡ,3,game-�ʱ������,4,game-ҳ����������,5,game-��������"
	};
milo.ready(function(){
	amsInit(15330,121533);
});/*  |xGv00|33cd72b97f487e19fc0c4263702c914d */