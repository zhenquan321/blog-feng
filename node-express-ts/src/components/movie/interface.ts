import { IMovieModel } from './model';

/**
 * @export
 * @interaface MovieReptileServiceInterface
 */
export interface MovieService {
    insert(MovieModel: IMovieModel): Promise < IMovieModel > ;
    remove(id: string): Promise < IMovieModel > ;
    findOne(id: string): Promise<IMovieModel|false>;
    findAll(pageQurey?: any): Promise<IMovieModel[]>;
    findOneByName(name: string): Promise<IMovieModel>;
    getCount(): Promise<number>;
    update(query:any,body: any): Promise<void>;
}