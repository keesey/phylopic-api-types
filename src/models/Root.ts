import { Link } from './Link';
import { Links } from './Links';
import { TitledLink } from './TitledLink';
export interface RootLinks extends Links {
    readonly contact: TitledLink;
    readonly documentation: Link;
    readonly resources: ReadonlyArray<TitledLink>;
}
export interface Root {
    readonly _links: RootLinks;
    readonly title: string;
    readonly version: string;
}
