import * as PIXI from 'pixi.js'
import { tween, easing } from 'popmotion'

import { Scene, Node } from 'pixi-suite/src/containers'
import { loader }  from 'pixi-suite/src/managers'
import { ViewAdapter, Widget } from 'pixi-suite/src/components'
import { fadeInOut } from 'pixi-suite/src/transtions'

const { Sprite, Text, Point, Texture: { WHITE }, extras: { TilingSprite }, spine: { Spine } } = PIXI

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

  onAdd() {
    loader.on('progress', this.handeProgress, this)
    loader.on('complete', this.handeComplete, this)
    loader.run()
  }

  handeProgress(v) {
  }

  handeComplete() {
    director.loadScene(this.nextScene)
  }
}

