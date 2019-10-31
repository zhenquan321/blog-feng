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
const connections = require("../../config/connection/connection");
const mongoose_1 = require("mongoose");
const JobSchema = new mongoose_1.Schema({
    id: String,
    jobName: String,
    company: String,
    Recruiter: String,
    href: String,
    releaseTime: Date,
    area: String,
    jobDescription: String,
    companyProfile: String,
    Salary: Number,
    SalaryRange: String,
}, {
    collection: 'jobmodel',
    versionKey: false
}).pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const job = this; // tslint:disable-line
        next();
    });
});
exports.JobModel = connections.db.model('JobModel', JobSchema);
//# sourceMappingURL=model.js.map