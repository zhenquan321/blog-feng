import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import {
  View,Video
} from "@tarojs/components";

type PageOwnProps = {};

type PageState = {
  movieSrc: string;
  movieName:string;
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
      movieName:""
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }


  componentWillMount() {
    console.log(getCurrentInstance().router.params)
    this.setState(
      {
        movieSrc: getCurrentInstance().router.params.movieSrc,
        movieName: getCurrentInstance().router.params.movieName,
      },()=>{
        Taro.setNavigationBarTitle({ title: this.state.movieName })
      }
    );
  }

  componentDidMount() {}
  componentDidShow() {}

  componentDidHide() {}

  render() {

    return (
      <View className="index">
       <Video style={
         {width:"100%"}
       } src={this.state.movieSrc}  autoplay  />
      </View>
    );
  }
}
export default Index;
