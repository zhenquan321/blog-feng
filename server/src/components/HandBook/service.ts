import * as Joi from 'joi';
import HandBookModel, { IHandBookModel } from './model';
import { IHandBookService } from './interface';
import { Types } from 'mongoose';

import ClassificationService from '../Classification/service';
import UserService from '../User/service';
import CommentService from '../Comment/service';

import Time from './../../utils/Time';
import BlogService from '../Blog/service';

/**
 * @export
 * @implements {IHandBookModelService}
 */
const HandBookService: IHandBookService = {
    /**
     * @returns {Promise < IHandBookModel[] >}
     * @memberof HandBookService
     */
    async findAll(pageQurey: any): Promise<IHandBookModel[] | any> {
        try {
            const page: number = pageQurey && pageQurey.page ? Number(pageQurey.page) : 0;
            const pageSize: number = pageQurey && pageQurey.pageSize ? Number(pageQurey.pageSize) : 20;
            let findKeyObj: any = { deleted: { $ne: true } };
            let sort: any = {};

            if (pageQurey && pageQurey.sort) {
                sort[pageQurey.sort] = -1;
            } else {
                sort.pv = -1;
            }
            if (pageQurey && pageQurey.HandBookSearch) {
                const HandBookSearchKeyWords: any = { $regex: pageQurey.HandBookSearch, $options: 'i' };
                findKeyObj = {
                    $or: [
                        { title: HandBookSearchKeyWords },
                        { content: HandBookSearchKeyWords }
                    ]
                };
            }
            if (pageQurey && pageQurey.keywords) {
                findKeyObj.keywords = pageQurey.keywords;
            }
            if (pageQurey && pageQurey.classifications) {
                findKeyObj.classifications = pageQurey.classifications;
            }
            console.log(sort);

            const HandBookListFind: any[] = await HandBookModel.find(findKeyObj).sort(sort).limit(pageSize).skip(page * pageSize);
            const HandBookList: any[] = JSON.parse(JSON.stringify(HandBookListFind));
            const count: number = await HandBookModel.find(findKeyObj).count();

            for (let i: number = 0; i < HandBookList.length; i++) {
                HandBookList[i].author = await UserService.findOne(HandBookList[i].author);
                HandBookList[i].classifications = await ClassificationService.findOne(HandBookList[i].classifications);
                HandBookList[i].createType = await ClassificationService.findOne(HandBookList[i].createType);
                HandBookList[i].createdAt = new Time().formatDate(HandBookList[i].createdAt);
                let comments:number = 0, thumbsUp:number = 0, pv:number = 0;
                for (let a = 0; a < HandBookList[i].chapter.length; a++) {
                    let handBookPart:any = await BlogService.findOne(HandBookList[i].chapter[a].id);
                    comments += handBookPart.comments;
                    thumbsUp += handBookPart.thumbsUp;
                    pv +=  handBookPart.pv;
                }

                if (HandBookList[i].pv > 100) {
                    HandBookList[i].isHot = true;
                }
                if (HandBookList[i].pv > 100 && HandBookList[i].thumbsUp > 10) {
                    HandBookList[i].isRecommend = '荐';
                }
                if (HandBookList[i].pv > 100 && HandBookList[i].comments > 10) {
                    HandBookList[i].isRecommend = '榜';
                }
                HandBookList[i].comments = comments;
                HandBookList[i].thumbsUp = thumbsUp;
                HandBookList[i].pv = pv;
                this.update(HandBookList[i]._id, HandBookList[i]);
            }

            return {
                count,
                data: HandBookList,
            };

        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IHandBookModel >}
     * @memberof HandBookService
     */
    async findOne(id: string): Promise<IHandBookModel | any> {
        try {
            if (!id) {
                return {};
            }
            const HandBookFind: IHandBookModel = await HandBookModel.findOne({
                _id: Types.ObjectId(id)
            });
            const HandBook: any = JSON.parse(JSON.stringify(HandBookFind));

            HandBook.author = await UserService.findOne(HandBook.author);
            HandBook.classifications = await ClassificationService.findOne(HandBook.classifications);
            HandBook.createType = await ClassificationService.findOne(HandBook.createType);

            return HandBook;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
    * @param {string} id
    * @returns {Promise < IHandBookModel >}
    * @memberof HandBookService
    */
    async update(id: string, updateInfo: any): Promise<any> {
        try {
            const HandBookFind: IHandBookModel = await HandBookModel.updateOne({
                _id: Types.ObjectId(id)
            }, updateInfo);
            return HandBookFind;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    /**
     * @param {IHandBookModel} HandBook
     * @returns {Promise < IHandBookModel >}
     * @memberof HandBookService
     */
    async insert(body: IHandBookModel): Promise<IHandBookModel> {
        try {
            body.createdAt = new Date();
            body.updatedAt = new Date();
            const HandBook: IHandBookModel = await HandBookModel.create(body);

            return HandBook;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IHandBookModel >}
     * @memberof HandBookService
     */
    async remove(id: string): Promise<IHandBookModel> {
        try {

            const HandBook: IHandBookModel = await HandBookModel.findOneAndRemove({
                _id: Types.ObjectId(id)
            });

            return HandBook;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default HandBookService;
