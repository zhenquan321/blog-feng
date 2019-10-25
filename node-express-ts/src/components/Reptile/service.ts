import * as Joi from 'joi';
import AuthValidation from './validation';
import {IMovieModel,MovieModel,IJobModel,JobModel}  from './model';
import { MovieReptileServiceInterface,JobReptileServiceInterface } from './interface';
/**
 * @export
 * @implements {MovieReptileService}
 */
export const MovieReptileService: MovieReptileServiceInterface = {
    async insert(body: IMovieModel): Promise < IMovieModel > {
        try {
            // const validate: Joi.ValidationResult < MovieModel > = UserValidation.createUser(body);
            // if (validate.error) {
            //     throw new Error(validate.error.message);
            // }
            let hsmovie = await this.findOne(body.name);
            if(hsmovie&&hsmovie.name){
                console.log("该电影已存在")
            }else{
                const Movie: IMovieModel = await MovieModel.create(body);
                return Movie;
            }
           
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async findOne(name: string): Promise < IMovieModel > {
        
        return await MovieModel.findOne({
            name: name
        });
       
    },
};

/**
 * @export
 * @implements {JobReptileService}
 */
export const JobReptileService: JobReptileServiceInterface = {

    async insert(body: IJobModel): Promise < IJobModel > {
        try {
            let hsmovie = await this.findOne(body.id);
            if(hsmovie&&hsmovie.id){
                console.log("该job已存在")
            }else{
                const Job: IJobModel = await JobModel.create(body);
                return Job;
            }
           
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async findOne(id: string): Promise < IJobModel > {
        return await JobModel.findOne({
            id: id
        });
    },
};