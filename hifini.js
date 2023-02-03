// ==UserScript==
// @name         hifini音乐下载脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       muji
// @match        https://www.hifini.com/*
// @grant        GM_download
// @connect *

// ==/UserScript==
/*
2022-03-21 09:35:49 HLW
只是练习一下js，说实话这么个简单的功能，用python 20分钟就能解决
经过一下午的工作，发现js还是有各种问题，而且还会涉及到安全性的问题，
功能不是很好，whatever.这里我就不在深入了

2022-10-18 12:57:30
修复跨域下载失败的问题，另外网页端业务也有调整，这里同步更新url获取的方式

2022-10-18 14:46:09
前面通过跨域去请求网页，然后手动保存文件的方式，无法打开，应该是二进制编码的问题，之前看到文件下下来了就没管了，才知道有隐藏的bug。
找半天没解决传统js的方式保存二进制文件错误的问题，翻看油猴脚本的函数文档时发现，可以直接下（GM_download），才知道前面都是脱了裤子放屁。

2022-10-21 10:35:01
修复名称导致的下载路径错误（/ \符号导致的名称变路径）
修复名称导致的下载失败（没有《》符号导致的名称解析为空）
*/





(function() {

    'use strict';

    var button = document.createElement("MJ_Button");
    button.textContent = "下载";
    button.style.width = "120px";
    button.style.color = "#0062CC";
    button.onclick = function () {
        var tt = document.title.toString();
        var _name = tt+".mp3";
        if(tt.indexOf("《") != -1)
        {
            _name = tt.substring(tt.indexOf("《") + 1, tt.indexOf("》")).trim() + " - " + tt.substring(0, tt.indexOf("《")).trim() +".mp3";
            _name = _name.replaceAll("/"," ").replaceAll("\\", " ");
        }

        var content = document.querySelectorAll("div.message script")[2].textContent.toString();
        var _herf = content.substring(content.indexOf("url") + 5, content.indexOf("pic"));
        if(_herf.indexOf(".m4a") != -1)
        {
            _herf = _herf.replaceAll("'","").replace(",","");
        }
        else
        {
            _herf = "https://www.hifini.com/" + _herf.trim().replace(',', '').replaceAll('\'', '');
        }
        GM_download(_herf, _name);
    }
    document.getElementsByClassName("media")[0].appendChild(button);

})();