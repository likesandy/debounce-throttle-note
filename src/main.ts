import debounce from './debounce'
import throttle from './throttle'

const inEl = document.querySelector('.ipt') as HTMLInputElement
const btnEl = document.querySelector('.cancel') as HTMLButtonElement

let count = 0
function inputChange() {
  console.log(`发送了${++count}次请求`)
}

// 测试debounce
const _debounce = debounce(inputChange, 1000)
inEl.addEventListener('input', _debounce)
btnEl.addEventListener('click', _debounce.cancel)
const myDebounce = debounce(
  (name: string, age: number) => {
    return `哈哈哈${name},${age}`
  },
  1000,
  { immediate: true }
)
myDebounce('tao', 18).then((res) => {
  console.log(res)
})
myDebounce('sandy', 21).then((res) => {
  console.log(res)
})

// 测试throttle
// const _throttle = throttle(inputChange, 2000)
// inEl.addEventListener('input', _throttle)
// btnEl.addEventListener('click', _throttle.cancel)
// const myThrottle = throttle(
//   (name: string, age: number) => {
//     return `${name},${age}`
//   },
//   1000,
//   { trailing: true }
// )
// myThrottle('tao', 18).then((res) => {
//   console.log(res)
// })
// myThrottle('sandy', 21).then((res) => {
//   console.log(res)
// })

