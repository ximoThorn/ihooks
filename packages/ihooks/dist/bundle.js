import debounce from 'lodash.debounce';
import { useRef, useMemo, useEffect } from 'react';
import throttle from 'lodash.throttle';

const useDebounce = (fun = function() {}, wait = 300, options = {}) => {

  // 保证每次接收到的fun是最新的，而且不会触发debounced函数重新绑定
  const funRef = useRef();
  funRef.current = fun;

  const debounced = useMemo(() => debounce((...arg) => {
    return funRef.current(...arg)
  }, wait, options), []);

  return {
    run: debounced,
    cancel: debounced.cancel
  }

};

const useThrottle= (fun = function() {}, wait = 300, options = {}) => {

  // 保证每次接收到的fun是最新的，而且不会触发throttled函数重新绑定
  const funRef = useRef();
  funRef.current = fun;

  const throttled = useMemo(() => throttle((...arg) => {
    return funRef.current(...arg)
  }, wait, options), []);

  return {
    run: throttled,
    cancel: throttled.cancel
  }

};

/**
 *获取目标dom
 *
 * @export
 * @param {*} target
 * @returns
 */
function getTargetDom (target) {
  if (!target) {
    return
  }
  if (typeof target === 'function') {
    return target()
  }
  if ('current' in target) {
    return target.current
  }
  return target
}

const defaultEventName = 'click';

const useClickOutside = (cb = function() {}, target, eventName = defaultEventName) => {
  let onClick = useRef();
  onClick.current = cb;

  useEffect(() => {
    const handler = e => {
      const targetElement = getTargetDom(target);
      if (!targetElement || targetElement.contains(e.target)) {
        return
      }
      onClick.current(e);
    };

    document.addEventListener(eventName, handler);
    return () => {
      document.removeEventListener(eventName, handler);
    }
  }, [target]);
};

export { useClickOutside, useDebounce, useThrottle };
