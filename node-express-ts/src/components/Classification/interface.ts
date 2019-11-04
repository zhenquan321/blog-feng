import { IClassificationModel} from './model';

/**
 * @export
 * @interface IClassificationModel
 */
export interface IClassificationService {

    /**
     * @returns {Promise<IClassificationModel[]>}
     * @memberof IClassificationService
     */
    findAll(): Promise<IClassificationModel[]>;

    /**
     * @param {string} code
     * @returns {Promise<IClassificationModel>}
     * @memberof IClassificationService
     */
    findOne(code: string): Promise<IClassificationModel>;

    /**
     * @param {IClassificationModel} IClassificationModel
     * @returns {Promise<IClassificationModel>}
     * @memberof IBlogService
     */
    insert(IClassificationModel: IClassificationModel): Promise<IClassificationModel>;

    /**
     * @param {string} id
     * @returns {Promise<IClassificationModel>}
     * @memberof IBlogService
     */
    remove(id: string): Promise<IClassificationModel>;
}

