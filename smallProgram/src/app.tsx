import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import configStore from './store'

import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
import './app.less'

if (process.env.TARO_ENV !== 'alipay') {
  require('@tarojs/async-await')
}


const store = configStore()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/blog/index',
      'pages/movie/movie',
      'pages/login/login',
      'pages/user/user',
      'pages/blogItem/blogItem',
      'pages/movieItem/movieItem',
      'pages/manual/manual',
      'pages/manualItem/manualItem',
      
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#bfbfbf",
      selectedColor: "#e59233",
      backgroundColor: "#fff",
      borderStyle: "black",
      custom:false,
      list: [
        {
          pagePath: "pages/blog/index",
          text: "博客",
          iconPath: "./assets/images/menus/blog.png",
          selectedIconPath: "./assets/images/menus/blog-act.png"
        },
        {
          pagePath: "pages/manual/manual",
          text: "手册",
          iconPath: "./assets/images/menus/shouce.png",
          selectedIconPath: "./assets/images/menus/shouce-act.png"
        },
        {
          pagePath: "pages/movie/movie",
          text: "电影",
          iconPath: "./assets/images/menus/movie.png",
          selectedIconPath: "./assets/images/menus/movie-act.png"
        }
        // {
        //   pagePath: "pages/user/user",
        //   text: "我的",
        //   iconPath: "./assets/images/menus/user.png",
        //   selectedIconPath: "./assets/images/menus/user-act.png"
        // },
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>

      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
