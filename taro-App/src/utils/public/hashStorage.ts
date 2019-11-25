/*
 *数据缓存-----------------------------------------------------------------------------
 * 数据缓存key
 *key={
 *  cacheTime//day, week,month;日，周，月；
 *  data// 查询条件；
 *}
 * By FZQ
 */
import { Base64 } from 'js-base64';
import { QueryData, HashStorageInf} from "./hashStorage.inf";
import md5 from "ts-md5"

export const HashStorage: HashStorageInf={
	getWeekd(): number{
		let d1:any = new Date();
		let d2:any = new Date();
		d2.setMonth(0);
		d2.setDate(1);
		let rq:any = d1 - d2;
		let days:number = Math.ceil(rq / (24 * 60 * 60 * 1000));
		let num:number = Math.ceil(days / 7);
		return num;
	},
	generateHashId(key: QueryData):string{
		let hashId:string = "";
		let hashId_JSON:string = "";
		let NowDate:any = new Date();
		let time:string = "";
		if (key.cacheTime == "day") {
			time = NowDate.getYear() + NowDate.getMonth() + "day" + NowDate.getDate();
		} else if (key.cacheTime == "week") {
			time = NowDate.getYear() + "week" + this.getWeekd();
		} else if (key.cacheTime == "month") {
			time = NowDate.getYear() + "month" + NowDate.getMonth();
		}
		hashId_JSON = time + (typeof(key.data) === "string" ? key.data : JSON.stringify(key));
		return md5.hashStr(hashId_JSON).toString()
	},
	getStorage(key: QueryData|string):any{
		let hashId = typeof(key) === "string" ? key : this.generateHashId(key);
		let data:any;
		try{
			 data = uni.getStorageSync(hashId);
		}catch(e){
			//TODO handle the exception
			data = false;
		}
		return data;
	},
	setStorage(key: QueryData|string, data:any):void {
		let hashId = typeof(key) === "string" ? key : this.generateHashId(key);
		uni.setStorage({
			key: hashId,
			data: data,
			success: function () {
				
			}
		});
	}
	
}
