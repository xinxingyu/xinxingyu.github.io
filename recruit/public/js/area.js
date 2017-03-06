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

			$('.main .title').on('click', function(e){
				var dom = e.target.nodeName == 'P' ? $(e.target).parent()[0] : $(e.target)[0];
				var isActive = parseInt($(dom).attr('data-active'));
				if(isActive){

				}else{
					clear()
					var _li = $(dom).parent()[0]
					$(_li).addClass('active')
					$(dom).attr('data-active', 1)
				}
			})
			$('.bt-return').on('click', function(){
				window.history.go(-1);
			});
			function clear(){
				var domList = $('.main .panel').find('li');

				for(var i = 0; i<domList.length; i++){
					var li = $(domList[i]);

					$(li).removeClass('active');
					$($(li).find('.title')[0]).attr('data-active', 0)

				}
			};

			/**
			 * 走上人生巅峰，快来报名吧
			 */
			$('.bt-go').on('click', function(){
				location.href="http://job.rhcncpa.com/Portal/Resume/ResumeItem?jid=560055480&stepId=0&sId=0&r=/jobdetail/560055480";
			});
		}
	}

	new XXY()
})
