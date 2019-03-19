import * as PIXI from 'pixi.js'
import { tween, easing } from 'popmotion'
import loader from '@teambun/loader'

import { Scene, Node } from 'pixi-suite/src/containers'
import { ViewAdapter, Widget } from 'pixi-suite/src/components'
import { fadeOut } from 'pixi-suite/src/transtions'

const { Sprite, Text, Point, Texture: { WHITE }, extras: { TilingSprite } } = PIXI
const center = new Point(0.5, 0.5)

const mLoader = loader.group('loading')
const bar = mLoader.add(require('bar.png'))

export default class Loading extends Scene {
  view = ViewAdapter.Portrait
  nextScene = 'main'

  initChildren() {
    return (<>
      <Sprite texture={WHITE} width={750} height={1625} y={-62.5} />
      <PIXI.Text name='progress' x={375} y={750}
        anchor={new PIXI.Point(0.5, 0.5)}
        text='加载中'
      />
    </>)
  }

  async onAdd() {
    // load images for this scene first
    mLoader.run()
    await mLoader.promise
    const sp = <Sprite texture={bar.texture} x={375} y={700} anchor={center} />
    this.addChild(sp)

    loader.on('update', this.handeProgress, this)
    loader.on('complete', this.handeComplete, this)
    loader.run()
  }

  handeProgress(v) {
  }

  handeComplete() {
    director.loadScene(this.nextScene, fadeOut)
  }
}

