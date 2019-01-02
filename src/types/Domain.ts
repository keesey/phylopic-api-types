import { Link } from './Link';
import { Links } from './Links';
export declare interface DomainLinks extends Links {
    readonly entityCreation: Link;
    readonly entitySet: Link;
    readonly entitySetCreation: Link;
}
export declare interface Domain {
    readonly _links: DomainLinks;
}
