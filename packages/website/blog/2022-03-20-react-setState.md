---
slug: react setState
title: react setState
author_url: https://github.com/ximoThorn
author_image_url: https://avatars.githubusercontent.com/u/32925631?s=60&v=4
tags: [react, setState]
---

# react setState过程

>setState是挂在react的Component组件的原型上，这里记录下setState的执行过程，包扩何时表现为异步，何时表现为同步

## 第一步：窥探Componen组件：

```js

  let classComponentUpdater = {
    /**
     * inst：组件实例
     * payload：需要更新的新状态
    */
    enqueueSetState(inst, payload) {
      // 根据实例获取当前fiber，react的class类组件的fiber.stateNode指向类的实例，实例的_reactInternals属性指向当前fiber
      let fiber = get(inst)
      // 这里会有确认优先级的操作
      // let eventTime = requestEventTime()
      // let lane = requestUploadLane()
      let update = createUpdate(eventTime, lane)
      update.payload = payload
      /**
       * update是一个更新对象,例如：
       * {
       *    eventTime: ,
       *    lane: ,
       *    payload: {},
       *    callback: , // setState第二个参数
       * }
      */

      // 把当前update添加到当前fiber的updateQueue（链表）中
      enqueueUpdate(fiber, update)

      // 执行fiber的调度
      let root = scheduleUpdateOnFiber(fiber, lane, eventTime)
    },
  }

  // Component组价的整体结构
  class Component {
    constructor() {
      this.updater = classComponentUpdater // 更新器
    }
    
    setState(partialState) {
      this.updater.enqueueSetState(this, partialState)
    }
    // ...
  }
```

简单总结下：
```js
  this.setState({}, cb)
```
1. 执行Component原型上setState方法
2. 会创建一个update对象
3. 将update添加到当前fiber的updateQueue链表上
4. 执行fiber的调度更新函数scheduleUpdateOnFiber


## scheduleUpdateOnFiber函数

```js
  function scheduleUpdateOnFiber (fiber) {
    // 根据fiber.return获取根fiber对象
    let root = markUpdateLaneFromFiberToRoot(fiber)

    // 开始创建一个任务，从根节点开始执行
    ensureRootIsScheduled(root)
  }


  // 递归获取root fiber
  function markUpdateLaneFromFiberToRoot (fiber) {
    let parent = fiber,return
    while (parent) {
      fiber = parent
      parent = parent.return
    }

    if (fiber.tag === HostRoot) {
      return fiber
    }
    return null
  }


  function ensureRootIsScheduled (root) {
    // ...
    // 这里会先判断任务是否相同和确认优先级

    // scheduleSyncCallback方法会把performSyncWorkOnRoot添加到一个队列中，等待后续执行
    scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root))

    if (!isBatchedUpdates) { // 如果不是批量（异步）更新
      // 进行同步更新
      flushSyncCallbackQueue()
    }
  }


  // react17中不是通过isBatchedUpdates判断的，但是原理相同
  function batchedUpdates (fn) {
    fn()
    isBatchedUpdates = false
  }

  function flushSyncCallbackQueue () {
    syncQueue.forEach(cb => cb())
    syncQueue.length = 0 // 队列置空
  }

  function scheduleSyncCallback (cb) {
    syncQueue.push(cb)
  }
```
scheduleUpdateOnFiber函数总结：
1. 向上递归获取root fiber，从根fiber开始执行任务
2. 判断任务是否重复，并且确认优先级，把任务添加到一个队列中，等待后续执行
3. 判断是否需要批量（异步）更新，如果不是就执行flushSyncCallbackQueue进行同步更新
   
>**注：在react合成事件中会默认执行batchedUpdates()函数进行批量（异步）更新，执行完后将isBatchedUpdates置为false，这也就解释了放在setTimeout中的setState会同步更新**


### performSyncWorkOnRoot函数

performSyncWorkOnRoot函数是真正的渲染任务了

```js
  function performSyncWorkOnRoot (workInProgress) {
    let root = workInProgress
    while (workInProgress) {
      if (workInProgress.tag === classComponent) {
        let inst = workInProgress.stateNode
        //将当前fiber上的updateQueue中的各个要更新的新state和实例中的老的state进行合并
        inst.state = processUpdateQueue(inst, workInProgress)
        // 得到合并后的新state后执行实例的render方法，得到新的VDom，然后进行dom diff，更新Dom
        inst.render()
      }

      workInProgress = workInProgress.child
    }

    commitRoot(root) // 提交阶段，并重置任务优先级
  }
```

performSyncWorkOnRoot函数总结：
1. 从根fiber开始递归执行，将每个classComponent的state进行合并，并执行render
2. 提交阶段，重置任务优先级

