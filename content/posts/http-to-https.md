---
title: "http 协议升级为 https 协议"
description: "HTTP 的连接很简单，是无状态的; HTTPS 协议是由 SSL + HTTP 协议构建的可进行加密传输、身份认证的网络协议，比 HTTP 协议安全。"
tags: ['计算机网络']
date: 2021-11-11
---

# http 协议升级为 https 协议

## HTTP 和 HTTPS 的区别

- HTTP 是超文本传输协议，信息是明文传输; HTTPS则是具有安全性的 SSL 加密传输协议
- HTTP 和 HTTPS 使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443
- HTTP 的连接很简单，是无状态的; HTTPS 协议是由 SSL + HTTP 协议构建的可进行加密传输、身份认证的网络协议，比 HTTP 协议安全

## 获取 SSL 证书并安装

证书是一个二进制文件，里面包含经过认证的网站公钥和一些元数据。 需要通过进销商购买，比如：腾讯云、阿里云等等。

> 阿里云和腾讯云都有免费的证书可以申请

### 具体流程：

1. 登录阿里云 -> 控制台 -> 产品与服务 -> 搜索 SSL 证书

![](https://picbed-1258935921.cos.ap-guangzhou.myqcloud.com/20230616151048.png)

2. 进入 SSL 证书页面 -> 选择 SSL 证书 -> 免费证书立即购买

![1636624000044](https://picbed-1258935921.cos.ap-guangzhou.myqcloud.com/20230616151228.png)

> **注意：一个自然年内可以领取一次数量为20的免费证书资源包**

3. 创建证书 -> 证书申请 -> 填写信息 -> 验证 DNS 信息 -> 提交审核

![1636624355123](https://picbed-1258935921.cos.ap-guangzhou.myqcloud.com/20230616151250.png)

![1636624430879](https://picbed-1258935921.cos.ap-guangzhou.myqcloud.com/20230616151258.png)

> 如果使用的是腾讯云，需要去腾讯云的域名解析填写相应信息，才能验证通过

![1636624872759](https://picbed-1258935921.cos.ap-guangzhou.myqcloud.com/20230616151317.png)

4. 审核成功后，就可以部署了，点击证书下载，选择我们需要部署的服务器类型，这里我用的是 Nginx

![1636625183920](https://picbed-1258935921.cos.ap-guangzhou.myqcloud.com/20230616151336.png)

解压得到两个文件，把它们上传到服务器中

![1636625293580](https://picbed-1258935921.cos.ap-guangzhou.myqcloud.com/20230616151350.png)

我这里放在 /etc/nginx/ssl/www 目录下，可以自定义

![1636625608463](https://picbed-1258935921.cos.ap-guangzhou.myqcloud.com/20230616151403.png)

5. 配置 nginx 文件，进入 nginx 安装目录下，我这里是 `/etc/nginx`，里面有个 `conf.d` 文件夹，进入里面修改配置

```shell
cd /etc/nginx/conf.d # 切换路径
vim www.conf         # 编辑配置文件
```

配置文件信息如下：

```shell
server {
    listen 80;
    listen 443 ssl;
    server_name  www.fanjs.cn; # 网站域名
    root /var/www/home; # 项目路径
    index index.html index.htm;
    ssl_certificate /etc/nginx/ssl/www/6586197_www.fanjs.cn.pem;  #需要替换成已上传的证
书文件的名称。
    ssl_certificate_key /etc/nginx/ssl/www/6586197_www.fanjs.cn.key; #需要替换成已上传的证书私钥文件的名称。
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    #表示使用的加密套件的类型。
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #表示使用的TLS协议的类型。
    ssl_prefer_server_ciphers on;
    location / {
        root   /var/www/home;
        index  index.html index.htm;
    }
}
```

保存配置，重启 nginx 服务：

```shell
nginx -s reload # 重启服务
nginx -t        # 查看配置是否正确
```

6. 如果想要 http 请求自动跳转 https，可以进行如下配置

```shell
server {
    listen 80;
    server_name fanjs.cn; #需要替换成证书绑定的域名。
    rewrite ^(.*)$ https://$host$1; #将所有HTTP请求通过rewrite指令重定向到HTTPS。
    # return 301 https://$host$request_uri;
    location / {
        index index.html index.htm;
    }
}
```

> 注意： 如果您使用的是阿里云ECS服务器，必须在ECS管理控制台的安全组页面，配置放行80端口和443端口，否则网站访问可能出现异常。

## 检测是否安装成功

可以使用 [SSL Labs Server Test](https://www.ssllabs.com/ssltest/analyze.html) 网站验证自己网站是否安装证书成功
