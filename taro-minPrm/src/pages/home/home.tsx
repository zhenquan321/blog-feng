import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, Button, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { add, minus, asyncAdd } from "../../actions/counter";
import request from "../../api/request";

import "./home.less";


// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number;
  };
};

type PageDispatchProps = {
  add: () => void;
  dec: () => void;
  asyncAdd: () => any;
};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(
  ({ counter }) => ({
    counter
  }),
  dispatch => ({
    add() {
      dispatch(add());
    },
    dec() {
      dispatch(minus());
    },
    asyncAdd() {
      dispatch(asyncAdd());
    }
  })
)
interface HomeState {
  freeList: any[];
}

class Index extends Component<IProps, HomeState> {
  /**
   * 指定config的类型声明为: Taro.Config
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "豆花好卷"
  };
  constructor(prop) {
    super(prop);
    this.state = {
      freeList: []
    };
  }


  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  componentWillMount() {

  }
  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="home">

      </View>
    );
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>;
