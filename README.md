# Webpack Ultimate Starter


## Usage

```
curl https://bitbucket.org/teambun/starter/get/master.tar.gz | tar xvz
```


## Features
- Babel
- SCSS
- Inline SVG
- Template
- Autoprefixer


## TODO
- More powerful template engine
  需求：simple/precompile/inheritance/include with params(component)(最好通过webpack实现)/webpack integrated(`require(svg)`)
  - ~~[pug](https://github.com/pugjs/pug-loader)~~ 无 include 参数、haml 语法
  - TODO [nunjucks](https://github.com/at0g/nunjucks-loader)
  - TODO [aui](https://aui.github.io/art-template/webpack/index.html#Examples)
  - TODO [dust](https://github.com/avaly/dust-loader)
- sourcemap
- HMR
- sprite http://kyon-df.com/2016/03/16/webpack_auto_sprites/
- Retina image generate
- eslint
- TypeScript
- BuckleScript
- Imagemin https://github.com/tcoopman/image-webpack-loader
- Fontmin http://ecomfe.github.io/fontmin
- https://github.com/zhouwenbin/postcss-animation

### Trivial
- SVG with attrs including


## Ins

### Component based developing?
stage-draw.component.html
html + style + script
direct event binding

include other component


## TODO2

Framer implement web/design
example pm

asap??
https://github.com/babel/babel/blob/8a82cc060ae0ab46bf52e05e592de770bd246f6f/packages/babel-plugin-transform-runtime/src/definitions.js#L12
https://github.com/kriskowal/asap

Game tips

http://www.goodboydigital.com/pixijs/examples/20/
https://englercj.github.io/2016/01/03/pixi-deferred-lighting/

TODO bpg
test memory usage vs large png sprites
https://github.com/mirrorer/libbpg/pull/3/files

## investigate
https://noheroes.ghostrecon.com/en-GB/index.html
- https://github.com/plepers/nanogl
