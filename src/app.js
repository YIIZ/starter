import * as PIXI from 'pixi.js'
import 'pixi-spine'
import '@teambun/loader/lib/env/brower-pixi.js'
import loader from '@teambun/loader'

import './app.css'
import { director, modalManager, toaster } from 'pixi-suite/src/managers'
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
toaster.initContainer()

window.PIXI = PIXI
window.director = director
window.loader = loader
window.store = store
