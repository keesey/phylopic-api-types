import { Link } from './Link';
import { Links } from './Links';
interface DomainLinks extends Links {
    readonly entityCreation: Link;
    readonly entitySet: Link;
    readonly entitySetCreation: Link;
}
interface Domain {
    readonly _links: DomainLinks;
}