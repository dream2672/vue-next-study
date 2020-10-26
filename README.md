# 学习 vue 3
> [官网](https://v3.cn.vuejs.org/guide/installation.html#%E4%BD%BF%E7%94%A8%E6%9E%84%E5%BB%BA%E5%B7%A5%E5%85%B7)
> [建议了解,深入响应性原理](https://v3.cn.vuejs.org/guide/reactivity.html#%E4%BB%80%E4%B9%88%E6%98%AF%E5%93%8D%E5%BA%94%E6%80%A7)

#### 代码结构

```

reactivity 目录: 数据劫持

runtime-core 目录: 与平台无关的运行时。其实现的功能有虚拟 DOM 渲染器、Vue 组件和 Vue 的各种API，我们可以利用这个 runtime 实现针对某个具体平台的高阶 runtime，比如自定义渲染器。

runtime-dom 目录: 针对浏览器的 runtime。其功能包括处理原生 DOM API、DOM 事件和 DOM 属性等。

runtime-test 测试runtime目录

server-renderer 目录: 用于 SSR

compiler-core 目录: 平台无关的编译器. 它既包含可扩展的基础功能，也包含所有平台无关的插件。

compiler-dom 目录: 把html 解析为 render

shared 目录: 没有暴露任何 API，主要包含了一些平台无关的内部帮助方法。

vue 目录: 用于构建「完整构建」版本，引用了上面提到的 runtime 和 compiler。

size-check 目录: 检查浏览器渲染包大小

```

#### 如何启动

```javascript
yarn
yarn dev // 启动
```

#### 如果调试

```javascript
//dev后生成vue存放目录
packages / vue / dist

// 这个目录下创建单个页面进行 demo 调试
packages / vue / examples / composition
```

#### 编译过程

```javascript
// 启动命令
rollup [ '-wc', '--environment', 'COMMIT:111d04f,TARGET:vue,FORMATS:global' ] { stdio: 'inherit' }

// 其中COMMIT的值 为当前git最新head版本号,该值目前仅作为demo展示的github link ，无其他作用
// TARGET 目标包,根据当前值，决定使用哪个package包build，参照结构目录
// FORMATS 打包文件格式，目前可选值为 esm-bundler,esm-browser,cjs,global, esm-bundler-runtime,esm-browser-runtime,global-runtime


```

#### 流程(浏览器)

```javascript
runtime-dom --> createApp --> mount(本质是代理了 runtime-core mount)
创建过程
apiCreateApp CreateApp -> mount

```
