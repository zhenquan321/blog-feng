import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'
import { formatDate,getUserInfo } from '../../utils/publicFun'
import statistics from "../../utils/statistics";

import './user.less'
import request from '../../api/request'


type PageStateProps = {
  counter: {
    orderList: any
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
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
    navigationBarTitleText: '我的免单',
    enablePullDownRefresh: true,
  }
  constructor(prop:any) {
    super(prop)
    this.state = {
      orderList:[]
    }
  }
  goPage() {
    Taro.navigateTo({ url: '/pages/login/login'})
  }
  goBuy=()=>{
    Taro.switchTab({url: '/pages/home/home'})
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
   componentDidMount(){
    console.log(1111)
    this.getOrderList();
  }
  componentWillUnmount() {

  }
  componentDidShow() { }

  componentDidHide() { }
  goDownLoad=()=>{
    statistics("userPage","goDownLoadApp");
    window.location.href="https://activity.duojoy.cn/#/downLoadApp?channelPort=wallet"
  }
  getOrderList =()=> {
    let uid = getUserInfo()?getUserInfo().uid:"";
    if(!uid){
      return
    }
    let data = {
      userId:uid,
      orderState:"",
      page:0,
      type:"",
      md:1,
    }
    let parmas = {
      data: data, // 查询条件；
      cacheTime: "", //缓存时间 day，week，month ；
      method: "get", //请求方式
      apiUrl: "/api/order/queryOrder", //接口地址
      baseUrl: ""
    };
    request.request(parmas).then(res => {
      let data: any = res.data.data.cnt.data.list;
      let newData: any = [];
      data.forEach((currentValue: any, index: number) => {
        newData.push({
          id: currentValue._id,
          orderId: currentValue.orderId || '',
          orderTime: formatDate(currentValue.orderTime),
          orderTimeGettime: currentValue.orderTime,
          validCode: currentValue.validText,
          type: currentValue.type,
          commissionReal: currentValue.commissionReal,
          goods_thumbnail_url: currentValue.goods_thumbnail_url,
          goods_name: currentValue.goods_name,
          goodsPrice: currentValue.goodsPrice,
          orderAmount: currentValue.orderAmount,
          mdamount: currentValue.mdamount
        })
      })
      this.setState({
        orderList:newData[0]
      })
      console.log(newData)
    });
  }
  render() {
    const { orderList } = this.state;
    console.log(this.state.orderList)
    return (
      <View className='user'>
        <Image className="bgImg" src={user_bg} />
        <View className='older-card'>

          {
            orderList.orderId?
            <View>
              <View className="header">

                <View className="cjsj">创建时间：{orderList.orderTime}</View>
                <View className="zfzt">{orderList.validCode}</View>
              </View>
              <View className="card-body">
                <View className="left-img">
                  <Image className="header-icom" src={orderList.goods_thumbnail_url} />
                </View>
                <View className="right">
                  <View className="right-title">{orderList.goods_name}</View>
                  <View className="fandan">
                    <View className="xiaofei">消费金额 ¥{orderList.orderAmount}</View>
                    <View className="fanxian">返现：<View className="fanxianjine">￥{orderList.commissionReal||0}</View></View>
                    {orderList.mdamount? <View className="miandan">免单</View>:""}
                  </View>
                  <View className="dingdan">订单号 <View className="dingdanhao">{orderList.orderId}</View></View>
                </View>
              </View>
            </View>:
            <View >
              <View className="noOlder">
                <View className="title">您还没有领取免单哦，快去领取吧~</View>
              </View>
            </View>
          }
        </View>
      </View>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>
