/**
 * @export
 * @interface QueryData
 */
export interface QueryData{
	data?:any,// 查询条件；必传
	apiUrl?:string,//接口地址不用带host；必传
	method?:string,//请求方式  默认get
	cacheTime?:string,//缓存时间 day，week，month ；
	host?:string,//接口地址，不传为默认域名；
	UnshowLoad?:boolean,//是否显示loading,默认false，显示loading
}
/**
 * @export
 * @interface HashStorageInf
 */
export interface HashStorageInf {
    /**
     * @returns {number}
     * @memberof hashStorage
     */
    getWeekd(): number;
    /**
     * @param {QueryData} code
     * @returns {string}
     * @memberof hashStorage
     */
    generateHashId(key: QueryData): string;

    /**
     * @param {QueryData} code
     * @returns {string}
     * @memberof hashStorage
     */
    getStorage(key: QueryData|string): any;
    /**
     * @param {QueryData} code
     * @returns {string}
     * @memberof hashStorage
     */
    setStorage(key: QueryData|string,data:any): any;
}
