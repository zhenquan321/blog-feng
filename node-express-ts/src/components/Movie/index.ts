import MovieService from './service';
import { HttpError } from '../../config/error';
import { IMovieModel } from './model';
import { NextFunction, Request, Response } from 'express';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req: Request, res: Response, next: NextFunction): Promise < IMovieModel[] > {
    try {
        const query: any = req.query || req.body;
        query.page = query.page >= 1 ? query.page - 1 : 0;

        const movies: IMovieModel[] = await MovieService.findAll(query);

        res.status(200).json({
            state:0,
            data:movies,
            msg:''
        });
        return movies;
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findOne(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const getMovie: any = await MovieService.findOne(req.params.id);
        
        const movie: any = JSON.parse(JSON.stringify(getMovie));
        MovieService.update(req.params.id, { $set: { clickNum: ((getMovie.clickNum?getMovie.clickNum:0)+ Math.round(Math.random() * 10)) } });
        movie.details.detailDes = movie.details.detailDes.split('detailDes');

        res.status(200).json({
            state:0,
            data:movie,
            msg:''
        });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function create(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const movie: IMovieModel = await MovieService.insert(req.body);

        res.status(201).json(movie);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function remove(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const movie: IMovieModel = await MovieService.remove(req.params.id);

        res.status(200).json(movie);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}



export async function thumbsUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const MovieFid: any = await MovieService.findOne(req.body.id);
        const thumbsUp: number = MovieFid.thumbsUp + Number(req.body.num||1);
        const Movie: any = await MovieService.update(req.params.id || req.body.id, {
            thumbsUp
        });

        if (Movie) {
            res.status(200).json({
                thumbsUp,
                Movie,
                state: 0
            });
        }

    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}