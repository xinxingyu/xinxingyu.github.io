$(function(){
    var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var touchstart = mobile ? "touchstart" : "mousedown";
    var touchend = mobile ? "touchend" : "mouseup";
    var touchmove = mobile ? "touchmove" : "mousemove";

    //阻止屏幕滑动
    $('html,body').on(touchmove,function(e){
        e.preventDefault()
    });
    var stageW=$(window).width();
    var stageH=$(window).height();

    var loadingPath='/chinaopen/Application/Home/View/Public/images/';

    var nameArray = ['德约科维奇','小威廉姆斯','纳达尔','莎拉波娃','伊万诺维奇'];
    //动态设这页面内容:
    function setpageContent(player_id){
        if(_suc==1){
            $('.page5_1').text('网坛巨星'+nameArray[player_id-1]+'被中国选手');
            $('.page5_5 .p2').text('遗憾的是，可能是因为水土不服，'+nameArray[player_id-1]+'以一球之差，在友谊赛中输给了中国的'+_name+'。');
        }else{
            $('.page5_1').text('网坛巨星'+nameArray[player_id-1]+'把中国选手');
            $('.page5_5 .p2').text('在友谊赛中，'+nameArray[player_id-1]+'一展网坛巨星的风采，将'+_name+'轻松的KO。');
        }
        $('.page5_5 .p4').text('本次参赛选手'+nameArray[player_id-1]+'抵达北京之日，便拉着中国民间网球爱好者'+_name+'打了一场友谊赛。');
        $('.page5_2').text(_name+'一球KO！');
        $('.page5_4').css('background-image','url('+loadingPath+'p5_4_'+player_id+'.jpg)');

    }

    /*var _name = 0;
    var _player_id = 0;
    function getUrlParam (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]); return "";
    }
    _player_id = parseInt(getUrlParam('id'));
    _name = getUrlParam('name');
    console.log(_name+_player_id)*/
    setpageContent(_id);

    $('.opage5_7').on(touchstart, function(){
        window.location.href="http://dd252.hecoe.com/chinaopen";
    })
    //初始化滑动，必须元素处于显示状态
    function initscroll(){
        new IScroll('#wrapper', {
            scrollbars: false,
            interactiveScrollbars: true,
            fadeScrollbars: true,
            checkDOMChanges:true
        });
    }
    $('#wrapper').css('height',stageH-140+'px');
    initscroll();
});


