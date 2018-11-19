imgurl="http://dd252.hecoe.com/chinaopen/Application/Home/View/Public/images/share1.jpg";
var wxDefault = {
    title:"纳达尔金牌训练营等你来挑战！",
    desc:"纳达尔金牌训练营等你来挑战！",
    imgUrl:imgurl,
    link:"http://dd252.hecoe.com/chinaopen",
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