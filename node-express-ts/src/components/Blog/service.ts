import * as Joi from 'joi';
import BlogModel, { IBlogModel } from './model';
import { IBlogService } from './interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IBlogModelService}
 */
const BlogService: IBlogService = {
    /**
     * @returns {Promise < IBlogModel[] >}
     * @memberof BlogService
     */
    async findAll(): Promise < IBlogModel[] > {
        try {
            return await BlogModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IBlogModel >}
     * @memberof BlogService
     */
    async findOne(id: string): Promise < IBlogModel > {
        try {
            return await BlogModel.findOne({
                _id: Types.ObjectId(id)
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IBlogModel} Blog
     * @returns {Promise < IBlogModel >}
     * @memberof BlogService
     */
    async insert(body: IBlogModel): Promise < IBlogModel > {
        try {
            const Blog: IBlogModel = await BlogModel.create(body);

            return Blog;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IBlogModel >}
     * @memberof BlogService
     */
    async remove(id: string): Promise < IBlogModel > {
        try {

            const Blog: IBlogModel = await BlogModel.findOneAndRemove({
                _id: Types.ObjectId(id)
            });

            return Blog;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default BlogService;
