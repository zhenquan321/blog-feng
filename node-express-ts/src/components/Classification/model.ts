import * as bcrypt from 'bcrypt';
import * as connections from '../../config/connection/connection';
import * as crypto from 'crypto';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';


export interface IClassificationModel extends Document {
    name: string;
    describe: string;
    type:string;
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
    type: {
        type: String,
        default: ''
    },
    meta: {
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    }

}, {
    collection: 'classificationmodel',
    versionKey: false
}).pre('save', async function (next: NextFunction): Promise<void> {
    const Classification: IClassificationModel = this; // tslint:disable-line
    next();
});

export default connections.db.model<IClassificationModel>('Classification', ClassificatSchema);
