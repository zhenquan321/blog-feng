import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import request from "../../api/request";
import { AtNoticebar, AtSearchBar, AtGrid } from 'taro-ui'
import { add, minus, asyncAdd } from '../../actions/counter'

import './index.less'
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

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
  config: Config = {
    navigationBarTitleText: '溜忙'
  }
  constructor(prop) {
    super(prop)
    this.state = {
      blogList: [],
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
        apiUrl: "/blog",
        method: "get",
        data: {}
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

  render() {
    const { blogList } = this.state;
    console.log(blogList);
    return (
      <View className='index'>
        <View className="search-bar">
          <AtSearchBar
            actionName='搜索'
            value={this.state.value}
            onChange={this.onChange.bind(this)}
            onActionClick={this.onActionClick.bind(this)}
          />
        </View>
        <Swiper
          className='swiper'
          indicatorColor='rgba(115, 109, 102, 0.66)'
          indicatorActiveColor='rgba(229, 146, 51, 0.83)'
          circular
          indicatorDots
          autoplay>
          <SwiperItem>
            <Image src="http://img4.imgtn.bdimg.com/it/u=1936271708,2299077308&fm=26&gp=0.jpg"></Image>
          </SwiperItem>
        </Swiper>
        <View className="AtNoticebar">
          <AtNoticebar marquee icon='volume-plus'>
            欢迎加入“溜忙”😊😊😊，我们的官网是：lmongo.com。在这里，你除了会找到各种教程外，也可以发布教程和文档，大家携手共建美好家园。🤒🤒🤒
          </AtNoticebar>
        </View>

        {/* <View className="AtGrid">
          <AtGrid data={
            [
              {
                image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                value: '领取中心'
              },
              {
                image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                value: '找折扣'
              },
              {
                image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                value: '领会员'
              },
            ]
          } />
        </View> */}

        <View className="blogList">
          {
            blogList.map((item: any) => {
              return <View className="blogCard" key={item._id}>
                <View className="userInfo">
                  <View className="left">
                    <Image className="img" src={item.author.profile.picture}></Image>
                    <View className="name">{item.author.profile.name || item.author.email}</View>
                  </View>
                  <View className="right">
                    {item.isHot ?
                      <View>
                        <View className="re">热</View>
                        <View className="dian"> · </View>
                      </View> : ""
                    }
                    {item.isRecommend ?
                      <View>
                        <View className="jian">{item.isRecommend}</View>
                        <View className="dian"> · </View>
                      </View> : ""
                    }
                    <View className="lei">{item.classifications.name}</View>
                  </View>
                </View>
                <View className="title">
                  {item.title}
                </View>
                <View className="card-bottom">
                  <View className="left">
                    <View className='at-icon at-icon-eye'></View><View className="number">{item.pv}</View>
                    <View className='at-icon at-icon-message'> </View><View className="number">{item.comments}</View>
                    <View className='at-icon at-icon-heart'> </View><View className="number">{item.thumbsUp}</View>
                  </View>
                  <View className="right">
                    {item.createdAt}
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
