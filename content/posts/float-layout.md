---
title: "float 布局"
description: "可以利用 float 实现圣杯布局和双飞翼布局，也就是三栏布局，中间一栏最先加载和渲染，两侧内容固定，中间内容随着宽度自适应。"
tags: [css]
date: 2020-5-17
---

# float 布局

可以利用 float 实现圣杯布局和双飞翼布局

圣杯布局和双飞翼布局的目的：

- 三栏布局，中间一栏最先加载和渲染（内容最重要）
- 两侧内容固定，中间内容随着宽度自适应
- 一般用于 PC 网页

## 圣杯布局的实现

### 第 1 步

1. 先创建好大概的内容

```html
<style>
    body {
        min-width: 550px;
    }

    header {
        text-align: center;
        background-color: #ccc;
    }

    .col {
        float: left;
    }

    .main {
        width: 100%;
        background-color: pink;
    }

    .left {
        width: 190px;
        background-color: skyblue;
    }

    .right {
        width: 100px;
        background-color: cyan;
    }

    footer {
        text-align: center;
        background-color: #ccc;
        clear: both;
    }
</style>
</head>

<body>
    <header>header</header>
    <div class="content">
        <div class="main col">main</div>
        <div class="left col">left</div>
        <div class="right col">right</div>
    </div>
    <footer>footer</footer>
</body>
```

![1621270414311](https://picbed-1258935921.cos.ap-guangzhou.myqcloud.com/20230616155422.png)

### 第 2 步

2. 给外层容器添加左右内边距，padding-left、padding-right

```html
<style>
    .content {
        padding-left: 190px;
        padding-right: 100px;
    }
</style>
```

![1621270620380](https://picbed-1258935921.cos.ap-guangzhou.myqcloud.com/20230616155804.png)

### 第 3 步

3. 将 left 移动到左侧，给 left 添加 margin 负值，left 需要使用定位才能实现。

```html
<style>
    .left {
        width: 190px;
        backgroud-color: skyblue;
        display: relative;
        left: -190px;
        margin: -100%;
    }
</style>
```

![1621270863860](https://picbed-1258935921.cos.ap-guangzhou.myqcloud.com/20230616155446.png)

### 第 4 步

4. 将 right 移动到右侧，给 right 设置 margin-right 负值，这个负值为 right 的宽度，这样right 的内容就被覆盖了，就移动上去了。

```html
<style>
    .right {
        width: 100px;
        background-color: cyan;
        margin-right: -100px;
    }
</style>
```

![1621271041028](https://picbed-1258935921.cos.ap-guangzhou.myqcloud.com/20230616155503.png)

## 双飞翼布局的实现

### 第 1 步

1. 先创建好大概的内容

```html
<style>
    body {
        min-width: 550px;
    }

    .col {
        float: left;
    }

    .main {
        width: 100%;
        height: 100px;
        background-color: pink;
    }

    .left {
        width: 190px;
        height: 100px;
        background-color: skyblue;
    }

    .right {
        width: 100px;
        height: 100px;
        background-color: cyan;
    }
</style>

<body>
    <div class="main col">
        <div class="main-wrapper">main</div>
    </div>
    <div class="left col">left</div>
    <div class="right col">right</div>
</body>
```

![1621271181119](https://picbed-1258935921.cos.ap-guangzhou.myqcloud.com/20230616155710.png)

### 第 2 步

2. 设置 main-wrapper 的左右外边距

```html
<style>
    .main-wrapper {
        margin-left: 190px;
        margin-right: 100px;
    }
</style>
```

![1621271292610](https://picbed-1258935921.cos.ap-guangzhou.myqcloud.com/20230616155710.png)

### 第 3 步

3. 使用 margin-left 负值的方法，将 left 移上去，100% 代表的是 mian 的宽度。

```html
<style>
    .left {
        width: 190px;
        height: 100px;
        background-color: skyblue;
        margin-left: -100%;
    }
</style>
```

![1621271432220](https://picbed-1258935921.cos.ap-guangzhou.myqcloud.com/20230616155859.png)

### 第 4 步

4. 使用 margin-left 负值的方法，将 right 移上去，100px 代表 right 的宽度。

```html
<style>
    .right {
        width: 100px;
        height: 100px;
        background-color: cyan;
        margin-left: -100px;
    }
</style>
```

![1621271531290](https://picbed-1258935921.cos.ap-guangzhou.myqcloud.com/20230616155909.png)

## 总结

- 使用 float 布局
- 两侧使用 margin 负值，以便和中间内容横向重叠
- 防止中间内容被两次覆盖，一个用 padding，一个用 margin
