/**
 * author: xinxingyu
 */
$(function(){
	var XXY = function(){
		this.loadingPath = '../public/images/index/';
		this.loadingPath2 = '../public/images/itsyou/';
		this.motionObj = new TimelineMax();
		this.pe = $(window).width()/3700;
		// swiper object
		this.oSwiper = ''
		this.cSwiper = ''
		this.iSwiper = ''
		this.current = 0; //current page index
		this.init()
	}
	XXY.prototype = {
		init: function(){
			this.initviews();
			this.initAnimation();
			this.initLoading();
			this.bindEvent();
		},
		initviews: function(){
			var car = {width: 1894, height: 1729, left: 1056, top: 30};
			var views = {
				tyre1:{width: 484, left: 685, top: 0},
				tyre2: {width: 445, left: 1450.5, bottom: 262.5},
				tyre3: {width: 263, left: 456, bottom: 275},
				smoke: {width: 2552, left: -1361, top: 280},
				pen: {width: 433, left: -1763, top: 1175},
				keybord: {width: 454, left: -1562, top: 914},
				computer: {width: 604, left: -1192, top: 1103},
				tips1: {width: 1302, left: 377, top: 67},
				tips2: {width: 871, left: 759, top: 880},
				book: {width: 369, left: 230, top: 30},
				operate: {width: 1200, left: 598, top: 1385}
			}
			for(var item in views){
				this.computeViews('.'+item, views[item]);
			}

			$('.car').css({width: this.pe*car.width+'px', height: this.pe*car.height+'px', margin: this.pe*car.top+'px'+' 0 0 -'+this.pe*car.left+'px'});
			$('.page1_content').css({height: this.pe*1900+'px'});
		
			this.resizePage()
		},
		/**
		 * set swiper views
		 */
		resizePage: function(){
			var sHeight1 = $(window).height();
			var sHeight2 = $($('.contentbox-container-main')[0]).height();
			var sHeight = sHeight1 > sHeight2 ? sHeight1 : sHeight2;
			if($(window).height() <= 700){
				sHeight = sHeight*0.74 + 100;
			}
			// $('#swiper3-box').css({height: sHeight+10+'px'})
			// $('#swiper3-box').css({height: $(window).height()})
			$('.contentbox-container-main').css({zoom: $(window).height()/950})
			$('.contentbox-container .c-bg .bg').css({height: $(window).height()})
			$('.contentbox-container .bg-content').css({height: $(window).height()/950 * 424})
		},
		initLoading: function(){
			var _this = this,
				loader = new createjs.LoadQueue(false),
				manifest = [
					{src:this.loadingPath+'bg.jpg'},
					{src:this.loadingPath+'car.png'},
					{src:this.loadingPath+'computer.png'},
					{src:this.loadingPath+'keybord.png'},
					{src:this.loadingPath+'pen.png'},
					{src:this.loadingPath+'tyre1_1.png'},
					{src:this.loadingPath+'tyre1_2.png'},
					{src:this.loadingPath+'tyre2_1.png'},
					{src:this.loadingPath+'tyre2_2.png'},
					{src:this.loadingPath+'tyre3_1.png'},
					{src:this.loadingPath+'tyre3_2.png'},
					{src:this.loadingPath+'tips1.png'},
					{src:this.loadingPath+'tips2.png'},
					{src:this.loadingPath+'operate.png'},
					{src:this.loadingPath2+'logo_hover.png'},
					{src:this.loadingPath2+'button1_hover.png'},
					{src:this.loadingPath2+'button2_hover.png'}
				];

			function handleOverallProgress(event){}
			function handleOverallComplete(event){
			   $('.loading').remove();
			   $('.main').show();
			   $('.guide').show();
			   /**
			    * init swiper when main page is show
			    */
			   _this.initSwiper()
			   _this.motionObj.restart();
			   _this.itemAnimation()
			   _this.item2Animation()
			}
			loader.addEventListener("progress", handleOverallProgress);
			loader.addEventListener("complete", handleOverallComplete);
			loader.setMaxConnections(1);
			loader.loadManifest(manifest);
		},
		initSwiper: function(){
			var _this = this;

			this.oSwiper = new Swiper('#o-c',{
				direction : 'vertical',
				speed: 1000,
				mousewheelControl: true, //鼠标滚轮控制滑动
				onSetTransition: function(swiper){
					console.log(swiper.activeIndex)
		         //    if(swiper.activeIndex==2){
			        //     swiper.params.onlyExternal=true;
			        //     swiper.disableMousewheelControl();
		        	// }else{
			        //     swiper.params.onlyExternal=false;
			        //     swiper.enableMousewheelControl();
			        // }
					_this.current = swiper.activeIndex;

					if(swiper.activeIndex==0){
						$('.guide').show();
						$('.guide2').hide();
					}else if(swiper.activeIndex==1){
						$('.guide').show();
						$('.guide2').show();
					}else{
						$('.guide').hide();
						$('.guide2').show();
					}
		        }
			})
			this.cSwiper = new Swiper('#i-c-b1',{
				// pagination: '#i-c-b1',
		        paginationClickable: true,
		        speed: 1000,
				// mousewheelControl: true, //鼠标滚轮控制滑动
			})
			// this.iSwiper = new Swiper('#i-c1',{
			// 	scrollbar: '.swiper-scrollbar',
		 //        direction: 'vertical',
		 //        slidesPerView: 'auto',
			// 	freeMode: true,
			// 	freeModeMomentum : false,
			// 	mousewheelControl: true,
			// 	mousewheelSensitivity : 0.5,
			// 	onSetTransition: function(swiper,translate){
			// 		//translate 一直为0，不可直接用
			// 		nowTranslate = swiper.translate;

			// 		if(typeof(beforeTranslate) == "undefined"){
			// 			beforeTranslate=0
			// 		};
			// 		slideHeight = swiper.slides[0].scrollHeight;
			// 		swiperHeight = swiper.height;

			// 		if(nowTranslate>-2 && nowTranslate > beforeTranslate){
			// 			_this.oSwiper.slideTo(1, 1000, false);
			// 		}
			// 		if(slideHeight-swiperHeight+nowTranslate<2 && nowTranslate < beforeTranslate){
			// 			//滚轮最底下
			// 			// _this.oSwiper.slideTo(2);
			// 		}

			// 		beforeTranslate=nowTranslate;
	  //          	}
			// });
		},
		initAnimation: function(){
			this.motionObj.add(TweenMax.from('.car', .7, {delay:.1,scale:.1, x:-400*this.pe, y:20*this.pe, ease:Linear.easeNone, onStart: this.changeTyre()}));
			this.motionObj.add(TweenMax.from('.smoke', .4, {delay:-.2, alpha:0, ease:Linear.easeNone}));
			this.motionObj.pause();
		},
		itemAnimation: function(){
			var _this = this;

			TweenMax.from('.pen', .5, {delay:.22, scale:.1, x:1200*this.pe, y:-650*this.pe, ease:Linear.easeNone, onComplete: _this.floatAnimation('.pen')})
			TweenMax.from('.keybord', .4, {delay:.1, scale:.1, x:900*this.pe, y:-100*this.pe, ease:Linear.easeNone, onComplete: _this.floatAnimation('.keybord')});
			TweenMax.from('.computer', .5, {delay:.2, scale:.1, x:630*this.pe, y:-500*this.pe, ease:Linear.easeNone, onComplete: _this.floatAnimation('.computer')});

		},
		item2Animation: function(){
			var _this = this;

			TweenMax.from('.book', .8, {delay:1, scale:0, x:-775*this.pe, y:560*this.pe, ease:Linear.easeOut, onComplete: _this.floatAnimation('.book')});
			TweenMax.from('.tips1', .5, {delay:1.2, scale:0, alpha: .4, x:-1000*this.pe, y:560*this.pe, ease:Bounce.easeOut, onStart: this.changeTyre()})
			TweenMax.from('.tips2', .3, {delay:1.4, scale:0, alpha: .4, x:-1500*this.pe, y:100*this.pe, ease:Elastic.easeOut});
			TweenMax.from('.operate', .5, {delay:1.8, x:1500*this.pe,  ease:Bounce.easeOut});
		},
		floatAnimation: function(dom){
			return function (){
				TweenMax.to(dom, .2, {y: -5, yoyo: true, repeat: -1, ease:Linear.easeNone})
			}
		},
		computeViews: function(dom, opt){
			if(opt.top!=undefined){
				$(dom).css({width: this.pe*opt.width+'px', margin: this.pe*opt.top+'px'+' 0 0 '+this.pe*opt.left+'px'});
			}else if(opt.bottom){
				$(dom).css({width: this.pe*opt.width+'px', margin: '0 0 '+this.pe*opt.bottom+'px'+' '+this.pe*opt.left+'px'});
			}
		},
		changeTyre: function(){
			var _this = this;

			return function(){
				var t = 0,
					_timer = setInterval(function(){
						t++;
						if(t>3){
							// clearInterval(_timer)
							t = 1
							$('.tyre1, .tyre2, .tyre3').show()
						}
						// console.log(t);
						if(t==3){
							$('.tyre1, .tyre2, .tyre3').hide()
						}else{
							$('.car .tyre1').attr('src', _this.loadingPath+'tyre1_'+t+'.png')
							$('.car .tyre2').attr('src', _this.loadingPath+'tyre2_'+t+'.png')
							$('.car .tyre3').attr('src', _this.loadingPath+'tyre3_'+t+'.png')
						}
					}, 120)
			}
		},
		bindEvent: function(){
			var _this = this;

			$(window).resize(function() {
				_this.resizePage();
			});
			$('.operate').on('click', function(){
				_this.current++;
				_this.oSwiper.slideTo(_this.current, 1000, false);
			})
			$('.bt-sao').hover(function(){
				$('.bt-ma').show()
			},function(){
				$('.bt-ma').hide()
			})
			$('.logo').on('click', function(){
				location.href = 'http://job.rhcncpa.com/acts'
			})
			/**
			 * 看看历届大使的风采
			 */
			$('.bt-look').on('click', function(){
				// location.href="introduce.html"
				window.open('introduce.html')
			})
			/**
			 * 走上人生巅峰，快来报名吧
			 */
			$('.bt-go').on('click', function(){
				location.href="http://job.rhcncpa.com/Portal/Resume/ResumeItem?jid=560055480&stepId=0&sId=0&r=/jobdetail/560055480";
			})
			$('.bt-reward').on('click', function(){
				_this.cSwiper.slideTo(1, 1000, false);
			})
			$('.bt-process').on('click', function(){
				_this.cSwiper.slideTo(2, 1000, false);
			})
			$('.bt-itsyou').on('click', function(){
				_this.cSwiper.slideTo(0, 1000, false);
			})
			$('.guide').on('click', function(){
				_this.current++;
				_this.oSwiper.slideTo(_this.current, 1000, false);
			})
			$('.guide2').on('click', function(){
				_this.current--;
				_this.oSwiper.slideTo(_this.current, 1000, false);
			})
			$('.contentbox-container-main .circle2').on('click', function(){
				location.href = "http://job.rhcncpa.com/ambplan";
			})
		}
	}

	new XXY()
})
