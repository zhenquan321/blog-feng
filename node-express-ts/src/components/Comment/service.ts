import * as Joi from 'joi';
import CommentModel, { ICommentModel } from './model';
import { ICommentService } from './interface';
import { Types } from 'mongoose';

const CommentService: ICommentService = {
    /**
     * @returns {Promise < ICommentModel[] >}
     * @memberof CommentService
     */
    async findAll(query:any): Promise<any> {
        
        try {
            const page: number = query && query.page ? Number(query.page) : 0;
            const pagesize: number = query && query.pagesize ? Number(query.pagesize) : 10;
            const findKeyObj: any = {
                subjectId:query.subjectId
            };

            const commentList: ICommentModel[] = await CommentModel.find(findKeyObj).limit(pagesize).skip(page * pagesize);
            const count: number = await CommentModel.find(findKeyObj).countDocuments();

            return {
                count,
                data: commentList,
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
            const Comment: ICommentModel = await CommentModel.create(body);
            
            return Comment;

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
