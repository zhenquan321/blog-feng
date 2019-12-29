import * as bcrypt from 'bcrypt';
import * as connections from '../../config/connection/connection';
import * as crypto from 'crypto';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';


export interface ICommentModel extends Document {
    userId: string;
    content: string;
    subjectType: 'movie' | 'blog' | 'comment';
    deleted: boolean;
    subjectId: string;
    fatherCommentId?:string;
    createdAt: Date;
    updatedAt: Date;
}


const CommentSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    subjectType: {
        type: String,
        required: true
    },
    subjectId: {
        type: String,
        required: true
    },
    fatherCommentId: {
        type: String,
        default: ''
    },
    deleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

}, {
    collection: 'commentmodel',
    versionKey: false
}).pre('save', async function (next: NextFunction): Promise<void> {
    const Comment: ICommentModel = this; // tslint:disable-line
    next();
});

export default connections.db.model<ICommentModel>('Comment', CommentSchema);
