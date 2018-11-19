$(function(){
    var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var touchstart = mobile ? "touchstart" : "mousedown";
    var touchend = mobile ? "touchend" : "mouseup";
    var touchmove = mobile ? "touchmove" : "mousemove";

    var stageW=$(window).width();
    var stageH=$(window).height();
    var loadingPath='../Public/images/';

    //定义时间动画，取决于页面的多少，动态增加，不用管
    //motionObj["page"+(i+1)] = new TimelineMax();
    initPreventPageDobuleTap(true);

    //motionObj['page'+1].add(TweenMax.from('.page1_1', 1, { alpha: 0, delay:pageMoveTimer-backTimer, ease:Linear.easeNone}));
    //motionObj['page'+1].add(TweenMax.from('.page1_2', 0.5, { scaleX: 0,scaleY: 0 ,ease:Expo.easeOut}));
    //motionObj['page'+1].pause();

    $('.page6').on(touchstart, function(){
        TweenMax.to('.page6', 1, {alpha:0, scale:.7, ease:Expo.easeOut, onComplete:function(){
            location.href = 'messages.html';
        }})
    })
    //阻止屏幕双击以后向上位移.当有表单页的时候，要关闭阻止事件，否则不能输入文字了
    function initPreventPageDobuleTap(isPreventPageDobuleTap){
        if(isPreventPageDobuleTap){
            $('.page').on(touchstart,function(e){
                e.preventDefault()
            })
        }else{
            $('.page').off(touchstart);
        }
    }
})


