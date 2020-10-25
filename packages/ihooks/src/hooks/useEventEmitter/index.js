import { useEffect } from 'react'

class EventEmitter {
  static subscriptions = {}

  /**
   *触发目标事件
   *
   * @param {*} argument
   * @memberof EventEmitter
   */
  $emit(...argument) {
    const [method, ...props] = [...argument]

    EventEmitter.subscriptions[method]
    && typeof(EventEmitter.subscriptions[method]) === 'function'
    && EventEmitter.subscriptions[method](...props)
  }

  /**
   *监听事件
   *
   * @param {*} method
   * @param {*} cb
   * @memberof EventEmitter
   */
  $on(method, cb) {
    useEffect(() => {
      const flag = EventEmitter.subscriptions[method]
      if (!flag) {
        EventEmitter.subscriptions[method] = cb
      }
      return () => {
        EventEmitter.subscriptions = {}
      }
    }, [])
  }

  /**
   *监听某个事件一次
   *
   * @param {*} method
   * @param {*} fun
   * @memberof EventEmitter
   */
  $once(method, fun) {
    const _this = this

    function on () {
      _this.$off(method, on)
      fun.apply(_this, arguments)
    }
    _this.$on(method, on)
  }

  /**
   *取消某个事件监听
   *
   * @param {*} method
   * @memberof EventEmitter
   */
  $off(method) {
    EventEmitter.subscriptions[method] && (EventEmitter.subscriptions[method] = undefined)
  }
}

const useEventEmitter = () => {
  return new EventEmitter()
}

export default useEventEmitter
