@echo off
setlocal enabledelayedexpansion
chcp 65001
:start
cls
echo.
echo 正在执行视频处理程序，请按照指示进行操作
echo ##############请选择你将进行的操作##############
echo.
echo --------------1：网络下载视频，并生成中德字幕------------
echo --------------2：网络下载视频，但不生成字幕--------------
echo --------------3：已下载的视频，生成中德字幕-----------
echo.
echo.
echo 直接回车选择默认操作
set /p operation="请输入数字，选择操作：(默认：网络下载视频，并生成中德字幕)"
echo.
echo.
if "!operation!"=="" (
	set operation=1
) 
if !operation! == 1 (
	echo.
	echo.————已选择操作：网络下载视频，并生成中德字幕————
	echo.
	:scanfurl
	echo.
	echo ##############请输入视频的网络地址##############
	set /p videourl="请输入网络地址：(网络地址应该以https://开头)"
	if "!videourl!"=="" (
		echo 未输入地址，重新输入
		goto scanfurl
	)
) else if !operation! == 2 (
	echo.
	echo.————已选择操作：网络下载视频，但不生成字幕————
	echo.
	:scanfurl2
	echo.
	echo ##############请输入视频的网络地址##############
	set /p videourl="请输入网络地址：(网络地址应该以https://开头)"
	if "!videourl!"=="" goto scanfurl2
) else if !operation! == 3 (
	echo.————已选择操作：已下载的视频，生成中德字幕————
	echo.
	:setvideo
	echo.
	echo ##############请输入视频的存放路径##############
	echo.
	set /p videoaddr="请输入视频本地存放路径：(格式为：C:\Users\用户名\Desktop\name.mp4)"
	echo.
	if "!videoaddr!"=="" (echo 输入内容不能为空，请重新输入
		goto setvideo
		)
	if not exist !videoaddr! (echo 该路径下找不到对应文件,请仔细核对后重新输入。。
		goto setvideo)else (
		call :getname !videoaddr!
		echo 已从“!videoaddr!”路径下读取到视频文件！
		echo.)
) else (
	echo —————输入指令错误，请输入1-3之间的数字。
	pause
	goto start
)

echo.
:setaddr
echo ############设置生成后的文件存放地址############
echo.
set /p addr="将文件保存至：(格式：C:\Users\用户名\Desktop；默认保存到桌面)"
if "!addr!"=="" (set addr=%USERPROFILE%\Desktop)
if not exist !addr! (echo 当前路径不存在，请重新选择路径 
	set addr=%USERPROFILE%\Desktop
	goto setaddr)
echo.
echo.你当前选择的存储路径是：
echo !addr!

rem 判断执行哪些步骤

if !operation! == 3 (goto createcaptions)

echo.#############开始下载视频############
cd !addr!
set filename=video%random%
set filenameplus=!filename!.mp4
ffmpeg -i !videourl! !filenameplus!
set videoaddr=!addr!\!filenameplus!
echo ################视频下载完毕#############

if !operation! == 2 (goto end)

:createcaptions

echo.################开始生成德语字幕#############
cd !addr!
autosub -i "!videoaddr!" -S de-de -F srt
echo.
echo ############德语字幕生成完毕，开始生成中文字幕#############
cd !addr!
autosub -i "!addr!\!filename!.de-de.srt" -SRC de -D zh-cn -F srt
echo.
echo.
echo ##############字幕生成完毕################
echo.
echo.
pause
echo 下载的视频和字幕存放在:!addr!
echo.
if (!operation!==2||!operation!==3)(goto end)
echo.
echo #############上传字幕到服务器############
echo.
set /p ifupload="是否将生成的字幕上传到服务器，以分享给其他用户下载？否请输入N,是请直接回车"
if "!ifupload!" == "N"(goto end)else (
	echo.即将开始上传字幕，在进行后续步骤之前，请您打开!addr!\!filename!.de-de.srt等字幕文件，检查字幕是否成功生成。。)
echo.
set /p ifok="若字幕生成错误，请输入N以中止上传，否则，请回车开始上传"
if "!ifok!" == "N"(goto end)else(
	echo.
	echo.正在上传字幕，请等待上传结果！)
set id=!videourl:~57,36!
set web-url=https://engage.streaming.rwth-aachen.de/paella/ui/watch.html?id=!id!
curl -F "lang-de=@!addr!\!filename!.de-de.srt" -F "lang-cn=@!addr!\!filename!.de-de.zh-cn.srt" -F "videourl=!web-url!" https://zimu.api.xieqifei.com/captions/index/setcaptions
pause
:end
exit
:getname
set filename=%~n1