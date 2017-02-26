/**
 * author: xinxingyu
 */
$(function(){
	var XXY = function(){
		this.loadingPath = '../public/images/index/';
		this.motionObj = new TimelineMax();
		this.pe = $(window).width()/3700;

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
				tyre2: {width: 445, left: 1452, bottom: 263},
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
					{src:this.loadingPath+'operate.png'}
				];

			function handleOverallProgress(event){}
			function handleOverallComplete(event){
			   $('.loading').remove();
			   $('.main').show();
			   _this.motionObj.restart();
			   _this.itemAnimation()
			   _this.item2Animation()
			//    $('.main').fadeIn(function(){
			// 	   	_this.motionObj.restart();
			// 		_this.itemAnimation()
			// 		_this.item2Animation()
			//    });

			}
			loader.addEventListener("progress", handleOverallProgress);
			loader.addEventListener("complete", handleOverallComplete);
			loader.setMaxConnections(1);
			loader.loadManifest(manifest);
		},
		initAnimation: function(){
			this.motionObj.add(TweenMax.from('.car', .5, {delay:.1,scale:.1, x:-400*this.pe, y:20*this.pe, ease:Linear.easeNone, onStart: this.changeTyre()}));
			this.motionObj.add(TweenMax.from('.smoke', .4, {delay:-.2, alpha:0, ease:Linear.easeNone}));
			this.motionObj.pause();
		},
		itemAnimation: function(){
			TweenMax.from('.pen', .5, {delay:.22, scale:.1, x:1200*this.pe, y:-650*this.pe, ease:Linear.easeNone})
			TweenMax.from('.keybord', .4, {delay:.1, scale:.1, x:900*this.pe, y:-100*this.pe, ease:Linear.easeNone});
			TweenMax.from('.computer', .5, {delay:.2, scale:.1, x:630*this.pe, y:-500*this.pe, ease:Linear.easeNone});

		},
		item2Animation: function(){
			TweenMax.from('.tips1', .5, {delay:.8, scale:.5, x:1500*this.pe, ease:Bounce.easeOut, onStart: this.changeTyre()})
			TweenMax.from('.tips2', .3, {delay:1.1, scale:.3, x:1060*this.pe, y:-10*this.pe, ease:Linear.easeNone});
			TweenMax.from('.book', .2, {delay:1.3, scale:.5, x:630*this.pe, y:-300*this.pe, ease:Linear.easeIn});
			TweenMax.from('.operate', .5, {delay:1.5, scale:0,  ease:Bounce.easeOut});
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
							clearInterval(_timer)
							return;
						}
						if(t==3){
							$('.tyre1, .tyre2, .tyre3').remove()
						}else{
							$('.car .tyre1').attr('src', _this.loadingPath+'tyre1_2.png')
							$('.car .tyre2').attr('src', _this.loadingPath+'tyre2_2.png')
							$('.car .tyre3').attr('src', _this.loadingPath+'tyre3_2.png')
						}
					}, 170)
			}
		},
		bindEvent: function(){
			$('.operate').on('click', function(){
				location.href="itsyou.html"
			})
		}
	}

	new XXY()
})
