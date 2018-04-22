function zGetZid() {
    var allcookie = document.cookie.split('; ');
    var zid = "0";
    for (var i = 0; i < allcookie.length; i++) {
        var cookiearray = allcookie[i].split('=');
        var cookiename = cookiearray[0];
        var cookievalue = cookiearray[1];
        if (cookiename == 'zid') {
            //获取用户zid
            zid = cookievalue;
            break;
        }
    }
    return zid;
}
function zGetUid() {
    var allcookie = document.cookie.split('; ');
    var uid = "0";
    for (var i = 0; i < allcookie.length; i++) {
        var cookiearray = allcookie[i].split('=');
        var cookiename = cookiearray[0];
        var cookievalue = cookiearray[1];
        if (cookiename == 'zcool_logon_new') {
            //获取用户uid
            var tmpString = decodeURI(cookievalue);
            var stat = tmpString.split("|");
            var userCookieUID = stat[0];
            uid = userCookieUID;
            break;
        }
    }
    return uid;
}
$(function() {
    
    // 布点：把需要统计的a标签上面加上st_t="click" st_n="name"
    // 监听点击事件 然后请求日志带上参数
    // st_hf,监听点的输出链接
    // t_,时间
    // lo,当前页面链接
    $(document).on('click', '[z-st]', statistics_click);
    function statistics_click(e) {
        // $(this)和$(e.target)不一样
        var key = encodeURIComponent($(this).attr('z-st'));
        var hf = encodeURIComponent($(this).attr('href'));
        var class_ = encodeURIComponent($(this).prop('class'));
        var lo = encodeURIComponent(window.location.href);
        var t_ = Date.parse(new Date());
        var tc = encodeURIComponent($(this).attr('z-track'));
        var zid = zGetZid();
        var uid = zGetUid();
        var pId = "";
        var url = "http://log." + zRootDomain + "/click.gif?key=" + key + "&hf=" + hf
                  + "&vi=" + vi
                  + "&tc=" + tc
                  + "&t_=" + t_ + "&lo=" + lo + "&zid=" + zid + "&uid=" + uid
                  + "&ver=1.1&site=1" + "&class=" + class_ + "&pId=" + pId;
        new Image().src = url;
    }
//	var url = "http://log.zcool.com.cn/page.gif?;"//看一下之前的page代码是怎么写的
//	new Image().src = url;
});



function statise_view(domain,t,ids,vi,ti) {
    var zid = zGetZid();
    var uid = zGetUid();
    var image = new Image()
    image.src = "http://log."+domain+"/view.gif?t="+t+"&ids="+ids+"&vi="+vi+"&ti="+ti+"&zid="+zid+"&uid="+uid;
}

function statise_show(domain,type,id,fromVersion) {
    var zid = zGetZid();
    var uid = zGetUid();
    var image = new Image()
    var date = new Date().getTime();
    image.src = "http://log."+domain+"/show.gif?ver=1.1&type="+type+"&key="+id+"&t="+date+"&from="+fromVersion+"&uid="+uid+"&zid="+zid;
}

(function(){function g(a){if(window.sessionStorage)return window.sessionStorage.getItem(a);return null}function f(a,b){var c=new Image,d="zcool_log_"+Math.floor(Math.random()*2147483648).toString(36);window[d]=c;c.onload=c.onerror=c.onabort=function(){c.onload=c.onerror=c.onabort=null;c=window[d]=null;b&&b(a)};c.src=a}function h(){this.valueStack={};this.beginAnalyse()}var k=navigator.cookieEnabled,l=navigator.javaEnabled(),m=navigator.language||navigator.browserLanguage||navigator.systemLanguage||
                                                                                                                                                                                                                                                                                                                                                                                                                                              navigator.userLanguage||"",n=window.screen.width+"x"+window.screen.height,e=["zcool.com.cn"];/msie (\d+\.\d+)/i.test(navigator.userAgent);var j=["uid","sr","ln","ca","ja","re","lo","rand","v"];h.prototype={init:function(){var a=this.getData();this.valueStack.v="1.0.5";this.valueStack.uid=a;this.valueStack.re=document.referrer;this.valueStack.sr=n;this.valueStack.ln=m;this.valueStack.ca=k?1:0;this.valueStack.ja=l?1:0;this.valueStack.lo=window.location.href},beginAnalyse:function(){try{this.init(),
    this.sendLogToServer("http://log." + zRootDomain + "/page.gif?")}catch(a){var b=[];b.push("n="+encodeURIComponent(a.name));b.push("m="+encodeURIComponent(a.message));b.push("r="+encodeURIComponent(document.referrer));f("http://log.zcool.com.cn/"+b.join("&"))}},checkHostName:function(a,b){a=a.replace(/:\d+/,"");b=b.replace(/:\d+/,"");pos=a.indexOf(b);return pos>-1&&pos+b.length==a.length},getCookieDomain:function(){var a=window.location.hostname;for(i=0;i<e.length;i++)if(this.checkHostName(hostName,e[i]))return e.replace(/(:\d+)?[\/\?#].*/,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           "");return a},checkPath:function(a,b){a=a.replace(/^https?:\/\//,"");return a.indexOf(b)==0},getCookiePath:function(){for(var a=0;a<e.length;a++){var b=e[a];if(b.indexOf("/")>-1&&this.checkPath(window.location.href,b))return b.replace(/^[^\/]+(\/.*)/,"$2")+"/"}return"/"},getData:function(){for(var a="",a=document.cookie.split("; "),b="0",c="0",d=0;d<a.length;d++){var e=a[d].split("="),f=e[0],e=e[1];f=="zcool_logon_new"?b=decodeURI(e).split("|")[0]:f=="zid"&&(c=e)}return b+"$"+c},buildLogStr:function(){for(var a=
    [],b=0;b<j.length;b++){var c=j[b],d=this.valueStack[c];if(typeof d=="undefined"||d==null)d="";a.push(c+"="+encodeURIComponent(d))}return a.join("&")},sendLogToServer:function(a){this.valueStack.rand=Math.round(Math.random()*2147483647);a+=this.buildLogStr();f(a)},clearUnsendRequest:function(a){var b=g("SA_Unsend_Log_Str")||"";if(b)if(b=b.replace(RegExp(encodeURIComponent(a.replace(/^https?:\/\//,""))+"(%26u%3D[^,]*)?,?","g"),"").replace(/,$/,"")){if(window.sessionStorage)try{window.sessionStorage.setItem("SA_Unsend_Log_Str",
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  b)}catch(c){}}else window.sessionStorage&&window.sessionStorage.removeItem("SA_Unsend_Log_Str")},resendUnSendRequest:function(){var a=this,b=g("SA_Unsend_Log_Str");if(b)for(var b=b.split(","),c=0;c<b.length;c++)f("http://"+decodeURIComponent(b[c]).replace(/^https?\/\//,""),function(b){a.clearUnsendRequest(b)})}};new h})();
