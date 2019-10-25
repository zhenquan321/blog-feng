export const BASE_URL:any = {
	test:'http://192.168.41.143:3000',
	// chengbf:"http://192.168.41.7:3000",
	chengbf:"http://192.168.41.64:3000",
	waiwang: "http://120.92.90.164:3000",
	test2:"http://192.168.41.96:3001",
	prod:"http://120.92.91.12",
	formal: "http://api.douhua.duojoy.cn",
	stage: "http://pc.douhua.duojoy.cn"
}
export const methodList:any = {
	get: "GET",
	post: "POST",
	options: "OPTIONS",
	head: "HEAD",
	put: "PUT",
	delete: "DELETE",
	trace: "TRACE",
	connect: "CONNECT"
}
//版本号
export const version: string = "V1.0.1"
//资源地址
export const dataUrl:any={
	JSY_Img:"https://a.cdn.duojoy.cn/min_program/douhua/",//微信小程序线上图片地址；
}
//常量
export const environmentData:any = {
	BaseEnUrl: BASE_URL.formal, //修改环境默认接口
}

