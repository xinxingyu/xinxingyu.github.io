<?php
	require_once "../wx/jssdk.php";
	$jssdk = new JSSDK("wxda8d3d9c0cf656b5", "580a19a6302e68e42a358910e9d7674a");
	$signPackage = $jssdk->GetSignPackage();
?>
<!doctype html>
<html>
<head>
	<meta charset="UTF-8">
	<title>M运动计划</title>
	<link rel="stylesheet" type="text/css" href="../Public/css/main.css"/>
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
	<script type="text/javascript" src="../Public/js/setviewport.js"></script>
</head>
<body>
<div id="wrapper" class="wrapper">
	<div class="loading">
	    <div class="loadingicon"></div>
	    <div class="loadingprocess"><p class="pro"></p></div>
	    <div class="loadingtxt">0%</div>
	</div>
	<div class="swiper-container main hide" id="main">
	    <div class="swiper-wrapper page">
	        <div class="swiper-slide page1">
	            <div class="page1_0"></div>
	            <div class="page1_1"></div>
	            <div class="page1_2"></div>
	            <div class="page1_3"></div>
	        </div>
			<div class="swiper-slide page2">
				<div class="page2_0"></div>
				<div class="page2_1"></div>
				<div class="page2_2"></div>
				<div class="page2_3"></div>
				<div class="page2_4"></div>
				<div class="page2_5"></div>
			</div>
			<div class="swiper-slide page3 swiper-no-swiping">
				<div class="page3_0"></div>
				<div class="page3_1"></div>
				<div class="page3_2"></div>
				<div class="page3_3"></div>
				<div class="page3_4"></div>
				<div class="page3_5"></div>
			</div>
			<div class="swiper-slide page4 swiper-no-swiping">
				<div class="page4_0"></div>
				<div class="page4_1"></div>
				<div class="page4_2"></div>
			</div>
			<div class="swiper-slide page5 swiper-no-swiping">
				<div class="page5_0"></div>
				<div class="page5_1"></div>
				<div class="page5_2">
					<section class="qs-item">
						<p class="qs-item-label">姓&nbsp;&nbsp;&nbsp;&nbsp;名：</p>
						<input class="qs-item-input" type="text" id="name" name="" placeholder="请输入姓名">
					</section>
					<section class="qs-item">
						<p class="qs-item-label">姓&nbsp;&nbsp;&nbsp;&nbsp;别：</p>
						<input class="qs-item-input" type="text" id="sex" name="" placeholder="请输入性别">
					</section>
					<section class="qs-item">
						<p class="qs-item-label">年&nbsp;&nbsp;&nbsp;&nbsp;龄：</p>
						<input class="qs-item-input" type="text" id="age" name="" placeholder="请输入年龄">
					</section>
					<section class="qs-item">
						<p class="qs-item-label">手&nbsp;&nbsp;&nbsp;&nbsp;机：</p>
						<input class="qs-item-input" type="text" id="phone" name="" maxlength="11" placeholder="请输入联系人手机号码">
					</section>
					<section class="qs-item">
						<p class="qs-item-label">邮&nbsp;&nbsp;&nbsp;&nbsp;箱：</p>
						<input class="qs-item-input" type="text" id="email" name="" placeholder="请输入联系人邮箱">
					</section>
					<section class="qs-item">
						<p class="qs-item-label">单&nbsp;&nbsp;&nbsp;&nbsp;位：</p>
						<input class="qs-item-input" type="text" id="company" name="" placeholder="请输入联系人单位">
					</section>
				</div>
				<div class="page5_3"></div>
				<div class="req-loading hide">
					<div class="req-loading-content">
						<div class="req-loading-icon"></div>
						<div class="req-loading-pro"><p class="reqpro"></p></div>
						<div class="req-loading-text">0%</div>
					</div>
				</div>
			</div>
			<div class="swiper-slide page6 swiper-no-swiping">
				<div class="page6_0"></div>
				<div class="page6_1"></div>
				<div class="page6_2">
					<p class="username">张佳宁</p>
					<p class="nametips">先生&nbsp;/&nbsp;女士</p>
					<p class="companyname">北京精钢地铁有限公司</p>
				</div>
				<div class="page6_3"></div>
				<div class="page6_4"></div>
				<div class="page6_5"></div>
				<div class="page6_6"><div class="page6_6_c"></div></div>
			</div>
		</div>
		<div class="guideTop"></div>
		<div class="sharemask hide"><img src="../Public/images/share.png"></div>
		<audio style="display:none;" id="media" loop preload="auto" autoplay="autoplay" src="../Public/images/bgm.mp3"></audio>
	</div>
	<div class="musicicon musicrotate hide ct"></div>
</div>
<script>
	document.addEventListener('WeixinJSBridgeReady', function() {
        document.getElementById('media').play();
    }, false);
</script>
<script type="text/javascript" src="../Public/js/other.js"></script>
<script type="text/javascript" src="../Public/js/jweixin.js"></script>
<script type="text/javascript" src="../Public/js/swiper.min.js"></script>
<script type="text/javascript" src="../Public/js/jquery.js"></script>
<script type="text/javascript" src="../Public/js/pre.js"></script>
<script type="text/javascript" src="../Public/js/tmd.js"></script>
<script>
	var wxData = {
		debug: false,
		appId: '<?php echo $signPackage["appId"];?>',
		timestamp: <?php echo $signPackage["timestamp"];?>,
		nonceStr: '<?php echo $signPackage["nonceStr"];?>',
		signature: '<?php echo $signPackage["signature"];?>',
		jsApiList: [
			'onMenuShareTimeline',
			'onMenuShareAppMessage'
		]
	}
	wx.config(wxData);

	var setupWeixinShare = function (message) {
		  wx.onMenuShareTimeline(message);
		  wx.onMenuShareAppMessage(message);
	};

	wx.ready(function () {
		setupWeixinShare({
			title: 'M运动计划', // 分享标题
			desc: 'M运动计划', // 分享描述
			link: 'http://dokeycn.com/wap/Index/index.php', // 分享链接
			imgUrl: 'http://dokeycn.com/wap/Public/images/result1.png', // 分享图标
			type: '',
			dataUrl: '',
			success: function () {
			  // 用户确认分享后执行的回调函数
			},
			cancel: function () {
			  // 用户取消分享后执行的回调函数
			}
		});
	});
	function setShareFn(options){
		wx.config(wxData);

		wx.ready(function () {
			setupWeixinShare({
				title: '测测你的眼力劲', // 分享标题
				desc: options.desc, // 分享描述
				link: 'http://dokeycn.com/wap/Index/index.php', // 分享链接
				imgUrl: options.imgUrl, // 分享图标
				type: '',
				dataUrl: '',
				success: function () {
				  // 用户确认分享后执行的回调函数
				},
				cancel: function () {
				  // 用户取消分享后执行的回调函数
				}
			});
		});
	}
</script>
<script type="text/javascript" src="../Public/js/app.js"></script>
</body>
</html>
