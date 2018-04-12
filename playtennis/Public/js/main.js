$(function(){
    var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var touchstart = mobile ? "touchstart" : "mousedown";
    var touchend = mobile ? "touchend" : "mouseup";
    var touchmove = mobile ? "touchmove" : "mousemove";

    //阻止屏幕滑动
    $('html,body').on(touchmove,function(e){
        e.preventDefault()
    });

    //
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = location.search.substr(1).match(reg);
        if (r != null) return unescape(decodeURI(r[2])); return null;
    }

    function isWeiXin(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    }

    var nickname;

    // if(isWeiXin()){

    //     // var headimgurl = getQueryString('headimgurl'); //头像不用的话就注释掉
    //     nickname = getQueryString('nickname');

    //     if(nickname == '' || nickname == null)
    //     {
    //         var tempsss='?vid=name';  //  这句话当时是为了传个值过去，我程序没动  你也随便传个值过去就行了  写死也无所谓
    //         //if(uid) tempsss = "?vid="+uid;
    //         /************************************************
    //          *特别需要注意的是
    //          * url 后的第一个地址是接口地址，你不用动  我写好了
    //          * encodeURI里的地址，是你当前页面的地址，
    //          **************************************************/
    //         var url = "http://api.hecoe.com/wx/getwxuserinfo.php?referer=" + encodeURI("http://dd252.hecoe.com/chinaopen/index.html"+tempsss);
    //         location.href = url;
    //     }
    //     else
    //     {
    //         //这里就是已经获取到头像和昵称了，进行下一步操作就行了
    //     }

    // }
    // else
    // {
        //非微信打开 直接赋值
        nickname = '滴滴用户';
    // }

    //改用户的微信昵称
    $('.page5_2').text(nickname+'一球KO！');

    //----------------------------------------------------------------------------------------------------------------


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
    //var loadingPath='Application/Home/View/Public/images/';
    //var musicPath='';//是否含有背景音乐，有就传路径，没有就为'';
    var musicPath=loadingPath+'bg.mp3';//是否含有背景音乐，有就传路径，没有就为'';
    var isLoop=false;//页面是否可以循环滑动
    var pageMoveTimer=0.8;//页面滑动时间，不建议修改
    var backTimer=0.3;//内容动画开始倒退的时间,不建议修改
    var manifest=[
        {src:loadingPath+'p1_1.png'},
        {src:loadingPath+'p1_2.png'},
        {src:loadingPath+'p2_1_1.png'},
        {src:loadingPath+'p2_1_2.png'},
        {src:loadingPath+'p2_1_3.png'},
        {src:loadingPath+'p2_1_4.png'},
        {src:loadingPath+'p2_1_5.png'},
        {src:loadingPath+'p1.jpg'},
        {src:loadingPath+'p2.jpg'},
        {src:loadingPath+'p3.jpg'},
        {src:loadingPath+'p6.jpg'},
        {src:loadingPath+'p3_4.png'},
        {src:loadingPath+'p4_fail_bg1.jpg'},
        {src:loadingPath+'p4_fail_bg2.jpg'},
        {src:loadingPath+'p4_fail_bg3.jpg'},
        {src:loadingPath+'p4_fail_bg4.jpg'},
        {src:loadingPath+'p4_fail_bg5.jpg'}

    ];
    //可调节的参数

    //定义时间动画，取决于页面的多少，动态增加，不用管
    $('.page>div').each(function(i){
        motionObj["page"+(i+1)] = new TimelineMax();
    });

    //初始化音乐，如果musicPath=''，相当于什么都没做
    initMusic();

    //初始化音乐
    function intsound(){
        var sounds = [
            {src: "click.mp3", id: 1},
            {src: "ballin.mp3", id: 2},
            {src: "ballout.mp3", id: 3}
        ];
        createjs.Sound.alternateExtensions = ["ogg"];
        createjs.Sound.registerSounds(sounds, loadingPath);
    }
    intsound();


    //初始化阻止屏幕双击，当有表单页的时候，要关闭阻止事件，否则不能输入文字了，请传入false值，再次运行即可
    initPreventPageDobuleTap(true);

    //loading
    function handleOverallProgress(event){
        $('.loadingtxt').text('Loaing: '+Math.ceil(event.loaded*100)+"%");
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

        motionObj['page'+1].add(TweenMax.from('.page1_1',.4, { alpha: 0, scale:0, delay:pageMoveTimer-backTimer, ease:Bounce.easeOut}));
        motionObj['page'+1].pause();

        motionObj['page'+2].add(TweenMax.from('.page2_2',.4, { alpha: 0, scale:0, delay:pageMoveTimer-backTimer, ease:Bounce.easeOut}));
        motionObj['page'+2].pause();

        motionObj['page'+3].add(TweenMax.from('.page3_4',1, { alpha: 0, scale:0, delay:pageMoveTimer-backTimer, ease:Expo.easeIn,onStart:function(){
            TweenMax.to('.page3_5',.5, { alpha: 1, scale:1, delay:.6, ease:Expo.easeIn,onComplete:function(){
                $('.page3_5').addClass('ss');
                $('.page3_4').addClass('qs');
                allowshake = true;
                //setTimeout(function(){
                //    playBall(300);
                //},1000)

            }});
            setTimeout(function(){
                createjs.Sound.play("2");
            },500);
        }}));
        motionObj['page'+3].pause();

        motionObj['page'+5].add(TweenMax.from('.page5_7',.4, { alpha: 0, scale:0, delay:pageMoveTimer-backTimer, ease:Bounce.easeOut}));
        motionObj['page'+5].add(TweenMax.from('.page5_8',.4, { alpha: 0, scale:0,  ease:Bounce.easeOut,onComplete:function(){
            initscroll();
        }}));
        motionObj['page'+5].pause();

        motionObj['page'+6].add(TweenMax.from('.page6_1', 1, { alpha: 0, y:-50, delay:pageMoveTimer-backTimer, ease:Expo.easeOut}));
        motionObj['page'+6].add(TweenMax.from('.page6_2_1',.4, { alpha: 0, scale:0,  ease:Bounce.easeOut}));
        motionObj['page'+6].add(TweenMax.from('.page6_2_2',.4, { alpha: 0, scale:0,  ease:Bounce.easeOut}));
        motionObj['page'+6].add(TweenMax.from('.page6_2_3',.4, { alpha: 0, scale:0,  ease:Bounce.easeOut}));
        motionObj['page'+6].pause();

        /*自定义动画*/


        initAllowUserMove(false);
        $(".main").fadeIn(500,function(){
            motionObj['page'+1].play();
        });
    }

    //滑动页面核心内容
    function pageMove(direction){
        allowMove = false
        var targetTop=stageH*direction;
        nextPageClassName=$('.page>div').eq(1).attr('class');
        var pageMove=$('.page>div').eq(1).attr('move');
        if(direction==1){
            $('.page>div:first-of-type').before($('.page>div:last-of-type'))
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



    $('.page1_1').on(touchstart,function(){
        createjs.Sound.play("1");
        pageMove(-1);
    });
    //选完人
    $('.page2_2').on(touchstart,function(){
        createjs.Sound.play("1");
        $('.page3_1').text(ps.nameArray[ps.id-1]+'的球以时速');
        ps.speed=Math.floor(Math.random()*80+230);
        $('.page3_2').text(ps.speed);
        pageMove(-1);
    });


    //显示单个元素的动画
    function s_elementShow(s_element,animation_type){
        if(animation_type=="show"){
            $(s_element).show();
            TweenMax.to(s_element, 1, { delay:0.5, alpha:1, scale:1, ease:Expo.easeOut});
        }else{
            TweenMax.to(s_element, 1, { delay:0.5, alpha:0, scale:0, ease:Expo.easeOut});
            $(s_element).hide();
        }
    }

    //当前页数（0代表第一页）
    var rightTimes = 0;
    //图片左右滑动
    function imagespagemove(imgDirection,allImagesNum,locationNum){
        if(imgDirection == "right"){
            if(rightTimes<allImagesNum-1 && rightTimes>=0){
                rightTimes++;
                TweenMax.to('.HT', pageMoveTimer, {left: rightTimes*-640, ease: Expo.easeInOut});
            }
        }
        else
        if(imgDirection == "left"){
            if (rightTimes>0){
                rightTimes--;
                TweenMax.to('.HT', pageMoveTimer, {left: rightTimes*-640, ease: Expo.easeInOut});
            }
        }
        else
        if(imgDirection == "location"){
            rightTimes=locationNum-1;
            TweenMax.to('.HT', 0.1, {left: rightTimes*-640, ease: Expo.easeInOut});
        }

        if(rightTimes == 0) s_elementShow(".page2_left","hide");
        if(rightTimes == allImagesNum-2) s_elementShow(".page2_right","show");
        if(rightTimes == allImagesNum-1 ) s_elementShow(".page2_right","hide");
        if(rightTimes == 1) s_elementShow(".page2_left","show");
    }


    //左右滑动按钮
    $('.page2_right').on(touchstart,function(){
        imagespagemove("right",5);
        ps.id = rightTimes+1;
        console.log(ps.id)
    });
    $('.page2_left').on(touchstart,function(){
        imagespagemove("left",5);
        ps.id = rightTimes+1;
        console.log(ps.id)
    });

    //--------------------------- ------    Person   ---------------------------------------
    function Person(){
        this.id = 1;
        this.nameArray = ['德约科维奇','小威廉姆斯','纳达尔','莎拉波娃','伊万诺维奇'];
        this.sp=0;
        this.status = "fail";
        this.jiang;
        this.speed=215;
    }
    var ps = new Person();

    var allowshake = false;
    //打网球
    if (window.DeviceMotionEvent) {
        var speed = 40;//定义一个数值
        var x = y = z = lastX = lastY = lastZ = 0;//重置所有数值
        window.addEventListener('devicemotion', function () {
            if(allowshake){
                //alert(0)
                var acceleration = event.accelerationIncludingGravity;//将传感值赋给acceleration
                x = acceleration.x;
                y = acceleration.y;
                z = acceleration.z;
                //if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed) {
                if (Math.abs(x - lastX) > speed ) {
                    // TODO:在此处可以实现摇一摇之后所要进行的数据逻辑操作
                    ps.sp = parseInt(Math.abs(x - lastX)*3.5);
                    playBall(ps.sp);
                }else{
                    if(Math.abs(x - lastX)>20){
                        alert("速度不够哟，再挥动的快一丢丢哟~！")
                    }
                }
                lastX = x;
                lastY = y;
                lastZ = z;
            }

        }, false);
    }

    //打球
    function playBall(sp){
        allowshake = false;
        setPage4(sp);
        $('.page3_4').removeClass('qs');
        TweenMax.to('.page3_4', 1, {delay:1, scale:0, ease:Expo.easeIn, onComplete:function(){
            pageMove(-1);
        },onStart:function(){
            setTimeout(function(){createjs.Sound.play("3");},300)
        }});
        TweenMax.to('.page3_5', .3 ,{delay:1, alpha:0, ease:Expo.easeOut});
    }
    //设置第四页
    function setPage4(sp){
        $('.page4_2>p').text(sp);

        imgurl='http://dd252.hecoe.com/chinaopen/Application/Home/View/Public/images/share'+ps.id+'.jpg';

        if(sp>ps.speed){
            ps.status = "success";
            $('.page4').css('background-image','url('+loadingPath+'p4_fail_bg'+ps.id+'.jpg)');
            $('.page4_1').css('background-image','url('+loadingPath+'p4_success_1.png)');
            $('.page4_4').css('background-image','url('+loadingPath+'p4_success_4.png)');
            $('.page4_3').text('的速度反击轻易KO了'+ps.nameArray[ps.id-1]);
            $('.page4_6').show();

            wxDefault = {
                title: '[新闻头条]'+ps.nameArray[ps.id-1]+"：输给"+nickname+"我心服口服。",
                desc: "解密："+ps.nameArray[ps.id-1]+"为什么会一球之差败给"+nickname+"。",
                link:"http://dd252.hecoe.com/chinaopen/Index/open.html?id="+ps.id+"&name="+nickname+"&suc=1",
                imgUrl:imgurl,
                success: function () {
                    addShare();
                }
            };

        }else{
            ps.status = "fail";
            $('.page4').css('background-image','url('+loadingPath+'p4_fail_bg'+ps.id+'.jpg)');
            $('.page4_1').css('background-image','url('+loadingPath+'p4_fail_1.png)');
            $('.page4_4').css('background-image','url('+loadingPath+'p4_fail_4.png)');
            $('.page4_3').text('的速度反击被'+ps.nameArray[ps.id-1]+'KO了');
            $('.page4_6').hide();
            wxDefault = {
                title: '[新闻头条]'+nickname+"在友谊赛中被"+ps.nameArray[ps.id-1]+"轻松击败。",
                desc: nickname+"在友谊赛中被"+ps.nameArray[ps.id-1]+"轻松击败。",
                link:"http://dd252.hecoe.com/chinaopen/Index/open.html?id="+ps.id+"&name="+nickname+"&suc=0",
                imgUrl:imgurl,
                success: function () {
                    addShare();
                }
            };

        }
        wxShare();
    }

    function addShare(){
        $.ajax({
            type: 'post',
            url: 'http://dd.hecoe.com/chinaopen/Index/sharecount.html',
            data: {},
            async: false,
            dataType: 'json',
            success: function (data) {
                var status = data.status;
                if(status == "0")
                {
                }
                else
                {
                }
            }
        })
    }

    $('.page4_5').on(touchstart, function(){
        createjs.Sound.play("1");
        againGame();
    });
    //天啦，我（他）好流弊
    $('.page4_4').on(touchstart, function(){
        createjs.Sound.play("1");
        //动态修改分享页内容
        $('#wrapper').css('height',stageH-140+'px');
        if(ps.status=='success'){
            $('.page5_1').text('网坛巨星'+ps.nameArray[ps.id-1]+'被中国选手');
            $('.page5_5 .p2').text('遗憾的是，可能是因为水土不服，'+ps.nameArray[ps.id-1]+'以一球之差，在友谊赛中输给了中国的'+nickname+'。');
        }else{
            $('.page5_1').text('网坛巨星'+ps.nameArray[ps.id-1]+'把中国选手');
            $('.page5_5 .p2').text('在友谊赛中，'+ps.nameArray[ps.id-1]+'一展网坛巨星的风采，将'+nickname+'轻松的KO。');
        }
        $('.page5_5 .p4').text('本次参赛选手'+ps.nameArray[ps.id-1]+'抵达北京之日，便拉着中国民间网球爱好者'+nickname+'打了一场友谊赛。');
        $('.page5_4').css('background-image','url('+loadingPath+'p5_4_'+ps.id+'.jpg)');
        pageMove(-1);

    });
    //再来一次

    var tempid;

    function againGame(){
        tempid=ps.id;
        ps = new Person();
        ps.id=tempid;
        pageMove(1);
    }

    //------------------------------------    第 五 页    -----------------------
    //初始化滑动，必须元素处于显示状态
    function initscroll(){
        new IScroll('#wrapper', {
            scrollbars: false,
            interactiveScrollbars: true,
            fadeScrollbars: true,
            checkDOMChanges:true
        });
    }

    //与他面对面
    $('.page5_8').on(touchstart, function(){
        createjs.Sound.play("1");
        pageMove(-1);
    })

    //关闭浮层
    $('.sharemask').on(touchstart,function(){
        $(this).hide();
    })
    //分享
    $('.page5_7').on(touchstart, function(){
        createjs.Sound.play("1");
        $('.sharemask').fadeIn();
    })
    //选奖励
    $('.page6_2_1,.page6_2_2,.page6_2_3').on(touchstart, function(){
        createjs.Sound.play("1");
        var pid = parseInt(this.className.charAt(8));
        //选了第几个奖
        ps.jiang = pid;
        initPreventPageDobuleTap(false);
        pageMove(-1);
    })

    //--------------------------------------  提交表单 ----------------------------
    $(".page7_5").on(touchstart, function() {
        createjs.Sound.play("1");
        var count = ps.sp;
        var mobile = $(".page7_4>input").val();
        var name =  $(".page7_3>input").val();
        var pid = ps.jiang; //奖品的种类1-3
        console.log(count+"手机号："+mobile+"姓名："+name+"奖品种类:"+pid)
        if(name == '')
        {
            alert("请填写姓名");
            return false;
        }
        if(mobile== '')
        {
            alert("请填写手机号码");
            return false;
        }
        else
        {
            var myreg = /^1\d{10}$/;
            if(!myreg.test(mobile))
            {
                alert('请输入正确的手机号码！');
                return false;
            }
            else
            {
                $.ajax({
                    type: 'post',
                    url: '/chinaopen/Index/membersave.html',
                    data: {name:name,mobile:mobile,count:count,pid:pid},
                    async: false,
                    dataType: 'json',
                    success: function (data) {
                        var status = data.status;
                        if(status == "0")
                        {
                            alert('提交成功！');
                            location.href='http://dd252.hecoe.com/chinaopen';
                        }
                        else
                        {
                            alert("提交不成功！" + data.info);
                        }
                    }
                })
            }
        }
    });
});