export default class Time {
    // 倒计时
    countDownTime(dateString: string, configTime?: number): any {

        const date1: any = new Date(); // 开始时间
        const date2: any = new Date(dateString); // 结束时间
        let date3: any = date2.getTime() - date1.getTime(); // 时间差的毫秒数
        let isEnd: boolean = false;// 倒计时已结束

        date3 = configTime ? date3 + configTime * 60 * 60 * 1000 : date3;
        if (date3 < 0) {
            isEnd = true;
        }
        // 计算出相差天数
        const days: number = Math.floor(date3 / (24 * 3600 * 1000));
        // 计算出小时数
        const leave1: number = date3 % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
        const hours: number = Math.floor(leave1 / (3600 * 1000));
        // 计算相差分钟数
        const leave2: number = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
        const minutes: number = Math.floor(leave2 / (60 * 1000));
        // 计算相差秒数
        const leave3: number = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
        const seconds: number = Math.round(leave3 / 1000);
        const hour: string = hours + days * 24 >= 10 ? (hours + days * 24).toString() : '0' + hours;
        const minute: string = minutes >= 10 ? minutes.toString() : '0' + minutes;
        const second: string = seconds >= 10 ? seconds.toString() : '0' + seconds;

        return { hour, minute, second, isEnd };
    }
    // 123456789 --> 年-月-日 时：分：秒
    formatDate(secs: number): string {
        const t: any = new Date(secs);
        const year: any = t.getFullYear();
        let month: any = t.getMonth() + 1;

        if (month < 10) { month = '0' + month; }
        let date: any = t.getDate();

        if (date < 10) { date = '0' + date; }

        let hour: any = t.getHours();

        if (hour < 10) { hour = '0' + hour; }

        let minute: any = t.getMinutes();

        if (minute < 10) { minute = '0' + minute; }

        let second: any = t.getSeconds();

        if (second < 10) { second = '0' + second; }

        return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
    };

}