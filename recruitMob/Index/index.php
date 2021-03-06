<?php
	require_once "../wx/jssdk.php";
	$jssdk = new JSSDK("wxda8d3d9c0cf656b5", "580a19a6302e68e42a358910e9d7674a");
	$signPackage = $jssdk->GetSignPackage();
?>
<!doctype html>
<html>
<head>
	<meta charset="UTF-8">
	<title>瑞华校园大使招募季</title>
	<link rel="stylesheet" type="text/css" href="../Public/css/main.min.css"/>
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
</head>
<body>
<div id="wrapper" class="wrapper">
	<div class="loading">
	    <div class="loadingicon"></div>
	    <div class="loadingtxt">0%</div>
	</div>
	<div class="swiper-container main hide" id="main">
	    <div class="swiper-wrapper page">
	        <div class="swiper-slide page1">
	            <div class="page1_1"><img src="../Public/images/p1_1.png"></div>
	            <div class="page1_2"><img src="../Public/images/logo.jpg"></div>
	        </div>
	        <div class="swiper-slide page2">
	            <div class="page2_1"></div>
	            <div class="page2_2"></div>
	            <div class="page2_3"></div>
	            <div class="page2_4"><p>瑞华校园大使培养计划是瑞华会计师事务所面向全国范围内与瑞华签约高校的大学生开展的瑞华品牌传播活动。瑞华校园大使任期为两年，他们作为瑞华与学生之间的桥梁，向大学生介绍瑞华，宣传“祥瑞中国梦，风华专业人”的品牌形象，是瑞华品牌在校园中的组织者和传播者。</p></div>
				<div class="page2_5">
					<div class="page2_5_0"><img src="../Public/images/p2_5_0.png"></div>
					<div class="page2_5_1"><img src="../Public/images/p2_5_1.png"></div>
					<div class="page2_5_2"><img src="../Public/images/p2_5_2.png"></div>
					<div class="page2_5_3"><img src="../Public/images/p2_5_3.png"></div>
					<div class="page2_5_4"><img src="../Public/images/p2_5_4.png"></div>
					<div class="page2_5_5"><img src="../Public/images/p2_5_5.png"></div>
					<div class="page2_5_6"><img src="../Public/images/p2_5_6.png"></div>
				</div>
	        </div>
			<div class="swiper-slide page3">
	            <div class="page3_1"></div>
	            <div class="page3_2"></div>
	            <div class="page3_3">
					<p class="title">关于瑞华</p>
					<p class="content">瑞华会计师事务所（特殊普通合伙）是一家专业化、规模化、国际化的大型会计师事务所，具有二十多年的发展历史；是我国第一批被授予A+ H股企业审计资格、第一批完成特殊普通合伙转制的民族品牌专业服务机构。</p>
					<p class="content">在中国注册会计师协会发布的《2016年会计师事务所综合评价前百家信息》中，瑞华名列全国第二位，本土所第一名，是我国最大的民族品牌会计师事务所。</p>
				</div>
	        </div>
			<div class="swiper-slide page4">
	            <div class="page4_1"></div>
	            <div class="page4_2"></div>
	            <div class="page4_3"></div>
	            <div class="page4_4">
					<p class="num1"><span>1</span>大使专属积分奖励</p>
					<p class="num2"><span>2</span>成长锻炼的平台</p>
					<p class="num3"><span>3</span>瑞华实习的机会</p>
					<p class="num4"><span>4</span>专享职业生涯指导</p>
					<p class="num5"><span>5</span>志同道合的朋友</p>
					<p class="num6"><span>6</span>瑞华金牌推荐信</p>
				</div>
				<div class="page4_5"></div>
				<div class="page4_6"></div>
	        </div>
			<div class="swiper-slide page5">
	            <div class="page5_1"></div>
	            <div class="page5_2"></div>
	            <div class="page5_3"></div>
	            <div class="page5_4"></div>
	            <div class="page5_5">
					<p class="num1"><span>1</span>就读于瑞华指定专属高校</p>
					<p class="num2"><span>2</span>财务相关专业</p>
					<p class="num3"><span>3</span>大一在招生</p>
					<p class="num4"><span>4</span>有认真负责的精神</p>
					<p class="num5"><span>5</span>认同瑞华的文化</p>
					<p class="num6"><span>6</span>有团队工作经验最佳</p>
				</div>
				<div class="page5_6"></div>
				<div class="page5_7"></div>
				<div class="page5_8"></div>
	        </div>
			<div class="swiper-slide page6">
	            <div class="page6_1"></div>
	            <div class="page6_2"></div>
	            <div class="page6_3">
					<div class="university uit1">
						<p>首都经济贸易大学</p>
						<p>北京工商大学</p>
						<p>北京物资学院</p>
						<p>中国农业大学</p>
						<p>中华女子学院</p>
						<p>中央财经大学</p>
						<p>北京信息科技大学</p>
					</div>
					<div class="university uit2 hide">
						<p>首都经济贸易大学</p>
						<p>北京工商大学</p>
						<p>北京物资学院</p>
						<p>中国农业大学</p>
						<p>中华女子学院</p>
						<p>中央财经大学</p>
						<p>北京信息科技大学</p>
					</div>
					<div class="university uit3 hide">
						<p>首都经济贸易大学</p>
						<p>北京工商大学</p>
						<p>北京物资学院</p>
						<p>中国农业大学</p>
						<p>中华女子学院</p>
						<p>中央财经大学</p>
						<p>北京信息科技大学</p>
					</div>
					<div class="university uit4 hide">
						<p>首都经济贸易大学</p>
						<p>北京工商大学</p>
						<p>北京物资学院</p>
						<p>中国农业大学</p>
						<p>中华女子学院</p>
						<p>中央财经大学</p>
						<p>北京信息科技大学</p>
					</div>
					<div class="university uit5 hide">
						<p>首都经济贸易大学</p>
						<p>北京工商大学</p>
						<p>北京物资学院</p>
						<p>中国农业大学</p>
						<p>中华女子学院</p>
						<p>中央财经大学</p>
						<p>北京信息科技大学</p>
					</div>
					<div class="university uit6 hide">
						<p>首都经济贸易大学</p>
						<p>北京工商大学</p>
						<p>北京物资学院</p>
						<p>中国农业大学</p>
						<p>中华女子学院</p>
						<p>中央财经大学</p>
						<p>北京信息科技大学</p>
					</div>
					<div class="p6-operate">
						<div class="opt-it active" data-id=1>北京</div>
						<div class="opt-it" data-id=2>东部</div>
						<div class="opt-it" data-id=3>西部</div>
						<div class="opt-it" data-id=4>北京</div>
						<div class="opt-it" data-id=5>北京</div>
						<div class="opt-it" data-id=6>北京</div>
					</div>
				</div>
	            <div class="page6_4"></div>
	        </div>
			<div class="swiper-slide page7">
	            <div class="page7_1"></div>
	            <div class="page7_2"></div>
	            <div class="page7_3"></div>
	            <div class="page7_4"></div>
	            <div class="page7_5"></div>
				<div class="page7_6"></div>
				<div class="page7_7">
					<p>此活动在法律允许范围内</p>
					<p>最终解释权归瑞华会计师事务所（特殊普通合伙）所有</p>
				</div>
	        </div>
		</div>
		<div class="guideTop"></div>
		<audio style="display:none;" id="media" loop src="../Public/images/bgmusic.mp3"></audio>
	</div>
	<div class="musicicon musicrotate hide ct"></div>
</div>
<script type="text/javascript" src="../Public/js/setviewport.js"></script>
<script type="text/javascript" src="../Public/js/jweixin-1.0.0.js"></script>
<script type="text/javascript" src="../Public/js/swiper.min.js"></script>
<script type="text/javascript" src="../Public/js/jquery-2.1.1.min.js"></script>
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

	var setupWeixinShare = function (message) {
		  wx.onMenuShareTimeline(message);
		  wx.onMenuShareAppMessage(message);
	};

	wx.ready(function () {
		setupWeixinShare({
			title: '瑞华校园大使招募季', // 分享标题
			desc: '瑞华校园大使招募季', // 分享描述
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
				title: '瑞华校园大使找募季', // 分享标题
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
<script type="text/javascript" src="../Public/js/app.min.js"></script>
</body>
</html>
