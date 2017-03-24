/**
 * author: xinxingyu
 * time: 2017/03/23
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
		this.sinup = '';
		this.submitsObj = '';
		this.canSubmit = true; //judge whether or not submit
		this.timer1 = '';
		this.timer2 = '';

		this.init()
	}

	XXY.prototype = {
		init: function(){
			var _this = this;
			this.initView();
			this.initAnimation();
			this.initLoading();
			this.bindEvent();
		},
		initView: function(){
			if(totalNumber >= targetNumber){
				this.canSubmit = false;
				$('.page3_5').css({'background': 'url("'+this.loadingPath+'p3_5_no.png")'})
			}
		},
		initLoading: function(){
			var _this = this,
				loader = new createjs.LoadQueue(false),
				manifest = [
					{src:this.loadingPath+'loadingprocess1.png'},
					{src:this.loadingPath+'loadingprocess2.png'},
					{src:this.loadingPath+'loadingprocess3.png'},
					{src:this.loadingPath+'loadingprocess4.png'},
					{src:this.loadingPath+'loadingprocess5.png'},
					{src:this.loadingPath+'musicicon.png'},
					{src:this.loadingPath+'musiciconclose.png'},
					{src:this.loadingPath+'p1_1.png'},
					{src:this.loadingPath+'p1_2.png'},
					{src:this.loadingPath+'p2_1.png'},
					{src:this.loadingPath+'p2_2.png'},
					{src:this.loadingPath+'p2_4.png'},
					{src:this.loadingPath+'p2_5.png'},
					{src:this.loadingPath+'p3_2.png'},
					{src:this.loadingPath+'p3_3.png'},
					{src:this.loadingPath+'p3_5.png'},
					{src:this.loadingPath+'p4_1.png'},
					{src:this.loadingPath+'p4_2.png'},
					{src:this.loadingPath+'p6_3.png'},
					{src:this.loadingPath+'p6_4.png'},
					{src:this.loadingPath+'p6_5.png'},
					{src:this.loadingPath+'p6_6.png'},
					{src:this.loadingPath+'p1.jpg'},
					{src:this.loadingPath+'p2.jpg'},
					{src:this.loadingPath+'p3.jpg'},
					{src:this.loadingPath+'p4.jpg'},
					{src:this.loadingPath+'p6.jpg'}
				];

			//initLoadingAnimation
			var timer = this.runAnimation('.loadingicon');

			function handleOverallProgress(event){
				var process = Math.ceil(event.loaded*100);

				$('.loadingtxt').text(Math.ceil(event.loaded*100) + '%');
				$('.pro').css({'width': process + '%'});
				$('.loadingicon').css({'transform': 'translate3d('+process/100*465+'px,0,0)', '-webkit-transform': 'translate3d('+process/100*465+'px,0,0)'});
			}
			function handleOverallComplete(event){
				$('.loading').remove();
				//clear the loading interval
				clearInterval(timer);

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

			this.motionObj['page'+1].add(TweenMax.from('.page1_1', .5, {delay: .1, scale: 0, ease:Bounce.easeOut}));
			this.motionObj['page'+1].add(TweenMax.from('.page1_2', .3, {x: -600, ease:Linear.easeOut}));
			this.motionObj['page'+1].add(TweenMax.from('.page1_3', .5, {delay: .2, width: 0,ease:Linear.easeOut}));
			this.motionObj['page'+1].pause();

			this.motionObj['page'+2].add(TweenMax.from('.page2_1', .4, {delay: .1, alpha:0, y: -100, ease:Linear.easeOut, onComplete: function(){
				_this.shakeAnimation('.page2_1');
			}}));
			this.motionObj['page'+2].add(TweenMax.from('.page2_2', .5, {delay: .1, alpha:0, y: -100, ease:Linear.easeOut, onComplete: function(){
				_this.shakeAnimation('.page2_2');
			}}));
			this.motionObj['page'+2].add(TweenMax.from('.page2_3', .5, {delay: .3, alpha:0, y: -200, ease:Linear.easeNone,onComplete:function(){
				TweenMax.fromTo('.page2_3', .5, {rotation:8, yoyo:true, repeat:-1, ease:Linear.easeOut}, {rotation:-8,yoyo:true, repeat:-1, ease:Linear.easeOut});
			}}));
			this.motionObj['page'+2].pause();

			this.motionObj['page'+3].add(TweenMax.from('.page3_5', .4, {delay: .5, width: 0,ease:Linear.easeOut}));
			this.motionObj['page'+3].pause();

			this.motionObj['page'+4].add(TweenMax.from('.page4_1', .4, {delay: .5, width: 0,ease:Linear.easeOut}));
			this.motionObj['page'+4].add(TweenMax.from('.page4_2', .4, {delay: .2, width: 0,ease:Linear.easeOut}));
			this.motionObj['page'+4].pause();

			this.motionObj['page'+6].add(TweenMax.from('.page6_1', .4, {delay: .5, width: 0,ease:Linear.easeOut}));
			this.motionObj['page'+6].add(TweenMax.from('.page6_6_c', .4, {delay: .3, width: 0,ease:Linear.easeOut}));
			this.motionObj['page'+6].pause();
		},
		initSwiper: function(){
			var _this = this;

			this.swiper = new Swiper('#main', {
				direction : 'vertical',
				onSetTransition: function(swiper){
		            var index = swiper.activeIndex + 1;
					if(_this.current != swiper.activeIndex){
						_this.motionObj['page'+index].restart();
					}
					_this.current = swiper.activeIndex;

					if(index < 3){
						$('.guideTop').show()
					}else{
						$('.guideTop').hide()
					}
		        }
			})
		},
		runAnimation: function(dom){
			var i = 1,
				_this = this;

			return setInterval(function(){
				i++;
				if(i>5){ i = 1; }
				$(dom).css({'background': 'url("'+_this.loadingPath+'loadingprocess'+i+'.png") no-repeat'})
			},150)
		},
		shakeAnimation: function(dom){
			TweenMax.to(dom, .1, {delay: .2, rotation:6, ease:Linear.easeOut});
			TweenMax.to(dom, .1, {delay: .3, rotation:0, ease:Linear.easeOut});
			TweenMax.to(dom, .1, {delay: .4, rotation:6, ease:Linear.easeOut});
			TweenMax.to(dom, .1, {delay: .5, rotation:0, ease:Linear.easeOut});
		},
		playMusic: function(){
			this.audio.play()
		},
		pauseMusic: function(){
			this.audio.pause()
		},
		/**
		 * get every input's value to set into object( this.submitsObj )
		 */
		getFormItemValue: function(){
			this.submitsObj = {
				name: $('#name').val(),
				sex: $('#sex').val(),
				age: $('#age').val(),
				phone: $('#phone').val(),
				email: $('#email').val(),
				company: $('#company').val(),
				sinupType: this.sinup
			}
		},
		/**
		 * validate information
		 */
		validate: function(){
			var strReg = /^[\u4E00-\u9FA5A-Za-z]+$/,
				phoneReg = /^1[34578]\d{9}$/,
				emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
				sexArray = ['男', '女'];

			if(!strReg.test($('#name').val())){
				alert('请输入正确的姓名！')
				return false;
			}else if(sexArray.indexOf($('#sex').val()) < 0){
				alert('请输入正确的性别！')
				return false;
			}else if(isNaN($('#age').val())){
				alert('请输入正确的年龄！')
				return false;
			}else if(!phoneReg.test($('#phone').val())){
				alert('请输入正确的手机号！')
				return false;
			}else if(!emailReg.test($('#email').val())){
				alert('请输入正确的邮箱！')
				return false;
			}else if(!strReg.test($('#company').val())){
				alert('请输入正确的单位！')
				return false;
			}

			return true;
		},
		bindEvent: function(){
			var _this = this;

			$('.page1_3').on(touchstart, function(e){
				_this.swiper.slideTo(1, 300, false);
			})
			$('.page3_5').on(touchstart, function(e){
				if(_this.canSubmit){
					_this.swiper.slideTo(3, 300, false);
				}
			})
			$('.page4_1').on(touchstart, function(e){
				_this.sinup = 1;
				_this.swiper.slideTo(4, 300, false);
			})
			$('.page4_2').on(touchstart, function(e){
				_this.sinup = 2;
				_this.swiper.slideTo(4, 300, false);
			})
			/**
			 * sign up, submit your information to server
			 */
			$('.page5_3').on(touchstart, function(e){
				var timer;

				_this.getFormItemValue()
				/**
				 * validate information
				 */
				if(_this.validate()){
					submitInformation(_this.submitsObj,
						function(){
							timer = _this.runAnimation('.req-loading-icon');
							$('.req-loading').show();
						},
						function(process){
							$('.req-loading-text').text(process + '%');
							$('.reqpro').css({'width': process + '%'});
							$('.req-loading-icon').css({'transform': 'translate3d('+process/100*465+'px,0,0)', '-webkit-transform': 'translate3d('+process/100*465+'px,0,0)'});
						},
						function(){
							$('.req-loading').fadeOut();
							clearInterval(timer)
							_this.swiper.slideTo(5, 300, false);
						}
					);
					//fill information to page 6
					$('.page6_2 .username').text(_this.submitsObj.name);
					$('.page6_2 .companyname').text(_this.submitsObj.company);
				}
			})
			$('.page6_6').on(touchstart, function(e){
				$('.sharemask').show();
			})
			$('.sharemask').on(touchstart, function(e){
				$('.sharemask').hide();
			})
			$('.musicicon').on('click', function(e){
				if(!_this.audio.paused){
					$('.musicicon').css({'background': 'url("'+_this.loadingPath+'musiciconclose.png")'})
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
