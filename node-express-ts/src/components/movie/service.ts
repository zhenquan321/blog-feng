import * as Joi from 'joi';
import MovieModel, { IMovieModel } from './model';
import { MovieService } from './interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IMovieModelService}
 */
const MovieService: MovieService = {


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
    async findAll(pageQurey?: any): Promise<any> {

        const page: number = pageQurey && pageQurey.page ? Number(pageQurey.page) : 0;
        const pagesize: number = pageQurey && pageQurey.pagesize ? Number(pageQurey.pagesize) : 20;
        try {
            const findKeyObj: any = {
                downLink: { $ne: '' },
                imgUrl:{ $ne: '' },
            };


            if (pageQurey && pageQurey.year) {
                findKeyObj.years = Number(pageQurey.year);
            }
            if (pageQurey && pageQurey.type) {
                findKeyObj.type = pageQurey.type;
            }

            const movieList: IMovieModel[] = await MovieModel.find(findKeyObj).limit(pagesize).skip(page * pagesize);
            const count: number = await MovieModel.find(findKeyObj).countDocuments();

            return {
                count,
                data: movieList,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async update(qurey: any, body: any): Promise<void> {
        try {
            const updateInfo: any = await MovieModel.updateOne(qurey, { $set: body });
            console.log(updateInfo);
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getCount(): Promise<number> {
        try {
            return await MovieModel.find().countDocuments();
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
