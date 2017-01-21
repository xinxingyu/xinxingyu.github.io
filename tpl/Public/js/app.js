$(function(){
	var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
	var touchstart = mobile ? "touchstart" : "mousedown";
	var touchend = mobile ? "touchend" : "mouseup";
	var touchmove = mobile ? "touchmove" : "mousemove";
	window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
    console.log("错误信息：" , errorMessage);
    console.log("出错文件：" , scriptURI);
    console.log("出错行号：" , lineNumber);
    console.log("出错列号：" , columnNumber);
    console.log("错误详情：" , errorObj);
  }
	var vue = new Vue({
		el: '#wrapper',
		data: {
			loadingPath: '../Public/images/',
			motionObj: [],
			currentPageNum: 0,
			questions: getArrayItems(Questions, 10),
			answer: [],
			score: 0, //final score
			timer: '',
			time: 5,
			audio: ''
		},
		created: function(){
			this.initAnswer()
		},
		mounted: function(){
			this.init()
		},
		methods: {
			init: function(){
			    //阻止屏幕滑动
			    $('html,body').on(touchmove,function(e){
			        e.preventDefault()
			    })
				this.audio = $('#media')[0];
				this.initLoading();
				this.initAnimation();
			},
			initAnswer: function(){
				for(var i = 0; i < 10; i++){
					this.answer[i] = {
						isTrue: false,
						isAnswer: false
					}
					// this.answer.push(1)
					// this.answer[i] = {};
					// this.$set(this.answer[i], 'isTrue', false)
					// this.$set(this.answer[i], 'isAnswer', false)
				}
			},
			initLoading: function(){
				var _this = this,
					loader = new createjs.LoadQueue(false),
					manifest = [
						{src:this.loadingPath+'loading.png'},
						{src:this.loadingPath+'loading_border.png'},
						{src:this.loadingPath+'p1.jpg'},
						{src:this.loadingPath+'p1_1.png'},
						{src:this.loadingPath+'p1_2.png'},
						{src:this.loadingPath+'p1_4.png'},
						{src:this.loadingPath+'p1_3_close.png'},
						{src:this.loadingPath+'p1_3_open.png'},
						{src:this.loadingPath+'yes.png'},
						{src:this.loadingPath+'no.png'},
						{src:this.loadingPath+'choice_bg.png'},
						{src:this.loadingPath+'A.png'},
						{src:this.loadingPath+'B.png'},
						{src:this.loadingPath+'C.png'},
						{src:this.loadingPath+'D.png'},
						{src:this.loadingPath+'clock.png'},
						{src:this.loadingPath+'musicicon.png'},
						{src:this.loadingPath+'B.png'},
						{src:this.loadingPath+'tips.png'},
						{src:this.loadingPath+'result1.png'},
						{src:this.loadingPath+'result2.png'},
						{src:this.loadingPath+'result3.png'},
						{src:this.loadingPath+'result4.png'},
						{src:this.loadingPath+'result5.png'}
					];

				function handleOverallProgress(event){
					var length = Math.ceil(event.loaded*100) * 3.9 + 'px';
					$('.progress').css('width', length);
				}
				function handleOverallComplete(event){
				   $('.loading').remove();
				   $('.main').fadeIn(function(){
						_this.pageswitch()
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

				// $('.page>div').each(function(i){
				// 	_this.motionObj["page"+(i+1)] = new TimelineMax();
				// })
				for(var i = 0; i < 20; i++){
					this.motionObj["page"+(i+1)] = new TimelineMax();
				}
				this.motionObj['page'+1].add(TweenMax.from('.page1_1', .5, { alpha: 0, ease:Linear.easeNone}));
		        this.motionObj['page'+1].add(TweenMax.from('.page1_2', 0.2, {alpha:0, ease:Linear.easeNone}));
		        this.motionObj['page'+1].add(TweenMax.fromTo('.page1_2', 0.1, {yoyo: true, repeat: -1, rotation: 5 ,ease:Linear.easeNone}, {yoyo: true, repeat: -1, rotation: -5 ,ease:Linear.easeNonet}));
		        this.motionObj['page'+1].pause();
				for(var j = 2; j < 12; j++){
					this.motionObj['page'+j].add(TweenMax.from('.page'+j, .3, { alpha: 0, scale:.2, ease:Linear.easeOut}));
			        this.motionObj['page'+j].pause();
				}
				this.motionObj['page'+12].add(TweenMax.from('.page12', .3, {alpha: 0, scale:.2, ease:Linear.easeOut}));
		        this.motionObj['page'+12].add(TweenMax.to('.page12_content', 1.2, { delay: .3, y: -620 ,ease:Bounce.easeOut}));
		        this.motionObj['page'+12].add(TweenMax.from('.page12-result', .3, {alpha: 0, ease:Linear.easeNone}));
		        this.motionObj['page'+12].add(TweenMax.to('.page12-result', .3, {scale: 1.2,ease:Linear.easeNone}));
		        this.motionObj['page'+12].add(TweenMax.to('.page12-result', .3, {scale: 1,ease:Linear.easeNone}));
		        this.motionObj['page'+12].pause();
			},
			pageswitch: function(){
				this.currentPageNum ++;
				//begin count down
				if(this.currentPageNum>1 && this.currentPageNum<12){
					this.time = 5;
					this.countDown()
				}else if(this.currentPageNum == 12){
					$('.musicicon').fadeOut();
					this.pauseMusic();
					this.getResult();
				}

				$('.page'+this.currentPageNum).show();
				this.motionObj['page'+this.currentPageNum].restart();
			},
			closeEye: function(){
				var _this = this;
				$('.page1_3>img').attr('src', this.loadingPath + 'p1_3_close.png');
				setTimeout(function(){
					_this.pageswitch()
				},200)

			},
			choic: function(item, qt, index, key, e, type){
				e.stopPropagation();
				e.preventDefault();
				var dom = $('#'+index+key);
				var _this = this;
				if(this.answer[index].isAnswer){
					return
				}
				this.answer[index].isAnswer = true

				if(item.key == qt.isTrue){
					// if(type == 'img'){
					// 	this.handleShowForImg(e, '.yes')
					// }else{
					// 	this.handleShowForText(e, '.yes')
					// }
					this.handleShow(dom, '.yes')
					this.answer[index].isTrue = true
				}else{
					// if(type == 'img'){
					// 	this.handleShowForImg(e, '.no')
					// }else{
					// 	this.handleShowForText(e, '.no')
					// }
					this.handleShow(dom, '.no')
					this.answer[index].isTrue = false
				}

				setTimeout(function(){
					_this.clearCountDown();
					_this.pageswitch()
				}, 200);
			},
			handleShow: function(dom, cdom){
				$(dom).find('.mask').show();
				$(dom).find(cdom).show();
			},
			handleShowForImg: function(e, dom){
				// console.log(!this.answer[index].isAnswer);
				// return !this.answer[index].isAnswer
				$(e.path[1]).find('.mask').show();
				$(e.path[1]).find(dom).show();
			},
			handleShowForText: function(e, dom){
				var dt = e.path[2];
				if(dt.className == 'answer-text'){
					dt = e.path[1]
				}
				$(dt).find('.mask').show();
				$(dt).find(dom).show();
			},
			regbackground(url){
				return 'url('+ url+')';
			},
			resultBackground(url){
				var name = 'result' + Math.floor(parseInt(this.score)/2) + '.png';
				return 'url('+ this.loadingPath+name+')';
			},
			//倒计时
			countDown: function(){
				var _this = this;

				this.timer = setInterval(function(){
					_this.time --;
					TweenMax.fromTo('.clock', .3, { scale: 1.2, ease:Linear.easeOut},{ scale: 1, ease:Linear.easeOut})
					if(_this.time == 1){
						_this.clearCountDown();
						setTimeout(function(){
							_this.pageswitch();
						}, 1000)
					}
				}, 1000)
			},
			clearCountDown: function(){
				clearInterval(this.timer)
				this.timer = ''
			},
			share: function(){
				$('.sharemask').fadeIn();
			},
			hideShare: function(){
				$('.sharemask').fadeOut();
			},
			replay: function(){
				this.currentPageNum = 1;
				this.score = 0;
				this.initAnswer()
				$('.page>div').each(function(i, item){
					$(item).hide()
				})
				$('.page .mask').each(function(i, item){
					$(item).hide()
				})
				$('.page .yes').each(function(i, item){
					$(item).hide()
				})
				$('.page .no').each(function(i, item){
					$(item).hide()
				})
				$('.musicicon').fadeIn();
				this.pageswitch()
			},
			jump: function(){
				window.location.href='www.baidu.com';
			},
			showSurprise: function(){
				$('.surpriseMask').fadeIn()
			},
			hideSurprise: function(){
				$('.surpriseMask').fadeOut()
			},
			getResult: function(){
				for(var i = 0; i < this.answer.length; i++){
					if(this.answer[i].isTrue){
						this.score++;
					}
				}
			},
			operateMusic: function(){
				if(!this.audio.paused){
					$('.musicicon').css({'background': 'url("'+this.loadingPath+'musicicon_close.png")'})
					this.pauseMusic()
			   	}else{
					$('.musicicon').css({'background': 'url("'+this.loadingPath+'musicicon.png")'})
					this.playMusic()
				}
			},
			playMusic: function(){
				this.audio.play()
			},
			pauseMusic: function(){
				this.audio.pause()
			}
		}
	});


	/**
	 * get random questions
	 */
	function getArrayItems(arr, num) {
		var temp_array = new Array(),
			return_array = new Array();

		for(var index in arr){
			temp_array.push(arr[index]);
		}
		for(var i = 0; i<num; i++){
			if(temp_array.length>0){
				var arrIndex = Math.floor(Math.random()*temp_array.length);
				return_array[i] = temp_array[arrIndex];
				temp_array.splice(arrIndex, 1);
			}else{
				break;
			}
		}
		return return_array;
	}
})
