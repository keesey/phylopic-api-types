import { Account } from './Account';
import { Image } from './Image';
import { Node } from './Node';
export declare interface ImageEmbedded {
    readonly general_node: Node | null;
    readonly nodes: ReadonlyArray<Node>;
    readonly specific_node: Node;
    readonly submitter: Account;
}
export declare interface ImageWithEmbedded extends Image {
    readonly _embedded: Partial<ImageEmbedded>;
}
