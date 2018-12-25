import 'core-js/modules/es6.array.find'
import 'core-js/modules/es6.array.find-index'
import 'core-js/modules/es6.map'

import * as PIXI from 'pixi.js'
import 'pixi-spine'
import './app.scss'
import { Deferred } from 'lib'
import { loader, director, modalManager, toast } from 'pixi-suite/src/managers'
import store from './managers/store'

director.init(document.querySelector('.main'), { transparent: true })

director.addScene('loading', require('./scenes/Loading').default)
director.addScene('main', require('./scenes/Main').default)

director.loadScene('loading')

if (process.env.NODE_ENV === 'development') {
  const nextScene = location.search.slice(1).match(/scene=(\w*)/)?.[1]
  if (nextScene) {
    director.scene.nextScene = nextScene
    director.scene.autoNext = true
  }
}

modalManager.initContainer()
toast.initContainer()

window.PIXI = PIXI
window.director = director
window.loader = loader
window.store = store
