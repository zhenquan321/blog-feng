import { IMovieModel } from './model';

/**
 * @export
 * @interaface MovieReptileServiceInterface
 */
export interface MovieReptileService {
    insert(MovieModel: IMovieModel): Promise < IMovieModel > ;
    remove(id: string): Promise < IMovieModel > ;
    findOne(id: string): Promise<IMovieModel>;
    findAll(): Promise<IMovieModel[]>;
    findOneByName(name: string): Promise<IMovieModel>;

    
}