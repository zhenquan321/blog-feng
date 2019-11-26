import * as Joi from 'joi';
import ClassificationModel, { IClassificationModel } from './model';
import { IClassificationService } from './interface';
import { Types } from 'mongoose';

const ClassificationService: IClassificationService = {
    /**
     * @returns {Promise < IClassificationModel[] >}
     * @memberof ClassificationService
     */
    async findAll(query?: any): Promise<IClassificationModel[]> {
        try {
            let findQuery:any = {};
            if (query&&query.type) {
                findQuery.type=query.type;
            }
            return await ClassificationModel.find(findQuery);
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IClassificationModel >}
     * @memberof ClassificationService
     */
    async findOne(id: string): Promise<IClassificationModel> {
        try {
            return await ClassificationModel.findOne({
                _id: Types.ObjectId(id)
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IClassificationModel} Classification
     * @returns {Promise < IClassificationModel >}
     * @memberof ClassificationService
     */
    async insert(body: IClassificationModel): Promise<IClassificationModel | any> {
        try {
            const hasClassification: IClassificationModel = await ClassificationModel.findOne({ name: body.name });

            if (hasClassification) {

                return { mag: '该分类已存在' };

            } else {

                const Classification: IClassificationModel = await ClassificationModel.create(body);

                return Classification;
            }

        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IClassificationModel >}
     * @memberof ClassificationService
     */
    async remove(id: string): Promise<IClassificationModel> {
        try {

            const Classification: IClassificationModel = await ClassificationModel.findOneAndRemove({
                _id: Types.ObjectId(id)
            });

            return Classification;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default ClassificationService;
