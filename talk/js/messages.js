$(function(){
    var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var touchstart = mobile ? "touchstart" : "mousedown";
    var touchend = mobile ? "touchend" : "mouseup";
    var touchmove = mobile ? "touchmove" : "mousemove";
    var tap = mobile ? "tap" : "click";

    //阻止屏幕滑动
    $('html,body').on(touchmove,function(e){
        e.preventDefault()
    });

    var loadingPath='images/';
    var stageH=$(window).height();
    var stageW=$(window).width();
    var motionObj = new TimelineMax();
    //初始化音乐
    var _music;
    function intsound(){
        var sounds = [
            {src: "bg1.mp3", id: 1},
            {src: "sou1.mp3", id: 2}
        ];
        createjs.Sound.alternateExtensions = ["ogg"];
        createjs.Sound.registerSounds(sounds, loadingPath);
    }
    intsound();

    //初始化阻止屏幕双击，当有表单页的时候，要关闭阻止事件，否则不能输入文字了，请传入false值，再次运行即可
    initPreventPageDobuleTap(true);
    initPageMotion();

    //初始化动画
    function initPageMotion(){
        motionObj.add(TweenMax.from('.blood',1, { alpha: 0, scale:0, ease:Bounce.easeOut}));
        motionObj.add(TweenMax.from('.pt1',.5, { alpha: 0, scale:0, ease:Back.easeOut}));
        motionObj.add(TweenMax.from('.pt2',.5, {alpha: 0, scale:0, ease:Back.easeOut}));
        motionObj.add(TweenMax.from('.pt3',.5, {alpha: 0, scale:0, ease:Back.easeOut}));
        motionObj.pause();

        $(".main").fadeIn(300,function(){
            $('.longpage').show();
            messages1();
        });
    }
    //播放消息声音
    function playmessagesSound(){
        _music = createjs.Sound.play('1');
        _music.volume = 0.1;
    }

    var _DIST = 0
    var _space = stageH/2-520;
    var _space2 = 0;
    var _timer;
    var msgID;
    var dist;
    //显示消息1
    function messages1(){
        msgID=1;
        dist = 0;
        _timer = setInterval(setMS1,1500)
    }
    //显示消息2
    //function messages2(){
    //    msgID=12;
    //    clearInterval(_timer);
    //    _timer = setInterval(setMS2,1500)
    //}

    function setMS1(){
        if(msgID<=13){
            $('#msg'+msgID).fadeIn();

            if(msgID == 3){
                clearInterval(_timer);
                _timer = setInterval(setMS1,2500)
            }
            if(msgID == 5){
                TweenMax.to($(".longpage>div").not($('.di')), .5, { css: {'top': dist-80 + 'px'}, ease: Linear.easeNone });
                dist += -80;
            }
            if(msgID == 6){
                TweenMax.to($(".longpage>div").not($('.di')), .5, { css: {'top': dist-200 + 'px'}, ease: Linear.easeNone });
                dist += -200;
            }
            if(msgID == 7){
                TweenMax.to($(".longpage>div").not($('.di')), .5, { css: {'top': dist-130 + 'px'}, ease: Linear.easeNone });
                dist += -130;
            }
            if(msgID == 8){
                TweenMax.to($(".longpage>div").not($('.di')), .5, { css: {'top': dist-190 + 'px'}, ease: Linear.easeNone });
                dist += -190;
            }
            if(msgID == 9){
                TweenMax.to($(".longpage>div").not($('.di')), .5, { css: {'top': dist-140 + 'px'}, ease: Linear.easeNone });
                dist += -140;
            }
            if(msgID == 10){
                TweenMax.to($(".longpage>div").not($('.di')), .5, { css: {'top': dist-160 + 'px'}, ease: Linear.easeNone });
                dist += -160;
                //playmessagesSound();
            }
            if(msgID == 11){
                TweenMax.to($(".longpage>div").not($('.di')), .5, { css: {'top': dist-160 + 'px'}, ease: Linear.easeNone });
                dist += -160;
                //playmessagesSound();
            }
            if(msgID == 12){
                TweenMax.to($(".longpage>div").not($('.di')), .5, { css: {'top': dist-180 + 'px'}, ease: Linear.easeNone });
                dist += -180;
                setTimeout(function(){
                    playMessageVoice();
                    zhendong(2000);
                },500)
            }
            if(msgID == 13){
                //playmessagesSound();
                TweenMax.to($(".longpage>div").not($('.di')), .5, { css: {'top': dist-240 + 'px'}, ease: Linear.easeNone });
                dist += -240;
            }
        }else{
            clearInterval(_timer);
        }
        msgID++;
    }
    //
    //function setMS2(){
    //    if(msgID<=15){
    //        $('#msg'+msgID).fadeIn();
    //        if(msgID == 14){
    //            playmessagesSound();
    //            TweenMax.to($(".longpage>div").not($('.di')), .5, { css: {'top': dist-150 + 'px'}, ease: Linear.easeNone });
    //            dist += -150;
    //        }
    //        if(msgID == 15){
    //            playmessagesSound();
    //            TweenMax.to($(".longpage>div").not($('.di')), .5, { css: {'top': dist-150 + 'px'}, ease: Linear.easeNone });
    //            dist += -150;
    //        }
    //    }else{
    //        clearInterval(_timer);
    //    }
    //    msgID++;
    //}

    //阻止屏幕双击以后向上位移,当有表单页的时候，要关闭阻止事件，否则不能输入文字了
    function initPreventPageDobuleTap(isPreventPageDobuleTap){
        if(isPreventPageDobuleTap){
            $('.page').on(touchstart,function(e){
                e.preventDefault();
            })
        }else{
            $('.page').off(touchstart);
        }
    }

    $('#msg13').one(touchstart, function(){
        $('#toupiao').fadeIn(function(){
            motionObj.play();
        });
    })

    var choiceArray = ['野生迅猛，稳扎足迹','金色棱角，外放严谨','脑洞打开，互联思维','融合大众，年轻活力'];
    var yourChoice;
    $('.tp1,.tp2,.tp3,.tp4').on(touchstart, function(){
        console.log(choiceArray[this.className.charAt(2)-1]);
		var tempNum = this.className.charAt(2);
        $('#resule'+tempNum).fadeIn();
		//$.ajax({
		//	type: 'post',
		//	url: '/leos/webapp/Index/save.html',
		//	data: {seloption:tempNum},
		//	async: false,
		//	dataType: 'json',
		//	success: function (data) {
        //
		//		yourChoice = choiceArray[tempNum-1];
		//		$('#toupiao').fadeOut();
        //
		//		//messages2();
		//	}
		//})
    })

    var _voice;
    //播放语音：
    function playMessageVoice(){
        $('#msg12 .point').hide();
        $('#msg12 .voice>img').attr('src',loadingPath+'voice.gif');
        _voice = createjs.Sound.play('2');
        _voice.addEventListener("complete", handleClick);
    }
    //监听事件：
    function handleClick(event) {
        $('#msg12 .voice>img').attr('src',loadingPath+'voice.jpg');
        _voice.removeEventListener("complete");
    }
    //震动：
    function zhendong(s){

        navigator.vibrate = navigator.vibrate ||
            navigator.webkitVibrate ||
            navigator.mozVibrate ||
            navigator.msVibrate;

        if (navigator.vibrate) {
            navigator.vibrate(s);//震动秒数
        }else if (navigator.webkitVibrate) {
            navigator.webkitVibrate(s);
        }
    }
});