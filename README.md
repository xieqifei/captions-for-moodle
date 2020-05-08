# 第一章 插件用户手册

## 1.1 适用场景和功能说明

1. 本插件适用于基于chromium内核开发的浏览器，包括**Chrome浏览器、360安全浏览器、QQ浏览器**等。
2. 插件只在满足**https://\*/rwth-aachen.de/\***域名**匹配**时工作，且除了添加字幕外无其他功能。
3. 支持**德语、中文、双语**字幕
4. 插件只能为**数据库里存在的视频**资源**添加字幕**。更多视频字幕，会逐渐上传。

## 1.2 效果图预览

以下仅展示了双语字幕。

![](https://ae01.alicdn.com/kf/U82f285cdeda645b1b2b1c6aaafdec57f2.png)

## 1.3 插件安装

1. 下载插件https://lanzous.com/icb9h1a

2. 解压插件到桌面。获得以captions-for-moodle为名的文件夹。

   ![](https://ae01.alicdn.com/kf/Hf2869255fa0c49bf973aa50825ba47ff8.jpg)

3. 打开chrome浏览器，依次点击右上角的三个点图标—>更多工具—>扩展程序。或者在地址栏输入`chrome://extensions/`以打开扩展程序。

   ![](https://ae01.alicdn.com/kf/Hd3b1aedb657a41519bbb456c43198d18D.jpg)

4. 单击打开扩展程序右上角的开发者选项。

![](https://ae01.alicdn.com/kf/Hbb3e047e6d16498da7592aafb7749abbY.jpg)

然后开发者模式下方将出现`加载已解压的扩展程序`。

![](https://ae01.alicdn.com/kf/Hbb72c1ae5ca74a6f819042e5131ce7efp.jpg)

5. 点击**加载已解压的扩展程序**，在弹出页面，选择名称为`captions-for-moodle`文件夹。点击**选择文件夹**。此时页面出现Captions for Moodle RWTH 1.0插件。

![](https://ae01.alicdn.com/kf/H0b0a0d26f66541c5809fd11e17d0b36bE.jpg)

6. 至此插件安装完成，确认插件卡片里的选择按钮为蓝色，表示插件已激活。插件激活后，在浏览器右上角，将出现RWTH的图标。

![](https://ae01.alicdn.com/kf/H82bd3a2c0c1a4760b7d576a735ad812eQ.jpg)

且当你打开，`moodle.rwth-aachen.de`时，页面出现绿色浮动按钮。

![](https://ae01.alicdn.com/kf/H84b78f1894a545848e82bb899f2b1577V.jpg)

## 1.4 插件使用

1. 打开moodle课程视频页面，页面出现绿色悬浮按钮。

![](https://ae01.alicdn.com/kf/H3f9b8280cb794400ae6106988a71e3e6U.jpg)

2. 点击播放视频，直到**视频**加载成功且**开始播放**，**单击**绿色悬浮**按钮**，！重要，**等待几秒钟**。待字幕下载完毕，会自动加载到视频上。

![](https://ae01.alicdn.com/kf/H3e5382f96fd44da487b4d5da77053754O.jpg)

3. 下载完毕的字幕，**默认为德语字幕**，**再次单击**绿色按钮，切换**中文**字幕；再次单击，切换双语字幕；再次单击清除字幕。依次循环。

4. 若当前视频还没有上传字幕，视频字幕会显示

![](https://ae01.alicdn.com/kf/H5cdfa43615ea49708d22223eb72d7b06J.jpg)

在出现此字幕时，单击三次按钮，即此清除字幕或当视频播放到两分钟时自动清除。

## 1.5 其他说明

目前已支持的课程有

- Bioenergie
- Grundoperationen der Energietechnik (VO)
- Petrochemie und Raffinerietechnik (VU)
- 待添加

# 第二章 教学视频下载和字幕转换

## 2.1 系统要求和网络要求

插件用户安装我提供的视频下载和字幕转换工具。插件没提供的字幕，用户可自行本地转换，字幕转换成功后，可通过上传接口，将转换的字幕共享给每一位使用插件的用户。

1. 系统要求

此教程仅**适用于windows系统**，若有需求，后续可出Ubuntu系统教程。Mac系统暂不支持。

2. 网络要求⭐

- **软件的安装不需要连接外网！**
- **视频下载不需要连接外网！**

- **生成字幕必须连接外网！**字幕转换将请求谷歌的文字翻译API接口。请确保你在进行本章**第5节**内容，即获取字幕时，满足以下两种条件：
  - 用户电脑网络处于除中国大陆以外的地区。
  - 用户连接网速较好的VPN网络。**注意：VPN网络不佳，将使字幕转换出现中断。**

## 2.2 软件环境搭建

1. 打开命令管理器。

打开windows桌面右上角搜索功能

![](https://ae01.alicdn.com/kf/H4eaaea2ca879428e9bcd8210dd41a884t.jpg)

在搜索框输入cmd，并点击“以管理员身份运行”。

![](https://ae01.alicdn.com/kf/H138e311a7cb24cc7a19af0ae7a2031c6z.jpg)

打开后如图。注意：命令行开头是：C:\WINDOWS\system32

![](https://ae01.alicdn.com/kf/H918346e5c4b84b7c82f955e37ec0c9c76.jpg)

2. 安装包管理器chocolatey

**复制以下**指令

```
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

⭐⭐⭐**温馨提示：命令提示符里，使用右键单击即可复制和粘贴！**

在命令框里，**右键单击**。如图，然后回车运行。等待安装完成。

![](https://ae01.alicdn.com/kf/H196b206989f648559c11ba0c8c0034cc0.jpg)

通常，未出现红色提示，则表示安装成功。

当然为了确保成功安装，你可以通过在命令提示符里输入指令，注意V是大写

```
choco -V
```

输出**绿色版本号**。则安装成功，例如:0.10.15。

![](https://ae01.alicdn.com/kf/H8e190142f7fc4acb8a29dbb4e97d61bfo.jpg)

3. 安装 git python curl ffmpeg。

```
choco install git python curl ffmpeg -y
```

此安装过程较长，且取决于你当前所处网络环境。请耐心等待，保持电脑激活状态。

安装过程中，未提示红色字体，则表示安装成功。

可选：你可通过分别输入`git --version`，`python -V`,`curl -V`，`ffmpeg -V`。依次查看这几个软件是否安装成功，若出现版本号则表示安装成功。

4. 下载python程序并安装

```
python get-pip.py
pip install git+https://github.com/BingLingGroup/autosub.git@alpha ffmpeg-normalize langcodes
```

5. 安装成功。输入指令

   ```
   autosub -V
   ```

   显示版本号，则安装成功。

![](https://ae01.alicdn.com/kf/Hefd55d64696a4fbd82cce452048b27f0E.jpg)

6. 若出现错误提示如下图

![](https://ae01.alicdn.com/kf/H95f9347ba00c4ebe87e17c66beb2867ae.jpg)

可能是你系统的未安装**Microsoft Visual C++ 14.0**。

打开连接

https://964279924.ctfile.com/fs/1445568-239446865

下载**安装VC++**。安装后，**重复第4步**。

## **2.3 获得**视频地址

下载视频和转换字幕，需要提取视频的网络地址。以下教程将告诉你如何从网页里提取视频的网络地址。

1. 打开有视频的网页。

2. 确保视频**未开始播放**，在浏览器窗口**按下F12**，（或右键窗口，点击“检查”，）打开“开发者工具”。如果视频开始播放，将无法获得视频地址，必须刷新后，重复第二步。

![](https://ae01.alicdn.com/kf/H211a903dfde04bffa8ac0a3114e44d74d.jpg)

3. 在窗口下方的“开发者工具”里，依次点击Network->All。然后开始播放视频。控制台将开始刷新获取到的数据。

![](https://ae01.alicdn.com/kf/H63db9685e6f3425595c6f4d1bc10487eO.jpg)

4. 找到**playlist.m3u8**。右键单击，依次点击`copy-`>`copy link address`。
5. 至此，你已经获取了此视频的真实地址，将其保存到某个地方，以便下步操作。通过这个地址，利用下载工具就可以下载视频了。**注意：直接打开.m3u8地址，获取的不是视频文件，不能直接播放。需借助工具，将其转为mp4格式文件**

## 2.4 下载视频

如果你**需要转换字幕，**请**跳过此节**，下节内容，将包括视频的下载和字幕转换。

如果你只想下载视频，而不需要转换字幕，请看此章。

1. 你已经安装了第二节提供的软件，并在第三节**获取到了视频的真实地址**，那么在这节，你将知道，如何利用ffmpeg工具，将m3u8文件转为mp4格式视频。关于m3u8文件，可看本节补充说明。
2. 打开**命令提示符**，无需用管理员权限打开！在搜索栏输入`cmd`。双击打开。

![](https://ae01.alicdn.com/kf/Hc9c7a15d63f8409a8d66d9d93c2668acm.jpg)

3. 复制以下代码，在cmd窗口右键单击，然后回车运行。

```
curl -O https://gitee.com/xieqifei/captions_for_moodle/raw/master/getcaptions.bat && call getcaptions.bat
```

4. 在选择操作时，输入**2：网络下载视频，但不生成字幕**，

![](https://ae01.alicdn.com/kf/Hd5b0070930894da7bafd1ea489d1cab8r.jpg)

5. 在输入视频的网络地址里，输入2.3节获取的，以.m3u8结尾的链接。然后回车

![](https://ae01.alicdn.com/kf/H896116a606d2454d99828b2001cb7f48w.jpg)

6. 输入保存视频和字幕的地址，这里直接回车，将字幕保存到桌面。此时，软件开始工作。

![](https://ae01.alicdn.com/kf/H7873a672675b4fcf8a1208867e8556f6q.jpg)

![](https://ae01.alicdn.com/kf/Hdc06bb5d333f451eb3960cf358193742p.jpg)

补充说明：m3u8是一个视频片段的地址列表，利用视频处理工具，读取这个地址表，将切割成片段的ts格式视频拼接成一个ts格式视频，在将ts格式视频转化为mp4格式。

## 2.5 转换字幕

⭐请注意，执行本节内容之前，请确保，你的网络已连接外网，并且能打开`https://www.google.com`，否则将无法进行字幕转换操作。

1. 搜索并打开cmd命令提示符

2. 输入以下命令，下载并执行批处理脚本

```bash
curl -O https://gitee.com/xieqifei/captions_for_moodle/raw/master/getcaptions.bat && call getcaptions.bat
```

![](https://ae01.alicdn.com/kf/Hf10f415aaabd4db2b7e763f8e6a0fd74e.jpg)

3. 按照提示开始选择指令。直接回车。选择1：网络下载视频，并生成中德字幕。

![](https://ae01.alicdn.com/kf/Hc7bea45505354e95ab0d4e43192d1bd2R.jpg)

4. 填写视频的下载链接，参照**第三节**内容，复制第三节获取到的视频链接。直接在cmd窗口上右键单击，即可粘贴。

链接例子：`https://streaming.rwth-aachen.de/rwth/smil:engage-player_0fe26b35-3e44-47f0-acf6-a9c4fd05b0bc_presentation.smil/playlist.m3u8`

![](https://ae01.alicdn.com/kf/Hb092253dbd0b40d488c96ed68d7f17e9a.jpg)

5. 填写视频和字幕的保存地址。直接回车，默认保存到桌面。

![](https://ae01.alicdn.com/kf/Hee6ac3e4ee22457089bc60c7cff675f12.jpg)

6. 程序将自动开始运行，现在，你可以去泡杯茶，等待视频和字幕转换完成。

![](https://ae01.alicdn.com/kf/H3e241700e878434b9343e00a5901cfceW.jpg)

7. 下次运行脚本，可以直接在cmd命令指示符，输入`call getcaptions.bat`,而无需再次下载此脚本。若脚本有更新，可执行步骤2的代码。

# 第三章 和用户共享字幕

如果你已通过**第二章内容**，成功**获取到字幕文件**。那么你可以在以下链接里，将**字幕上传到服务器**，这样，每一个使用浏览器插件的用户，都能在视频里看到字幕。或直接下载字幕。

上传网站地址：https://zimu.api.xieqifei.com/captions

上传内容要求：

- 视频所在网页地址。
- 中文和德语字幕

## 3.1 获取视频网页的所在真实地址⭐⭐

**此地址非下载视频的地址**

由于每个老师上传视频的方式不同，若老师上传的视频你能直接在网页上下载，那么视频是以mp4等视频格式上传到网络。此时，视频所在地址，通常就是浏览器上方显示的地址。

若视频你无法直接下载，那么，老师上传的可能是m3u列表格式的视频。需要借助第二章的下载软件下载视频。此时，网页上使用iframe标签嵌入了另一个网页，若上传浏览器上方的网页地址到字幕分享网页，那么插件将无法匹配到相应的视频。因而无法添加字幕。下面讲解如何获取到视频网页所在的真实地址。

1. 点击播放要插入字幕的视频。请**确保视频已开始播放**。

![](https://ae01.alicdn.com/kf/H0d9300c035b24e598124d84cfe3048843.jpg)

2. 点击绿色按钮，开始获取字幕。此时应当出现，“此视频暂无字幕”的说明。
3. **按下F12键**，或右键窗口，点击“检查”，调出浏览器的“开发者工具”。

![](https://ae01.alicdn.com/kf/Hd0b73ed96a054f929a0db9e4c9a9afd6C.jpg)

4. 依次点击“开发者工具”里的，`Console->info`。这时可以看到，在控制窗口，出现了，一行网址。该网址，由插件中的content_script.js自动导出。**右键此网址**，点击**copy link address**。将其保存下来，以便上传字幕时需要。

## 3.2 上传字幕

1. 打开网络地址：https://zimu.api.xieqifei.com/captions

![](https://ae01.alicdn.com/kf/H6cd2a535ad0546d29a9e29ea73fdcb79Z.jpg)   

2. 在网址栏输入3.1节获取的网址

例如：`https://engage.streaming.rwth-aachen.de/paella/ui/watch.html?id=0fe26b35-3e44-47f0-acf6-a9c4fd05b0bc`

3. 分别上传德语和中文字幕

通过第二章工具导出的德语字幕以de-de.srt结尾。中文字幕以de-de.zh-cn.srt结尾。

![](https://ae01.alicdn.com/kf/H9d99c305f717472b8306bb633a441857z.jpg)

4. 勾选，我已知晓。点击提交。出现如下提示则，字幕上传成功。登陆moodle刷新页面，点击绿色小按钮，即可获取到字幕

![](https://ae01.alicdn.com/kf/H32730c126ede4688b910467240d831108.jpg)

若出现下图提示则说明上传失败，而数据库中已存在此视频字幕，视频未加载出字幕，可能是此视频音量太小，而无法转换出字幕，上传的字幕为空文件。。。若需要更新或者删除原字幕，请联系我。im@xieqifei.com

![image-20200509022504122](C:\Users\97532\AppData\Roaming\Typora\typora-user-images\image-20200509022504122.png)
