/**
 * 移动端微信浏览器分享相关
 * by xuyingjun@zcool.com.cn ，2016.1.22
 *
 * 使用方式：
 * 除了前两个参数为自定义参数外，其他参数同微信的参数。
 *  weixin_share({
        addr: 'special/2015/wap/',//专题地址
        obj_id: 'special_293',//专题id

        title: 'ZCOOL新年音乐会 - 站酷2015年度盘点专题',// 分享标题
        desc: 'ZCOOL新年音乐会 - 站酷2015年度盘点专题',// 分享描述
        imgUrl: 'http://www.zcool.com.cn/special/2015/wap/assets/img/bg.jpg',// 分享图标
        link: 'http://www.zcool.com.cn/special/2015/wap/', // 分享链接
        success: function () {//分享成功后的回调
            stat("share");
        },
        cancel: function () {//取消分享后的回调

        }
    })
 */
//请求获取微信的api等配置
function weixin_share(shareConfig) {
    shareConfig = shareConfig || {};
    $.ajax({
        type: "get",
        url: "/special/weixinShare.do",
        data: "addr=" + shareConfig.addr + "&obj_id=" + shareConfig.obj_id,
        dataType: "json",
        success: function (msg) {
            if (msg.success === 'true') {
                weixin_shareCallBack(msg, shareConfig);
            }
        },
        error: function (a, b, c, d) {

        }
    })
}
function weixin_shareCallBack(msg, shareConfig) {
    //设置微信api相关
    wx.config({
        debug: shareConfig.debug || false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: msg.appid, //appid 必填，公众号的唯一标识
        timestamp: msg.timestamp, //timestamp 必填，生成签名的时间戳
        nonceStr: msg.nonceStr, //nonceStr 必填，生成签名的随机串
        signature: msg.signature,//signature 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    //设置微信分享参数
    var params = shareConfig || {};
    //params.type = 'link';// 分享类型,music、video或link，不填默认为link
    //params.daraUrl = "";// 如果type是music或video，则要提供数据链接，默认为空
    wx.ready(function () {
        wx.onMenuShareAppMessage(params);
        wx.onMenuShareTimeline(params);
    })
}