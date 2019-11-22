import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import request from "../../api/request";

import './movieItem.less';

type PageOwnProps = {}

type PageState = {
  movie: any;
  movieId: string
}

type IProps = PageOwnProps
interface Index {
  state: PageState,
  props: IProps;
}

class Index extends Component {
  config: Config = {
    navigationBarTitleText: ''
  }
  constructor(prop) {
    super(prop)
    this.state = {
      movie: {},
      movieId: ""

    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }


  componentWillUnmount() {

  }

  getmovieDetail = () => {
    request
      .request({
        apiUrl: "/movie/" + this.state.movieId,
        method: "get",
        data: {}
      })
      .then((res: any) => {
        console.log(res);
        if (res.data.state == 0) {
          Taro.setNavigationBarTitle({ title: res.data.data.name })
          this.setState({
            movie: res.data.data
          })
        }
      });
  };


  onReachBottom() {
    // let page: number = this.state.page + 1;
    // this.setState({
    //   page: page,
    // }, () => {
    //   // this.getmovies();
    // })
  }

  componentWillMount() {
    console.log(this.$router.params)
    this.setState({
      movieId: this.$router.params.movieId
    }, () => {
      this.getmovieDetail();
    })
  }

  componentDidMount() {

  }
  componentDidShow() {

  }

  componentDidHide() { }

  render() {
    let { movie } = this.state;
    return (
      <View className='index'>
        <View className="movieDetail">
          <View className="imgCard">
            <View className="baseView">
              <View className="">
                <Image className="img" src={movie.imgUrl} mode="widthFix" ></Image>
              </View>
              <View className="h100">
                <View className="movieJj">
                  <View className="h3">{movie.name}</View>
                  <View className="h5">更新时间：{movie.updateDate}</View>
                  <View className="p"><View className="span">简介：</View>{movie.sketch}</View>
                  <View className="downLoadCard">
                    <View className="h6">迅雷 => 下载链接</View>
                    <View className="p">
                      {movie.downLink}
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View className="detailCard">
              {movie.details && movie.details.detailDes.map((item: string) => {
                return <View className="p">{item}</View>
              })}
              <Image className="img" src={movie.details.detailImg} mode="widthFix" ></Image>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
export default Index;
