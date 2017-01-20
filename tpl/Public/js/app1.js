$(function(){
	var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
	var touchstart = mobile ? "touchstart" : "mousedown";
	var touchend = mobile ? "touchend" : "mouseup";
	var touchmove = mobile ? "touchmove" : "mousemove";

	var NW = function(){
		this.loadingPath = '../Public/images/';
		this.motionObj = [];

		this.init();
	}

	NW.prototype = {
		init: function(){
		    //阻止屏幕滑动
		    $('html,body').on(touchmove,function(e){
		        e.preventDefault()
		    })
			this.initLoading();
			this.initAnimation();
			this.bindEvent();
		},
		initLoading: function(){
			var _this = this,
				loader = new createjs.LoadQueue(false),
				manifest = [
					{src:this.loadingPath+'logo.png'},
					{src:this.loadingPath+'guide.png'},
					//{src:loadingPath+'logo.png'},
					//{src:loadingPath+'musicicon.png'},
					//{src:loadingPath+'p1_1.png'},
					//{src:loadingPath+'p1_2.png'},
					//{src:loadingPath+'p1.jpg'},
					//{src:loadingPath+'sharepop.png'},
				];

			function handleOverallProgress(event){
				var length = (Math.ceil(event.loaded) * 390) + 'px';
				$('.progress').css('width', length);
			}
			function handleOverallComplete(event){
			   $('.loading').remove();
			   $('.main').fadeIn(function(){
				    _this.motionObj['page'+1].play();
			   });

			}
			loader.addEventListener("progress", handleOverallProgress);
			loader.addEventListener("complete", handleOverallComplete);
			loader.setMaxConnections(1);
			loader.loadManifest(manifest);
		},
		initAnimation: function(){
			var _this = this;

			$('.page>div').each(function(i){
				_this.motionObj["page"+(i+1)] = new TimelineMax();
			})

			this.motionObj['page'+1].add(TweenMax.from('.page1_1', 1, { alpha: 0, ease:Linear.easeNone}));
	        this.motionObj['page'+1].add(TweenMax.from('.page1_2', 0.5, { scaleX: 0,scaleY: 0 ,ease:Expo.easeOut}));
	        this.motionObj['page'+1].pause();
		},
		pageswitch: function(){

		},
		bindEvent: function(){
			var _this = this;

			$('.page1_3').on(touchstart, function(){
				$('.page1_3>img').attr('src', _this.loadingPath + 'p1_3_close.png');

			})
		}
	};

	new NW()
})
