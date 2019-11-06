import * as bcrypt from 'bcrypt';
import * as connections from '../../config/connection/connection';
import * as crypto from 'crypto';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';


export interface ICommentModel extends Document {
    name: string;
    describe: string;
    meta: {
        createdAt: Date,
        updatedAt: Date,
    };
}


const ClassificatSchema: Schema = new Schema({
    name: {
        type: String,
        default: ''
    },
    describe: {
        type: String,
        default: ''
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
    collection: 'commentmodel',
    versionKey: false
}).pre('save', async function (next: NextFunction): Promise<void> {
    const Comment: ICommentModel = this; // tslint:disable-line
    next();
});

export default connections.db.model<ICommentModel>('Comment', ClassificatSchema);
