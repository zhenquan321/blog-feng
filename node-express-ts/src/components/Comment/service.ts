import * as Joi from 'joi';
import CommentModel, { ICommentModel } from './model';
import { ICommentService } from './interface';
import { Types } from 'mongoose';

const CommentService: ICommentService = {
    /**
     * @returns {Promise < ICommentModel[] >}
     * @memberof CommentService
     */
    async findAll(): Promise<ICommentModel[]> {
        try {
            return await CommentModel.find({});
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
            const hasComment: ICommentModel = await CommentModel.findOne({ name: body.name });

            if (hasComment) {

                return { mag: '该分类已存在' };

            } else {

                const Comment: ICommentModel = await CommentModel.create(body);

                return Comment;
            }

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
