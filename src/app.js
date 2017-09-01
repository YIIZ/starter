import './app.scss'
import { Deferred } from 'lib'

class Foo {}
Array.every([], () => true)

const defer = new Deferred
defer.resolve()
// defer.promise
