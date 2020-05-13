// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
//向contentjs发送获取网页请求
function sendMessageToContentScript(message, callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response)
        {
            if(callback) callback(response);
        });
    });
}
sendMessageToContentScript({please:1}, function(response)
{
    var sideurl=response.sideurl;
    var status=response.vttstatus;
    var hasvideo=response.hasvideo;
    var id=response.id;
    changePopup(status,sideurl,hasvideo,id);
});

function changePopup(status, sideurl,hasvideo,id) {
    var hascaptions = document.getElementById("hascaptions");
    var nocaptions = document.getElementById("nocaptions");
    var novideo = document.getElementById("novideo");
    var hasiframe= document.getElementById("hasiframe");
    if(status==200){
        nocaptions.style.display="none";
        hascaptions.style.display="inline";
        novideo.style.display="none";
        hasiframe.style.display="none";
        var url_de ="https://zimu.api.xieqifei.com?url="+encodeURIComponent(sideurl)+"&lang="+"de";
        var url_cn="https://zimu.api.xieqifei.com?url="+encodeURIComponent(sideurl)+"&lang="+"cn";
        document.getElementById("dl-video").value="https://streaming.rwth-aachen.de/rwth/smil:engage-player_"+id+"_presentation.smil/playlist.m3u8";
        document.getElementById("captions-container").style.width="400px";
        document.getElementById("dl-lang-de").value=url_de;
        document.getElementById("dl-lang-cn").value=url_cn;
    }
    else if(status==201&&hasvideo==1&&id==-1){
        hascaptions.style.display="none";
        nocaptions.style.display="inline";
        hasiframe.style.display="none";
        novideo.style.display="none";
        var inputvideourl = document.getElementById("videoUrl");
        if(sideurl==null)
        {
            inputvideourl.value = "正在加载地址……";
        }else
            inputvideourl.value = sideurl;
    }else if (status==201&&id!="-1"){
        hascaptions.style.display="none";
        nocaptions.style.display="none";
        novideo.style.display="none";
        hasiframe.style.display="inline";
        document.getElementById("dl-videourl").value="https://streaming.rwth-aachen.de/rwth/smil:engage-player_"+id+"_presentation.smil/playlist.m3u8";
        document.getElementById("captions-container").style.width="400px";
    }else{
        hascaptions.style.display="none";
        nocaptions.style.display="none";
        hasiframe.style.display="none";
        novideo.style.display="inline";
        document.getElementById("captions-container").style.width="400px";
    }
}
// 监听来自content-script的消息
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
// {
//     // console.log('收到来自content-script的消息：');
//     // console.log(request, sender, sendResponse);
//     sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
//     sideurl = request.sideurl;
//     var inputvideourl = document.getElementById("videoUrl");
//     inputvideourl.value = "sideurl";
// });