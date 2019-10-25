import Taro, { Component } from "@tarojs/taro";
import { View, Button, Input, Text, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import "./login.less";
import request from "../../api/request";
import bgImgTop from "../../assets/images/h5Active/login_bg_up.png";
import bgImgBottom from "../../assets/images/h5Active/login_bg_down.png";
import inputPhoneIcon from "../../assets/images/h5Active/inputPhoneIcon.png";
import inputYZMIcon from "../../assets/images/h5Active/inputYZMIcon.png";
import { PhoneAlert } from "../../components";
import statistics from "../../utils/statistics";

interface IndexSate {
  pwd: string | undefined;
  phoneTem: string;
  isOpened: boolean;
  getYzmTitle: string;
  btnYZMdis: boolean;
  tsTitle: string;
  tsType: number;
}
export default class Login extends Component<{}, IndexSate> {

  constructor(props:any){
    super(props)
    this.state={
      phoneTem: "",
      pwd: "",
      isOpened: false,
      getYzmTitle: "获取验证码",
      btnYZMdis: false,
      tsTitle: "",
      tsType: 0
    };
  }
  handleChangeAc = (e: any) => {
    this.setState({ phoneTem: e.detail.value });
  };

  handleChangePs = (e: any) => {
    this.setState({ pwd: e.detail.value });
  };

  async getUserInfo() {
    const { userInfo } = await Taro.getUserInfo();
    Taro.setStorageSync("wxInfo", userInfo);
  }
  consSt() {
    console.log(this.state);
  }
  //验证码倒计时
  yzmDjs = (num: number) => {
    console.log(num);
    for (let i = 0; i < num+1; i++) {
      setTimeout(() => {
        if (num - i != 0) {
          this.setState({
            getYzmTitle: "再次获取" + (num - i) + "秒",
            btnYZMdis: true
          });
        } else {
          this.setState({
            getYzmTitle: "获取验证码",
            btnYZMdis: false
          });
        }
      }, i * 1100);
    }
  };
  //获取验证码
  getYzmFun = (num: number) => {
    const phoneTem = this.state.phoneTem;
    if (!phoneTem) {
      this.setState({
        tsTitle: "请输入手机号码",
        tsType: 1
      });
      return false;
    }
    if (!/^1[3456789]\d{9}$/.test(phoneTem)) {
      this.setState({
        tsTitle: "手机号格式不正确",
        tsType: 1
      });
      return false;
    }
    request
      .request({
        apiUrl: "/v1/auth/reqPhoneLoginTemp",
        method: "get",
        data: {
          phone: phoneTem,
          sjs:Math.ceil(Math.random()*1.2+Math.random()*1.9)
        }
      })
      .then((res: any) => {
        if (res.data.status == "1") {
          this.yzmDjs(num);
          Taro.showToast({
            title: "短信已发送，请稍后",
            icon: "none"
          });
        } else {
          Taro.showToast({
            title: res.data.data || "短信发送失败，请稍后再试~",
            icon: "none"
          });
        }
      });
  };
  //登录
  login = () => {
    const phoneTem = this.state.phoneTem;
    const code = this.state.pwd;
    if (!code) {
      this.setState({
        tsTitle: "请输入验证码",
        tsType: 2
      });
      return false;
    }
    //登陆操作
    request.request({
      apiUrl:'/v1/auth/signin_phone_temp',
      method:'post',
      data:{
        phone:phoneTem,
        code:code
      }
    }).then((res:any)=>{
      console.log(res)
      if(res.data.status=='1'){
        statistics("user","phoneLogin");
         //保存token
         Taro.setStorageSync('userInfo',res.data.data)
         Taro.switchTab({url: '/pages/home/home'})
      }else{
        this.setState({
          tsTitle:res.data.data,
          tsType:2,
        })
      }
    })
  }
  routeGo=(url:string)=>{
    Taro.navigateTo({
      url
    });
  };
  //关闭提示框
  tsClick() {
    this.setState({
      tsTitle: "",
      tsType: 0
    });
  }
  render() {
    const { phoneTem, pwd } = this.state;
    return (
      <View className="login">
        {this.state.tsType != 0 && (
          <PhoneAlert
            tsTitle={this.state.tsTitle}
            tsType={this.state.tsType}
            tsClick={this.tsClick.bind(this)}
          />
        )}
        <view className="bgImgTop">
          <Image src={bgImgTop} className="bgImage" />
        </view>
        <view className="bgImgBottom">
          <Image src={bgImgBottom} className="bgImage" />
        </view>
        <View className="content">
          <View className="inputDiv">
            <Image src={inputPhoneIcon} className="inputImage" />
            <Input
              type="text"
              value={phoneTem}
              className="input"
              placeholder="请输入手机号"
              onInput={this.handleChangeAc}
            />
          </View>
          <View className="inputDiv">
            <Image src={inputYZMIcon} className="inputImage" />
            <Input
              name="pwd"
              type="number"
              placeholder="请输入短信验证码"
              value={pwd}
              className="input"
              onInput={this.handleChangePs}
            />
            <AtButton
              className="get-YZMcode"
              type="primary"
              disabled={this.state.btnYZMdis}
              circle={true}
              onClick={this.getYzmFun.bind(this, 60)}
              size="small"
            >
              {this.state.getYzmTitle}
            </AtButton>
          </View>
          <Button className="loginBtn" type="primary" onClick={this.login}>
            登录
          </Button>
        </View>
      </View>
    );
  }
}
