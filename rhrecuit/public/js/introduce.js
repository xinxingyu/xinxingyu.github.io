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
				window.history.go(-1);
			})
		}
	}

	new XXY()
})
