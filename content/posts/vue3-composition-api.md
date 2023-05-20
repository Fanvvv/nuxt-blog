---
title: "Vue3 的 Composition API"
description: "vue 的 data 选项里返回的数据是响应式的，在 vue3 的 setup 函数中想要返回的数据也拥有响应式的特性，应该怎么办呢？"
tags: [vue]
date: 2022-3-6
---

# 响应式API

vue 的 data 选项里返回的数据是响应式的，在 vue3 的 setup 函数中想要返回的数据也拥有响应式的特性，应该怎么办呢？

## reactive API

基本用法：

```js
<script>
import { reactive } from 'vue'
export default {
    setup() {
        const info = reactive({ name: 'fan', age: 0 })
        console.log(info.name) // 'fan'
        return { info }
    }
}
</script>
```

> 传入类型的限制：必须传入的是一个对象或者数组类型，如果传入一个基本数据类型会报警告

为什么它可以使数据变成响应式的呢？

- 这是因为当我们使用 reactive 函数处理我们的数据之后，数据再次被使用时就会进行依赖收集； 

- 当数据发生改变时，所有收集到的依赖都是进行对应的响应式操作（比如更新界面）； 

- 事实上，我们编写的 data 选项，也是在内部交给了 reactive 函数将其变成响应式对象的；

### reactive 相关的其他 API

- isProxy：检查对象是否是由 reactive 或 readonly 创建的 proxy。
- isReactive：
  - 检查对象是否是由 reactive 创建的响应式代理：
  - 如果该代理是 readonly 建的，但包裹了由 reactive 创建的另一个代理，它也会返回true；
- isReadonly：检查对象是否是由 readonly 创建的只读代理。
- toRaw：返回 reactive 或 readonly 代理的原始对象（不建议保留对原始对象的持久引用，请谨慎使用）。 
- markRaw：标记一个对象，使其永远不会转换为 proxy。返回对象本身。
- shallowReactive：创建一个响应式代理，它跟踪其自身 property 的响应性，但不执行嵌套对象的深层响应式转换（深层还是原生对象）。
- shallowReadonly：创建一个 proxy，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换（深层还是可读、可写的）

## ref API

基本用法：

```js
<script>
import { ref } from 'vue'
export default {
    setup() {
        const num = ref(1)
        console.log(num.value) // 1
        return { num }
    }
}
</script>
```

ref 会返回一个可变的响应式对象，该对象作为一个 **响应式的引用** 维护着它内部的值，这就是 ref 名称的来源。ref 对象只有一个 `.value` 属性，指向该内部值。

使用时的注意事项：

1. 在 template 模板中使用 ref 的值，不需要通过 `.value` 的方式来使用，vue 会帮我们自动解包。
2. 在 setup 函数中使用 ref 的值，是需要通过 `.value` 的方式来使用。

### 解包

模板中的解包只是浅层的解包，如果将 ref 分配给 reactive 的属性是，ref 会被自动解包

不会被解包：

```js
<template>
	<div>{{ count.value }}</div>
</template>
<script>
import { ref } from 'vue'
export default {
    setup() {
        const count = ref(1)
        const obj = {
            count
        }
        return { count }
    }
}
</script>
```

自动解包：

```js
<template>
	<div>{{ count }}</div>
</template>
<script>
import { ref, reactive } from 'vue'
export default {
    setup() {
        const count = ref(1)
        const obj = reactive({ count })
        console.log(count.value === obj.count) // true
        return { count }
    }
}
</script>
```

### toRefs

如果我们需要对 reactive 对象的数据进行解构，解构出来的数据不再是响应式的了

```js
setup() {
    const obj = reactive({ name: 'fan', age: 0 })
    let { name, age } = obj
    name = 'egret'
    age = 1
    console.log(obj) // { name: 'fan', age: 0 }
    return { name, age, obj }
}
```

如果我们想让解构出来的属性是响应式的，我们可以使用 toRefs 这个函数，它可以将 reactive 返回的对象中的属性转成 ref，我们可以通过 `.value` 来改变它的值。这种做法相当于已经在 reactive.xxx 和 ref.value 之间建立了 链接，任何一个修改都会引起另外一个变化

```js
setup() {
    const obj = reactive({ name: 'fan', age: 0 })
    let { name, age } = toRefs(obj)
    name.value = 'egret'
    age.value = 1
    console.log(obj) // { name: 'egret', age: 1 }
    // 或者 下面这种写法也是可以的
    const objRefs = toRefs(obj)
    objRefs.age.value++
    return { name, age, obj }
}
```

### toRef

只想将 reactive 中的某一个属性转成 ref，就可以使用 toRef 函数

```js
setup() {
    const obj = reactive({ name: 'fan', age: 0 })
    let name = toRef(obj, 'name')
    obj.name = 'egret'
    console.log(name.value) // egret
    return { name, obj }
}
```

### customRef

创建一个**自定义的 ref**，并**对其依赖项跟踪和更新触发**进行**显式控制**。它需要**一个工厂函数**，该函数接收 `track` 和 `trigger` 函数作为参数，并且应该返回**一个带有 `get` 和 `set` 的对象**。

官网有一个使用自定义 ref 通过 `v-model` 实现 debounce 防抖的示例：

```js
// 这是一个 hook: useDebounceRef.js
import { customRef } from 'vue'
export function useDenounceRef(value, delay = 200) {
    let timeout;
    return customRef((track, trigger) => {
        return {
            get() {
                track();
                return value;
            },
            set(newValue) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    value = newValue;
                    trigger();
                }, delay);
            }
        }
    })
}
```

```js
<template>
	<input v-model="message" />
</template>

<script>
	import { useDenounceRef } from './hook/useDenounceRef'
    export default {
        setup() {
            const message = useDebounceRef("Hello World")
            return { message }
        }
    }
</script>
```

### ref 相关的其他 API

- unref：如果我们想要获取一个 ref 引用中的 value，那么也可以通过 unref方法：

  - 如果参数是一个 ref，则返回内部值，否则返回参数本身； 
  - 这是 val = isRef(val) ? val.value : val 的语法糖函数； 

- isRef：判断值是否是一个 ref 对象。 

- shallowRef：创建一个浅层的 ref 对象； 

- triggerRef：手动触发和 shallowRef 相关联的副作用：

  - ```js
    const info = shallowRef({ name: 'fan' })
    
    // 下面的修改不是响应式的
    const changeInfo = () => {
        info.name.value = 'egret'
        // 手动触发
        triggerRef(info)
    }

## readonly API

我们通过 reactive 或者 ref 可以获取到一个响应式的对象，但是某些情况下，我们传入给其他地方（组件）的这个响应式对象希望在另外一个地方（组件）被使用，但是不能被修改，这个时候我们就可以用 readonly 方法来阻止被修改。

readonly 会返回原生对象的只读代理（也就是它依然是一个 Proxy，这是一个proxy 的 set 方法被劫持，并且不能对其进行修改）

常见的三个类型的参数：

- 普通对象
- reactive 返回的对象
- ref 的对象

使用规则：

- readonly 返回的对象都是不允许修改的；
- 但是经过 readonly 处理的原来的对象是允许被修改的； 
  - 比如 const info = readonly(obj)，info 对象是不允许被修改的； 
  - 当 obj 被修改时，readonly 返回的 info 对象也会被修改；
  - 但是我们不能去修改readonly返回的对象 info； 
- 其实本质上就是 readonly 返回的对象的 setter 方法被劫持了而已

使用场景：在我们传递给其他组件数据时，往往希望其他组件使用我们传递的内容，但是不允许它们修改时，就可以使用 readonly。

## Computed

计算属性，我们怎么在 setup 函数中使用 computed 呢？

- 方式一：接收一个 getter 函数，并为 getter 函数返回的值，返回一个不变的 ref 对象；

```js
const firstName = ref('fan')
const lastName = ref('egret')
const fullName = computed(() => {
    return firstName.value + ' ' + lastName.value
})
```

- 方式二：接收一个具有 get 和 set 的对象，返回一个可变的（可读写的）ref 对象

```js
const firstName = ref('fan')
const lastName = ref('egret')
const fullName = computed({
    get: () => {
        return firstName.value + ' ' + lastName.value
    },
    set: newValue => {
        const name = newValue.split(' ')
        firstName.value = name[0]
        lastName.value = name[1]
    }
})
```

## watch

当侦听到某些响应式数据变化时，我们希望执行某些操作，这个时候可以使用 watchEffect

- watchEffect 用于自动收集响应式数据的依赖
- watch 需要手动指定侦听的数据源

### watchEffect

当侦听到某些响应式数据变化时，我们希望执行某些操作，这个时候可以使用 watchEffect

- watchEffect传入的函数会被立即执行一次，并且在执行的过程中会收集依赖
- 只有收集的依赖发生变化时，watchEffect传入的函数才会再次执行

```js
const name = ref('fan')
const age = ref(1)

watchEffect(() => {
    console.log("执行", name.value, age.value)
})
```

#### watchEffect 的停止侦听

watchEffect 是可以停止侦听的，我们获取它的返回值，调用即可停止侦听

```js
const name = ref('fan')
const age = ref(1)

const stopWatch = watchEffect(() => {
    console.log("执行", name.value, age.value)
})

const changeAge = () => {
    age.value++
    if (age.value > 18) {
        stopWatch()
    }
}
```

#### watchEffect清除副作用

什么是清除副作用呢？ 

> 比如在开发中我们需要在侦听函数中执行网络请求，但是在网络请求还没有达到的时候，我们停止了侦听器， 或者侦听器侦听函数被再次执行了。那么上一次的网络请求应该被取消掉，这个时候我们就可以清除上一次的副作用。

在我们给 watchEffect 传入的函数被回调时，其实可以获取到一个参数：onInvalidate。

当副作用 即将重新执行 或者 侦听器被停止 时会执行该函数传入的回调函数，我们可以在传入的回调函数中，执行一些清楚工作。

```js
const name = ref('fan')
const age = ref(1)

const stopWatch = watchEffect((onInvalidate) => {
    console.log("执行", name.value, age.value)
    const timer = setTimeout(() => {
        console.log("该操作2秒后执行")
    }, 2000)
    onInvalidate(() => {
        clearTimeout(timer)
    })
})
```

#### watchEffect的执行时机

执行时机 flush 有三个选项：

- pre：默认值，它会在元素 挂载 或者 更新 之前执行
- post：在组件更新后触发。这也将推迟副作用的初始运行，直到组件的首次渲染完成。
- sync：将强制效果始终同步触发。然而，这是低效的，应该很少需要

在我们获取 DOM 元素或组件时，也就是 `this.$refs`，那么在 setup 函数中应该怎么获取呢？

```js
<template>
	<h1 ref="titleRef">title</h1>
</template>

<script>
	import { ref, watchEffect } from 'vue'
    export default {
        setup() {
            const titleRef = ref(null)
            watchEffect(() => {
                console.log(titleRef.value) // 1.null 2.<h1></h1>
            })
            return { titleRef }
        }
    }
</script>
```

执行时机使用默认值获取 DOM 元素，会打印两次，这是因为 setup 函数在执行时就会立即执行传入的副作用函数，这个时候 DOM 并没有挂载，所以打印为 null。而当 DOM 挂载时，会给 title 的 ref 对象赋新的值，副作用函数会再次执行，打印出来对应的元素。

如果想要第一次就打印 DOM 元素，可以通过改变执行时机来完成

```js
<template>
	<h1 ref="titleRef">title</h1>
</template>

<script>
	import { ref, watchEffect } from 'vue'
    export default {
        setup() {
            const titleRef = ref(null)
            watchEffect(() => {
                console.log(titleRef.value) // <h1></h1>
            }, { flush: 'post' })
            return { titleRef }
        }
    }
</script>
```

