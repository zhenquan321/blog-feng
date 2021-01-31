import Taro, { getCurrentInstance } from "@tarojs/taro";
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
import Share from "../../utils/share/share";

import "./movieItem.less";

type PageOwnProps = {};

type PageState = {
  movie: any;
  movieId: string;
  showDownload: boolean;
};

type IProps = PageOwnProps;
interface Index {
  state: PageState;
  props: IProps;
}

@Share({
  title: "溜忙",
  imageUrl: "",
  path: "pages/blogItem/blogItem",
})
class Index extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      movie: {},
      movieId: "",
      showDownload: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  getmovieDetail = () => {
    if (!this.state.movieId) {
      return;
    }
    request
      .request({
        apiUrl: "/api_go/movie/" + this.state.movieId,
        method: "get",
        data: {},
      })
      .then((res: any) => {
        Taro.setNavigationBarTitle({ title: res.data.name });
        this.setState({
          movie: res.data,
        });
      });
  };

  onReachBottom() {
    console.log("ssssss")
    // let page: number = this.state.page + 1;
    // this.setState({
    //   page: page,
    // }, () => {
    //   // this.getmovies();
    // })
  }
  setClipboardData(data) {
    Taro.setClipboardData({ data: data }).then(() => {
      Taro.showToast({
        title: "已复制到剪切板",
        icon: "success",
        duration: 2000,
      });
    });
  }

  $setShareTitle = () => this.state.movie.name;
  $setSharePath = () => "pages/blog/index?movieId=" + this.state.movieId;

  componentWillMount() {
    console.log(getCurrentInstance().router.params);
    this.setState(
      {
        movieId: getCurrentInstance().router.params.movieId,
      },
      () => {
        this.getmovieDetail();
      }
    );
    let timestamp = new Date().getTime();
    if (timestamp > 0) {
      this.setState({
        showDownload: true,
      });
    }
  }

  componentDidMount() {}
  componentDidShow() {}

  componentDidHide() {}

  render() {
    let { movie, showDownload } = this.state;
    return (
      <View className="index">
        <View className="movieDetail">
          <View className="imgCard">
            <View className="baseView">
              <View className="">
                <Image
                  className="img"
                  src={movie.cover}
                  mode="widthFix"
                ></Image>
              </View>
              {showDownload ? (
                <View className="h100">
                  <View className="movieJj">
                    <View className="h3">{movie.name}</View>
                    <View className="h5">
                      更新时间：{movie.detail && movie.detail.update}
                    </View>
                    <View className="h5">
                      类型:{movie.detail && movie.detail.type}
                    </View>
                    <View className="h5">
                      导演:{movie.detail && movie.detail.director}
                    </View>
                    <View className="h5">
                      主演：{movie.detail && movie.detail.starring}
                    </View>
                    <View className="h5">
                      地区：{movie.detail && movie.detail.area}
                    </View>
                    <View className="h5">
                      语言：{movie.detail && movie.detail.language}
                    </View>
                    <View className="h5">
                      上映：{movie.detail && movie.detail.released}
                    </View>
                    <View className="p">
                      <View className="span">简介：</View>
                      {movie.detail && movie.detail.vod_play_info}
                    </View>
                    <View className="downLoadCard">
                      <View className="h6">下载链接</View>
                      {movie.download &&
                        movie.download.map((item) => {
                          return (
                            <View>
                              <View className="p">{item.episode}.{item.play_link}</View>
                              <View
                                className="copy"
                                onClick={this.setClipboardData.bind(
                                  this,
                                  item.play_link
                                )}
                              ></View>
                              <Button type="primary" size="mini">
                                点击复制
                              </Button>
                            </View>
                          );
                        })}
                    </View>

                    <View className="downLoadCard">
                      <View className="h6">在线播放地址</View>
                      {movie.kuyun &&
                        movie.kuyun.map((item) => {
                          return (
                            <View>
                              <View className="p">{item.episode}.{item.play_link}</View>
                              <View
                                className="copy"
                                onClick={this.setClipboardData.bind(
                                  this,
                                  item.play_link
                                )}
                              ></View>
                              <Button type="primary" size="mini">
                                点击复制
                              </Button>
                            </View>
                          );
                        })}
                    </View>

                    <View className="downLoadCard">
                      <View className="h6">ckm3u8</View>
                      {movie.ckm3u8 &&
                        movie.ckm3u8.map((item) => {
                          return (
                            <View>
                              <View className="p">{item.episode}.{item.play_link}</View>
                              <View
                                className="copy"
                                onClick={this.setClipboardData.bind(
                                  this,
                                  item.play_link
                                )}
                              ></View>
                              <Button type="primary" size="mini">
                                点击复制
                              </Button>
                            </View>
                          );
                        })}
                    </View>


                  </View>
                </View>
              ) : (
                ""
              )}
            </View>
            <View className="detailCard">
              {movie.details &&
                movie.details.detailDes.map((item: string) => {
                  return <View className="p">{item}</View>;
                })}
              <Image
                className="img"
                src={movie.details && movie.details.detailImg}
                mode="widthFix"
              ></Image>
            </View>
          </View>
        </View>
        <Button className="shareBtn" open-type="share">
          <View className="at-icon at-icon-share"></View>
          <View className="wz">分享</View>
        </Button>
      </View>
    );
  }
}
export default Index;
