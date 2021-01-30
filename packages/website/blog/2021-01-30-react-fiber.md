---
slug: react fiber
title: react fiber
# author: Gao Wei
# author_title: Docusaurus Core Team
author_url: https://github.com/ximoThorn
author_image_url: https://avatars.githubusercontent.com/u/32925631?s=60&v=4
tags: [react, javascript]
---

# react fiber

在v15和之前的版本中，在react任意一个地方执行setState后，react会对整个页面创建虚拟dom，并对前后dom进行diff对比，然后进行渲染，这个过程是“一气呵成”的，所以它占据了主线程的大量时间，这会使页面响应度变差，也就导致了react在渲染动画，或者手势操作时会出现卡顿现象，因此react团队在react的v16版本后采用了fiber架构。

熟悉fiber之前需要先了解几个基础知识：**window.requestIdleCallback**，**单链表**
![image](https://user-images.githubusercontent.com/32925631/90331506-89c43c80-dfe7-11ea-9f1a-1934ed6a013f.png)


## 帧率
我们知道屏幕浏览器刷新率60帧/s，平均16.6ms/帧，在一帧中浏览器做了很多事情：

在浏览器执行一帧的过程中：

1. Input event handlers：合成线程 compositor thread 把 input 数据传给主线程， 处理事件回调。

2. javascript: 包扩定时器、事件（scroll，resize等）、requestAnimationFrame、重排（layout）、重绘（paint）

3. 如果在一帧内，执行完上述所有任务后，还有剩余时间的话，那就会执行requestIdleCallback回调，

```js
window.requestIdleCallback(callback, options)
// callback(deadline): 一个function 用户要执行的回调任务, 并传入一个参数deadline
  //  deadline: {
    //  timeRemaining: 0ms, // 当前帧还剩余多少时间
    //  didTimeout: false, // 是否已超时
  //  }
// options: // 一个对象，可以设置timeout时间：超过这个时间后，不管当前是否有剩余时间必须执行此回调

```
> 因为requestIdleCallback兼容性差，所以react内部并不是直接用这个api，而是自己实现了这个api，理论效果是一样的

## 单链表

在fiber中有大量的单链表，用一张图表示：

![image](https://user-images.githubusercontent.com/32925631/90331514-a19bc080-dfe7-11ea-9c2e-c30f3689455b.png)


## 重回fiber

**1.通过fiber合理分配cpu资源，提高用户相应速度；2.通过fiber可以使reconciliation（一种diff算法）可以中断，交出主线程，去执行更重要的事情（渲染，交互等）**

那么fiber是什么：fiber是一个执行单元，也是一种数据结构


### 执行单元fiber
每次浏览器执行完一个执行单元，react就会检查时候还有剩余时间（每一帧都会去检查），如果没有，react就放权给浏览器

![image](https://user-images.githubusercontent.com/32925631/90331527-bf692580-dfe7-11ea-8719-2d1066ba8be0.png)

### 数据机构fiber

react使用链表，将每一个VirtualDom节点及其内部所有子（不是孙子）节点表示为一个fiber。如图：
![image](https://user-images.githubusercontent.com/32925631/90331536-d14ac880-dfe7-11ea-9a24-f39fd629fd6f.png)


其中A1>B1+B2就是一个fiber，B1>C1+C2是一个fiber

每个fiber其实就是一个对象，除了一些属性还包括三个指针
```js
let fiber = {
  tag: '', //当前节点类型，文本还是dom
  type: '', // 当前元素类型，span、div
  // ...
  // 三个指针
  child: {}, // 指向当前第一个子fiber
  sibling: {}, // 指向当前紧挨着的兄弟fiber
  return: {}, // 指向当前的父fiber
}
```

## 总结
react将jsx经过createElement处理形成虚拟dom节点后的进行渲染，主要分为两个阶段：
diff阶段和commit阶段：
在diff阶段进行新旧虚拟dom对比，进行更新，增量或者删除，并且根据虚拟dom生成fiber树
> diff阶段可以暂停，因为diff阶段比较花时间，react会对任务进行拆分

commit阶段进行DOM的更新创建，此阶段不能暂停，需要“一气呵成”
