import { ICommentModel} from './model';

/**
 * @export
 * @interface ICommentModel
 */
export interface ICommentService {

    /**
     * @returns {Promise<ICommentModel[]>}
     * @memberof ICommentService
     */
    findAll(findAll:any): Promise<any>;

    /**
     * @param {string} code
     * @returns {Promise<ICommentModel>}
     * @memberof ICommentService
     */
    findOne(code: string): Promise<ICommentModel>;

    /**
     * @param {ICommentModel} ICommentModel
     * @returns {Promise<ICommentModel>}
     * @memberof IBlogService
     */
    insert(ICommentModel: ICommentModel): Promise<ICommentModel>;

    /**
     * @param {string} id
     * @returns {Promise<ICommentModel>}
     * @memberof IBlogService
     */
    remove(id: string): Promise<ICommentModel>;

    update(id: string, updateInfo: any): Promise<any>;

    count(id: string): Promise<number>;
}

