import { Account } from './Account';
import { Image } from './Image';
import { Node } from './Node';
export declare interface ImageEmbedded {
    readonly contributor: Account;
    readonly generalNode: Node | null;
    readonly nodes: ReadonlyArray<Node>;
    readonly specificNode: Node;
}
export declare interface ImageWithEmbedded extends Image {
    readonly _embedded: Partial<ImageEmbedded>;
}
