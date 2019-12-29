import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import request from "../../api/request";
import { AtSearchBar, AtDivider } from 'taro-ui'
import Share from "../../utils/share/share"

import './movie.less'
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/divider.scss";
import "taro-ui/dist/style/components/button.scss";



type PageOwnProps = {}

type PageState = {
  movieList: any;
  value: string;
  page: number,
  pagesize: number,
  noMore: boolean,
  year: number,
  keyword: string,
  type: string,
  yearList: number[],
  typeList: string[],
}

type IProps = PageOwnProps
interface Index {
  state: PageState,
  props: IProps;
}





@Share({
  title: '溜忙 · 电影',
  imageUrl: '',
  path: 'pages/blogItem/blogItem'
})

class Index extends Component {

  config: Config = {
    navigationBarTitleText: '电影'
  }
  constructor(prop) {
    super(prop)
    this.state = {
      movieList: [],
      page: 1,
      pagesize: 12,
      value: '',
      noMore: false,
      year: 0,
      keyword: "",
      type: "",
      yearList: [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008],
      typeList: ['剧情', '科幻', '动作', '犯罪', '战争', '爱情', '青春', '动画', '喜剧', '悬疑', '惊悚', '恐怖'],
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {

  }

  getMovies = () => {
    request
      .request({
        apiUrl: "/api/movie",
        method: "get",
        data: {
          year: this.state.year ? this.state.year : '',
          keyword: this.state.keyword,
          page: this.state.page,
          pagesize: this.state.pagesize,
        }
      })
      .then((res: any) => {
        if (res.data.state == 0) {
          let noMore: boolean = res.data.data.data < this.state.pagesize;
          let movieListGet: any[] = this.state.page == 1 ? [] : this.state.movieList;
          movieListGet = movieListGet.concat(res.data.data.data)

          this.setState({
            noMore: noMore,
            movieList: movieListGet,
          })
        }
      });
  };
  onChange(value) {
    console.log(value)
  }
  onActionClick(e) {
    let value:string = e.detail.value;
    this.setState({
      page: 1,
      keyword: value
    }, () => {
      this.getMovies();
    })
  }

  selYear(index) {
    this.setState({
      year: index,
      page: 1
    }, () => {
      this.getMovies();
    });
  }

  selType(type) {
    this.setState({
      type: type,
      keyword: type,
      page: 1
    }, () => {
      this.getMovies();
    });
  }

  onReachBottom() {
    let page: number = this.state.page + 1;
    this.setState({
      page: page,
      
    }, () => {
      this.getMovies();
    })
  }

  goDetail(id:string){
    Taro.navigateTo({
      url:"/pages/movieItem/movieItem?movieId="+id,
    })
  }

  componentDidMount() {
    this.getMovies();
  }
  componentDidShow() {

  }
  componentDidHide() {

  }
  render() {
    const { movieList } = this.state;
    console.log(movieList);
    return (
      <View className='index'>
        <View className="search-bar">
          <AtSearchBar
            onActionClick={this.onActionClick.bind(this)}
            actionName='搜索'
            value={this.state.keyword}
            onChange={this.onChange.bind(this)}
            onBlur={this.onActionClick.bind(this)}
          />
        </View>
        <View className="fenLei">
          <View className="flCard">
            <View className="flType">
              <View className={this.state.year == 0 ? "active typeItem" : 'typeItem'} onClick={this.selYear.bind(this, 0)}>全部</View>
              {
                this.state.yearList.map((item: number) => {
                  return <View className={this.state.year == item ? "active typeItem" : 'typeItem'} onClick={this.selYear.bind(this, item)}>{item}</View>
                })
              }
            </View>
          </View>
          <View className="flCard">
            <View className="flType">
              <View className={this.state.type == '' ? "active typeItem" : 'typeItem'} onClick={this.selType.bind(this, '')}>全部</View>
              {
                this.state.typeList.map((item: string) => {
                  return <View className={this.state.type == item ? "active typeItem" : 'typeItem'} onClick={this.selType.bind(this, item)}>{item}</View>
                })
              }
            </View>
          </View>
        </View>
        <View className="movieList">
          {
            movieList.map((item: any) => {
              return <View className="movieCard" key={item._id} onClick={this.goDetail.bind(this,item._id)}>
                <Image className="moviePic" src={item.imgUrl}></Image>
                <View className="concent">
                  <View className="name">{item.name}</View>
                  <View className="sketch">{item.sketch}</View>
                </View>
                <View className="card-bottom">
                  <View className="left">
                    <View className='at-icon at-icon-eye'></View><View className="number">{item.clickNum ? item.clickNum : 0}</View>
                    <View className='at-icon at-icon-message'></View><View className="number">{item.comments || 0}</View>
                    <View className='at-icon at-icon-heart'></View><View className="number">{item.thumbsUp || 0}</View>
                  </View>
                </View>
              </View>
            })
          }
        </View>
        <View style="margin:20px">
          {this.state.noMore ? <AtDivider content='没有更多了' fontColor='#aaa' lineColor='#aaa' /> : ''}
        </View>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index;
