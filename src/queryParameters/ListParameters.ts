import { EntityParameters } from './EntityParameters';
export declare interface ListParameters extends EntityParameters {
    contributor?: string;
    created_lt?: string;
    created_gt?: string;
    modified_lt?: string;
    modified_gt?: string;
    sort?: string;
}
