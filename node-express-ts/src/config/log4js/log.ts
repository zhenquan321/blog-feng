import * as path from 'path';
const log4js: any = require('log4js');

const logConfig: any = {
    path: './',
    type: 'console',
    level: 'debug',
    mask: true
}

const logPath: string = process.env.LOG_PAHT || logConfig.path;
const logType: string = logConfig.type || 'info';
const logLevel: string = (logConfig.level || 'all').toUpperCase();

// 自定义日志类别
log4js.configure({
    appenders: [
        {
            type: 'console',
            category: 'console'
        }, // 控制台输出
        {
            type: 'file',
            category: 'fileLog',
            filename: path.join(logPath, 'log.log'),
            maxLogSize: 104857600,
            backups: 100
        }, // 单文件输出
        {
            type: 'logLevelFilter',
            level: 'DEBUG',
            category: 'recordRequestTime',
            appender: {
                type: 'file',
                filename: path.join(logPath, 'time.log'),
                pattern: '-yyyy-MM-dd.log',
                alwaysIncludePattern: true,
            },
        },
        {
            type: 'logLevelFilter',
            level: 'DEBUG',
            category: 'recordUploadFileError',
            appender: {
                type: 'file',
                filename: path.join(logPath, 'upload.log'),
                pattern: '-yyyy-MM-dd.log',
                alwaysIncludePattern: true,
            },
        },
        {
            type: 'dateFile',
            category: 'dateFileLog',
            filename: path.join(logPath, 'log'),
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        } // 日期格式文件输出
    ],
    replaceConsole: true,   //替换console.log
    levels: {
        console: 'ALL',
        fileLog: 'ALL',
        dateFileLog: 'ALL'
    }
});
const logger: any = log4js.getLogger(logType || 'dateFileLog');
const getLogger: any = (type: any) => {
    return log4js.getLogger(type);
}
// 设置日志级别
logger.setLevel(logLevel.toUpperCase());
// 设置日志脱敏
logger.setMask(logConfig.mask);

exports.logger = logger;
exports.getLogger = getLogger;
exports.use = (app: any) => {
    app.use(log4js.connectLogger(logger, { level: 'info', format: ':method :url :status :response-timems' }));
}

