# music-player-vue2

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

```
music-player-vue2
├─ .gitignore
├─ babel.config.js
├─ jsconfig.json
├─ package.json
├─ public
│  ├─ common --> 公共样式
│  │  ├─ common.css
│  │  ├─ home.css
│  │  └─ reset.css
│  ├─ favicon.ico
│  └─ index.html
├─ README.md
├─ src
│  ├─ App.vue
│  ├─ assets
│  │  └─ logo.png
│  ├─ components
│  │  ├─ Carousel.vue
│  │  ├─ playerFooter.vue
│  │  ├─ playerHeader.vue
│  │  └─ RecommendList.vue
│  ├─ main.js
│  └─ service
│     ├─ ajax.js --> axios二次封装
│     └─ recommendList.js
├─ vue.config.js
└─ yarn.lock

```

## day1

引入公共样式，完成首页的静态组件:

配置proxy代理

对axios进行了二次封装，配置拦截器，引入进度条

## day2

写路由组件。确定路由关系



