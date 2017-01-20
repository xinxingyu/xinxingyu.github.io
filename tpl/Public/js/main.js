$(function(){
    var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var touchstart = mobile ? "touchstart" : "mousedown";
    var touchend = mobile ? "touchend" : "mouseup";
    var touchmove = mobile ? "touchmove" : "mousemove";

    //阻止屏幕滑动
    $('html,body').on(touchmove,function(e){
        e.preventDefault()
    })

    var stageW=$(window).width();
    var stageH=$(window).height();
    var allowMove=true;
    var musicFirst=true;
    var firstClassName=$('.page>div:first-of-type').attr('class');
    var finalClassName=$('.page>div:last-of-type').attr('class');
    var motionObj = {};
    var allowUserMove=true;
    var nextPageClassName='';

    //可调节的参数
    var loadingPath='../Public/images/';
    //var loadingPath='/home/Tpl/Public/images/';
    var musicPath='';//是否含有背景音乐，有就传路径，没有就为'';
    //var musicPath=loadingPath+'bg.mp3';//是否含有背景音乐，有就传路径，没有就为'';
    var isLoop=false;//页面是否可以循环滑动
    var pageMoveTimer=0.8;//页面滑动时间，不建议修改
    var backTimer=0.3;//内容动画开始倒退的时间,不建议修改
    var manifest=[
        //{src:loadingPath+'guide.png'},
        //{src:loadingPath+'loading.png'},
        //{src:loadingPath+'logo.png'},
        //{src:loadingPath+'musicicon.png'},
        //{src:loadingPath+'p1_1.png'},
        //{src:loadingPath+'p1_2.png'},
        //{src:loadingPath+'p1.jpg'},
        //{src:loadingPath+'sharepop.png'},

    ]
    //可调节的参数

    //定义时间动画，取决于页面的多少，动态增加，不用管
    $('.page>div').each(function(i){
        motionObj["page"+(i+1)] = new TimelineMax();
    })

    //初始化音乐，如果musicPath=''，相当于什么都没做
    initMusic();

    //初始化阻止屏幕双击，当有表单页的时候，要关闭阻止事件，否则不能输入文字了，请传入false值，再次运行即可
    initPreventPageDobuleTap(true);

    //loading
    function handleOverallProgress(event){
        $('.loadingtxt').text(Math.ceil(event.loaded*100)+"%");
    }
    function handleOverallComplete(event){
        $('.loading').remove();
        initPageMotion();
    }
    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("progress", handleOverallProgress);
    loader.addEventListener("complete", handleOverallComplete);
    loader.setMaxConnections(1);
    loader.loadManifest(manifest);
    //loading

    //滑动事件
    var hammertime = new Hammer(document.getElementById('page'), {
        preventDefault: true
    });
    hammertime.on('panmove', function(ev) {
        if(allowMove && allowUserMove){
            if(ev.direction==8){
                //向上滑动
                if($('.page>div').eq(1).attr('class')!=firstClassName || isLoop){
                    pageMove(-1)
                }
            }else if(ev.direction==16){
                //向下滑动
                if($('.page>div:last-of-type').attr('class')!=finalClassName){
                    pageMove(1)
                }
            }
        }
    });
    hammertime.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
    //滑动事件

    //初始化动画
    function initPageMotion(){
        /*自定义动画*/

        //motionObj['page'+1].add(TweenMax.from('.page1_1', 1, { alpha: 0, delay:pageMoveTimer-backTimer, ease:Linear.easeNone}));
        //motionObj['page'+1].add(TweenMax.from('.page1_2', 0.5, { scaleX: 0,scaleY: 0 ,ease:Expo.easeOut}));
        //motionObj['page'+1].pause();

        /*自定义动画*/

        if($('.page>div').eq(0).attr('move')=='0'){
            initAllowUserMove(false);
        }

        $(".main").fadeIn(500,function(){
            motionObj['page'+1].play();
        });
    }
    //初始化动画
    // $('.page3_4').on(touchstart,function(){
    //     pageMove(-1);
    // });

    //滑动页面核心内容
    function pageMove(direction){
        allowMove = false
        var targetTop=stageH*direction;
        nextPageClassName=$('.page>div').eq(1).attr('class');
        var pageMove=$('.page>div').eq(1).attr('move');
        if(direction==1){
            $('.page>div:first-of-type').before($('.page>div:last-of-type'))
            TweenMax.set('.page',{top:-targetTop})
            nextPageClassName=$('.page>div').eq(0).attr('class');
            pageMove=$('.page>div').eq(0).attr('move');
            targetTop=0;
        }
        TweenMax.to('.page', pageMoveTimer, {top: targetTop, ease: Expo.easeInOut, onComplete: function () {
            TweenMax.set('.page',{top:0});
            if(direction==-1){
                $('.page').append($('.page>div:first-of-type'))
            }
            allowMove = true;
        }})
        if(pageMove=='0'){
            initAllowUserMove(false);
        }
        motionObj[nextPageClassName].restart();
    }
    //滑动页面核心内容

    //阻止屏幕双击以后向上位移
    //当有表单页的时候，要关闭阻止事件，否则不能输入文字了
    function initPreventPageDobuleTap(isPreventPageDobuleTap){
        if(isPreventPageDobuleTap){
            $('.page').on(touchstart,function(e){
                e.preventDefault()
                if(musicFirst && musicPath!=''){
                    musicFirst=false;
                    var mySound = $('#media')[0];
                    mySound.play();
                }
            })
        }else{
            $('.page').off(touchstart);
        }
    }
    //阻止屏幕双击以后向上位移

    //是否允许用户滑动页面
    function initAllowUserMove(isMove){
        allowUserMove=isMove;
        if(allowUserMove){
            $('.guideTop').show();
        }else{
            $('.guideTop').hide();
        }
    }
    //是否允许用户滑动页面

    //初始化音乐，如果musicPath=''，相当于什么都没做
    function initMusic(){
        if(musicPath!=''){
            $('.main').append('<div class="musicicon musicrotate"></div><audio id="media" loop autoplay="autoplay" src="'+musicPath+'"></audio>');
            $('.musicicon').on(touchstart,function(){
                var mySound = $('#media')[0];
                if($(this).hasClass('musicrotate')){
                    mySound.pause();
                    $(this).removeClass('musicrotate');
                }else{
                    mySound.play();
                    $(this).addClass('musicrotate');
                }
            })
        }
    }
    //初始化音乐，如果musicPath=''，相当于什么都没做

    //关闭浮层
    $('.sharemask').on(touchstart,function(){
        $(this).hide();
    })
})


