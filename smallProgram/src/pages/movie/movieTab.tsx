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
import { AtNoticebar, AtDivider } from "taro-ui";
import Share from "../../utils/share/share";
import eventEmeitter from "../../utils/eventEmeitter";

import "./movie.less";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/divider.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/noticebar.scss";
import { categories } from "./data";

type PageOwnProps = {
  type: "movie" | "TV" | "comic";
};

type PageState = {
  movieList: any;
  value: string;
  page: number;
  pagesize: number;
  noMore: boolean;
  year: number;
  keyword: string;
  current: number;
  type: string;
  yearList: number[];
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
      movieList: [],
      page: 1,
      pagesize: 12,
      value: "",
      noMore: false,
      current: 0,
      year: 0,
      keyword: "",
      type: categories[prop.type] && categories[prop.type].sub[0].type_id,
      yearList: [
        2021,
        2020,
        2019,
        2018,
        2017,
        2016,
        2015,
        2014,
        2013,
        2012,
        2011,
        2010,
        2009,
        2008,
      ],
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  getMovies = () => {
    request
      .request({
        apiUrl: "/api_go/movie",
        method: "get",
        data: {
          activeYear: this.state.year ? this.state.year : "",
          selZiCategories: this.state.type,
          keyword: this.state.keyword,
          page: this.state.page,
          pagesize: this.state.pagesize,
        },
      })
      .then((res: any) => {
        console.log(res);
        let noMore: boolean = res.data < this.state.pagesize;
        let movieListGet: any[] =
          this.state.page == 1 ? [] : this.state.movieList;
        movieListGet = movieListGet.concat(res.data);
        this.setState({
          noMore: noMore,
          movieList: movieListGet,
        });
      });
  };
  onChange(value) {
    console.log(value);
  }
  onActionClick(e) {
    let value: string = e.detail.value;
    if (!value) return;
    this.setState(
      {
        page: 1,
        keyword: value,
      },
      () => {
        this.getMovies();
      }
    );
  }

  selYear(index) {
    this.setState(
      {
        year: index,
        page: 1,
      },
      () => {
        this.getMovies();
      }
    );
  }

  selType(type) {
    this.setState(
      {
        type: type,
        keyword: type,
        page: 1,
      },
      () => {
        this.getMovies();
      }
    );
  }

  goDetail(id: string) {
    console.log(id);
    Taro.navigateTo({
      url: "/pages/movieItem/movieItem?movieId=" + id,
    });
  }

  handleClick(value) {
    this.setState({
      current: value,
    });
  }
  componentDidMount() {
    this.getMovies();

    eventEmeitter.add(this.props.type, () => {
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => {
          this.getMovies();
        }
      );
    });
  }
  componentDidShow() {}
  componentDidHide() {}
  render() {
    const { movieList } = this.state;
    const { type } = this.props;
    return (
      <View className="index">
        {/* <View className="search-bar">
          <AtSearchBar
            onActionClick={this.onActionClick.bind(this)}
            actionName="搜索"
            value={this.state.keyword}
            onChange={this.onChange.bind(this)}
            onBlur={this.onActionClick.bind(this)}
          />
        </View> */}
        <View className="fenLei">
          <View className="flCard">
            <View className="flType">
              <View
                className={
                  this.state.year == 0 ? "active typeItem" : "typeItem"
                }
                onClick={this.selYear.bind(this, 0)}
              >
                全部
              </View>
              {this.state.yearList.map((item: number) => {
                return (
                  <View
                    className={
                      this.state.year == item ? "active typeItem" : "typeItem"
                    }
                    onClick={this.selYear.bind(this, item)}
                  >
                    {item}
                  </View>
                );
              })}
            </View>
          </View>
          <View className="flCard">
            <View className="flType">
              {categories[type] &&
                categories[type].sub.map((item) => {
                  return (
                    <View
                      className={
                        this.state.type == item.type_id
                          ? "active typeItem"
                          : "typeItem"
                      }
                      onClick={this.selType.bind(this, item.type_id)}
                    >
                      {item.name}
                    </View>
                  );
                })}
            </View>
          </View>
        </View>
        <View className="AtNoticebar">
          <AtNoticebar marquee icon='volume-plus'>
            资源来自互联网，仅供个人娱乐，不可商用，如有侵权，请联系随时下架。
          </AtNoticebar>
        </View>
        <View className="movieList">
          {movieList.map((item: any) => {
            return (
              <View
                className="movieCard"
                key={item._id}
                onClick={this.goDetail.bind(this, item.id || item._id)}
              >
                <Image
                  className="moviePic"
                  src={item.imgUrl || item.cover}
                ></Image>
                <View className="concent">
                  <View className="name">{item.name}</View>
                  <View className="sketch">
                    {item.detail && item.detail.vod_play_info}
                  </View>
                </View>
                <View className="card-bottom">
                  <View className="left">
                    <View className="at-icon at-icon-eye"></View>
                    <View className="number">
                      {item.clickNum ? item.clickNum : 0}
                    </View>
                    <View className="at-icon at-icon-message"></View>
                    <View className="number">{item.comments || 0}</View>
                    <View className="at-icon at-icon-heart"></View>
                    <View className="number">{item.thumbsUp || 0}</View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        <View style="margin:20px">
          {this.state.noMore ? (
            <AtDivider content="没有更多了" fontColor="#aaa" lineColor="#aaa" />
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

export default Index;
