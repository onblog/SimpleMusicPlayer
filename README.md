## 运行项目

```
# 克隆这仓库
$ git clone https://github.com/yueshutong/SimpleMusicPlayer
# 进入仓库
$ cd SimpleMusicPlayer
# 安装依赖库
$ npm install
# 运行应用
$ npm start
```

## 主界面图

![](https://user-images.githubusercontent.com/31175877/67552484-d0396980-f73d-11e9-9b57-36d6d096b766.jpg)

### 下面是一些项目开发过程中的知识点

## 开发环境

局部安装nodemon

```
npm install nodemon --save-dev
```
更改package.json文件
```
  "scripts": {
    "start": "nodemon --watch main.js --exec 'electron .'"
  },
```

## 模板字符串

```
`string text`

`string text line 1
 string text line 2`

`string text ${expression} string text`
```

## 本地存储

文档：https://github.com/sindresorhus/electron-store

```
const Store = require('electron-store');

const store = new Store();

store.set('unicorn', '🦄');
console.log(store.get('unicorn'));
//=> '🦄'

// Use dot-notation to access nested properties
store.set('foo.bar', true);
console.log(store.get('foo'));
//=> {bar: true}

store.delete('unicorn');
console.log(store.get('unicorn'));
//=> undefined
```

查看本地文件

```
% cd /Users/yueshutong/Library/Application\ Support/electron-quick-start
% ls
Code Cache                      Local Storage                   Preferences                     config.json
GPUCache                        Network Persistent State        blob_storage
% cat config.json
{
        "foo": {
                "bar": true
        }
}%                                                                                                                                                                            yueshutong@MacBookPro electron-quick-start % 

```

## js播放音乐

```
var horn = new Audio('car_horn.wav');
horn.play();
horn.pause();
horn.volume();
horn.addEventListener('loadeddata', () => {
  let duration = horn.duration;
  // The duration variable now holds the duration (in seconds) of the audio clip 
})
```

## DOM自定义数据

HTML：<div data-属性名="" ></div>
element.dataset.camelCasedName;

```
<div id="user" data-id="1234567890" data-user="johndoe" data-date-of-birth>John Doe
</div>

var el = document.querySelector('#user');

// el.id == 'user'
// el.dataset.id === '1234567890'
// el.dataset.user === 'johndoe'
// el.dataset.dateOfBirth === ''

el.dataset.dateOfBirth = '1960-10-03'; // set the DOB.

// 'someDataAttr' in el.dataset === false

el.dataset.someDataAttr = 'mydata';
// 'someDataAttr' in el.dataset === true
```

## 事件冒泡与代理

![图片正在加载中](https://user-images.githubusercontent.com/31175877/67548906-a67c4480-f735-11e9-9ef9-c3d426f4fa92.jpg)

## 打包

工具：https://www.electron.build/

安装： npm install --save-dev electron-builder

文档：https://www.electron.build/configuration/

## 工具

icns生成指南：https://www.jianshu.com/p/e74047f7cc91

Web开发者指南：https://developer.mozilla.org/zh-CN/docs/Web/Guide

一款字体图标库：https://fontawesome.com

## About

Email：[yster@foxmail.com](mailto:yster@foxmail.com)

如果帮助到你了，请不吝赞赏！谢谢！

<img src='https://i.loli.net/2020/01/13/pPoFNwT6fKCZQ2i.png' width="400px" />
