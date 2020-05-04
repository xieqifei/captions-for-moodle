function addElementVideo(parent, vtturl) {
  var track = document.createElement("track");
  track.setAttribute("default", "");
  track.setAttribute("kind", "captions");
  track.setAttribute("srclang", "zh");
  track.setAttribute("src", vtturl);
  parent.appendChild(track);}
var url ="https://zimu.api.xieqifei.com";
   var iframes = document.getElementsByTagName("iframe");
   if(iframes[0]!=null)
	{
		let observer = new MutationObserver(function(){
		var videos = document.getElementsByTagName("video");	
		if(videos[0]!=null)
			getVttUrl(url,function(vtturl){
				addElementVideo(videos[0],vtturl);
				observer.disconnect();});
				
		});
		let domiframe = iframes[0];
		let options = {
			"childList":true,
			"attributes":true
		};
		observer.observe(domiframe,options);
      }
  else
	{var videos = document.getElementsByTagName("video");
	if(videos[0]!=null)
     	 getVttUrl(url,function(vtturl){addElementVideo(videos[0],vtturl);})
}
function getVttUrl(url,callback){
 	var xhr = new XMLHttpRequest();
 	xhr.open("GET", url, true);
	xhr.responseType = "blob";
 	xhr.setRequestHeader("client_type", "DESKTOP_WEB");
 	xhr.onload =function(){ if(this.status == 200) {
		var blob = this.response;
		var vtturl=window.URL.createObjectURL(blob);
		callback(vtturl);
		}
	};
 	xhr.send();
}
