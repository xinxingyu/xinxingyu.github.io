/**
 * author: xinxingyu
 * tim: 2018/11/17
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
        this.activitySwiper = '';
        this.audio = $('#media')[0];
        this.height = $(window).height();
        // this.audio = document.getElementById('media');
        this.current = 0;
        this.activityCurrent = 0;
        this._tim = '';
        this.init()

    }

    XXY.prototype = {
        init: function(){
            var _this = this;
            console.log(11, this.height)
            this.initAnimation();
            this.initLoading();
            this.bindEvent();
        },
        initLoading: function(){
            var _this = this,
                loader = new createjs.LoadQueue(false),
                manifest = [
                    {src:this.loadingPath+'logo.png'},
                    {src:this.loadingPath+'guide.png'},
                    {src:this.loadingPath+'p1.jpg'},
                    {src:this.loadingPath+'ap1.jpg'},
                    {src:this.loadingPath+'p4.jpg'},
                    {src:this.loadingPath+'p2_bg1.png'},
                    {src:this.loadingPath+'p2_bg2.png'},
                ];

            function handleOverallProgress(event){
                $('.loadingtxt').text(Math.ceil(event.loaded*100) + '%');
            }
            function handleOverallComplete(event){
                $('.loading').remove();
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

            for(var i = 0; i < 3; i++){
                this.motionObj["page"+(i+1)] = new TimelineMax();
            }

            this.motionObj['page' + 1].add(TweenMax.from('.page1_1', .5, { delay: .2, alpha: 0.5, y: -120, ease: Bounce.easeOut}));
            this.motionObj['page'+1].pause();

            this.motionObj['page' + 2].add([
                TweenMax.from('.page2_1', .5, { delay: .2, alpha: 0, x: -100, ease: Linear.easeOut }),
                TweenMax.from('.page2_2', .5, { delay: .2, alpha: 0, x: 100, ease: Linear.easeOut }),
                TweenMax.from('.page2_desc', .4, { delay: .3, alpha: 0, y: 50, ease: Linear.easeOut })
            ]);
            this.motionObj['page'+2].pause();

            this.motionObj['page' + 3].add(TweenMax.from('.page3_1', .3, { delay: .2, alpha: 0, x: 100, ease:Linear.easeNone}));
            this.motionObj['page'+3].add(TweenMax.from('.page3_2', .3, {alpha:0, x: 100, ease:Linear.easeNone}));
            this.motionObj['page' + 3].add(TweenMax.from('.page3_3', .3, { alpha: 0, y: 100, ease: Bounce.easeOut}));
            this.motionObj['page'+3].pause();

            // activeity swiper anmation
            for (var i = 0; i < 4; i++) {
                this.motionObj['actpage' + (i + 1)] = new TimelineMax();
            }

            this.motionObj['actpage' + 1].add(TweenMax.from('.actpage1_3', .5, {delay: .2, alpha: 0, scale: 0.2, ease: Linear.easeOut }));
            this.motionObj['actpage' + 1].add(TweenMax.from('.actpage1_2', .3, { alpha: 0, y: 50, x: -200, ease: Bounce.easeOut }));
            this.motionObj['actpage' + 1].add(TweenMax.from('.actpage1_1', .3, {alpha: 0, y: -50, x: 200, ease: Bounce.easeOut }));
            this.motionObj['actpage' + 1].pause();

            this.motionObj['actpage' + 2].add([
                TweenMax.to('.actpage2_1', .7, {delay: .2, scale: 1.2, ease: Linear.easeOut }),
                TweenMax.to('.actpage2_2', .7, {delay: .2,  scale: 1.2, ease: Linear.easeOut })
            ]);
            this.motionObj['actpage' + 2].add(TweenMax.from('.actpage2_3', .5, {alpha: 0, y: 50, x: -200, ease: Bounce.easeOut }));
            this.motionObj['actpage' + 2].add(TweenMax.from('.actpage2_4', .5, {alpha: 0, y: -50, x: 200, ease: Bounce.easeOut }));
            this.motionObj['actpage' + 2].pause();

            this.motionObj['actpage' + 3].add([
                TweenMax.from('.actpage3_1', .5, { delay: .2, alpha: 0, y: 50, x: -200, ease: Bounce.easeOut}),
                TweenMax.from('.actpage3_2', .5, { delay: .2, alpha: 0, y: -50, x: 200, ease: Bounce.easeOut })
            ]);
            this.motionObj['actpage' + 3].add(TweenMax.from('.actpage3_3', .5, { alpha: 0, y: -50, x: 200, ease: Bounce.easeOut }));
            this.motionObj['actpage' + 3].pause();

            this.motionObj['actpage' + 4].add(TweenMax.from('.actpage4_1', .5, { delay: .2, alpha: 0, y: -50, x: -200, ease: Bounce.easeOut }));
            this.motionObj['actpage' + 4].add(TweenMax.from('.actpage4_2', .5, { alpha: 0, y: 50, x: 200, ease: Bounce.easeOut }));
            this.motionObj['actpage' + 4].add(TweenMax.from('.actpage4_3', .5, { alpha: 0, y: 50, x: 200, ease: Bounce.easeOut }));
            this.motionObj['actpage' + 4].pause();
        },
        initSwiper: function(){
            var _this = this;

            this.swiper = new Swiper('#main', {
                direction : 'vertical',
                // speed: 800,
                onSetTransition: function(swiper){
                    var index = swiper.activeIndex + 1;
                    if(_this.current != swiper.activeIndex){
                        _this.motionObj['page'+index].restart();
                    }
                    _this.current = swiper.activeIndex;

                    if(index == 3){
                        $('.guideTop').hide()
                    }else{
                        $('.guideTop').show()
                    }
                }
            })
        },
        initActivitySwiper: function () {
            var _this = this;
            $('.guideTop2').show();

            this.activitySwiper = new Swiper('#activity', {
              direction: 'vertical',
              // speed: 800,
              onSetTransition: function(swiper) {
                var index = swiper.activeIndex + 1;
                if (_this.activityCurrent != swiper.activeIndex) {
                    _this.motionObj['actpage' + index].restart();
                }
                  _this.activityCurrent = swiper.activeIndex;
              },
              onTouchEnd: function(swiper) {
                TR = swiper.translate;
                if (TR > 0) {
                    swiper.setWrapperTranslate(TR);
                    $('.guideTop2').hide();
                    $('#activity').fadeOut(function() {
                        // reverse activity animation
                        _this.reverseActivityAnimation()
                    });
                } else if (TR < _this.height * -3) {
                    _this.swiper.slideTo(2, 0, false);
                    $('#activity').fadeOut(function() {
                        swiper.slideTo(0, 0, false);
                        _this.reverseActivityAnimation();
                    });
                }
              }
            });
        },
        reverseActivityAnimation: function() {
            for (var i = 0; i < 4; i++) {
                this.motionObj['actpage' + (i + 1)].reverse()
            }
        },
        playMusic: function(){
            // this.audio.play()
            document.getElementById('media').play()
        },
        pauseMusic: function(){
            this.audio.pause()
        },
        bindEvent: function(){
            var _this = this;
            var optList = $('.university-operate .opt-it');
            var uitList = $('.university_3 .university-item');

            // start activity swiper
            $('.page2_5').on('click', function(e) {
                $('#activity').fadeIn(function () {
                    _this.initActivitySwiper();
                    _this.motionObj['actpage' + 1].restart();
                });
            });

            $('.page2_3').on('click', function(e) {
                $('.university').fadeIn();
            });
            
            $('.page3_3').on('click', function(e) {
                window.location = 'http://mjob.rhcncpa.com/#/jobdetail?id=560168460&jc=3';
            });

            $('.university-operate .opt-it').on('click', function(e){
                var id = $(e.target).attr('data-id');

                /**
                 * remove all operate button's active status
                 */
                for(var i = 0; i < optList.length; i++){
                    $(optList[i]).removeClass('active')
                }
                /**
                 * add active class to target operate button
                 */
                $(e.target).addClass('active');

                for(var i = 0; i < uitList.length; i++){
                    $(uitList[i]).hide()
                }
                $('.university_3 .uit' + id).show();
                TweenMax.from('.university_3 .uit'+id, .3, {alpha: 0, y: 100, ease: Linear.easeNone})
            });

            $('.page7_6').on('click', function(e){
                location.href = 'http://mjob.rhcncpa.com/JobAd/ApplyResume?adid=560055480';
            })
            $('.page5_8').on('click', function(e){
                _this.current ++;
                _this.swiper.slideTo(_this.current, 300, false);
            })
            $('.musicicon').on('click', function(e){
                if(!_this.audio.paused){
                    $('.musicicon').css({'background': 'url("'+_this.loadingPath+'musicicon_close.png")'})
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
