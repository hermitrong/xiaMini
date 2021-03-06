﻿
	
function removeMini(id) {
	var el;
	for (var i = 0; i < id.length; i++) {
		el = document.getElementById(id[i]);
		if (el) {
			el.parentNode.removeChild(el);
		}	
	}
}

function loadMini(id,css) {
	if (document.getElementById(id))
			return;
	var el = document.createElement("link");
	el.id = id;
	el.rel = 'stylesheet';
	el.href = chrome.extension.getURL(css);
	headEl = document.getElementsByTagName("head")[0];
	headEl.appendChild(el);
}

function removeCSS_trans() {
	removeMini(["t_xiamini"]);
	$("#J_transdislrc").click();
}

function switchtolrc() {
	loadMini("t_xiamini","hideTrans.css");			
	$("#J_transdislrc").click();
	$("#lrc_trans").attr("status", "lrc");
	$("#lrc_trans").attr("title", "LRC开启/t-LRC关闭中 (翻译隐藏)");
}
function switchtotxt() {
	$("#J_rendertxt").click();
}
function switchtotlrc() {
	$("#J_resetlrc").click();
}

function loadControl() {
	if (!document.getElementById("J_rendertxt")) {
		var div = "<div id='J_rendertxt' onclick='rendertxt()'></div>";
		$(document.body).append(div);
	}
	if (!document.getElementById("J_resetlrc")) {
		div = "<div id='J_resetlrc' onclick='resetlrc()'></div>";
		$(document.body).append(div); 				
	}
	if (!document.getElementById("J_transdislrc")) {
		div = "<div id='J_transdislrc' onclick='transdislrc()'></div>";
		$(document.body).append(div); 
	}
	
	var trackid = $("div.ui-track-current").attr("data-sid");
	
	if (document.getElementById("lyrics_control")) {
		// reset
		$("#J_lrcWrap").removeAttr("style");
		$("#J_lyricScrollWrap").removeAttr("style");
		$('#lyrics_control').attr("style", "display:block;");
		//var el_new = document.getElementById("lrc_edit");
		//el_new.href = "http://www.xiami.com/wiki/addlrc/id/" + trackid;
		return;
		}
		
	// var el = document.createElement("div");
	// el.id = "lyrics_control";
	// el.innerHTML = '<!--<a id="lrc_edit" title="编辑动态LRC歌词" target="_blank" href="http://www.xiami.com/wiki/addlrc/id/' + trackid + '">编辑歌词</a>-->';
	// el.innerHTML += '<a id="lrc_fullscreen" title="歌词全屏显示开关">f</a>';
	// el.innerHTML += '<a id="lrc_report" title="歌词报错" href="http://www.xiami.com/group/thread-detail/tid/193387" target="_blank">r</a>';
	// if (document.getElementsByClassName("no-lrc").length == 0)
		// el.innerHTML += '<a id="lrc_trans" title="LRC/t-LRC开启中" status="tlrc">s</a>';
	// else
		// el.innerHTML += '<a id="lrc_trans" title="文本歌词" status="txt" style="color:lightgray">s</a>';
		
	// headEl = document.getElementById('J_lrcWrap');
	//headEl.insertBefore(el, headEl.childNodes[4]);

}
function lyricsFull() {
	// reset
	$("#J_lrcWrap").removeAttr("style");
	$("#J_lyricScrollWrap").removeAttr("style");
	
	var middlewidth = $("#middle").width();
	var lrcWrapwidth = lrcWrapright = albumCoverwidth = playerCoverwidth = lyricScrollWrapwidth = [];
	lrcWrapwidth.push($("#J_lrcWrap").width());
	lrcWrapright.push($("#J_lrcWrap").css("padding-right"));
	lyricScrollWrapwidth.push($("#J_lyricScrollWrap").width());
	albumCoverwidth.push($("#J_albumCover").width());
	playerCoverwidth.push($("#J_playerCover").width());
	$("#lrc_fullscreen").click(function () {
		var palyingtabdisplay = $(".enter-button").css("display");
		if (palyingtabdisplay == "none") {
			var palyingdisplay = $(".seiya-chatroom").css("display");
			if (palyingdisplay == "block") {
				openmaxlrc();
				$(".seiya-chatroom").hide();
			} else {
				closemaxlrc();
				$(".seiya-chatroom").show();
			}
		} else {
			if ($("#J_tab").css("display") != "none" && $(".main-sidebar").css("display") != "none") {
				openmaxlrc();				
			} else {
				// reset
				closemaxlrc();
			}
		}
	});
	
	function openmaxlrc() {
		$("#lrc_fullscreen").hover(function(){
			$(this).css("color", "black");
		}, function() {
			$(this).css("color", "#f60");
		});
		
		$("#J_tab").hide("fast", function () {
			$(".main-sidebar").hide("fast", function () {
				$("#J_lrcWrap").css("padding-right", "0");
				$("#J_lrcWrap").width(middlewidth);
				//$("#J_albumCover").width("100%");
				$("#J_playerCover").width("1%");
				$("#J_lyricScrollWrap").css("width", "100%");
				$("#lyrics_control").css("width", "100%");
				$("#J_playerLrc").css("font-size", "120%");
			});
		});
	}

	function closemaxlrc() {
		$("#lrc_fullscreen").hover(function(){
			$(this).css("color", "#f60");
		}, function() {
			$(this).css("color", "black");
		});
		
		$("div#J_playerLrc").removeAttr("style");
		$("div#J_playerCover").removeAttr("style");
		//$("#J_albumCover").width(albumCoverwidth[0]);
		$("div#J_lyricScrollWrap").removeAttr("style");
		$("#J_lrcWrap").css("padding-right", "20px");
		$("#J_lrcWrap").animate({
			width : "350px"
		},
			function () {
			$(".main-sidebar").show("fast", function () {
				$("#J_tab").show("fast");
			});
		});
	}
}

function lyricsControl() {

	// lyrics fullscreen
	lyricsFull();

	//alert("lyricscontrol-full");
	var html = "";
	html += "<div id='J_rendertxt' onclick='rendertxt()'></div>";
	html += "<div id='J_resetlrc' onclick='resetlrc()'></div>";
	html += "<div id='J_transdislrc' onclick='transdislrc()'></div>";
	$('body').append(html);
			
	// t-LRC switch	
	$("#lrc_trans").click(function () {
		if ($(".no-lrc").length != 0)
			return;
		$("#lrc_trans").removeAttr("style");
		// removeMini(["t_xiamini"]);
		if ($("#lrc_trans").attr("status") == "tlrc") {
			//alert("tlrc");
			if ($('.ui-trans-line').length != 0) {
				//alert("tlrc->lrc");
				switchtolrc();
			}
			else {
				//alert("tlrc->txt");
				switchtotxt();
			}
		} else if ($("#lrc_trans").attr("status") == "lrc") {
			//alert("lrc");
			if ($('.ui-trans-line').length != 0)
				removeMini(["t_xiamini"]);
			switchtotxt();
		} else if ($("#lrc_trans").attr("status") == "txt") {
			//alert("txt");
			switchtotlrc();		
		}
	});
	
}

// lyrics control base
$(function (){ 
	var CurrentUrl = window.location.href;
	if (CurrentUrl.indexOf("#loaded") != -1) {
		setTimeout(function (){
			//alert("begin");
			lyricsControl(); 
         }, 2000);
	}
});
