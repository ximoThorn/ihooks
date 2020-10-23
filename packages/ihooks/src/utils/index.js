
/**
 *获取目标dom
 *
 * @export
 * @param {*} target
 * @returns
 */
export function getTargetDom (target) {
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
