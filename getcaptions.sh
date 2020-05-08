#!/bin/bash
#参数1：存放视频和字幕的目录；
#参数2：视频的网络地址；
#参数3：输出视频的名称和格式
#存在问题：当包含重名文件的字幕时，autosub会不会覆盖掉原来的字幕？，此shell未将字幕重名情况剔除。
if [ ! -d "$1" ]; then
  mkdir "$1"
fi
if [ ! -f "$1/$3" ]; then
  rm -f "$1/$3"
fi
cmd="cd ${1} && ffmpeg -i ${2} ${3} && autosub -i \"${1}/${3}\" -S de-de -F vtt && autosub -i \"${1}/${3}\" -S de-de -D zh-cn -F vtt"
eval $cmd
