import { Account } from './Account';
import { Image } from './Image';
import { Node } from './Node';
export declare interface NodeEmbedded {
    readonly ancestor_nodes: ReadonlyArray<Node>;
    readonly child_nodes: ReadonlyArray<Node>;
    readonly parent_node: Node | null;
    readonly primary_image: Node | null;
    readonly submitter: Account | null;
}
export declare interface NodeWithEmbedded extends Node {
    readonly _embedded: Partial<NodeEmbedded>;
}
