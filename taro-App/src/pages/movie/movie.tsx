import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import request from "../../api/request";
import { AtSearchBar } from 'taro-ui'
import { add, minus, asyncAdd } from '../../actions/counter'

import './movie.less'
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/button.scss";



type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {
  blogList: any;
  value: string;
  page:number,
  pagesize:number,
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps
interface Index {
  state: PageState,
  props: IProps;
}



@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  },
  dec() {
    dispatch(minus())
  },
  asyncAdd() {
    dispatch(asyncAdd())
  }
}))


class Index extends Component {

  config: Config = {
    navigationBarTitleText: '溜忙'
  }
  constructor(prop) {
    super(prop)
    this.state = {
      blogList: [],
      page:0,
      pagesize:20,
      value: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {

  }

  //获取验证码
  getBlogs = () => {

    request
      .request({
        apiUrl: "/api/movie",
        method: "get",
        data: {
          page:this.state.page,
        }
      })
      .then((res: any) => {
        console.log(res);

        if (res.data.state == 0) {
          this.setState({
            blogList: res.data.data.data,
            value: ''
          })
        }
      });
  };
  onChange(value) {
    this.setState({
      value: value
    })
  }
  onActionClick() {
    console.log('开始搜索')
  }
  componentDidMount() {
    this.getBlogs();
  }
  componentDidShow() {

  }

  componentDidHide() { }
  onReachBottom(){

  }

  render() {
    const { blogList } = this.state;
    console.log(blogList);
    return (
      <View className='index'>
        <AtSearchBar
          actionName='搜索'
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          onActionClick={this.onActionClick.bind(this)}
        />
       
        <View className="movieList">
          {
            blogList.map((item: any) => {
              return <View className="movieCard" key={item._id}>
                <Image className="moviePic" src={item.imgUrl}></Image>
                <View className="concent">
                  <View className="name">{item.name}</View>
                  <View className="sketch">{item.sketch}</View>
                </View>
                <View className="card-bottom">
                  <View className="left">
                    <View className='at-icon at-icon-eye'></View><View className="number">{item.clickNum?item.clickNum:0}</View>
                    <View className='at-icon at-icon-message'></View><View className="number">{item.comments||0}</View>
                    <View className='at-icon at-icon-heart'></View><View className="number">{item.thumbsUp||0}</View>
                  </View>
                </View>
              </View>
            })
          }
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
