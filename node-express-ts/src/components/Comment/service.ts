import * as Joi from 'joi';
import CommentModel, { ICommentModel } from './model';
import { ICommentService } from './interface';
import { Types } from 'mongoose';
import UserService from '../User/service';
import Time from '../../utils/Time';


const CommentService: ICommentService = {
    /**
     * @returns {Promise < ICommentModel[] >}
     * @memberof CommentService
     */
    async findAll(query: any): Promise<any> {

        try {
            const page: number = query && query.page ? Number(query.page) : 0;
            const pagesize: number = query && query.pagesize ? Number(query.pagesize) : 10;
            const findKeyObj: any = {
                subjectId: query.subjectId,
                deleted:false
            };

            const commentList: ICommentModel[] = await CommentModel.find(findKeyObj).sort({ updatedAt: -1 }).limit(pagesize).skip(page * pagesize);
            const count: number = await CommentModel.find(findKeyObj).countDocuments();
            const commentListRt: any = JSON.parse(JSON.stringify(commentList));

            for (let i = 0; i < commentListRt.length; i++) {
                commentListRt[i].author = await UserService.findOne(commentListRt[i].userId);
                commentListRt[i].createdAt = new Time().formatDate(commentListRt[i].createdAt);
                commentListRt[i].updatedAt = new Time().formatDate(commentListRt[i].updatedAt);
            }

            return {
                count,
                data: commentListRt,
            };

        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < ICommentModel >}
     * @memberof CommentService
     */
    async findOne(id: string): Promise<ICommentModel> {
        try {
            return await CommentModel.findOne({
                _id: Types.ObjectId(id)
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {ICommentModel} Comment
     * @returns {Promise < ICommentModel >}
     * @memberof CommentService
     */
    async insert(body: ICommentModel): Promise<ICommentModel | any> {
        try {
            body.createdAt = new Date();
            const Comment: ICommentModel = await CommentModel.create(body);

            return Comment;

        } catch (error) {
            throw new Error(error.message);
        }
    },
    /**
      * @param {string} id
      * @returns {Promise < IBlogModel >}
      * @memberof BlogService
      */
    async update(id: string, updateInfo: any): Promise<any> {
        try {
            const BlogFind: ICommentModel = await CommentModel.updateOne({
                _id: Types.ObjectId(id)
            }, updateInfo);

            console.log(BlogFind, updateInfo);

            return BlogFind;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    /**
     * @param {string} id
     * @returns {Promise < ICommentModel >}
     * @memberof CommentService
     */
    async remove(id: string): Promise<ICommentModel> {
        try {

            const Comment: ICommentModel = await CommentModel.findOneAndRemove({
                _id: Types.ObjectId(id)
            });

            return Comment;
        } catch (error) {
            throw new Error(error.message);
        }
    }

};

export default CommentService;
