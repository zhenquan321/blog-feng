Node.js Express API with TypeScript 3. Supports MongoDB

##### 数据存储:

- MongoDB
- Redis

##### 测试模块：

- mocha
- chai
- supertest

#### 软件要求

- node >= 10
- npm >= 6
- mongodb >= 3.0
- typescript >= 3.0

#### 启动项目

#### 测试环境

- 安装相关包

```bash
npm install -g nodemon
npm install -g ts-node
npm install -g typescript
npm install
```

- 启动本地测试

```
nodemon
```

#### 正式环境

1. 安装`pm2`、 `typescript`

```
npm install -g pm2
pm2 install typescript
```

2. 运行

```
## 运行打包后的
pm2 start ./build/config/server/index.js

pm2 start ./src/config/server/index.ts --watch     当文件变化时自动重启应用

$ pm2 delete all               关闭并删除所有应用
```

### 测试

```bash
npm test

```

#### 设置开发环境

在根文件夹中可以找到“.env”。您可以使用此配置，或根据自己的需求进行修改
如果要添加一些新变量，还需要将它们添加到 interface 和 config 对象中 (查看 `src/config/index.ts`)

#### Swagger

```bash
npm install -g swagger-jsdoc
swagger-jsdoc -d swaggerDef.js -o swagger.json
```

Swagger 查看地址

```bash
http://localhost:3000/docs
```

#### 启动爬虫 接口

- 爬取列表 /reptile/movieRt
- 爬取详情 /reptile/getMvDetail

## 个人记录服务端操作命令

#### 查看端口

netstat -lnp|grep 80

## Linux 下 mongodb 后台运行

mongod -f mongodb.conf --bind_ip_all

#### 百度云服务器配置的 mongo 启动方式

mongod --config /etc/mongod.conf --bind_ip_all

## Linux 下关闭 mongodb

mongod -f mongodb.conf --shutdown

## 重启服务器

./bin/mongod --repair


## docker 启动
docker-compose up -d --scale app=3

