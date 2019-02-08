import { Links } from './Links';
import { NodeWithEmbedded } from './NodeWithEmbedded';
export declare interface NodeChoicesEmbedded {
    readonly choices: ReadonlyArray<NodeWithEmbedded>;
}
export declare interface NodeChoices {
    readonly _embedded: NodeChoicesEmbedded;
    readonly _links: Links;
}
