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
    async findOne(id: string): Promise<IMovieModel | false> {
        try {
            const Movie: any = await MovieModel.findOne({
                _id: Types.ObjectId(id)
            });
            if (Movie) {

                return Movie;

            }

            return false;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
        * @returns {Promise < IMovieModel[] >}
        * @memberof UserService
        */
    async findAll(query?: any): Promise<any> {

        const page: number = query && query.page ? Number(query.page) : 0;
        const pageSize: number = query && query.pageSize ? Number(query.pageSize) : 12;
        try {
            let findKeyObj: any = {};
            if (!query.Reptile) {
                findKeyObj = {
                    downLink: { $ne: '', $exists: true },
                    imgUrl: { $ne: '', $exists: true },
                };
            } else {
                if (query.findAll) {
                    // 全部重新搜索
                } else {
                    findKeyObj = {
                        $or: [
                            { imgUrl: { $in: [null, ''] } },
                            { downLink: { $in: [null, ''] } },
                        ]
                    };
                }

            }

            if (query && query.year) {
                findKeyObj.years = Number(query.year);
            }
            if (query && query.type) {
                findKeyObj.type = query.type;
            }
            if (query && query.keyword) {
                findKeyObj.name = { $regex: query.keyword, $options: 'i' };
            }

            // 电影按时间倒序
            const movieList: IMovieModel[] = await MovieModel.find(findKeyObj).sort({ updateDate: -1 }).limit(pageSize).skip(page * pageSize);
            const count: number = await MovieModel.find(findKeyObj).countDocuments();

            console.log({
                findKeyObj,
                count,
            });

            return {
                count,
                data: movieList,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async update(query: any, body: any): Promise<void> {
        try {
            const updateInfo: any = await MovieModel.updateOne(query, { $set: body });
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
