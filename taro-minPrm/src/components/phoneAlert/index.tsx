import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.less'
import login_number from '../../assets/images/h5Active/login_number.png'
import login_numberwrong from '../../assets/images/h5Active/login_numberwrong.png'
import { AtButton } from "taro-ui"
interface IndexSate {
  tsTitle: string | undefined
}
export default class PhoneAlert extends Component<{}, IndexSate> {
  constructor(props) {
    super(props);
    this.state = {
      tsTitle: "抱歉，输入手机号码格式不正确，请重新输入",
    }
  }
  render() {
    console.log(this.state)
    return (
      <View className='PhoneAlert'>
        <View className="Alert1" >
          {
            this.props.tsType == 1 ?
            (
              <Image src={login_number} className='comp-loading__img' />
            ):(
              <Image src={login_numberwrong} className='comp-loading__img' />
            )
          }
          <View className="title">温馨提示</View>
          <View className="tsNeiRong">{this.props.tsTitle || this.state.tsTitle}</View>
          <AtButton className="zd-btn" circle={true} onClick={this.props.tsClick}> 知道了</AtButton>
        </View>
      </View>
    )
  }
}

