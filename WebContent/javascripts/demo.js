/**
 * Created by liqiao on 8/10/15.
 */

/**
 * _config comes from server-side template. see views/index.jade
 */
dd.config({
			agentId : _config.agentid,
			corpId : _config.corpId,
			timeStamp : _config.timeStamp,
			nonceStr : _config.nonceStr,
			signature : _config.signature,
			jsApiList : [ 'runtime.info', 'biz.contact.choose',
					'device.notification.confirm', 'device.notification.alert',
					'device.notification.prompt', 'biz.ding.post',
					'biz.util.openLink' ]
		});

dd.ready(function() {

	// alert('dd.ready rocks!');

	dd.runtime.info({
		onSuccess : function(info) {
			logger.e('runtime info: ' + JSON.stringify(info));
		},
		onFail : function(err) {
			logger.e('fail: ' + JSON.stringify(err));
		}
	});
	dd.biz.navigation.setMenu({
		backgroundColor : "#ADD8E6",
		items : [
			{
				id:"1",//字符串
			// "iconId":"file",//字符串，图标命名
			  text:"帮助"
			}
			,
			{
				"id":"2",
			"iconId":"photo",
			  "text":"我们"
			}
			,
			{
				"id":"3",
			"iconId":"file",
			  "text":"你们"
			}
			,
			{
				"id":"4",
			"iconId":"time",
			  "text":"他们"
			}
		],
		onSuccess: function(data) {
			alert(JSON.stringify(data));

		},
		onFail: function(err) {
			alert(JSON.stringify(err));
		}
	});


	dd.runtime.permission.requestAuthCode({
		corpId : _config.corpId,
		onSuccess : function(info) {
			logger.e('authcode: ' + info.code);
			$.ajax({
				url : 'userinfo?code=' + info.code + '&corpid='
						+ _config.corpId,
				type : 'GET',
				success : function(data, status, xhr) {
					var info = JSON.parse(data);
					alert('user id: ' + info.userid + " data:"
							+ JSON.stringify(info));
					document.getElementById("userName").innerHTML = info.name;
					document.getElementById("userId").innerHTML = info.userid;
                    document.getElementById("userImg").src = info.avatar;

				},
				error : function(xhr, errorType, error) {
					logger.e("yinyien:" + _config.corpId);
					logger.e(errorType + ', ' + error);
				}
			});

		},
		onFail : function(err) {
			logger.e('fail: ' + JSON.stringify(err));
		}
	});
});

dd.error(function(err) {
	logger.e('dd error: ' + JSON.stringify(err));
});
