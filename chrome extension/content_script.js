var new_element_N = document.createElement("style");
new_element_N.innerHTML = '#drager {' + '   position: fixed;' + '   width: 35px;' + '   height: 35px;' + '   background-color: rgba(0, 255, 0, 0.2);' + '   z-index: 10000;' + '   cursor: pointer;' + '   top: 50px;' + '   left: 50px;' + '   border-radius: 30%;' + '   padding: 6px;' + ' }' + ' ' + ' #drager>div {' + '   border-radius: 50%;' + '   width: 100%;' + '   height: 100%;' + '   background-color: rgba(0, 255, 0, 0.6);' + '   transition: all 0.2s;' + '  -webkit-transition: all 0.2s;' + '  -moz-transition: all 0.2s;' + '  -o-transition: all 0.2s;' + ' }' + ' #drager:hover>div{' + '   background-color: rgba(0, 0, 0, 0.6);' + ' } ';
document.body.appendChild(new_element_N);
new_element_N = document.createElement('div');
new_element_N.setAttribute("id", "drager");
new_element_N.style.top = "100px";
new_element_N.style.left = "100px";
new_element_N.innerHTML = ' <div></div>';
var iframe = document.getElementsByTagName("iframe");
vtturl_de=null;
vtturl_cn=null;
vttstatus=201;
hasvideo=0;
callStatus(window.location.href);
if(iframe[0]!=null) {
    console.log("当前页面存在iframe，控件被隐藏");
    new_element_N.style.display="none";
}
else{
    new_element_N.style.display="inline";
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
    {
        // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
        if(window.location.href.indexOf("engage.streaming.rwth-aachen.de") != -1){
            var id=getQueryVariable("id");
        }else{
            id="0";
        }
        if(request.please == 1){
            sendResponse({sideurl:window.location.href,vttstatus:vttstatus,hasvideo:hasvideo,id:id});
            console.log("成功发送消息给popupjs,视频状态为"+vttstatus);
        }
    });
}
document.body.appendChild(new_element_N);
// 
// 
var posX;
var posY;
var screenWidth = document.documentElement.clientWidth;
var screenHeight = document.documentElement.clientHeight;
var fdiv = document.getElementById("drager");
fdiv.onmousedown = function(e) {
    screenWidth = document.documentElement.clientWidth;
    screenHeight = document.documentElement.clientHeight;
    if (!e) {
        e = window.event;
    } //IE
    posX = e.clientX - parseInt(fdiv.style.left);
    posY = e.clientY - parseInt(fdiv.style.top);
    document.onmousemove = mousemove;
}
document.onmouseup = function() //释放时自动贴到最近位置
{
    document.onmousemove = null;
    if ((parseInt(fdiv.style.top) + parseInt(fdiv.clientHeight) / 2) <= (screenHeight / 2)) { //在上半部分
        if ((parseInt(fdiv.style.left) + parseInt(fdiv.clientWidth) / 2) <= (screenWidth / 2)) { //在左半部分
            if ((parseInt(fdiv.style.top) + parseInt(fdiv.clientHeight) / 2) <= (parseInt(fdiv.style.left) + parseInt(fdiv.clientWidth) / 2)) { //靠近上方
                fdiv.style.top = "0px";
            } else { //靠近左边
                fdiv.style.left = "0px";
            }
        } else { //在右半部分
            if ((parseInt(fdiv.style.top) + parseInt(fdiv.clientHeight) / 2) <= (screenWidth - (parseInt(fdiv.style.left) + parseInt(fdiv.clientWidth) / 2))) { //靠近上方
                fdiv.style.top = "0px";
            } else { //靠近右边
                fdiv.style.left = (screenWidth - parseInt(fdiv.clientWidth)) + "px";
            }
        }
    } else { //下半部分
        if ((parseInt(fdiv.style.left) + parseInt(fdiv.clientWidth) / 2) <= (screenWidth / 2)) { //在左半部分
            if ((screenHeight - (parseInt(fdiv.style.top) + parseInt(fdiv.clientHeight) / 2)) <= (parseInt(fdiv.style.left) + parseInt(fdiv.clientWidth) / 2)) { //靠近下方
                fdiv.style.top = (screenHeight - parseInt(fdiv.clientHeight)) + "px";
            } else { //靠近左边
                fdiv.style.left = "0px";
            }
        } else { //在右半部分
            if ((screenHeight - (parseInt(fdiv.style.top) + parseInt(fdiv.clientHeight) / 2)) <= (screenWidth - (parseInt(fdiv.style.left) + parseInt(fdiv.clientWidth) / 2))) { //靠近上方
                fdiv.style.top = (screenHeight - parseInt(fdiv.clientHeight)) + "px";
            } else { //靠近右边
                fdiv.style.left = (screenWidth - parseInt(fdiv.clientWidth)) + "px";
            }
        }
    }
}
function mousemove(ev) {
    if (ev == null) {
        ev = window.event;
    } //IE
    if ((ev.clientY - posY) <= 0) { //超过顶部
        fdiv.style.top = "0px";
    } else if ((ev.clientY - posY) > (screenHeight - parseInt(fdiv.clientHeight))) { //超过底部
        fdiv.style.top = (screenHeight - parseInt(fdiv.clientHeight)) + "px";
    } else {
        fdiv.style.top = (ev.clientY - posY) + "px";
    }

    if ((ev.clientX - posX) <= 0) { //超过左边
        fdiv.style.left = "0px";
    } else if ((ev.clientX - posX) > (screenWidth - parseInt(fdiv.clientWidth))) { //超过右边
        fdiv.style.left = (screenWidth - parseInt(fdiv.clientWidth)) + "px";
    } else {
        fdiv.style.left = (ev.clientX - posX) + "px";
    }
    // console.log( posX +" "+ fdiv.style.left);
}
window.onload = window.onresize = function() { //窗口大小改变事件
    screenWidth = document.documentElement.clientWidth;
    screenHeight = document.documentElement.clientHeight;
    if ((parseInt(fdiv.style.top) + parseInt(fdiv.clientHeight)) > screenHeight) { //窗口改变适应超出的部分
        fdiv.style.top = (screenHeight - parseInt(fdiv.clientHeight)) + "px";
    }
    if ((parseInt(fdiv.style.left) + parseInt(fdiv.clientWidth)) > screenWidth) { //窗口改变适应超出的部分
        fdiv.style.left = (screenWidth - parseInt(fdiv.clientWidth)) + "px";
    }
    document.onmouseup.apply()
};
fdiv.addEventListener('touchstart', fdiv.onmousedown, false);
fdiv.addEventListener('touchmove',
function(event) {
    // 如果这个元素的位置内只有一个手指的话
    if (event.targetTouches.length == 1) {　　　　event.preventDefault(); // 阻止浏览器默认事件，重要 
        var touch = event.targetTouches[0];
        if ((touch.pageY) <= 0) { //超过顶部
            fdiv.style.top = "0px";
        } else if (touch.pageY > (screenHeight - parseInt(fdiv.clientHeight))) { //超过底部
            fdiv.style.top = (screenHeight - parseInt(fdiv.clientHeight)) + "px";
        } else {
            fdiv.style.top = (touch.pageY - parseInt(fdiv.clientHeight) / 2) + "px";
        }

        if (touch.pageX <= 0) { //超过左边
            fdiv.style.left = "0px";
        } else if (touch.pageX > (screenWidth - parseInt(fdiv.clientWidth))) { //超过右边
            fdiv.style.left = (screenWidth - parseInt(fdiv.clientWidth)) + "px";
        } else {
            fdiv.style.left = (touch.pageX - parseInt(fdiv.clientWidth) / 2) + "px";
        }
    }
},
false);
fdiv.addEventListener('touchend', document.onmouseup, false);
click_times = 0;
fdiv.onclick = setCaptions;
function setCaptions() {
    //alert("正在从云端获取字幕文件~~加载时间大概20秒，请不要重复点击");
    var lang = 'de';
    click_times++;
    // var url_de ="https://zimu.api.xieqifei.com?url="+encodeURIComponent(window.location.href)+"&lang="+"de";
    // var url_cn="https://zimu.api.xieqifei.com?url="+encodeURIComponent(window.location.href)+"&lang="+"cn";
    var videos = document.getElementsByTagName("video");
    if(videos[0]!=null){
        hasvideo=1;
    }
    if(videos[0]!=null&&vttstatus==200){
        switch(click_times){
            case 1:
                lang = 'de';
                delectElementTrack(videos[0]);
                addElementVideo(videos[0],vtturl_de,lang);
                // //alert("正在加载德语字幕~~~加载时长大约10秒，再次双击将切换中文字幕。");
                // if(vtturl_de==null){
                //     getVttUrl(url_de,function(vtturl){
                //         delectElementTrack(videos[0]);
                //         addElementVideo(videos[0],vtturl,lang);
                //         vtturlde=vtturl;//alert("字幕加载成功！");
                //         //alert("字幕下载链接："+"https://zimu.api.xieqifei.com?url="+encodeURIComponent(window.location.href)+"&lang="+"de");
                //     });
                //     getVttUrl(url_cn,function (vtturl) {
                //         vtturlcn=vtturl;
                //     })
                // }
                // else{
                //     addElementVideo(videos[0],vtturlde,lang);
                // }
                break;
            case 2:
                lang='cn';
                delectElementTrack(videos[0]);
                addElementVideo(videos[0],vtturl_cn,lang);
                // if(vtturlcn==null){
                //     getVttUrl(url_cn,function(vtturl){
                //         delectElementTrack(videos[0]);
                //         addElementVideo(videos[0],vtturl,lang);
                //         vtturlcn=vtturl;//alert("字幕加载成功！");
                //         //alert("字幕下载链接："+"https://zimu.api.xieqifei.com?url="+encodeURIComponent(window.location.href)+"&lang="+"cn");
                //     });
                // }
                // else {
                //     delectElementTrack(videos[0]);
                //     addElementVideo(videos[0],vtturlcn,lang);
                // }
                break;
            case 3:
                addElementVideo(videos[0],vtturl_de,"de");
                // if (vtturlde==null){
                //     getVttUrl(url_de,function(vtturl){
                //         addElementVideo(videos[0],vtturl,"de");
                //         vtturlde=vtturl;});
                // }
                // else {
                //     addElementVideo(videos[0],vtturlde,"de");
                // }
                break;
            default:
                lang = 'null';
                delectElementTrack(videos[0]);
                click_times=0;
        }
    }
    else if(videos[0]==null)
        alert("未检测到当前存在播放的视频！");
    else
        alert("当前视频还未添加字幕，点击右上角插件图标，为此视频添加字幕！");
}

// chrome.runtime.sendMessage({sideurl: window.location.href}, function(response) {
//     alert('收到来自后台的回复：' + response);
// });
// function getVttUrl(url,callback){
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", url, true);
//     xhr.responseType = "blob";
//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
//     xhr.onload =function(){ if(this.status == 200) {
//         var blob = this.response;
//         var vtturl=window.URL.createObjectURL(blob);
//         console.log("获取到中德字幕");
//         vttstatus=200;
//         callback(vtturl);
//         }
//         else if(this.status==201){
//         var blob = this.response;
//         var vtturl=window.URL.createObjectURL(blob);
//         console.log("此视频无字幕，使用默认字幕");
//         vttstatus=201;
//         callback(vtturl);
//     }
//     };
//     xhr.send();
// }
function callStatus(url) {
    var url_de ="https://zimu.api.xieqifei.com?url="+encodeURIComponent(url)+"&lang="+"de";
    var url_cn="https://zimu.api.xieqifei.com?url="+encodeURIComponent(url)+"&lang="+"cn";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url_de, true);
    xhr.responseType = "blob";
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.onload =function(){ if(this.status == 200) {
        var blob = this.response;
        vtturl_de=window.URL.createObjectURL(blob);
        vttstatus=200;
        }
        else if(this.status==201){
        var blob = this.response;
        vtturl_de=window.URL.createObjectURL(blob);
        vttstatus=201;
        }
    };
    xhr.send();
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url_cn, true);
    xhr.responseType = "blob";
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.onload =function(){ if(this.status == 200) {
        var blob = this.response;
        vtturl_cn=window.URL.createObjectURL(blob);
        vttstatus=200;
    }
    else if(this.status==201){
        var blob = this.response;
        vtturl_cn=window.URL.createObjectURL(blob);
        vttstatus=201;
        }
    };
    xhr.send();
}
function addElementVideo(parent, vtturl,lang) {
    var track = document.createElement("track");
    track.setAttribute("default", "");
    track.setAttribute("kind", "subtitles");
    track.setAttribute("srclang", "zh");
    track.setAttribute("src", vtturl);
    track.setAttribute("id", lang);
    track.style.fontSize="small";
    parent.appendChild(track);
}
function delectElementTrack(parent){
    if(parent!=null){
        parent.innerHTML="";
    }
}
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}