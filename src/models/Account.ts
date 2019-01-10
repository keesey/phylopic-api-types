import { Entity } from './Entity';
import { Link } from './Link';
import { Links } from './Links';
export declare type AccountRole = 'member' | 'admin';
export declare interface AccountLinks extends Links {
    readonly imageSet: Link | null;
    readonly nodeSet: Link | null;
}
export declare interface Account extends Entity {
    readonly _links: AccountLinks;
    readonly email: string;
    readonly familyName: string;
    readonly givenName: string;
    readonly role: AccountRole;
}
