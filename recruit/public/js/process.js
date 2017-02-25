$(function(){
	var XXY = function(){
		this.status = false;
		this.init()
	}

	XXY.prototype = {
		init: function(){
			this.bindEvent();
		},
		bindEvent: function(){
			var _this = this;

			$('.bt-sao').on('click', function(){
				if(_this.status){
					$('.bt-ma').hide()
				}else{
					$('.bt-ma').show()
				}
				_this.status = !_this.status;
			})
			$('.bt-ma').on('click', function(){
				_this.status = false;
				$(this).hide()
			})
			$('.bt-reward').on('click', function(){
				location.href = 'reward.html'
			})
			$('.bt-process').on('click', function(){
				location.href = 'process.html'
			})
			$('.bt-itesyou').on('click', function(){
				location.href = 'itsyou.html'
			})
			$('.logo').on('click', function(){
				location.href = 'index.html'
			})
		}
	}

	new XXY()
})
