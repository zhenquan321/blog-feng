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
const CommentSchema = new mongoose_1.Schema({
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
}).pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const Comment = this; // tslint:disable-line
        next();
    });
});
exports.default = connections.db.model('Comment', CommentSchema);
//# sourceMappingURL=model.js.map