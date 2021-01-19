
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Button, Text, Image, Swiper, SwiperItem, RichText } from '@tarojs/components'
import { AtPagination,AtButton,AtDrawer,AtList, AtListItem } from 'taro-ui'
import request from "../../api/request"
import Share from "../../utils/share/share"

import "./manualItem.less";

type PageOwnProps = {}

type PageState = {
  manual: any;
  manualId: string;
  blogId:string;
  blog:any,
  chapter:number,
  current:number,
  show:boolean
}

type IProps = PageOwnProps
interface ManualItem {
  state: PageState,
  props: IProps;
}

@Share({
  title: '溜忙',
  imageUrl: '',
  path: 'pages/manualItem/manualItem'
})

class ManualItem extends Component {
  // config: Config = {
  //   navigationBarTitleText: '',
  //   usingComponents: {
  //     wemark: '../../wemark/wemark'
  //   }
  // }
  constructor(prop) {
    super(prop)
    this.state = {
      manual: {
        chapter:[]
      },
      manualId: "",
      blogId:"",
      chapter:1,
      blog:{},
      current:1,
      show:false
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {

  }

  getHandBook = () => {
    request
      .request({
        apiUrl: "/api/handBook/" + this.state.manualId,
        method: "get",
        data: {}
      })
      .then((res: any) => {
        console.log(res);
        if (res.data.state == 0) {
          Taro.setNavigationBarTitle({ title: res.data.data.title })
          //分享信息
          this.setState({
            manual: res.data.data,
            blogId:res.data.data.chapter[0].id,
            chapter:res.data.data.chapter.length||1,
          },()=>{
            this.getBlogDetail()
          })
        }
      });
  };
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

  $setShareTitle = () => this.state.manual.title;
  $setSharePath = () => 'pages/blog/manualitem?=manualId' + this.state.manualId;

  componentWillMount() {
    this.setState({
      manualId: this.$router.params.manualId
    }, () => {
      this.getHandBook();
    })
  }
  onPageChange=(type)=>{
    let chapter = this.state.manual.chapter;
    console.log(type.current,chapter[type.current].id);
    this.setState({
      blogId:chapter[type.current-1].id,
      current:type.current,
    },()=>{
      this.getBlogDetail()
    })
  }
  onShowQb=()=>{
    this.setState({
      show:true
    })
  }
  onClose=()=>{
    this.setState({
      show:false
    })
  }
  onItemChange=(index)=>{
    let chapter = this.state.manual.chapter;
    this.setState({
      blogId:chapter[index].id,
      current:index+1,
    },()=>{
      this.getBlogDetail();
      this.onClose();
    })

  }
  componentDidMount() {

  }
  componentDidShow() {

  }

  componentDidHide() { }

  render() {
    let { blog ,chapter,current,manual} = this.state;
    return (
      <View className='manualitem'>
        <View className="blogDetail">
          <View className="h2">
            {blog.title}
          </View>
          <View className="content">
            <wemark md={blog.content} link highlight type='wemark' />
          </View>
        </View>
        {/* <Button className="shareBtn" open-type="share">
          <View className='at-icon at-icon-share'></View>
          <View className="wz">分享</View>
        </Button> */}
        <View className="AtPagination">
          <View className="wenan">
            当前章节：
          </View>
          <View className="zjjh">
            <AtPagination
              icon
              total={chapter}
              pageSize={1}
              current={current}
              onPageChange={this.onPageChange.bind(this)}
            >
            </AtPagination>
          </View>
          <View className="quanbu">
            <AtButton className="btn"  size='small' onClick={this.onShowQb.bind(this)}>全部章节</AtButton>
          </View>

        </View>
        <AtDrawer
          show={this.state.show}
          onClose={this.onClose.bind(this)}
          mask
        >
          <AtList>
           {
              manual.chapter.map((item:any,index)=>{
                return <AtListItem className={index==current-1?'active':''} title={(index+1)+'、'+item.title} arrow='right' onClick={this.onItemChange.bind(this,index)}  />
              })
           }

          </AtList>
        </AtDrawer>
      </View>
    )
  }
}
export default ManualItem;
