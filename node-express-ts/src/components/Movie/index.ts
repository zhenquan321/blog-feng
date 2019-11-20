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
        const movies: IMovieModel[] = await MovieService.findAll(req);
        
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
        const movie: IMovieModel|false = await MovieService.findOne(req.params.id);

        res.status(200).json(movie);
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
        const MovieFid: any = await MovieService.findOne(req.params.id || req.body.id);
        const thumbsUp: number = MovieFid.thumbsUp + 1;
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