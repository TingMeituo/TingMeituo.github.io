 /*赞 效果*/
function zanshow(obj) {
    if ($(obj).hasClass("active")) {
        return;
    } 
    else {
        var thistag = $(obj).offset();
        var thistagL = thistag.left;
        var thistagT = thistag.top - 20;
        $(document.body).append('<i class="jiayi" style="left:' + thistagL + 'px;top:' + thistagT + 'px;">+1</i>');
        $(".jiayi").addClass("a-fadeoutT");
        $(obj).addClass("active");
        setTimeout("zanhide()", 2000);
    }
}
function zanhide() {
    $(".jiayi").remove();
}

TouchSlide({
    slideCell: "#picScroll",
    titCell: ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
    pnLoop: "false", // 前后按钮不循环
    switchLoad: "_src" //切换加载，真实图片路径为"_src" 
});

TouchSlide({
    slideCell: "#banner-index",
    titCell: ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
    mainCell: ".bd ul",
    effect: "left",
    autoPlay: true, //自动播放
    autoPage: true, //自动分页
    interTime: 8000,
    delayTime: 800,
    switchLoad: "_src" //切换加载，真实图片路径为"_src" 
});

jQuery.Huitab = function(tabBar, tabCon, class_name, tabEvent, i) {
    var $tab_menu = $(tabBar);
    // 初始化操作
    $tab_menu.removeClass(class_name);
    $(tabBar).eq(i).addClass(class_name);
    $(tabCon).hide();
    $(tabCon).eq(i).show();
    
    $tab_menu.bind(tabEvent, function() {
        $tab_menu.removeClass(class_name);
        $(this).addClass(class_name);
        var index = $tab_menu.index(this);
        $(tabCon).hide();
        $(tabCon).eq(index).show();
    });
}

/*回到顶部*/
function gotop() {
    $("html,body").animate({scrollTop: 0}, 120);
}
/*关闭遮罩*/
function dropBoxclose() {
    $(".dropBox,.mask").remove();
}
/*下拉菜单显示*/
function dropnav_show() {
    if ($(".dropnav").is(":visible")) {
        $(".dropnav").slideUp();
        dropBoxclose();
        $(".uchome-tab .iconpic-arrow-down").removeClass("iconpic-arrow-up");
    } 
    else {
        $(".containBox").append('<div class=\"mask\"></div>');
        $(".dropnav").slideDown();
        $(".uchome-tab .iconpic-arrow-down").addClass("iconpic-arrow-up");
    }
}
$(function() {
    $(".dropnav a").click(function() {
        $(".uchome-tab .iconpic-arrow-down").removeClass("iconpic-arrow-up");
    });
});

/*下拉菜单隐藏*/
$(document).on("click", ".mask,.dropnav a", function() {
    $(".dropnav").slideUp();
    dropBoxclose();
});

/*Huimodalalert*/
function Huimodal_alert(info, speed) {
    $(document.body).append(
    '<div id="modal-alert" class="modal-alert hide">' + 
    '<div class="modal-alert-info radius">' + info + '</div>' + 
    '</div>'
    );
    $("#modal-alert").fadeIn();
    setTimeout("Huimodal_alert_hide()", speed);
}
function Huimodal_alert_hide() {
    $("#modal-alert").fadeOut("normal", function() {
        $("#modal-alert").remove();
    });
}

$(function() {
    /*点击遮罩和取消按钮关闭对话框*/
    $(document).on("click", ".mask,.dropBox-cancel", function() {
        dropBoxclose();
    });
    
    $(".iconpic-search").click(function() {
        if ($(".searchbar").hasClass("cur")) {
            return false;
        } else {
            $(".search-input").focus();
            $(".searchbar").addClass("cur");
        }
    });
    $(".iconpic-close").click(function() {
        $(".searchbar").removeClass("cur");
    });
    $(".workslist .item").bind("click", function() {
        alert("0");
    });
    $(".workslist .item a").click(function() {
        alert("1");
        return false;
    });

});


$(function() {
 /*点击搜索弹出搜索框*/
    $(".search-a").click(function() {
        $(".header-con").hide();
        $(".header-searchbox").show();
        // 搜索框获取焦点
        $(".input-search").focus();
        // 添加遮罩
        $(".mask-search").show();
      
    })
	/*取消搜索*/
    $(".search-cancel-btn").click(function() {
        $(".header-con").show();
        $(".header-searchbox").hide();
        $(".mask-search").hide();
        
    });

	$(".mask-search").bind('click', function(event) {
		$(this).hide();
		$(".header-con").show();
		$(".header-searchbox").hide();
	});
	$('.input-search').on('input', function() {
		$(".search-cancel").show();
	})
	if($('.input-search').val()=="")
	{
		 $(".search-cancel").hide();
	}
	else{
		 $(".search-cancel").show();
	}
	
	$(".search-cancel").click(function() {
		$(".input-search").val("");
		$(".input-search").focus();
		$(this).hide();
	});
	$(".close-appdown").on("click",function(){
		$(".pop-appdown").remove();
	});
});



$(function() {
    /*左右滑动菜单*/
    var _bodyHeight = $(window).height();
    $(".containBox_opbg,.sideBox,body.containBox").height(_bodyHeight);
    $(".navBtn").click(function() {
        $(".containBox_opbg").show();
        $(".containBox").height(_bodyHeight);
        $(".containBox").addClass('sideBox-open');
        $("body").addClass('sideBox-open');
    });
    $(".containBox_opbg").click(function() {
        $(".containBox,.sideBox,body").removeAttr("style");
        $(".containBox").removeClass('sideBox-open');
        
        $(this).hide();
        $("body").removeClass('sideBox-open');
    });
});
//评论高度处理
function commentsHandleHight() {
    for (var i = 0; i < $(".comment-info").length; i++) {
        var h = $(".comment-info").eq(i).height();
        if (h > 48) {
            $(".comment-info").eq(i).height("48px").parent().find(".btn-zhankai").show();
            $(".btn-zhankai").on("click", function() {
                $(this).hide().parent().find(".comment-info").height("auto");
            });
        } else {
            $(".comment-info").eq(i).height("auto");
            $(".comment-info").eq(i).parent().find(".btn-zhankai").remove();
        }
    }

}

/*textarea 字数限制*/
function textarealength(obj, maxlength) {
    var v = $(obj).val();
    var l = v.length;
    if (l > maxlength) {
        v = v.substring(0, maxlength);
    }
    $(obj).parent().find(".textarea-length").text(v.length);
}

/*点击回复 textarea 获取焦点*/
$(function() {
    $(".btn-comment-reply").click(function() {
        $(".chat-textarea").focus();
    });
});

// 完善资料
$(".select1").change(function() {
    var select_txt = $(".select1 option:selected").text();
    $(".select-item1").text(select_txt);
});

$(".select2").change(function() {
    var select_txt = $(".select2 option:selected").text();
    $(".select-item2").text(select_txt);

});
$(".city").change(function() {
    var select_txt = $(".city option:selected").text();
    $(".select-item3").text(select_txt);
});
$(".area").change(function() {
    var select_txt = $(".area option:selected").text();
    $(".select-item4").text(select_txt);
});

 // 底部置底
//  $(function() {
//     var docHeight = $(window).height();
//    var footerHeight = $('.footer').height();
//    var footerTop = $('.footer').position().top + footerHeight;

//    if (footerTop < docHeight) {
//     $('.footer').css('margin-top', 10+ (docHeight - footerTop) + 'px');
//    }
 
// });
