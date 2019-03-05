# web-crawl-util

前端页面爬虫工具库。

## 1. 安装

```bash
$ npm install web-crawl-util
```

## 2. API


## 1. getBackgroundImageUrl(jqCur, jqContainer)

获得背景图地址

| 属性          | 说明                 | 类型              | 默认值 | 必选 |
| ------------- | -------------------- | ----------------- | ------ | -------- |
| `jqCur`      | css选择器或者jQuery对象     | `String || Element`             |      | 是       |
| `jqContainer`      | 待查找的 DOM 元素集、文档或 jQuery 对象。     | `Element`             |      | 否       |

返回对应css选择器或者jQuery对象的style中background-images属性中图片的链接

## 2. getImageDomUrl(jqCur, jqContainer)

获得 img 标签中图片的地址

| 属性          | 说明                 | 类型              | 默认值 | 必选 |
| ------------- | -------------------- | ----------------- | ------ | -------- |
| `jqCur`      | css选择器或者jQuery对象     | `String || Element`             |      | 是       |
| `jqContainer`      | 待查找的 DOM 元素集、文档或 jQuery 对象。     | `Element`             |      | 否       |

返回对应 img 标签中的图片的链接

## 3. getText(jqCur, jqContainer)

获得文字信息

| 属性          | 说明                 | 类型              | 默认值 | 必选 |
| ------------- | -------------------- | ----------------- | ------ | -------- |
| `jqCur`      | css选择器或者jQuery对象     | `String || Element`             |      | 是       |
| `jqContainer`      | 待查找的 DOM 元素集、文档或 jQuery 对象。     | `Element`             |      | 否       |

返回对应 dom 中的文字信息

## 4. getAttr(name, jqCur, jqContainer)

获得dom上的属性

| 属性          | 说明                 | 类型              | 默认值 | 必选 |
| ------------- | -------------------- | ----------------- | ------ | -------- |
| `name`      | 属性名字     | `String`             |      | 是       |
| `jqCur`      | css选择器或者jQuery对象     | `String || Element`             |      | 是       |
| `jqContainer`      | 待查找的 DOM 元素集、文档或 jQuery 对象。     | `Element`             |      | 否       |

返回对应 dom 中对应属性的值

## 5. getTotal(jqCur, jqContainer)

获得有多少个符合条件的DOM

| 属性          | 说明                 | 类型              | 默认值 | 必选 |
| ------------- | -------------------- | ----------------- | ------ | -------- |
| `name`      | 属性名字     | `String`             |      | 是       |
| `jqCur`      | css选择器或者jQuery对象     | `String || Element`             |      | 是       |
| `jqContainer`      | 待查找的 DOM 元素集、文档或 jQuery 对象。     | `Element`             |      | 否       |

返回符合选择器的元素个数

## 6. isExist(jqCur, jqContainer)

是否存在

| 属性          | 说明                 | 类型              | 默认值 | 必选 |
| ------------- | -------------------- | ----------------- | ------ | -------- |
| `name`      | 属性名字     | `String`             |      | 是       |
| `jqCur`      | css选择器或者jQuery对象     | `String || Element`             |      | 是       |
| `jqContainer`      | 待查找的 DOM 元素集、文档或 jQuery 对象。     | `Element`             |      | 否       |

返回一个 Boolean 表示元素是否存在

## 7. getStyle(jqCur, jqContainer)

获得 dom 元素中的部分计算属性值，只取一部分即可

| 属性          | 说明                 | 类型              | 默认值 | 必选 |
| ------------- | -------------------- | ----------------- | ------ | -------- |
| `name`      | 属性名字     | `String`             |      | 是       |
| `jqCur`      | css选择器或者jQuery对象     | `String || Element`             |      | 是       |
| `jqContainer`      | 待查找的 DOM 元素集、文档或 jQuery 对象。     | `Element`             |      | 否       |

返回一个 css 属性的对象

| 属性          | 说明                 |
| ------------- | -------------------- |
| `width`      | 元素宽度     |
| `height`      | 元素高度     |
| `lineHeight`      | 元素字体行高     |
| `isOneLine`      | 判断是否是一行文字     |