$(function(){
	var XXY = function(){
		this.init()
	}

	XXY.prototype = {
		init: function(){
			this.bindEvent();
		},
		bindEvent: function(){
			var _this = this;

			$('.goback').on('click', function(e){
				location.href = "index.html"
			});
			/**
			 * 大使风采
			 */
			$('.flt-btn1').on('click', function(e){
				$('html,body').animate({scrollTop: '0px'}, 800);
			});
			/**
			 * 精彩瞬间
			 */
			$('.flt-btn2').on('click', function(e){
				var dom = $('.exhibition')
				console.log(dom)
				$('html,body').animate({scrollTop: $('.intro').height()+'px'}, 800);
			});
		}
	}

	new XXY()
})
