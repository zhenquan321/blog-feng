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
const BlogSchema = new mongoose_1.Schema({
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
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
}).pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const Blog = this; // tslint:disable-line
        next();
    });
});
exports.default = connections.db.model('BlogModel', BlogSchema);
//# sourceMappingURL=model.js.map