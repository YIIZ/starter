import { Sprite, Text, Point, Texture } from 'pixi.js'
import { tween, easing } from 'popmotion'
import loader from '@teambun/loader'

import { Scene, Node } from 'pixi-suite/src/containers'
import { ViewAdapter, Widget } from 'pixi-suite/src/components'
import { director } from 'pixi-suite/src/managers'

const { WHITE } = Texture
const center = new Point(0.5, 0.5)

const foo = loader.add(require('foo.png'))
const bar = loader.add(require('bar.png'))

export default class Main extends Scene {
  view = ViewAdapter.Portrait

  initChildren() {
    return (
      <>
        <Sprite texture={WHITE} width={750} height={1500} tint={0x555555} />
        <Sprite x={375} y={750} texture={foo.texture} anchor={center} />
        <Sprite x={375} y={250} texture={bar.texture} anchor={center} />
        <Text name="text" x={375} y={750} anchor={center} text="加载成功" />
      </>
    )
  }

  onAdd() {}
}
