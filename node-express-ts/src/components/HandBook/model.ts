import * as bcrypt from 'bcrypt';
import * as connections from '../../config/connection/connection';
import * as crypto from 'crypto';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';


/**
 * @export
 * @interface IHandBookModel
 * @extends {Document}
 */

export interface IHandBookModel extends Document {
    author:string;
    title:string;
    describe:string;
    chapter:string[];
    coverPhoto:string;
    keyWords:string;
    classifications: string;
    createType:string;
    published:boolean;
    isRecommend:string;
    isHot:boolean;
    createdAt: Date;
    updatedAt: Date;
    comments:number;
    pv: number;
    thumbsUp:number;
    deleted:boolean;
    quantitySold:number;
}

const HandBookSchema: Schema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    title: {
        type: String,
        required: true
    },
    describe: {
        type: String,
        required: true
    },
    chapter:{
        type: Array,
        default: [],
    },
    coverPhoto:{
        type: String,
        required: true
    },
    keyWords: {
        type: String,
        default: ''
    },
    classifications: {
        type: Schema.Types.ObjectId,
        ref: 'classifications'
    },
    createType:{
        type: Schema.Types.ObjectId,
        ref: 'classifications'
    },
    pv: {
        type: Number,
        default: 0
    },
    quantitySold:{
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
    thumbsUp: {
        type: Number,
        default: 0
    },
    isRecommend: {
        type: String,
        default: ''
    },
    isHot: {
        type: Boolean,
        default: false
    },
    published: {
        type: Boolean,
        default: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date().getTime()
    },
    updatedAt: {
        type: Date,
        default: new Date().getTime()
    }

}, {
    collection: 'HandBookmodel',
    versionKey: false
}).pre('save', async function (next: NextFunction): Promise<void> {
    const HandBook: IHandBookModel = this; // tslint:disable-line
    next();
});

export default connections.db.model<IHandBookModel>('HandBookModel', HandBookSchema);
