import Taro from '@tarojs/taro'
export function formatDate(secs: number): string { //123456789 --> 年-月-日 时：分：秒
  var t: any = new Date(secs);
  var year: any = t.getFullYear();
  var month: any = t.getMonth() + 1;
  if (month < 10) { month = '0' + month; }
  var date: any = t.getDate();
  if (date < 10) { date = '0' + date; }
  var hour: any = t.getHours();
  if (hour < 10) { hour = '0' + hour; }
  var minute: any = t.getMinutes();
  if (minute < 10) { minute = '0' + minute; }
  var second: any = t.getSeconds();
  if (second < 10) { second = '0' + second; }
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
};

export  function getUserInfo(){
  let userInfo = Taro.getStorageSync("userInfo")
  if(userInfo){
    return userInfo
  }else{
    Taro.navigateTo({ url: '/pages/login/login' }).then((res) => {
      console.log("已跳转")
    })
    return
  }
}

