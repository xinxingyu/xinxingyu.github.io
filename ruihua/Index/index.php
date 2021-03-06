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
        <div class="loading-title">
            <div class="loadingicon"></div>
        </div>
        <div class="loading-plan"></div>
        <div class="loading-content">
            <div class="loadingtxt">0%</div>
            <div class="loadingtip">loading...</div>
        </div>
        <div class="loading-bto"></div>
    </div>
    <div class="swiper-container main hide" id="main">
        <div class="swiper-wrapper page">
            <div class="swiper-slide page1">
                <div class="page1_1"></div>
                <div class="page1_2"></div>
                <div class="page1_3"></div>
                <div class="page1_4"></div>
                <div class="page1_2"></div>
                <div class="logo_bottom"></div>
            </div>
            <div class="swiper-slide page2">
                <div class="page2_bg1"><img src="../Public/images/p2_bg1.png"></div>
                <div class="page2_bg2"></div>
                <div class="page2_logo logo_top"></div>
                <div class="page2_1 itm"></div>
                <div class="page2_2 itm"></div>
                <div class="page2_desc itm">
                    瑞华校园大使培养计划是瑞华会计师事务所面向全国范围内与瑞华签约高校的大学生开展的瑞华品牌传播活动。瑞华校园大使是从瑞华指定专属院校的学生中选举产生，任期为两年。瑞华校园大使作为瑞华与学生之间的桥梁，通过在校园内组织、开展一系列活动，向大学生介绍瑞华，宣传“祥瑞中国梦，风华专业人”的品牌形象，协助瑞华校园招聘工作的展开，共同提升瑞华在校园中的品牌知名度，帮助瑞华了解校园求职群体的需求，是瑞华在校园中的组织者和传播者。
                </div>
                <div class="page2_3 itm breath"></div>
                <div class="page2_4 itm breath"></div>
                <div class="page2_5 itm breath"></div>
            </div>
            <div class="swiper-slide page3">
                <div class="page3_bg"></div>
                <div class="page3_1"></div>
                <div class="page3_2"></div>
                <div class="page3_3"></div>
            </div>
        </div>
        <div class="guideTop"></div>
        <audio style="display:none;" id="media" loop preload="auto" autoplay="autoplay" src="../Public/images/bgmusic.mp3"></audio>
    </div>
    <div class="swiper-container activity hide" id="activity">
        <div class="swiper-wrapper page">
            <div class="swiper-slide actpage1">
                <div class="actpage1_4"></div>
                <div class="actpage1_logo"></div>
                <div class="actpage1_3"></div>
                <div class="actpage1_2"></div>
                <div class="actpage1_1"></div>
            </div>
            <div class="swiper-slide actpage2">
                <div class="caidai"></div>
                <div class="actpage2_1"></div>
                <div class="actpage2_2"></div>
                <div class="actpage2_3"></div>
                <div class="actpage2_4"></div>
                <div class="logo_bottom"></div>
            </div>
            <div class="swiper-slide actpage3">
                <div class="actpage3_4"></div>
                <div class="actpage3_1"></div>
                <div class="actpage3_2"></div>
                <div class="actpage3_3"></div>
                <div class="logo_bottom"></div>
            </div>
            <div class="swiper-slide actpage4">
                <div class="caidai"></div>
                <div class="actpage4_1"></div>
                <div class="actpage4_2"></div>
                <div class="actpage4_3"></div>
                <div class="logo_bottom"></div>
                <!-- <div class="shanguang"></div> -->
            </div>
        </div>
        <div class="guideTop2"></div>
    </div>
    <div class="swiper-container sign hide" id="sign">
        <div class="swiper-wrapper page">
            <div class="swiper-slide sign1">
                <div class="logo_top"></div>
                <div class="sign1_1"></div>
                <div class="sign1_2"></div>
            </div>
            <div class="swiper-slide sign2">
                <div class="university">
                    <div class="logo_top"></div>
                    <div class="university_1"></div>
                    <div class="university_2"></div>
                    <div class="university_3">
                        <div class="university-item uit1">
                            <p>首都经济贸易大学</p>
                            <p>北京工商大学</p>
                            <p>北京物资学院</p>
                            <p>中国农业大学</p>
                            <p>中华女子学院</p>
                            <p>中央财经大学</p>
                            <p>北京信息科技大学</p>
                        </div>
                        <div class="university-item uit2 hide">
                            <p>南京审计大学</p>
                            <p>山东财经大学</p>
                            <p>浙江财经大学</p>
                            <p>杭州电子科技大学</p>
                            <p>青岛大学</p>
                            <p>浙江工商大学</p>
                            <p>浙江工业大学</p>
                        </div>
                        <div class="university-item uit3 hide">
                            <p>四川农业大学</p>
                            <p>兰州大学</p>
                            <p>西安外国语大学</p>
                            <p>兰州财经大学</p>
                            <p>云南财经大学</p>
                            <p>西南财经大学</p>
                            <p>重庆理工大学</p>
                        </div>
                        <div class="university-item uit4 hide">
                            <p>中南财经政法大学</p>
                            <p>武汉理工大学</p>
                            <p>广东外语外贸学院</p>
                            <p>江西财经大学</p>
                            <p>中山大学</p>
                            <p>安徽工业大学</p>
                            <p>安徽财经大学</p>
                        </div>
                        <div class="university-item uit5 hide">
                            <p>东北大学</p>
                            <p>哈尔滨商业大学</p>
                            <p>辽宁大学</p>
                            <p>天津商业大学</p>
                            <p>东北财经大学</p>
                            <p>吉林财经大学</p>
                        </div>
                        <div class="university-item uit6 hide">
                            <p>燕山大学</p>
                            <p>河北大学</p>
                            <p>河北经贸大学</p>
                            <p>宁波大学</p>
                            <p>河南财经政法大学</p>
                            <p>郑州航空工业管理学院</p>
                        </div>
                    </div>
                    <div class="university-operate">
                        <div class="opt-it opt1 active" data-id=1></div>
                        <div class="opt-it opt2" data-id=2></div>
                        <div class="opt-it opt3 nmr" data-id=3></div>
                        <div class="opt-it opt4" data-id=4></div>
                        <div class="opt-it opt5" data-id=5></div>
                        <div class="opt-it opt6 nmr" data-id=6></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="guideTop3"></div>
    </div>
    <div class="swiper-container introduce hide" id="introduce">
        <div class="swiper-wrapper page">
            <div class="swiper-slide introduce1">
                <div class="logo_top"></div>
                <div class="introduce1_1"></div>
                <div class="introduce1_2">
                    <p>
                        瑞华会计师事务所（特殊普通合伙人）是一家专业化、规模化、国际化的专业服务机构，是我国第一批被授予A+H股企业审计资格、第一批完成特殊普通合伙转制的会计师事务所，系美国PCAOB（公众公司会计监督委员会）登记机构。业务涉及股票发行与上市、公司改制、企业重组、资本运作、财务咨询、管理咨询、税务咨询等领域。
                    </p>
                    <p>
                        瑞华所总部设在中国北京，执业网络遍及全国，具有雄厚的专业技术力量，凝聚了一大批具备深厚专业素养、丰富实践经验、良好沟通能力及团队精神的行业精英。
                    </p>
                </div>
                <div class="introduce1_3"></div>
                <div class="introduce1_bg"></div>
            </div>
        </div>
        <div class="guideTop4"></div>
    </div>
    <div class="musicicon musicrotate hide ct"></div>
</div>
<script>
    document.addEventListener('WeixinJSBridgeReady', function() {
        document.getElementById('media').play();
    }, false);
</script>
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
