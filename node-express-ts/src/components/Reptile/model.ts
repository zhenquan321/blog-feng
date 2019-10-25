import * as bcrypt from 'bcrypt';
import * as connections from '../../config/connection/connection';
import * as crypto from 'crypto';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';

/**
 * @export
 * @interface IMovieModel
 * @extends {Document}
 */
export interface IMovieModel extends Document {
    name: string,
    downLink:string,
    imgUrl:string,
    href:string,
    years:number,
    type?:string,
}

const MovieSchema: Schema = new Schema({
    name: String,
    downLoadHref:String,
    picture:String,
    href:String,
    years:Number,
    type:String,
}, {
    collection: 'moviemodel',
    versionKey: false
}).pre('save', async function (next: NextFunction): Promise < void > {
    const movie: IMovieModel = this; // tslint:disable-line
    next();
});

export const MovieModel = connections.db.model < IMovieModel > ('MovieModel',MovieSchema);

/**
 * @export
 * @interface IJobModel
 * @extends {Document}
 */
export interface IJobModel extends Document {
    id: string,
    jobName:string,
    company:string,
    Recruiter:string,
    href:string,
    releaseTime:Date,
    area:string,
    jobDescription:string,
    companyProfile:string,
    Salary:number,
    SalaryRange:String,
}

const JobSchema: Schema = new Schema({
    id: String,
    jobName:String,
    company:String,
    Recruiter:String,
    href:String,
    releaseTime:Date,
    area:String,
    jobDescription:String,
    companyProfile:String,
    Salary:Number,
    SalaryRange:String,
}, {
    collection: 'jobmodel',
    versionKey: false
}).pre('save', async function (next: NextFunction): Promise < void > {
    const job: IJobModel = this; // tslint:disable-line
    next();
});


export const JobModel = connections.db.model < IJobModel > ('JobModel',JobSchema);
