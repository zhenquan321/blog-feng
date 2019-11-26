import { IHandBookModel } from './model';

/**
 * @export
 * @interface IHandBookService
 */
export interface IHandBookService {

    /**
     * @returns {Promise<IHandBookModel[]>}
     * @memberof IHandBookService
     */
    findAll(pageQurey?:any): Promise<IHandBookModel[]|any>;

    /**
     * @param {string} code
     * @returns {Promise<IHandBookModel>}
     * @memberof IHandBookService
     */
    findOne(code: string): Promise<IHandBookModel>;

    /**
     * @param {IHandBookModel} IHandBookModel
     * @returns {Promise<IHandBookModel>}
     * @memberof IHandBookService
     */
    insert(IHandBookModel: IHandBookModel): Promise<IHandBookModel>;

    /**
     *更新数据
     */
    update(id: string,updateInfo:any): Promise<any>;

    /**
     * @param {string} id
     * @returns {Promise<IHandBookModel>}
     * @memberof IHandBookService
     */
    remove(id: string): Promise<IHandBookModel>;
}
