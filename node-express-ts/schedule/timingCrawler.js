const schedule = require('node-schedule');

// 定义规则
let rule = new schedule.RecurrenceRule();
rule.second = [0, 10, 20, 30, 40, 50]; // 每隔 10 秒执行一次

// 启动任务
let job = schedule.scheduleJob(rule, () => {
  console.log(new Date());
});
