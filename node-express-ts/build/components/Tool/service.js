"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import formidable from 'formidable';
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
/**
 * @export
 * @implements {IMovieModelService}
 */
const ToolService = {
    /**
     * @param any
     * @returns {Promise < any >}
     * @memberof upload
     */
    upload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const form = new formidable.IncomingForm();
                form.encoding = 'utf-8';
                form.uploadDir = path.join(__dirname + './../../../public/upload');
                form.keepExtensions = true; // 保留后缀
                form.maxFieldsSize = 3 * 1024 * 1024;
                // 处理图片
                form.parse(req, (err, fields, files) => {
                    let avatarName = '';
                    const succMap = {};
                    const normalMap = [];
                    for (const key in files) {
                        if (files[key].name) {
                            const file = files[key];
                            const filename = file.name;
                            const nameArray = filename.split('.');
                            const type = nameArray[nameArray.length - 1];
                            let name = '';
                            for (let i = 0; i < nameArray.length - 1; i++) {
                                name = name + nameArray[i];
                            }
                            const date = new Date();
                            const time = '_' + date.getFullYear() + '_' + date.getMonth() + '_'
                                + date.getDay() + '_' + date.getHours() + '_' + date.getMinutes();
                            avatarName = name + time + '.' + type;
                            const newPath = form.uploadDir + '/' + avatarName;
                            fs.renameSync(file.path, newPath); // 重命名
                            succMap[file.name] = '/upload/' + avatarName;
                            normalMap.push('/upload/' + avatarName);
                        }
                    }
                    if (fields && fields.useWhere && fields.useWhere == 'normal') {
                        res.send({
                            msg: '',
                            code: 0,
                            data: normalMap
                        });
                    }
                    else {
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
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
};
exports.default = ToolService;
//# sourceMappingURL=service.js.map