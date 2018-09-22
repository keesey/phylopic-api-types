import { Entity } from './Entity';
import { Link } from './Link';
import { Links } from './Links';
interface AccountLinks extends Links {
    readonly submitted_image_set: Link | null;
    readonly submitted_node_set: Link | null;
}
interface Account extends Entity {
    readonly _links: AccountLinks;
    readonly email: string;
    readonly family_name: string;
    readonly given_name: string;
    readonly role: 'member' | 'admin';
}
