import { IMovieModel } from './model';

/**
 * @export
 * @interaface MovieReptileServiceInterface
 */
export interface MovieService {
    insert(MovieModel: IMovieModel): Promise < IMovieModel > ;
    remove(id: string): Promise < IMovieModel > ;
    findOne(id: string): Promise<IMovieModel>;
    findAll(pageQurey?: any): Promise<IMovieModel[]>;
    findOneByName(name: string): Promise<IMovieModel>;
    getCount(): Promise<number>;
    update(qurey:any,body: any): Promise<void>;
}