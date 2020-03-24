# ts-axios-anthony
a lib for typescript to use axios

# 1.前言

本项目脱胎于黄轶老师在慕课网发布的项目（基于TypeScript从零重构axios）：

[基于TypeScript从零重构axios](https://coding.imooc.com/class/330.html)


经过几个库的更新，原项目代码部分依赖已经不可用，于是重新搭建整个项目，作为自己的学习过程。

# 2.需求分析

> axios,基于Promise的HTTP客户端，用于浏览器和node.js

重构之前，我们需要简单地做一些需求分析，看一下我们这次重构需要支持哪些 Features。官方支持的Features如下：

- Make [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) from the browser
- ~~Make [http](http://nodejs.org/api/http.html) requests from node.js~~
- Supports the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- Intercept request and response
- Transform request and response data
- Cancel requests
- Automatic transforms for JSON data
- Client side support for protecting against [XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)

这次重构，我们只实现官方支持的8个Features中的7个，其中axios在node中的应用不打算实现，因为这部分在日常使用中相对较少。

# 3.目录介绍

本项目分为客户端（examples文件夹）和服务端（server文件夹）：客户端主要是用来检验重构功能的demo，采用TypeScript按照模块化进行编写；服务端是用来响应demo中发出的请求，采用express编写。
```
├─.gitignore
├─index.html
├─package.json
├─README.md
├─tsconfig.json       // TypeScript 编译配置文件
├─tslint.json         // TypeScript lint 文件
├─examples            // 每个功能点的demo
├─test                // 测试代码（待完善）
└─src                 // 源码目录
    ├─axios.ts
    ├─defaultes.ts  
    ├─cancel    
    ├─core    
    ├─helpers   
    └─types
```
# 4.项目运行

```bash
# 克隆项目到本地
git clone git@github.com:Anthony-01/ts-axios-anthony.git

# 进入项目目录
cd ts-axios

# 安装依赖
(国内可先 npm config set registry https://registry.npm.taobao.org)
npm install

# 开启调试模式
npm run dev

# 发布到npm
npm run pub
```
# 5.使用npm安装ts-axios-anthony
```bash
npm install ts-axios-anthony
```
