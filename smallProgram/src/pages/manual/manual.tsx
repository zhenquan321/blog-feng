import Taro from "@tarojs/taro";
import React, { Component } from "react";
import {
  View,
  Button,
  Text,
  Image,
  Swiper,
  SwiperItem,
} from "@tarojs/components";
import request from "../../api/request";
import { AtNoticebar, AtSearchBar, AtGrid, AtDivider } from "taro-ui";
import Share from "../../utils/share/share";

import "./manual.less";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/button.scss";

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

type PageState = {
  blogList: any;
  value: string;
  page: number;
  pagesize: number;
  noMore: boolean;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;
interface Manual {
  state: PageState;
  props: IProps;
}

@Share({
  title: "溜忙 · 技术博文",
  imageUrl: "",
  path: "pages/blog/manual?shareMag=66666",
})
class Manual extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      blogList: [],
      value: "",
      page: 1,
      pagesize: 20,
      noMore: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  getBlogs = () => {
    request
      .request({
        apiUrl: "/api/handBook",
        method: "get",
        data: {
          HandBookSearch: this.state.value,
          page: this.state.page,
        },
      })
      .then((res: any) => {
        console.log(res);
        if (res.data.state == 0) {
          let noMore: boolean = res.data.data.data < this.state.pagesize;
          let blogListGet: any[] =
            this.state.page == 1 ? [] : this.state.blogList;
          blogListGet = blogListGet.concat(res.data.data.data);
          this.setState({
            noMore: noMore,
            blogList: blogListGet,
          });
        }
      });
  };
  onChange(value) {
    console.log(value);
  }
  onActionClick(e) {
    let value: string = e.detail.value;
    this.setState(
      {
        page: 1,
        value: value,
      },
      () => {
        this.getBlogs();
      }
    );
  }

  onReachBottom() {
    let page: number = this.state.page + 1;
    this.setState(
      {
        page: page,
      },
      () => {
        this.getBlogs();
      }
    );
  }
  goDetail(id: string) {
    Taro.navigateTo({
      url: "/pages/manualItem/manualItem?manualId=" + id,
    });
  }

  componentWillMount() {}

  componentDidMount() {
    this.getBlogs();
    Taro.setNavigationBarTitle({ title: "精心手册" });
  }
  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { blogList } = this.state;
    console.log(blogList);
    return (
      <View className="manual">
        <View className="search-bar">
          <AtSearchBar
            actionName="搜索"
            value={this.state.value}
            onChange={this.onChange.bind(this)}
            onBlur={this.onActionClick.bind(this)}
          />
        </View>

        <View className="blogList">
          {blogList.map((item: any) => {
            return (
              <View
                className="blogCard"
                key={item._id}
                onClick={this.goDetail.bind(this, item._id)}
              >
                <View className="leftImage">
                  <Image
                    style="width: 100px;height: 140px;background: #fff;"
                    src={item.coverPhoto}
                  />
                </View>
                <View className="rightNr">
                  <View className="userInfo">
                    <View className="title">《{item.title}》</View>
                    <View className="right">
                      {item.isHot ? (
                        <View>
                          <View className="re">热</View>
                          <View className="dian"> · </View>
                        </View>
                      ) : (
                        ""
                      )}
                      {item.isRecommend ? (
                        <View>
                          <View className="jian">{item.isRecommend}</View>
                          <View className="dian"> · </View>
                        </View>
                      ) : (
                        ""
                      )}
                      <View className="lei">{item.classifications.name}</View>
                    </View>
                    <View className="left">
                      <Image
                        className="img"
                        src={item.author.profile.picture}
                      ></Image>
                      <View className="name">
                        {item.author.profile.name || item.author.email}
                      </View>
                    </View>
                  </View>
                  <View className="describe">{item.describe}</View>
                  <View className="card-bottom">
                    <View className="left">
                      <View className="at-icon at-icon-eye"></View>
                      <View className="number">{item.pv}</View>
                      <View className="at-icon at-icon-message"> </View>
                      <View className="number">{item.comments}</View>
                      <View className="at-icon at-icon-heart"> </View>
                      <View className="number">{item.thumbsUp}</View>
                    </View>
                    {/* <View className="right">
                      {item.createdAt}
                    </View> */}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        <View style="margin:20px;">
          {this.state.noMore ? (
            <AtDivider
              content="没有更多了"
              fontSize="20"
              fontColor="#aaa"
              lineColor="#aaa"
            />
          ) : (
            ""
          )}
        </View>
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

export default Manual;
