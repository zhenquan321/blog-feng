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
const MovieSchema = new mongoose_1.Schema({
    name: String,
    updateDate: String,
    clickNum: Number,
    href: String,
    sketch: String,
    imgUrl: String,
    downLink: String,
    years: Number,
    type: String,
    details: {
        downloadLinks: String,
    }
}, {
    collection: 'moviemodel',
    versionKey: false
}).pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const movie = this; // tslint:disable-line
        next();
    });
});
exports.default = connections.db.model('MovieModel', MovieSchema);
//# sourceMappingURL=model.js.map