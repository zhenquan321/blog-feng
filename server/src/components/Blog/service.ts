import * as Joi from 'joi';
import BlogModel, { IBlogModel } from './model';
import { IBlogService } from './interface';
import { Types } from 'mongoose';

import ClassificationService from '../Classification/service';
import UserService from '../User/service';
import CommentService from '../Comment/service';

import Time from './../../utils/Time';

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
            const pageSize: number = pageQurey && pageQurey.pageSize ? Number(pageQurey.pageSize) : 20;
            let findKeyObj: any = { deleted: { $ne: true } };
            const sort: any = {};

            if (pageQurey && pageQurey.sort) {
                sort[pageQurey.sort] = -1;
            } else {
                sort.createdAt = -1;
            }
            if (pageQurey && pageQurey.blogSearch) {
                const blogSearchKeyWords: any = { $regex: pageQurey.blogSearch, $options: 'i' };
                findKeyObj = {
                    $or: [
                        { title: blogSearchKeyWords },
                        { content: blogSearchKeyWords }
                    ],
                };
            }
           
            if (pageQurey && pageQurey.keywords) {
                findKeyObj.keywords = pageQurey.keywords;
            }
            if (pageQurey && pageQurey.classifications) {
                findKeyObj.classifications = pageQurey.classifications;
            }
            const BlogListFind: any[] = await BlogModel.find(findKeyObj).sort(sort).limit(pageSize).skip(page * pageSize);
            const BlogList: any[] = JSON.parse(JSON.stringify(BlogListFind));
            const count: number = await BlogModel.find(findKeyObj).count();

            for (let i: number = 0; i < BlogList.length; i++) {
                BlogList[i].author = await UserService.findOne(BlogList[i].author);
                BlogList[i].classifications = await ClassificationService.findOne(BlogList[i].classifications);
                BlogList[i].createType = await ClassificationService.findOne(BlogList[i].createType);
                BlogList[i].comments = await CommentService.count(BlogList[i]._id);
                BlogList[i].createdAt = new Time().formatDate(BlogList[i].createdAt);

                if (BlogList[i].pv > 200) {
                    BlogList[i].isHot = true;
                }
                if (BlogList[i].pv > 200 && BlogList[i].thumbsUp > 10||BlogList[i].thumbsUp > 10) {
                    BlogList[i].isRecommend = '荐';
                }
                if (BlogList[i].pv > 400 && (BlogList[i].comments > 10||BlogList[i].thumbsUp > 10)) {
                    BlogList[i].isRecommend = '榜';
                }
            }

            return {
                count,
                data: BlogList,
            };

        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IBlogModel >}
     * @memberof BlogService
     */
    async findOne(id: string): Promise<IBlogModel | any> {
        try {
            if(!id){
                return {};
            }
            const BlogFind: IBlogModel = await BlogModel.findOne({
                _id: Types.ObjectId(id)
            });
            const Blog: any = JSON.parse(JSON.stringify(BlogFind));

            Blog.author = await UserService.findOne(Blog.author);
            Blog.classifications = await ClassificationService.findOne(Blog.classifications);
            Blog.createType = await ClassificationService.findOne(Blog.createType);
            

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
    async update(id: string, updateInfo: any): Promise<any> {
        try {
            const BlogFind: IBlogModel = await BlogModel.updateOne({
                _id: Types.ObjectId(id)
            }, updateInfo);
            console.log(updateInfo,BlogFind);
            return BlogFind;
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
            body.createdAt = new Date();
            body.updatedAt = new Date();
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
