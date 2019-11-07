import * as Joi from 'joi';
import { ToolService } from './interface';
import { Data } from 'ejs';
// import formidable from 'formidable';

const formidable: any = require('formidable');
const path: any = require('path');
const fs: any = require('fs');
/**
 * @export
 * @implements {IMovieModelService}
 */
const ToolService: ToolService = {

    /**
     * @param any
     * @returns {Promise < any >}
     * @memberof upload
     */

    async upload(req: any, res: any): Promise<any> {
        try {
            const form: any = new formidable.IncomingForm();
            form.encoding = 'utf-8';
            form.uploadDir = path.join(__dirname + './../../../public/upload');
            form.keepExtensions = true;// 保留后缀
            form.maxFieldsSize = 3 * 1024 * 1024;
            // 处理图片
            form.parse(req, (err: any, fields: any, files: any) => {
                console.log(fields, files);
                let avatarName: string = '';
                const succMap: any = {};
                const normalMap: string[] = [];

                for (const key in files) {
                    if (files[key].name) {
                        const file: any = files[key];
                        const filename: string = file.name;
                        const nameArray: string[] = filename.split('.');
                        const type: string = nameArray[nameArray.length - 1];
                        let name: string = '';
                        for (let i: number = 0; i < nameArray.length - 1; i++) {
                            name = name + nameArray[i];
                        }
                        const date: Data = new Date();
                        const time: string = '_' + date.getFullYear() + '_' + date.getMonth() + '_'
                            + date.getDay() + '_' + date.getHours() + '_' + date.getMinutes();
                        avatarName = name + time + '.' + type;
                        const newPath: string = form.uploadDir + '/' + avatarName;
                        fs.renameSync(file.path, newPath);  // 重命名
                        succMap[nameArray[0]] = '/upload/' + avatarName;
                        normalMap.push('/upload/' + avatarName);
                    }
                }
                if (fields && fields.useWhere && fields.useWhere == 'normal') {
                    res.send({
                        msg: '',
                        code: 0,
                        data: normalMap
                    });
                } else {
                    res.send({
                        msg: '',
                        code: 0,
                        data: {
                            succMap,
                            errFiles: [],
                        }
                    });
                }
                // res.send({ url: '/upload/' + avatarName});
            });

        } catch (error) {
            throw new Error(error.message);
        }
    },

};

export default ToolService;
