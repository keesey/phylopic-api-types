import { EntityReference } from './EntityReference';
export declare interface Entity extends EntityReference {
    readonly created: string;
    readonly modified: string;
}
