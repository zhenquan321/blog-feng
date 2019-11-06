import * as bcrypt from 'bcrypt';
import * as connections from '../../config/connection/connection';
import * as crypto from 'crypto';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';


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
    keyWords:string;
    published:boolean;
    isRecommend:string;
    isHeat:boolean;
    createdAt: Date;
    updatedAt: Date;
    
}

const BlogSchema: Schema = new Schema({
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
    pv: {
        type: Number,
        default: 0
    },
    isRecommend: {
        type: String,
        default: ''
    },
    isHeat: {
        type: Boolean,
        default: false
    },
    published: {
        type: Boolean,
        default: false
    },
    contentType: {
        type: String,
        default: 'Markdown'
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
    const Blog: IBlogModel = this; // tslint:disable-line
    next();
});

export default connections.db.model<IBlogModel>('BlogModel', BlogSchema);
