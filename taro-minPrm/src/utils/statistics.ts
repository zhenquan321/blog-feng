// 友盟埋点
class statistics {
    // 参数	   必填/选填	 类型	 功能	
    // category   必填	       string	表示事件发生在谁身上，如“视频”、“小说”、“轮显层”等等。	 
    // action	   必填	       string	表示访客跟元素交互的行为动作，如"播放"、"收藏"、"翻层"等等。	 
    // label	   选填	       string	用于更详细的描述事件，如具体是哪个视频，哪部小说。	 
    // value	   选填	       int	    用于填写打分型事件的分值，加载时间型事件的时长，订单型事件的价格。
    // nodeid 	   选填	       string	填写事件元素的div元素id。	请填写class id，暂不支持name
    statistics(category:string,action:string,label?:string,value?:number,nodeid?:string){
        console.log("statistics:",category,action)
        _czc.push(["_trackEvent",category,action,label,value,nodeid]);
    }
}

export default new statistics().statistics