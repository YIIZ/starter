import * as PIXI from 'pixi.js'
import { tween, easing } from 'popmotion'

import { Scene, Node } from 'pixi-suite/src/containers'
import { loader }  from 'pixi-suite/src/managers'
import { ViewAdapter, Widget } from 'pixi-suite/src/components'

const { Sprite, Text, Point, Texture: { WHITE }, extras: { TilingSprite } } = PIXI

export default class Main extends Scene {
  view = ViewAdapter.Portrait

  initChildren() {
    return (<>
      <Sprite texture={WHITE} width={750} height={1625} y={-62.5} />
      <PIXI.Text name='text' x={375} y={750}
        anchor={new PIXI.Point(0.5, 0.5)}
        text='加载成功'
      />
    </>)
  }

  onAdd() {
  }
}

