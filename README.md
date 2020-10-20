# 学习 vue 3

#### 代码结构

```

reactivity 目录: 数据劫持

runtime-core 目录: 与平台无关的运行时。其实现的功能有虚拟 DOM 渲染器、Vue 组件和 Vue 的各种API，我们可以利用这个 runtime 实现针对某个具体平台的高阶 runtime，比如自定义渲染器。

runtime-dom 目录: 针对浏览器的 runtime。其功能包括处理原生 DOM API、DOM 事件和 DOM 属性等。

runtime-test 测试runtime目录

server-renderer 目录: 用于 SSR

compiler-core 目录: 平台无关的编译器. 它既包含可扩展的基础功能，也包含所有平台无关的插件。
compiler-dom 把html 解析为 render

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
// FORMATS 打包文件格式，目前可选值为 esm-bundler,esm-browser,cjs,global

```

#### 流程(浏览器)

```javascript
runtime-dom --> createApp --> mount(本质是代理了 runtime-core mount)
创建过程
apiCreateApp CreateApp -> mount

```
