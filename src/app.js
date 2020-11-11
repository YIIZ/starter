import '@teambun/loader/src/env/brower-pixi.js'
import loader from '@teambun/loader'

import './app.css'
import { director, modalManager, toaster } from 'pixi-suite/src/managers'
import store from './managers/store'

director.init(document.querySelector('.main'), { transparent: true })

director.addScene('Loading', require('./scenes/Loading').default)
director.addScene('Main', require('./scenes/Main').default)

director.loadScene('Loading')
director.scene.nextScene = 'Main'

if (process.env.NODE_ENV === 'development') {
  const nextScene = location.search.slice(1).match(/scene=(\w*)/)?.[1]
  if (nextScene) {
    director.scene.nextScene = nextScene
    director.scene.autoNext = true
  }
}

modalManager.initContainer()
toaster.initContainer()

window._director = director
window._loader = loader
window._store = store
window._toaster = toaster
window._modalManager = modalManager
