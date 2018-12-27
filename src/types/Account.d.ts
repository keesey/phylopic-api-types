import { Entity } from './Entity';
import { Link } from './Link';
import { Links } from './Links';
export type AccountRole = 'member' | 'admin';
interface AccountLinks extends Links {
    readonly submittedImageSet: Link | null;
    readonly submittedNodeSet: Link | null;
}
interface Account extends Entity {
    readonly _links: AccountLinks;
    readonly email: string;
    readonly familyName: string;
    readonly givenName: string;
    readonly role: AccountRole;
}
