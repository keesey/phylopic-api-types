import { Entity } from './Entity';
import { Link } from './Link';
import { Links } from './Links';
export declare type AccountRole = 'contributor' | 'administrator';
export declare type AccountLinks = Links;
export declare interface Account extends Entity {
    readonly _links: AccountLinks;
    readonly email: string;
    readonly familyName: string;
    readonly givenName: string;
    readonly role: AccountRole;
}
