import { Links } from './Links';
import { Node } from './Node';
export declare interface NodeChoicesEmbedded {
    readonly choices: ReadonlyArray<Node>;
}
export declare interface NodeChoices {
    readonly _embedded: NodeChoicesEmbedded;
    readonly _links: Links;
}
