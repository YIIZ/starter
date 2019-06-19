import { Sprite, Text, Point, Texture } from 'pixi.js'
import { tween, easing } from 'popmotion'
import loader from '@teambun/loader'

import { Scene, Node } from 'pixi-suite/src/containers'
import { ViewAdapter, Widget } from 'pixi-suite/src/components'

const { WHITE } = Texture
const center = new Point(0.5, 0.5)

const foo = loader.add(require('foo.png'))
const bar = loader.add(require('bar.png'))

export default class Main extends Scene {
  view = ViewAdapter.Portrait

  initChildren() {
    console.log(foo, bar)
    return (<>
      <Sprite texture={WHITE} width={750} height={1625} y={-62.5} tint={0x555555}/>
      <Sprite x={375} y={750} texture={foo.texture} anchor={center} />
      <Sprite x={375} y={250} texture={bar.texture} anchor={center} />
      <PIXI.Text name='text' x={375} y={750}
        anchor={new PIXI.Point(0.5, 0.5)}
        text='加载成功'
      />
    </>)
  }

  onAdd() {
  }
}

