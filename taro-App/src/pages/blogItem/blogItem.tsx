import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Image, Swiper, SwiperItem,RichText } from '@tarojs/components'
import request from "../../api/request"

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

class Index extends Component {
  config: Config = {
    navigationBarTitleText: '',
    usingComponents: {
      wemark: '../../wemark/wemark'
    }
  }
  constructor(prop) {
    super(prop)
    this.state = {
      blog: {},
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
          this.setState({
            blog: res.data.data
          })
        }
      });
  };



  onReachBottom() {
    // let page: number = this.state.page + 1;
    // this.setState({
    //   page: page,
    // }, () => {
    //   // this.getBlogs();
    // })
  }
  componentWillMount() {
    console.log(this.$router.params)
    this.setState({
      blogId: this.$router.params.blogId
    }, () => {
      this.getBlogDetail();
    })
  }


  componentDidMount() {
    this.getBlogDetail();
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
            <wemark md={blog.content} link highlight type='wemark' />
          </View>
        </View>


      </View>
    )
  }
}
export default Index;
