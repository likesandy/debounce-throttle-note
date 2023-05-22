import { DebounceFunction } from './interface'

function debounce<T extends (...args: any[]) => Promise<any>>(
  fn: Function,
  delay: number,
  options: { immediate: boolean } = { immediate: true }
): DebounceFunction<T> {
  // * 定义定时器，保存上一次的值
  let timer: ReturnType<typeof setTimeout> | null
  let { immediate } = options
  let isInvoke = false

  // * 真正执行的函数
  const _debounce = function (...args: Parameters<T>): Promise<any> {
    // * 返回值
    // 也可以使用callback形式来进行返回值
    return new Promise((resolve, reject) => {
      try {
        // * 立即执行
        if (immediate && !isInvoke) {
          isInvoke = true
          return resolve(fn.apply(this, args))
        }

        // * 取消timer
        if (timer) {
          clearTimeout(timer)
          timer = null
        }

        // * 延迟执行
        timer = setTimeout(() => {
          isInvoke = false
          resolve(fn.apply(this, args))
        }, delay)
      } catch (error) {
        reject(error)
      }
    })
  }

  // * 取消功能
  _debounce.cancel = () => {
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  // * 返回定时器
  return _debounce
}

export default debounce

