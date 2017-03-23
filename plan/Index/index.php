<?php
	require_once "../wx/jssdk.php";
	$jssdk = new JSSDK("wxda8d3d9c0cf656b5", "580a19a6302e68e42a358910e9d7674a");
	$signPackage = $jssdk->GetSignPackage();
?>
<!doctype html>
<html>
<head>
	<meta charset="UTF-8">
	<title>测测你的眼力劲</title>
	<link rel="stylesheet" type="text/css" href="../Public/css/main.css"/>
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
</head>
<body>
<div id="wrapper" class="wrapper">
	<div class="loading">
	    <div class="loadingicon"></div>
	    <div class="loadingtxt"><p class="progress"></p></div>
	</div>
	<div class="main hide">
	    <div class="page" id="page">

	        <div class="page1">
	            <div class="page1_1"><img src="../Public/images/p1_1.png"></div>
	            <div class="page1_2"><img src="../Public/images/p1_2.png"></div>
	            <div class="page1_3 ct" @click="closeEye"><img src="../Public/images/p1_3_open.png"></div>
	            <div class="page1_4"><img src="../Public/images/p1_4.png"></div>
	        </div>
			<div v-for="(qt, index) in questions"  :class="'page'+(index+2)" class="questions hide">
				<template v-if="qt.type == 1">
					<div class="question"><p class="question-text">{{(index+1)+'、'+qt.question}}</p></div>
					<div class="answer-img">
						<div class="answer-img-item answer-item ct" :id="''+index+key" v-for="(item, key) in qt.answer" @click="choic(item, qt, index, key, $event, 'img')">
							<img :src="item.value" class="ct">
							<div class="hide answer-img-mask mask"></div>
							<div class="hide answer-img-yes yes"></div>
							<div class="hide answer-img-no no"></div>
						</div>
					</div>
					<div class="clock"><img :src="'../Public/images/num'+time+'.png'"></div>
					<div class="tips"><img src="../Public/images/tips.png"></div>
				</template>
				<template v-else>
					<div class="question"><p class="question-text">{{(index+1)+'、'+qt.question}}</p></div>
					<div class="textbg" :style="{ backgroundImage: regbackground(qt.questionImg) }"></div>
					<div class="answer-text">
						<div class="answer-text-item answer-item ct" :id="''+index+key" v-for="(item, key) in qt.answer" @click="choic(item, qt, index, key, $event, 'text')">
							<img :src="'../Public/images/'+item.key+'.png'" class="ct">
							<div class="answer-text-bg"><p>{{item.value}}</p></div>
							<div class="hide answer-text-mask mask"></div>
							<div class="hide answer-text-yes yes"></div>
							<div class="hide answer-text-no no"></div>
						</div>
					</div>
					<div class="clock"><img :src="'../Public/images/num'+time+'.png'"></div>
					<div class="tips"><img src="../Public/images/tips.png"></div>
				</template>
			</div>
			<div class="page12 hide">
				<div class="page12_1">
					<div class="page12_content">
						<!-- <img src="../Public/images/p12_1.png"> -->
						<div class="page12-tips"><img src="../Public/images/p12_tips.png"></div>
						<div class="page12-result" :style="{ backgroundImage: resultBackground() }"></div>
					</div>
				</div>
	            <div class="page12_2">
					<div class="btn-share" @click="share"></div>
					<div class="btn-replay" @click="replay"></div>
					<div class="btn-surprise" @click="showSurprise"></div>
				</div>
			</div>
	    </div>
		<div class="musicicon musicrotate hide ct" @click="operateMusic"></div>
	    <div class="sharemask hide" @click="hideShare">
	        <img src="../Public/images/share.png">
	    </div>
	    <div class="surpriseMask hide" @click="hideSurprise()">
			<div class="jump" @click="jump()"></div>
			<div class="jump2" @click="jump2()"></div>
	        <img src="../Public/images/daoji.jpg">
	    </div>
		<audio style="display:none;" id="media" loop src="../Public/images/bgmusic.mp3"></audio>
	</div>
</div>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript" src="../Public/js/setviewport.js"></script>
<!-- <script type="text/javascript" src="../Public/js/jweixin-1.0.0.js"></script> -->
<script type="text/javascript" src="../Public/js/jquery-2.1.1.min.js"></script>
<!-- <script type="text/javascript" src="../Public/js/wxshare.js"></script> -->
<script type="text/javascript" src="../Public/js/vue.min.js"></script>
<script type="text/javascript" src="../Public/js/questions.js"></script>
<script type="text/javascript" src="../Public/js/preloadjs-0.6.0.min.js"></script>
<script type="text/javascript" src="../Public/js/TweenMax.min.js"></script>
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
	//
	// wx.config({
	// 	debug: false,
	// 	appId: '<?php echo $signPackage["appId"];?>',
	// 	timestamp: <?php echo $signPackage["timestamp"];?>,
	// 	nonceStr: '<?php echo $signPackage["nonceStr"];?>',
	// 	signature: '<?php echo $signPackage["signature"];?>',
	// 	jsApiList: [
	// 		'onMenuShareTimeline',
	// 		'onMenuShareAppMessage'
	// 		// 'onMenuShareQQ',
	// 		// 'onMenuShareWeibo',
	// 		// 'onMenuShareQZone'
	// 	]
	// });

	var setupWeixinShare = function (message) {
		  wx.onMenuShareTimeline(message);
		  wx.onMenuShareAppMessage(message);
		//   wx.onMenuShareQQ(message);
		//   wx.onMenuShareWeibo(message);
		  // wx.onMenuShareQZone(message);
	};

	wx.ready(function () {
		setupWeixinShare({
			title: '测测你的眼力劲', // 分享标题
			desc: '测测你的眼力劲,快去测试吧', // 分享描述
			link: 'http://dokeycn.com/wap/Index/index.php', // 分享链接
			imgUrl: 'http://dokeycn.com/wap/Public/images/result1.png', // 分享图标
			type: '', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
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
				type: '', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
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
