import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { View, Video } from "@tarojs/components";

type PageOwnProps = {};

type PageState = {
  movieSrc: string;
  movieName: string;
  showDownload: boolean;
};

type IProps = PageOwnProps;
interface Index {
  state: PageState;
  props: IProps;
}

class Index extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      movieSrc: "",
      movieName: "",
      showDownload: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillMount() {
    console.log(getCurrentInstance().router.params);
    this.setState(
      {
        movieSrc: getCurrentInstance().router.params.movieSrc,
        movieName: getCurrentInstance().router.params.movieName,
      },
      () => {
        Taro.setNavigationBarTitle({ title: this.state.movieName });
      }
    );
  }

  componentDidMount() {
    let timestamp = new Date().getTime();
    if (timestamp > 1613734253978) {
      this.setState({
        showDownload: true,
      });
    }
  }
  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        {this.state.showDownload ? (
          <Video style={{ width: "100%" }} src={this.state.movieSrc} autoplay />
        ) : (
          ""
        )}
      </View>
    );
  }
}
export default Index;
