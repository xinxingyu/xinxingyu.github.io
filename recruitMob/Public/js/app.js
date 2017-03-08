/**
 * author: xinxingyu
 * tim: 2017/03/04
 */
$(function(){
	var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
	var touchstart = mobile ? "touchstart" : "mousedown";
	var touchend = mobile ? "touchend" : "mouseup";
	var touchmove = mobile ? "touchmove" : "mousemove";

	var XXY = function(){
		this.loadingPath = '../Public/images/';
		this.motionObj = []; //animation object
		this.swiper = '';
		this.audio = $('#media')[0];
		this.current = 0;
		this.init()
	}

	XXY.prototype = {
		init: function(){
			this.initAnimation();
			this.initLoading();
			this.bindEvent();
		},
		initLoading: function(){
			var _this = this,
				loader = new createjs.LoadQueue(false),
				manifest = [
					{src:this.loadingPath+'logo.jpg'},
					{src:this.loadingPath+'bgmusic.mp3'},
					{src:this.loadingPath+'p1_bg.png'},
					{src:this.loadingPath+'p1_cloud.png'},
					{src:this.loadingPath+'guide.png'},
					{src:this.loadingPath+'p1.jpg'},
					{src:this.loadingPath+'p3.jpg'},
					{src:this.loadingPath+'p1_1.png'},
					{src:this.loadingPath+'p2_3.png'},
					{src:this.loadingPath+'p3_2.png'},
					{src:this.loadingPath+'p4_1.png'},
					{src:this.loadingPath+'p4_5.png'},
					{src:this.loadingPath+'p6_3.png'}
				];

			function handleOverallProgress(event){
				$('.loadingtxt').text(Math.ceil(event.loaded*100) + '%');
			}
			function handleOverallComplete(event){
			   $('.loading').remove();
			   $('.main').fadeIn(function(){
				   _this.initSwiper();
				   _this.motionObj['page'+1].restart();
				   $('.musicicon').fadeIn();
				   _this.playMusic();
			   });
			}
			loader.addEventListener("progress", handleOverallProgress);
			loader.addEventListener("complete", handleOverallComplete);
			loader.setMaxConnections(1);
			loader.loadManifest(manifest);
		},
		initAnimation: function(){
			var _this = this;

			for(var i = 0; i < 20; i++){
				this.motionObj["page"+(i+1)] = new TimelineMax();
			}

			this.motionObj['page'+1].add(TweenMax.from('.page1_bg', .3, {delay: .1, scale: .3, x: -600, ease:Linear.easeOut}));
			// this.motionObj['page'+1].add(TweenMax.from('.page1_cloud', .2, { alpha: 0, ease:Linear.easeOut}));
			this.motionObj['page'+1].add(TweenMax.from('.page1_1', .5, {delay: .2, alpha: 0.5, x: -750, ease:Bounce.easeOut}));
			this.motionObj['page'+1].add(TweenMax.from('.page1_2', 0.3, {alpha:0, y: 30, ease:Linear.easeNone}));
			this.motionObj['page'+1].pause();

			this.motionObj['page'+2].add(TweenMax.from('.page2_4', .8, {delay: .2, alpha: 0, y: 100, ease:Bounce.easeOut}));
			this.motionObj['page'+2].add(TweenMax.from('.page2_5_0', 0.3, {alpha:0, y: -10, ease:Linear.easeNone}));
			this.motionObj['page'+2].add(TweenMax.from('.page2_5_1', 0.3, {alpha:0, y: 10, ease:Linear.easeNone}));
			this.motionObj['page'+2].add(TweenMax.from('.page2_5_2', 0.3, {alpha:0, y: 10, ease:Linear.easeNone}));
			this.motionObj['page'+2].add(TweenMax.from('.page2_5_3', 0.3, {alpha:0, y: 10, ease:Linear.easeNone}));
			this.motionObj['page'+2].add(TweenMax.from('.page2_5_4', 0.3, {alpha:0, y: 10, ease:Linear.easeNone}));
			this.motionObj['page'+2].add(TweenMax.from('.page2_5_5', 0.3, {alpha:0, y: 10, ease:Linear.easeNone}));
			this.motionObj['page'+2].add(TweenMax.from('.page2_5_6', 0.3, {alpha:0, y: 10, ease:Linear.easeNone}));
			this.motionObj['page'+2].pause();

			this.motionObj['page'+3].add(TweenMax.from('.page3_2', .5, {scale: 0,  x: -700, ease:Linear.easeNone}));
			this.motionObj['page'+3].add(TweenMax.from('.page3_3 .title', .4, {alpha:0, x: -200, ease:Linear.easeNone}));
			this.motionObj['page'+3].add(TweenMax.from('.page3_3 .content', 0.3, {alpha:0, y: 30, ease:Linear.easeNone}));
			this.motionObj['page'+3].pause();

			this.motionObj['page'+4].add(TweenMax.from('.page4_3', .6, {scale: 0,  x: -700, ease:Bounce.easeOut}));
			this.motionObj['page'+4].add(TweenMax.from('.page4_4 .num1', .2, {alpha:0, x: 200, ease:Linear.easeNone}));
			this.motionObj['page'+4].add(TweenMax.from('.page4_4 .num2', .2, {alpha:0, x: 200, ease:Linear.easeNone}));
			this.motionObj['page'+4].add(TweenMax.from('.page4_4 .num3', .2, {alpha:0, x: 200, ease:Linear.easeNone}));
			this.motionObj['page'+4].add(TweenMax.from('.page4_4 .num4', .2, {alpha:0, x: 200, ease:Linear.easeNone}));
			this.motionObj['page'+4].add(TweenMax.from('.page4_4 .num5', .2, {alpha:0, x: 200, ease:Linear.easeNone}));
			this.motionObj['page'+4].add(TweenMax.from('.page4_4 .num6', .2, {alpha:0, x: 200, ease:Linear.easeNone}));
			this.motionObj['page'+4].add(TweenMax.from('.page4_6', .3, {alpha:0, y: 50, ease:Linear.easeNone}));
			this.motionObj['page'+4].pause();

			this.motionObj['page'+5].add(TweenMax.from('.page5_4', .6, {scale: 0,  x: -700, ease:Bounce.easeOut}));
			this.motionObj['page'+5].add(TweenMax.from('.page5_5 .num1', .2, {alpha:0, x: 200, ease:Linear.easeNone}));
			this.motionObj['page'+5].add(TweenMax.from('.page5_5 .num2', .2, {alpha:0, x: 200, ease:Linear.easeNone}));
			this.motionObj['page'+5].add(TweenMax.from('.page5_5 .num3', .2, {alpha:0, x: 200, ease:Linear.easeNone}));
			this.motionObj['page'+5].add(TweenMax.from('.page5_5 .num4', .2, {alpha:0, x: 200, ease:Linear.easeNone}));
			this.motionObj['page'+5].add(TweenMax.from('.page5_5 .num5', .2, {alpha:0, x: 200, ease:Linear.easeNone}));
			this.motionObj['page'+5].add(TweenMax.from('.page5_5 .num6', .2, {alpha:0, x: 200, ease:Linear.easeNone}));
			this.motionObj['page'+5].add(TweenMax.from('.page5_6', .4, {delay:.3,alpha:0, ease:Linear.easeNone}));
			this.motionObj['page'+5].add(TweenMax.from('.page5_8', .5, {scale:0, ease:Bounce.easeOut}));
			this.motionObj['page'+5].pause();

			this.motionObj['page'+7].add(TweenMax.from('.page7_3', .5, {scale: 0,  y: -100, ease:Linear.easeOut}));
			this.motionObj['page'+7].add(TweenMax.from('.page7_4', .4, {delay: -.2, alpha:0, y: 200, ease:Linear.easeNone}));
			this.motionObj['page'+7].add(TweenMax.from('.page7_6', .4, {delay:.3, scale:0, ease:Bounce.easeOut}));
			this.motionObj['page'+7].pause();
		},
		initSwiper: function(){
			var _this = this;

			this.swiper = new Swiper('#main', {
				direction : 'vertical',
				// speed: 800,
				onSetTransition: function(swiper){
				// onSlideChangeStart: function(swiper){

		            var index = swiper.activeIndex + 1;
					if(_this.current != swiper.activeIndex){
						_this.motionObj['page'+index].restart();
					}
					_this.current = swiper.activeIndex;

					if(index == 7){
						$('.guideTop').hide()
					}else{
						$('.guideTop').show()
					}
		        }
			})
		},
		playMusic: function(){
			alert(this.audio.paused)
			this.audio.play()
		},
		pauseMusic: function(){
			this.audio.pause()
		},
		bindEvent: function(){
			var _this = this;
			var optList = $('.p6-operate .opt-it');
			var uitList = $('.page6_3 .university');
			$('.p6-operate .opt-it').on('click', function(e){
				var id = $(e.target).attr('data-id');

				/**
				 * remove all operate button's active status
				 */
				for(var i = 0; i < optList.length; i++){
					$(optList[i]).removeClass('active')
				}
				/**
				 * add active class to target operate button
				 */
				$(e.target).addClass('active');

				for(var i = 0; i < uitList.length; i++){
					$(uitList[i]).hide()
				}
				$('.page6_3 .uit'+id).show();
				TweenMax.from('.page6_3 .uit'+id, .3, {alpha: 0, y: 100, ease: Linear.easeNone})
			});

			$('.page7_6').on('click', function(e){
				location.href = 'http://mjob.rhcncpa.com/JobAd/ApplyResume?adid=560055480';
			})
			$('.page5_8').on('click', function(e){
				_this.current ++;
				_this.swiper.slideTo(_this.current, 300, false);
			})
			$('.musicicon').on('click', function(e){
				if(!_this.audio.paused){
					$('.musicicon').css({'background': 'url("'+_this.loadingPath+'musicicon_close.png")'})
					_this.pauseMusic()
			   	}else{
					$('.musicicon').css({'background': 'url("'+_this.loadingPath+'musicicon.png")'})
					_this.playMusic()
				}
			})
		}
	};

	new XXY();
})
