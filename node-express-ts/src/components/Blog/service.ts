import * as Joi from 'joi';
import BlogModel, { IBlogModel } from './model';
import { IBlogService } from './interface';
import { Types } from 'mongoose';

import ClassificationService from '../Classification/service'; // 目录 Movie 大小写有疑问
import UserService from '../User/service'; // 目录 Movie 大小写有疑问
/**
 * @export
 * @implements {IBlogModelService}
 */
const BlogService: IBlogService = {
    /**
     * @returns {Promise < IBlogModel[] >}
     * @memberof BlogService
     */
    async findAll(pageQurey: any): Promise<IBlogModel[] | any> {
        try {
            const page: number = pageQurey && pageQurey.page ? Number(pageQurey.page) : 0;
            const pagesize: number = pageQurey && pageQurey.pagesize ? Number(pageQurey.pagesize) : 20;
            try {
                const findKeyObj: any = {};

                if (pageQurey && pageQurey.keywords) {
                    findKeyObj.keywords = pageQurey.keywords;
                }
                if (pageQurey && pageQurey.classifications) {
                    findKeyObj.classifications = pageQurey.classifications;
                }

                const BlogList: any[] =JSON.parse(JSON.stringify( await BlogModel.find(findKeyObj).limit(pagesize).skip(page * pagesize)));
                const count: number = await BlogModel.find(findKeyObj).countDocuments();
                for (let i: number = 0; i < BlogList.length; i++) {
                    BlogList[i].author = await UserService.findOne(BlogList[i].author);
                    BlogList[i].classifications = await ClassificationService.findOne(BlogList[i].classifications);
                }

                return {
                    count,
                    data: BlogList,
                };
            } catch (error) {
                throw new Error(error.message);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IBlogModel >}
     * @memberof BlogService
     */
    async findOne(id: string): Promise<IBlogModel|any> {
        try {
            const BlogFind:IBlogModel = await BlogModel.findOne({
                _id: Types.ObjectId(id)
            });
            const Blog:any = JSON.parse(JSON.stringify(BlogFind));

            Blog.author = await UserService.findOne(Blog.author);
            Blog.classifications = await ClassificationService.findOne(Blog.classifications);

            return Blog;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IBlogModel} Blog
     * @returns {Promise < IBlogModel >}
     * @memberof BlogService
     */
    async insert(body: IBlogModel): Promise<IBlogModel> {
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
    async remove(id: string): Promise<IBlogModel> {
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
