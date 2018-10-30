import { Account } from './Account';
import { Image } from './Image';
import { Node } from './Node';
export declare interface NodeEmbedded {
    readonly childNodes: ReadonlyArray<Node>;
    readonly contributor: Account | null;
    readonly parentNode: Node | null;
    readonly primaryImage: Node | null;
}
export declare interface NodeWithEmbedded extends Node {
    readonly _embedded: Partial<NodeEmbedded>;
}
