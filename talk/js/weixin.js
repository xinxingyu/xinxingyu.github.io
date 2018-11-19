imgurl="http://h5.hecoe.com/leos/images/share.jpg";
var wxDefault = {
    title:"记者貌似揭秘全球黑帮谈判现场",
    desc:"快转发给你的小弟和马子，让TA一起给LEOS’Bang的纹身投票吧！",
    imgUrl:imgurl,
    link:"http://h5.hecoe.com/leos",
    success:function(){
    }
};
$(function(){
    var pageUrl = location.href;
    $.ajax({
        url:"http://api.hecoe.com/wx/index.php?w=jssdk",
        dataType:"jsonp",
        jsonp:"jsoncallback",
        data:{url:encodeURIComponent(pageUrl)},
        success:function(data){
            data.debug = false;
            wx.config(data);
            wx.ready(function(){
                wxShare();
            });
        }
    })
});

function wxShare(data){
    if(typeof(wx) == "undefined"){
        return;
    }
    var newData = $.extend({},wxDefault, data);
    wx.onMenuShareAppMessage({
        title:newData.title,
        desc:newData.desc,
        imgUrl:newData.imgUrl,
        //imgUrl:imgurl,
        link:newData.link,
        success: function(){
        }
    });

    wx.onMenuShareQQ({
        title:newData.title,
        imgUrl:newData.imgUrl,
        link:newData.link,
        success: function(){
        }
    });

    wx.onMenuShareWeibo({
        title:newData.title,
        imgUrl:newData.imgUrl,
        //imgUrl:imgurl,
        link:newData.link,
        success: function(){
        }
    });

    wx.onMenuShareTimeline({
        title:newData.title,
        imgUrl:newData.imgUrl,
        //imgUrl:imgurl,
        link:newData.link,
        success: function(){
        }
    });
}