import { Link } from './Link';
import { Links } from './Links';
interface DomainLinks extends Links {
    readonly entity_creation: Link;
    readonly entity_set: Link;
    readonly entity_set_creation: Link;
}
interface Domain {
    readonly _links: Links;
}