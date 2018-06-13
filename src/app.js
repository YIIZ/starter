import './app.scss'
import { Deferred } from 'lib'

import { img, param } from '!!val-loader?b=3!./foo.js.val'

console.log(img, param)

class Foo {}
Array.every([], () => true)

const defer = new Deferred
defer.resolve()
// defer.promise

const listen = (el, eventName) => new Observable(ob => {
  const handler = evt => ob.next(evt)
  el.addEventListener(eventName, handler)
  return () => el.removeEventListener(eventName, handler)
})

const take = (source, n) =>
  new Observable(observer => {
    let remain = n
    return source.subscribe({
      next(value) {
        remain -= 1
        if (remain < 1) observer.complete()
        else observer.next(value)
      },
      error(e) {
        observer.error(e)
      },
      complete() {
        observer.complete()
      },
    })
  })

const tenMoves = listen(document.body, 'mousemove')
  |> (_ => take(_, 10))

tenMoves.subscribe({ next({ x }) { console.log(`move x:${x}`) } })

