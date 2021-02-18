import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { View, Button } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import Share from "../../utils/share/share";
import MovieTab from "./movieTab";
import eventEmeitter from "../../utils/eventEmeitter";
import "taro-ui/dist/style/components/tabs.scss";
import "./movie.less";

type PageOwnProps = {};

type PageState = {
  current: number;
};

type IProps = PageOwnProps;
interface Index {
  state: PageState;
  props: IProps;
}

@Share({
  title: "溜忙 · 电影",
  imageUrl: "",
  path: "pages/blogItem/blogItem",
})
class Index extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      current: 0,
    };
  }
  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {}

  onReachBottom() {
    const data = {
      "0": "movie",
      "1": "TV",
      "2": "comic",
    };
    const type = data[String(this.state.current)];
    console.log(this.state.current, type);
    eventEmeitter.emit(type);
  }
  goTop() {
    if (Taro.pageScrollTo) {
      Taro.pageScrollTo({
        scrollTop: 0,
      });
    } else {
      Taro.showModal({
        title: "提示",
        content:
          "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
      });
    }
  }

  handleClick(value) {
    this.setState({
      current: value,
    });
  }
  componentDidMount() {
    Taro.setNavigationBarTitle({title:"海量电影"})
  }
  componentDidShow() {}
  componentDidHide() {}

  render() {
    const tabList = [{ title: "电影" }, { title: "电视剧" }, { title: "动漫" }];
    return (
      <View className="index">
        <AtTabs
          current={this.state.current}
          tabList={tabList}
          onClick={this.handleClick.bind(this)}
          className="tabs"
        >
          <AtTabsPane current={this.state.current} index={0}>
            <MovieTab type={"movie"}></MovieTab>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <MovieTab type={"TV"}></MovieTab>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <MovieTab type={"comic"}></MovieTab>
          </AtTabsPane>
        </AtTabs>
        <Button className="shareBtn" onClick={this.goTop.bind(this)}>
          <View className="at-icon at-icon-chevron-up"></View>
          <View className="wz">顶部</View>
        </Button>
      </View>
    );
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index;
