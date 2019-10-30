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
        const movies: IMovieModel[] = await MovieService.findAll();

        // res.status(200).json(movies);
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
        const movie: IMovieModel = await MovieService.findOne(req.params.id);

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
