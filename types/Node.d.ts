import { Entity } from './Entity';
import { Link } from './Link';
import { Links } from './Links';
import { NodeName } from './NodeName';
import { TitledLink } from './TitledLink';
export declare interface NodeLinks extends Links {
    readonly ancestor_nodes: ReadonlyArray<Link>;
    readonly child_nodes: ReadonlyArray<Link>;
    readonly descendant_image_set: Link | null;
    readonly external: ReadonlyArray<TitledLink>;
    readonly parent_node: Link | null;
    readonly primary_image: Link | null;
    readonly self_image_set: Link | null;
    readonly submitter: Link | null;
}
export declare interface Node extends Entity {
    readonly _links: NodeLinks;
    readonly names: ReadonlyArray<NodeName>;
    readonly root: boolean;
}
