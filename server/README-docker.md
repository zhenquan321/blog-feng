# docker-web-examples
nodejs web server running in docker container



# 运行虚拟机
docker run -i -t -v /Users/feng/docker/:/mnt/software/ node /bin/bash

这条命令比较长，我们稍微分解一下，其实包含以下三个部分：

docker run <相关参数> <镜像 ID> <初始命令>
其中，相关参数包括：

-i：表示以“交互模式”运行容器
-t：表示容器启动后会进入其命令行
-v：表示需要将本地哪个目录挂载到容器中，格式：-v <宿主机目录>:<容器目录>


进入容器内的centos操作系统命令行, cd /mnt/software进入安装包所在路径。



##  docker-compose  运行

2.【Linux 命令】docker-compose up【命令解释】 命令聚合每个容器的输出，命令退出时，所有容器都将停止。

3.【Linux 命令】docker-compose up -d【命令解释】 在后台启动容器并使它们保持运行。

4.【Linux 命令】docker-compose logs -f【命令解释】 查看该容器的启动的日志打印(日志从头打印)。

5.【Linux 命令】Docker logs -f container_id【命令解释】 查看某一容器的启动的日志打印(日志从头打印)。

6.【Linux 命令】Docker logs -f --tail 数量词 container_id【命令解释】 查看某一容器的启动的日志打印(查看最后 n 条日志打印)。 例：Docker logs -f --tail 50 44b

7.【Linux 命令】docker-compose stop【命令解释】 停止 compose 服务。

8.【Linux 命令】docker-compose restart【命令解释】 重启 compose 服务。

9.【Linux 命令】docker-compose kill【命令解释】 kill compose 服务。

10.【Linux 命令】docker-compose ps【命令解释】查看 compose 服务状态。

11.【Linux 命令】docker-compose rm【命令解释】删除 compose 服务。