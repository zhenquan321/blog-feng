import * as Joi from 'joi';
import MovieModel, { IMovieModel } from './model';
import { MovieReptileService } from './interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IMovieModelService}
 */
const MovieService: MovieReptileService = {


    /**
     * @param {IMovieModel} user
     * @returns {Promise < IMovieModel >}
     * @memberof UserService
     */

    async insert(body: IMovieModel): Promise<IMovieModel> {
        try {
            // const validate: Joi.ValidationResult < MovieModel > = UserValidation.createUser(body);
            // if (validate.error) {
            //     throw new Error(validate.error.message);
            // }
            const hsmovie: IMovieModel = await this.findOneByName(body.name);
            if (hsmovie && hsmovie.name) {
                // console.log('该电影已存在');
                const Movie: IMovieModel = await MovieModel.update({ name: body.name }, body);
            } else {
                const Movie: IMovieModel = await MovieModel.create(body);

                return Movie;
            }

        } catch (error) {
            throw new Error(error.message);
        }
    },
    async findOneByName(name: string): Promise<IMovieModel> {
        return await MovieModel.findOne({
            name
        });
    },
    /*
     * @param {string} id
     * @returns {Promise < IMovieModel >}
     * @memberof UserService
     */
    async findOne(id: string): Promise<IMovieModel> {
        try {
            // const validate: Joi.ValidationResult<{
            //     id: string
            // }> = UserValidation.getUser({
            //     id
            // });

            // if (validate.error) {
            //     throw new Error(validate.error.message);
            // }

            return await MovieModel.findOne({
                _id: Types.ObjectId(id)
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
        * @returns {Promise < IMovieModel[] >}
        * @memberof UserService
        */
    async findAll(): Promise<IMovieModel[]> {
        try {
            return await MovieModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },
    /**
     * @param {string} id
     * @returns {Promise < IMovieModel >}
     * @memberof UserService
     */
    async remove(id: string): Promise<IMovieModel> {
        try {
            // const validate: Joi.ValidationResult<{
            //     id: string
            // }> = UserValidation.removeUser({
            //     id
            // });

            // if (validate.error) {
            //     throw new Error(validate.error.message);
            // }

            const user: IMovieModel = await MovieModel.findOneAndRemove({
                _id: Types.ObjectId(id)
            });

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default MovieService;
