import * as bcrypt from 'bcrypt';
import * as connections from '../../config/connection/connection';
import * as crypto from 'crypto';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';
import { string } from 'joi';


/**
 * @export
 * @interface IBlogModel
 * @extends {Document}
 */

export interface IBlogModel extends Document {
    author: string;
    title: string;
    content: string;
    classifications: string;
    pv: Number;
    contentType: string;
    keyWords: string;
    published: boolean;
    onlyOwer:boolean;
    publishForm: string;
    isRecommend: string;
    isHot: boolean;
    createType: string;
    createdAt: Date;
    updatedAt: Date;
    comments: number;
    thumbsUp: number;
    deleted: boolean;
}

const BlogSchema: any = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    title: {
        type: String,
        required: true
    },
    keyWords: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        required: true
    },
    classifications: {
        type: Schema.Types.ObjectId,
        ref: 'classifications'
    },
    createType: {
        type: Schema.Types.ObjectId,
        ref: 'classifications'
    },
    contentType: {
        type: String,
        default: 'Markdown'
    },
    pv: {
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
        default: false
    },
    onlyOwer: {
        type: Boolean,
        default: false
    },
    publishForm:{
        type: String,
        default: ''
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
    collection: 'Blogmodel',
    versionKey: false
}).pre('save', async function (next: NextFunction): Promise<void> {
    next();
});

export default connections.db.model<IBlogModel>('BlogModel', BlogSchema);
