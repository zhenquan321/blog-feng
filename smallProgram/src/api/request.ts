import Taro from "@tarojs/taro"
import { BASE_URL, methodList, environmentData } from './../config/apiCfg';
import { HashStorage } from '../utils/public/hashStorage';

interface QueryData {
  data?: any,// 查询条件；
  apiUrl: string,//接口地址不用带host；
  method?: string,//请求方式  默认get
  cacheTime?: string,//缓存时间 day，week，month ；
  host?: string,//接口地址，不传为默认域名；
  UnshowLoad?: boolean,//是否显示loading,默认false，显示loading
}
class Request {
  request(QueryData: QueryData): Promise<any> {
    //获取token
    const methodUse = QueryData.method ? methodList[QueryData.method] : "GET" //不传递，默认get请求
    const url = (QueryData.host ? BASE_URL[QueryData.host] : environmentData.BaseEnUrl) + QueryData.apiUrl
    return new Promise(function (resolve, reject) {
      if (QueryData.cacheTime) {
        if (HashStorage.getStorage(QueryData)) {
          resolve(HashStorage.getStorage(QueryData));
          return
        }
      }
      if (!QueryData.UnshowLoad) {
        Taro.showLoading({
          title: '加载中'
        });
      }
      const requestData = {
        url: url,
        data: QueryData.data,
        method: methodUse,
        mode: 'cors',
        header: {
          "Content-Type": "application/json",
        },
      }
      Taro.request(requestData).then(res => {
        Taro.hideLoading();
        let { statusCode, data } = res
        if (statusCode >= 200 && statusCode < 300) {
          if ((res && res.data && (res.data as any).err === "Unavailable") || (res && res.data && (res.data as any).status === 401)) {
            if (environmentData.CurrentEnvironment == "Android" || environmentData.CurrentEnvironment == 'IOS') {
              var goUrl = '/pages/login/login';
              Taro.setStorage({
                key: "userInfo",
                data: {
                  uId: "",
                  avatar: "",
                  nickName: "",
                  mtime: "",
                  ctime: "",
                  userType: "",
                  funcSets: {},
                  phone: 0,
                  invitationCode: "",
                  balance: 0,
                  parentId: "",
                  registerFrom: "",
                  openid: ""
                }
              }).then(res => console.log(res));
              uni.navigateTo({
                url: goUrl
              })
              resolve(false);
              return;
            }
          }
          resolve(res);
          if (QueryData.cacheTime) {
            HashStorage.setStorage(QueryData, res)
          }
        } else {
          reject(res);
          throw new Error(`网络请求错误，状态码${statusCode}`);
        }
      })
    })
  }
}
export default new Request;
