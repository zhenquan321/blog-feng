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
    author: String;
    title: String;
    content: String;
    category: String;
    pv: Number;
    contentType: String;
    keyWords:String;
    published:boolean;
    meta: {
        createdAt: Date,
        updatedAt: Date,
    };
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
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    pv: {
        type: Number,
        default: 0
    },
    published: {
        type: Boolean,
        default: false
    },
    contentType: {
        type: String,
        default: 'Markdown'
    },
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    }

}, {
    collection: 'Blogmodel',
    versionKey: false
}).pre('save', async function (next: NextFunction): Promise<void> {
    const Blog: IBlogModel = this; // tslint:disable-line
    next();
});

export default connections.db.model<IBlogModel>('BlogModel', BlogSchema);
