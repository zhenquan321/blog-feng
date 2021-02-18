export default {
  pages: [
    "pages/blog/index",
    "pages/movie/movie",
    "pages/login/login",
    "pages/user/user",
    "pages/blogItem/blogItem",
    "pages/movieItem/movieItem",
    "pages/manual/manual",
    "pages/movieplay/movieplay",
    "pages/manualItem/manualItem"
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  },
  tabBar: {
    color: "#bfbfbf",
    selectedColor: "#e59233",
    backgroundColor: "#fff",
    borderStyle: "black",
    custom: false,
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
    ]
  }
}
