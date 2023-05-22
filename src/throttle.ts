import { ThrottleFunction } from './interface'

function throttle<T extends (...args: any[]) => Promise<any>>(
  fn: Function,
  interval: number,
  { leading = true, trailing = false } = {}
): ThrottleFunction<T> {
  // * 定义状态
  let timer: ReturnType<typeof setTimeout> | null = null
  let lastTime = 0
  let isInvoke = false

  // * 真正返回的函数
  const _throttle = function (...args: Parameters<T>): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const currentTime = Date.now()

        // * 立即执行
        if (leading && !isInvoke) {
          isInvoke = true
          lastTime = currentTime
          return resolve(fn.apply(this, args))
        }

        // * 清除timer
        if (timer) {
          clearTimeout(timer)
          timer = null
        }

        // * 等待时间
        const waitTime = interval - (currentTime - lastTime)

        // * 等待时间小于等于0时，执行函数
        if (waitTime <= 0) {
          lastTime = currentTime
          return resolve(fn.apply(this, args))
        }

        // * 执行尾部
        if (trailing) {
          timer = setTimeout(() => {
            lastTime = Date.now()
            resolve(fn.apply(this, args))
          }, waitTime)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  // * 取消功能
  _throttle.cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    lastTime = 0
    isInvoke = false
  }

  return _throttle
}

export default throttle

