import { IJobModel } from './model';

/**
 * @export
 * @interaface JobReptileServiceInterface
 */
export interface JobReptileService {
    insert(JobModel: IJobModel): Promise < IJobModel > ;
    remove(id: string): Promise < IJobModel > ;
    findOne(id: string): Promise<IJobModel>;
    findAll(query:any): Promise<IJobModel[]>;
    findOneByName(name: string): Promise<IJobModel>;

    
}