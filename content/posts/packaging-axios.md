---
title: "axios 介绍与二次封装"
description: "axios 是目前前端使用非常广泛的网络请求库，主要特点包括：在浏览器中发送 XMLHttpRequests 请求、在 node.js 中发送 http 请求、支持 Promise API 、拦截请求和响应、转换请求和响应数据。"
tags: [js]
date: 2021-2-20
---

# axios 介绍与二次封装

## 前端网络请求的选择

### 选择一：传统的Ajax

- 传统的 Ajax 是基于 XMLHttpRequest（XHR）
- 为什么不用它？
  - 配置和调用方式非常混乱
  - 编码起来看起来就非常蛋疼
  - 所以真实开发中很少直接使用，而是使用 jQuery-Ajax

### 选择二：jQuery-Ajax

- 相对于传统的 Ajax 非常好用
- 为什么不选择它？
  - jQuery 整个项目太大，单纯使用 ajax 却要引入整个 jQuery 非常不合理（采取个性化打包的方案又不能享受CDN服务）
  - 基于原生的 XHR 开发，XHR 本身的架构不清晰，已经有了 fetch 的替代方案
  - 尽管 jQuery 对我们前端的开发工作曾有着深远的影响，但是的确正在退出历史舞台

### 选择三：Fetch API

选择或者不选择它？

- Fetch是AJAX的替换方案，基于Promise设计，很好的进行了关注分离，有很大一批人喜欢使用fetch进行项目开发
- 但是Fetch的缺点也很明显，首先需要明确的是Fetch是一个 low-level（底层）的API，没有帮助你封装好各种各样的功能和实现  
- 比如发送网络请求需要自己来配置Header的Content-Type，不会默认携带cookie等
- 比如错误处理相对麻烦（只有网络错误才会reject，HTTP状态码404或者500不会被标记为reject）
- 比如不支持取消一个请求，不能查看一个请求的进度等等
- MDN Fetch学习地址：[MDN Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

### 选择四：axios

- axios 是目前前端使用非常广泛的网络请求库
- 主要特点包括：在浏览器中发送 XMLHttpRequests 请求、在node.js 中发送 http 请求、支持 Promise API 、拦截请求和响应、转换请求和响应数据
- axios：ajax i/o system

## axios的配置信息

### 请求配置选项

可用的配置选项：

- 只有URL是必须要传的
- 如果没有指定 method，请求将默认使用 `get` 请求

```json
{
  // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // default

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data, headers) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

   // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属：Stream
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,

   // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

 // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

   // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // `responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default

   // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

   // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

   // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // default

  // `socketPath` defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  socketPath: null, // default

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}
```

### 响应结构信息

![1613833838123](https://picbed-1258935921.cos.ap-guangzhou.myqcloud.com/20230616153040.png)

某个请求的响应包括以下信息：

```json
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 服务器响应的头
  headers: {},

   // `config` 是为请求提供的配置信息
  config: {},
 // 'request'
  // `request` is the request that generated this response
  // `request` 是生成此响应的请求
  // It is the last ClientRequest instance in node.js (in redirects)
  // 它是node.js中的最后一个ClientRequest实例
  // and an XMLHttpRequest instance the browser
  // 以及浏览器的XMLHttpRequest实例
  request: {}
}
```

### 默认配置信息

你可以指定将被用在各个请求的配置默认值：

**全局的 axios 默认配置：**

```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

**自定义实例默认配置：**

```js
const instance = axios.create({
  baseURL: 'https://api.example.com'
});

// 在创建实例之后更改默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

配置信息的查找顺序如下：

- 优先是请求的 config 参数配置；
- 其次是实例的 default 中的配置；
- 最后是创建实例时的配置。

## axios 的基本使用

### 支持多种请求方式

- axios(config)
- axios.request(config)
- axios.get(url[, config])
- axios.delete(url[, config])
- axios.head(url[, config])
- axios.post(url[, data[,config]])
- axios.put(url[, data[,config]])
- axios.patch(url[, data[,config]])

axios函数、get请求、post请求本质上都是 request请求

```js
  componentDidMount() {
    // 1.真实开发逻辑，拿到数据
    this.setState({
      products: [...this.state, ...res]
    })
  }
```

测试网络请求：（下面使用 [httpbin](http://httpbin.org) 这个网站来测试）

演示在 componentDidMount 中发送请求

axios 发送基本的网络请求：

```js
axios({
    url: "http://httpbin.org/get",
    params:{
        name: 'fan',
        age: 22
    },
    method: "get"
}).then(res => {
    console.log(res);
}).catch(err => {
    console.error(err);
})

axios({
    url: "http://httpbin.org/post",
    data:{
        name: 'tang',
        age: 22
    },
    method: "post"
}).then(res => {
    console.log(res);
}).catch(err => {
    console.error(err);
})
```

axios 发送 get/post 请求：

```js
axios.get("http://httpbin.org/get", {
    params: {
        name: 'fan',
        age: 18
    }
}).then(console.log)

axios.post("http://httpbin.org/post", {
    data: { 
        name: "tang",
        age: 19
    }
}).then(console.log)
```

不使用 promise 的话，可以使用 await async 来发送网络请求

使用 await async 发送网络请求：

```js
// await 需要配合 async 使用
async componentDidMount() {
    const result = await axios.get("http://httpbin.org/get", {
      params: {
        name: 'fan',
        age: 18
      }
    })
    console.log(result);
}
```

使用 await async 想获取错误信息的话，需要使用 `try { } catch() { }`

```js
try {
	const result = await axios.get("http://httpbin.org/get", {
		params: {
			name: 'fan',
			age: 18
		}
	})
	console.log(result);
	} catch(err) {
		console.error(err);
	}
}
```

使用 all() API 来合并网络请求：

```js
const request1 = axios({
    url: "http://httpbin.org/get",
    params: {
        name: "fan",
        age: 20 
    }
})

const request2 = axios({
    url: "http://httpbin.org/post",
    data: {
        name: "tang",
        age: 28
    },
    method: 'post' 
})

// 打印出来的是数组
// axios.all([request1, request2]).then(res => {
//   console.log(res);
// }).catch(err => {
//   console.error(err)
// })

// 对数组进行解构，resolve 打印的是两个对象
axios.all([request1, request2]).then(([res1,res2]) => {
    console.log(res1,res2);
}).catch(err => {
    console.error(err)
})
```

axios.all 相当于 Promise.all 

![1613830883524](https://picbed-1258935921.cos.ap-guangzhou.myqcloud.com/20230616153301.png)

```js
const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("promise1")
    }, 1000)
})
const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("promise2")
    }, 3000)
})
Promise.all([promise1, promise2]).then(res => {
    console.log(res);
}).catch(err => {
    console.error(err)
})
```

## axios拦截器

axios 库可以添加拦截器

请求拦截器：在发送请求时，请求被拦截

- 发送网络请求时，在页面中添加一个loading组件作为动画
- 某些网络请求要求用户必须登录，可以在请求中判断是否携带了token，没有携带token直接跳转到login页面 
- 对某些请求参数进行序列化 

响应拦截器：在响应结果中，结果被拦截；

- 响应拦截中可以对结果进行二次处理（比如服务器真正返回的数据其实是在response的data中）
- 对于错误信息进行判断，根据不同的状态进行不同的处理

```js
// 请求拦截器：axios.interceptors.request.use()
// 响应拦截器：axios.interceptors.response.use()	
axios.interceptors.request.use(res => {
    console.log('请求拦截');
    return res;
}, err => {

})

axios.interceptors.response.use(res => {
    return res.data;
}, err => {
    if(err && err.response) {
        switch(err.response.status) {
            case 400:
                console.log('请求错误');
                break;
            case 401:
                console.log('为授权访问');
                break;
            default:
                console.log('其他错误信息');
        }
    }
    return err;
})

axios({
    url: "http://httpbin.org/get",
    params: {
        name: 'fan',
        age: 18
    }
}).then(console.log)
```

## axios 二次封装

为什么需要二次封装？

- 默认情况下，可以直接使用 axios 来进行开发
- 但是如果有100多处都直接依赖 axios，突然间有一天axios出现了重大bug，并且该库已经不再维护，这个时候你如何处理呢？
- 大多数情况下我们会寻找一个新的网络请求库或者自己进行二次封装  
- 但是有100多处都依赖了axios，方便我们进行修改吗？我们所有依赖axios库的地方都需要进行修改

```js
//config.js
const devURL = "http://httpbin.org";
const proURL = "http://product.org";

export const BASE_URL = process.env.NODE_ENV === 'development' ? devURL : proURL;
export const TIMEOUT = 20000;
```

```js
//request.js
import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
})

instance.interceptors.request.use(res => {
  console.log('请求拦截');
  return res;
}, err => {

})

instance.interceptors.response.use(res => {
  return res.data;
}, err => {
  if(err && err.response) {
    switch(err.response.status) {
      case 400:
        console.log('请求错误');
        break;
      case 401:
        console.log('为授权访问');
        break;
      default:
        console.log('其他错误信息');
    }
  }
  return err;
});

export default instance;
```

```js
//App.js
request({
    url: '/get',
    params: {
        name: 'fan',
        age: 22
    }
}).then(console.log)
```

