---
title: "TypeScript 的类型窄化"
description: "类型的窄化，也可以说是类型的收缩，窄化有很多种方法可以实现。"
tags: [ts, vue]
date: 2022-8-10
---

# TypeScript 的类型窄化

类型的窄化，也可以说是类型的收缩，窄化有很多种方法可以实现，掌握它们，需要学习
- 窄化和类型守卫
- 真值窄化
- 相等性窄化
- in 操作符窄化
- instanceof 窄化
- 控制流分析
- 类型断言
- 判别的联合
- Never 类型

## 联合和窄化

在开发中常见的是联合类型的窄化

```ts
function padLeft(padding: number | string, input: string) {
	return new Array(padding + 1).join(" ") + input // error 运算符 + 不能用于 类型 number | string 和 string 相加
}
```

### 增加 typeof 判断

```ts
function padLeft(padding: number | string, input: string) {
	if (typeof padding === "number") {
		return new Array(padding + 1).join(" ") + input
	}
	return padding + input
}
```

复习 typeof 有哪些返回值
- string
- number
- bigint
- boolean
- symbol
- undefined
- object
- function

### 类型守卫

if + typeof 和 js 比有什么特殊含义？
- Narrowing 的想象和原理
	- 类型在 if + typeof 后面的 block 变窄
	- ts 认为 typeof padding === "number" 是一种类型守卫（Type Guard）
	- ts 看到类型守卫后，发生窄化
- Narrowing本质：ts根据类型守卫重新定义子语句类型

### typeof null

对于 typeof 为 null 的处理
```ts
function printAll(strs: string | string[] | null) {
	if (typeof strs === "object") {
		for (const s of strs) {
			// error Object is possibly "null"
			console.log(s)
		}
	}
}

// 可以这么写避免类型错误
function printAll(strs: string | string[] | null) {
	if (strs && typeof strs === "object") {
		for (const s of strs) {
			// error Object is possibly "null"
			console.log(s)
		}
	}
}
```

## 真值窄化

```ts
function mutiplyAll(
	values: number[] | undefined,
	factor: number
): number[] | undefined {
	if (!values) {
		return values
	} else {
		return values.map(x => x * factor)
	}
}
```

## 相等性窄化

```ts
function fn(x: string | number, y: string | boolean) {
	if (x === y) {
		// x is string
	} else {
		// 
	}
}
```

```ts
function fn(strs: string | string[] | null) {
	if (strs !== null) {
		if (typeof strs === "Object") {
			for (const i of strs) {
				// strs: string[]
			}
		} else if (typeof strs === "string") {
			// strs: string
		}
	}
}
```

## in 操作符窄化

```ts
type Fish = { swim: () => void}
type Bird = { fly: () => void}

function move(animal: Fish | Bird) {
	if ("swim" in animal) {
		return animal.swim()
	}
	return animal.fly()
}
```

## instanceof 窄化

```ts
function logValue(x: Date | string) {
	if (x instanceof Date) {
		// x is Date
	} else {
		// x is string 
	}
}
```

## 窄化能力的基础

### 组合类型的推导

```ts
let x = Math.random() < 0.5 ? 10 : "Hello!"
```
x 的类型为 `number | string` 联合类型

### 控制流分析

```ts
function padLeft(padding: number | string, input: string) {
	if (typeof padding === "number") { // if 控制流发生窄化，里面为 number
		return new Array(padding + 1).join() + input
	}
	return padding + input
}
```

## 类型断言

断言一个函数的类型并窄化
```ts
function isFish(pet: Fish | Bird): pet is Fish {
	return (pet as Fish).swim !== undefined
}

let pet = {
	fly: () => {}
}

if (isFish(pet)) { // isFish(pet) 成为了类型守卫
	pet.swim()
} else {
	pet.fly()
}
```

## never 类型

在抛出错误的时候，switch 中 default 的时候
```ts
function error(): never {
	throw "123"
}
const x = error()
```

## 总结

窄化解决了什么问题
- 解决了让类型变窄的问题
- 让类型变得更精确的问题
- 让代码提示、让错误检查变得更高效的问题

as / is 是 ts 特有的关键字吗？
- as/is 是 ts 独有的特性
