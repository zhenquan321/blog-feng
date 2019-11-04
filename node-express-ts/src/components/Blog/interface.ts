import { IBlogModel } from './model';

/**
 * @export
 * @interface IBlogService
 */
export interface IBlogService {

    /**
     * @returns {Promise<IBlogModel[]>}
     * @memberof IBlogService
     */
    findAll(): Promise<IBlogModel[]>;

    /**
     * @param {string} code
     * @returns {Promise<IBlogModel>}
     * @memberof IBlogService
     */
    findOne(code: string): Promise<IBlogModel>;

    /**
     * @param {IBlogModel} IBlogModel
     * @returns {Promise<IBlogModel>}
     * @memberof IBlogService
     */
    insert(IBlogModel: IBlogModel): Promise<IBlogModel>;

    /**
     * @param {string} id
     * @returns {Promise<IBlogModel>}
     * @memberof IBlogService
     */
    remove(id: string): Promise<IBlogModel>;
}