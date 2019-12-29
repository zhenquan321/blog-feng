import * as Joi from 'joi';
import JobModel, { IJobModel } from './model';
import { JobReptileService } from './interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IJobModelService}
 */
const JobService: JobReptileService = {


    /**
     * @param {IJobModel} user
     * @returns {Promise < IJobModel >}
     * @memberof UserService
     */

    async insert(body: IJobModel): Promise<IJobModel> {
        try {
            // const validate: Joi.ValidationResult < JobModel > = UserValidation.createUser(body);
            // if (validate.error) {
            //     throw new Error(validate.error.message);
            // }
            const hsJob: IJobModel = await this.findOneByName(body.name);
            if (hsJob && hsJob.name) {
                // console.log('该电影已存在');
                const Job: IJobModel = await JobModel.update({ name: body.name }, body);
            } else {
                const Job: IJobModel = await JobModel.create(body);

                return Job;
            }

        } catch (error) {
            throw new Error(error.message);
        }
    },
    async findOneByName(name: string): Promise<IJobModel> {
        return await JobModel.findOne({
            name
        });
    },
    /*
     * @param {string} id
     * @returns {Promise < IJobModel >}
     * @memberof UserService
     */
    async findOne(id: string): Promise<IJobModel> {
        try {
            // const validate: Joi.ValidationResult<{
            //     id: string
            // }> = UserValidation.getUser({
            //     id
            // });

            // if (validate.error) {
            //     throw new Error(validate.error.message);
            // }

            return await JobModel.findOne({
                _id: Types.ObjectId(id)
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
        * @returns {Promise < IJobModel[] >}
        * @memberof UserService
        */
    async findAll(): Promise<IJobModel[]> {
        try {
            return await JobModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },
    /**
     * @param {string} id
     * @returns {Promise < IJobModel >}
     * @memberof UserService
     */
    async remove(id: string): Promise<IJobModel> {
        try {
            // const validate: Joi.ValidationResult<{
            //     id: string
            // }> = UserValidation.removeUser({
            //     id
            // });

            // if (validate.error) {
            //     throw new Error(validate.error.message);
            // }

            const user: IJobModel = await JobModel.findOneAndRemove({
                _id: Types.ObjectId(id)
            });

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default JobService;
