
import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Button} from '@tarojs/components'
import request from "../../api/request"
import Share from "../../utils/share/share"
import TaroWemark from '../../components/taro-wemark/taro-wemark'

import "./blogItem.less";

type PageOwnProps = {}

type PageState = {
  blog: any;
  blogId: string
}

type IProps = PageOwnProps
interface Index {
  state: PageState,
  props: IProps;
}

@Share({
  title: '溜忙',
  imageUrl: '',
  path: 'pages/blogItem/blogItem'
})

class Index extends Component {

  constructor(prop) {
    super(prop)
    this.state = {
      blog: {
        content: "# hjhashj"
      },
      blogId: "",
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {

  }

  getBlogDetail = () => {
    request
      .request({
        apiUrl: "/api/blog/" + this.state.blogId,
        method: "get",
        data: {}
      })
      .then((res: any) => {
        console.log(res);
        if (res.data.state == 0) {
          Taro.setNavigationBarTitle({ title: res.data.data.title })
          //分享信息

          this.setState({
            blog: res.data.data
          })
        }
      });
  };

  $setShareTitle = () => this.state.blog.title;
  $setSharePath = () => 'pages/blog/index?=blogId' + this.state.blogId;



  onReachBottom() {
    // let page: number = this.state.page + 1;
    // this.setState({
    //   page: page,
    // }, () => {
    //   // this.getBlogs();
    // })
  }
  componentWillMount() {

  }


  componentDidMount() {
    this.setState({
      blogId: getCurrentInstance().router.params.blogId
    }, () => {
      this.getBlogDetail();
    })
  }
  componentDidShow() {

  }

  componentDidHide() { }

  render() {
    let { blog } = this.state;
    return (
      <View className='index'>
        <View className="blogDetail">
          <View className="h2">
            {blog.title}
          </View>
          <View className="content">
            <TaroWemark md={blog.content} link highlight type='wemark'></TaroWemark>
          </View>
        </View>
        <Button className="shareBtn" open-type="share">
          <View className='at-icon at-icon-share'></View>
          <View className="wz">分享</View>
        </Button>

      </View>
    )
  }
}
export default Index;
