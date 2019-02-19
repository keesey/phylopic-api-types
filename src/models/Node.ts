import { Entity } from './Entity';
import { Link } from './Link';
import { Links } from './Links';
import { NodeName } from './NodeName';
import { TitledLink } from './TitledLink';
export declare interface NodeLinks extends Links {
    readonly childNodes: ReadonlyArray<Link>;
    readonly cladeImages: Link | null;
    readonly contributor: Link | null;
    readonly external: ReadonlyArray<TitledLink>;
    readonly images: Link | null;
    readonly parentNode: Link | null;
    readonly primaryImage: Link | null;
}
export declare interface Node extends Entity {
    readonly _links: NodeLinks;
    readonly names: ReadonlyArray<NodeName>;
    readonly root: boolean;
}
