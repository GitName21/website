$(document).ready(function(){
	
	// 二级导航
	$(".nav-function>div:last-child svg").click(function(){
		var cssValue = $('.nav-more').css('animation');
		if(cssValue == "none 0s ease 0s 1 normal none running" || cssValue == "0.5s ease 0s 1 normal forwards running nav-more-close"){
			$(".nav-more").css({"animation":"nav-more 0.5s ease forwards"})
		}else{
			$(".nav-more").css({"animation":"nav-more-close 0.5s ease forwards"})
		}
	});
	
	// 浅色模式
	// 打开浅色模式按钮
	function lightBtn(){
		$(".switch").css({"background-color":"#00BAAD","transition":"all 0.3s"})
		$(".switch div").css({"left":"2.2rem","transition":"all 0.3s"})
	}
	// 关闭浅色模式按钮
	function lightBtnClose(){
		$(".switch").css({"background-color":"rgba(0, 0, 0, 0)","transition":"all 0.3s"})
		$(".switch div").css({"left":"0.3rem","transition":"all 0.3s"})
	}
	// 浅色模式样式
	function light(){
		document.documentElement.style.setProperty('--bg-main', "#f3f4f5");
		document.documentElement.style.setProperty('--bg-secondly', "#ffffff");
		document.documentElement.style.setProperty('--bg-less', "#d9d9d9");
		document.documentElement.style.setProperty('--color-main', "#000000");
	}
	// 深色模式样式
	function dark(){
		document.documentElement.style.setProperty('--bg-main', "#171514");
		document.documentElement.style.setProperty('--bg-secondly', "#232222");
		document.documentElement.style.setProperty('--bg-less', "#373737");
		document.documentElement.style.setProperty('--color-main', "#ffffff");
	}
	$(".switch").click(function(){
		// 获取开关是否打开
		var switchBG = $('.switch').css('background-color');
		if(switchBG == "rgba(0, 0, 0, 0)"){
			
			localStorage.setItem("mode", "light");
			var mode = localStorage.getItem("mode");
			
			lightBtn();
			light()
		}else{
			localStorage.removeItem("mode");
			var mode = localStorage.getItem("mode");
			
			lightBtnClose();
			dark();
		}
	})
	
	// 本地缓存模式
	var mode = localStorage.getItem("mode");
	console.log(mode)
	// 如果已设置过浅色模式,则保持
	if(mode == "light"){
		lightBtn();
		light()
	}
	// 如果没设置过浅色模式,则恢复深色模式
	if(mode != "light"){
		lightBtnClose();
		dark();
	}
	
	// 元素居中
	function center(box){
		// 获取元素宽度
		var boxWidth = box.innerWidth();
		// 获取元素高度
		var boxHeight = box.innerHeight();
		
		var x = ($(window).width()-boxWidth)/2;//使用$(window).width()获得显示器的宽，并算出对应的Div离左边的距离
		var y = ($(window).height()-boxHeight)/2;//使用$(window).height()获得显示器的高，并算出相应的Div离上边的距离
		
		box.css("top",y).css("left",x);
		// box.fadeIn(300)
	}
	
	// 打开遮罩
	function mask(){
		$(".mask").fadeIn(300)
		$('body').css({"overflow":"hidden"})
		// 打开遮罩时禁止窗口滚动
		var top = $(document).scrollTop();
		// 禁止窗口滚动
		$(document).on('scroll.unable',function (e) {
			$(document).scrollTop(top);
		})
		
		// $(".mask").css({"top":top}); //如何定位设置为absolute，则添加这个属性，保证.mack处于当前屏，fixed固定定位则不用
	}
	$(document).scroll(function() {
	  $(".mask").css({"top":'0'});
	});
	// 关闭遮罩
	$(".mask").click(function(){
		$(".mask").fadeOut(300);
		// 关闭遮罩是允许窗口滚动
		$(document).unbind("scroll.unable");
		
		// 关闭PC搜索
		searchClose();
		// 关闭全屏看图
		$('.full-screen-img').fadeOut()
		// 关闭移动端搜索
		$('.search-mobile-wrap').css({"transform":"translateX(-100%)"})
		// $('.nav-wrap').css({"transform":"translateX(0)","transition":"all 0.3s ease"});
		$('.nav-wrap').css({"padding-left":"0%","transition":"all 0.3s ease"})
		$('.content').css({"transform":"translateX(0)","transition":"all 0.3s ease"});
		$('.footer div').css({"transform":"translateX(0)","transition":"all 0.3s ease"});
		$('body').css({"overflow":"scroll"});
		// 关闭分享
		$('.share-window').css({"animation":"share-close 0.3s ease forwards"})
		// 关闭二维码
		$('.qr-code').css({"animation":"share-close 0.3s ease forwards"})
	})
	
	// PC搜索
	// 实现居中
	center($('.search-wrap'));
	// 窗口大小发生变化时实时居中
	$(window).resize(function(){
		center($('.search-wrap'));
	})
	
	$(".search-btn").click(function(){
		mask();
		center($('.search-wrap'));
		$(".search-wrap").fadeIn(300);
	})
	$(".search-wrap label").click(function(){
		$(".search-wrap input[name='search']").focus()
	})
	// 搜索展开
	function searchOpen(){
		$(".search-wrap label").css({"transform":"translateY(-4rem)","transition":"all 0.3s","font-size":"1rem","color":"var(--color-main)"})
		$(".search-wrap").css({"padding":"0 0 1rem 0","transition":"all 0.3s"})
	}
	// 关闭展开
	function searchClose(){
		$(".search-wrap").fadeOut(300);
		if($(".search-wrap input[name='search']").val() == ''){
			$(".search-wrap label").css({"transform":"translateY(0)","transition":"all 0.3s","font-size":"2rem","color":"var(--color-secondly)"})
			$(".search-wrap").css({"padding":"0","transition":"all 0.3s"})
		}
	}
	$(".search-wrap input[name='search']").focus(function(){
		searchOpen();
	})
	
	// 图片详情页
	// 获取get图片链接
	$(function () {
		(function ($) {
			$.getUrlParam = function (name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = decodeURI(window.location.search).substr(1).match(reg); //decodeURI(window.location.search),get参数中存在中文，用decodeURI转码，避免乱码
				if (r != null) return unescape(r[2]); return null;
			}
		})(jQuery);
		var imgsrc = $.getUrlParam('imgsrc');
		var imgCon = $.getUrlParam('imgCon');
		
		$(".work-details-img img").attr("src",imgsrc);
		
		if($.getUrlParam('imgCon')){
			$(".work-details-tit").html(imgCon);
			$(".full-screen-tit").html(imgCon);
		}
	});	
	
	
	// 全屏看图
	// 实现居中
	center($('.full-screen-img'));
	// 窗口大小发生变化时实时居中
	$(window).resize(function(){
		center($('.full-screen-img'));
		
		var top = $(document).scrollTop();
		$('.full-screen-img').css({"top":top})
	})
	
	$('.work-details-img img').click(function fullScreenImg(){
		mask();
		
		// var ImgSrc = $(this).children("div").children("img").attr('src');
		var ImgSrc = $(this).attr('src');
		$('.full-screen-img img').attr('src',ImgSrc);
		
		center($('.full-screen-img'));
		
		var top = $(document).scrollTop();
		$('.full-screen-img').css({"top":top})
		
		$('.full-screen-img').fadeIn(300)
		
		if($('.full-screen-img img').innerHeight() < $(window).height()){
			// 获取元素宽度
			var boxWidth = $('.full-screen-img img').innerWidth();
			// 获取元素高度
			var boxHeight = $('.full-screen-img img').innerHeight();
			
			var boxWidth = boxWidth-$('full-screen-img-tit').innerWidth();
			var boxHeight = boxHeight-$('full-screen-img-tit').innerHeight();
			
			var x = ($(window).width()-boxWidth)/2/2;//使用$(window).width()获得显示器的宽，并算出对应的Div离左边的距离
			var y = ($(window).height()-boxHeight)/2/2;//使用$(window).height()获得显示器的高，并算出相应的Div离上边的距离
			
			$('.full-screen-img img').css({"top":y})
		}else{
			$('.full-screen-img img').css({"top":"0"})
		}
	})
	// 移动端返回
	$('.full-screen-back svg').click(function(){
		$(".mask").fadeOut(300);
		// 关闭遮罩是允许窗口滚动
		$(document).unbind("scroll.unable");
		
		// 关闭全屏看图
		$('.full-screen-img').fadeOut(300);
	})
	// 将图片设置为盒子的背景填充
	var Img = $('.content-lists-wrap li a div:first-child img').length; //获取图片数量
	for(var i=0;i<Img;i++){
		var ImgBg = $('.content-lists-wrap li a div:first-child img').eq(i).attr("src");
		$('.content-lists-wrap li>a>div:first-child').eq(i).css({"background":"url('" + ImgBg + "') 100% no-repeat"})
	}
	
	// 回到顶部
	$('.footer div div div:last-child').click(function(){
		$("html,body").finish().animate({"scrollTop":"0px"},900);
	});
	
	// 移动端搜索
	$('.nav-mobile-search').click(function(){
		mask();
		$('.search-mobile-wrap').css({"transform":"translateX(0)"});
		// $('.nav-wrap').css({"transform":"translateX(94%)","transition":"all 0.3s ease"});	//transform translate导致z-index失效
		$('.nav-wrap').css({"padding-left":"90.5%","transition":"all 0.3s ease"})
		$('.content').css({"transform":"translateX(94%)","transition":"all 0.3s ease"});
		$('.footer div').css({"transform":"translateX(94%)","transition":"all 0.3s ease"});
		$('body').css({"overflow":"hidden"});
	})
	$('.search-mobile div svg').click(function(){
		$(".mask").fadeOut(300);
		// 关闭遮罩允许窗口滚动
		$(document).unbind("scroll.unable");
		$('.search-mobile-wrap').css({"transform":"translateX(-100%)"})
		// $('.nav-wrap').css({"transform":"translateX(0)","transition":"all 0.3s ease"});	//transform translate导致z-index失效
		$('.nav-wrap').css({"padding-left":"0%","transition":"all 0.3s ease"})
		$('.content').css({"transform":"translateX(0)","transition":"all 0.3s ease"});
		$('.footer div').css({"transform":"translateX(0)","transition":"all 0.3s ease"});
		$('body').css({"overflow":"scroll"});
		
	})
	
	// 分享弹窗
	center($('.share-window'));
	// 窗口大小发生变化时实时居中
	$(window).resize(function(){
		center($('.share-window'));
	})
	// 打开分享弹窗
	$('.share').click(function(){
		mask();
		$('.share-window').fadeIn()
		$('.share-window').css({"animation":"share 0.3s ease forwards"})
	})
	// 关闭分享弹窗
	$('.share-window>div:last-child div:first-child').click(function(){
		$(".mask").fadeOut(300);
		$('.share-window').css({"animation":"share-close 0.3s ease forwards"})
		$('body').css({"overflow":"scroll"})
		
		// 关闭遮罩允许窗口滚动
		$(document).unbind("scroll.unable");
	})
	// 复制网址函数
	function copyHref(copyCont){
		var str = copyCont;
		var $temp = $('<input>');
		$('body').append($temp);
		$temp.val(str).select();
		document.execCommand('copy');
		$temp.remove();
	}
	$('.share-window>div:last-child div:last-child').click(function(){
		copyHref('https://gitname21.github.io/website/')
		
		$(".mask").fadeOut(300);
		$('.share-window').css({"animation":"share-close 0.3s ease forwards"})
		
		// 关闭遮罩允许窗口滚动
		$(document).unbind("scroll.unable");
	})
	
	// 二维码
	center($('.qr-code'));
	// 窗口大小发生变化时实时居中
	$(window).resize(function(){
		center($('.qr-code'));
	})
	$('.qr-code-btn').click(function(){
		mask();
		$('.qr-code').fadeIn()
		$('.qr-code').css({"animation":"share 0.3s ease forwards"})
	})
});