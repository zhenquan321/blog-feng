import * as Joi from 'joi';
import ClassificationModel, { IClassificationModel } from './model';
import { IClassificationService } from './interface';
import { Types } from 'mongoose';

const ClassificationService: IClassificationService = {
    /**
     * @returns {Promise < IClassificationModel[] >}
     * @memberof ClassificationService
     */
    async findAll(): Promise<IClassificationModel[]> {
        try {
            return await ClassificationModel.find({});
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
    async insert(body: IClassificationModel): Promise<IClassificationModel> {
        try {
            const Classification: IClassificationModel = await ClassificationModel.create(body);

            return Classification;
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
