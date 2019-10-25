import { IMovieModel,IJobModel } from './model';

/**
 * @export
 * @interaface MovieReptileServiceInterface
 */
export interface MovieReptileServiceInterface {
    insert(MovieModel: IMovieModel): Promise < IMovieModel > ;
    findOne(name: string): Promise<IMovieModel>;
}
/**
 * @export
 * @interaface JobReptileServiceInterface
 */
export interface JobReptileServiceInterface {
    insert(JobModel: IJobModel): Promise < IJobModel > ;
    findOne(name: string): Promise<IJobModel>;
}
