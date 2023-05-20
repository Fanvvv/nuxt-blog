---
title: "React 内置 Hooks"
description: "React 中有一些内置的 Hooks，比如：useState、useEffect... 需要学习它们的使用方法、应用场景、最佳实践等。"
tags: [react]
date: 2022-2-8
---

## useState

> **让函数组件具有维持状态的能力**

用法：

```js
import React, { useState } from 'react';
function Example() {
  // 创建一个保存 count 的 state，并给初始值 0
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>
  );
}
```

**总结**：

1. useState(initialState) 的参数 initialState 是创建 state 的初始值，它可以是任意类型，比如数字、对象、数组等等。
2. useState() 的返回值是一个有着两个元素的数组。第一个数组元素用来读取 state 的值，第二个则是用来设置这个 state 的值。在这里要注意的是，state 的变量（例子中的 count）是只读的，所以我们必须通过第二个数组元素 setCount 来设置它的值。
3. 如果要创建多个 state，那么我们就需要多次调用 useState。

遵循原则：

> **state 中永远不要保存可以通过计算得到的值**

弊端：

> **一旦组件有自己状态，意味着组件如果重新创建，就需要有恢复状态的过程，这通常会让组件变得更复杂**。

## useEffect

useEffect ，用于执行一段副作用。

副作用是指**一段和当前执行结果无关的代码。**

useEffect 可以接收两个参数，函数签名如下：

```js
useEffect(callback, dependcies)
```

- 第一个为要执行的函数 callback

- 第二个是可选的依赖项数组 dependencies（可选项：如果不指定，那么 callback 就会在每次函数组件执行完后都执行；如果指定了，那么只有依赖项中的值发生变化的时候，它才会执行。）

> **useEffect 是每次组件 render 完后判断依赖并执行**

useEffect 还有两个特殊的用法：**没有依赖项，以及依赖项作为空数组**。

1. 没有依赖项，则每次 render 后都会重新执行。
2. 空数组作为依赖项，则只在首次执行时触发，对应到 Class 组件就是 componentDidMount。

> 除了这些机制之外，useEffect 还**允许你返回一个函数，用于在组件销毁的时候做一些清理的操作**。比如移除事件的监听。

监听窗口大小变化的例子：

```js
// 设置一个 size 的 state 用于保存当前窗口尺寸
const [size, setSize] = useState({});
useEffect(() => {
  // 窗口大小变化事件处理函数
  const handler = () => {
    setSize(getSize());
  };
  // 监听 resize 事件
  window.addEventListener('resize', handler);
  
  // 返回一个 callback 在组件销毁时调用
  return () => {
    // 移除 resize 事件
    window.removeEventListener('resize', handler);
  };
}, []);
```

**总结**：（四种时机去执行一个回调函数产生副作用）

1. 每次 render 后执行：不提供第二个依赖项参数。比如 useEffect(() => {})。
2. 仅第一次 render 后执行：提供一个空数组作为依赖项。比如 useEffect(() => {}, [])。
3. 第一次以及依赖项发生变化后执行：提供依赖项数组。比如 useEffect(() => {}, [deps])。
4. 组件 unmount 后执行：返回一个回调函数。比如 useEffect() => { return () => {} }, [])。

### Hooks 的依赖项

在定义依赖项时，我们需要**注意**以下三点：

1. 依赖项中定义的变量一定是会在回调函数中用到的，否则声明依赖项其实是没有意义的。
2. 依赖项一般是一个常量数组，而不是一个变量。因为一般在创建 callback 的时候，你其实非常清楚其中要用到哪些依赖项了。
3. React 会使用浅比较来对比依赖项是否发生了变化，所以要特别注意数组或者对象类型。如果你是每次创建一个新对象，即使和之前的值是等价的，也会被认为是依赖项发生了变化。

### Hooks 的使用规则

两个规则：

#### Hooks 只能在函数组件的顶级作用域使用

**顶层作用域**：就是 **Hooks 不能在循环、条件判断或者嵌套函数内执行，而必须是在顶层**。同时 **Hooks 在组件的多次渲染之间，必须按顺序被执行**。

错误示范：

```js
function MyComp() {
  const [count, setCount] = useState(0);
  if (count > 10) {
    // 错误：不能将 Hook 用在条件判断里
    useEffect(() => {
      // ...
    }, [count])
  }
  
  // 这里可能提前返回组件渲染结果，后面就不能再用 Hooks 了
  if (count === 0) {
    return 'No content';
  }
  // 错误：不能将 Hook 放在可能的 return 之后
  const [loading, setLoading] = useState(false);
  
  //...
  return <div>{count}</div>
}
```

**总结**：

1. 所有 Hook 必须要被执行到
2. 必须按照循序执行

#### Hooks 只能在函数组件或者其他 Hooks 中使用

两种使用情况：

1. 在函数组件内（类组件也可以）
2. 在自定义 Hooks 里面

如果要在类组件中使用，我们可以利用高阶组件的模式，将 Hooks 封装成高阶组件，从而让类组件使用。

例子：（定义了监听窗口大小变化的一个 Hook：useWindowSize）

```js
import React from 'react';
import { useWindowSize } from '../hooks/useWindowSize';
export const withWindowSize = (Comp) => {
  return props => {
    const windowSize = useWindowSize();
    return <Comp windowSize={windowSize} {...props} />;
  };
};
```

使用 withWindowSize 这个高阶组件

```js
import React from 'react';
import { withWindowSize } from './withWindowSize';
class MyComp {
  render() {
    const { windowSize } = this.props;
    // ...
  }
}
// 通过 withWindowSize 高阶组件给 MyComp 添加 windowSize 属性
export default withWindowSize(MyComp);
```

这样就可以实现在 Class 组件中复用 Hooks 的逻辑了。

### 使用 ESLint 插件帮助检查 Hooks 的使用

Hooks 的一些特性和要遵循的规则，总结有三点：

1. 在 useEffect 的回调函数中使用的变量，都必须在依赖项中声明；
2. Hooks 不能出现在条件语句或者循环中，也不能出现在 return 之后；
3. Hooks 只能在函数组件或者自定义 Hooks 中使用。

完全遵循这些规则，React 官方为我们提供了一个 ESLint 的插件，**专门用来检查 Hooks 是否正确被使用，它就是** **[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)** 。

安装：

```shell
# npm
npm install eslint-plugin-react-hooks --save-dev

# yarn
yarn add eslint-plugin-react-hooks --dev
```

eslint config：(ESLint 配置文件中加入两个规则：**rules-of-hooks 和 exhaustive-deps**。)

```js
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    // 检查 Hooks 的使用规则
    "react-hooks/rules-of-hooks": "error", 
    // 检查依赖项的声明
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

## useCallback

**缓存回调函数**

在 React 函数组件中，每一次 UI 的变化，都是通过重新执行整个函数来完成的，这和传统的 Class 组件有很大区别：函数组件中并没有一个直接的方式在多次渲染之间维持一个状态。

例子：

```js
function Counter() {
  const [count, setCount] = useState(0);
  const handleIncrement = () => setCount(count + 1);
  // ...
  return <button onClick={handleIncrement}>+</button>
}
```

这个例子中，即使 count 没有发生变化，但是函数组件因为其它状态发生变化而重新渲染时，这种写法也会每次创建一个新的函数。创建一个新的事件处理函数，虽然不影响结果的正确性，但其实是没必要的。因为这样做不仅增加了系统的开销，更重要的是：**每次创建新函数的方式会让接收事件处理函数的组件，重新渲染**。

这时候我们就可以用到 useCalback 这个 hook 了

API 签名如下：

```js
useCallback(fn, deps)
```

fn 是定义的回调函数，deps 是依赖的变量数组。只有当某个依赖变量发生变化时，才会重新声明 fn 这个回调函数。

我们可以把 handleIncrement 这个事件处理函数通过 useCallback 来进行性能的优化：

```js
import React, { useState, useCallback } from 'react';
function Counter() {
  const [count, setCount] = useState(0);
  const handleIncrement = useCallback(
    () => setCount(count + 1),
    [count], // 只有当 count 发生变化时，才会重新创建回调函数
  );
  // ...
  return <button onClick={handleIncrement}>+</button>
}
```

这样，只有 count 发生变化的时候，才需要重新创建一个回调函数，这样就保证了组件不会创建重复的回调函数。而接收这个回调函数作为属性的组件，也不会频繁地需要重新渲染。

## useMemo

**缓存计算的结果**

API 签名如下：

```js
useMemo(fn, deps);
```

fn 是产生所需数据的一个计算函数。通常来说，fn 会使用  deps 中声明的一些变量来生成一个结果，用来渲染出最终的 UI。

**如果某个数据是通过其它数据计算得到的，那么只有当用到的数据，也就是依赖的数据发生变化的时候，才应该需要重新计算**。

通过 useMemo 这个 Hook，可以避免在用到的数据没发生变化时进行的重复计算。

除了避免重复计算之外，useMemo 还有一个很重要的好处：**避免子组件的重复渲染**。

**useCallback 的功能其实是可以用 useMemo 来实现的。**

## useRef

**在多次渲染之间共享数据**

**获取dom节点**

API 签名如下：

```js
const myRefContainer = useRef(initialValue);
```

可以把 useRef 看作是在函数组件之外创建的一个容器空间。在这个容器上，我们可以通过唯一的 current 属性设置一个值，从而在函数组件的多次渲染之间共享这个值。

例子：

```js
import React, { useState, useCallback, useRef } from "react";
export default function Timer() {
  // 定义 time state 用于保存计时的累积时间
  const [time, setTime] = useState(0);
  // 定义 timer 这样一个容器用于在跨组件渲染之间保存一个变量
  const timer = useRef(null);
  // 开始计时的事件处理函数
  const handleStart = useCallback(() => {
    // 使用 current 属性设置 ref 的值
    timer.current = window.setInterval(() => {
      setTime((time) => time + 1);
    }, 100);
  }, []);
  // 暂停计时的事件处理函数
  const handlePause = useCallback(() => {
    // 使用 clearInterval 来停止计时
    window.clearInterval(timer.current);
    timer.current = null;
  }, []);
  return (
    <div>
      {time / 10} seconds.
      <br />
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
    </div>
  );
}
```

useRef 可以**保存某个 DOM 节点的引用**。

结合 React 的 ref 属性和 useRef 这个 Hook，我们就可以获得真实的 DOM 节点，并对这个节点进行操作。

获取输入框焦点例子：

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // current 属性指向了真实的 input 这个 DOM 节点，从而可以调用 focus 方法
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

## useContext

**定义全局状态**

API 签名如下：

```js
const value = useContext(MyContext);
```

我们需要有 API 能够创建一个 Context，这就是 **React.createContext API**：

```js
const MyContext = React.createContext(initialValue);
```

这里的 MyContext 具有一个 Provider 的属性，一般是作为组件树的根组件。

主题切换的例子：

```js
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};
// 创建一个 Theme 的 Context
const ThemeContext = React.createContext(themes.light);
function App() {
  // 整个应用使用 ThemeContext.Provider 作为根组件
  return (
    // 使用 themes.dark 作为当前 Context 
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}
// 在 Toolbar 组件中使用一个会使用 Theme 的 Button
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}
// 在 Theme Button 中使用 useContext 来获取当前的主题
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{
      background: theme.background,
      color: theme.foreground
    }}>
      I am styled by theme context!
    </button>
  );
}
```

弊端：

1. 会让调试变得困难，因为你很难跟踪某个 Context 的变化究竟是如何产生的。
2. 让组件的复用变得困难，因为一个组件如果使用了某个 Context，它就必须确保被用到的地方一定有这个 Context 的 Provider 在其父组件的路径上。

在 React 的开发中，除了像 Theme、Language 等一目了然的需要全局设置的变量外，我们很少会使用 Context 来做太多数据的共享。需要再三强调的是，Context 更多的是**提供了一个强大的机制，让 React 应用具备定义全局的响应式数据的能力**。
